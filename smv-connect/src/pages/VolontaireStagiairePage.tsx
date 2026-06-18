import { BadgeCheck, Car, Dumbbell, Euro, GraduationCap, HeartHandshake, Users } from 'lucide-react';
import { ProcessusCandidature } from '../components/seformer/ProcessusCandidature';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Seo } from '../components/ui/Seo';

const CONDITIONS = [
  'Avoir entre 18 et 25 ans',
  'Être de nationalité française',
  'Aucun diplôme requis',
  'Situation de handicap : possible selon les cas (parle-en au recruteur)',
];

const PARCOURS = [
  { icon: Users, titre: 'Formation militaire', detail: 'Un mois pour gagner en discipline, cohésion et confiance en toi.' },
  { icon: Car, titre: 'Permis de conduire', detail: "Code et conduite financés pendant ton parcours : un vrai plus pour l'emploi." },
  { icon: Dumbbell, titre: 'Remise à niveau', detail: 'Français, calcul, numérique, sport quotidien et SST (sauveteur secouriste).' },
  { icon: GraduationCap, titre: 'Formation métier', detail: 'Une filière professionnelle avec stages en entreprise et certification.' },
];

export default function VolontaireStagiairePage() {
  return (
    <>
      <Seo
        titre="Devenir Volontaire Stagiaire"
        description="Le parcours Volontaire Stagiaire du SMV : 8 à 12 mois rémunérés 358 €/mois nourri-logé, sans condition de diplôme, pour les 18-25 ans de nationalité française."
        cheminCanonique="/se-former/volontaire-stagiaire"
      />
      <div className="mx-auto max-w-page px-4 pb-16">
        <Breadcrumb items={[{ label: 'Se former' }, { label: 'Volontaire Stagiaire' }]} />

        <header className="rounded-lg bg-smv-green px-6 py-10 text-white sm:px-10">
          <p className="text-sm font-bold uppercase tracking-widest text-white/80">Se former</p>
          <h1 className="mt-1 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
            Volontaire Stagiaire
          </h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Tu veux prendre un nouveau départ ? Le SMV t'attend. Objectif : ton insertion
            professionnelle durable, avec un métier appris et un emploi à la clé.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold">
            <span className="inline-flex items-center gap-2 rounded-md bg-white/15 px-4 py-2">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Contrat militaire de 8 à 12 mois
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-white/15 px-4 py-2">
              <Euro className="h-4 w-4" aria-hidden="true" />
              Solde de 358 €/mois brut, nourri et logé
            </span>
          </div>
        </header>

        <section aria-labelledby="conditions-vs" className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 id="conditions-vs" className="font-display text-3xl font-extrabold uppercase text-smv-navy">
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
              Et avec l'aide de qui ?
            </h3>
            <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-smv-gray-900">
              <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-smv-green" aria-hidden="true" />
              Tout au long de ton parcours, tu es encadré·e par des militaires expérimentés et
              accompagné·e individuellement : projet professionnel, logement, santé, mobilité.
              Tu n'es jamais seul·e.
            </p>
          </Card>
        </section>

        <section aria-labelledby="parcours-vs" className="mt-14">
          <h2 id="parcours-vs" className="font-display text-3xl font-extrabold uppercase text-smv-navy">
            Ton parcours de formation
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PARCOURS.map((bloc) => (
              <Card key={bloc.titre} className="p-5">
                <bloc.icon className="h-7 w-7 text-smv-green" aria-hidden="true" />
                <h3 className="mt-2 font-display text-lg font-bold uppercase text-smv-navy">{bloc.titre}</h3>
                <p className="mt-1 text-xs leading-relaxed text-smv-gray-600">{bloc.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="processus-vs" className="mt-14">
          <h2 id="processus-vs" className="font-display text-3xl font-extrabold uppercase text-smv-navy">
            Comment candidater ? 8 étapes
          </h2>
          <div className="mt-8">
            <ProcessusCandidature />
          </div>
        </section>

        <div className="mt-12 rounded-lg bg-smv-navy px-6 py-10 text-center">
          <p className="font-display text-3xl font-extrabold uppercase text-white">
            Prêt·e à te lancer ?
          </p>
          <p className="mx-auto mt-2 max-w-xl text-white/85">
            Un tremplin pour l'emploi : 78 % des volontaires stagiaires trouvent une solution
            d'emploi ou de formation à la sortie.
          </p>
          <div className="mt-6">
            <Button to="/candidater" size="lg">
              Je candidate
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
