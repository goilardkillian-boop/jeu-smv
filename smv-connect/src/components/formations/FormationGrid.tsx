import { GraduationCap } from 'lucide-react';
import { useState } from 'react';
import type { FormationAvecCentre } from '../../types/app.types';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { Pagination } from '../ui/Pagination';
import { FormationCard } from './FormationCard';

const PAR_PAGE = 9;

export interface FormationGridProps {
  formations: FormationAvecCentre[];
}

/** Grille paginée de formations. */
export function FormationGrid({ formations }: FormationGridProps) {
  const [page, setPage] = useState(1);
  const pageCourante = Math.min(page, Math.max(1, Math.ceil(formations.length / PAR_PAGE)));
  const visibles = formations.slice((pageCourante - 1) * PAR_PAGE, pageCourante * PAR_PAGE);

  if (formations.length === 0) {
    return (
      <EmptyState
        icon={GraduationCap}
        titre="Aucune formation trouvée"
        description="Essaie d'élargir tes filtres ou de choisir un autre centre."
        action={<Button to="/centres" variant="secondary">Voir les centres</Button>}
      />
    );
  }

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visibles.map((formation) => (
          <FormationCard key={formation.id} formation={formation} />
        ))}
      </div>
      <Pagination
        total={formations.length}
        page={pageCourante}
        parPage={PAR_PAGE}
        onChange={(p) => {
          setPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
