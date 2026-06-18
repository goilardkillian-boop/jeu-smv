import { Mail, Newspaper } from 'lucide-react';
import { ActualiteCard } from '../components/actualites/ActualiteCard';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Seo } from '../components/ui/Seo';
import { SkeletonGrid } from '../components/ui/Skeleton';
import { useActualites } from '../hooks/useActualites';

export default function PressePage() {
  const { data: actualites, chargement } = useActualites(3);

  return (
    <>
      <Seo
        titre="Espace presse"
        description="Espace presse du Service Militaire Volontaire : contact presse et dernières actualités des centres SMV."
        cheminCanonique="/presse"
      />
      <div className="mx-auto max-w-page px-4 pb-16">
        <Breadcrumb items={[{ label: 'Presse' }]} />
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy sm:text-5xl">
          Espace presse
        </h1>
        <p className="mt-2 max-w-2xl text-smv-gray-600">
          Journalistes, vous préparez un sujet sur l'insertion des jeunes ou sur le Service
          Militaire Volontaire ? Les centres SMV vous ouvrent leurs portes.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-lg bg-smv-off-white p-6">
          <Newspaper className="h-8 w-8 text-smv-green" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-display text-lg font-bold uppercase text-smv-navy">Contact presse</p>
            <p className="text-sm text-smv-gray-600">
              Demandes d'interview, de reportage ou de visuels : écrivez-nous, réponse sous 48 h.
            </p>
          </div>
          <Button href="mailto:presse@smv-connect.fr" variant="secondary">
            <Mail className="h-4 w-4" aria-hidden="true" />
            presse@smv-connect.fr
          </Button>
        </div>

        <h2 className="mt-12 font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy">
          Dernières actualités
        </h2>
        <div className="mt-6">
          {chargement ? (
            <SkeletonGrid nombre={3} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(actualites ?? []).map((actualite) => (
                <ActualiteCard key={actualite.id} actualite={actualite} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
