import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Seo } from '../components/ui/Seo';

export default function MentionsLegalesPage() {
  return (
    <>
      <Seo titre="Mentions légales" cheminCanonique="/mentions-legales" />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <Breadcrumb items={[{ label: 'Mentions légales' }]} />
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy">
          Mentions légales
        </h1>

        <div className="prose-smv mt-8 space-y-6 text-sm leading-relaxed text-smv-gray-900">
          <section>
            <h2 className="font-display text-xl font-bold uppercase text-smv-navy">Éditeur</h2>
            <p className="mt-2">
              SMV Connect est une application de démonstration consacrée au Service Militaire
              Volontaire, dispositif du ministère des Armées. Le site officiel de référence est{' '}
              <a href="https://www.le-smv.gouv.fr" className="underline" target="_blank" rel="noopener noreferrer">
                le-smv.gouv.fr
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase text-smv-navy">Hébergement</h2>
            <p className="mt-2">
              Application hébergée sur Vercel (frontend) et Supabase (base de données et
              authentification). Les fonds de carte sont fournis par OpenStreetMap et le
              géocodage par l'API Adresse (data.gouv.fr).
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase text-smv-navy">
              Propriété intellectuelle
            </h2>
            <p className="mt-2">
              Sauf mention contraire, les contenus textuels relatifs au SMV sont réutilisés ou
              adaptés depuis le site officiel sous licence{' '}
              <a
                href="https://www.etalab.gouv.fr/licence-ouverte-open-licence/"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                etalab-2.0
              </a>
              . Les marques et blasons restent la propriété de leurs titulaires respectifs.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase text-smv-navy">Responsabilité</h2>
            <p className="mt-2">
              Les informations publiées (formations, dates d'incorporation, coordonnées) sont
              fournies à titre indicatif et peuvent évoluer. Seuls les centres SMV font foi pour
              confirmer une information de recrutement.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
