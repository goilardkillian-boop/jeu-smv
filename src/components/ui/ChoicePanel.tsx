import { useEffect, useState } from 'react';
import type { Choice } from '../../engine/types';

interface Props {
  choices: Choice[];
  onChoose: (c: Choice) => void;
  timed?: boolean; // au moins un choix sous pression → timer global 8s
}

export function ChoicePanel({ choices, onChoose, timed }: Props) {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!timed) return;
    const t = window.setTimeout(() => setExpired(true), 8000);
    return () => window.clearTimeout(t);
  }, [timed]);

  // Temps écoulé : le jeu choisit l'option « neutre » (la dernière)
  useEffect(() => {
    if (expired && choices.length > 0) onChoose(choices[choices.length - 1]);
  }, [expired]);

  // Raccourcis clavier 1-9
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= choices.length) {
        e.preventDefault();
        onChoose(choices[n - 1]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [choices, onChoose]);

  return (
    <div className="flex flex-col gap-2 slide-up" onClick={(e) => e.stopPropagation()}>
      {timed && (
        <div className="w-full bg-pixel-shadow border-2 border-ui-border" role="timer" aria-label="Temps restant">
          <div className="timer-bar" />
        </div>
      )}
      {choices.map((c, i) => (
        <button key={i} className="choice-btn w-full" onClick={() => onChoose(c)}>
          <span className="choice-key">{i + 1}</span>
          {c.text}
          {c.hint && <span className="block text-[13px] opacity-60 mt-0.5">{c.hint}</span>}
        </button>
      ))}
    </div>
  );
}
