// ─────────────────────────────────────────────────────────────
// Types centraux du moteur — "Une vie à construire" (3e RSMV)
// ─────────────────────────────────────────────────────────────

// Jauges de survie (0-100)
export type GaugeKey = 'motivation' | 'equipe' | 'rigueur' | 'moral';

// Attributs de création (1-6, 20 points)
export type AttributeKey =
  | 'resilience'
  | 'sociabilite'
  | 'determination'
  | 'debrouillardise'
  | 'confiance'
  | 'intelligence'
  | 'endurance';

// Compétences évolutives (0-100)
export type SkillKey =
  // Militaire
  | 'condition_physique'
  | 'discipline'
  | 'equipe_skill'
  | 'terrain'
  // Académique
  | 'francais'
  | 'maths'
  | 'culture_g'
  | 'numerique'
  // Professionnel
  | 'savoir_etre'
  | 'technique_filiere'
  | 'stress_pro'
  | 'communication'
  // Social / émotionnel
  | 'intelligence_emo'
  | 'confiance_soi'
  | 'gestion_conflit'
  | 'resilience_emo'
  // Survie / autonomie
  | 'budget'
  | 'secours'
  | 'code_route'
  | 'autonomie';

export type SkillDomain = 'militaire' | 'academique' | 'professionnel' | 'social' | 'autonomie';

// Personnages secondaires (jauges de relation 0-100)
export type NpcKey =
  | 'ferreira'
  | 'ines'
  | 'dimitri'
  | 'moreau'
  | 'thomas'
  | 'kevin'
  | 'lea'
  | 'momo'
  | 'claire'
  | 'enzo'
  | 'famille';

export type Gender = 'masculin' | 'feminin' | 'neutre';

export type AuthorityStance =
  | 'confiant'
  | 'mefiant'
  | 'contestataire'
  | 'discipline'
  | 'opposition'
  | 'besoin_sens'
  | 'recherche_cadre'
  | 'suiveur';

// ── Apparence / sprite ──────────────────────────────────────
export type Morphology = 'slim' | 'average' | 'athletic' | 'stocky';
export type OutfitKey = 'civil' | 'treillis' | 'sport' | 'terrain' | 'ceremonie' | 'stage';
export type ExpressionKey = 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'thoughtful';

export interface SpriteConfig {
  morphology: Morphology;
  skinTone: string; // clé de la palette skinTones
  hairColor: string; // clé de la palette hairColors
  hairStyle: string; // clé hairStyles
  eyeColor: string; // clé eyeColors
  details: string[]; // clés details
  outfit: OutfitKey;
  expression: ExpressionKey;
}

// ── Création de personnage ─────────────────────────────────
export interface CharacterSheet {
  name: string;
  gender: Gender;
  age: number;
  presetId: string | null;
  sprite: SpriteConfig;
  backgroundId: string; // une des 50 situations
  desires: string[]; // 1-2 envies
  traits: string[]; // 2 principaux + 1 secondaire
  authority: AuthorityStance;
  attributes: Record<AttributeKey, number>;
}

// ── Effets appliqués par les choix / scènes ────────────────
export interface Effects {
  gauges?: Partial<Record<GaugeKey, number>>;
  attributes?: Partial<Record<AttributeKey, number>>;
  skills?: Partial<Record<SkillKey, number>>;
  relations?: Partial<Record<NpcKey, number>>;
  setFlags?: string[];
  clearFlags?: string[];
  addItems?: string[];
  removeItems?: string[];
  achievements?: string[];
  journal?: string; // entrée de journal générée
}

// ── Conditions d'apparition des choix / nœuds ──────────────
export interface Condition {
  flag?: string; // flag requis
  notFlag?: string; // flag interdit
  gauge?: { key: GaugeKey; min?: number; max?: number };
  attribute?: { key: AttributeKey; min?: number; max?: number };
  skill?: { key: SkillKey; min?: number; max?: number };
  relation?: { key: NpcKey; min?: number; max?: number };
  trait?: string;
  notTrait?: string;
  backgroundIn?: string[];
  desire?: string;
  authority?: AuthorityStance;
  item?: string;
  presetId?: string;
  any?: Condition[]; // au moins une des sous-conditions
}

