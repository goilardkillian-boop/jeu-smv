import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categorieParId } from '../../lib/constants';
import type { FormationAvecCentre } from '../../types/app.types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { PlaceholderImage } from '../ui/PlaceholderImage';
import { Tag } from '../ui/Tag';

export interface FormationCardProps {
  formation: FormationAvecCentre;
}

export function FormationCard({ formation }: FormationCardProps) {
  const categorie = categorieParId(formation.categorie);
  const estExpert = formation.public_vise === 'Volontaire expert';

  return (
    <Card hoverable className="flex h-full flex-col overflow-hidden">
      <div className="relative">
        {formation.image_url ? (
          <img
            src={formation.image_url}
            alt=""
            loading="lazy"
            className="h-40 w-full object-cover"
          />
        ) : (
          <PlaceholderImage
            categorie={formation.categorie}
            graine={formation.slug}
            className="h-40 w-full"
          />
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge
            label={categorie?.label ?? formation.categorie}
            className={categorie?.badgeClasses}
          />
        </div>
        <span
          className="absolute right-3 top-3"
          title={formation.public_vise}
          aria-label={formation.public_vise}
        >
          <Badge variant={estExpert ? 'navy' : 'green'} label={estExpert ? 'VE' : 'VS'} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-xl font-bold uppercase leading-tight text-smv-navy">
          <Link to={`/formations/${formation.slug}`} className="hover:text-smv-green">
            {formation.titre}
          </Link>
        </h3>

        {formation.centre ? (
          <Link
            to={`/centres/${formation.centre.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-smv-gray-600 hover:text-smv-navy hover:underline"
          >
            <MapPin className="h-3.5 w-3.5 text-smv-green" aria-hidden="true" />
            Centre SMV de {formation.centre.nom}
          </Link>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="navy" label={`${formation.duree_mois} mois`} />
          {formation.places_disponibles !== null ? (
            <span className="inline-flex items-center gap-1 text-smv-gray-600">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {formation.places_disponibles} places
            </span>
          ) : null}
        </div>

        {formation.dates_incorporation && formation.dates_incorporation.length > 0 ? (
          <p className="inline-flex flex-wrap items-center gap-1.5 text-xs text-smv-gray-600">
            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-smv-green" aria-hidden="true" />
            <span className="font-semibold">Incorporations :</span>
            {formation.dates_incorporation.join(' · ')}
          </p>
        ) : null}

        {formation.certifications && formation.certifications.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5" aria-label="Certifications obtenues">
            {formation.certifications.slice(0, 3).map((certification) => (
              <li key={certification}>
                <Tag label={certification} tone="green" />
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          <Button to={`/formations/${formation.slug}`} variant="ghost" size="sm">
            Voir la fiche
          </Button>
          <Button
            to={`/candidater?centre=${formation.centre?.slug ?? ''}&formation=${formation.slug}`}
            size="sm"
          >
            Je candidate
          </Button>
        </div>
      </div>
    </Card>
  );
}
