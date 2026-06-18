import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistance, formatTrajet } from '../../lib/haversine';
import { telHref } from '../../lib/utils';
import type { Centre, CentreAvecDistance } from '../../types/app.types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { PlaceholderBlason } from '../ui/PlaceholderImage';

export interface CentreCardProps {
  centre: Centre | CentreAvecDistance;
  /** Met en avant le centre le plus proche (badge + bordure verte). */
  plusProche?: boolean;
  compact?: boolean;
}

function aUneDistance(centre: Centre | CentreAvecDistance): centre is CentreAvecDistance {
  return 'distanceKm' in centre;
}

export function CentreCard({ centre, plusProche = false, compact = false }: CentreCardProps) {
  const distance = aUneDistance(centre) ? centre : null;

  return (
    <Card hoverable className={plusProche ? 'border-2 border-smv-green' : undefined}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          {centre.blason_url ? (
            <img src={centre.blason_url} alt="" className="h-14 w-12 shrink-0 object-contain" />
          ) : (
            <PlaceholderBlason nom={centre.nom} className="h-14 w-12 shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {plusProche ? <Badge variant="green" label="Centre le plus proche" /> : null}
              {distance ? (
                <Badge
                  variant="navy"
                  label={`${formatDistance(distance.distanceKm)} · ~${formatTrajet(distance.trajetMinutes)}`}
                />
              ) : null}
            </div>
            <h3 className="mt-1 font-display text-2xl font-bold uppercase leading-tight text-smv-navy">
              <Link to={`/centres/${centre.slug}`} className="hover:text-smv-green">
                {centre.nom}
              </Link>
            </h3>
            <p className="text-sm font-semibold text-smv-gray-600">{centre.nom_regiment}</p>
            <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-smv-gray-600">
              <MapPin className="h-3.5 w-3.5 text-smv-green" aria-hidden="true" />
              {centre.ville} — {centre.region}
            </p>
          </div>
        </div>

        {!compact ? (
          <>
            {centre.description_courte ? (
              <p className="mt-3 text-sm leading-relaxed text-smv-gray-900">{centre.description_courte}</p>
            ) : null}
            <ul className="mt-3 space-y-1 text-sm">
              {centre.telephone_1 ? (
                <li>
                  <a
                    href={telHref(centre.telephone_1)}
                    className="inline-flex items-center gap-2 text-smv-navy hover:underline"
                  >
                    <Phone className="h-4 w-4 text-smv-green" aria-hidden="true" />
                    {centre.telephone_1}
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  href={`mailto:${centre.email_recrutement}`}
                  className="inline-flex max-w-full items-center gap-2 text-smv-navy hover:underline"
                >
                  <Mail className="h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                  <span className="truncate">{centre.email_recrutement}</span>
                </a>
              </li>
            </ul>
          </>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <Button to={`/centres/${centre.slug}`} variant="secondary" size="sm">
            Voir le centre
          </Button>
          <Button to={`/candidater?centre=${centre.slug}`} size="sm">
            Je candidate
          </Button>
        </div>
      </div>
    </Card>
  );
}
