import { demoDb, demoDelay, demoId } from '../data/demoDb';
import { supabase } from '../lib/supabase';
import type { Partenaire } from '../types/app.types';
import type { PartenaireRow } from '../types/database.types';

const COLONNES = 'id, centre_id, nom, logo_url, site_web, type, actif';

/**
 * Partenaires actifs : les nationaux (centre_id NULL) + ceux du centre
 * éventuellement passé en paramètre.
 */
export async function fetchPartenairesActifs(centreId?: string): Promise<Partenaire[]> {
  if (!supabase) {
    await demoDelay();
    return demoDb.partenaires.filter(
      (p) => p.actif && (p.centre_id === null || p.centre_id === centreId),
    );
  }
  let requete = supabase.from('partenaires').select(COLONNES).eq('actif', true);
  requete = centreId
    ? requete.or(`centre_id.is.null,centre_id.eq.${centreId}`)
    : requete.is('centre_id', null);
  const { data, error } = await requete.order('nom');
  if (error) throw new Error(`Impossible de charger les partenaires : ${error.message}`);
  return (data ?? []) as unknown as Partenaire[];
}

export async function fetchPartenairesAdmin(centreId: string | null): Promise<Partenaire[]> {
  if (!supabase) {
    await demoDelay();
    return demoDb.partenaires.filter(
      (p) => centreId === null || p.centre_id === centreId || p.centre_id === null,
    );
  }
  let requete = supabase.from('partenaires').select(COLONNES);
  if (centreId !== null) requete = requete.or(`centre_id.is.null,centre_id.eq.${centreId}`);
  const { data, error } = await requete.order('nom');
  if (error) throw new Error(`Impossible de charger les partenaires : ${error.message}`);
  return (data ?? []) as unknown as Partenaire[];
}

export interface PartenairePayload {
  centre_id: string | null;
  nom: string;
  logo_url: string | null;
  site_web: string | null;
  type: PartenaireRow['type'];
  actif: boolean;
}

export async function createPartenaire(payload: PartenairePayload): Promise<Partenaire> {
  if (!supabase) {
    await demoDelay();
    const partenaire: PartenaireRow = { ...payload, id: demoId() };
    demoDb.partenaires.push(partenaire);
    return { ...partenaire };
  }
  const { data, error } = await supabase
    .from('partenaires')
    .insert(payload)
    .select(COLONNES)
    .single();
  if (error) throw new Error(`Création impossible : ${error.message}`);
  return data as unknown as Partenaire;
}

export async function updatePartenaire(
  id: string,
  changements: Partial<PartenaireRow>,
): Promise<Partenaire> {
  if (!supabase) {
    await demoDelay();
    const partenaire = demoDb.partenaires.find((p) => p.id === id);
    if (!partenaire) throw new Error('Partenaire introuvable');
    Object.assign(partenaire, changements);
    return { ...partenaire };
  }
  const { data, error } = await supabase
    .from('partenaires')
    .update(changements)
    .eq('id', id)
    .select(COLONNES)
    .single();
  if (error) throw new Error(`Enregistrement impossible : ${error.message}`);
  return data as unknown as Partenaire;
}

export async function deletePartenaire(id: string): Promise<void> {
  if (!supabase) {
    await demoDelay();
    demoDb.partenaires = demoDb.partenaires.filter((p) => p.id !== id);
    return;
  }
  const { error } = await supabase.from('partenaires').delete().eq('id', id);
  if (error) throw new Error(`Suppression impossible : ${error.message}`);
}
