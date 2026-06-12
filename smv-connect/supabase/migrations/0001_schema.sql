-- SMV Connect — schéma initial
-- Tables : centres, formations, actualites, temoignages, partenaires,
--          candidatures, profiles.

CREATE TABLE centres (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,          -- 'la-rochelle', 'brest', etc.
  nom             TEXT NOT NULL,                 -- 'La Rochelle'
  nom_regiment    TEXT,                          -- '3e Régiment du SMV'
  region          TEXT NOT NULL,                 -- 'Nouvelle-Aquitaine'
  adresse         TEXT NOT NULL,
  code_postal     TEXT NOT NULL,
  ville           TEXT NOT NULL,
  latitude        FLOAT NOT NULL,
  longitude       FLOAT NOT NULL,
  telephone_1     TEXT,
  telephone_2     TEXT,
  email_recrutement TEXT NOT NULL,
  commandant      TEXT,
  description     TEXT,
  description_courte TEXT,
  capacite_annuelle INT,
  blason_url      TEXT,
  video_youtube   TEXT,
  social_facebook TEXT,
  social_instagram TEXT,
  social_linkedin TEXT,
  social_youtube  TEXT,
  horaires_recrutement TEXT,
  actif           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE formations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  centre_id       UUID NOT NULL REFERENCES centres(id) ON DELETE CASCADE,
  titre           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  categorie       TEXT NOT NULL,
  public_vise     TEXT NOT NULL CHECK (public_vise IN ('Volontaire stagiaire', 'Volontaire expert')),
  duree_mois      INT NOT NULL CHECK (duree_mois IN (8, 12)),
  description     TEXT,
  debouches       TEXT[],
  certifications  TEXT[],
  dates_incorporation TEXT[],
  places_disponibles INT,
  image_url       TEXT,
  actif           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX formations_centre_idx ON formations(centre_id);
CREATE INDEX formations_actif_idx ON formations(actif);

CREATE TABLE actualites (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  centre_id   UUID REFERENCES centres(id) ON DELETE SET NULL,  -- NULL = nationale
  titre       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  contenu     TEXT NOT NULL,
  extrait     TEXT,
  image_url   TEXT,
  publie_le   DATE NOT NULL DEFAULT CURRENT_DATE,
  publie      BOOLEAN NOT NULL DEFAULT FALSE,
  categorie   TEXT,                              -- 'Vie du centre' | 'Événement' | 'Recrutement' | 'Partenariat'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX actualites_publie_idx ON actualites(publie, publie_le DESC);

CREATE TABLE temoignages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  centre_id   UUID REFERENCES centres(id) ON DELETE SET NULL,
  prenom      TEXT NOT NULL,
  formation   TEXT,
  promotion   TEXT,
  texte       TEXT NOT NULL,
  photo_url   TEXT,
  publie      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE partenaires (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  centre_id   UUID REFERENCES centres(id) ON DELETE CASCADE,   -- NULL = national
  nom         TEXT NOT NULL,
  logo_url    TEXT,
  site_web    TEXT,
  type        TEXT CHECK (type IN ('emploi', 'formation', 'institutionnel', 'entreprise')),
  actif       BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE candidatures (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_dossier  TEXT UNIQUE NOT NULL,
  centre_id       UUID NOT NULL REFERENCES centres(id),
  formation_id    UUID REFERENCES formations(id),
  nom             TEXT NOT NULL,
  prenom          TEXT NOT NULL,
  email           TEXT NOT NULL,
  telephone       TEXT,
  date_naissance  DATE NOT NULL,
  adresse         TEXT,
  ville_residence TEXT NOT NULL,
  code_postal     TEXT NOT NULL,
  nationalite_francaise BOOLEAN NOT NULL DEFAULT TRUE,
  situation_handicap    BOOLEAN NOT NULL DEFAULT FALSE,
  situation_actuelle    TEXT,
  type_volontaire TEXT NOT NULL CHECK (type_volontaire IN ('stagiaire', 'expert')),
  niveau_etudes   TEXT,
  date_incorporation_souhaitee TEXT,
  source_connaissance TEXT,
  message         TEXT,
  statut          TEXT NOT NULL DEFAULT 'en_attente'
                  CHECK (statut IN ('en_attente', 'en_cours', 'accepte', 'refuse')),
  statut_historique JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes_recruteur TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX candidatures_centre_idx ON candidatures(centre_id, created_at DESC);
CREATE INDEX candidatures_statut_idx ON candidatures(statut);

-- Profils des comptes admin (rattachés à Supabase Auth)
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  centre_id   UUID REFERENCES centres(id),       -- NULL = super admin national
  role        TEXT NOT NULL DEFAULT 'recruteur'
              CHECK (role IN ('recruteur', 'admin_centre', 'super_admin')),
  nom         TEXT,
  prenom      TEXT,
  email       TEXT,
  actif       BOOLEAN NOT NULL DEFAULT TRUE
);

-- updated_at automatique
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER centres_updated_at      BEFORE UPDATE ON centres      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER formations_updated_at   BEFORE UPDATE ON formations   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER actualites_updated_at   BEFORE UPDATE ON actualites   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER candidatures_updated_at BEFORE UPDATE ON candidatures FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Bucket de stockage public pour les images (blasons, formations, actualités…)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', TRUE)
ON CONFLICT (id) DO NOTHING;
