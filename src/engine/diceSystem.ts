import type { QcmQuestion } from './types';

// Jets et tirages aléatoires — centralisés pour pouvoir, plus tard,
// les rendre déterministes (seed) pour le replay.
export const roll = (chance: number) => Math.random() < chance;

export const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Tire `n` questions d'un pool, options mélangées (l'index correct est recalculé). */
export function drawQuestions(pool: QcmQuestion[], n: number): QcmQuestion[] {
  return shuffle(pool)
    .slice(0, Math.min(n, pool.length))
    .map((q) => {
      const order = shuffle(q.options.map((_, i) => i));
      return {
        ...q,
        options: order.map((i) => q.options[i]),
        correct: order.indexOf(q.correct)
      };
    });
}
