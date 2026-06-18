import { demoDb, demoDelay, demoId, demoNumeroDossier, persisterCandidaturesDemo } from '../data/demoDb';
import { genererNumeroDossier } from '../lib/utils';
import { supabase } from '../lib/supabase';
import type { CandidatureAvecRelations } from '../types/app.types';
import type {
  CandidatureInsert,
  CandidatureRow,
  CandidatureStatut,
  StatutHistoriqueEntry,
} from '../types/database.types';

const COLONNES_CANDIDATURE =
  'id, numero_dossier, centre_id, formation_id, nom, prenom, email, telephone, date_naissance, ' +
  'adresse, ville_residence, code_postal, nationalite_francaise, situation_handicap, ' +
  'situation_actuelle, type_volontaire, niveau_etudes, date_incorporation_souhaitee, ' +
  'source_connaissance, message, statut, statut_historique, notes_recruteur, created_at, updated_at';

const COLONNES_AVEC_RELATIONS = `${COLONNES_CANDIDATURE}, centre:centres(id, slug, nom), formation:formations(id, slug, titre)`;

function joindreRelationsDemo(candidature: CandidatureRow): CandidatureAvecRelations {
  const centre = demoDb.centres.find((c) => c.id === candidature.centre_id);
  const formation = candidature.formation_id
    ? demoDb.formations.find((f) => f.id === candidature.formation_id)
    : undefined;
  return {
    ...candidature,
    centre: centre ? { id: centre.id, slug: centre.slug, nom: centre.nom } : null,
    formation: formation ? { id: formation.id, slug: formation.slug, titre: formation.titre } : null,
  };
}

/**
 * Dépôt d'une candidature (formulaire public). Retourne le numéro de dossier.
 * L'envoi des emails de confirmation est délégué à l'Edge Function
 * `send-candidature-email` (silencieux en cas d'échec).
 */
export async function soumettreCandidature(
  candidature: Omit<CandidatureInsert, 'numero_dossier' | 'statut' | 'statut_historique'>,
): Promise<{ numeroDossier: string }> {
  const maintenant = new Date().toISOString();
  const historique: StatutHistoriqueEntry[] = [{ statut: 'en_attente', date: maintenant }];

  if (!supabase) {
    await demoDelay(500);
    const enregistrement: CandidatureRow = {
      adresse: null,
      telephone: null,
      formation_id: null,
      situation_actuelle: null,
      niveau_etudes: null,
      date_incorporation_souhaitee: null,
      source_connaissance: null,
      message: null,
      ...candidature,
      id: demoId(),
      numero_dossier: demoNumeroDossier(),
      statut: 'en_attente',
      statut_historique: historique,
      notes_recruteur: null,
      created_at: maintenant,
      updated_at: maintenant,
    };
    demoDb.candidatures.unshift(enregistrement);
    persisterCandidaturesDemo();
    return { numeroDossier: enregistrement.numero_dossier };
  }

  const numeroDossier = genererNumeroDossier();
  const { error } = await supabase.from('candidatures').insert({
    ...candidature,
    numero_dossier: numeroDossier,
    statut: 'en_attente',
    statut_historique: historique,
  });
  if (error) throw new Error(`L'envoi de ta candidature a échoué : ${error.message}`);

  // Notifications email (candidat + recruteur du centre) — non bloquant.
  supabase.functions
    .invoke('send-candidature-email', {
      body: { numero_dossier: numeroDossier },
    })
    .catch(() => undefined);

  return { numeroDossier };
}

/** Candidatures visibles par l'admin (centreId null = super admin → tout). */
export async function fetchCandidatures(
  centreId: string | null,
): Promise<CandidatureAvecRelations[]> {
  if (!supabase) {
    await demoDelay();
    return demoDb.candidatures
      .filter((c) => centreId === null || c.centre_id === centreId)
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .map(joindreRelationsDemo);
  }
  let requete = supabase
    .from('candidatures')
    .select(COLONNES_AVEC_RELATIONS)
    .order('created_at', { ascending: false });
  if (centreId !== null) requete = requete.eq('centre_id', centreId);
  const { data, error } = await requete;
  if (error) throw new Error(`Impossible de charger les candidatures : ${error.message}`);
  return (data ?? []) as unknown as CandidatureAvecRelations[];
}

/** Changement de statut avec ajout à l'historique. */
export async function updateStatutCandidature(
  candidature: Pick<CandidatureRow, 'id' | 'statut_historique'>,
  statut: CandidatureStatut,
): Promise<void> {
  const historique: StatutHistoriqueEntry[] = [
    ...(candidature.statut_historique ?? []),
    { statut, date: new Date().toISOString() },
  ];
  const maj = { statut, statut_historique: historique, updated_at: new Date().toISOString() };

  if (!supabase) {
    await demoDelay(150);
    const cible = demoDb.candidatures.find((c) => c.id === candidature.id);
    if (!cible) throw new Error('Candidature introuvable');
    Object.assign(cible, maj);
    persisterCandidaturesDemo();
    return;
  }
  const { error } = await supabase.from('candidatures').update(maj).eq('id', candidature.id);
  if (error) throw new Error(`Changement de statut impossible : ${error.message}`);
}

/** Sauvegarde (auto) des notes internes du recruteur. */
export async function updateNotesCandidature(id: string, notes: string): Promise<void> {
  const maj = { notes_recruteur: notes, updated_at: new Date().toISOString() };
  if (!supabase) {
    const cible = demoDb.candidatures.find((c) => c.id === id);
    if (!cible) throw new Error('Candidature introuvable');
    Object.assign(cible, maj);
    persisterCandidaturesDemo();
    return;
  }
  const { error } = await supabase.from('candidatures').update(maj).eq('id', id);
  if (error) throw new Error(`Sauvegarde des notes impossible : ${error.message}`);
}

/**
 * Abonnement temps réel aux candidatures (Supabase Realtime).
 * Retourne une fonction de désabonnement. Sans Supabase : no-op.
 */
export function surChangementCandidatures(
  centreId: string | null,
  surEvenement: () => void,
): () => void {
  if (!supabase) return () => undefined;
  const client = supabase;
  const canal = client
    .channel(`candidatures-${centreId ?? 'national'}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'candidatures',
        ...(centreId ? { filter: `centre_id=eq.${centreId}` } : {}),
      },
      () => surEvenement(),
    )
    .subscribe();
  return () => {
    void client.removeChannel(canal);
  };
}
