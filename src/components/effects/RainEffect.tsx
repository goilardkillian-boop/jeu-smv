import { useMemo } from 'react';

export function RainEffect() {
  const drops = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        left: `${(i * 19 + 7) % 100}%`,
        duration: 0.6 + ((i * 13) % 10) / 14,
        delay: ((i * 31) % 20) / 10
      })),
    []
  );
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {drops.map((d, i) => (
        <span
          key={i}
          className="rain-drop"
          style={{ left: d.left, animationDuration: `${d.duration}s`, animationDelay: `${d.delay}s` }}
        />
      ))}
    </div>
  );
}
