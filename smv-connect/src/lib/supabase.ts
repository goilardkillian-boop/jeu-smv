import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Client Supabase typé, ou `null` si les variables d'environnement ne sont pas
 * renseignées. Dans ce cas l'application bascule en « mode démo » : toutes les
 * données proviennent du seed local (src/data) et les écritures restent en
 * mémoire / localStorage.
 */
export const supabase: SupabaseClient<Database> | null =
  url && anonKey ? createClient<Database>(url, anonKey) : null;

export const isSupabaseConfigured = supabase !== null;
