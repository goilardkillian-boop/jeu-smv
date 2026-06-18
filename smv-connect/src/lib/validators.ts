import { z } from 'zod';
import {
  CATEGORIES_ACTUALITE,
  CATEGORIES_FORMATION,
  NIVEAUX_ETUDES,
  SITUATIONS_ACTUELLES,
  SOURCES_CONNAISSANCE,
} from './constants';
import { calculerAge } from './utils';

/* ------------------------------------------------------------------ */
/* Candidature — formulaire multi-étapes                               */
/* ------------------------------------------------------------------ */

const TELEPHONE_REGEX = /^0[1-9](?:\s?\d{2}){4}$/;

export const stepProfilSchema = z.object({
  prenom: z.string().trim().min(2, 'Ton prénom est requis'),
  nom: z.string().trim().min(2, 'Ton nom est requis'),
  date_naissance: z
    .string()
    .min(1, 'Ta date de naissance est requise')
    .refine((d) => {
      const age = calculerAge(d);
      return age === null || age >= 18;
    }, 'Tu dois avoir au moins 18 ans pour rejoindre le SMV')
    .refine((d) => {
      const age = calculerAge(d);
      return age === null || age <= 25;
    }, "Le SMV accueille les jeunes jusqu'à 25 ans"),
  nationalite_francaise: z
    .enum(['oui', 'non'], { message: 'Indique ta nationalité' })
    .refine((v) => v === 'oui', 'La nationalité française est requise pour rejoindre le SMV'),
  situation_handicap: z.enum(['oui', 'non'], { message: 'Indique ta situation' }),
  niveau_etudes: z.enum(NIVEAUX_ETUDES, { message: "Indique ton niveau d'études" }),
  situation_actuelle: z.enum(SITUATIONS_ACTUELLES, { message: 'Indique ta situation actuelle' }),
});

export const stepProjetSchema = z.object({
  type_volontaire: z.enum(['stagiaire', 'expert'], {
    message: 'Choisis ton type de volontariat',
  }),
  centre_id: z.string().min(1, 'Choisis un centre SMV'),
  formation_id: z.string().optional(),
  date_incorporation_souhaitee: z.string().optional(),
});

export const stepContactSchema = z.object({
  email: z.string().trim().email('Adresse email invalide'),
  telephone: z
    .string()
    .trim()
    .regex(TELEPHONE_REGEX, 'Numéro invalide — format attendu : 06 12 34 56 78'),
  adresse: z.string().trim().min(3, 'Ton adresse est requise'),
  code_postal: z.string().trim().regex(/^\d{5}$/, 'Code postal invalide (5 chiffres)'),
  ville_residence: z.string().trim().min(1, 'Ta ville est requise'),
  source_connaissance: z.enum(SOURCES_CONNAISSANCE, {
    message: 'Dis-nous comment tu as connu le SMV',
  }),
  message: z.string().max(1000, '1 000 caractères maximum').optional(),
});

export const stepValidationSchema = z.object({
  consentement_rgpd: z.literal(true, {
    message:
      "Tu dois accepter la transmission de tes données au centre SMV choisi pour envoyer ta candidature",
  }),
  consentement_engagement: z.literal(true, {
    message: "Tu dois avoir pris connaissance des conditions d'engagement militaire",
  }),
});

export type StepProfilValues = z.infer<typeof stepProfilSchema>;
export type StepProjetValues = z.infer<typeof stepProjetSchema>;
export type StepContactValues = z.infer<typeof stepContactSchema>;
export type StepValidationValues = z.infer<typeof stepValidationSchema>;

export type CandidatureFormValues = StepProfilValues & StepProjetValues & StepContactValues;

/* ------------------------------------------------------------------ */
/* Administration                                                      */
/* ------------------------------------------------------------------ */

export const loginSchema = z.object({
  email: z.string().trim().email('Adresse email invalide'),
  password: z.string().min(6, '6 caractères minimum'),
});
export type LoginValues = z.infer<typeof loginSchema>;

const CATEGORIE_IDS = CATEGORIES_FORMATION.map((c) => c.id) as [string, ...string[]];

