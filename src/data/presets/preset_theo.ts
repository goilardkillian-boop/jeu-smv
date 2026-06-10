import type { Preset } from '../../engine/types';

export const PRESET_THEO: Preset = {
  id: 'theo',
  name: 'Théo',
  age: 21,
  gender: 'masculin',
  tagline: "J'avais pas de problème particulier. C'est peut-être ça, le problème.",
  story:
    "Bac général option sport, rien derrière. Deux ans à enchaîner les petits boulots. Aucune passion. Aucun projet. Bon avec tout le monde, incapable de décider pour lui-même. Son conseiller Pôle Emploi lui glisse une plaquette SMV. Théo hausse les épaules et dit oui, parce qu'il ne sait pas dire non.",
  family: 'Parents divorcés, bonne relation avec les deux. Ce vide bienveillant est son problème.',
  arc: "Trouver quelque chose qui lui appartient. Théo est facile socialement — tout le monde l'aime — mais difficile à faire vraiment réussir. Son arc exige qu'il prenne une décision pour lui, pas pour plaire.",
  sprite: {
    morphology: 'athletic',
    skinTone: 'rosee',
    hairColor: 'blond_fonce',
    hairStyle: 'degrade_court',
    eyeColor: 'bleu_clair',
    details: ['barbe_courte'],
    outfit: 'civil',
    expression: 'happy'
  },
  backgroundId: 'boulots_3ans',
  desires: ['ma_voie'],
  traits: ['bavard', 'loyal', 'suiveur_t'],
  authority: 'suiveur',
  attributes: { resilience: 3, sociabilite: 5, determination: 2, debrouillardise: 3, confiance: 4, intelligence: 3, endurance: 4 },
  endingHint: '« Enfin décidé » — Il choisit une filière par conviction, pas par dépit.'
};
