import { Newspaper, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Modal } from '../../components/ui/Modal';
import { Seo } from '../../components/ui/Seo';
import { Skeleton } from '../../components/ui/Skeleton';
import { useAsyncData } from '../../hooks/useAsyncData';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../lib/utils';
import { deleteActualite, fetchActualitesAdmin, updateActualite } from '../../services/actualites';
import { toast } from '../../store/toastStore';
import type { Actualite } from '../../types/app.types';

export default function AdminActualites() {
  const { centreId } = useAuth();
  const { data, chargement, erreur, recharger } = useAsyncData(
    () => fetchActualitesAdmin(centreId),
    [centreId],
  );
  const [suppression, setSuppression] = useState<Actualite | null>(null);
  const [enCours, setEnCours] = useState(false);

  const basculerPublication = async (actualite: Actualite) => {
    try {
      await updateActualite(actualite.id, { publie: !actualite.publie });
      toast.success(actualite.publie ? 'Article dépublié (brouillon)' : 'Article publié');
      recharger();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Mise à jour impossible');
    }
  };

  const confirmerSuppression = async () => {
    if (!suppression) return;
    setEnCours(true);
    try {
      await deleteActualite(suppression.id);
      toast.success('Actualité supprimée');
      setSuppression(null);
      recharger();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Suppression impossible');
    } finally {
      setEnCours(false);
    }
  };

  return (
    <>
      <Seo titre="Actualités — Admin" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy">
            Actualités
          </h1>
          <p className="mt-1 text-sm text-smv-gray-600">
            Brouillons et articles publiés sur le site public.
          </p>
        </div>
        <Button to="/admin/actualites/nouvelle" size="sm">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nouvelle actualité
        </Button>
      </div>

      <div className="mt-6">
        {chargement ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : erreur ? (
          <Alert type="error">{erreur}</Alert>
        ) : (data ?? []).length === 0 ? (
          <EmptyState
            icon={Newspaper}
            titre="Aucune actualité"
            description="Publie la vie de ton centre : événements, recrutements, partenariats…"
            action={
              <Button to="/admin/actualites/nouvelle" size="sm">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Nouvelle actualité
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-smv-gray-100 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-smv-gray-100 bg-smv-off-white text-xs uppercase tracking-wide text-smv-gray-600">
                <tr>
                  <th scope="col" className="px-4 py-2.5">Titre</th>
                  <th scope="col" className="px-4 py-2.5">Catégorie</th>
                  <th scope="col" className="px-4 py-2.5">Publication</th>
                  <th scope="col" className="px-4 py-2.5">Statut</th>
                  <th scope="col" className="px-4 py-2.5">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-smv-gray-100">
                {(data ?? []).map((actualite) => (
                  <tr key={actualite.id} className="hover:bg-smv-off-white">
                    <td className="max-w-[20rem] px-4 py-3">
                      <Link
                        to={`/admin/actualites/${actualite.id}`}
                        className="font-semibold text-smv-navy hover:underline"
                      >
                        {actualite.titre}
                      </Link>
                      {actualite.centre_id === null ? (
                        <Badge variant="navy" label="Nationale" className="ml-2" />
                      ) : null}
                    </td>
                    <td className="px-4 py-3">{actualite.categorie ?? '—'}</td>
                    <td className="px-4 py-3 text-smv-gray-600">{formatDate(actualite.publie_le)}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => void basculerPublication(actualite)}
                        aria-label={actualite.publie ? `Dépublier ${actualite.titre}` : `Publier ${actualite.titre}`}
                      >
                        <Badge
                          variant={actualite.publie ? 'green' : 'orange'}
                          label={actualite.publie ? 'Publié' : 'Brouillon'}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1">
                        <Link
                          to={`/admin/actualites/${actualite.id}`}
                          aria-label={`Modifier ${actualite.titre}`}
                          className="rounded p-1.5 text-smv-navy hover:bg-smv-gray-100"
                        >
                          <Pencil className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setSuppression(actualite)}
                          aria-label={`Supprimer ${actualite.titre}`}
                          className="rounded p-1.5 text-smv-red hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {suppression ? (
        <Modal
          ouvert
          onClose={() => setSuppression(null)}
          titre="Supprimer l'actualité ?"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setSuppression(null)} disabled={enCours}>
                Annuler
              </Button>
              <Button variant="danger" size="sm" onClick={() => void confirmerSuppression()} disabled={enCours}>
                Supprimer définitivement
              </Button>
            </>
          }
        >
          <p className="text-sm text-smv-gray-900">
            « {suppression.titre} » sera supprimée définitivement. Pour la retirer du site sans la
            perdre, repasse-la plutôt en brouillon.
          </p>
        </Modal>
      ) : null}
    </>
  );
}
