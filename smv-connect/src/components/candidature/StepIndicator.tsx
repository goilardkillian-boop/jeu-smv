import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface StepIndicatorProps {
  etapes: string[];
  courante: number;
}

/** Indicateur d'avancement du formulaire multi-étapes. */
export function StepIndicator({ etapes, courante }: StepIndicatorProps) {
  return (
    <nav aria-label="Progression de la candidature">
      {/* Mobile : étape courante seule */}
      <p className="text-sm font-semibold text-smv-gray-600 sm:hidden">
        Étape {courante + 1}/{etapes.length} — <span className="text-smv-navy">{etapes[courante]}</span>
      </p>

      {/* Desktop : toutes les étapes */}
      <ol className="hidden items-center gap-2 sm:flex">
        {etapes.map((etape, index) => {
          const faite = index < courante;
          const active = index === courante;
          return (
            <li key={etape} className="flex flex-1 items-center gap-2">
              <span
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 font-display text-base font-bold',
                  faite && 'border-smv-green bg-smv-green text-white',
                  active && 'border-smv-navy bg-smv-navy text-white',
                  !faite && !active && 'border-smv-gray-300 bg-white text-smv-gray-600',
                )}
              >
                {faite ? <Check className="h-4 w-4" aria-hidden="true" /> : index + 1}
              </span>
              <span
                className={cn(
                  'text-xs font-semibold uppercase tracking-wide',
                  active ? 'text-smv-navy' : 'text-smv-gray-600',
                )}
              >
                {etape}
              </span>
              {index < etapes.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={cn('h-0.5 flex-1 rounded', faite ? 'bg-smv-green' : 'bg-smv-gray-100')}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
