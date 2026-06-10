import type { Preset } from '../../engine/types';

export const PRESET_RACHID: Preset = {
  id: 'rachid',
  name: 'Rachid',
  age: 23,
  gender: 'masculin',
  tagline: 'Je suis pas là pour me faire des amis. Je suis là pour un papier.',
  story:
    "Grandit en banlieue parisienne (93), déménagement imposé à La Rochelle après un incident impliquant ses anciens amis (il n'était pas l'instigateur). Méfiant par construction, dur en apparence. Il dit au conseiller SMV qu'il vient pour le permis. C'est vrai. C'est pas tout.",
  family: 'Mère seule, deux petits frères. Il envoie de l\'argent depuis ses premiers boulots.',
  arc: "Apprendre à faire confiance. Rachid a les jauges de relation qui montent le plus lentement — mais une fois gagnées, elles ne bougent plus. Sa révélation émotionnelle est l'une des plus puissantes du jeu.",
  sprite: {
    morphology: 'athletic',
    skinTone: 'acajou',
    hairColor: 'noir_corbeau',
    hairStyle: 'frises_courts',
    eyeColor: 'noir',
    details: ['cicatrice_joue'],
    outfit: 'civil',
    expression: 'neutral'
  },
  backgroundId: 'demenagement',
  desires: ['permis', 'dette'],
  traits: ['renferme', 'loyal', 'debrouillard'],
  authority: 'mefiant',
  attributes: { resilience: 5, sociabilite: 2, determination: 4, debrouillardise: 5, confiance: 3, intelligence: 4, endurance: 5 },
  endingHint: "« La confiance » — Il rentre avec le permis. Et autre chose qu'il n'attendait pas."
};