// ── Graphe narratif ─────────────────────────────────────────
export interface Choice {
  text: string;
  next: string;
  effects?: Effects;
  conditions?: Condition[];
  hint?: string; // micro-indication affichée sous le choix (trait Stratège)
  timed?: boolean; // choix sous pression (8s)
}

export type SceneKind = 'dialogue' | 'narration' | 'qcm' | 'minigame' | 'transition' | 'ending';

export interface QcmRef {
  pool: string; // identifiant du pool de questions
  draw: number; // nombre de questions tirées
  passThreshold: number; // ratio de réussite requis (ex: 0.6)
  successNext: string;
  failNext: string;
  successEffects?: Effects;
  failEffects?: Effects;
  skill?: SkillKey; // compétence bonifiée par la réussite
}

export interface StoryNode {
  id: string;
  kind: SceneKind;
  chapter: number;
  week?: number;
  background: string; // clé du décor (placeholder SVG ou asset IA)
  speaker?: string; // nom affiché ('' = narration)
  npc?: NpcKey; // sprite PNJ affiché
  expression?: ExpressionKey;
  playerOutfit?: OutfitKey;
  text: string | ((ctx: StoryContext) => string);
  effects?: Effects; // appliqués à l'entrée du nœud
  choices?: Choice[];
  next?: string; // si pas de choix : nœud suivant
  qcm?: QcmRef;
  conditionalNext?: { conditions: Condition[]; next: string }[]; // routage conditionnel
  music?: string;
  sound?: string;
  endingId?: string; // si kind === 'ending'
}

// Contexte fourni aux textes dynamiques
export interface StoryContext {
  name: string;
  gender: Gender;
  sheet: CharacterSheet;
  gauges: Record<GaugeKey, number>;
  relations: Record<NpcKey, number>;
  flags: Set<string>;
  week: number;
  /** Accords en genre : g('é','ée') */
  g: (m: string, f: string, n?: string) => string;
}

// ── QCM ─────────────────────────────────────────────────────
export interface QcmQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number; // index de la bonne réponse
  explanation?: string;
}

// ── Données statiques ───────────────────────────────────────
export interface Trait {
  id: string;
  name: string;
  family: 'force' | 'social' | 'intellect' | 'fragilite' | 'autorite' | 'speciale' | 'ancrage';
  description: string;
  effectLine: string;
}

export interface BackgroundSituation {
  id: string;
  category: string;
  label: string;
  quote: string;
  effects: Effects;
}

export interface Desire {
  id: string;
  label: string;
  quote: string;
  effects?: Effects;
}

export interface Item {
  id: string;
  name: string;
  icon: string;
  category: 'consommable' | 'social' | 'utilite' | 'souvenir' | 'secret';
  description: string;
  unique?: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  condition: string; // description lisible
  quote: string;
}

export interface Ending {
  id: string;
  title: string;
  family: 'reussite' | 'parcours' | 'difficile';
  text: string;
  cta?: string;
}

export interface Preset {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  tagline: string;
  story: string;
  family: string;
  arc: string;
  sprite: SpriteConfig;
  backgroundId: string;
  desires: string[];
  traits: string[];
  authority: AuthorityStance;
  attributes: Record<AttributeKey, number>;
  endingHint: string;
}

// ── Sauvegarde ──────────────────────────────────────────────
export interface SaveData {
  id?: number;
  slot: number;
  timestamp: number;
  label: string;
  sheet: CharacterSheet;
  nodeId: string;
  gauges: Record<GaugeKey, number>;
  skills: Record<SkillKey, number>;
  relations: Record<NpcKey, number>;
  flags: string[];
  inventory: string[];
  achievements: string[];
  journal: { week: number; text: string }[];
  week: number;
  convocations: number;
  visited: string[];
  ngPlus: boolean;
}