export const formationSchema = z.object({
  titre: z.string().trim().min(3, 'Le titre est requis'),
  categorie: z.enum(CATEGORIE_IDS, { message: 'Choisissez une catégorie' }),
  public_vise: z.enum(['Volontaire stagiaire', 'Volontaire expert'], {
    message: 'Choisissez le public visé',
  }),
  duree_mois: z.coerce
    .number({ message: 'Durée invalide' })
    .refine((v) => v === 8 || v === 12, 'La durée est de 8 ou 12 mois'),
  description: z.string().optional(),
  debouches: z.array(z.string().trim().min(1, 'Champ vide')).default([]),
  certifications: z.array(z.string().trim().min(1, 'Champ vide')).default([]),
  dates_incorporation: z.array(z.string().trim().min(1, 'Champ vide')).default([]),
  places_disponibles: z.coerce
    .number({ message: 'Nombre invalide' })
    .int('Nombre entier attendu')
    .min(0)
    .nullable()
    .optional(),
  image_url: z
    .string()
    .trim()
    .url('URL invalide')
    .optional()
    .or(z.literal('')),
  actif: z.boolean().default(true),
});
export type FormationFormValues = z.infer<typeof formationSchema>;

export const actualiteSchema = z.object({
  titre: z.string().trim().min(3, 'Le titre est requis'),
  categorie: z.enum(CATEGORIES_ACTUALITE, { message: 'Choisissez une catégorie' }),
  publie_le: z.string().min(1, 'La date de publication est requise'),
  extrait: z.string().max(250, '250 caractères maximum').optional(),
  contenu: z.string().trim().min(10, 'Le contenu est requis'),
  image_url: z.string().trim().url('URL invalide').optional().or(z.literal('')),
  publie: z.boolean().default(false),
});
export type ActualiteFormValues = z.infer<typeof actualiteSchema>;

export const centreSchema = z.object({
  nom: z.string().trim().min(2, 'Le nom est requis'),
  nom_regiment: z.string().optional(),
  region: z.string().trim().min(2, 'La région est requise'),
  adresse: z.string().trim().min(2, "L'adresse est requise"),
  code_postal: z.string().trim().regex(/^\d{5}$/, 'Code postal invalide'),
  ville: z.string().trim().min(1, 'La ville est requise'),
  latitude: z.coerce.number().min(-90, 'Latitude invalide').max(90, 'Latitude invalide'),
  longitude: z.coerce.number().min(-180, 'Longitude invalide').max(180, 'Longitude invalide'),
  telephone_1: z.string().optional(),
  telephone_2: z.string().optional(),
  email_recrutement: z.string().trim().email('Adresse email invalide'),
  commandant: z.string().optional(),
  description: z.string().optional(),
  description_courte: z.string().max(300, '300 caractères maximum').optional(),
  capacite_annuelle: z.coerce.number().int().min(0).nullable().optional(),
  blason_url: z.string().trim().url('URL invalide').optional().or(z.literal('')),
  video_youtube: z.string().optional(),
  social_facebook: z.string().optional(),
  social_instagram: z.string().optional(),
  social_linkedin: z.string().optional(),
  social_youtube: z.string().optional(),
  horaires_recrutement: z.string().optional(),
});
export type CentreFormValues = z.infer<typeof centreSchema>;

export const temoignageSchema = z.object({
  prenom: z.string().trim().min(2, 'Le prénom est requis'),
  formation: z.string().optional(),
  promotion: z.string().optional(),
  texte: z.string().trim().min(10, 'Le témoignage est requis'),
  photo_url: z.string().trim().url('URL invalide').optional().or(z.literal('')),
  publie: z.boolean().default(false),
});
export type TemoignageFormValues = z.infer<typeof temoignageSchema>;

export const partenaireSchema = z.object({
  nom: z.string().trim().min(2, 'Le nom est requis'),
  logo_url: z.string().trim().url('URL invalide').optional().or(z.literal('')),
  site_web: z.string().trim().url('URL invalide').optional().or(z.literal('')),
  type: z.enum(['emploi', 'formation', 'institutionnel', 'entreprise']).nullable().optional(),
  actif: z.boolean().default(true),
});
export type PartenaireFormValues = z.infer<typeof partenaireSchema>;

export const utilisateurSchema = z.object({
  email: z.string().trim().email('Adresse email invalide'),
  prenom: z.string().trim().min(2, 'Le prénom est requis'),
  nom: z.string().trim().min(2, 'Le nom est requis'),
  role: z.enum(['recruteur', 'admin_centre', 'super_admin'], {
    message: 'Choisissez un rôle',
  }),
  centre_id: z.string().optional(),
});
export type UtilisateurFormValues = z.infer<typeof utilisateurSchema>;

export const contactSchema = z.object({
  nom: z.string().trim().min(2, 'Ton nom est requis'),
  email: z.string().trim().email('Adresse email invalide'),
  sujet: z.string().trim().min(3, 'Le sujet est requis'),
  message: z.string().trim().min(10, 'Ton message est requis'),
});
export type ContactFormValues = z.infer<typeof contactSchema>;
