import type { Preset } from '../../engine/types';

export const PRESET_NOAH: Preset = {
  id: 'noah',
  name: 'Noah',
  age: 18,
  gender: 'masculin',
  tagline: "Tout le monde pensait que j'étais trop jeune. J'allais leur montrer.",
  story:
    "Dernier à passer son bac (juste reçu). Famille dans le bâtiment depuis trois générations — son père attendait qu'il rejoigne l'entreprise. Noah voulait autre chose sans savoir quoi. Le SMV comme premier acte d'indépendance. Il est le plus jeune de sa section.",
  family: "Père artisan-maçon, mère aide-soignante. Deux sœurs aînées qui « ont bien tourné ». La pression de ne pas décevoir.",
  arc: "La maturité. Noah fait des erreurs par précipitation. Son arc est d'apprendre à s'arrêter, à écouter, sans perdre son énergie brute.",
  sprite: {
    morphology: 'athletic',
    skinTone: 'rosee',
    hairColor: 'chatain',
    hairStyle: 'crane_rase',
    eyeColor: 'vert_clair',
    details: ['tatouage_cou'],
    outfit: 'civil',
    expression: 'angry'
  },
  backgroundId: 'orientation_imposee',
  desires: ['prouver_famille', 'me_prouver'],
  traits: ['impulsif', 'courageux', 'competiteur'],
  authority: 'opposition',
  attributes: { resilience: 2, sociabilite: 4, determination: 5, debrouillardise: 3, confiance: 2, intelligence: 2, endurance: 6 },
  endingHint: '« Son propre chemin » — Il rejoint le BTP, mais à ses conditions.'
};
