import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { formatDate } from '../../lib/utils';
import type { CandidatureAvecRelations } from '../../types/app.types';
import { StatutBadge } from './StatutBadge';

type Colonne = 'created_at' | 'nom' | 'formation' | 'type_volontaire' | 'ville_residence' | 'statut';

interface Tri {
  colonne: Colonne;
  direction: 'asc' | 'desc';
}

const COLONNES: Array<{ id: Colonne; label: string }> = [
  { id: 'created_at', label: 'Date' },
  { id: 'nom', label: 'Prénom Nom' },
  { id: 'formation', label: 'Formation' },
  { id: 'type_volontaire', label: 'Type' },
  { id: 'ville_residence', label: 'Ville' },
  { id: 'statut', label: 'Statut' },
];

function valeurTri(candidature: CandidatureAvecRelations, colonne: Colonne): string {
  switch (colonne) {
    case 'formation':
      return candidature.formation?.titre ?? '';
    case 'nom':
      return `${candidature.nom} ${candidature.prenom}`;
    default:
      return String(candidature[colonne] ?? '');
  }
}

export interface CandidatureTableProps {
  candidatures: CandidatureAvecRelations[];
  onSelect: (candidature: CandidatureAvecRelations) => void;
  /** Affiche la colonne centre (vue super admin). */
  avecCentre?: boolean;
}

/** Tableau triable des candidatures ; clic sur une ligne → détail. */
export function CandidatureTable({ candidatures, onSelect, avecCentre = false }: CandidatureTableProps) {
  const [tri, setTri] = useState<Tri>({ colonne: 'created_at', direction: 'desc' });

  const triees = useMemo(() => {
    const copie = [...candidatures];
    copie.sort((a, b) => {
      const comparaison = valeurTri(a, tri.colonne).localeCompare(valeurTri(b, tri.colonne), 'fr');
      return tri.direction === 'asc' ? comparaison : -comparaison;
    });
    return copie;
  }, [candidatures, tri]);

  const basculerTri = (colonne: Colonne) => {
    setTri((precedent) =>
      precedent.colonne === colonne
        ? { colonne, direction: precedent.direction === 'asc' ? 'desc' : 'asc' }
        : { colonne, direction: 'asc' },
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-smv-gray-100 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-smv-gray-100 bg-smv-off-white text-xs uppercase tracking-wide text-smv-gray-600">
          <tr>
            {COLONNES.map((colonne) => (
              <th
                key={colonne.id}
                scope="col"
                aria-sort={
                  tri.colonne === colonne.id
                    ? tri.direction === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : undefined
                }
                className="px-4 py-2.5"
              >
                <button
                  type="button"
                  onClick={() => basculerTri(colonne.id)}
                  className="inline-flex items-center gap-1 font-bold uppercase hover:text-smv-navy"
                >
                  {colonne.label}
                  {tri.colonne === colonne.id ? (
                    tri.direction === 'asc' ? (
                      <ArrowUp className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <ArrowDown className="h-3 w-3" aria-hidden="true" />
                    )
                  ) : (
                    <ArrowUpDown className="h-3 w-3 opacity-40" aria-hidden="true" />
                  )}
                </button>
              </th>
            ))}
            {avecCentre ? (
              <th scope="col" className="px-4 py-2.5">
                Centre
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-smv-gray-100">
          {triees.map((candidature) => (
            <tr
              key={candidature.id}
              tabIndex={0}
              onClick={() => onSelect(candidature)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(candidature);
                }
              }}
              className="cursor-pointer hover:bg-smv-off-white focus-visible:bg-smv-off-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-smv-navy"
              aria-label={`Voir la candidature de ${candidature.prenom} ${candidature.nom}`}
            >
              <td className="whitespace-nowrap px-4 py-3 text-smv-gray-600">
                {formatDate(candidature.created_at)}
              </td>
              <td className="px-4 py-3 font-semibold text-smv-navy">
                {candidature.prenom} {candidature.nom}
              </td>
              <td className="max-w-[16rem] truncate px-4 py-3">{candidature.formation?.titre ?? '—'}</td>
              <td className="px-4 py-3">{candidature.type_volontaire === 'expert' ? 'VE' : 'VS'}</td>
              <td className="px-4 py-3">{candidature.ville_residence}</td>
              <td className="px-4 py-3">
                <StatutBadge statut={candidature.statut} />
              </td>
              {avecCentre ? <td className="px-4 py-3">{candidature.centre?.nom ?? '—'}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
