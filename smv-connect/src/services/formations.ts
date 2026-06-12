import { demoDb, demoDelay, demoId } from '../data/demoDb';
import { prochaineIncorporation, slugify } from '../lib/utils';
import { supabase } from '../lib/supabase';
import type { Formation, FormationAvecCentre } from '../types/app.types';
import type { FormationInsert, FormationRow } from '../types/database.types';

const COLONNES_FORMATION =
  'id, centre_id, titre, slug, categorie, public_vise, duree_mois, description, debouches, ' +
  'certifications, dates_incorporation, places_disponibles, image_url, actif, created_at, updated_at';

const COLONNES_AVEC_CENTRE = `${COLONNES_FORMATION}, centre:centres(id, slug, nom, region, ville)`;

function joindreCentreDemo(formation: FormationRow): FormationAvecCentre {
  const centre = demoDb.centres.find((c) => c.id === formation.centre_id);
  return {
    ...formation,
    centre: centre
      ? { id: centre.id, slug: centre.slug, nom: centre.nom, region: centre.region, ville: centre.ville }
      : null,
  };
}

/** Formations actives de tous les centres (catalogue public). */
export async function fetchFormationsActives(): Promise<FormationAvecCentre[]> {
  if (!supabase) {
    await demoDelay();
    return demoDb.formations.filter((f) => f.actif).map(joindreCentreDemo);
  }
  const { data, error } = await supabase
    .from('formations')
    .select(COLONNES_AVEC_CENTRE)
    .eq('actif', true)
    .order('titre');
  if (error) throw new Error(`Impossible de charger les formations : ${error.message}`);
  return (data ?? []) as unknown as FormationAvecCentre[];
}

export async function fetchFormationParSlug(slug: string): Promise<FormationAvecCentre | null> {
  if (!supabase) {
    await demoDelay();
    const formation = demoDb.formations.find((f) => f.slug === slug && f.actif);
    return formation ? joindreCentreDemo(formation) : null;
  }
  const { data, error } = await supabase
    .from('formations')
    .select(COLONNES_AVEC_CENTRE)
    .eq('slug', slug)
    .eq('actif', true)
    .maybeSingle();
  if (error) throw new Error(`Impossible de charger la formation : ${error.message}`);
  return (data as unknown as FormationAvecCentre | null) ?? null;
}

/** Formations d'un centre. `inclureInactives` pour l'espace admin. */
export async function fetchFormationsParCentre(
  centreId: string,
  inclureInactives = false,
): Promise<Formation[]> {
  if (!supabase) {
    await demoDelay();
    return demoDb.formations.filter(
      (f) => f.centre_id === centreId && (inclureInactives || f.actif),
    );
  }
  let requete = supabase.from('formations').select(COLONNES_FORMATION).eq('centre_id', centreId);
  if (!inclureInactives) requete = requete.eq('actif', true);
  const { data, error } = await requete.order('titre');
  if (error) throw new Error(`Impossible de charger les formations : ${error.message}`);
  return (data ?? []) as unknown as Formation[];
}

/** Formations d'un périmètre admin (toutes, actives ou non). `null` = national. */
export async function fetchFormationsAdmin(centreId: string | null): Promise<FormationAvecCentre[]> {
  if (!supabase) {
    await demoDelay();
    return demoDb.formations
      .filter((f) => centreId === null || f.centre_id === centreId)
      .map(joindreCentreDemo);
  }
  let requete = supabase.from('formations').select(COLONNES_AVEC_CENTRE);
  if (centreId !== null) requete = requete.eq('centre_id', centreId);
  const { data, error } = await requete.order('titre');
  if (error) throw new Error(`Impossible de charger les formations : ${error.message}`);
  return (data ?? []) as unknown as FormationAvecCentre[];
}

