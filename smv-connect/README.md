# SMV Connect

Application web full-stack de recrutement pour le **Service Militaire Volontaire** (SMV) :
centralisation de l'information des 7 centres SMV de France et mise en relation entre les
jeunes candidats (18-25 ans) et les recruteurs de chaque centre.

> Projet de démonstration inspiré de [le-smv.gouv.fr](https://www.le-smv.gouv.fr/) —
> contenus SMV réutilisés sous licence etalab-2.0.

## Stack

| Brique | Choix |
| --- | --- |
| Frontend | React 18 + TypeScript strict + Vite |
| Routing | React Router v6 (code splitting par route) |
| Styling | Tailwind CSS + variables CSS (Design System SMV) |
| BDD / Auth / Storage / Realtime | Supabase (PostgreSQL + RLS) |
| Carte | Leaflet.js + OpenStreetMap |
| Géocodage | API Adresse data.gouv.fr (gratuit, souverain, cache sessionStorage) |
| Formulaires | React Hook Form + Zod |
| State | Zustand |
| Icônes | Lucide React |
| Graphiques | Recharts |
| Déploiement | Vercel (frontend) + Supabase (backend) |

## Démarrage rapide

```bash
cd smv-connect
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck (tsc) + build de production → dist/
npm run preview    # prévisualisation du build
```

### Mode démo (zéro configuration)

Sans variables d'environnement Supabase, l'application bascule automatiquement en
**mode démo** : toutes les données (7 centres, 17 formations, actualités, témoignages,
partenaires, candidatures d'exemple) proviennent du seed local (`src/data/seed.ts`).

- Le site public est entièrement fonctionnel (recherche géographique comprise).
- Le formulaire de candidature enregistre dans `localStorage`.
- L'espace admin (`/admin/login`) propose deux profils de démonstration :
  **super admin national** et **admin du centre de La Rochelle**. Le CRUD
  (formations, actualités, témoignages, partenaires, fiche centre, statuts de
  candidatures) fonctionne en mémoire.

### Mode Supabase (production)

1. Crée un projet sur [supabase.com](https://supabase.com).
2. Exécute les migrations puis le seed (SQL Editor ou CLI) :
   ```bash
   supabase db push          # applique supabase/migrations/*.sql
   psql < supabase/seed.sql  # ou copier-coller dans le SQL Editor
   ```
3. Copie `.env.example` vers `.env.local` et renseigne :
   ```env
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJxxxx
   ```
4. (Emails) Déploie les Edge Functions et configure les secrets :
   ```bash
   supabase functions deploy send-candidature-email
   supabase functions deploy admin-create-user
   supabase secrets set RESEND_API_KEY=re_xxxx SMTP_FROM=recrutement@smv-connect.fr
   ```
5. Crée le premier super admin : crée un utilisateur dans Auth, puis insère son
   profil :
   ```sql
   INSERT INTO profiles (id, role, prenom, nom, email)
   VALUES ('<auth-user-uuid>', 'super_admin', 'Prénom', 'Nom', 'email@def.gouv.fr');
   ```
   Les comptes recruteurs suivants se créent ensuite depuis `/admin/utilisateurs`.

### Sécurité (RLS)

`supabase/migrations/0002_rls.sql` applique le modèle d'accès :

- contenus publiés/actifs lisibles publiquement ;
- recruteurs et admins de centre limités aux données de **leur** centre ;
- super admin : accès national ;
- candidatures : dépôt public (INSERT anonyme), lecture/édition réservées au centre
  concerné ;
- bucket Storage `images` public en lecture, upload réservé aux comptes admin.

## Fonctionnalités

**Site public** — accueil avec hero « Armé pour l'avenir », recherche géographique
(géolocalisation navigateur ou API Adresse, distances Haversine, centre le plus proche
mis en avant), chiffres clés animés, carte Leaflet des 7 centres (popups, bassins de
recrutement 200 km), catalogue de formations filtrable (centre, catégorie, VS/VE,
recherche, tri, état dans l'URL), fiches centre complètes (contact, vidéo
youtube-nocookie, formations, mini-carte, centres proches), pages Volontaire
Stagiaire / Expert avec processus en 8 étapes, actualités, candidature multi-étapes
(validations temps réel : âge 18-25, téléphone masqué, reprise sessionStorage, numéro
de dossier), contact, pages légales (mentions, RGPD, accessibilité, plan du site), 404.

**Espace admin** (`/admin`) — authentification Supabase (ou démo), dashboard
(métriques, graphique 12 mois Recharts, alertes incorporations < 30 jours, realtime),
gestion des candidatures (tri, filtres par statut, recherche, modal de détail, notes
auto-sauvegardées, historique de statuts, impression PDF, email candidat, export CSV),
CRUD formations / actualités (aperçu markdown en direct) / témoignages / partenaires,
édition de la fiche centre (avec prévisualisation carte), et pour le super admin :
activation des centres + statistiques et gestion des comptes recruteurs (création via
Edge Function, désactivation, réinitialisation de mot de passe).

## Structure

```
smv-connect/
├── src/
│   ├── components/   # ui/ (design system), layout/, home/, centres/,
│   │                 # formations/, actualites/, candidature/, seformer/, admin/
│   ├── pages/        # pages publiques + pages/admin/
│   ├── hooks/        # useCentres, useFormations, useGeocode, useGeolocation, useAuth…
│   ├── services/     # accès données (Supabase ⇄ repli démo)
│   ├── store/        # Zustand : auth, recherche géo, toasts
│   ├── lib/          # supabase, haversine, geocoding, validators (Zod), constants, utils
│   ├── data/         # seed démo + base démo mutable
│   └── types/        # types BDD + types métier
├── supabase/
│   ├── migrations/   # 0001_schema.sql, 0002_rls.sql
│   ├── seed.sql
│   └── functions/    # send-candidature-email, admin-create-user
└── vercel.json       # rewrites SPA
```

## Déploiement Vercel

Le repo est un monorepo : configurer **Root Directory = `smv-connect`** dans Vercel,
build command `npm run build`, output `dist`, et déclarer `VITE_SUPABASE_URL` /
`VITE_SUPABASE_ANON_KEY` dans les variables d'environnement du projet.

## Accessibilité & qualité

Navigation clavier complète (skip-link, focus visible), ARIA sur les composants
interactifs, contrastes AA, `prefers-reduced-motion` respecté, lazy loading des
images, code splitting par route, requêtes Supabase avec sélection explicite des
colonnes, debounce 300 ms et cache du géocodage.
