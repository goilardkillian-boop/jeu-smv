import {
  Building2,
  GraduationCap,
  Handshake,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Newspaper,
  Shield,
  UserCog,
  X,
} from 'lucide-react';
import { Suspense, useState } from 'react';
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isSupabaseConfigured } from '../../lib/supabase';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/authStore';
import { Badge } from '../ui/Badge';
import { PageLoader } from '../ui/Loader';
import { ToastViewport } from '../ui/Toast';
import { Logo } from './Logo';

const ROLES_LABELS: Record<string, string> = {
  recruteur: 'Recruteur',
  admin_centre: 'Admin centre',
  super_admin: 'Super admin',
};

interface LienAdmin {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  superAdminSeulement?: boolean;
}

const LIENS: LienAdmin[] = [
  { to: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/admin/candidatures', label: 'Candidatures', icon: Inbox },
  { to: '/admin/formations', label: 'Formations', icon: GraduationCap },
  { to: '/admin/actualites', label: 'Actualités', icon: Newspaper },
  { to: '/admin/temoignages', label: 'Témoignages', icon: MessageSquareQuote },
  { to: '/admin/partenaires', label: 'Partenaires', icon: Handshake },
  { to: '/admin/centre', label: 'Mon centre', icon: Building2 },
  { to: '/admin/centres', label: 'Tous les centres', icon: Shield, superAdminSeulement: true },
  { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: UserCog, superAdminSeulement: true },
];

/**
 * Layout de l'espace admin : middleware d'authentification (redirige vers
 * /admin/login sans session valide) + barre latérale de navigation.
 */
export function AdminLayout() {
  const { statut, profile, centre, estSuperAdmin } = useAuth();
  const deconnexion = useAuthStore((s) => s.deconnexion);
  const { pathname } = useLocation();
  const [menuOuvert, setMenuOuvert] = useState(false);

  if (statut === 'chargement') return <PageLoader />;
  if (statut === 'deconnecte') {
    return <Navigate to="/admin/login" state={{ depuis: pathname }} replace />;
  }

  const liens = LIENS.filter((lien) => !lien.superAdminSeulement || estSuperAdmin);
  const initiales = `${profile?.prenom?.[0] ?? ''}${profile?.nom?.[0] ?? ''}`.toUpperCase() || 'A';

  const navigation = (
    <nav aria-label="Navigation administration" className="flex-1 space-y-1 px-3">
      {liens.map((lien) => (
        <NavLink
          key={lien.to}
          to={lien.to}
          onClick={() => setMenuOuvert(false)}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors',
              isActive
                ? 'bg-smv-green text-white'
                : 'text-white/80 hover:bg-white/10 hover:text-white',
            )
          }
        >
          <lien.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          {lien.label}
        </NavLink>
      ))}
    </nav>
  );

  const blocUtilisateur = (
    <div className="border-t border-white/10 p-4">
      {!isSupabaseConfigured ? (
        <p className="mb-3 rounded-md bg-amber-500/20 px-3 py-2 text-xs font-semibold text-amber-200">
          Mode démo — données locales
        </p>
      ) : null}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-smv-green font-display text-base font-bold text-white"
        >
          {initiales}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-white">
            {profile?.prenom} {profile?.nom}
          </p>
          <p className="truncate text-xs text-white/60">{centre ? centre.nom : 'National'}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <Badge variant="green" label={ROLES_LABELS[profile?.role ?? 'recruteur'] ?? 'Recruteur'} />
        <button
          type="button"
          onClick={() => void deconnexion()}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-smv-off-white">
      {/* Sidebar desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-smv-navy-dark lg:flex">
        <div className="p-4">
          <Logo surFondSombre avecDevise={false} />
          <p className="mt-1 text-[11px] uppercase tracking-widest text-white/50">
            Espace administration
          </p>
        </div>
        {navigation}
        {blocUtilisateur}
      </aside>

      {/* Barre mobile */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-smv-navy-dark px-4 py-3 lg:hidden">
        <Logo surFondSombre avecDevise={false} className="[&_svg]:h-8 [&_svg]:w-7 [&_span:first-of-type]:text-sm" />
        <button
          type="button"
          onClick={() => setMenuOuvert(!menuOuvert)}
          aria-expanded={menuOuvert}
          aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="rounded-md p-2 text-white"
        >
          {menuOuvert ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>
      {menuOuvert ? (
        <div className="fixed inset-0 z-30 flex flex-col bg-smv-navy-dark pt-16 lg:hidden">
          {navigation}
          {blocUtilisateur}
        </div>
      ) : null}

      <main id="main-content" className="min-w-0 flex-1 px-4 pb-16 pt-20 lg:px-8 lg:pt-8">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <ToastViewport />
    </div>
  );
}
