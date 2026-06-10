import { ATTRIBUTE_LABELS, type AttributeKey } from '../../../engine/types';

interface Props {
  attributes: Record<AttributeKey, number>;
  pointBudget: number; // 20 (22 en NG+)
  onChange: (a: Record<AttributeKey, number>) => void;
}

export function AttributeBuilder({ attributes, pointBudget, onChange }: Props) {
  const used = Object.values(attributes).reduce((a, b) => a + b, 0);
  const remaining = pointBudget - used;

  const adjust = (k: AttributeKey, delta: number) => {
    const v = attributes[k] + delta;
    if (v < 1 || v > 6) return;
    if (delta > 0 && remaining <= 0) return;
    onChange({ ...attributes, [k]: v });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <p className="text-[11px] opacity-60">Min 1, max 6 par attribut.</p>
        <span className={`font-title text-xs ${remaining === 0 ? 'text-smv-green-light' : 'text-accent-gold'}`}>
          POINTS : {remaining}
        </span>
      </div>
      {(Object.keys(ATTRIBUTE_LABELS) as AttributeKey[]).map((k) => {
        const meta = ATTRIBUTE_LABELS[k];
        const v = attributes[k];
        return (
          <div key={k} className="flex items-center gap-2 mb-2" title={meta.tip}>
            <span className="w-44 text-sm truncate">
              {meta.icon} {meta.label}
            </span>
            <button className="pixel-btn px-2 py-0.5 text-xs" onClick={() => adjust(k, -1)} disabled={v <= 1}>
              −
            </button>
            <span className="font-title text-xs w-28 text-center text-accent-gold tracking-widest">
              {'■'.repeat(v)}
              {'□'.repeat(6 - v)}
            </span>
            <button className="pixel-btn px-2 py-0.5 text-xs" onClick={() => adjust(k, 1)} disabled={v >= 6 || remaining <= 0}>
              +
            </button>
            {v === 1 && k === 'endurance' && (
              <span className="text-smv-red text-[10px]">⚠ la Marche au Calot sera très difficile</span>
            )}
          </div>
        );
      })}
      <p className="text-[11px] opacity-50 mt-2 italic">Survole un attribut pour voir ses impacts.</p>
    </div>
  );
}
