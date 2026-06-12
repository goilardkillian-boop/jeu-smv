import { ChevronDown } from 'lucide-react';
import { forwardRef, useId, type SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

/** Select natif stylé (accessible clavier/lecteur d'écran). */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, error, className, id, ...props },
  ref,
) {
  const interneId = useId();
  const selectId = id ?? interneId;
  const erreurId = `${selectId}-erreur`;
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={selectId} className="mb-1 block text-sm font-semibold text-smv-gray-900">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? erreurId : undefined}
          className={cn(
            'w-full appearance-none rounded-md border bg-white py-2.5 pl-3 pr-9 text-sm text-smv-gray-900',
            'focus:border-smv-navy focus:outline-none focus:ring-2 focus:ring-smv-navy/30',
            error ? 'border-smv-red' : 'border-smv-gray-300',
          )}
          {...props}
        >
          {placeholder !== undefined ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-smv-gray-600"
          aria-hidden="true"
        />
      </div>
      {error ? (
        <p id={erreurId} role="alert" className="mt-1 text-xs font-semibold text-smv-red">
          {error}
        </p>
      ) : null}
    </div>
  );
});
