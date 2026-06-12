import { demoDb, demoDelay, demoId } from '../data/demoDb';
import { supabase } from '../lib/supabase';
import type { Profile, UserRole } from '../types/app.types';

const COLONNES_PROFILE = 'id, centre_id, role, nom, prenom, email, actif';

/** Liste des comptes recruteurs/admins (super admin uniquement). */
export async function fetchProfiles(): Promise<Profile[]> {
  if (!supabase) {
    await demoDelay();
    return [...demoDb.profiles];
  }
  const { data, error } = await supabase.from('profiles').select(COLONNES_PROFILE).order('email');
  if (error) throw new Error(`Impossible de charger les utilisateurs : ${error.message}`);
  return (data ?? []) as unknown as Profile[];
}

export interface NouvelUtilisateur {
  email: string;
  prenom: string;
  nom: string;
  role: UserRole;
  centre_id: string | null;
}

/**
 * Création d'un compte recruteur. Avec Supabase, la création du compte Auth
 * exige la clé service_role : elle est déléguée à l'Edge Function
 * `admin-create-user` qui renvoie un mot de passe provisoire.
 */
export async function createUtilisateur(
  utilisateur: NouvelUtilisateur,
): Promise<{ motDePasseProvisoire: string | null }> {
  if (!supabase) {
    await demoDelay();
    demoDb.profiles.push({ ...utilisateur, id: demoId(), actif: true });
    return { motDePasseProvisoire: 'demo-' + Math.random().toString(36).slice(2, 10) };
  }
  const { data, error } = await supabase.functions.invoke<{ password?: string }>(
    'admin-create-user',
    { body: utilisateur },
  );
  if (error) throw new Error(`Création du compte impossible : ${error.message}`);
  return { motDePasseProvisoire: data?.password ?? null };
}

export async function setProfileActif(id: string, actif: boolean): Promise<void> {
  if (!supabase) {
    await demoDelay(150);
    const profile = demoDb.profiles.find((p) => p.id === id);
    if (!profile) throw new Error('Compte introuvable');
    profile.actif = actif;
    return;
  }
  const { error } = await supabase.from('profiles').update({ actif }).eq('id', id);
  if (error) throw new Error(`Mise à jour impossible : ${error.message}`);
}

/** Envoie l'email de réinitialisation de mot de passe Supabase Auth. */
export async function reinitialiserMotDePasse(email: string): Promise<void> {
  if (!supabase) {
    await demoDelay(150);
    return;
  }
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/admin/login`,
  });
  if (error) throw new Error(`Réinitialisation impossible : ${error.message}`);
}
