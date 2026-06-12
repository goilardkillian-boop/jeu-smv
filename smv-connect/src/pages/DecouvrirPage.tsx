import {
  Award,
  FileDown,
  Flag,
  HeartHandshake,
  Medal,
  Target,
  Users,
} from 'lucide-react';
import { PartenairesSection } from '../components/home/PartenairesSection';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Seo } from '../components/ui/Seo';

const ATOUTS = [
  {
    icon: HeartHandshake,
    titre: 'Accompagnement individuel',
    detail: "Chaque volontaire est suivi personnellement : projet professionnel, santé, logement, mobilité.",
  },
  {
    icon: Medal,
    titre: 'Militarité',
    detail: "Discipline, esprit d'équipe, dépassement de soi : des valeurs qui font la différence auprès des employeurs.",
  },
  {
    icon: Flag,
    titre: 'Volontariat',
    detail: "On ne subit pas le SMV, on le choisit. C'est l'engagement de chacun qui fait la réussite de tous.",
  },
  {
    icon: Users,
    titre: 'Partenariats',
    detail: "Entreprises, organismes de formation et service public de l'emploi construisent les filières avec nous.",
  },
];

export default function DecouvrirPage() {
  return (
    <>
      <Seo
        titre="Découvrir le SMV"
        description="Le Service Militaire Volontaire, dispositif du ministère des Armées : insertion sociale et professionnelle durable des 18-25 ans, certifié Qualiopi et cofinancé par le FSE+."
        cheminCanonique="/decouvrir"
      />
      <div className="mx-auto max-w-page px-4 pb-16">
        <Breadcrumb items={[{ label: 'Découvrir le SMV' }]} />

        <header className="max-w-3xl">
          <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy sm:text-5xl">
            Le Service Militaire Volontaire
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-smv-gray-900">
            Le SMV est un dispositif militaire d'insertion du <strong>ministère des Armées</strong>.
            Sa mission : permettre à des jeunes de 18 à 25 ans, éloignés du marché de l'emploi,
            de réussir leur <strong>insertion sociale et professionnelle durable</strong>.
          </p>
          <p className="mt-3 leading-relaxed text-smv-gray-900">
            Sa recette est unique : un cadre militaire structurant, fondé sur des valeurs de
            rigueur et de cohésion, combiné à une formation professionnelle dans des métiers qui
            recrutent. Le tout, rémunéré, nourri et logé.
          </p>
        </header>

        <section aria-labelledby="cible-titre" className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="p-6 text-center">
            <Target className="mx-auto h-8 w-8 text-smv-green" aria-hidden="true" />
            <h2 id="cible-titre" className="mt-2 font-display text-xl font-bold uppercase text-smv-navy">
              Pour qui ?
            </h2>
            <p className="mt-1 text-sm text-smv-gray-600">
              Les 18-25 ans, de nationalité française, peu ou pas diplômés, exclus du marché de
              l'emploi — ou diplômés sans expérience (volontaires experts).
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Award className="mx-auto h-8 w-8 text-smv-green" aria-hidden="true" />
            <h2 className="mt-2 font-display text-xl font-bold uppercase text-smv-navy">
              Certifié Qualiopi
            </h2>
            <p className="mt-1 text-sm text-smv-gray-600">
              La qualité des processus de formation du SMV est certifiée Qualiopi, le référentiel
              national des organismes de formation.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Flag className="mx-auto h-8 w-8 text-smv-green" aria-hidden="true" />
            <h2 className="mt-2 font-display text-xl font-bold uppercase text-smv-navy">
              Financé par le FSE+
            </h2>
            <p className="mt-1 text-sm text-smv-gray-600">
              Le SMV est cofinancé par le Fonds social européen depuis 2019 : 39 M€ sur 2022-2024,
              pour accompagner jusqu'à 1 300 jeunes par an.
            </p>
          </Card>
        </section>

        <section aria-labelledby="atouts-titre" className="mt-14">
          <h2 id="atouts-titre" className="font-display text-3xl font-extrabold uppercase text-smv-navy">
            Nos atouts
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ATOUTS.map((atout) => (
              <Card key={atout.titre} className="p-5">
                <atout.icon className="h-7 w-7 text-smv-green" aria-hidden="true" />
                <h3 className="mt-2 font-display text-lg font-bold uppercase text-smv-navy">{atout.titre}</h3>
                <p className="mt-1 text-xs leading-relaxed text-smv-gray-600">{atout.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="difference-titre" className="mt-14 max-w-3xl">
          <h2 id="difference-titre" className="font-display text-3xl font-extrabold uppercase text-smv-navy">
            La différence SMV
          </h2>
          <p className="mt-4 leading-relaxed text-smv-gray-900">
            Au SMV, on ne se contente pas d'apprendre un métier. On reprend un rythme, on remet
            de l'ordre dans sa vie, on découvre ce dont on est capable. L'uniforme efface les
            différences, le sport du matin forge l'endurance, la promotion devient une seconde
            famille. C'est cette transformation globale — humaine autant que professionnelle —
            que les employeurs reconnaissent chez les anciens volontaires.
          </p>
          <blockquote className="mt-8 border-l-4 border-smv-green pl-5">
            <p className="font-display text-2xl font-bold uppercase text-smv-navy">
              « Rien n'est trop difficile pour la jeunesse »
            </p>
            <cite className="mt-1 block text-sm not-italic text-smv-gray-600">— Socrate</cite>
          </blockquote>
        </section>

        <section aria-labelledby="armees-titre" className="mt-14">
          <h2 id="armees-titre" className="sr-only">
            Les armées au service du SMV
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 rounded-lg bg-smv-off-white px-6 py-8 text-center font-display text-lg font-bold uppercase text-smv-navy">
            <span>Armée de Terre</span>
            <span aria-hidden="true" className="text-smv-green">★</span>
            <span>Armée de l'Air et de l'Espace</span>
            <span aria-hidden="true" className="text-smv-green">★</span>
            <span>Marine nationale</span>
          </div>
        </section>

        <section id="rapport" aria-labelledby="rapport-titre" className="mt-14">
          <Card className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="rapport-titre" className="font-display text-xl font-bold uppercase text-smv-navy">
                Rapport annuel d'activité
              </h2>
              <p className="mt-1 text-sm text-smv-gray-600">
                Chiffres, résultats d'insertion et temps forts de l'année : consulte le rapport
                annuel du SMV sur le site officiel.
              </p>
            </div>
            <Button
              href="https://www.le-smv.gouv.fr"
              variant="secondary"
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              Consulter (PDF)
            </Button>
          </Card>
        </section>

        <div className="mt-12 text-center">
          <Button to="/candidater" size="lg">
            Je candidate
          </Button>
        </div>
      </div>

      <div id="partenaires">
        <PartenairesSection />
      </div>
    </>
  );
}
