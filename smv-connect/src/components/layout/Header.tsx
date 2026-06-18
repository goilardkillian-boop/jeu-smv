import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Logo } from './Logo';

interface SousMenu {
  label: string;
  to: string;
}

interface ElementNav {
  label: string;
  to?: string;
  sousMenu?: SousMenu[];
}

const NAVIGATION: ElementNav[] = [
  {
    label: 'Découvrir le SMV',
    sousMenu: [
      { label: 'Présentation du SMV', to: '/decouvrir' },
      { label: 'Partenaires', to: '/decouvrir#partenaires' },
    ],
  },
  {
    label: 'Se former',
    sousMenu: [
      { label: 'Devenir Volontaire Stagiaire', to: '/se-former/volontaire-stagiaire' },
      { label: 'Devenir Volontaire Expert', to: '/se-former/volontaire-expert' },
      { label: 'Nos métiers / Formations', to: '/formations' },
    ],
  },
  { label: 'Nos centres', to: '/centres' },
  { label: 'Actualités', to: '/actualites' },
  { label: 'Presse', to: '/presse' },
  { label: 'Contact', to: '/contact' },
];

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuMobile, setMenuMobile] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Header transparent uniquement au-dessus du hero de l'accueil.
  const transparent = pathname === '/' && !scrolled && !menuMobile;

  useEffect(() => {
    const surScroll = () => setScrolled(window.scrollY > 80);
    surScroll();
    window.addEventListener('scroll', surScroll, { passive: true });
    return () => window.removeEventListener('scroll', surScroll);
  }, []);

  // Fermeture des menus à chaque navigation.
  useEffect(() => {
    setMenuMobile(false);
    setMenuOuvert(null);
  }, [pathname]);

  // Fermeture du dropdown au clic extérieur / Échap.
  useEffect(() => {
    if (!menuOuvert) return;
    const surClic = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOuvert(null);
    };
    const surClavier = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOuvert(null);
    };
    document.addEventListener('mousedown', surClic);
    document.addEventListener('keydown', surClavier);
    return () => {
      document.removeEventListener('mousedown', surClic);
      document.removeEventListener('keydown', surClavier);
    };
  }, [menuOuvert]);

  const couleurLien = transparent
    ? 'text-white hover:text-smv-green-light'
    : 'text-smv-navy hover:text-smv-green';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        transparent ? 'bg-transparent' : 'bg-white shadow-md',
      )}
    >
      <p
        className={cn(
          'border-b px-4 py-1 text-center text-[11px] uppercase tracking-wider',
          transparent ? 'border-white/20 text-white/80' : 'border-smv-gray-100 text-smv-gray-600',
        )}
      >
        Ministère des Armées et des Anciens Combattants
      </p>

      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-2.5">
        <Logo surFondSombre={transparent} />

        <nav ref={navRef} aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {NAVIGATION.map((element) =>
            element.sousMenu ? (
              <div key={element.label} className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOuvert(menuOuvert === element.label ? null : element.label)}
                  aria-expanded={menuOuvert === element.label}
                  aria-haspopup="true"
                  className={cn(
                    'flex items-center gap-1 rounded-md px-3 py-2 font-display text-base font-bold uppercase tracking-wide',
                    couleurLien,
                  )}
                >
                  {element.label}
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform', menuOuvert === element.label && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>
                {menuOuvert === element.label ? (
                  <ul className="absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-md border border-smv-gray-100 bg-white py-1 shadow-lg animate-fade-in-fast">
                    {element.sousMenu.map((sous) => (
                      <li key={sous.to}>
                        <Link
                          to={sous.to}
                          className="block px-4 py-2.5 text-sm font-semibold text-smv-gray-900 hover:bg-smv-off-white hover:text-smv-navy"
                          onClick={() => setMenuOuvert(null)}
                        >
                          {sous.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : (
              <NavLink
                key={element.to}
                to={element.to ?? '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 font-display text-base font-bold uppercase tracking-wide',
                    couleurLien,
                    isActive && (transparent ? 'text-smv-green-light' : 'text-smv-green'),
                  )
                }
              >
                {element.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button to="/candidater" size="sm" className="hidden sm:inline-flex">
            Je candidate
          </Button>
          <button
            type="button"
            onClick={() => setMenuMobile(!menuMobile)}
            aria-expanded={menuMobile}
            aria-label={menuMobile ? 'Fermer le menu' : 'Ouvrir le menu'}
            className={cn('rounded-md p-2 lg:hidden', couleurLien)}
          >
            {menuMobile ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuMobile ? (
        <nav
          aria-label="Navigation mobile"
          className="max-h-[calc(100vh-7rem)] overflow-y-auto border-t border-smv-gray-100 bg-white px-4 pb-6 pt-2 shadow-lg lg:hidden"
        >
          <ul className="space-y-1">
            {NAVIGATION.map((element) => (
              <li key={element.label}>
                {element.sousMenu ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-2.5 font-display text-lg font-bold uppercase text-smv-navy hover:bg-smv-off-white">
                      {element.label}
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="space-y-0.5 pb-1 pl-4">
                      {element.sousMenu.map((sous) => (
                        <li key={sous.to}>
                          <Link
                            to={sous.to}
                            className="block rounded-md px-3 py-2 text-sm font-semibold text-smv-gray-900 hover:bg-smv-off-white"
                          >
                            {sous.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    to={element.to ?? '/'}
                    className="block rounded-md px-3 py-2.5 font-display text-lg font-bold uppercase text-smv-navy hover:bg-smv-off-white"
                  >
                    {element.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Button to="/candidater" className="mt-4 w-full">
            Je candidate
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
