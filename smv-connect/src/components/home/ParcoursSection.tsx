import { BadgeCheck, Clock, Euro, GraduationCap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface Parcours {
  titre: string;
  conditions: string;
  duree: string;
  solde: string;
  description: string;
  lien: string;
  accent: 'green' | 'navy';
}

const PARCOURS: Parcours[] = [
  {
    titre: 'Volontaire stagiaire',
    conditions: '18-25 ans · aucun diplôme requis',
    duree: '8 à 12 mois',
    solde: '358 €/mois brut, nourri et logé',
    description:
      "Tu veux apprendre un métier et décrocher un emploi durable ? Le parcours VS combine formation militaire, permis de conduire et formation professionnelle.",
    lien: '/se-former/volontaire-stagiaire',
    accent: 'green',
  },
  {
    titre: 'Volontaire expert',
    conditions: '18-25 ans · CAP minimum',
    duree: '1 an, renouvelable 4 fois',
    solde: '745 €/mois brut, nourri et logé',
    description:
      "Déjà diplômé·e ? Gagne une première expérience professionnelle reconnue : encadrement, aide-moniteur de conduite, RH ou restauration.",
    lien: '/se-former/volontaire-expert',
    accent: 'navy',
  },
];

/** « Deux parcours pour toi » : cards VS / VE. */
export function ParcoursSection() {
  return (
    <section aria-labelledby="parcours-titre" className="bg-white py-16">
      <div className="mx-auto max-w-page px-4">
        <h2
          id="parcours-titre"
          className="text-center font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy"
        >
          Deux parcours pour toi
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-smv-gray-600">
          Avec ou sans diplôme, le SMV t'attend. Choisis le parcours qui te ressemble.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PARCOURS.map((parcours) => (
            <Card key={parcours.titre} hoverable className="flex flex-col overflow-hidden">
              <div
                className={
                  parcours.accent === 'green'
                    ? 'bg-smv-green px-5 py-4'
                    : 'bg-smv-navy px-5 py-4'
                }
              >
                <h3 className="font-display text-2xl font-extrabold uppercase text-white">
                  {parcours.titre}
                </h3>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <ul className="space-y-2 text-sm text-smv-gray-900">
                  <li className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                    {parcours.conditions}
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                    {parcours.duree}
                  </li>
                  <li className="flex items-center gap-2">
                    <Euro className="h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                    {parcours.solde}
                  </li>
                  <li className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                    Formation certifiante + accompagnement vers l'emploi
                  </li>
                </ul>
                <p className="text-sm leading-relaxed text-smv-gray-600">{parcours.description}</p>
                <div className="mt-auto pt-2">
                  <Button to={parcours.lien} variant={parcours.accent === 'green' ? 'primary' : 'secondary'}>
                    En savoir plus
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
