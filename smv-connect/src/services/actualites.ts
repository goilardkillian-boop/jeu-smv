import { demoDb, demoDelay, demoId } from '../data/demoDb';
import { slugify } from '../lib/utils';
import { supabase } from '../lib/supabase';
import type { ActualiteAvecCentre } from '../types/app.types';
import type { ActualiteRow } from '../types/database.types';

const COLONNES_ACTUALITE =
  'id, centre_id, titre, slug, contenu, extrait, image_url, publie_le, publie, categorie, created_at, updated_at';
const COLONNES_AVEC_CENTRE = `${COLONNES_ACTUALITE}, centre:centres(id, slug, nom)`;

function joindreCentreDemo(actualite: ActualiteRow): ActualiteAvecCentre {
  const centre = actualite.centre_id
    ? demoDb.centres.find((c) => c.id === actualite.centre_id)
    : undefined;
  return {
    ...actualite,
    centre: centre ? { id: centre.id, slug: centre.slug, nom: centre.nom } : null,
  };
}

/** Actualités publiées, les plus récentes d'abord. */
export async function fetchActualitesPubliees(limite?: number): Promise<ActualiteAvecCentre[]> {
  if (!supabase) {
    await demoDelay();
    const publiees = demoDb.actualites
      .filter((a) => a.publie)
      .sort((a, b) => b.publie_le.localeCompare(a.publie_le))
      .map(joindreCentreDemo);
    return limite ? publiees.slice(0, limite) : publiees;
  }
  let requete = supabase
    .from('actualites')
    .select(COLONNES_AVEC_CENTRE)
    .eq('publie', true)
    .order('publie_le', { ascending: false });
  if (limite) requete = requete.limit(limite);
  const { data, error } = await requete;
  if (error) throw new Error(`Impossible de charger les actualités : ${error.message}`);
  return (data ?? []) as unknown as ActualiteAvecCentre[];
}

export async function fetchActualiteParSlug(slug: string): Promise<ActualiteAvecCentre | null> {
  if (!supabase) {
    await demoDelay();
    const actualite = demoDb.actualites.find((a) => a.slug === slug && a.publie);
    return actualite ? joindreCentreDemo(actualite) : null;
  }
  const { data, error } = await supabase
    .from('actualites')
    .select(COLONNES_AVEC_CENTRE)
    .eq('slug', slug)
    .eq('publie', true)
    .maybeSingle();
  if (error) throw new Error(`Impossible de charger l'article : ${error.message}`);
  return (data as unknown as ActualiteAvecCentre | null) ?? null;
}

/**
 * Actualités gérées par un admin : celles de son centre + les nationales
 * qu'il a créées. `centreId === null` (super admin) → tout voir.
 */
export async function fetchActualitesAdmin(centreId: string | null): Promise<ActualiteRow[]> {
  if (!supabase) {
    await demoDelay();
    return demoDb.actualites
      .filter((a) => centreId === null || a.centre_id === centreId)
      .sort((a, b) => b.publie_le.localeCompare(a.publie_le));
  }
  let requete = supabase
    .from('actualites')
    .select(COLONNES_ACTUALITE)
    .order('publie_le', { ascending: false });
  if (centreId !== null) requete = requete.eq('centre_id', centreId);
  const { data, error } = await requete;
  if (error) throw new Error(`Impossible de charger les actualités : ${error.message}`);
  return (data ?? []) as unknown as ActualiteRow[];
}

export async function fetchActualiteParId(id: string): Promise<ActualiteRow | null> {
  if (!supabase) {
    await demoDelay(100);
    return demoDb.actualites.find((a) => a.id === id) ?? null;
  }
  const { data, error } = await supabase
    .from('actualites')
    .select(COLONNES_ACTUALITE)
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(`Impossible de charger l'actualité : ${error.message}`);
  return (data as unknown as ActualiteRow | null) ?? null;
}

async function slugUnique(titre: string, idActuel?: string): Promise<string> {
  const base = slugify(titre);
  const existants = new Set<string>();
  if (!supabase) {
    demoDb.actualites.filter((a) => a.id !== idActuel).forEach((a) => existants.add(a.slug));
  } else {
    const { data } = await supabase.from('actualites').select('id, slug').like('slug', `${base}%`);
    (data ?? []).forEach((a) => {
      if (a.id !== idActuel) existants.add(a.slug);
    });
  }
  if (!existants.has(base)) return base;
  let i = 2;
  while (existants.has(`${base}-${i}`)) i += 1;
  return `${base}-${i}`;
}

export interface ActualitePayload {
  centre_id: string | null;
  titre: string;
  categorie: string | null;
  publie_le: string;
  extrait: string | null;
  contenu: string;
  image_url: string | null;
  publie: boolean;
}

export async function createActualite(payload: ActualitePayload): Promise<ActualiteRow> {
  const slug = await slugUnique(payload.titre);
  if (!supabase) {
    await demoDelay();
    const maintenant = new Date().toISOString();
    const actualite: ActualiteRow = {
      ...payload,
      id: demoId(),
      slug,
      created_at: maintenant,
      updated_at: maintenant,
    };
    demoDb.actualites.unshift(actualite);
    return { ...actualite };
  }
  const { data, error } = await supabase
    .from('actualites')
    .insert({ ...payload, slug })
    .select(COLONNES_ACTUALITE)
    .single();
  if (error) throw new Error(`Création impossible : ${error.message}`);
  return data as unknown as ActualiteRow;
}

export async function updateActualite(
  id: string,
  changements: Partial<ActualiteRow>,
): Promise<ActualiteRow> {
  const maj = { ...changements, updated_at: new Date().toISOString() };
  if (changements.titre) maj.slug = await slugUnique(changements.titre, id);
  if (!supabase) {
    await demoDelay();
    const actualite = demoDb.actualites.find((a) => a.id === id);
    if (!actualite) throw new Error('Actualité introuvable');
    Object.assign(actualite, maj);
    return { ...actualite };
  }
  const { data, error } = await supabase
    .from('actualites')
    .update(maj)
    .eq('id', id)
    .select(COLONNES_ACTUALITE)
    .single();
  if (error) throw new Error(`Enregistrement impossible : ${error.message}`);
  return data as unknown as ActualiteRow;
}

export async function deleteActualite(id: string): Promise<void> {
  if (!supabase) {
    await demoDelay();
    demoDb.actualites = demoDb.actualites.filter((a) => a.id !== id);
    return;
  }
  const { error } = await supabase.from('actualites').delete().eq('id', id);
  if (error) throw new Error(`Suppression impossible : ${error.message}`);
}
