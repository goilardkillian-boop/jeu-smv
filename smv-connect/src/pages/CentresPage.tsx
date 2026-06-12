import { useMemo } from 'react';
import { CentreCard } from '../components/centres/CentreCard';
import { CentreMap } from '../components/centres/CentreMap';
import { GeoSearch } from '../components/home/GeoSearch';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Alert } from '../components/ui/Alert';
import { Seo } from '../components/ui/Seo';
import { SkeletonGrid } from '../components/ui/Skeleton';
import { useCentres } from '../hooks/useCentres';
import { trierCentresParDistance } from '../lib/haversine';
import { useSearchStore } from '../store/searchStore';
import type { Centre, CentreAvecDistance } from '../types/app.types';

export default function CentresPage() {
  const { data: centres, chargement, erreur } = useCentres();
  const origine = useSearchStore((s) => s.origine);

  const liste: Array<Centre | CentreAvecDistance> = useMemo(() => {
    if (!centres) return [];
    return origine ? trierCentresParDistance(centres, origine) : centres;
  }, [centres, origine]);

  return (
    <>
      <Seo
        titre="Nos centres SMV"
        description="Carte et liste des 7 centres du Service Militaire Volontaire en France : coordonnées, formations et contact recrutement."
        cheminCanonique="/centres"
      />
      <div className="mx-auto max-w-page px-4 pb-16">
        <Breadcrumb items={[{ label: 'Nos centres' }]} />

        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy sm:text-5xl">
          Nos centres SMV
        </h1>
        <p className="mt-2 max-w-2xl text-smv-gray-600">
          7 centres et antennes dans toute la France métropolitaine. Localise le tien, découvre
          ses formations et contacte directement son recrutement.
        </p>

        <div className="mt-6">
          <GeoSearch centres={centres ?? []} />
        </div>

        <div className="mt-8">
          <CentreMap
            centres={centres ?? []}
            origine={origine}
            afficherBassins
            cadrage={origine ? 'auto' : 'france'}
          />
        </div>

        <h2 className="mt-12 font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy">
          {origine ? `Les centres, du plus proche au plus éloigné` : 'Tous les centres'}
        </h2>

        <div className="mt-6">
          {chargement ? (
            <SkeletonGrid nombre={6} />
          ) : erreur ? (
            <Alert type="error">{erreur}</Alert>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {liste.map((centre, index) => (
                <CentreCard
                  key={centre.id}
                  centre={centre}
                  plusProche={Boolean(origine) && index === 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
