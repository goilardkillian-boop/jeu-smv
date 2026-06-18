import { useMemo } from 'react';
import { useCentres } from '../../hooks/useCentres';
import { trierCentresParDistance } from '../../lib/haversine';
import type { Centre } from '../../types/app.types';
import { SkeletonCard } from '../ui/Skeleton';
import { CentreCard } from './CentreCard';

export interface CentresProchesProps {
  centre: Centre;
  nombre?: number;
}

/** Les centres SMV les plus proches d'un centre donné. */
export function CentresProches({ centre, nombre = 2 }: CentresProchesProps) {
  const { data: centres, chargement } = useCentres();

  const proches = useMemo(() => {
    if (!centres) return [];
    return trierCentresParDistance(
      centres.filter((c) => c.id !== centre.id),
      centre,
    ).slice(0, nombre);
  }, [centres, centre, nombre]);

  if (chargement) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }
  if (proches.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {proches.map((proche) => (
        <CentreCard key={proche.id} centre={proche} compact />
      ))}
    </div>
  );
}
