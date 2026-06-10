import type { Preset } from '../../engine/types';

export const PRESET_MAYA: Preset = {
  id: 'maya',
  name: 'Maya',
  age: 19,
  gender: 'feminin',
  tagline: "J'avais les notes. C'est l'envie qui m'a lâchée.",
  story:
    "Terminale S abandonnée après un burn-out sévère en janvier. Huit mois passés chez sa mère à La Rochelle, à regarder les stories Instagram de ses anciens camarades. Un matin, elle tombe sur le compte du 3e RSMV. Elle reconnaît dans les témoignages quelque chose qu'elle ne sait pas encore nommer.",
  family: 'Mère seule, un frère cadet de 14 ans. Son père absent depuis ses 12 ans.',
  arc: "Maya commence fragile, doute de tout, a tendance à se saboter. Sa force vient de sa capacité d'observation — elle comprend les gens mieux qu'elle ne se comprend. Le jeu la pousse à faire confiance, d'abord aux autres, puis à elle-même.",
  sprite: {
    morphology: 'slim',
    skinTone: 'beige_dore',
    hairColor: 'brun_fonce',
    hairStyle: 'mi_longs_raides',
    eyeColor: 'marron_fonce',
    details: ['taches_rousseur'],
    outfit: 'civil',
    expression: 'thoughtful'
  },
  backgroundId: 'arret_lycee_general',
  desires: ['zero', 'qui_je_suis'],
  traits: ['observateur', 'anxieux', 'litteraire'],
  authority: 'mefiant',
  attributes: { resilience: 4, sociabilite: 3, determination: 2, debrouillardise: 5, confiance: 2, intelligence: 4, endurance: 2 },
  endingHint: '« La lettre » — Elle envoie enfin la lettre. Son frère répond.'
};
