import type { Preset } from '../../engine/types';

export const PRESET_SARA: Preset = {
  id: 'sara',
  name: 'Sara',
  age: 22,
  gender: 'feminin',
  tagline: "J'en savais plus qu'eux sur mon métier. Mais on ne m'a jamais laissé le montrer.",
  story:
    "Bac pro Logistique mention Bien. Trente candidatures envoyées. Quatre entretiens. Zéro embauche. Elle arrive au SMV avec une attitude. Elle pense être meilleure que ses camarades. Elle a tort, et le jeu le montrera — sans la briser.",
  family: 'Parents marocains installés à Nantes, très investis. Sa réussite est la leur.',
  arc: "Apprendre que la force ne suffit pas, que la collaboration n'est pas une faiblesse. Elle doit garder sa détermination ET s'ouvrir aux autres.",
  sprite: {
    morphology: 'average',
    skinTone: 'cannelle',
    hairColor: 'noir_corbeau',
    hairStyle: 'tresses_attachees',
    eyeColor: 'marron_fonce',
    details: [],
    outfit: 'civil',
    expression: 'neutral'
  },
  backgroundId: 'bacpro_bouche',
  desires: ['me_prouver', 'carriere'],
  traits: ['perfectionniste', 'susceptible', 'competiteur'],
  authority: 'contestataire',
  attributes: { resilience: 3, sociabilite: 2, determination: 6, debrouillardise: 3, confiance: 2, intelligence: 5, endurance: 3 },
  endingHint: "« Prouvé à moi-même » — Le CDI obtenu, elle réalise que ce n'était pas la validation qu'elle cherchait."
};
