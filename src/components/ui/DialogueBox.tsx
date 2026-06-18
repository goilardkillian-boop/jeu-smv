import { useEffect, useRef, useState } from 'react';

// Vitesse du texte — réglage global persistant
export type TextSpeed = 'lent' | 'normal' | 'rapide' | 'instant';
const SPEED_KEY = 'smv_text_speed';
const SPEED_MS: Record<TextSpeed, number> = { lent: 28, normal: 14, rapide: 6, instant: 0 };

export function getTextSpeed(): TextSpeed {
  const v = localStorage.getItem(SPEED_KEY);
  return v === 'lent' || v === 'rapide' || v === 'instant' ? v : 'normal';
}
export function setTextSpeed(s: TextSpeed) {
  localStorage.setItem(SPEED_KEY, s);
}

interface Props {
  speaker?: string;
  text: string;
  /** passe à true pour révéler tout le texte immédiatement (tap pendant la frappe) */
  forceComplete?: boolean;
  onComplete?: () => void;
  /** affiche l'indicateur « cliquer pour continuer » quand le texte est fini */
  showCtc?: boolean;
}

export function DialogueBox({ speaker, text, forceComplete, onComplete, showCtc }: Props) {
  const [shown, setShown] = useState(0);
  const timer = useRef<number>();
  const speed = SPEED_MS[getTextSpeed()];
  const done = shown >= text.length;

  useEffect(() => {
    if (speed === 0) {
      setShown(text.length);
      return;
    }
    setShown(0);
    timer.current = window.setInterval(() => {
      setShown((s) => {
        if (s >= text.length) {
          window.clearInterval(timer.current);
          return s;
        }
        return s + 2;
      });
    }, speed);
    return () => window.clearInterval(timer.current);
  }, [text, speed]);

  useEffect(() => {
    if (forceComplete && !done) {
      window.clearInterval(timer.current);
      setShown(text.length);
    }
  }, [forceComplete, done, text.length]);

  useEffect(() => {
    if (done) onComplete?.();
  }, [done, onComplete]);

  return (
    <div className="relative">
      {speaker ? <div className="speaker-chip relative z-10 -mb-2.5 ml-3">{speaker}</div> : null}
      <div className="dialogue-panel px-4 pb-3 pt-4 select-none">
        <p className="dialogue-text">
          {text.slice(0, shown)}
          {!done && <span className="cursor-blink">▌</span>}
        </p>
        {done && showCtc && (
          <div className="ctc-indicator text-right text-lg leading-none -mb-1" aria-hidden="true">
            ▼
          </div>
        )}
      </div>
    </div>
  );
}
