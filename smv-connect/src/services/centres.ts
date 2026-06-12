import { demoDb, demoDelay } from '../data/demoDb';
import { supabase } from '../lib/supabase';
import type { Centre } from '../types/app.types';
import type { CentreRow } from '../types/database.types';

export const COLONNES_CENTRE =
  'id, slug, nom, nom_regiment, region, adresse, code_postal, ville, latitude, longitude, ' +
  'telephone_1, telephone_2, email_recrutement, commandant, description, description_courte, ' +
  'capacite_annuelle, blason_url, video_youtube, social_facebook, social_instagram, ' +
  'social_linkedin, social_youtube, horaires_recrutement, actif, created_at, updated_at';

/** Centres actifs, triés par nom (usage public). */
export async function fetchCentres(): Promise<Centre[]> {
  if (!supabase) {
    await demoDelay();
    return demoDb.centres
      .filter((c) => c.actif)
      .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
  }
  const { data, error } = await supabase
    .from('centres')
    .select(COLONNES_CENTRE)
    .eq('actif', true)
    .order('nom');
  if (error) throw new Error(`Impossible de charger les centres : ${error.message}`);
  return (data ?? []) as unknown as Centre[];
}

/** Tous les centres, y compris inactifs (espace super admin). */
export async function fetchTousCentres(): Promise<Centre[]> {
  if (!supabase) {
    await demoDelay();
    return [...demoDb.centres].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
  }
  const { data, error } = await supabase.from('centres').select(COLONNES_CENTRE).order('nom');
  if (error) throw new Error(`Impossible de charger les centres : ${error.message}`);
  return (data ?? []) as unknown as Centre[];
}

export async function fetchCentreParSlug(slug: string): Promise<Centre | null> {
  if (!supabase) {
    await demoDelay();
    return demoDb.centres.find((c) => c.slug === slug && c.actif) ?? null;
  }
  const { data, error } = await supabase
    .from('centres')
    .select(COLONNES_CENTRE)
    .eq('slug', slug)
    .eq('actif', true)
    .maybeSingle();
  if (error) throw new Error(`Impossible de charger le centre : ${error.message}`);
  return (data as unknown as Centre | null) ?? null;
}

export async function fetchCentreParId(id: string): Promise<Centre | null> {
  if (!supabase) {
    await demoDelay(100);
    return demoDb.centres.find((c) => c.id === id) ?? null;
  }
  const { data, error } = await supabase
    .from('centres')
    .select(COLONNES_CENTRE)
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(`Impossible de charger le centre : ${error.message}`);
  return (data as unknown as Centre | null) ?? null;
}

/** Mise à jour de la fiche centre (espace admin). */
export async function updateCentre(id: string, changements: Partial<CentreRow>): Promise<Centre> {
  if (!supabase) {
    await demoDelay();
    const centre = demoDb.centres.find((c) => c.id === id);
    if (!centre) throw new Error('Centre introuvable');
    Object.assign(centre, changements, { updated_at: new Date().toISOString() });
    return { ...centre };
  }
  const { data, error } = await supabase
    .from('centres')
    .update({ ...changements, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select(COLONNES_CENTRE)
    .single();
  if (error) throw new Error(`Enregistrement impossible : ${error.message}`);
  return data as unknown as Centre;
}

/** Activation / désactivation d'un centre (super admin). */
export async function setCentreActif(id: string, actif: boolean): Promise<void> {
  await updateCentre(id, { actif });
}
