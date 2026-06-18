import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const RESEAUX = [
  { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/le.smv.fr' },
  { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/smv_officiel' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/service-militaire-volontaire' },
  { label: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@servicemilitairevolontaire' },
];

const LIENS_UTILES = [
  { label: "Rapport Annuel d'Activités", to: '/decouvrir#rapport' },
  { label: 'Actualités', to: '/actualites' },
  { label: 'Nos centres', to: '/centres' },
];

const LIENS_LEGAL = [
  { label: 'Accessibilité', to: '/accessibilite' },
  { label: 'Contact', to: '/contact' },
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'RGPD', to: '/rgpd' },
  { label: 'Plan du site', to: '/plan-du-site' },
  { label: 'Gestion des cookies', to: '/rgpd#cookies' },
];

const LIENS_GOUV = [
  { label: 'legifrance.gouv.fr', href: 'https://www.legifrance.gouv.fr' },
  { label: 'gouvernement.fr', href: 'https://www.gouvernement.fr' },
  { label: 'service-public.fr', href: 'https://www.service-public.fr' },
  { label: 'data.gouv.fr', href: 'https://www.data.gouv.fr' },
];

export function Footer() {
  return (
    <footer className="bg-smv-navy-dark text-white">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo surFondSombre avecDevise={false} />
          <p className="mt-4 text-sm text-white/80">Le SMV, un tremplin pour l'avenir.</p>
          <ul className="mt-4 flex gap-3" aria-label="Réseaux sociaux du SMV">
            {RESEAUX.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} du SMV (nouvelle fenêtre)`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-smv-green"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Liens utiles">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-smv-green-light">
            Liens utiles
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {LIENS_UTILES.map((lien) => (
              <li key={lien.label}>
                <Link to={lien.to} className="text-white/85 underline-offset-2 hover:text-white hover:underline">
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Informations légales">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-smv-green-light">
            Légal
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {LIENS_LEGAL.map((lien) => (
              <li key={lien.label}>
                <Link to={lien.to} className="text-white/85 underline-offset-2 hover:text-white hover:underline">
                  {lien.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/admin/login" className="text-white/60 underline-offset-2 hover:text-white hover:underline">
                Espace recruteur
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-page flex-col gap-4 px-4 py-6 text-xs text-white/70 lg:flex-row lg:items-center lg:justify-between">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-semibold uppercase tracking-wide">
            <span>République Française</span>
            <span aria-hidden="true">•</span>
            <span>Ministère des Armées</span>
            <span aria-hidden="true">•</span>
            <span>Cofinancé par l'Union européenne — FSE+</span>
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {LIENS_GOUV.map((lien) => (
              <li key={lien.href}>
                <a
                  href={lien.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:text-white hover:underline"
                >
                  {lien.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="px-4 pb-6 text-center text-[11px] text-white/50">
          Sauf mention contraire, les contenus de ce site sont proposés sous{' '}
          <a
            href="https://www.etalab.gouv.fr/licence-ouverte-open-licence/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white"
          >
            licence etalab-2.0
          </a>
          . Projet de démonstration SMV Connect — données issues de le-smv.gouv.fr.
        </p>
      </div>
    </footer>
  );
}
