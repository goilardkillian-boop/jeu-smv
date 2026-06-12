import { useCallback, useState } from 'react';
import { geocodageInverse } from '../lib/geocoding';
import { useSearchStore } from '../store/searchStore';

interface GeolocationState {
  localisation: boolean;
  erreur: string | null;
  /** Demande la position au navigateur et la définit comme origine de recherche. */
  demanderPosition: () => void;
}

/** Géolocalisation navigateur → origine de la recherche de centres. */
export function useGeolocation(): GeolocationState {
  const definirOrigine = useSearchStore((s) => s.definirOrigine);
  const [localisation, setLocalisation] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const demanderPosition = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setErreur("Ton navigateur ne permet pas la géolocalisation");
      return;
    }
    setLocalisation(true);
    setErreur(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        void geocodageInverse(latitude, longitude).then((ville) => {
          definirOrigine({ latitude, longitude, label: ville ?? 'Ma position' });
          setLocalisation(false);
        });
      },
      (err) => {
        setLocalisation(false);
        setErreur(
          err.code === err.PERMISSION_DENIED
            ? 'Géolocalisation refusée — tu peux saisir ta ville ci-dessous'
            : 'Position introuvable — essaie de saisir ta ville',
        );
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  }, [definirOrigine]);

  return { localisation, erreur, demanderPosition };
}
