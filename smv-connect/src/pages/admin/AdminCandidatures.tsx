import { Download, Inbox } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CandidatureModal } from '../../components/admin/CandidatureModal';
import { CandidatureTable } from '../../components/admin/CandidatureTable';
import { StatutBadge } from '../../components/admin/StatutBadge';
import { Alert } from '../../components/ui/Alert';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { SearchInput } from '../../components/ui/SearchInput';
import { Seo } from '../../components/ui/Seo';
import { Skeleton } from '../../components/ui/Skeleton';
import { useAsyncData } from '../../hooks/useAsyncData';
import { useAuth } from '../../hooks/useAuth';
import { STATUTS_CANDIDATURE } from '../../lib/constants';
import { cn, telechargerCsv } from '../../lib/utils';
import { fetchCandidatures, surChangementCandidatures } from '../../services/candidatures';
import type { CandidatureAvecRelations, CandidatureStatut } from '../../types/app.types';

function exporterCsv(candidatures: CandidatureAvecRelations[]): void {
  telechargerCsv(
    `candidatures-smv-${new Date().toISOString().slice(0, 10)}.csv`,
    [
      'Numéro de dossier', 'Date', 'Prénom', 'Nom', 'Email', 'Téléphone', 'Date de naissance',
      'Ville', 'Code postal', 'Type', "Niveau d'études", 'Centre', 'Formation', 'Statut',
    ],
    candidatures.map((c) => [
      c.numero_dossier,
      c.created_at.slice(0, 10),
      c.prenom,
      c.nom,
      c.email,
      c.telephone,
      c.date_naissance,
      c.ville_residence,
      c.code_postal,
      c.type_volontaire === 'expert' ? 'VE' : 'VS',
      c.niveau_etudes,
      c.centre?.nom ?? '',
      c.formation?.titre ?? '',
      c.statut,
    ]),
  );
}

export default function AdminCandidatures() {
  const { centreId, estSuperAdmin } = useAuth();
  const { data, chargement, erreur, recharger } = useAsyncData(
    () => fetchCandidatures(centreId),
    [centreId],
  );

  const [filtreStatut, setFiltreStatut] = useState<CandidatureStatut | null>(null);
  const [recherche, setRecherche] = useState('');
  const [selection, setSelection] = useState<CandidatureAvecRelations | null>(null);
  const [liste, setListe] = useState<CandidatureAvecRelations[]>([]);

  useEffect(() => {
    setListe(data ?? []);
  }, [data]);

  useEffect(() => surChangementCandidatures(centreId, recharger), [centreId, recharger]);

  const filtrees = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return liste.filter((candidature) => {
      if (filtreStatut && candidature.statut !== filtreStatut) return false;
      if (
        q &&
        !`${candidature.prenom} ${candidature.nom} ${candidature.email}`.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [liste, filtreStatut, recherche]);

  const compteurs = useMemo(() => {
    const total: Record<string, number> = {};
    liste.forEach((c) => {
      total[c.statut] = (total[c.statut] ?? 0) + 1;
    });
    return total;
  }, [liste]);

  const appliquerChangement = (maj: CandidatureAvecRelations) => {
    setListe((precedente) => precedente.map((c) => (c.id === maj.id ? maj : c)));
    setSelection(maj);
  };

  return (
    <>
      <Seo titre="Candidatures — Admin" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy">
            Candidatures
          </h1>
          <p className="mt-1 text-sm text-smv-gray-600">
            {liste.length} dossier{liste.length > 1 ? 's' : ''} au total — clique sur une ligne
            pour ouvrir le détail.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => exporterCsv(filtrees)}>
          <Download className="h-4 w-4" aria-hidden="true" />
          Export CSV {estSuperAdmin ? '(national)' : ''}
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFiltreStatut(null)}
          aria-pressed={filtreStatut === null}
          className={cn(
            'rounded-full border px-3 py-1.5 text-xs font-bold uppercase',
            filtreStatut === null
              ? 'border-smv-navy bg-smv-navy text-white'
              : 'border-smv-gray-300 text-smv-gray-600 hover:border-smv-navy',
          )}
        >
          Toutes ({liste.length})
        </button>
        {STATUTS_CANDIDATURE.map((statut) => (
          <button
            key={statut.id}
            type="button"
            onClick={() => setFiltreStatut(filtreStatut === statut.id ? null : statut.id)}
            aria-pressed={filtreStatut === statut.id}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-bold uppercase',
              filtreStatut === statut.id
                ? 'border-smv-navy bg-smv-navy text-white'
                : 'border-smv-gray-300 text-smv-gray-600 hover:border-smv-navy',
            )}
          >
            {statut.label} ({compteurs[statut.id] ?? 0})
          </button>
        ))}
        <SearchInput
          valeur={recherche}
          onChange={setRecherche}
          label="Rechercher par nom ou email"
          placeholder="Nom ou email…"
          className="ml-auto w-full sm:w-72"
        />
      </div>

      <div className="mt-6">
        {chargement ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : erreur ? (
          <Alert type="error">{erreur}</Alert>
        ) : filtrees.length === 0 ? (
          <EmptyState
            icon={Inbox}
            titre="Aucune candidature"
            description={
              recherche || filtreStatut
                ? 'Aucun dossier ne correspond à tes filtres.'
                : 'Les nouvelles candidatures apparaîtront ici en temps réel.'
            }
          />
        ) : (
          <CandidatureTable
            candidatures={filtrees}
            onSelect={setSelection}
            avecCentre={estSuperAdmin}
          />
        )}
      </div>

      {selection ? (
        <CandidatureModal
          candidature={selection}
          onClose={() => setSelection(null)}
          onChanged={appliquerChangement}
        />
      ) : null}

      <p className="sr-only" aria-live="polite">
        {filtrees.length} candidatures affichées
        {filtreStatut ? <StatutBadge statut={filtreStatut} /> : null}
      </p>
    </>
  );
}
