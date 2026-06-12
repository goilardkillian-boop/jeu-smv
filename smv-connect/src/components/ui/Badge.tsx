import { cn } from '../../lib/utils';

export type BadgeVariant = 'green' | 'navy' | 'orange' | 'gray';

const VARIANTES: Record<BadgeVariant, string> = {
  green: 'bg-smv-green text-white',
  navy: 'bg-smv-navy text-white',
  orange: 'bg-amber-500 text-white',
  gray: 'bg-smv-gray-100 text-smv-gray-600',
};

export interface BadgeProps {
  variant?: BadgeVariant;
  label: string;
  /** Classes additionnelles (ex. couleurs de catégorie). */
  className?: string;
}

export function Badge({ variant = 'gray', label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-bold uppercase tracking-wide',
        VARIANTES[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
