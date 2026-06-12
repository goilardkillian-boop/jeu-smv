import {
  Activity,
  HardHat,
  Heart,
  Leaf,
  Monitor,
  Plane,
  Shield,
  ShoppingBag,
  Sparkles,
  Truck,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

/** Les 12 catégories de formations du SMV, avec icône et couleurs associées. */
export interface CategorieFormation {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Classes Tailwind du badge de catégorie. */
  badgeClasses: string;
}

export const CATEGORIES_FORMATION: CategorieFormation[] = [
  { id: 'Bâtiment / Travaux Publics', label: 'Bâtiment / TP', icon: HardHat, badgeClasses: 'bg-amber-100 text-amber-800' },
  { id: 'Hôtellerie / Restauration', label: 'Hôtellerie / Resto', icon: UtensilsCrossed, badgeClasses: 'bg-rose-100 text-rose-800' },
  { id: 'Transport / Logistique', label: 'Transport / Logistique', icon: Truck, badgeClasses: 'bg-sky-100 text-sky-800' },
  { id: 'Commerce / Vente', label: 'Commerce / Vente', icon: ShoppingBag, badgeClasses: 'bg-violet-100 text-violet-800' },
  { id: 'Industrie / Mécanique', label: 'Industrie / Mécanique', icon: Wrench, badgeClasses: 'bg-slate-200 text-slate-800' },
  { id: 'Protection / Sécurité', label: 'Protection / Sécurité', icon: Shield, badgeClasses: 'bg-indigo-100 text-indigo-800' },
  { id: 'Service à la personne', label: 'Service à la personne', icon: Heart, badgeClasses: 'bg-pink-100 text-pink-800' },
  { id: 'Numérique / Communication', label: 'Numérique / Comm', icon: Monitor, badgeClasses: 'bg-cyan-100 text-cyan-800' },
  { id: 'Agriculture / Espaces verts', label: 'Agriculture', icon: Leaf, badgeClasses: 'bg-lime-100 text-lime-800' },
  { id: 'Aéronautique / Aéroportuaire', label: 'Aéronautique', icon: Plane, badgeClasses: 'bg-blue-100 text-blue-800' },
  { id: 'Bien-être / Santé', label: 'Bien-être / Santé', icon: Activity, badgeClasses: 'bg-teal-100 text-teal-800' },
  { id: 'Propreté / Hygiène', label: 'Propreté', icon: Sparkles, badgeClasses: 'bg-emerald-100 text-emerald-800' },
];

export function categorieParId(id: string): CategorieFormation | undefined {
  return CATEGORIES_FORMATION.find((c) => c.id === id);
}

/** Chiffres clés affichés (et animés) sur la page d'accueil. */
export interface ChiffreCle {
  valeur: number;
  label: string;
  prefixe?: string;
  suffixe?: string;
}

export const CHIFFRES_CLES: ChiffreCle[] = [
  { valeur: 78, suffixe: '%', label: "d'insertion professionnelle" },
  { valeur: 7, label: 'centres dans toute la France' },
  { valeur: 30, suffixe: '%', label: 'de femmes parmi les volontaires' },
  { valeur: 1000, prefixe: '+', label: 'jeunes recrutés en 2025' },
];

export const NIVEAUX_ETUDES = [
  'Aucun diplôme',
  'Brevet des collèges',
  'CAP / BEP',
  'Baccalauréat',
  'Bac +2 ou plus',
] as const;

export const SITUATIONS_ACTUELLES = [
  'Sans emploi',
  'Lycéen·ne',
  'Étudiant·e',
  'Apprenti·e',
  'Autre',
] as const;

export const SOURCES_CONNAISSANCE = [
  'France Travail',
  'Mission locale',
  'Armee.fr',
  'Bouche à oreille',
  'Réseaux sociaux',
  'Autre',
] as const;

export const CATEGORIES_ACTUALITE = [
  'Vie du centre',
  'Événement',
  'Recrutement',
  'Partenariat',
] as const;

export const STATUTS_CANDIDATURE = [
  { id: 'en_attente', label: 'En attente', badgeClasses: 'bg-amber-100 text-amber-800' },
  { id: 'en_cours', label: 'En cours', badgeClasses: 'bg-sky-100 text-sky-800' },
  { id: 'accepte', label: 'Acceptée', badgeClasses: 'bg-green-100 text-green-800' },
  { id: 'refuse', label: 'Refusée', badgeClasses: 'bg-red-100 text-red-800' },
] as const;

export const TYPES_PARTENAIRE = [
  { id: 'emploi', label: 'Emploi' },
  { id: 'formation', label: 'Formation' },
  { id: 'institutionnel', label: 'Institutionnel' },
  { id: 'entreprise', label: 'Entreprise' },
] as const;

/** Centre géographique de la France métropolitaine (vue carte par défaut). */
export const CENTRE_FRANCE: [number, number] = [46.8, 2.3];
export const ZOOM_FRANCE = 6;
/** Rayon indicatif du bassin de recrutement d'un centre (km). */
export const RAYON_BASSIN_KM = 200;

export const SITE_NAME = 'Service Militaire Volontaire';
export const DEVISE = "Armé pour l'avenir";
