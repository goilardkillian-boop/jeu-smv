import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import type { Centre, Profile } from '../types/app.types';

interface AuthInfo {
  statut: 'chargement' | 'connecte' | 'deconnecte';
  profile: Profile | null;
  centre: Centre | null;
  estSuperAdmin: boolean;
  /** Identifiant du centre de l'admin, ou null (super admin = vue nationale). */
  centreId: string | null;
}

/** Accès à la session admin (initialise le store au premier montage). */
export function useAuth(): AuthInfo {
  const statut = useAuthStore((s) => s.statut);
  const profile = useAuthStore((s) => s.profile);
  const centre = useAuthStore((s) => s.centre);
  const estSuperAdmin = useAuthStore((s) => s.estSuperAdmin);
  const initialiser = useAuthStore((s) => s.initialiser);

  useEffect(() => {
    void initialiser();
  }, [initialiser]);

  return { statut, profile, centre, estSuperAdmin, centreId: profile?.centre_id ?? null };
}
