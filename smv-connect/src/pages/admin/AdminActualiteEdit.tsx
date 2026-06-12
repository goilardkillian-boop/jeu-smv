import { useNavigate, useParams } from 'react-router-dom';
import { ActualiteForm } from '../../components/admin/ActualiteForm';
import { Alert } from '../../components/ui/Alert';
import { Seo } from '../../components/ui/Seo';
import { Skeleton } from '../../components/ui/Skeleton';
import { useAsyncData } from '../../hooks/useAsyncData';
import { useAuth } from '../../hooks/useAuth';
import { useTousCentres } from '../../hooks/useCentres';
import { fetchActualiteParId } from '../../services/actualites';

/** Création (`/admin/actualites/nouvelle`) ou édition (`/admin/actualites/:id`). */
export default function AdminActualiteEdit() {
  const { id } = useParams<{ id: string }>();
  const { centreId, estSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const { data: centres } = useTousCentres();

  const edition = id !== undefined;
  const { data: actualite, chargement, erreur } = useAsyncData(
    () => (edition ? fetchActualiteParId(id) : Promise.resolve(null)),
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
  if (edition && !actualite) return <Alert type="error">Actualité introuvable.</Alert>;

  return (
    <>
      <Seo titre={edition ? 'Modifier une actualité — Admin' : 'Nouvelle actualité — Admin'} />
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy">
        {edition ? "Modifier l'actualité" : 'Nouvelle actualité'}
      </h1>
      <p className="mb-6 mt-1 text-sm text-smv-gray-600">
        {edition ? actualite?.titre : "Rédige, prévisualise puis publie quand c'est prêt."}
      </p>
      <ActualiteForm
        initiale={actualite ?? undefined}
        centreIdFixe={estSuperAdmin ? null : centreId}
        centres={centres ?? []}
        onDone={() => navigate('/admin/actualites')}
      />
    </>
  );
}
