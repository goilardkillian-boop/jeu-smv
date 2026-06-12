// Supabase Edge Function — création d'un compte recruteur par le super admin.
// La création d'utilisateurs Auth exige la clé service_role : elle ne doit
// jamais transiter par le client. Cette fonction vérifie que l'appelant est
// bien super_admin avant de créer le compte + son profil.
//
// Déploiement : supabase functions deploy admin-create-user

import { createClient } from 'npm:@supabase/supabase-js@2';

interface Payload {
  email?: string;
  prenom?: string;
  nom?: string;
  role?: 'recruteur' | 'admin_centre' | 'super_admin';
  centre_id?: string | null;
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function motDePasseProvisoire(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!#%';
  const aleas = crypto.getRandomValues(new Uint32Array(14));
  return Array.from(aleas, (alea) => alphabet[alea % alphabet.length]).join('');
}

Deno.serve(async (requete) => {
  if (requete.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS });
  }

  const json = (corps: unknown, status = 200) =>
    new Response(JSON.stringify(corps), {
      status,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });

  try {
    // 1. Authentifie l'appelant avec son JWT et vérifie son rôle.
    const jeton = requete.headers.get('Authorization')?.replace('Bearer ', '') ?? '';
    const clientAppelant = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${jeton}` } },
    });
    const {
      data: { user: appelant },
    } = await clientAppelant.auth.getUser();
    if (!appelant) return json({ error: 'Non authentifié' }, 401);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    const { data: profilAppelant } = await admin
      .from('profiles')
      .select('role, actif')
      .eq('id', appelant.id)
      .single();
    if (!profilAppelant || profilAppelant.role !== 'super_admin' || !profilAppelant.actif) {
      return json({ error: 'Réservé au super admin' }, 403);
    }

    // 2. Crée le compte Auth + le profil.
    const { email, prenom, nom, role, centre_id }: Payload = await requete.json();
    if (!email || !prenom || !nom || !role) {
      return json({ error: 'Champs manquants (email, prenom, nom, role)' }, 400);
    }
    if (role !== 'super_admin' && !centre_id) {
      return json({ error: 'centre_id requis pour ce rôle' }, 400);
    }

    const password = motDePasseProvisoire();
    const { data: cree, error: erreurAuth } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (erreurAuth || !cree.user) {
      return json({ error: erreurAuth?.message ?? 'Création Auth impossible' }, 400);
    }

    const { error: erreurProfil } = await admin.from('profiles').insert({
      id: cree.user.id,
      email,
      prenom,
      nom,
      role,
      centre_id: role === 'super_admin' ? null : centre_id,
      actif: true,
    });
    if (erreurProfil) {
      await admin.auth.admin.deleteUser(cree.user.id);
      return json({ error: `Profil non créé : ${erreurProfil.message}` }, 400);
    }

    return json({ ok: true, password });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erreur inconnue';
    return json({ error: message }, 500);
  }
});
