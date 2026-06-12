import { useEffect, useRef, useState } from 'react';
import { rechercherCommunes } from '../lib/geocoding';
import type { GeoSuggestion } from '../types/app.types';

interface GeocodeState {
  suggestions: GeoSuggestion[];
  recherche: boolean;
  erreur: string | null;
}

/**
 * Autocomplétion de communes via l'API Adresse, avec debounce de 300 ms
 * et annulation des réponses obsolètes.
 */
export function useGeocode(query: string): GeocodeState {
  const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([]);
  const [recherche, setRecherche] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const requeteId = useRef(0);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setRecherche(false);
      setErreur(null);
      return;
    }

    setRecherche(true);
    const id = requeteId.current + 1;
    requeteId.current = id;

    const timer = setTimeout(() => {
      rechercherCommunes(q)
        .then((resultats) => {
          if (requeteId.current === id) {
            setSuggestions(resultats);
            setErreur(null);
          }
        })
        .catch(() => {
          if (requeteId.current === id) {
            setSuggestions([]);
            setErreur('Recherche indisponible pour le moment');
          }
        })
        .finally(() => {
          if (requeteId.current === id) setRecherche(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return { suggestions, recherche, erreur };
}
