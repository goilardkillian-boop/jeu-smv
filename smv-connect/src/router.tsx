import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { PublicLayout } from './components/layout/PublicLayout';
import { RequireSuperAdmin } from './components/layout/RequireSuperAdmin';

/* Code splitting par route (React.lazy + Suspense dans les layouts). */
const HomePage = lazy(() => import('./pages/HomePage'));
const CentresPage = lazy(() => import('./pages/CentresPage'));
const CentreDetailPage = lazy(() => import('./pages/CentreDetailPage'));
const FormationsPage = lazy(() => import('./pages/FormationsPage'));
const FormationDetailPage = lazy(() => import('./pages/FormationDetailPage'));
const VolontaireStagiairePage = lazy(() => import('./pages/VolontaireStagiairePage'));
const VolontaireExpertPage = lazy(() => import('./pages/VolontaireExpertPage'));
const DecouvrirPage = lazy(() => import('./pages/DecouvrirPage'));
const ActualitesPage = lazy(() => import('./pages/ActualitesPage'));
const ActualiteDetailPage = lazy(() => import('./pages/ActualiteDetailPage'));
const CandidaturePage = lazy(() => import('./pages/CandidaturePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PressePage = lazy(() => import('./pages/PressePage'));
const MentionsLegalesPage = lazy(() => import('./pages/MentionsLegalesPage'));
const RgpdPage = lazy(() => import('./pages/RgpdPage'));
const AccessibilitePage = lazy(() => import('./pages/AccessibilitePage'));
const PlanDuSitePage = lazy(() => import('./pages/PlanDuSitePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminCandidatures = lazy(() => import('./pages/admin/AdminCandidatures'));
const AdminFormations = lazy(() => import('./pages/admin/AdminFormations'));
const AdminFormationEdit = lazy(() => import('./pages/admin/AdminFormationEdit'));
const AdminActualites = lazy(() => import('./pages/admin/AdminActualites'));
const AdminActualiteEdit = lazy(() => import('./pages/admin/AdminActualiteEdit'));
const AdminCentre = lazy(() => import('./pages/admin/AdminCentre'));
const AdminTemoignages = lazy(() => import('./pages/admin/AdminTemoignages'));
const AdminPartenaires = lazy(() => import('./pages/admin/AdminPartenaires'));
const AdminCentres = lazy(() => import('./pages/admin/AdminCentres'));
const AdminUtilisateurs = lazy(() => import('./pages/admin/AdminUtilisateurs'));

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: (
      <ErrorBoundary>
        <PublicLayout />
      </ErrorBoundary>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/centres', element: <CentresPage /> },
      { path: '/centres/:slug', element: <CentreDetailPage /> },
      { path: '/formations', element: <FormationsPage /> },
      { path: '/formations/:slug', element: <FormationDetailPage /> },
      { path: '/se-former/volontaire-stagiaire', element: <VolontaireStagiairePage /> },
      { path: '/se-former/volontaire-expert', element: <VolontaireExpertPage /> },
      { path: '/decouvrir', element: <DecouvrirPage /> },
      { path: '/actualites', element: <ActualitesPage /> },
      { path: '/actualites/:slug', element: <ActualiteDetailPage /> },
      { path: '/candidater', element: <CandidaturePage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/presse', element: <PressePage /> },
      { path: '/mentions-legales', element: <MentionsLegalesPage /> },
      { path: '/rgpd', element: <RgpdPage /> },
      { path: '/accessibilite', element: <AccessibilitePage /> },
      { path: '/plan-du-site', element: <PlanDuSitePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: '/admin/login', element: <AdminLogin /> },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'candidatures', element: <AdminCandidatures /> },
      { path: 'formations', element: <AdminFormations /> },
      { path: 'formations/nouvelle', element: <AdminFormationEdit /> },
      { path: 'formations/:id', element: <AdminFormationEdit /> },
      { path: 'actualites', element: <AdminActualites /> },
      { path: 'actualites/nouvelle', element: <AdminActualiteEdit /> },
      { path: 'actualites/:id', element: <AdminActualiteEdit /> },
      { path: 'centre', element: <AdminCentre /> },
      { path: 'temoignages', element: <AdminTemoignages /> },
      { path: 'partenaires', element: <AdminPartenaires /> },
      {
        path: 'centres',
        element: (
          <RequireSuperAdmin>
            <AdminCentres />
          </RequireSuperAdmin>
        ),
      },
      {
        path: 'utilisateurs',
        element: (
          <RequireSuperAdmin>
            <AdminUtilisateurs />
          </RequireSuperAdmin>
        ),
      },
    ],
  },
]);
