import { create } from 'zustand';
import type { GeoOrigin } from '../types/app.types';

const STORAGE_KEY = 'smv-recherche-origine';

function chargerOrigine(): GeoOrigin | null {
  try {
    const brut = sessionStorage.getItem(STORAGE_KEY);
    return brut ? (JSON.parse(brut) as GeoOrigin) : null;
  } catch {
    return null;
  }
}

interface SearchState {
  /** Position de référence de l'utilisateur (ville recherchée ou GPS). */
  origine: GeoOrigin | null;
  definirOrigine: (origine: GeoOrigin) => void;
  effacerOrigine: () => void;
}

/** Store de la recherche géographique, partagé entre accueil et page centres. */
export const useSearchStore = create<SearchState>((set) => ({
  origine: chargerOrigine(),

  definirOrigine: (origine) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(origine));
    } catch {
      // stockage indisponible — état en mémoire uniquement
    }
    set({ origine });
  },

  effacerOrigine: () => {
    sessionStorage.removeItem(STORAGE_KEY);
    set({ origine: null });
  },
}));
