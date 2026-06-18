# PROMPTS GEMINI — Pack complet de génération d'assets

Mode d'emploi pour générer TOUS les assets avec un style cohérent de A à Z.

## ⚙️ La méthode (importante pour la cohérence)

1. **Ouvre UNE SEULE conversation Gemini** et fais toutes les images dedans, dans l'ordre.
2. **Commence par coller le BLOC DE STYLE** ci-dessous, seul, comme premier message.
3. Génère d'abord `cour_caserne.png` (décor de référence). Si le style te plaît, enchaîne —
   sinon régénère jusqu'à être satisfait, PUIS enchaîne : les images suivantes hériteront du ton.
4. Pour chaque image suivante, colle le prompt de la liste. Chaque prompt rappelle le style
   et la palette : même si Gemini "oublie", la cohérence tient.
5. Si une image dévie (couleurs criardes, 3D, trop détaillée) : réponds simplement
   « Refais-la dans le même style pixel art 16-bit que les précédentes, palette identique. »
6. Télécharge en PNG, **renomme exactement** comme indiqué, dépose dans le bon dossier GitHub.

---

## 🎨 BLOC DE STYLE — à coller en PREMIER message de la conversation

```
Tu vas générer une série d'images pour un même jeu vidéo de type visual novel.
Style à respecter STRICTEMENT pour toutes les images de cette conversation :

— Pixel art 16-bit, style Super Nintendo (SNES), gros pixels nets et visibles,
  aucun lissage, aucun rendu 3D, aucun style peinture digitale.
— Palette de couleurs imposée : bleu marine #1E2B4A, vert militaire #2D6A2F,
  vert clair #4A9E4D, sable #C4A35A, crème #F2EDD7, ombres bleu nuit #0A0F1E,
  accent doré #F0C040 avec parcimonie.
— Lumière douce et atmosphérique, ambiance sobre, émotionnelle, réaliste.
  Jamais caricatural, jamais cartoon enfantin, jamais sombre-horreur.
— Aucun texte, aucun logo, aucun filigrane, aucune interface dans l'image.

Contexte du jeu : un visual novel sur le parcours d'un jeune volontaire au
Service Militaire Volontaire à La Rochelle, France. Ton émotionnel et humain.

Réponds juste OK, les demandes d'images arrivent.
```

---

## 🖼️ LES 26 DÉCORS → `public/images/backgrounds/`

Format demandé à chaque fois : **paysage 16:9, sans personnages**. Si Gemini sort du
carré, redemande « en format paysage 16:9 ». Peu importe la résolution exacte.

