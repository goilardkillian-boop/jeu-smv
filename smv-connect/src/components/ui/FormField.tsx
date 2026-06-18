import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface ChampCommun {
  label: string;
  error?: string;
  hint?: string;
  requis?: boolean;
}

const CLASSES_CHAMP =
  'w-full rounded-md border bg-white px-3 py-2.5 text-sm text-smv-gray-900 ' +
  'placeholder:text-smv-gray-600/60 focus:border-smv-navy focus:outline-none focus:ring-2 focus:ring-smv-navy/30 ' +
  'disabled:bg-smv-gray-100';

function Enveloppe({
  id,
  label,
  error,
  hint,
  requis,
  children,
}: ChampCommun & { id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-smv-gray-900">
        {label}
        {requis ? (
          <span className="text-smv-red" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? <p id={`${id}-hint`} className="mt-1 text-xs text-smv-gray-600">{hint}</p> : null}
      {error ? (
        <p id={`${id}-erreur`} role="alert" className="mt-1 text-xs font-semibold text-smv-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>, ChampCommun {}

/** Champ texte avec label, aide et erreur accessibles (compatible RHF). */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  { label, error, hint, requis, className, id, ...props },
  ref,
) {
  const interneId = useId();
  const champId = id ?? interneId;
  return (
    <Enveloppe id={champId} label={label} error={error} hint={hint} requis={requis}>
      <input
        ref={ref}
        id={champId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${champId}-erreur` : hint ? `${champId}-hint` : undefined}
        className={cn(CLASSES_CHAMP, error ? 'border-smv-red' : 'border-smv-gray-300', className)}
        {...props}
      />
    </Enveloppe>
  );
});

export interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, ChampCommun {}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  function TextareaField({ label, error, hint, requis, className, id, rows = 4, ...props }, ref) {
    const interneId = useId();
    const champId = id ?? interneId;
    return (
      <Enveloppe id={champId} label={label} error={error} hint={hint} requis={requis}>
        <textarea
          ref={ref}
          id={champId}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${champId}-erreur` : hint ? `${champId}-hint` : undefined}
          className={cn(CLASSES_CHAMP, error ? 'border-smv-red' : 'border-smv-gray-300', className)}
          {...props}
        />
      </Enveloppe>
    );
  },
);

export interface CheckboxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  error?: string;
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  function CheckboxField({ label, error, id, className, ...props }, ref) {
    const interneId = useId();
    const champId = id ?? interneId;
    return (
      <div className={className}>
        <label htmlFor={champId} className="flex cursor-pointer items-start gap-3">
          <input
            ref={ref}
            id={champId}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${champId}-erreur` : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-sm border-smv-gray-300 accent-smv-green"
            {...props}
          />
          <span className="text-sm text-smv-gray-900">{label}</span>
        </label>
        {error ? (
          <p id={`${champId}-erreur`} role="alert" className="mt-1 text-xs font-semibold text-smv-red">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
