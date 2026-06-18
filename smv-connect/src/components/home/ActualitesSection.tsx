import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useActualites } from '../../hooks/useActualites';
import { SkeletonGrid } from '../ui/Skeleton';
import { ActualiteCard } from '../actualites/ActualiteCard';

/** Les 3 dernières actualités publiées. */
export function ActualitesSection() {
  const { data: actualites, chargement } = useActualites(3);

  if (!chargement && (!actualites || actualites.length === 0)) return null;

  return (
    <section aria-labelledby="actualites-titre" className="bg-white py-16">
      <div className="mx-auto max-w-page px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="actualites-titre"
            className="font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy"
          >
            Actualités
          </h2>
          <Link
            to="/actualites"
            className="inline-flex items-center gap-1 text-sm font-bold text-smv-green hover:underline"
          >
            Toutes les actualités
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8">
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
    </section>
  );
}
