import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export interface ListEditorProps {
  label: string;
  valeurs: string[];
  onChange: (valeurs: string[]) => void;
  placeholder?: string;
  hint?: string;
}

/** Éditeur de liste dynamique (débouchés, certifications, dates…). */
export function ListEditor({ label, valeurs, onChange, placeholder, hint }: ListEditorProps) {
  const [saisie, setSaisie] = useState('');

  const ajouter = () => {
    const valeur = saisie.trim();
    if (!valeur || valeurs.includes(valeur)) return;
    onChange([...valeurs, valeur]);
    setSaisie('');
  };

  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-smv-gray-900">{label}</p>
      {hint ? <p className="mb-2 text-xs text-smv-gray-600">{hint}</p> : null}
      {valeurs.length > 0 ? (
        <ul className="mb-2 space-y-1.5">
          {valeurs.map((valeur, index) => (
            <li
              key={`${valeur}-${index}`}
              className="flex items-center justify-between gap-2 rounded-md bg-smv-off-white px-3 py-1.5 text-sm"
            >
              <span className="min-w-0 truncate">{valeur}</span>
              <button
                type="button"
                onClick={() => onChange(valeurs.filter((_, i) => i !== index))}
                aria-label={`Supprimer « ${valeur} »`}
                className="rounded p-1 text-smv-gray-600 hover:bg-red-50 hover:text-smv-red"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex gap-2">
        <input
          type="text"
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              ajouter();
            }
          }}
          placeholder={placeholder}
          aria-label={`Ajouter — ${label}`}
          className="flex-1 rounded-md border border-smv-gray-300 px-3 py-2 text-sm focus:border-smv-navy focus:outline-none focus:ring-2 focus:ring-smv-navy/30"
        />
        <button
          type="button"
          onClick={ajouter}
          aria-label={`Ajouter à la liste ${label}`}
          className="rounded-md bg-smv-navy px-3 py-2 text-white hover:bg-smv-navy-dark"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
