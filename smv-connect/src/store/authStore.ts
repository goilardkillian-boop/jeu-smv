import { create } from 'zustand';
import { demoDb } from '../data/demoDb';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { fetchCentreParId } from '../services/centres';
import type { Centre, Profile } from '../types/app.types';

const DEMO_SESSION_KEY = 'smv-demo-session';

type AuthStatut = 'chargement' | 'connecte' | 'deconnecte';

interface AuthState {
  statut: AuthStatut;
  profile: Profile | null;
  /** Centre rattaché au profil (null pour un super admin national). */
  centre: Centre | null;
  estSuperAdmin: boolean;
  initialiser: () => Promise<void>;
  connexion: (email: string, motDePasse: string) => Promise<void>;
  /** Connexion instantanée en mode démo (Supabase non configuré). */
  connexionDemo: (profileId: string) => Promise<void>;
  deconnexion: () => Promise<void>;
}

let initialisationLancee = false;

async function chargerProfil(userId: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('id, centre_id, role, nom, prenom, email, actif')
    .eq('id', userId)
    .maybeSingle();
  if (error) return null;
  return (data as unknown as Profile | null) ?? null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  statut: 'chargement',
  profile: null,
  centre: null,
  estSuperAdmin: false,

  initialiser: async () => {
    if (initialisationLancee) return;
    initialisationLancee = true;

    if (!isSupabaseConfigured) {
      const profileId = sessionStorage.getItem(DEMO_SESSION_KEY);
      const profile = profileId ? demoDb.profiles.find((p) => p.id === profileId) ?? null : null;
      if (profile) {
        const centre = profile.centre_id ? await fetchCentreParId(profile.centre_id) : null;
        set({ statut: 'connecte', profile, centre, estSuperAdmin: profile.role === 'super_admin' });
      } else {
        set({ statut: 'deconnecte' });
      }
      return;
    }

    const client = supabase;
    if (!client) return;

    const appliquerSession = async (userId: string | undefined) => {
      if (!userId) {
        set({ statut: 'deconnecte', profile: null, centre: null, estSuperAdmin: false });
        return;
      }
      const profile = await chargerProfil(userId);
      if (!profile || !profile.actif) {
        await client.auth.signOut();
        set({ statut: 'deconnecte', profile: null, centre: null, estSuperAdmin: false });
        return;
      }
      const centre = profile.centre_id ? await fetchCentreParId(profile.centre_id) : null;
      set({ statut: 'connecte', profile, centre, estSuperAdmin: profile.role === 'super_admin' });
    };

    const { data } = await client.auth.getSession();
    await appliquerSession(data.session?.user.id);

    client.auth.onAuthStateChange((evenement, session) => {
      if (evenement === 'SIGNED_OUT') {
        set({ statut: 'deconnecte', profile: null, centre: null, estSuperAdmin: false });
      } else if (evenement === 'SIGNED_IN' && get().statut !== 'connecte') {
        void appliquerSession(session?.user.id);
      }
    });
  },

  connexion: async (email, motDePasse) => {
    if (!supabase) {
      throw new Error("Supabase n'est pas configuré — utilise la connexion démo ci-dessous.");
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: motDePasse,
    });
    if (error) throw new Error('Identifiants incorrects ou compte inexistant');

    const profile = await chargerProfil(data.user.id);
    if (!profile || !profile.actif) {
      await supabase.auth.signOut();
      throw new Error("Ce compte n'a pas accès à l'espace d'administration");
    }
    const centre = profile.centre_id ? await fetchCentreParId(profile.centre_id) : null;
    set({ statut: 'connecte', profile, centre, estSuperAdmin: profile.role === 'super_admin' });
  },

  connexionDemo: async (profileId) => {
    const profile = demoDb.profiles.find((p) => p.id === profileId);
    if (!profile) throw new Error('Profil de démonstration introuvable');
    sessionStorage.setItem(DEMO_SESSION_KEY, profileId);
    const centre = profile.centre_id ? await fetchCentreParId(profile.centre_id) : null;
    set({ statut: 'connecte', profile, centre, estSuperAdmin: profile.role === 'super_admin' });
  },

  deconnexion: async () => {
    sessionStorage.removeItem(DEMO_SESSION_KEY);
    if (supabase) await supabase.auth.signOut();
    set({ statut: 'deconnecte', profile: null, centre: null, estSuperAdmin: false });
  },
}));
