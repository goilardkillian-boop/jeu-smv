interface Props {
  label: string;
  icon: string;
  value: number;
  max?: number;
  compact?: boolean;
}

function gaugeColor(v: number): string {
  if (v <= 20) return 'var(--smv-red)';
  if (v <= 40) return 'var(--smv-sand)';
  return 'var(--smv-green-light)';
}

export function GaugeMeter({ label, icon, value, max = 100, compact }: Props) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className={compact ? 'w-28' : 'w-full'} title={`${label} : ${value}/${max}`}>
      <div className="flex justify-between font-ui text-[10px] uppercase tracking-wide mb-0.5">
        <span>
          {icon} {compact ? '' : label}
        </span>
        <span className={value <= 20 ? 'text-smv-red' : ''}>{value}</span>
      </div>
      <div className="gauge-track w-full">
        <div className="gauge-fill" style={{ width: `${pct}%`, background: gaugeColor(value) }} />
      </div>
    </div>
  );
}
