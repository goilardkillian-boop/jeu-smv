import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate, tronquer } from '../../lib/utils';
import type { ActualiteAvecCentre } from '../../types/app.types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { PlaceholderImage } from '../ui/PlaceholderImage';

export interface ActualiteCardProps {
  actualite: ActualiteAvecCentre;
}

export function ActualiteCard({ actualite }: ActualiteCardProps) {
  return (
    <Card hoverable className="flex h-full flex-col overflow-hidden">
      {actualite.image_url ? (
        <img src={actualite.image_url} alt="" loading="lazy" className="h-44 w-full object-cover" />
      ) : (
        <PlaceholderImage graine={actualite.slug} className="h-44 w-full" />
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-smv-gray-600">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5 text-smv-green" aria-hidden="true" />
            <time dateTime={actualite.publie_le}>{formatDate(actualite.publie_le)}</time>
          </span>
          {actualite.categorie ? <Badge variant="gray" label={actualite.categorie} /> : null}
          {actualite.centre ? <Badge variant="navy" label={actualite.centre.nom} /> : null}
        </div>
        <h3 className="font-display text-xl font-bold uppercase leading-tight text-smv-navy">
          <Link to={`/actualites/${actualite.slug}`} className="hover:text-smv-green">
            {actualite.titre}
          </Link>
        </h3>
        {actualite.extrait ? (
          <p className="text-sm leading-relaxed text-smv-gray-900">{tronquer(actualite.extrait, 160)}</p>
        ) : null}
        <Link
          to={`/actualites/${actualite.slug}`}
          className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-bold text-smv-green hover:underline"
        >
          Lire la suite
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
