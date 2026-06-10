import type { Preset } from '../../engine/types';

export const PRESET_JADE: Preset = {
  id: 'jade',
  name: 'Jade',
  age: 20,
  gender: 'feminin',
  tagline: "Je dessinais tout le temps. Ça m'a pas nourrie.",
  story:
    "Deux ans de prépa art appliqué à Bordeaux, abandon. Talent réel, mais incapacité à se projeter dans une vie de freelance précaire. Travaille en boulangerie le matin. Sent qu'elle peut faire quelque chose de ses mains, dans un autre registre. Elle vient au SMV avec un carnet de croquis dans son sac.",
  family: 'Père artisan ébéniste, mère prof de collège.',
  arc: 'Réconcilier sa créativité avec le monde réel. Elle se révèle lors de la mission citoyenne.',
  sprite: {
    morphology: 'slim',
    skinTone: 'beige_dore',
    hairColor: 'brun_noisette',
    hairStyle: 'frises_longs',
    eyeColor: 'ambre',
    details: ['piercing_nez'],
    outfit: 'civil',
    expression: 'happy'
  },
  backgroundId: 'passion_sans_debouche',
  desires: ['ma_voie', 'utile'],
  traits: ['creatif', 'empathique', 'observateur'],
  authority: 'besoin_sens',
  attributes: { resilience: 3, sociabilite: 4, determination: 3, debrouillardise: 4, confiance: 3, intelligence: 4, endurance: 2 },
  endingHint: "« Les mains et la tête » — Une filière BTP, avec un projet d'intégrer du design dans ses chantiers."
};
