import { BadgeCheck, Car, Euro, FileSpreadsheet, UtensilsCrossed, Users } from 'lucide-react';
import { ProcessusCandidature } from '../components/seformer/ProcessusCandidature';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Seo } from '../components/ui/Seo';

const CONDITIONS = [
  'Avoir entre 18 et 25 ans',
  'Être de nationalité française',
  "Être titulaire au minimum d'un CAP",
];

const ROLES = [
  { icon: Users, titre: 'Encadrement des VS', detail: "Chef d'équipe au plus près des volontaires stagiaires : tu montres l'exemple." },
  { icon: Car, titre: 'Aide-moniteur de conduite', detail: 'Tu épaules les moniteurs pour préparer les VS au permis B.' },
  { icon: FileSpreadsheet, titre: 'Aide DRH', detail: 'Gestion administrative, dossiers et plannings au bureau RH du centre.' },
  { icon: UtensilsCrossed, titre: 'Aide RHL', detail: 'Restauration, hébergement et loisirs : la vie quotidienne du centre.' },
];

export default function VolontaireExpertPage() {
  return (
    <>
      <Seo
        titre="Devenir Volontaire Expert"
        description="Le parcours Volontaire Expert du SMV : 1 an renouvelable 4 fois, 745 €/mois nourri-logé, pour les 18-25 ans diplômés d'un CAP minimum. Une première expérience professionnelle reconnue."
        cheminCanonique="/se-former/volontaire-expert"
      />
      <div className="mx-auto max-w-page px-4 pb-16">
        <Breadcrumb items={[{ label: 'Se former' }, { label: 'Volontaire Expert' }]} />

        <header className="rounded-lg bg-smv-navy px-6 py-10 text-white sm:px-10">
          <p className="text-sm font-bold uppercase tracking-widest text-white/70">Se former</p>
          <h1 className="mt-1 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
            Volontaire Expert
          </h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Diplômé·e mais sans expérience ? Deviens volontaire expert : une première expérience
            professionnelle solide, des responsabilités réelles et une ligne qui compte sur ton CV.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold">
            <span className="inline-flex items-center gap-2 rounded-md bg-white/15 px-4 py-2">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Contrat militaire d'1 an, renouvelable 4 fois
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-white/15 px-4 py-2">
              <Euro className="h-4 w-4" aria-hidden="true" />
              Solde de 745 €/mois brut, nourri et logé
            </span>
          </div>
        </header>

        <section aria-labelledby="conditions-ve" className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 id="conditions-ve" className="font-display text-3xl font-extrabold uppercase text-smv-navy">
              Les conditions
            </h2>
            <ul className="mt-4 space-y-3">
              {CONDITIONS.map((condition) => (
                <li key={condition} className="flex items-start gap-2 text-smv-gray-900">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-smv-green" aria-hidden="true" />
                  {condition}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button to="/candidater" size="lg">
                Je candidate
              </Button>
            </div>
          </div>
          <Card className="bg-smv-off-white p-6">
            <h3 className="font-display text-xl font-bold uppercase text-smv-navy">
              Objectif : ta première expérience
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-smv-gray-900">
              Comme volontaire expert, tu n'es pas en formation : tu occupes un vrai poste au
              service du centre et des volontaires stagiaires. À la sortie, tu repars avec une
              expérience attestée, des compétences d'encadrement et un réseau professionnel.
            </p>
          </Card>
        </section>

        <section aria-labelledby="roles-ve" className="mt-14">
          <h2 id="roles-ve" className="font-display text-3xl font-extrabold uppercase text-smv-navy">
            Les rôles possibles
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map((role) => (
              <Card key={role.titre} className="p-5">
                <role.icon className="h-7 w-7 text-smv-green" aria-hidden="true" />
                <h3 className="mt-2 font-display text-lg font-bold uppercase text-smv-navy">{role.titre}</h3>
                <p className="mt-1 text-xs leading-relaxed text-smv-gray-600">{role.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="processus-ve" className="mt-14">
          <h2 id="processus-ve" className="font-display text-3xl font-extrabold uppercase text-smv-navy">
            Comment candidater ? 8 étapes
          </h2>
          <div className="mt-8">
            <ProcessusCandidature />
          </div>
        </section>

        <div className="mt-12 rounded-lg bg-smv-green px-6 py-10 text-center">
          <p className="font-display text-3xl font-extrabold uppercase text-white">
            Ton expérience commence ici
          </p>
          <div className="mt-6">
            <Button to="/candidater" size="lg" variant="secondary">
              Je candidate
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
