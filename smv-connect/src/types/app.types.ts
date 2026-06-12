/** Types métier de l'application (alias + types dérivés des types BDD). */

import type {
  ActualiteRow,
  CandidatureRow,
  CentreRow,
  FormationRow,
  PartenaireRow,
  ProfileRow,
  TemoignageRow,
} from './database.types';

export type Centre = CentreRow;
export type Formation = FormationRow;
export type Actualite = ActualiteRow;
export type Temoignage = TemoignageRow;
export type Partenaire = PartenaireRow;
export type Candidature = CandidatureRow;
export type Profile = ProfileRow;

export type {
  CandidatureStatut,
  PublicVise,
  StatutHistoriqueEntry,
  TypeVolontaire,
  UserRole,
} from './database.types';

/** Formation enrichie de son centre (jointure). */
export interface FormationAvecCentre extends FormationRow {
  centre: Pick<CentreRow, 'id' | 'slug' | 'nom' | 'region' | 'ville'> | null;
}

/** Actualité enrichie de son centre éventuel (NULL = actualité nationale). */
export interface ActualiteAvecCentre extends ActualiteRow {
  centre: Pick<CentreRow, 'id' | 'slug' | 'nom'> | null;
}

/** Candidature enrichie pour l'espace admin. */
export interface CandidatureAvecRelations extends CandidatureRow {
  centre: Pick<CentreRow, 'id' | 'slug' | 'nom'> | null;
  formation: Pick<FormationRow, 'id' | 'slug' | 'titre'> | null;
}

/** Point géographique (WGS84). */
export interface GeoPoint {
  latitude: number;
  longitude: number;
}

/** Position choisie par l'utilisateur (géolocalisation ou recherche de ville). */
export interface GeoOrigin extends GeoPoint {
  label: string;
}

/** Suggestion renvoyée par l'API Adresse (data.gouv.fr). */
export interface GeoSuggestion {
  label: string;
  city: string;
  postcode: string;
  latitude: number;
  longitude: number;
}

/** Centre annoté de sa distance par rapport à une origine. */
export interface CentreAvecDistance extends CentreRow {
  distanceKm: number;
  trajetMinutes: number;
}
