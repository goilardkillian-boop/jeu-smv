import type { StoryNode } from '../../engine/types';
import { PROLOGUE } from './prologue';
import { CHAPTER1 } from './chapter1_arrivee';
import { CHAPTER2 } from './chapter2_fmi';
import { CHAPTER3 } from './chapter3_formation';
import { CHAPTER4 } from './chapter4_epreuves';
import { CHAPTER5 } from './chapter5_insertion';
import { SIDESCENES } from './sidescenes';

const ALL_NODES: StoryNode[] = [
  ...PROLOGUE,
  ...CHAPTER1,
  ...CHAPTER2,
  ...CHAPTER3,
  ...CHAPTER4,
  ...CHAPTER5,
  ...SIDESCENES
];

export const STORY: Record<string, StoryNode> = Object.fromEntries(ALL_NODES.map((n) => [n.id, n]));

export const START_NODE = 'p_intro';

// Vérification d'intégrité du graphe en dev : chaque `next` doit exister.
if (import.meta.env.DEV) {
  const special = new Set(['RETURN', 'ENDING_DISPATCH', 'ENDING_ABANDON']);
  for (const node of ALL_NODES) {
    const targets: string[] = [];
    if (node.next) targets.push(node.next);
    node.choices?.forEach((c) => targets.push(c.next));
    node.conditionalNext?.forEach((c) => targets.push(c.next));
    if (node.qcm) targets.push(node.qcm.successNext, node.qcm.failNext);
    for (const t of targets) {
      if (!special.has(t) && !ALL_NODES.some((n) => n.id === t)) {
        console.warn(`[storyGraph] Nœud manquant : "${t}" référencé par "${node.id}"`);
      }
    }
  }
}