export async function fetchFormationParId(id: string): Promise<Formation | null> {
  if (!supabase) {
    await demoDelay(100);
    return demoDb.formations.find((f) => f.id === id) ?? null;
  }
  const { data, error } = await supabase
    .from('formations')
    .select(COLONNES_FORMATION)
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(`Impossible de charger la formation : ${error.message}`);
  return (data as unknown as Formation | null) ?? null;
}

/** Slug unique : « commis-de-cuisine », « commis-de-cuisine-2 », … */
async function slugUnique(titre: string, idActuel?: string): Promise<string> {
  const base = slugify(titre);
  const existants = new Set<string>();
  if (!supabase) {
    demoDb.formations.filter((f) => f.id !== idActuel).forEach((f) => existants.add(f.slug));
  } else {
    const { data } = await supabase.from('formations').select('id, slug').like('slug', `${base}%`);
    (data ?? []).forEach((f) => {
      if (f.id !== idActuel) existants.add(f.slug);
    });
  }
  if (!existants.has(base)) return base;
  let i = 2;
  while (existants.has(`${base}-${i}`)) i += 1;
  return `${base}-${i}`;
}

export interface FormationPayload {
  centre_id: string;
  titre: string;
  categorie: string;
  public_vise: FormationRow['public_vise'];
  duree_mois: number;
  description: string | null;
  debouches: string[];
  certifications: string[];
  dates_incorporation: string[];
  places_disponibles: number | null;
  image_url: string | null;
  actif: boolean;
}

export async function createFormation(payload: FormationPayload): Promise<Formation> {
  const slug = await slugUnique(payload.titre);
  if (!supabase) {
    await demoDelay();
    const maintenant = new Date().toISOString();
    const formation: FormationRow = {
      ...payload,
      id: demoId(),
      slug,
      created_at: maintenant,
      updated_at: maintenant,
    };
    demoDb.formations.unshift(formation);
    return { ...formation };
  }
  const insertion: FormationInsert = { ...payload, slug };
  const { data, error } = await supabase
    .from('formations')
    .insert(insertion)
    .select(COLONNES_FORMATION)
    .single();
  if (error) throw new Error(`Création impossible : ${error.message}`);
  return data as unknown as Formation;
}

export async function updateFormation(
  id: string,
  changements: Partial<FormationRow>,
): Promise<Formation> {
  const maj = { ...changements, updated_at: new Date().toISOString() };
  if (changements.titre) maj.slug = await slugUnique(changements.titre, id);
  if (!supabase) {
    await demoDelay();
    const formation = demoDb.formations.find((f) => f.id === id);
    if (!formation) throw new Error('Formation introuvable');
    Object.assign(formation, maj);
    return { ...formation };
  }
  const { data, error } = await supabase
    .from('formations')
    .update(maj)
    .eq('id', id)
    .select(COLONNES_FORMATION)
    .single();
  if (error) throw new Error(`Enregistrement impossible : ${error.message}`);
  return data as unknown as Formation;
}

export async function deleteFormation(id: string): Promise<void> {
  if (!supabase) {
    await demoDelay();
    demoDb.formations = demoDb.formations.filter((f) => f.id !== id);
    return;
  }
  const { error } = await supabase.from('formations').delete().eq('id', id);
  if (error) throw new Error(`Suppression impossible : ${error.message}`);
}

/** Formations dont la prochaine incorporation est à moins de `jours` jours. */
export function formationsIncorporationImminente(
  formations: Formation[],
  jours = 30,
): Array<{ formation: Formation; date: Date; label: string }> {
  const limite = new Date();
  limite.setDate(limite.getDate() + jours);
  return formations
    .filter((f) => f.actif)
    .map((formation) => ({ formation, prochaine: prochaineIncorporation(formation.dates_incorporation) }))
    .filter(
      (x): x is { formation: Formation; prochaine: { date: Date; label: string } } =>
        x.prochaine !== null && x.prochaine.date <= limite,
    )
    .map(({ formation, prochaine }) => ({ formation, date: prochaine.date, label: prochaine.label }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}
