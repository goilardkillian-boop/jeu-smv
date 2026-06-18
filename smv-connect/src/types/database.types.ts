/**
 * Types de la base de données Supabase (écrits à la main, alignés sur
 * supabase/migrations/*.sql). Régénérables via `supabase gen types typescript`.
 */

export type UserRole = 'recruteur' | 'admin_centre' | 'super_admin';
export type CandidatureStatut = 'en_attente' | 'en_cours' | 'accepte' | 'refuse';
export type TypeVolontaire = 'stagiaire' | 'expert';
export type PublicVise = 'Volontaire stagiaire' | 'Volontaire expert';
export type PartenaireType = 'emploi' | 'formation' | 'institutionnel' | 'entreprise';

export type StatutHistoriqueEntry = {
  statut: CandidatureStatut;
  date: string;
}

export type CentreRow = {
  id: string;
  slug: string;
  nom: string;
  nom_regiment: string | null;
  region: string;
  adresse: string;
  code_postal: string;
  ville: string;
  latitude: number;
  longitude: number;
  telephone_1: string | null;
  telephone_2: string | null;
  email_recrutement: string;
  commandant: string | null;
  description: string | null;
  description_courte: string | null;
  capacite_annuelle: number | null;
  blason_url: string | null;
  video_youtube: string | null;
  social_facebook: string | null;
  social_instagram: string | null;
  social_linkedin: string | null;
  social_youtube: string | null;
  horaires_recrutement: string | null;
  actif: boolean;
  created_at: string;
  updated_at: string;
}

export type FormationRow = {
  id: string;
  centre_id: string;
  titre: string;
  slug: string;
  categorie: string;
  public_vise: PublicVise;
  duree_mois: number;
  description: string | null;
  debouches: string[] | null;
  certifications: string[] | null;
  dates_incorporation: string[] | null;
  places_disponibles: number | null;
  image_url: string | null;
  actif: boolean;
  created_at: string;
  updated_at: string;
}

export type ActualiteRow = {
  id: string;
  centre_id: string | null;
  titre: string;
  slug: string;
  contenu: string;
  extrait: string | null;
  image_url: string | null;
  publie_le: string;
  publie: boolean;
  categorie: string | null;
  created_at: string;
  updated_at: string;
}

export type TemoignageRow = {
  id: string;
  centre_id: string | null;
  prenom: string;
  formation: string | null;
  promotion: string | null;
  texte: string;
  photo_url: string | null;
  publie: boolean;
  created_at: string;
}

export type PartenaireRow = {
  id: string;
  centre_id: string | null;
  nom: string;
  logo_url: string | null;
  site_web: string | null;
  type: PartenaireType | null;
  actif: boolean;
}

export type CandidatureRow = {
  id: string;
  numero_dossier: string;
  centre_id: string;
  formation_id: string | null;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  date_naissance: string;
  adresse: string | null;
  ville_residence: string;
  code_postal: string;
  nationalite_francaise: boolean;
  situation_handicap: boolean;
  situation_actuelle: string | null;
  type_volontaire: TypeVolontaire;
  niveau_etudes: string | null;
  date_incorporation_souhaitee: string | null;
  source_connaissance: string | null;
  message: string | null;
  statut: CandidatureStatut;
  statut_historique: StatutHistoriqueEntry[];
  notes_recruteur: string | null;
  created_at: string;
  updated_at: string;
}

export type ProfileRow = {
  id: string;
  centre_id: string | null;
  role: UserRole;
  nom: string | null;
  prenom: string | null;
  email: string | null;
  actif: boolean;
}

/**
 * Pour les INSERT : les colonnes nullable et celles listées dans `Defaulted`
 * (valeur par défaut côté SQL) deviennent optionnelles.
 */
type InsertFor<Row, Defaulted extends keyof Row = never> = {
  [K in keyof Row as null extends Row[K] ? never : K extends Defaulted ? never : K]: Row[K];
} & {
  [K in keyof Row as null extends Row[K] ? K : K extends Defaulted ? K : never]?: Row[K];
};

type Generated = 'id' | 'created_at' | 'updated_at';

export type CentreInsert = InsertFor<CentreRow, Generated | 'actif'>;
export type FormationInsert = InsertFor<FormationRow, Generated | 'actif'>;
export type ActualiteInsert = InsertFor<ActualiteRow, Generated | 'publie' | 'publie_le'>;
export type TemoignageInsert = InsertFor<TemoignageRow, 'id' | 'created_at' | 'publie'>;
export type PartenaireInsert = InsertFor<PartenaireRow, 'id' | 'actif'>;
export type CandidatureInsert = InsertFor<
  CandidatureRow,
  Generated | 'statut' | 'statut_historique' | 'numero_dossier'
>;
export type ProfileInsert = InsertFor<ProfileRow, 'actif'>;

type TableDef<Row, Insert> = {
  Row: Row;
  Insert: Insert;
  Update: Partial<Row>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      centres: TableDef<CentreRow, CentreInsert>;
      formations: TableDef<FormationRow, FormationInsert>;
      actualites: TableDef<ActualiteRow, ActualiteInsert>;
      temoignages: TableDef<TemoignageRow, TemoignageInsert>;
      partenaires: TableDef<PartenaireRow, PartenaireInsert>;
      candidatures: TableDef<CandidatureRow, CandidatureInsert>;
      profiles: TableDef<ProfileRow, ProfileInsert>;
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
