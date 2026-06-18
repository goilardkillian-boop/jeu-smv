import type { Centre, CentreAvecDistance, GeoPoint } from '../types/app.types';

/** Vitesse moyenne retenue pour estimer un temps de trajet routier (km/h). */
export const VITESSE_MOYENNE_KMH = 80;

/** Distance orthodromique entre deux points WGS84, en kilomètres. */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Temps de trajet estimé (minutes) à vitesse moyenne de 80 km/h. */
export function estimationTrajetMinutes(distanceKm: number): number {
  return Math.round((distanceKm / VITESSE_MOYENNE_KMH) * 60);
}

/** Trie les centres par distance croissante depuis une origine. */
export function trierCentresParDistance(
  centres: Centre[],
  origine: GeoPoint,
): CentreAvecDistance[] {
  return centres
    .map((centre) => {
      const distanceKm = haversineDistance(
        origine.latitude,
        origine.longitude,
        centre.latitude,
        centre.longitude,
      );
      return {
        ...centre,
        distanceKm,
        trajetMinutes: estimationTrajetMinutes(distanceKm),
      };
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

/** « 38 km » / « 1 250 km » */
export function formatDistance(km: number): string {
  return `${Math.round(km).toLocaleString('fr-FR')} km`;
}

/** « 45 min » / « 2 h 05 » */
export function formatTrajet(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, '0')}`;
}
