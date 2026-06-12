import { fetchActualiteParSlug, fetchActualitesPubliees } from '../services/actualites';
import type { ActualiteAvecCentre } from '../types/app.types';
import { useAsyncData, type AsyncDataState } from './useAsyncData';

/** Actualités publiées (optionnellement limitées aux N plus récentes). */
export function useActualites(limite?: number): AsyncDataState<ActualiteAvecCentre[]> {
  return useAsyncData(() => fetchActualitesPubliees(limite), [limite]);
}

/** Article publié par slug. */
export function useActualite(slug: string | undefined): AsyncDataState<ActualiteAvecCentre | null> {
  return useAsyncData(() => (slug ? fetchActualiteParSlug(slug) : Promise.resolve(null)), [slug]);
}
