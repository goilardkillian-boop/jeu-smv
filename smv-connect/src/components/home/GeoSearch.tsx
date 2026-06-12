import { ArrowRight, LocateFixed, MapPin, Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGeocode } from '../../hooks/useGeocode';
import { useGeolocation } from '../../hooks/useGeolocation';
import { formatDistance, formatTrajet, trierCentresParDistance } from '../../lib/haversine';
import { useSearchStore } from '../../store/searchStore';
import type { Centre } from '../../types/app.types';
import { Button } from '../ui/Button';
import { Loader } from '../ui/Loader';
import { CentreCard } from '../centres/CentreCard';

export interface GeoSearchProps {
  centres: Centre[];
}

/**
 * Recherche géographique : géolocalisation navigateur ou saisie d'une ville
 * (API Adresse, debounce 300 ms), puis tri des centres par distance.
 */
export function GeoSearch({ centres }: GeoSearchProps) {
  const origine = useSearchStore((s) => s.origine);
  const definirOrigine = useSearchStore((s) => s.definirOrigine);
  const effacerOrigine = useSearchStore((s) => s.effacerOrigine);

  const [query, setQuery] = useState('');
  const [listeOuverte, setListeOuverte] = useState(false);
  const { suggestions, recherche } = useGeocode(listeOuverte ? query : '');
  const { localisation, erreur: erreurGeo, demanderPosition } = useGeolocation();
  const conteneurRef = useRef<HTMLDivElement>(null);

  const resultats = useMemo(
    () => (origine ? trierCentresParDistance(centres, origine) : []),
    [centres, origine],
  );
  const plusProche = resultats[0];
  const suivants = resultats.slice(1, 4);

  // Fermeture des suggestions au clic extérieur.
  useEffect(() => {
    const surClic = (e: MouseEvent) => {
      if (conteneurRef.current && !conteneurRef.current.contains(e.target as Node)) {
        setListeOuverte(false);
      }
    };
    document.addEventListener('mousedown', surClic);
    return () => document.removeEventListener('mousedown', surClic);
  }, []);

  return (
    <div
      ref={conteneurRef}
      className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-2xl sm:p-5"
    >
      <p className="mb-3 font-display text-lg font-bold uppercase text-smv-navy">
        Trouve le centre SMV le plus proche de chez toi
      </p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-smv-gray-600"
            aria-hidden="true"
          />
          <input
            type="text"
            role="combobox"
            aria-expanded={listeOuverte && suggestions.length > 0}
            aria-controls="geo-suggestions"
            aria-autocomplete="list"
            aria-label="Saisis ta ville"
            placeholder="Ta ville (ex. Poitiers, Lille…)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setListeOuverte(true);
            }}
            onFocus={() => setListeOuverte(true)}
            className="w-full rounded-md border border-smv-gray-300 py-2.5 pl-9 pr-9 text-sm text-smv-gray-900 focus:border-smv-navy focus:outline-none focus:ring-2 focus:ring-smv-navy/30"
          />
          {recherche ? (
            <Loader size="sm" className="absolute right-3 top-1/2 -translate-y-1/2" label="Recherche de communes" />
          ) : null}

          {listeOuverte && suggestions.length > 0 ? (
            <ul
              id="geo-suggestions"
              role="listbox"
              aria-label="Communes suggérées"
              className="absolute inset-x-0 top-full z-30 mt-1 overflow-hidden rounded-md border border-smv-gray-100 bg-white shadow-lg"
            >
              {suggestions.map((suggestion) => (
                <li key={`${suggestion.label}-${suggestion.postcode}`} role="option" aria-selected="false">
                  <button
                    type="button"
                    onClick={() => {
                      definirOrigine({
                        label: `${suggestion.city} (${suggestion.postcode.slice(0, 2)})`,
                        latitude: suggestion.latitude,
                        longitude: suggestion.longitude,
                      });
                      setQuery(suggestion.city);
                      setListeOuverte(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-smv-gray-900 hover:bg-smv-off-white"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                    {suggestion.label}
                    <span className="text-xs text-smv-gray-600">({suggestion.postcode})</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <Button
          variant="secondary"
          onClick={demanderPosition}
          disabled={localisation}
          aria-label="Utiliser ma position GPS"
        >
          {localisation ? (
            <Loader size="sm" label="Localisation en cours" />
          ) : (
            <LocateFixed className="h-4 w-4" aria-hidden="true" />
          )}
          Utiliser ma position
        </Button>
      </div>

      {erreurGeo ? <p className="mt-2 text-xs font-semibold text-smv-red">{erreurGeo}</p> : null}

      {origine && plusProche ? (
        <div className="mt-4 border-t border-smv-gray-100 pt-4 text-left">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-smv-gray-900">
              Centres les plus proches de <strong>{origine.label}</strong>
            </p>
            <button
              type="button"
              onClick={() => {
                effacerOrigine();
                setQuery('');
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-smv-gray-600 underline-offset-2 hover:text-smv-red hover:underline"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Effacer
            </button>
          </div>

          <CentreCard centre={plusProche} plusProche compact />

          {suivants.length > 0 ? (
            <ul className="mt-3 divide-y divide-smv-gray-100 rounded-md border border-smv-gray-100">
              {suivants.map((centre) => (
                <li key={centre.id}>
                  <Link
                    to={`/centres/${centre.slug}`}
                    className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm hover:bg-smv-off-white"
                  >
                    <span className="font-semibold text-smv-navy">{centre.nom}</span>
                    <span className="shrink-0 text-xs text-smv-gray-600">
                      {formatDistance(centre.distanceKm)} · ~{formatTrajet(centre.trajetMinutes)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          <Link
            to="/centres"
            className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-smv-green hover:underline"
          >
            Voir tous les centres sur la carte
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
