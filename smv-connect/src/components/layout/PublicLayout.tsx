import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PageLoader } from '../ui/Loader';
import { ToastViewport } from '../ui/Toast';
import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollToTop } from './ScrollToTop';

/** Layout des pages publiques : header fixe, contenu, footer, toasts. */
export function PublicLayout() {
  const { pathname } = useLocation();
  const estAccueil = pathname === '/';

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-smv-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu principal
      </a>
      <ScrollToTop />
      <Header />
      {/* Compense la hauteur du header fixe, sauf sur l'accueil (hero plein écran). */}
      <main id="main-content" className={estAccueil ? 'flex-1' : 'flex-1 pt-[6.5rem]'}>
        <Suspense fallback={<PageLoader />}>
          <div key={pathname} className="animate-fade-in-fast">
            <Outlet />
          </div>
        </Suspense>
      </main>
      <Footer />
      <ToastViewport />
    </div>
  );
}