| # | Fichier | Prompt à coller |
|---|---|---|
| 1 | `cour_caserne.png` | Décor pixel art 16-bit, format paysage 16:9 : cour de rassemblement d'une caserne française, bâtiments militaires bas des deux côtés, mât central avec drapeau français, marquages blancs au sol, ciel couvert gris-bleu. Palette bleu marine et vert militaire. Sans personnages, sans texte. |
| 2 | `chambre_avant.png` | Décor pixel art 16-bit, 16:9 : chambre d'adolescent en désordre, rideaux tirés, lumière du jour faible qui filtre, vêtements au sol, lit défait, écran de téléphone qui luit dans la pénombre. Ambiance mélancolique, tons bleus désaturés. Sans personnages, sans texte. |
| 3 | `phone_screen.png` | Décor pixel art 16-bit, 16:9 : très gros plan sur un smartphone à l'écran fêlé tenu dans la pénombre, une notification SMS verte lumineuse à l'écran, lumière bleue de l'écran sur fond de chambre sombre. Sans texte lisible, sans personnages. |
| 4 | `mission_locale.png` | Décor pixel art 16-bit, 16:9 : intérieur d'un bureau de Mission Locale française, bureau avec ordinateur, affiches d'orientation au mur, plante verte, éclairage néon chaleureux, sol en lino beige. Sans personnages, sans texte lisible. |
| 5 | `arret_bus.png` | Décor pixel art 16-bit, 16:9 : arrêt de bus solitaire sous une pluie fine, rue de banlieue française grise au petit matin, abribus vitré, flaques d'eau reflétant un lampadaire, ciel gris-bleu. Ambiance mélancolique. Sans personnages, sans texte. |
| 6 | `caserne_exterior_rain.png` | Décor pixel art 16-bit, 16:9 : grille d'entrée d'une caserne militaire française la nuit sous une pluie légère, mur d'enceinte, pavés mouillés avec flaques, bâtiments éclairés derrière la grille, dominante bleu marine nocturne. Sans personnages, sans texte. |
| 7 | `caserne_exterior_jour.png` | Décor pixel art 16-bit, 16:9 : la même grille de caserne militaire française au matin, grille ouverte, lumière dorée d'aube, ciel qui se dégage, ambiance d'espoir et de départ. Sans personnages, sans texte. |
| 8 | `cour_ceremonie.png` | Décor pixel art 16-bit, 16:9 : cour d'honneur militaire préparée pour une cérémonie, drapeaux français, petite estrade en bois, rangées de chaises pour les familles sur le côté, lumière dorée de fin de matinée, ambiance solennelle et émouvante. Sans personnages, sans texte. |
| 9 | `magasin_habillement.png` | Décor pixel art 16-bit, 16:9 : magasin d'habillement militaire, hautes étagères remplies de treillis verts pliés au carré, rangées de rangers noires, comptoir de distribution, éclairage néon. Sans personnages, sans texte. |
| 10 | `chambree.png` | Décor pixel art 16-bit, 16:9 : chambrée militaire de jour, huit lits superposables alignés avec couvertures vertes pliées au carré, casiers métalliques gris, grande fenêtre donnant sur une cour, lumière naturelle. Sans personnages, sans texte. |
| 11 | `chambree_nuit.png` | Décor pixel art 16-bit, 16:9 : la même chambrée militaire la nuit, clair de lune par la fenêtre, dominante bleu nuit, formes endormies suggérées sous les couvertures, atmosphère silencieuse et intime. Sans visages, sans texte. |
| 12 | `refectoire.png` | Décor pixel art 16-bit, 16:9 : réfectoire militaire, longues tables avec bancs, comptoir de service avec bacs en inox d'où monte de la vapeur, éclairage chaud, ambiance vivante. Sans personnages, sans texte. |
| 13 | `foyer.png` | Décor pixel art 16-bit, 16:9 : foyer de caserne le soir, vieille télévision, canapé usé, baby-foot, distributeur de boissons lumineux, lumière chaude tamisée, ambiance détente. Sans personnages, sans texte. |
| 14 | `zone_fumeur.png` | Décor pixel art 16-bit, 16:9 : zone fumeur extérieure le long d'un mur de caserne au crépuscule, banc en bois, cendrier sur pied, grillage, ciel orangé-bleu. Sans personnages, sans texte. |
| 15 | `couloir.png` | Décor pixel art 16-bit, 16:9 : long couloir militaire en perspective centrale, sol ciré qui reflète les néons du plafond, portes identiques des deux côtés, panneau d'affichage en liège. Sans personnages, sans texte lisible. |
| 16 | `salle_formation.png` | Décor pixel art 16-bit, 16:9 : salle de cours militaire, rangées de tables et chaises face à un tableau blanc, affiches pédagogiques aux murs, lumière du jour par de grandes fenêtres. Sans personnages, sans texte lisible. |
| 17 | `bureau_ferreira.png` | Décor pixel art 16-bit, 16:9 : bureau militaire strict et impeccablement rangé, bureau en bois sombre, drapeau français sur pied, cartes topographiques au mur, une seule chaise face au bureau, lumière froide. Ambiance d'autorité. Sans personnages, sans texte lisible. |
| 18 | `bureau_moreau.png` | Décor pixel art 16-bit, 16:9 : bureau d'officier plus chaleureux, bibliothèque remplie de classeurs et livres, dossiers parfaitement organisés, fenêtre avec vue sur un port au loin, lumière naturelle posée. Sans personnages, sans texte lisible. |
| 19 | `bureau_commandant.png` | Décor pixel art 16-bit, 16:9 : bureau de commandant imposant et solennel, grand bureau en bois massif, vitrine de médailles, drapeaux français et régimentaire encadrant le bureau, éclairage tamisé dramatique. Sans personnages, sans texte lisible. |
| 20 | `bureau_claire.png` | Décor pixel art 16-bit, 16:9 : bureau d'assistante sociale accueillant, plantes vertes en bonne santé, lampe à lumière chaude, deux fauteuils confortables qui se font face, boîte de mouchoirs sur une table basse. Ambiance rassurante, la pièce la plus chaleureuse de la caserne. Sans personnages, sans texte. |
| 21 | `terrain_boue.png` | Décor pixel art 16-bit, 16:9 : parcours d'obstacles militaire dans la boue sous la pluie, mur d'escalade en bois, cordes suspendues, sol détrempé avec éclaboussures de boue figées, ciel gris dramatique. Sans personnages, sans texte. |
| 22 | `camp_karola_jour.png` | Décor pixel art 16-bit, 16:9 : camp de bivouac militaire de jour sur la côte atlantique française, tentes de toile verte, pins maritimes, sol sablonneux, océan visible au loin, ciel bleu avec nuages. Sans personnages, sans texte. |
| 23 | `camp_karola_night.png` | Décor pixel art 16-bit, 16:9 : le même camp de bivouac la nuit, feu de camp central qui rougeoie, ciel étoilé magnifique, silhouettes des pins, lueur orangée sur les tentes, océan deviné dans l'obscurité. Ambiance mémorable et paisible. Sans personnages, sans texte. |
| 24 | `route_aube.png` | Décor pixel art 16-bit, 16:9 : route de campagne française à l'aube, ciel en dégradé bleu nuit vers orange à l'horizon, brume basse dans les champs, petites lampes rouges d'une colonne de marcheurs au loin (silhouettes minuscules), ambiance d'effort et de départ. Sans visages, sans texte. |
| 25 | `route_jour.png` | Décor pixel art 16-bit, 16:9 : route de campagne française en plein jour, champs et haies des deux côtés, colonne de marcheurs militaires avec sacs vue de loin en silhouettes, ciel avec nuages. Ambiance de persévérance. Sans visages détaillés, sans texte. |
| 26 | `ville_larochelle.png` | Décor pixel art 16-bit, 16:9 : Vieux-Port de La Rochelle au coucher de soleil doré, les deux tours médiévales en pierre encadrant l'entrée du port, bateaux de pêche amarrés, reflets dorés sur l'eau de l'Atlantique. Sans personnages, sans texte. |
| 27 | `stage_lieu.png` | Décor pixel art 16-bit, 16:9 : intérieur d'entrepôt-atelier français moderne, étagères de stockage avec caisses, établi, chariot élévateur jaune garé, lumière du matin par des fenêtres hautes. Ambiance premier jour de travail. Sans personnages, sans texte lisible. |

