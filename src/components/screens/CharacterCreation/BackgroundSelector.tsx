import { useMemo, useState } from 'react';
import { BACKGROUNDS, DESIRES } from '../../../data/backgrounds_data';

interface Props {
  backgroundId: string;
  desires: string[];
  onChange: (backgroundId: string, desires: string[]) => void;
}

export function BackgroundSelector({ backgroundId, desires, onChange }: Props) {
  const categories = useMemo(() => [...new Set(BACKGROUNDS.map((b) => b.category))], []);
  const [category, setCategory] = useState(categories[0]);

  const toggleDesire = (id: string) => {
    if (desires.includes(id)) onChange(backgroundId, desires.filter((d) => d !== id));
    else if (desires.length < 2) onChange(backgroundId, [...desires, id]);
  };

  return (
    <div className="flex flex-col gap-4 max-h-[55vh] overflow-y-auto pr-1">
      <div>
        <h4 className="font-ui text-[11px] uppercase text-accent-gold mb-2">Ta situation, avant le SMV</h4>
        <div className="flex gap-1 flex-wrap mb-2">
          {categories.map((c) => (
            <button key={c} className={`pixel-btn px-2 py-1 text-[10px] ${category === c ? '!bg-smv-green' : ''}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {BACKGROUNDS.filter((b) => b.category === category).map((b) => (
            <button
              key={b.id}
              className={`pixel-btn px-3 py-2 text-left ${backgroundId === b.id ? '!bg-smv-green' : ''}`}
              onClick={() => onChange(b.id, desires)}
            >
              <span className="text-[12px] block">{b.label}</span>
              <span className="text-[11px] italic opacity-70">« {b.quote} »</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-ui text-[11px] uppercase text-accent-gold mb-1">
          Ce que tu cherches ({desires.length}/2)
        </h4>
        <p className="text-[11px] opacity-60 mb-2">Choisis 1 ou 2 envies. Elles colorent les dialogues et la fin qui résonnera avec ton parcours.</p>
        <div className="flex gap-1.5 flex-wrap">
          {DESIRES.map((d) => (
            <button
              key={d.id}
              title={d.quote}
              className={`pixel-btn px-2 py-1 text-[11px] ${desires.includes(d.id) ? '!bg-smv-green' : ''}`}
              onClick={() => toggleDesire(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
