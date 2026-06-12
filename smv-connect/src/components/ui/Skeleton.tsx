import { cn } from '../../lib/utils';

/** Bloc de chargement « pulse ». */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('animate-pulse rounded-md bg-smv-gray-100', className)} />;
}

/** Squelette de card (listes de formations, centres, actualités). */
export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-smv-gray-100 bg-white">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

/** Grille de squelettes. */
export function SkeletonGrid({ nombre = 6 }: { nombre?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Chargement">
      {Array.from({ length: nombre }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
