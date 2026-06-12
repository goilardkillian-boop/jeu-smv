import { Mail, Printer } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { STATUTS_CANDIDATURE } from '../../lib/constants';
import { calculerAge, formatDate } from '../../lib/utils';
import {
  updateNotesCandidature,
  updateStatutCandidature,
} from '../../services/candidatures';
import { toast } from '../../store/toastStore';
import type { CandidatureAvecRelations, CandidatureStatut } from '../../types/app.types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { StatutBadge } from './StatutBadge';

function ouvrirImpression(candidature: CandidatureAvecRelations): void {
  const lignes: Array<[string, string]> = [
    ['Numéro de dossier', candidature.numero_dossier],
    ['Reçue le', formatDate(candidature.created_at)],
    ['Candidat·e', `${candidature.prenom} ${candidature.nom}`],
    ['Date de naissance', `${formatDate(candidature.date_naissance)} (${calculerAge(candidature.date_naissance) ?? '?'} ans)`],
    ['Email', candidature.email],
    ['Téléphone', candidature.telephone ?? '—'],
    ['Adresse', `${candidature.adresse ?? ''}, ${candidature.code_postal} ${candidature.ville_residence}`],
    ['Type de volontariat', candidature.type_volontaire === 'expert' ? 'Volontaire expert' : 'Volontaire stagiaire'],
    ['Centre', candidature.centre?.nom ?? '—'],
    ['Formation', candidature.formation?.titre ?? '—'],
    ['Incorporation souhaitée', candidature.date_incorporation_souhaitee ?? '—'],
    ["Niveau d'études", candidature.niveau_etudes ?? '—'],
    ['Situation actuelle', candidature.situation_actuelle ?? '—'],
    ['Situation de handicap', candidature.situation_handicap ? 'Oui' : 'Non'],
    ['A connu le SMV par', candidature.source_connaissance ?? '—'],
    ['Message', candidature.message ?? '—'],
    ['Statut', STATUTS_CANDIDATURE.find((s) => s.id === candidature.statut)?.label ?? candidature.statut],
    ['Notes recruteur', candidature.notes_recruteur ?? '—'],
  ];
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<title>Candidature ${candidature.numero_dossier}</title>
<style>
  body { font-family: Arial, sans-serif; color: #1A1A1A; margin: 2rem; }
  h1 { color: #2D3E73; font-size: 20px; text-transform: uppercase; }
  table { border-collapse: collapse; width: 100%; margin-top: 1rem; }
  td { border: 1px solid #CCCCCC; padding: 8px 10px; font-size: 13px; vertical-align: top; }
  td:first-child { font-weight: bold; width: 220px; background: #F5F5F0; }
</style></head><body>
<h1>Service Militaire Volontaire — Candidature</h1>
<table>${lignes
    .map(
      ([label, valeur]) =>
        `<tr><td>${label}</td><td>${valeur.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</td></tr>`,
    )
    .join('')}</table>
<script>window.print();</script></body></html>`;

  const fenetre = window.open('', '_blank', 'width=800,height=900');
  if (!fenetre) {
    toast.error("Impossible d'ouvrir la fenêtre d'impression (bloqueur de popups ?)");
    return;
  }
  fenetre.document.write(html);
  fenetre.document.close();
}

function Ligne({ label, valeur }: { label: string; valeur: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-smv-gray-600">{label}</dt>
      <dd className="font-semibold text-smv-gray-900">{valeur || '—'}</dd>
    </div>
  );
}

export interface CandidatureModalProps {
  candidature: CandidatureAvecRelations;
  onClose: () => void;
  /** Notifie le parent d'un changement (statut/notes) pour rafraîchir la liste. */
  onChanged: (maj: CandidatureAvecRelations) => void;
}

/** Détail complet d'une candidature : statut, notes auto-sauvegardées, export. */
export function CandidatureModal({ candidature, onClose, onChanged }: CandidatureModalProps) {
  const [notes, setNotes] = useState(candidature.notes_recruteur ?? '');
  const [sauvegarde, setSauvegarde] = useState<'inactif' | 'encours' | 'fait'>('inactif');
  const [statutEnCours, setStatutEnCours] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Sauvegarde automatique des notes (debounce 800 ms).
  useEffect(() => {
    if (notes === (candidature.notes_recruteur ?? '')) return;
    setSauvegarde('encours');
    if (timerRef.current !== undefined) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      updateNotesCandidature(candidature.id, notes)
        .then(() => {
          setSauvegarde('fait');
          onChanged({ ...candidature, notes_recruteur: notes });
        })
        .catch((e: unknown) => {
          setSauvegarde('inactif');
          toast.error(e instanceof Error ? e.message : 'Sauvegarde impossible');
        });
    }, 800);
    return () => {
      if (timerRef.current !== undefined) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  const changerStatut = async (statut: CandidatureStatut) => {
    setStatutEnCours(true);
    try {
      await updateStatutCandidature(candidature, statut);
      const historique = [
        ...(candidature.statut_historique ?? []),
        { statut, date: new Date().toISOString() },
      ];
      onChanged({ ...candidature, statut, statut_historique: historique });
      toast.success('Statut mis à jour');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Changement impossible');
    } finally {
      setStatutEnCours(false);
    }
  };

  const sujetEmail = encodeURIComponent(
    `Votre candidature au SMV — dossier ${candidature.numero_dossier}`,
  );
  const corpsEmail = encodeURIComponent(
    `Bonjour ${candidature.prenom},\n\nNous avons bien reçu ta candidature au Service Militaire Volontaire (dossier ${candidature.numero_dossier}).\n\n[Compléter ici : convocation, pièces à fournir, prochaine étape…]\n\nCordialement,\nLa cellule recrutement${candidature.centre ? ` — Centre SMV de ${candidature.centre.nom}` : ''}`,
  );

  return (
    <Modal
      ouvert
      onClose={onClose}
      titre={`${candidature.prenom} ${candidature.nom}`}
      size="xl"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={() => ouvrirImpression(candidature)}>
            <Printer className="h-4 w-4" aria-hidden="true" />
            Télécharger en PDF
          </Button>
          <Button
            variant="secondary"
            size="sm"
            href={`mailto:${candidature.email}?subject=${sujetEmail}&body=${corpsEmail}`}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Envoyer un email au candidat
          </Button>
          <Button size="sm" onClick={onClose}>
            Fermer
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <StatutBadge statut={candidature.statut} />
          <span className="text-sm text-smv-gray-600">
            Dossier <strong>{candidature.numero_dossier}</strong> · reçu le{' '}
            {formatDate(candidature.created_at)}
          </span>
        </div>

        <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <Ligne
            label="Âge"
            valeur={`${calculerAge(candidature.date_naissance) ?? '?'} ans (${formatDate(candidature.date_naissance)})`}
          />
          <Ligne label="Email" valeur={candidature.email} />
          <Ligne label="Téléphone" valeur={candidature.telephone ?? ''} />
          <Ligne
            label="Adresse"
            valeur={`${candidature.adresse ?? ''}, ${candidature.code_postal} ${candidature.ville_residence}`}
          />
          <Ligne
            label="Type de volontariat"
            valeur={candidature.type_volontaire === 'expert' ? 'Volontaire expert (VE)' : 'Volontaire stagiaire (VS)'}
          />
          <Ligne label="Centre" valeur={candidature.centre?.nom ?? ''} />
          <Ligne label="Formation souhaitée" valeur={candidature.formation?.titre ?? ''} />
          <Ligne label="Incorporation souhaitée" valeur={candidature.date_incorporation_souhaitee ?? ''} />
          <Ligne label="Niveau d'études" valeur={candidature.niveau_etudes ?? ''} />
          <Ligne label="Situation actuelle" valeur={candidature.situation_actuelle ?? ''} />
          <Ligne label="Situation de handicap" valeur={candidature.situation_handicap ? 'Oui' : 'Non'} />
          <Ligne label="A connu le SMV par" valeur={candidature.source_connaissance ?? ''} />
        </dl>

        {candidature.message ? (
          <div className="rounded-md bg-smv-off-white p-4 text-sm">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-smv-gray-600">
              Message du candidat
            </p>
            <p className="whitespace-pre-wrap text-smv-gray-900">{candidature.message}</p>
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <Select
              label="Statut de la candidature"
              options={STATUTS_CANDIDATURE.map((s) => ({ value: s.id, label: s.label }))}
              value={candidature.statut}
              disabled={statutEnCours}
              onChange={(e) => void changerStatut(e.target.value as CandidatureStatut)}
            />
            {candidature.statut_historique && candidature.statut_historique.length > 0 ? (
              <div className="mt-3">
                <p className="text-xs font-bold uppercase tracking-wide text-smv-gray-600">
                  Historique des changements
                </p>
                <ul className="mt-1.5 space-y-1 text-xs text-smv-gray-600">
                  {[...candidature.statut_historique].reverse().map((entree, index) => (
                    <li key={`${entree.date}-${index}`}>
                      {formatDate(entree.date)} —{' '}
                      {STATUTS_CANDIDATURE.find((s) => s.id === entree.statut)?.label ?? entree.statut}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div>
            <label htmlFor="notes-recruteur" className="mb-1 block text-sm font-semibold text-smv-gray-900">
              Notes internes
            </label>
            <textarea
              id="notes-recruteur"
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tes notes sur ce dossier (jamais visibles du candidat)…"
              className="w-full rounded-md border border-smv-gray-300 px-3 py-2.5 text-sm focus:border-smv-navy focus:outline-none focus:ring-2 focus:ring-smv-navy/30"
            />
            <p className="mt-1 text-xs text-smv-gray-600" aria-live="polite">
              {sauvegarde === 'encours'
                ? 'Sauvegarde…'
                : sauvegarde === 'fait'
                  ? 'Enregistré ✓'
                  : 'Sauvegarde automatique'}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
