# Sprites PNJ — dépose ici tes images PNG

**Format : PNG avec FOND TRANSPARENT, portrait vertical 3:4 — idéalement 384×512
(ou 96×128). Style : pixel art 16-bit, personnage de face, en pied.**

Le jeu utilise automatiquement `<pnj>.png` s'il existe (sinon le sprite intégré).
Optionnel : une variante par expression `<pnj>_<expression>.png`
(expressions : `neutral`, `happy`, `sad`, `angry`, `surprised`, `thoughtful`).

⚠️ Gemini gère mal la transparence : génère sur fond uni vert/magenta et
détourne ensuite (remove.bg, Photopea…), ou garde un fond très sombre uni.

## Les 10 fichiers de base (noms EXACTS)

| Fichier | Personnage |
|---|---|
| `ferreira.png` | Adjudant Ferreira, 38 ans — grand, carré, cheveux courts poivre et sel, treillis impeccable, regard dur mais juste |
| `ines.png` | Inès, 20 ans — queue de cheval brune, treillis, air incertain qui cache de la compétence |
| `dimitri.png` | Dimitri, 23 ans — brun, grand sourire, treillis porté avec une décontraction limite réglementaire |
| `moreau.png` | Capitaine Moreau, 41 ans — uniforme parfait, expression calme et précise, regard qui évalue |
| `thomas.png` | Thomas, 19 ans — châtain, frêle, treillis un peu trop grand, air anxieux, taches de rousseur |
| `kevin.png` | Kevin, 22 ans — musclé, cheveux ras, t-shirt de sport militaire, sourire confiant |
| `lea.png` | Léa, 21 ans — carré noir, regard observateur, carnet de croquis sous le bras, treillis |
| `momo.png` | Momo, 47 ans — cuisinier, tablier blanc, moustache, sourire de celui qui sait |
| `claire.png` | Claire, 35 ans — assistante sociale, civil (gilet), lunettes rondes, chaleureuse |
| `enzo.png` | Enzo, 22 ans — undercut, sourire en coin, piercing sourcil, treillis négligé, cigarette sur l'oreille |

## Prompt type pour Gemini

> Pixel art 16-bit character sprite, full body, front facing, [description ci-dessus],
> plain solid background, no text, video game NPC portrait style SNES.