---

## 🧍 LES 10 SPRITES PNJ → `public/images/sprites/`

**Bloc à coller avant le premier sprite** (dans la même conversation) :

```
On passe aux personnages du jeu. Style à respecter pour TOUS :
sprite de personnage pixel art 16-bit style SNES, personnage EN PIED, DE FACE,
proportions semi-réalistes (PAS chibi, PAS manga), centré dans l'image,
format portrait vertical, FOND UNI VERT VIF #00FF00 (pour détourage),
aucun texte, aucune ombre portée au sol. Même trait et même échelle pour tous.
```

⚠️ Après génération : détoure le fond vert (remove.bg ou Photopea → sélection
couleur → suppr) et exporte en **PNG transparent**.

| # | Fichier | Prompt à coller |
|---|---|---|
| 1 | `ferreira.png` | Sprite pixel art 16-bit en pied, de face, fond vert uni : adjudant français de 38 ans, grand et carré d'épaules, mâchoire marquée, cheveux très courts poivre et sel, treillis camouflage impeccablement porté, rangers parfaites, posture droite et autoritaire, regard dur mais juste, quelques décorations discrètes sur la poitrine. |
| 2 | `ines.png` | Sprite pixel art 16-bit en pied, de face, fond vert uni : jeune femme française de 20 ans, queue de cheval châtain, traits doux, treillis militaire de volontaire un peu neuf, posture légèrement repliée qui trahit un manque de confiance, regard incertain mais intelligent. |
| 3 | `dimitri.png` | Sprite pixel art 16-bit en pied, de face, fond vert uni : jeune homme de 23 ans, cheveux bruns courts, grand sourire charmeur, treillis militaire porté avec une décontraction limite réglementaire (manches retroussées), posture ouverte et énergique de celui qui fait rire tout le monde. |
| 4 | `moreau.png` | Sprite pixel art 16-bit en pied, de face, fond vert uni : capitaine français de 41 ans, silhouette fine et droite, cheveux châtains coupés court, uniforme de cérémonie impeccable avec galons de capitaine, expression calme et précise, regard qui évalue sans juger. |
| 5 | `thomas.png` | Sprite pixel art 16-bit en pied, de face, fond vert uni : jeune homme frêle de 19 ans, cheveux châtain clair, taches de rousseur, treillis militaire visiblement un peu trop grand pour lui, épaules rentrées, expression anxieuse et touchante de celui qui n'a jamais quitté la maison. |
| 6 | `kevin.png` | Sprite pixel art 16-bit en pied, de face, fond vert uni : jeune homme très musclé de 22 ans, cheveux noirs rasés, t-shirt de sport militaire vert moulant, short et baskets, sourire confiant, posture athlétique de sportif. |
| 7 | `lea.png` | Sprite pixel art 16-bit en pied, de face, fond vert uni : jeune femme de 21 ans, carré noir net, grain de beauté sur la joue, treillis militaire, carnet de croquis serré sous le bras, expression silencieuse et observatrice, regard perçant et doux. |
| 8 | `momo.png` | Sprite pixel art 16-bit en pied, de face, fond vert uni : cuisinier de 47 ans, silhouette ronde et solide, moustache grise fournie, tablier blanc par-dessus une tenue de cuisine, louche à la main, sourire bienveillant de celui qui a tout vu et tout compris. |
| 9 | `claire.png` | Sprite pixel art 16-bit en pied, de face, fond vert uni : femme de 35 ans, assistante sociale en tenue civile (gilet long confortable sur chemisier), cheveux auburn en chignon bas, lunettes rondes, expression chaleureuse et apaisante, posture accueillante. |
| 10 | `enzo.png` | Sprite pixel art 16-bit en pied, de face, fond vert uni : jeune homme de 22 ans, coupe undercut noire, sourire en coin provocateur, piercing à l'arcade, treillis militaire porté négligemment col ouvert, cigarette posée sur l'oreille, posture nonchalante adossée. |

