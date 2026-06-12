import { GraduationCap, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StatutBadge } from '../../components/admin/StatutBadge';
import { Alert } from '../../components/ui/Alert';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Modal } from '../../components/ui/Modal';
import { Seo } from '../../components/ui/Seo';
import { Skeleton } from '../../components/ui/Skeleton';
import { useAsyncData } from '../../hooks/useAsyncData';
import { useAuth } from '../../hooks/useAuth';
import { categorieParId } from '../../lib/constants';
import { prochaineIncorporation } from '../../lib/utils';
import { deleteFormation, fetchFormationsAdmin, updateFormation } from '../../services/formations';
import { toast } from '../../store/toastStore';
import type { FormationAvecCentre } from '../../types/app.types';

export default function AdminFormations() {
  const { centreId, estSuperAdmin } = useAuth();
  const { data, chargement, erreur, recharger } = useAsyncData(
    () => fetchFormationsAdmin(centreId),
    [centreId],
  );
  const [suppression, setSuppression] = useState<FormationAvecCentre | null>(null);
  const [enCours, setEnCours] = useState(false);

  const basculerActif = async (formation: FormationAvecCentre) => {
    try {
      await updateFormation(formation.id, { actif: !formation.actif });
      toast.success(formation.actif ? 'Formation désactivée' : 'Formation activée');
      recharger();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Mise à jour impossible');
    }
  };

  const confirmerSuppression = async () => {
    if (!suppression) return;
    setEnCours(true);
    try {
      await deleteFormation(suppression.id);
      toast.success('Formation supprimée');
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
      <Seo titre="Formations — Admin" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy">
            Formations
          </h1>
          <p className="mt-1 text-sm text-smv-gray-600">
            {estSuperAdmin ? 'Toutes les formations, tous centres confondus.' : 'Les formations de ton centre.'}
          </p>
        </div>
        <Button to="/admin/formations/nouvelle" size="sm">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nouvelle formation
        </Button>
      </div>

      <div className="mt-6">
        {chargement ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : erreur ? (
          <Alert type="error">{erreur}</Alert>
        ) : (data ?? []).length === 0 ? (
          <EmptyState
            icon={GraduationCap}
            titre="Aucune formation"
            description="Crée ta première formation pour la rendre visible sur le site public."
            action={
              <Button to="/admin/formations/nouvelle" size="sm">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Nouvelle formation
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-smv-gray-100 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-smv-gray-100 bg-smv-off-white text-xs uppercase tracking-wide text-smv-gray-600">
                <tr>
                  <th scope="col" className="px-4 py-2.5">Formation</th>
                  {estSuperAdmin ? <th scope="col" className="px-4 py-2.5">Centre</th> : null}
                  <th scope="col" className="px-4 py-2.5">Catégorie</th>
                  <th scope="col" className="px-4 py-2.5">Public</th>
                  <th scope="col" className="px-4 py-2.5">Durée</th>
                  <th scope="col" className="px-4 py-2.5">Prochaine rentrée</th>
                  <th scope="col" className="px-4 py-2.5">Active</th>
                  <th scope="col" className="px-4 py-2.5">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-smv-gray-100">
                {(data ?? []).map((formation) => {
                  const prochaine = prochaineIncorporation(formation.dates_incorporation);
                  return (
                    <tr key={formation.id} className="hover:bg-smv-off-white">
                      <td className="max-w-[18rem] px-4 py-3">
                        <Link
                          to={`/admin/formations/${formation.id}`}
                          className="font-semibold text-smv-navy hover:underline"
                        >
                          {formation.titre}
                        </Link>
                      </td>
                      {estSuperAdmin ? (
                        <td className="px-4 py-3">{formation.centre?.nom ?? '—'}</td>
                      ) : null}
                      <td className="px-4 py-3">{categorieParId(formation.categorie)?.label ?? formation.categorie}</td>
                      <td className="px-4 py-3">{formation.public_vise === 'Volontaire expert' ? 'VE' : 'VS'}</td>
                      <td className="px-4 py-3">{formation.duree_mois} mois</td>
                      <td className="px-4 py-3">{prochaine?.label ?? '—'}</td>
                      <td className="px-4 py-3">
                        <label className="inline-flex cursor-pointer items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formation.actif}
                            onChange={() => void basculerActif(formation)}
                            aria-label={`${formation.actif ? 'Désactiver' : 'Activer'} ${formation.titre}`}
                            className="h-4 w-4 accent-smv-green"
                          />
                          <span className="sr-only">{formation.actif ? 'Active' : 'Inactive'}</span>
                        </label>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1">
                          <Link
                            to={`/admin/formations/${formation.id}`}
                            aria-label={`Modifier ${formation.titre}`}
                            className="rounded p-1.5 text-smv-navy hover:bg-smv-gray-100"
                          >
                            <Pencil className="h-4 w-4" aria-hidden="true" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setSuppression(formation)}
                            aria-label={`Supprimer ${formation.titre}`}
                            className="rounded p-1.5 text-smv-red hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {suppression ? (
        <Modal
          ouvert
          onClose={() => setSuppression(null)}
          titre="Supprimer la formation ?"
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
            « {suppression.titre} » sera supprimée définitivement. Pour la retirer temporairement
            du site public, préfère la désactivation.
          </p>
          <p className="mt-2 inline-flex items-center gap-2 text-sm">
            Statut actuel : <StatutBadge statut={suppression.actif ? 'accepte' : 'refuse'} />
          </p>
        </Modal>
      ) : null}
    </>
  );
}
