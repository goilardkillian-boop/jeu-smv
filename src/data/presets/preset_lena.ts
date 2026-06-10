import type { Preset } from '../../engine/types';

export const PRESET_LENA: Preset = {
  id: 'lena',
  name: 'Léna',
  age: 24,
  gender: 'feminin',
  tagline: "J'avais un métier. J'avais un appartement. J'avais perdu le reste.",
  story:
    "Ancienne assistante de direction dans une PME nantaise. Burnout à 23 ans, arrêt maladie, rupture, retour chez ses parents à Saintes. Elle connaît le monde du travail, elle a des compétences, mais elle a perdu confiance dans sa capacité à tenir. Elle arrive plus âgée que la majorité, avec une lucidité que les autres n'ont pas encore.",
  family: 'Parents agriculteurs en Charente. Soutien stable mais déconcertés.',
  arc: "Reconstruire une confiance détruite par l'expérience. Léna sait faire les choses — elle ne sait plus qu'elle en est capable. Arc le plus adulte, le plus proche des vécus des 22-25 ans.",
  sprite: {
    morphology: 'slim',
    skinTone: 'porcelaine',
    hairColor: 'blond_cendre',
    hairStyle: 'mi_longs_raides',
    eyeColor: 'bleu_gris',
    details: ['lunettes_rect'],
    outfit: 'civil',
    expression: 'sad'
  },
  backgroundId: 'reconversion',
  desires: ['zero', 'emploi_stable'],
  traits: ['stratege', 'decourageable', 'proche_aidant_t'],
  authority: 'besoin_sens', // « Besoin d'explications » : trait besoin_explications + autorité besoin de sens
  attributes: { resilience: 5, sociabilite: 3, determination: 4, debrouillardise: 5, confiance: 1, intelligence: 5, endurance: 2 },
  endingHint: '« Le deuxième départ » — Elle repart différente. Pas guérie. Prête.'
};
