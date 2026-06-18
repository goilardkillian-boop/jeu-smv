import type { GeoSuggestion } from '../types/app.types';

/**
 * Géocodage via l'API Adresse (data.gouv.fr) — gratuite et souveraine.
 * Les résultats sont mis en cache dans sessionStorage.
 */

const API_BASE = 'https://api-adresse.data.gouv.fr';
const CACHE_PREFIX = 'smv-geo:';

interface ApiAdresseFeature {
  geometry: { coordinates: [number, number] };
  properties: { label: string; city?: string; postcode?: string };
}

interface ApiAdresseResponse {
  features: ApiAdresseFeature[];
}

function lireCache(cle: string): GeoSuggestion[] | null {
  try {
    const brut = sessionStorage.getItem(CACHE_PREFIX + cle);
    return brut ? (JSON.parse(brut) as GeoSuggestion[]) : null;
  } catch {
    return null;
  }
}

function ecrireCache(cle: string, valeur: GeoSuggestion[]): void {
  try {
    sessionStorage.setItem(CACHE_PREFIX + cle, JSON.stringify(valeur));
  } catch {
    // stockage plein ou indisponible : on ignore, le cache est optionnel
  }
}

function versSuggestion(feature: ApiAdresseFeature): GeoSuggestion {
  const [longitude, latitude] = feature.geometry.coordinates;
  return {
    label: feature.properties.label,
    city: feature.properties.city ?? feature.properties.label,
    postcode: feature.properties.postcode ?? '',
    latitude,
    longitude,
  };
}

/** Recherche de communes (autocomplétion). Minimum 3 caractères. */
export async function rechercherCommunes(query: string): Promise<GeoSuggestion[]> {
  const q = query.trim();
  if (q.length < 3) return [];

  const cle = q.toLowerCase();
  const enCache = lireCache(cle);
  if (enCache) return enCache;

  const url = `${API_BASE}/search/?q=${encodeURIComponent(q)}&limit=5&type=municipality`;
  const reponse = await fetch(url);
  if (!reponse.ok) throw new Error(`API Adresse indisponible (${reponse.status})`);

  const donnees = (await reponse.json()) as ApiAdresseResponse;
  const suggestions = donnees.features.map(versSuggestion);
  ecrireCache(cle, suggestions);
  return suggestions;
}

/** Géocodage inverse : libellé de la commune la plus proche d'un point. */
export async function geocodageInverse(
  latitude: number,
  longitude: number,
): Promise<string | null> {
  try {
    const url = `${API_BASE}/reverse/?lat=${latitude}&lon=${longitude}&type=street&limit=1`;
    const reponse = await fetch(url);
    if (!reponse.ok) return null;
    const donnees = (await reponse.json()) as ApiAdresseResponse;
    const premier = donnees.features[0];
    return premier ? (premier.properties.city ?? premier.properties.label) : null;
  } catch {
    return null;
  }
}
