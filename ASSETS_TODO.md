# ASSETS TODO — génération IA & audio

Le jeu est **100% jouable sans ces assets** (décors procéduraux Canvas, sprites Canvas,
synthèse WebAudio). Cette liste sert à produire la version « premium ».

## 1. Décors IA (générés à la volée si token HF, sinon à pré-générer)

Modèle : `nerijs/pixel-art-xl` · API : Hugging Face Inference (gratuit, ~30 req/min).
Les prompts exacts sont dans `src/ai/promptLibrary.ts` (`BACKGROUND_PROMPTS`). 26 décors :

| Clé | Usage |
|-----|-------|
| chambre_avant | Prologue, vie d'avant |
| phone_screen | SMS Mission Locale / convocation |
| mission_locale | Entretien conseiller |
| arret_bus | Prologue + fin « Trop tôt » |
| caserne_exterior_rain | Arrivée sous la pluie (écran titre) |
| caserne_exterior_jour | Départ, fins |
| cour_caserne | Rassemblements |
| cour_ceremonie | Cérémonie du calot |
| magasin_habillement | Perception paquetage |
| chambree / chambree_nuit | Vie de chambrée |
| refectoire | Repas, Momo |
| foyer | Quartier libre, crises |
| zone_fumeur | Rumeurs, Enzo |
| couloir | Transitions, convocations |
| salle_formation | Cours, QCM |
| bureau_ferreira / bureau_moreau / bureau_commandant / bureau_claire | Scènes de bureau |
| terrain_boue | Parcours d'aguerrissement |
| camp_karola_jour / camp_karola_night | Bivouac |
| route_aube / route_jour | Marche au Calot |
| ville_larochelle | Mission citoyenne, fin réussite |
| stage_lieu | Chapitre 5 |

## 2. Sprites PNJ IA (optionnels — les sprites Canvas existent déjà)

Prompts dans `SPRITE_PROMPTS` : ferreira, ines, dimitri, moreau, thomas, kevin, lea, momo,
claire, enzo. Pour chaque PNJ, prévoir 6 expressions (neutral, happy, sad, angry, surprised,
thoughtful) en ajoutant `, <expression> expression` au prompt. Format : PNG fond transparent,
~96×128, upscale nearest-neighbor.

## 3. Audio — 20 musiques (`public/audio/<nom>.mp3`)

title · sms_notification · mission_locale · caserne_approach · incorporation · fmi_day ·
fmi_night · bivouac · doubt_crisis · protocol_learning · marche_calot · ceremony · formation ·
permis · mission_citoyenne · stage · stage_crisis · ending_success · ending_neutral · ending_hard

Direction artistique : chiptune/lo-fi sobre, jamais martial-caricatural. `doubt_crisis` :
nappe sombre minimale. `ceremony` : cuivres 8-bit retenus. Boucles 60-90 s sans couture.

## 4. Audio — 26 effets (`public/audio/<nom>.mp3`)

step_boots_concrete · step_boots_mud · door_metal · crowd_mess_hall · rain_light · rain_heavy ·
wind_terrain · radio_static · heartbeat_slow · heartbeat_fast · pixel_blip · chime_choice ·
fanfare_mini · fanfare_major · notification_sms · page_turn · item_pickup · item_give ·
relation_up · relation_down · gauge_critical · qcm_correct · qcm_wrong · cinematic_whoosh ·
chapter_title · ceremony_clapping

Fallback actuel : bips square-wave WebAudio (fréquences dans `src/audio/tracks.ts`).

## 5. Icônes PWA

`public/icon-192.svg` et `icon-512.svg` sont des placeholders (logo pixel SMV simplifié).
À remplacer par des PNG 192×192 / 512×512 dédiés (maskable inclus).
