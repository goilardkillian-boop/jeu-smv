# Une vie à construire — SMV La Rochelle

Visual novel pixel art (PWA) librement inspiré du parcours au **3e Régiment du Service Militaire Volontaire** de La Rochelle. Le joueur vit une simulation émotionnelle d'un parcours SMV complet — de sa vie d'avant à la signature de son contrat — avec des choix qui façonnent réellement son histoire, ses relations et sa fin.

> ⚠️ Fiction interactive. Les personnages, dialogues et situations sont fictifs. Ce jeu ne constitue pas une représentation officielle du dispositif SMV. Information officielle : [www.le-smv.gouv.fr](https://www.le-smv.gouv.fr)

## Lancer le projet

```bash
npm install
npm run dev        # serveur de développement (http://localhost:5173)
npm run build      # build de production → dist/ (Netlify-ready)
npm run preview    # prévisualisation du build
```

Aucune configuration n'est requise : décors IA et musique fonctionnent **gratuitement, sans aucune clé API**. Hors-ligne, le jeu reste 100% jouable (décors procéduraux, effets synthétisés).

## Décors générés par IA — gratuit, sans clé (Pollinations)

Par défaut, les décors sont générés en pixel art via **[Pollinations.ai](https://pollinations.ai)** —
API d'images gratuite et sans inscription (simple URL `https://image.pollinations.ai/prompt/...`,
modèle Flux). Détails de l'intégration (`src/ai/imageGenerator.ts`) :

- seed stable par décor → toujours la même image, cohérente entre les parties ;
- cache IndexedDB → chaque décor n'est généré qu'une fois par appareil ;
- file d'attente côté client (1 requête à la fois, espacées de 6 s) pour respecter le palier
  anonyme de Pollinations ;
- en cas d'échec / limite / hors-ligne → repli silencieux sur les décors intégrés.

Alternatives dans l'écran titre (**⚙️ DÉCORS & MUSIQUE**) : Hugging Face avec token gratuit
(`nerijs/pixel-art-xl`, ou variable `VITE_HF_TOKEN`), ou décors intégrés uniquement.

## Musique — gratuit, sans clé (YouTube)

Par défaut, la musique vient de **radios YouTube 24/7** via l'IFrame Player API (aucune clé
requise) : lofi, chillhop, synthwave et dark ambient, mappées sur les 20 pistes du jeu
(`TRACK_TO_MOOD` dans `src/audio/tracks.ts` — changer un flux = remplacer un ID vidéo).
Un mini-lecteur ♪ repliable s'affiche en bas à droite (lecteur visible, volume/mute intégrés).
La lecture démarre au premier clic (politique d'autoplay des navigateurs).

Alternatives : fichiers locaux `public/audio/<nom>.mp3` (catalogue dans `src/audio/tracks.ts`),
ou silence. Les effets sonores utilisent Howler avec repli synthèse WebAudio 8-bit.

> Note : la musique YouTube nécessite une connexion. Hors-ligne, le jeu continue sans musique.

## Déploiement Netlify

```bash
npm run build
# déployer le dossier dist/
```

`netlify.toml` est fourni (SPA redirect + headers). La PWA (manifest + service worker offline) est générée automatiquement par `vite-plugin-pwa`.

## Stack

| Brique | Choix |
|---|---|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + CSS vanilla (overrides pixel art) |
| State | Zustand |
| Persistance | IndexedDB via Dexie.js (saves + cache assets IA) |
| Audio | Howler.js (fallback synthèse WebAudio) |
| Pixel art | Canvas API (`image-rendering: pixelated`) |
| IA assets | Hugging Face Inference API (optionnel) |
| Animations | CSS keyframes (transitions pixel, pluie, timer, CRT) |
| PWA | vite-plugin-pwa (manifest + offline) |

> Note : les animations sont réalisées en CSS plutôt qu'avec Framer Motion — plus léger et suffisant pour l'esthétique pixel (respecte `prefers-reduced-motion`).

## Structure

```
src/
├── engine/          # moteur : types, gameEngine (conditions/effets/multiplicateurs
│                    # de traits/calcul des fins), diceSystem, saveSystem, spriteBuilder
├── stores/          # Zustand : gameStore (flux narratif), audioStore
├── data/
│   ├── presets/     # 8 personnages préconfigurés
│   ├── questions/   # 7 pools de QCM (maths, français, logique, code, nœuds, protocole, culture G)
│   ├── story/       # graphe narratif : prologue, chapitres 1-5, scènes système, 12 fins
│   ├── traits.ts    # 55 traits en 7 familles
│   ├── backgrounds_data.ts  # 50 situations de départ + 20 envies
│   ├── items.ts / achievements.ts / missions.ts
├── components/
│   ├── screens/     # Title, CharacterCreation (wizard 7 étapes), Game, End
│   ├── ui/          # DialogueBox, ChoicePanel, QcmPanel, GaugeMeter, GamePanels…
│   ├── scenes/      # PixelBackground (décors procéduraux), CharacterSprite (Canvas)
│   └── effects/     # RainEffect, CRTOverlay
├── ai/              # imageGenerator (HF), assetCache, promptLibrary
└── audio/           # audioManager (Howler + synthèse), tracks
```

## Systèmes de jeu

- **4 jauges de survie** (Motivation, Esprit d'équipe, Rigueur, Moral) avec interactions
  hebdomadaires ; jauge ≤ 15 → convocation chez le Commandant ; Moral ≤ 15 → scène
  assistante sociale (traitée comme une force, jamais une faiblesse).
- **7 attributs** (20 points à la création, 22 en NG+), **20 compétences** évolutives en 5 domaines.
- **55 traits** : multiplicateurs cachés sur jauges et relations, jamais affichés comme des buffs.
- **50 situations de départ + 20 envies** : modificateurs et flags narratifs personnalisant les dialogues.
- **11 PNJ** avec jauges de relation et mémoire narrative (flags persistants référencés des semaines plus tard).
- **QCM jouables** : nœuds, protocole TOC TOC, code de la route (vraies règles), examen de filière.
- **Choix sous pression** (timer 8 s) sur les moments de crise.
- **8 filières professionnelles**, incident de stage spécifique à la filière.
- **12 fins** calculées sur l'état complet (jauges, relations, flags, parcours), 26 médailles, NG+.
- **Sauvegarde automatique** (IndexedDB) à chaque nœud, reprise depuis l'écran titre.

## Documentation

- [STORY_MAP.md](./STORY_MAP.md) — carte du graphe narratif (142 nœuds)
- [CONTENT_DATABASE.md](./CONTENT_DATABASE.md) — index du contenu par ID
- [ASSETS_TODO.md](./ASSETS_TODO.md) — assets IA/audio à produire, avec prompts
