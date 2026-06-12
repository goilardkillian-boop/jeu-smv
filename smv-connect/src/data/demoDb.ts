/**
 * « Base de données » du mode démo : utilisée quand Supabase n'est pas
 * configuré. Les collections sont mutables (CRUD admin fonctionnel) ;
 * les candidatures sont persistées dans localStorage.
 */

import type {
  ActualiteRow,
  CandidatureRow,
  CentreRow,
  FormationRow,
  PartenaireRow,
  ProfileRow,
  TemoignageRow,
} from '../types/database.types';
import { genererNumeroDossier } from '../lib/utils';
import {
  ACTUALITES_SEED,
  CENTRES_SEED,
  FORMATIONS_SEED,
  PARTENAIRES_SEED,
  TEMOIGNAGES_SEED,
} from './seed';

const STORAGE_KEY = 'smv-demo-candidatures';

function clone<T>(items: T[]): T[] {
  return JSON.parse(JSON.stringify(items)) as T[];
}

/** Latence simulée pour rendre visibles les skeleton loaders. */
export function demoDelay(ms = 250): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const PRENOMS = ['Lucas', 'Emma', 'Mehdi', 'Chloé', 'Théo', 'Sarah', 'Hugo', 'Lina', 'Enzo', 'Jade', 'Noah', 'Camille', 'Rayan', 'Manon', 'Tom', 'Léna', 'Adam', 'Zoé'];
const NOMS = ['Martin', 'Bernard', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent', 'Garcia', 'Roux', 'Fournier', 'Girard', 'Lambert', 'Mercier', 'Bonnet', 'Faure', 'Blanc', 'Henry'];
const VILLES: Array<[string, string]> = [
  ['Rochefort', '17300'], ['Niort', '79000'], ['Metz', '57000'], ['Reims', '51100'],
  ['Évry-Courcouronnes', '91000'], ['Quimper', '29000'], ['Lyon', '69008'], ['Aubagne', '13400'],
  ['Saintes', '17100'], ['Nancy', '54000'], ['Corbeil-Essonnes', '91100'], ['Brest', '29200'],
  ['Bourg-en-Bresse', '01000'], ['Marseille', '13014'], ['Poitiers', '86000'], ['Épernay', '51200'],
  ['Massy', '91300'], ['Vitrolles', '13127'],
];
const STATUTS: CandidatureRow['statut'][] = [
  'en_attente', 'en_attente', 'en_cours', 'accepte', 'refuse', 'en_cours',
  'accepte', 'en_attente', 'accepte', 'en_cours', 'refuse', 'accepte',
  'en_attente', 'en_cours', 'accepte', 'en_attente', 'accepte', 'en_attente',
];

/** Jeu de candidatures réparties sur les 12 derniers mois (pour le dashboard). */
function genererCandidaturesDemo(): CandidatureRow[] {
  const maintenant = new Date();
  return PRENOMS.map((prenom, i) => {
    const date = new Date(maintenant);
    date.setMonth(date.getMonth() - (i % 12));
    date.setDate(((i * 7) % 27) + 1);
    const formation = FORMATIONS_SEED[i % FORMATIONS_SEED.length] as FormationRow;
    const ville = VILLES[i % VILLES.length] as [string, string];
    const statut = STATUTS[i % STATUTS.length] as CandidatureRow['statut'];
    const anneeNaissance = maintenant.getFullYear() - 19 - (i % 7);
    const iso = date.toISOString();
    return {
      id: `d0000000-0000-4000-8000-${String(i + 1).padStart(12, '0')}`,
      numero_dossier: `SMV-${date.getFullYear()}-DEMO${String(i + 1).padStart(2, '0')}`,
      centre_id: formation.centre_id,
      formation_id: formation.id,
      nom: NOMS[i % NOMS.length] ?? 'Martin',
      prenom,
      email: `${prenom.toLowerCase()}.${(NOMS[i % NOMS.length] ?? 'martin').toLowerCase()}@exemple.fr`,
      telephone: `06 ${String(10 + i)} ${String(20 + i)} ${String(30 + i)} ${String(40 + i)}`,
      date_naissance: `${anneeNaissance}-0${(i % 9) + 1}-1${i % 9}`,
      adresse: `${i + 2} rue de la République`,
      ville_residence: ville[0],
      code_postal: ville[1],
      nationalite_francaise: true,
      situation_handicap: i % 9 === 0,
      situation_actuelle: i % 3 === 0 ? 'Sans emploi' : i % 3 === 1 ? 'Lycéen·ne' : 'Autre',
      type_volontaire: formation.public_vise === 'Volontaire expert' ? 'expert' : 'stagiaire',
      niveau_etudes: i % 4 === 0 ? 'Aucun diplôme' : i % 4 === 1 ? 'Brevet des collèges' : i % 4 === 2 ? 'CAP / BEP' : 'Baccalauréat',
      date_incorporation_souhaitee: formation.dates_incorporation?.[0] ?? null,
      source_connaissance: i % 2 === 0 ? 'Mission locale' : 'Réseaux sociaux',
      message: i % 5 === 0 ? 'Très motivé·e, disponible immédiatement.' : null,
      statut,
      statut_historique: [{ statut: 'en_attente', date: iso }],
      notes_recruteur: null,
      created_at: iso,
      updated_at: iso,
    };
  });
}

function chargerCandidatures(): CandidatureRow[] {
  try {
    const brut = localStorage.getItem(STORAGE_KEY);
    if (brut) return JSON.parse(brut) as CandidatureRow[];
  } catch {
    // stockage corrompu → on régénère
  }
  return genererCandidaturesDemo();
}

export function persisterCandidaturesDemo(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoDb.candidatures));
  } catch {
    // stockage indisponible : la session reste fonctionnelle en mémoire
  }
}

export const DEMO_PROFILES: ProfileRow[] = [
  {
    id: 'u0000000-0000-4000-8000-000000000001',
    centre_id: null,
    role: 'super_admin',
    nom: 'Demo',
    prenom: 'Admin national',
    email: 'superadmin@demo.smv',
    actif: true,
  },
  {
    id: 'u0000000-0000-4000-8000-000000000002',
    centre_id: 'c0000000-0000-4000-8000-000000000004',
    role: 'admin_centre',
    nom: 'Demo',
    prenom: 'Recruteur La Rochelle',
    email: 'larochelle@demo.smv',
    actif: true,
  },
];

interface DemoDb {
  centres: CentreRow[];
  formations: FormationRow[];
  actualites: ActualiteRow[];
  temoignages: TemoignageRow[];
  partenaires: PartenaireRow[];
  candidatures: CandidatureRow[];
  profiles: ProfileRow[];
}

export const demoDb: DemoDb = {
  centres: clone(CENTRES_SEED),
  formations: clone(FORMATIONS_SEED),
  actualites: clone(ACTUALITES_SEED),
  temoignages: clone(TEMOIGNAGES_SEED),
  partenaires: clone(PARTENAIRES_SEED),
  candidatures: chargerCandidatures(),
  profiles: clone(DEMO_PROFILES),
};

let compteur = 0;

/** Identifiant unique pour les entités créées en mode démo. */
export function demoId(): string {
  compteur += 1;
  return typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `demo-${Date.now()}-${compteur}`;
}

export function demoNumeroDossier(): string {
  return genererNumeroDossier();
}
