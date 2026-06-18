import { CalendarClock, CheckCircle2, GraduationCap, Inbox, TimerReset } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DashboardMetrics, type Metrique } from '../../components/admin/DashboardMetrics';
import { StatutBadge } from '../../components/admin/StatutBadge';
import { Alert } from '../../components/ui/Alert';
import { Seo } from '../../components/ui/Seo';
import { Skeleton } from '../../components/ui/Skeleton';
import { useAsyncData } from '../../hooks/useAsyncData';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../lib/utils';
import { fetchCandidatures, surChangementCandidatures } from '../../services/candidatures';
import {
  fetchFormationsParCentre,
  formationsIncorporationImminente,
} from '../../services/formations';
import { fetchFormationsActives } from '../../services/formations';
import type { Candidature, Formation } from '../../types/app.types';

interface PointMois {
  mois: string;
  candidatures: number;
}

/** Agrège les candidatures par mois sur les 12 derniers mois. */
function candidaturesParMois(candidatures: Candidature[]): PointMois[] {
  const points: PointMois[] = [];
  const maintenant = new Date();
  for (let i = 11; i >= 0; i -= 1) {
    const date = new Date(maintenant.getFullYear(), maintenant.getMonth() - i, 1);
    const cle = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const nombre = candidatures.filter((c) => c.created_at.startsWith(cle)).length;
    points.push({
      mois: date.toLocaleDateString('fr-FR', { month: 'short' }),
      candidatures: nombre,
    });
  }
  return points;
}

export default function AdminDashboard() {
  const { centreId, centre, estSuperAdmin } = useAuth();

  const {
    data: candidatures,
    chargement,
    recharger,
  } = useAsyncData(() => fetchCandidatures(centreId), [centreId]);

  const { data: formations } = useAsyncData<Formation[]>(
    () => (centreId ? fetchFormationsParCentre(centreId, true) : fetchFormationsActives()),
    [centreId],
  );

  // Rafraîchissement en temps réel (Supabase Realtime).
  useEffect(() => surChangementCandidatures(centreId, recharger), [centreId, recharger]);

  const metriques: Metrique[] = useMemo(() => {
    const liste = candidatures ?? [];
    const debutMois = new Date();
    debutMois.setDate(1);
    debutMois.setHours(0, 0, 0, 0);
    const ceMois = liste.filter((c) => new Date(c.created_at) >= debutMois).length;
    const enCours = liste.filter((c) => c.statut === 'en_cours' || c.statut === 'en_attente').length;
    const decidees = liste.filter((c) => c.statut === 'accepte' || c.statut === 'refuse');
    const acceptees = liste.filter((c) => c.statut === 'accepte').length;
    const taux = decidees.length > 0 ? Math.round((acceptees / decidees.length) * 100) : null;
    const formationsActives = (formations ?? []).filter((f) => f.actif).length;

    return [
      { label: 'Candidatures ce mois', valeur: String(ceMois), icon: Inbox },
      { label: 'En cours de traitement', valeur: String(enCours), icon: TimerReset },
      { label: 'Formations actives', valeur: String(formationsActives), icon: GraduationCap },
      {
        label: "Taux d'acceptation",
        valeur: taux === null ? '—' : `${taux} %`,
        icon: CheckCircle2,
        detail: taux === null ? 'Aucune décision rendue' : `${acceptees} acceptée(s)`,
      },
    ];
  }, [candidatures, formations]);

  const graphe = useMemo(() => candidaturesParMois(candidatures ?? []), [candidatures]);
  const dernieres = (candidatures ?? []).slice(0, 5);
  const imminentes = useMemo(
    () => formationsIncorporationImminente(formations ?? [], 30),
    [formations],
  );

  return (
    <>
      <Seo titre="Tableau de bord — Admin" />
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy">
        Tableau de bord
      </h1>
      <p className="mt-1 text-sm text-smv-gray-600">
        {estSuperAdmin ? 'Vue nationale — tous les centres' : `Centre SMV de ${centre?.nom ?? ''}`}
      </p>

      {imminentes.length > 0 ? (
        <Alert type="warning" title="Incorporations imminentes (moins de 30 jours)" className="mt-6">
          <ul className="list-disc space-y-0.5 pl-4">
            {imminentes.slice(0, 4).map(({ formation, label }) => (
              <li key={formation.id}>
                <Link to={`/admin/formations/${formation.id}`} className="font-semibold underline">
                  {formation.titre}
                </Link>{' '}
                — incorporation le {label}
              </li>
            ))}
          </ul>
        </Alert>
      ) : null}

      <div className="mt-6">
        {chargement ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : (
          <DashboardMetrics metriques={metriques} />
        )}
      </div>

      <section aria-labelledby="graphe-titre" className="mt-8 rounded-lg border border-smv-gray-100 bg-white p-5 shadow-sm">
        <h2 id="graphe-titre" className="font-display text-xl font-bold uppercase text-smv-navy">
          Candidatures sur 12 mois
        </h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={graphe} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="mois" tick={{ fontSize: 12, fill: '#666666' }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#666666' }} />
              <Tooltip
                cursor={{ fill: '#F5F5F0' }}
                formatter={(valeur: number | string) => [String(valeur), 'Candidatures']}
              />
              <Bar dataKey="candidatures" fill="#2D3E73" radius={[4, 4, 0, 0]} activeBar={{ fill: '#3DA435' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section aria-labelledby="dernieres-titre" className="mt-8 rounded-lg border border-smv-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-2 px-5 py-4">
          <h2 id="dernieres-titre" className="font-display text-xl font-bold uppercase text-smv-navy">
            Dernières candidatures
          </h2>
          <Link to="/admin/candidatures" className="text-sm font-bold text-smv-green hover:underline">
            Tout voir
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-y border-smv-gray-100 bg-smv-off-white text-xs uppercase tracking-wide text-smv-gray-600">
              <tr>
                <th scope="col" className="px-5 py-2.5">Date</th>
                <th scope="col" className="px-5 py-2.5">Candidat·e</th>
                <th scope="col" className="px-5 py-2.5">Formation</th>
                <th scope="col" className="px-5 py-2.5">Type</th>
                <th scope="col" className="px-5 py-2.5">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-smv-gray-100">
              {dernieres.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-6 text-center text-smv-gray-600">
                    Aucune candidature pour le moment.
                  </td>
                </tr>
              ) : (
                dernieres.map((candidature) => (
                  <tr key={candidature.id} className="hover:bg-smv-off-white">
                    <td className="px-5 py-3 text-smv-gray-600">{formatDate(candidature.created_at)}</td>
                    <td className="px-5 py-3 font-semibold text-smv-navy">
                      {candidature.prenom} {candidature.nom}
                    </td>
                    <td className="px-5 py-3">{candidature.formation?.titre ?? '—'}</td>
                    <td className="px-5 py-3">{candidature.type_volontaire === 'expert' ? 'VE' : 'VS'}</td>
                    <td className="px-5 py-3">
                      <StatutBadge statut={candidature.statut} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-6 flex items-center gap-2 text-xs text-smv-gray-600">
        <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
        Les métriques se mettent à jour en temps réel à chaque nouvelle candidature.
      </p>
    </>
  );
}
