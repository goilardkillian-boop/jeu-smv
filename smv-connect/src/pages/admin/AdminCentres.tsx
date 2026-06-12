import { Pencil } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { Seo } from '../../components/ui/Seo';
import { Skeleton } from '../../components/ui/Skeleton';
import { useAsyncData } from '../../hooks/useAsyncData';
import { useTousCentres } from '../../hooks/useCentres';
import { setCentreActif } from '../../services/centres';
import { fetchCandidatures } from '../../services/candidatures';
import { toast } from '../../store/toastStore';
import type { Centre } from '../../types/app.types';

/** Vue super admin : activation des centres + statistiques de candidatures. */
export default function AdminCentres() {
  const { data: centres, chargement, erreur, recharger } = useTousCentres();
  const { data: candidatures } = useAsyncData(() => fetchCandidatures(null), []);

  const statistiques = useMemo(() => {
    const compteurs: Record<string, { total: number; enAttente: number; acceptees: number }> = {};
    (candidatures ?? []).forEach((candidature) => {
      const stat = (compteurs[candidature.centre_id] ??= { total: 0, enAttente: 0, acceptees: 0 });
      stat.total += 1;
      if (candidature.statut === 'en_attente') stat.enAttente += 1;
      if (candidature.statut === 'accepte') stat.acceptees += 1;
    });
    return compteurs;
  }, [candidatures]);

  const basculer = async (centre: Centre) => {
    try {
      await setCentreActif(centre.id, !centre.actif);
      toast.success(centre.actif ? `Centre de ${centre.nom} désactivé` : `Centre de ${centre.nom} activé`);
      recharger();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Mise à jour impossible');
    }
  };

  return (
    <>
      <Seo titre="Tous les centres — Admin" />
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy">
        Tous les centres
      </h1>
      <p className="mt-1 text-sm text-smv-gray-600">
        Active ou désactive un centre et surveille ses candidatures.
      </p>

      <div className="mt-6">
        {chargement ? (
          <div className="space-y-2">
            {Array.from({ length: 7 }, (_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : erreur ? (
          <Alert type="error">{erreur}</Alert>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-smv-gray-100 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-smv-gray-100 bg-smv-off-white text-xs uppercase tracking-wide text-smv-gray-600">
                <tr>
                  <th scope="col" className="px-4 py-2.5">Centre</th>
                  <th scope="col" className="px-4 py-2.5">Région</th>
                  <th scope="col" className="px-4 py-2.5">Candidatures</th>
                  <th scope="col" className="px-4 py-2.5">En attente</th>
                  <th scope="col" className="px-4 py-2.5">Acceptées</th>
                  <th scope="col" className="px-4 py-2.5">Statut</th>
                  <th scope="col" className="px-4 py-2.5">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-smv-gray-100">
                {(centres ?? []).map((centre) => {
                  const stat = statistiques[centre.id];
                  return (
                    <tr key={centre.id} className="hover:bg-smv-off-white">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-smv-navy">{centre.nom}</p>
                        <p className="text-xs text-smv-gray-600">{centre.nom_regiment}</p>
                      </td>
                      <td className="px-4 py-3">{centre.region}</td>
                      <td className="px-4 py-3 font-semibold">{stat?.total ?? 0}</td>
                      <td className="px-4 py-3">{stat?.enAttente ?? 0}</td>
                      <td className="px-4 py-3">{stat?.acceptees ?? 0}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => void basculer(centre)}
                          aria-label={centre.actif ? `Désactiver ${centre.nom}` : `Activer ${centre.nom}`}
                        >
                          <Badge
                            variant={centre.actif ? 'green' : 'gray'}
                            label={centre.actif ? 'Actif' : 'Désactivé'}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to="/admin/centre"
                          aria-label={`Modifier la fiche du centre de ${centre.nom}`}
                          className="inline-flex items-center gap-1 rounded p-1.5 text-smv-navy hover:bg-smv-gray-100"
                        >
                          <Pencil className="h-4 w-4" aria-hidden="true" />
                          <span className="text-xs font-semibold">Fiche</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
