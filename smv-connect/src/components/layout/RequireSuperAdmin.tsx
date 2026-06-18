import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PageLoader } from '../ui/Loader';

/** Restreint une route admin au rôle super_admin. */
export function RequireSuperAdmin({ children }: { children: ReactNode }) {
  const { statut, estSuperAdmin } = useAuth();
  if (statut === 'chargement') return <PageLoader />;
  if (!estSuperAdmin) return <Navigate to="/admin/dashboard" replace />;
  return <>{children}</>;
}
