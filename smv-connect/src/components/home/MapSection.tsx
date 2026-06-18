import { useSearchStore } from '../../store/searchStore';
import type { Centre } from '../../types/app.types';
import { CentreMap } from '../centres/CentreMap';

export interface MapSectionProps {
  centres: Centre[];
}

/** Carte interactive des 7 centres (Leaflet + OSM). */
export function MapSection({ centres }: MapSectionProps) {
  const origine = useSearchStore((s) => s.origine);

  return (
    <section aria-labelledby="carte-titre" className="bg-smv-off-white py-16">
      <div className="mx-auto max-w-page px-4">
        <h2
          id="carte-titre"
          className="text-center font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy"
        >
          7 centres près de chez toi
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-smv-gray-600">
          Clique sur un marqueur pour découvrir le centre, son contact et ses formations.
        </p>
        <div className="mt-8">
          <CentreMap centres={centres} origine={origine} />
        </div>
      </div>
    </section>
  );
}
