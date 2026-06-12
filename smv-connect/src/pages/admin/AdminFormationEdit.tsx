import { useNavigate, useParams } from 'react-router-dom';
import { FormationForm } from '../../components/admin/FormationForm';
import { Alert } from '../../components/ui/Alert';
import { Seo } from '../../components/ui/Seo';
import { Skeleton } from '../../components/ui/Skeleton';
import { useAsyncData } from '../../hooks/useAsyncData';
import { useAuth } from '../../hooks/useAuth';
import { useTousCentres } from '../../hooks/useCentres';
import { fetchFormationParId } from '../../services/formations';

/** Création (`/admin/formations/nouvelle`) ou édition (`/admin/formations/:id`). */
export default function AdminFormationEdit() {
  const { id } = useParams<{ id: string }>();
  const { centreId, estSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const { data: centres } = useTousCentres();

  const edition = id !== undefined;
  const { data: formation, chargement, erreur } = useAsyncData(
    () => (edition ? fetchFormationParId(id) : Promise.resolve(null)),
    [id],
  );

  if (edition && chargement) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }
  if (edition && erreur) return <Alert type="error">{erreur}</Alert>;
  if (edition && !formation) return <Alert type="error">Formation introuvable.</Alert>;

  return (
    <>
      <Seo titre={edition ? 'Modifier une formation — Admin' : 'Nouvelle formation — Admin'} />
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy">
        {edition ? 'Modifier la formation' : 'Nouvelle formation'}
      </h1>
      <p className="mb-6 mt-1 text-sm text-smv-gray-600">
        {edition ? formation?.titre : 'Renseigne les informations de la nouvelle filière.'}
      </p>
      <FormationForm
        initiale={formation ?? undefined}
        centreIdFixe={estSuperAdmin ? null : centreId}
        centres={centres ?? []}
        onDone={() => navigate('/admin/formations')}
      />
    </>
  );
}
