import { useEffect, useRef, useState } from 'react';

interface Props {
  speaker?: string;
  text: string;
  onComplete?: () => void;
  speed?: number; // ms par caractère
}

export function DialogueBox({ speaker, text, onComplete, speed = 14 }: Props) {
  const [shown, setShown] = useState(0);
  const done = shown >= text.length;
  const timer = useRef<number>();

  useEffect(() => {
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
    if (done) onComplete?.();
  }, [done, onComplete]);

  const skip = () => {
    window.clearInterval(timer.current);
    setShown(text.length);
  };

  return (
    <div className="pixel-panel p-4 cursor-pointer select-none" onClick={skip}>
      {speaker ? (
        <div className="font-ui text-accent-gold text-xs uppercase tracking-wider mb-2">▸ {speaker}</div>
      ) : null}
      <p className="dialogue-text">
        {text.slice(0, shown)}
        {!done && <span className="cursor-blink">▌</span>}
      </p>
    </div>
  );
}