export const GAUGE_LABELS: Record<GaugeKey, { label: string; icon: string }> = {
  motivation: { label: 'Motivation', icon: '🔥' },
  equipe: { label: "Esprit d'équipe", icon: '🤝' },
  rigueur: { label: 'Rigueur', icon: '📐' },
  moral: { label: 'Moral', icon: '❤️' }
};

export const ATTRIBUTE_LABELS: Record<AttributeKey, { label: string; icon: string; tip: string }> = {
  resilience: { label: 'Résilience', icon: '🛡️', tip: 'Encaisser sans craquer — épreuves FMI, baisses de Moral' },
  sociabilite: { label: 'Sociabilité', icon: '🗣️', tip: 'Aisance avec les autres — relations plus rapides' },
  determination: { label: 'Détermination', icon: '🎯', tip: "Finir ce qu'on commence — persévérance sous pression" },
  debrouillardise: { label: 'Débrouillardise', icon: '🔧', tip: 'Solutions créatives — chemins alternatifs' },
  confiance: { label: 'Confiance', icon: '⚡', tip: 'Estime de soi — réponses aux autorités, leadership' },
  intelligence: { label: 'Intelligence', icon: '🧠', tip: 'Apprentissage et mémoire — QCM, formation pro' },
  endurance: { label: 'Endurance', icon: '💪', tip: 'Physique et récupération — Marche au calot, terrain' }
};

export const SKILL_META: Record<SkillKey, { label: string; domain: SkillDomain }> = {
  condition_physique: { label: 'Condition physique', domain: 'militaire' },
  discipline: { label: 'Discipline militaire', domain: 'militaire' },
  equipe_skill: { label: 'Travail en équipe', domain: 'militaire' },
  terrain: { label: 'Orientation / Terrain', domain: 'militaire' },
  francais: { label: 'Français écrit', domain: 'academique' },
  maths: { label: 'Mathématiques', domain: 'academique' },
  culture_g: { label: 'Culture générale', domain: 'academique' },
  numerique: { label: 'Numérique', domain: 'academique' },
  savoir_etre: { label: 'Savoir-être pro', domain: 'professionnel' },
  technique_filiere: { label: 'Technique filière', domain: 'professionnel' },
  stress_pro: { label: 'Gestion du stress pro', domain: 'professionnel' },
  communication: { label: 'Communication orale', domain: 'professionnel' },
  intelligence_emo: { label: 'Intelligence émotionnelle', domain: 'social' },
  confiance_soi: { label: 'Confiance en soi', domain: 'social' },
  gestion_conflit: { label: 'Gestion du conflit', domain: 'social' },
  resilience_emo: { label: 'Résilience émotionnelle', domain: 'social' },
  budget: { label: 'Gestion du budget', domain: 'autonomie' },
  secours: { label: 'Premiers secours', domain: 'autonomie' },
  code_route: { label: 'Code de la route', domain: 'autonomie' },
  autonomie: { label: 'Autonomie quotidienne', domain: 'autonomie' }
};

export const NPC_META: Record<NpcKey, { name: string; role: string }> = {
  ferreira: { name: 'Adjudant Ferreira', role: 'Chef de section FMI' },
  ines: { name: 'Inès', role: 'Volontaire, même section' },
  dimitri: { name: 'Dimitri', role: 'Volontaire, chambrée' },
  moreau: { name: 'Capitaine Moreau', role: 'Officier formation pro' },
  thomas: { name: 'Thomas', role: 'Volontaire, chambrée' },
  kevin: { name: 'Kevin', role: 'Volontaire, salle de sport' },
  lea: { name: 'Léa', role: 'Volontaire, couloirs' },
  momo: { name: 'Momo', role: 'Cuisinier' },
  claire: { name: 'Claire', role: 'Assistante sociale' },
  enzo: { name: 'Enzo', role: 'Volontaire, zone fumeur' },
  famille: { name: 'Famille', role: '' }
};