### Variantes d'expressions (optionnel, recommandé pour Ferreira, Inès, Dimitri, Thomas)

Juste après avoir généré un personnage, demande :

> « Refais EXACTEMENT le même personnage, même tenue, même pose, même style —
> seule l'expression du visage change : [expression]. »

Expressions et suffixes de nom de fichier : `_neutral` (neutre) · `_happy` (souriant) ·
`_sad` (abattu) · `_angry` (en colère) · `_surprised` (surpris) · `_thoughtful` (pensif).
Exemple : `ferreira_angry.png`, `thomas_sad.png`.

---

## 🎵 LES 20 MUSIQUES → `public/audio/music/`

⚠️ **Gemini ne génère pas d'audio.** Utilise **Suno** ou **Udio** (gratuits) avec ces
prompts, ou pioche dans Pixabay Music / FreePD. Demande toujours : **instrumental,
sans voix, boucle de 60-90 secondes**. Exporte/convertis en MP3.

Préfixe commun à coller dans chaque prompt Suno :
`Instrumental only, no vocals, chiptune lo-fi hybrid, 16-bit SNES soundfont with soft modern lo-fi drums, emotional and sober, loopable, 75 BPM`

| Fichier | Complément de prompt |
|---|---|
| `title.mp3` | nostalgic and hopeful main theme, gentle melody, rain ambience feel |
| `sms_notification.mp3` | minimal ambient pad, single soft motif, intimate |
| `mission_locale.mp3` | neutral warm waiting-room feel, light piano over chiptune pad |
| `caserne_approach.mp3` | tense low drone, sparse notes, rain mood, apprehension |
| `incorporation.mp3` | curious first-day energy, light apprehension, walking tempo |
| `fmi_day.mp3` | energetic training montage, steady military-ish percussion, motivating, 100 BPM |
| `fmi_night.mp3` | quiet night dormitory, soft pads, almost silence, music box hints |
| `bivouac.mp3` | campfire warmth, acoustic guitar + kalimba over chiptune, starry night |
| `doubt_crisis.mp3` | dark minimal, slow heartbeat pulse, melancholic, 60 BPM |
| `protocol_learning.mp3` | studious and light, metronome-like rhythm, focused |
| `marche_calot.mp3` | marching percussion building intensity, determination, gradual crescendo, 110 BPM |
| `ceremony.mp3` | solemn and moving, restrained brass over chiptune, proud emotional peak |
| `formation.mp3` | optimistic building energy, constructive mood, bright |
| `permis.mp3` | light playful concentration, quiz show energy but soft |
| `mission_citoyenne.mp3` | warm human community feel, gentle pride, acoustic touches |
| `stage.mp3` | first job energy, professional morning, confident groove |
| `stage_crisis.mp3` | contained stress, fast pulse, problem-solving tension, 120 BPM |
| `ending_success.mp3` | emotional triumphant release, wide and luminous, tears of joy |
| `ending_neutral.mp3` | bittersweet and peaceful, looking back without regret |
| `ending_hard.mp3` | grave but respectful, dignified low theme, never punishing |

