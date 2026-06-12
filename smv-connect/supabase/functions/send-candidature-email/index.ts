// Supabase Edge Function — notifications email après dépôt de candidature.
// Envoie un accusé de réception au candidat et une alerte au recruteur du
// centre, via l'API Resend.
//
// Secrets requis :  supabase secrets set RESEND_API_KEY=re_xxx SMTP_FROM=recrutement@smv-connect.fr
// Déploiement :     supabase functions deploy send-candidature-email

import { createClient } from 'npm:@supabase/supabase-js@2';

interface Payload {
  numero_dossier?: string;
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const SMTP_FROM = Deno.env.get('SMTP_FROM') ?? 'recrutement@smv-connect.fr';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function envoyerEmail(destinataire: string, sujet: string, html: string): Promise<void> {
  const reponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: SMTP_FROM, to: [destinataire], subject: sujet, html }),
  });
  if (!reponse.ok) {
    throw new Error(`Resend ${reponse.status} : ${await reponse.text()}`);
  }
}

Deno.serve(async (requete) => {
  if (requete.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS });
  }

  try {
    const { numero_dossier }: Payload = await requete.json();
    if (!numero_dossier) {
      return new Response(JSON.stringify({ error: 'numero_dossier manquant' }), {
        status: 400,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    // Lecture avec la clé service_role (la candidature n'est pas lisible en anon).
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    const { data: candidature, error } = await supabase
      .from('candidatures')
      .select('numero_dossier, prenom, nom, email, type_volontaire, centre:centres(nom, email_recrutement), formation:formations(titre)')
      .eq('numero_dossier', numero_dossier)
      .single();

    if (error || !candidature) {
      return new Response(JSON.stringify({ error: 'Candidature introuvable' }), {
        status: 404,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const centre = candidature.centre as { nom: string; email_recrutement: string } | null;
    const formation = candidature.formation as { titre: string } | null;
    const nomCentre = centre?.nom ?? 'votre centre SMV';

    // 1. Accusé de réception au candidat.
    await envoyerEmail(
      candidature.email,
      `Ta candidature au SMV est bien reçue (dossier ${candidature.numero_dossier})`,
      `<div style="font-family: Arial, sans-serif; color: #1A1A1A; max-width: 560px;">
        <h1 style="color: #2D3E73;">Candidature bien reçue !</h1>
        <p>Bonjour ${candidature.prenom},</p>
        <p>Ta candidature au <strong>Service Militaire Volontaire</strong> a bien été transmise
        au centre SMV de <strong>${nomCentre}</strong>${formation ? ` pour la formation <strong>${formation.titre}</strong>` : ''}.</p>
        <p style="background: #F5F5F0; padding: 12px 16px; border-radius: 8px;">
          Ton numéro de dossier : <strong style="color: #3DA435;">${candidature.numero_dossier}</strong>
        </p>
        <p>Le recruteur du centre te recontactera sous quelques jours par téléphone ou par email.
        Garde ton téléphone à portée de main !</p>
        <p style="color: #666666; font-size: 12px;">« Armé pour l'avenir » — Service Militaire Volontaire</p>
      </div>`,
    );

    // 2. Alerte au recruteur du centre.
    if (centre?.email_recrutement) {
      await envoyerEmail(
        centre.email_recrutement,
        `Nouvelle candidature ${candidature.type_volontaire === 'expert' ? 'VE' : 'VS'} — ${candidature.prenom} ${candidature.nom} (${candidature.numero_dossier})`,
        `<div style="font-family: Arial, sans-serif; color: #1A1A1A; max-width: 560px;">
          <h1 style="color: #2D3E73;">Nouvelle candidature reçue</h1>
          <p><strong>${candidature.prenom} ${candidature.nom}</strong> vient de candidater
          (${candidature.type_volontaire === 'expert' ? 'volontaire expert' : 'volontaire stagiaire'}${formation ? `, formation « ${formation.titre} »` : ''}).</p>
          <p>Dossier : <strong>${candidature.numero_dossier}</strong></p>
          <p>Retrouvez le dossier complet dans l'espace administration SMV Connect.</p>
        </div>`,
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erreur inconnue';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
});
