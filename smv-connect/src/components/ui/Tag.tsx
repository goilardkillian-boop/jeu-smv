import { cn } from '../../lib/utils';

export interface TagProps {
  label: string;
  /** Variante verte (certifications) ou neutre. */
  tone?: 'green' | 'neutral';
  className?: string;
}

export function Tag({ label, tone = 'neutral', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        tone === 'green'
          ? 'bg-smv-green-light/40 text-green-900'
          : 'bg-smv-gray-100 text-smv-gray-600',
        className,
      )}
    >
      {label}
    </span>
  );
}
