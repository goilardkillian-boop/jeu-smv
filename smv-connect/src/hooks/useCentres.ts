import { fetchCentreParSlug, fetchCentres, fetchTousCentres } from '../services/centres';
import type { Centre } from '../types/app.types';
import { useAsyncData, type AsyncDataState } from './useAsyncData';

/** Centres actifs (public). */
export function useCentres(): AsyncDataState<Centre[]> {
  return useAsyncData(() => fetchCentres(), []);
}

/** Tous les centres, inactifs compris (super admin). */
export function useTousCentres(): AsyncDataState<Centre[]> {
  return useAsyncData(() => fetchTousCentres(), []);
}

/** Fiche d'un centre par slug. */
export function useCentre(slug: string | undefined): AsyncDataState<Centre | null> {
  return useAsyncData(() => (slug ? fetchCentreParSlug(slug) : Promise.resolve(null)), [slug]);
}