---

## 🔊 LES 26 SFX → `public/audio/sfx/`

⚠️ Pas Gemini non plus. Le plus simple : **[sfxr.me](https://sfxr.me)** (gratuit, dans le
navigateur, 30 s par son, export WAV → convertis en MP3 avec cloudconvert.com).
Pour les ambiances (pluie, foule, vent) : cherche sur **Pixabay** (CC0, gratuit).

| Fichier | Recette |
|---|---|
| `pixel_blip.mp3` | sfxr → bouton « Blip/Select » |
| `chime_choice.mp3` | sfxr → « Pickup/Coin », monter la fréquence |
| `item_pickup.mp3` | sfxr → « Pickup/Coin » |
| `item_give.mp3` | sfxr → « Pickup/Coin », version plus douce/grave |
| `relation_up.mp3` | sfxr → « Powerup » court |
| `relation_down.mp3` | sfxr → « Hit/Hurt » adouci (baisser le volume d'attaque) |
| `qcm_correct.mp3` | sfxr → « Powerup » bref et clair |
| `qcm_wrong.mp3` | sfxr → « Hit/Hurt », grave, doux |
| `gauge_critical.mp3` | sfxr → « Explosion » très adouci, grave, court |
| `fanfare_mini.mp3` | sfxr → « Powerup » long, ou Pixabay « 8 bit fanfare short » |
| `fanfare_major.mp3` | Pixabay → « 8 bit victory fanfare » |
| `notification_sms.mp3` | sfxr → « Blip/Select » double (génère 2 fois, colle-les) |
| `page_turn.mp3` | Pixabay → « page turn » |
| `cinematic_whoosh.mp3` | Pixabay → « whoosh transition » |
| `chapter_title.mp3` | Pixabay → « cinematic impact soft » |
| `door_metal.mp3` | Pixabay → « metal door slam » |
| `step_boots_concrete.mp3` | Pixabay → « boots footsteps concrete » |
| `step_boots_mud.mp3` | Pixabay → « footsteps mud » |
| `crowd_mess_hall.mp3` | Pixabay → « cafeteria ambience crowd » (~20 s) |
| `rain_light.mp3` | Pixabay → « light rain ambience » (~20 s) |
| `rain_heavy.mp3` | Pixabay → « heavy rain ambience » (~20 s) |
| `wind_terrain.mp3` | Pixabay → « wind field ambience » (~20 s) |
| `radio_static.mp3` | Pixabay → « radio static short » |
| `heartbeat_slow.mp3` | Pixabay → « heartbeat slow » |
| `heartbeat_fast.mp3` | Pixabay → « heartbeat fast » |
| `ceremony_clapping.mp3` | Pixabay → « applause outdoor » |

---

## ✅ Checklist finale par fichier

1. Bon **nom exact** (minuscules, underscores, extension `.png` / `.mp3`)
2. Bon **dossier** (`public/images/backgrounds|sprites/`, `public/audio/music|sfx/`)
3. Sprites : **fond transparent** vérifié (damier visible dans l'aperçu)
4. Upload sur GitHub : ouvrir le dossier → **Add file → Upload files** → glisser → Commit
5. Netlify redéploie automatiquement (~2 min) → vérifier en jeu

Tu peux déposer les fichiers AU FUR ET À MESURE : tout fichier manquant garde son
fallback automatique (décor procédural / radio YouTube / bip synthé).
