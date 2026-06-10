# CONTENT DATABASE — index du contenu par ID

Référence rapide de tout le contenu data-driven. Les textes complets vivent dans les fichiers
sources indiqués (source unique de vérité).

## Jauges (`src/engine/types.ts`)

| ID | Nom | Seuil critique |
|----|-----|----------------|
| motivation | 🔥 Motivation | ≤ 15 → convocation Commandant |
| equipe | 🤝 Esprit d'équipe | ≤ 15 → convocation |
| rigueur | 📐 Rigueur | ≤ 15 → convocation |
| moral | ❤️ Moral | ≤ 15 → scène assistante sociale |

Interactions hebdo (`gameEngine.weeklyGaugeInteractions`) : Moral < 25 → Motivation −3/sem ;
Équipe > 70 → compense le Moral (+3 si Moral < 50).

## Attributs (7) — `resilience, sociabilite, determination, debrouillardise, confiance, intelligence, endurance`

20 points à la création (22 en NG+), min 1, max 6.

## Compétences (20) — `src/engine/types.ts` (`SKILL_META`)

- **Militaire** : condition_physique, discipline, equipe_skill, terrain
- **Académique** : francais, maths, culture_g, numerique
- **Professionnel** : savoir_etre, technique_filiere, stress_pro, communication
- **Social** : intelligence_emo, confiance_soi, gestion_conflit, resilience_emo
- **Autonomie** : budget, secours, code_route, autonomie

Niveaux : 0-24 Débutant · 25-49 Intermédiaire · 50-74 Avancé · 75-99 Expert · 100 Maîtrise.

## Traits (55) — `src/data/traits.ts`

- **Force (10)** : leader, competiteur, tenace, courageux, endurant, ambitieux, stoique, protecteur, volontariste, combatif
- **Social (10)** : empathique, bavard, diplomate, loyal, charmeur, drole, attentionne, genereux, mediateur, federateur
- **Intellect (8)** : curieux, debrouillard, stratege, perfectionniste, observateur, analytique, creatif, litteraire
- **Fragilité (8)** : anxieux, impulsif, renferme, susceptible, decourageable, perfectionniste_anx, hypersensible, procrastinateur
- **Autorité (9)** : discipline_t, mefiant_t, contestataire_t, besoin_explications, suiveur_t, rebelle, recherche_figure, anarchiste_doux, impressionner
- **Spéciale (5, débloqués par background)** : sportif_blesse, proche_aidant_t, survivant, artiste, parent_jeune_t
- **Ancrage (5)** : fier_origines, attache_region, bilingue, discret_passe, ouvert_passe

Effets mécaniques : `gameEngine.relationMultiplier` / `gaugeMultiplier`.

## Situations de départ (50) — `src/data/backgrounds_data.ts`

6 catégories : Décrochage scolaire (8) · Situation professionnelle (8) · Situation
personnelle (10) · Recherche active (10) · Envie d'ailleurs (8) · Profil particulier (6).
Chaque situation = modificateurs de jauges/attributs + flag `bg_<id>` exploité par les
textes dynamiques (prologue, appels famille, fins).

## Envies (20) — `src/data/backgrounds_data.ts` (`DESIRES`)

permis · emploi_stable · depassement · appartenir · me_prouver · prouver_famille · zero ·
ma_voie · diplome · rendre_service · fuir · me_decouvrir · discipline_d · socialiser · dette ·
carriere · rencontrer · utile · bouger · qui_je_suis — flags `desire_<id>`.

## PNJ (11) — jauges de relation 0-100

ferreira (départ 20, modifié par traits/autorité) · ines · dimitri · moreau · thomas · kevin ·
lea · momo · claire · enzo · famille.

## Presets (8) — `src/data/presets/`

maya (19) · theo (21) · sara (22) · kylian (20) · noah (18) · lena (24) · rachid (23) · jade (20).
Chaque fiche : sprite, background, envies, traits, autorité, 7 attributs, arc, fin associée.

## QCM (7 pools) — `src/data/questions/`

| Pool | Questions | Utilisé par |
|------|-----------|-------------|
| maths | 8 | remises à niveau |
| francais | 8 | remises à niveau |
| logique | 6 | examen de filière (c4_exam_qcm) |
| code_route | 8 (vraies règles) | examen du code (c4_code_qcm) |
| noeuds | 6 | test nœuds (c2_qcm_noeuds) |
| protocole | 7 + séquence TOC TOC (11 étapes) | évaluation protocole (c3_toc_qcm) |
| culture_g | 20 | quiz culture générale |

## Missions — `src/data/missions.ts`

M01-M15 (principales, flags `mXX_done`) + S01-S11 (secondaires). Suivi dans l'onglet
Missions du menu en jeu.

## Objets (26) — `src/data/items.ts`

Consommables (chocolat, cafés, paracétamol, biscuits, barre) · Social (cigarettes, stylo,
carnet, photo_famille, carte_postale, magazines, jeu_cartes) · Utilité (lampe, fiches_noeuds,
carnet_revision, kit_couture, livre_code) · Souvenirs (calot, insigne, brevet_psc1,
attestation_code, dessin_lea, ticket_momo, lettre_thomas) · Secrets (bouteille_enzo, lettre_ines).

## Médailles (26) — `src/data/achievements.ts`

premier_pas · informateur · bouclier · chef_de_file · survivant_m · pilote · major · solidaire ·
sprinter · academicien · fantome · recrue_parfaite · diplomate_m · confiance_accordee ·
frere_soeur · sans_faute · artiste_terrain · temoin · trop_tot · la_lettre · hors_sentiers ·
vrai_thomas · calot_famille · nuit_karola · huit_mois · ng_plus.

## Fins (12) — `src/data/story/endings.ts`

Réussite : fin_nouvelle_vie · fin_leader · fin_ensemble · fin_ferreira · fin_retour.
Parcours : fin_pas_la_fin · fin_graine · fin_soin · fin_autre_chemin.
Difficiles : fin_trop_tot · fin_solitude · fin_recommencer.
Logique de dispatch : `gameEngine.computeEnding` (voir STORY_MAP.md).

## Filières (8) — flags `filiere_*`

logistique · btp · securite · espaces_verts · industrie · resto · services · numerique.
Textes spécifiques : premier jour de stage (c5_premier_jour) et incident pro (c5_incident).

## Nœuds narratifs (142) — `src/data/story/`

prologue (17) · chapter1_arrivee (21) · chapter2_fmi (29) · chapter3_formation (23) ·
chapter4_epreuves (21) · chapter5_insertion (16) · sidescenes (9) + nœuds de fins.
Cibles spéciales du graphe : `RETURN` (retour post-scène système), `ENDING_DISPATCH`,
`ENDING_ABANDON`. Intégrité vérifiée automatiquement en dev (`src/data/story/index.ts`).
