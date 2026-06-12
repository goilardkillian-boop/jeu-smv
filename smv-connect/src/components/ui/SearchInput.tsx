import { Search, X } from 'lucide-react';
import { useId } from 'react';

export interface SearchInputProps {
  valeur: string;
  onChange: (valeur: string) => void;
  /** Déclenché à la soumission (touche Entrée). */
  onSearch?: (valeur: string) => void;
  placeholder?: string;
  label: string;
  className?: string;
}

export function SearchInput({
  valeur,
  onChange,
  onSearch,
  placeholder,
  label,
  className,
}: SearchInputProps) {
  const id = useId();
  return (
    <form
      role="search"
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(valeur);
      }}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-smv-gray-600"
          aria-hidden="true"
        />
        <input
          id={id}
          type="search"
          value={valeur}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border border-smv-gray-300 bg-white py-2.5 pl-9 pr-9 text-sm text-smv-gray-900 placeholder:text-smv-gray-600/70 focus:border-smv-navy focus:outline-none focus:ring-2 focus:ring-smv-navy/30 [&::-webkit-search-cancel-button]:hidden"
        />
        {valeur ? (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Effacer la recherche"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-smv-gray-600 hover:bg-smv-gray-100"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </form>
  );
}
