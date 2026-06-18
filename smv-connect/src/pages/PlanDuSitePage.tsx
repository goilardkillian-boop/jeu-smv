import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Seo } from '../components/ui/Seo';

const SECTIONS: Array<{ titre: string; liens: Array<{ label: string; to: string }> }> = [
  {
    titre: 'Découvrir',
    liens: [
      { label: 'Accueil', to: '/' },
      { label: 'Présentation du SMV', to: '/decouvrir' },
      { label: 'Espace presse', to: '/presse' },
    ],
  },
  {
    titre: 'Se former',
    liens: [
      { label: 'Devenir Volontaire Stagiaire', to: '/se-former/volontaire-stagiaire' },
      { label: 'Devenir Volontaire Expert', to: '/se-former/volontaire-expert' },
      { label: 'Catalogue des formations', to: '/formations' },
      { label: 'Je candidate', to: '/candidater' },
    ],
  },
  {
    titre: 'Les centres',
    liens: [
      { label: 'Carte et liste des centres', to: '/centres' },
      { label: 'Actualités', to: '/actualites' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    titre: 'Informations légales',
    liens: [
      { label: 'Mentions légales', to: '/mentions-legales' },
      { label: 'Protection des données (RGPD)', to: '/rgpd' },
      { label: 'Accessibilité', to: '/accessibilite' },
      { label: 'Espace recruteur', to: '/admin/login' },
    ],
  },
];

export default function PlanDuSitePage() {
  return (
    <>
      <Seo titre="Plan du site" cheminCanonique="/plan-du-site" />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <Breadcrumb items={[{ label: 'Plan du site' }]} />
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy">
          Plan du site
        </h1>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {SECTIONS.map((section) => (
            <nav key={section.titre} aria-label={section.titre}>
              <h2 className="font-display text-xl font-bold uppercase text-smv-navy">{section.titre}</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {section.liens.map((lien) => (
                  <li key={lien.to}>
                    <Link to={lien.to} className="text-smv-gray-900 underline-offset-2 hover:text-smv-navy hover:underline">
                      {lien.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </>
  );
}
