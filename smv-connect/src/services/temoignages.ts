import { demoDb, demoDelay, demoId } from '../data/demoDb';
import { supabase } from '../lib/supabase';
import type { Temoignage } from '../types/app.types';
import type { TemoignageRow } from '../types/database.types';

const COLONNES = 'id, centre_id, prenom, formation, promotion, texte, photo_url, publie, created_at';

/** Témoignages publiés (tous centres, ou un centre donné). */
export async function fetchTemoignagesPublies(centreId?: string): Promise<Temoignage[]> {
  if (!supabase) {
    await demoDelay();
    return demoDb.temoignages.filter(
      (t) => t.publie && (centreId === undefined || t.centre_id === centreId),
    );
  }
  let requete = supabase.from('temoignages').select(COLONNES).eq('publie', true);
  if (centreId !== undefined) requete = requete.eq('centre_id', centreId);
  const { data, error } = await requete.order('created_at', { ascending: false });
  if (error) throw new Error(`Impossible de charger les témoignages : ${error.message}`);
  return (data ?? []) as unknown as Temoignage[];
}

export async function fetchTemoignagesAdmin(centreId: string | null): Promise<Temoignage[]> {
  if (!supabase) {
    await demoDelay();
    return demoDb.temoignages.filter((t) => centreId === null || t.centre_id === centreId);
  }
  let requete = supabase.from('temoignages').select(COLONNES);
  if (centreId !== null) requete = requete.eq('centre_id', centreId);
  const { data, error } = await requete.order('created_at', { ascending: false });
  if (error) throw new Error(`Impossible de charger les témoignages : ${error.message}`);
  return (data ?? []) as unknown as Temoignage[];
}

export interface TemoignagePayload {
  centre_id: string | null;
  prenom: string;
  formation: string | null;
  promotion: string | null;
  texte: string;
  photo_url: string | null;
  publie: boolean;
}

export async function createTemoignage(payload: TemoignagePayload): Promise<Temoignage> {
  if (!supabase) {
    await demoDelay();
    const temoignage: TemoignageRow = {
      ...payload,
      id: demoId(),
      created_at: new Date().toISOString(),
    };
    demoDb.temoignages.unshift(temoignage);
    return { ...temoignage };
  }
  const { data, error } = await supabase
    .from('temoignages')
    .insert(payload)
    .select(COLONNES)
    .single();
  if (error) throw new Error(`Création impossible : ${error.message}`);
  return data as unknown as Temoignage;
}

export async function updateTemoignage(
  id: string,
  changements: Partial<TemoignageRow>,
): Promise<Temoignage> {
  if (!supabase) {
    await demoDelay();
    const temoignage = demoDb.temoignages.find((t) => t.id === id);
    if (!temoignage) throw new Error('Témoignage introuvable');
    Object.assign(temoignage, changements);
    return { ...temoignage };
  }
  const { data, error } = await supabase
    .from('temoignages')
    .update(changements)
    .eq('id', id)
    .select(COLONNES)
    .single();
  if (error) throw new Error(`Enregistrement impossible : ${error.message}`);
  return data as unknown as Temoignage;
}

export async function deleteTemoignage(id: string): Promise<void> {
  if (!supabase) {
    await demoDelay();
    demoDb.temoignages = demoDb.temoignages.filter((t) => t.id !== id);
    return;
  }
  const { error } = await supabase.from('temoignages').delete().eq('id', id);
  if (error) throw new Error(`Suppression impossible : ${error.message}`);
}
