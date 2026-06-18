import { STATUTS_CANDIDATURE } from '../../lib/constants';
import type { CandidatureStatut } from '../../types/app.types';
import { Badge } from '../ui/Badge';

/** Badge coloré du statut d'une candidature. */
export function StatutBadge({ statut }: { statut: CandidatureStatut }) {
  const definition = STATUTS_CANDIDATURE.find((s) => s.id === statut);
  return (
    <Badge label={definition?.label ?? statut} className={definition?.badgeClasses ?? ''} />
  );
}
