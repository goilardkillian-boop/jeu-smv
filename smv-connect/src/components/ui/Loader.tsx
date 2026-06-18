import { cn } from '../../lib/utils';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Libellé annoncé aux lecteurs d'écran. */
  label?: string;
}

export function Loader({ size = 'md', className, label = 'Chargement en cours' }: LoaderProps) {
  const tailles = { sm: 'h-4 w-4 border-2', md: 'h-8 w-8 border-[3px]', lg: 'h-12 w-12 border-4' };
  return (
    <span role="status" aria-label={label} className={cn('inline-block', className)}>
      <span
        className={cn(
          'block animate-spin rounded-full border-smv-navy border-t-transparent',
          tailles[size],
        )}
      />
    </span>
  );
}

/** Loader plein écran avec barre de progression en haut (navigation lazy). */
export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="fixed inset-x-0 top-0 z-[60] h-1 overflow-hidden bg-smv-gray-100">
        <div className="h-full w-1/3 animate-progress-indeterminate bg-smv-green" />
      </div>
      <Loader size="lg" />
      <p className="text-sm text-smv-gray-600">Chargement…</p>
    </div>
  );
}
