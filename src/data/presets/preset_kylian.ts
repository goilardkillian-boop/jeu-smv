import type { Preset } from '../../engine/types';

export const PRESET_KYLIAN: Preset = {
  id: 'kylian',
  name: 'Kylian',
  age: 20,
  gender: 'masculin',
  tagline: 'Je cherchais pas à fuir quelque chose. Je cherchais quelque chose à trouver.',
  story:
    "Aucun drame. Bac ES moyen, première année de BTS abandonnée par manque de motivation. Il a vu une affiche SMV sur un abribus à La Rochelle, pris l'URL en photo. Trois semaines plus tard, il a pris rendez-vous. Il vient pour voir. Il restera pour tout autre chose.",
  family: 'Parents séparés mais coopératifs. Un grand frère en Bretagne qu\'il appelle rarement.',
  arc: "Découvrir qu'il est capable de plus qu'il ne pensait. Personnage équilibré, accessible pour les nouveaux joueurs, profondeur qui se révèle via les choix.",
  sprite: {
    morphology: 'average',
    skinTone: 'miel',
    hairColor: 'brun_fonce',
    hairStyle: 'courts_ondules',
    eyeColor: 'noisette',
    details: [],
    outfit: 'civil',
    expression: 'neutral'
  },
  backgroundId: 'arret_bts1',
  desires: ['me_decouvrir'],
  traits: ['curieux', 'debrouillard', 'observateur'],
  authority: 'besoin_sens',
  attributes: { resilience: 3, sociabilite: 4, determination: 3, debrouillardise: 4, confiance: 3, intelligence: 3, endurance: 4 },
  endingHint: "« Ce que je cherchais » — Il comprend a posteriori ce qu'il était venu chercher."
};
