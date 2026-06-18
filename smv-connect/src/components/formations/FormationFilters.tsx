import { RotateCcw } from 'lucide-react';
import { CATEGORIES_FORMATION } from '../../lib/constants';
import type { Centre } from '../../types/app.types';
import { SearchInput } from '../ui/SearchInput';
import { Select } from '../ui/Select';

export type TriFormations = 'incorporation' | 'duree' | 'alpha';

export interface FiltresFormations {
  q: string;
  categories: string[];
  centres: string[];
  type: '' | 'stagiaire' | 'expert';
  tri: TriFormations;
}

export const FILTRES_INITIAUX: FiltresFormations = {
  q: '',
  categories: [],
  centres: [],
  type: '',
  tri: 'incorporation',
};

export interface FormationFiltersProps {
  filtres: FiltresFormations;
  onChange: (filtres: FiltresFormations) => void;
  centres: Centre[];
  nbResultats: number;
}

function basculer(liste: string[], valeur: string): string[] {
  return liste.includes(valeur) ? liste.filter((v) => v !== valeur) : [...liste, valeur];
}

/** Panneau de filtres du catalogue (centres, catégories, type, tri, recherche). */
export function FormationFilters({ filtres, onChange, centres, nbResultats }: FormationFiltersProps) {
  const actifs =
    filtres.q !== '' ||
    filtres.categories.length > 0 ||
    filtres.centres.length > 0 ||
    filtres.type !== '';

  return (
    <aside aria-label="Filtres des formations" className="space-y-6">
      <SearchInput
        valeur={filtres.q}
        onChange={(q) => onChange({ ...filtres, q })}
        label="Rechercher une formation"
        placeholder="Rechercher une formation…"
      />

      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-smv-navy" aria-live="polite">
          {nbResultats} formation{nbResultats > 1 ? 's' : ''} trouvée{nbResultats > 1 ? 's' : ''}
        </p>
        {actifs ? (
          <button
            type="button"
            onClick={() => onChange({ ...FILTRES_INITIAUX, tri: filtres.tri })}
            className="inline-flex items-center gap-1 text-xs font-semibold text-smv-gray-600 underline-offset-2 hover:text-smv-red hover:underline"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Réinitialiser
          </button>
        ) : null}
      </div>

      <Select
        label="Trier par"
        options={[
          { value: 'incorporation', label: 'Prochaine incorporation' },
          { value: 'duree', label: 'Durée' },
          { value: 'alpha', label: 'Ordre alphabétique' },
        ]}
        value={filtres.tri}
        onChange={(e) => onChange({ ...filtres, tri: e.target.value as TriFormations })}
      />

      <fieldset>
        <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-smv-navy">
          Type de volontariat
        </legend>
        <div className="space-y-1.5">
          {[
            { value: '', label: 'Tous' },
            { value: 'stagiaire', label: 'Volontaire stagiaire (VS)' },
            { value: 'expert', label: 'Volontaire expert (VE)' },
          ].map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="type-volontaire"
                checked={filtres.type === option.value}
                onChange={() => onChange({ ...filtres, type: option.value as FiltresFormations['type'] })}
                className="h-4 w-4 accent-smv-green"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-smv-navy">
          Par centre
        </legend>
        <div className="max-h-52 space-y-1.5 overflow-y-auto pr-1">
          {centres.map((centre) => (
            <label key={centre.id} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filtres.centres.includes(centre.id)}
                onChange={() => onChange({ ...filtres, centres: basculer(filtres.centres, centre.id) })}
                className="h-4 w-4 rounded-sm accent-smv-green"
              />
              {centre.nom}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-smv-navy">
          Par catégorie
        </legend>
        <div className="space-y-1.5">
          {CATEGORIES_FORMATION.map((categorie) => (
            <label key={categorie.id} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filtres.categories.includes(categorie.id)}
                onChange={() =>
                  onChange({ ...filtres, categories: basculer(filtres.categories, categorie.id) })
                }
                className="h-4 w-4 rounded-sm accent-smv-green"
              />
              <categorie.icon className="h-4 w-4 text-smv-gray-600" aria-hidden="true" />
              {categorie.label}
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}
