import {
  fetchFormationParSlug,
  fetchFormationsActives,
  fetchFormationsParCentre,
} from '../services/formations';
import type { Formation, FormationAvecCentre } from '../types/app.types';
import { useAsyncData, type AsyncDataState } from './useAsyncData';

/** Catalogue complet des formations actives (avec centre joint). */
export function useFormations(): AsyncDataState<FormationAvecCentre[]> {
  return useAsyncData(() => fetchFormationsActives(), []);
}

/** Fiche formation par slug. */
export function useFormation(slug: string | undefined): AsyncDataState<FormationAvecCentre | null> {
  return useAsyncData(() => (slug ? fetchFormationParSlug(slug) : Promise.resolve(null)), [slug]);
}

/** Formations d'un centre (public : actives uniquement). */
export function useFormationsCentre(
  centreId: string | undefined,
  inclureInactives = false,
): AsyncDataState<Formation[]> {
  return useAsyncData(
    () => (centreId ? fetchFormationsParCentre(centreId, inclureInactives) : Promise.resolve([])),
    [centreId, inclureInactives],
  );
}
