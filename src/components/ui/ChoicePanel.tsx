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

  // Temps écoulé : le jeu choisit l'option « neutre » (la première non risquée = la dernière)
  useEffect(() => {
    if (expired && choices.length > 0) onChoose(choices[choices.length - 1]);
  }, [expired]);

  return (
    <div className="flex flex-col gap-2 slide-up">
      {timed && (
        <div className="w-full bg-pixel-shadow border-2 border-ui-border">
          <div className="timer-bar" />
        </div>
      )}
      {choices.map((c, i) => (
        <button
          key={i}
          className="pixel-btn px-4 py-2.5 text-[13px] leading-snug w-full"
          onClick={() => onChoose(c)}
        >
          <span className="text-accent-gold mr-2">▸</span>
          {c.text}
          {c.hint && <span className="block text-[10px] opacity-60 mt-1 ml-5">{c.hint}</span>}
        </button>
      ))}
    </div>
  );
}
