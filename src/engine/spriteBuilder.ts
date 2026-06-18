import type { SpriteConfig, Morphology, OutfitKey, ExpressionKey } from './types';

// ── Palettes (HEX précises du cahier des charges) ───────────
export interface ColorTriple {
  label: string;
  hex: string;
  shadow: string;
  light: string;
}

export const SKIN_TONES: Record<string, ColorTriple> = {
  porcelaine: { label: 'Porcelaine', hex: '#FDEBD8', shadow: '#E8C9A8', light: '#FFF5EE' },
  rosee: { label: 'Rosée', hex: '#F5CBA7', shadow: '#D4956A', light: '#FAE0C8' },
  beige_dore: { label: 'Beige doré', hex: '#E8B483', shadow: '#C4844A', light: '#F0C896' },
  miel: { label: 'Miel', hex: '#D4955A', shadow: '#B0703A', light: '#DCA870' },
  caramel: { label: 'Caramel', hex: '#C07840', shadow: '#96582A', light: '#CC8C54' },
  cannelle: { label: 'Cannelle', hex: '#A0602C', shadow: '#7A4418', light: '#B07440' },
  acajou: { label: 'Acajou', hex: '#7A4020', shadow: '#5A2C10', light: '#8C5028' },
  ebene: { label: 'Ébène', hex: '#4A2010', shadow: '#320E08', light: '#5A2C18' }
};

export const HAIR_COLORS: Record<string, ColorTriple & { fantasy?: boolean }> = {
  noir_corbeau: { label: 'Noir corbeau', hex: '#1A1008', light: '#302010', shadow: '#0A0804' },
  brun_fonce: { label: 'Brun foncé', hex: '#3A2010', light: '#5A3820', shadow: '#281408' },
  brun_noisette: { label: 'Brun noisette', hex: '#6A4020', light: '#8A5830', shadow: '#4A2C14' },
  chatain: { label: 'Châtain', hex: '#8B5E3C', light: '#A87550', shadow: '#6A4228' },
  auburn: { label: 'Auburn', hex: '#9B3A20', light: '#C0502C', shadow: '#7A2814' },
  roux: { label: 'Roux flamboyant', hex: '#C05020', light: '#E06830', shadow: '#9A3810' },
  blond_fonce: { label: 'Blond foncé', hex: '#B08840', light: '#C8A058', shadow: '#906828' },
  blond_dore: { label: 'Blond doré', hex: '#D4A830', light: '#ECC040', shadow: '#A88020' },
  blond_cendre: { label: 'Blond cendré', hex: '#C8C090', light: '#E0D8B0', shadow: '#A8A070' },
  blond_platine: { label: 'Blond platine', hex: '#E8E0C0', light: '#F8F4E0', shadow: '#C8C0A0' },
  gris_sel: { label: 'Gris sel & poivre', hex: '#888880', light: '#A0A098', shadow: '#606860' },
  gris_argente: { label: 'Gris argenté', hex: '#B0B8C0', light: '#D0D8E0', shadow: '#8090A0' },
  blanc: { label: 'Blanc', hex: '#E8EEF0', light: '#F8FEFF', shadow: '#C8D0D8' },
  bleu_nuit: { label: 'Bleu nuit ★', hex: '#1A2060', light: '#283090', shadow: '#101440', fantasy: true },
  bleu_electrique: { label: 'Bleu électrique ★', hex: '#1840C8', light: '#3060E8', shadow: '#0C2898', fantasy: true },
  violet: { label: 'Violet profond ★', hex: '#501880', light: '#7028B0', shadow: '#380C60', fantasy: true },
  rose_bonbon: { label: 'Rose bonbon ★', hex: '#E040A0', light: '#F060C0', shadow: '#C02880', fantasy: true },
  rose_pale: { label: 'Rose pâle ★', hex: '#F0A0C0', light: '#F8C0D8', shadow: '#D07090', fantasy: true },
  rouge_cerise: { label: 'Rouge cerise ★', hex: '#C01820', light: '#E02830', shadow: '#901018', fantasy: true },
  vert_foret: { label: 'Vert forêt ★', hex: '#1A5020', light: '#286830', shadow: '#0E3814', fantasy: true }
};

export const EYE_COLORS: Record<string, { label: string; hex: string; light: string }> = {
  marron_fonce: { label: 'Marron foncé', hex: '#3A1A08', light: '#5A3020' },
  marron_clair: { label: 'Marron clair', hex: '#7A4020', light: '#9A5830' },
  noisette: { label: 'Noisette', hex: '#8A6030', light: '#A88050' },
  vert_foret_y: { label: 'Vert forêt', hex: '#2A5020', light: '#407838' },
  vert_clair: { label: 'Vert clair', hex: '#508040', light: '#70A058' },
  bleu_marine: { label: 'Bleu marine', hex: '#1A3060', light: '#284890' },
  bleu_clair: { label: 'Bleu clair', hex: '#4080C0', light: '#60A0E0' },
  bleu_gris: { label: 'Bleu gris', hex: '#506080', light: '#7090A8' },
  gris: { label: 'Gris', hex: '#607878', light: '#8098A0' },
  noir: { label: 'Noir', hex: '#181010', light: '#301820' },
  ambre: { label: 'Ambre', hex: '#C07820', light: '#E09830' },
  heterochromie: { label: 'Hétérochromie', hex: '#4080C0', light: '#508040' }
};

export const HAIR_STYLES: Record<string, string> = {
  rase_court: 'Rasé court',
  degrade_court: 'Dégradé court',
  courts_ondules: 'Courts ondulés',
  carre: 'Coupe carrée',
  mi_longs_raides: 'Mi-longs raides',
  mi_longs_ondules: 'Mi-longs ondulés',
  frises_courts: 'Frisés courts',
  frises_longs: 'Frisés longs',
  afro: 'Afro',
  tresses_attachees: 'Tressés attachés',
  tresses_tombantes: 'Tressés tombants',
  queue_cheval: 'Queue de cheval',
  chignon_haut: 'Chignon haut',
  chignon_bas: 'Chignon bas',
  crane_rase: 'Crâne rasé',
  mohawk: 'Mohawk',
  undercut: 'Undercut'
};

export const DETAILS: Record<string, { label: string; masculineOnly?: boolean }> = {
  lunettes_rect: { label: 'Lunettes rectangulaires' },
  lunettes_rondes: { label: 'Lunettes rondes' },
  cicatrice_joue: { label: 'Cicatrice sur la joue' },
  cicatrice_front: { label: 'Cicatrice sur le front' },
  taches_rousseur: { label: 'Taches de rousseur' },
  grain_beaute: { label: 'Grain de beauté' },
  barbe_courte: { label: 'Barbe courte', masculineOnly: true },
  barbe_longue: { label: 'Barbe longue', masculineOnly: true },
  moustache: { label: 'Moustache' },
  piercing_nez: { label: 'Piercing nez' },
  piercing_sourcil: { label: 'Piercing sourcil' },
  piercing_levre: { label: 'Piercing lèvre' },
  tatouage_cou: { label: 'Tatouage cou' },
  tatouage_bras: { label: 'Tatouage avant-bras' },
  boucles_oreilles: { label: "Boucles d'oreilles" },
  bandana: { label: 'Bandana' }
};

export const MORPHOLOGIES: Record<Morphology, string> = {
  slim: 'Svelte',
  average: 'Moyenne',
  athletic: 'Athlétique',
  stocky: 'Enrobée'
};

export const OUTFITS: Record<OutfitKey, { label: string; main: string; shadow: string; light: string; accent: string }> = {
  civil: { label: 'Civil', main: '#3D5A80', shadow: '#2A3F5C', light: '#5878A0', accent: '#506080' },
  treillis: { label: 'Treillis F3', main: '#4A5D3A', shadow: '#36452A', light: '#5D7548', accent: '#6B5B3E' },
  sport: { label: 'Survêtement SMV', main: '#2D6A2F', shadow: '#1E4A20', light: '#3E8540', accent: '#F2EDD7' },
  terrain: { label: 'Treillis + gilet', main: '#4A5D3A', shadow: '#36452A', light: '#5D7548', accent: '#2A2F28' },
  ceremonie: { label: 'Tenue de cérémonie', main: '#3A4A30', shadow: '#28341F', light: '#4C5F40', accent: '#F0C040' },
  stage: { label: 'Tenue de travail', main: '#506080', shadow: '#3A4660', light: '#6478A0', accent: '#C4A35A' }
};

export const DEFAULT_SPRITE: SpriteConfig = {
  morphology: 'average',
  skinTone: 'rosee',
  hairColor: 'chatain',
  hairStyle: 'degrade_court',
  eyeColor: 'marron_fonce',
  details: [],
  outfit: 'civil',
  expression: 'neutral'
};

// ════════════════════════════════════════════════════════════
// Rendu Canvas pixel-perfect — grille logique 48×64, upscale ×2
// (canvas 96×128). Lumière venant du haut-gauche, contour sombre
// automatique, ombrage 3 tons par matière.
// ════════════════════════════════════════════════════════════
const P = 2; // 1 pixel logique = 2 px canvas
const W = 48;
const H = 64;
const CX = 24;
const OUTLINE = '#10141E';

function px(ctx: CanvasRenderingContext2D, x: number, y: number, w = 1, h = 1) {
  ctx.fillRect(Math.round(x * P), Math.round(y * P), Math.round(w * P), Math.round(h * P));
}

interface Body {
  shoulder: number; // demi-largeur épaules
  hip: number; // demi-largeur hanches
  arm: number; // largeur bras
}

const BODIES: Record<Morphology, Body> = {
  slim: { shoulder: 8, hip: 6, arm: 2 },
  average: { shoulder: 10, hip: 8, arm: 3 },
  athletic: { shoulder: 12, hip: 8, arm: 3 },
  stocky: { shoulder: 12, hip: 11, arm: 3 }
};

// Pseudo-aléa déterministe pour le motif camouflage
const camoHash = (x: number, y: number) => ((x * 31 + y * 17 + x * y) >>> 0) % 9;

export function drawSprite(ctx: CanvasRenderingContext2D, cfg: SpriteConfig) {
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, W * P, H * P);

  const skin = SKIN_TONES[cfg.skinTone] ?? SKIN_TONES.rosee;
  const hair = HAIR_COLORS[cfg.hairColor] ?? HAIR_COLORS.chatain;
  const eye = EYE_COLORS[cfg.eyeColor] ?? EYE_COLORS.marron_fonce;
  const outfit = OUTFITS[cfg.outfit] ?? OUTFITS.civil;
  const body = BODIES[cfg.morphology] ?? BODIES.average;
  const camo = cfg.outfit === 'treillis' || cfg.outfit === 'terrain';

  // Remplissage d'une zone de tenue avec ombrage droite + camouflage
  const cloth = (x: number, y: number, w: number, h: number, opts: { camo?: boolean; shadeRight?: boolean } = {}) => {
    ctx.fillStyle = outfit.main;
    px(ctx, x, y, w, h);
    if (opts.camo && camo) {
      for (let yy = y; yy < y + h; yy++) {
        for (let xx = x; xx < x + w; xx++) {
          const r = camoHash(xx, yy);
          if (r === 0) {
            ctx.fillStyle = outfit.shadow;
            px(ctx, xx, yy, 2, 1);
          } else if (r === 1) {
            ctx.fillStyle = outfit.accent;
            px(ctx, xx, yy, 1, 1);
          } else if (r === 2) {
            ctx.fillStyle = outfit.light;
            px(ctx, xx, yy, 1, 1);
          }
        }
      }
    }
    if (opts.shadeRight !== false) {
      ctx.fillStyle = outfit.shadow;
      px(ctx, x + w - 1, y, 1, h);
    }
  };

  // ── JAMBES (y 40 → 57) ──
  const legW = Math.max(3, body.hip - 1);
  cloth(CX - body.hip, 40, legW, 17, { camo: true });
  cloth(CX + body.hip - legW, 40, legW, 17, { camo: true });
  // pli du pantalon
  ctx.fillStyle = outfit.shadow;
  px(ctx, CX - 1, 40, 2, 16);

  // ── RANGERS (y 56 → 62) ──
  const bootColor = cfg.outfit === 'sport' ? '#F2EDD7' : '#1A2030';
  const bootShadow = cfg.outfit === 'sport' ? '#C8C0A0' : '#10141E';
  ctx.fillStyle = bootColor;
  px(ctx, CX - body.hip - 1, 56, legW + 1, 6);
  px(ctx, CX + body.hip - legW, 56, legW + 1, 6);
  ctx.fillStyle = bootShadow;
  px(ctx, CX - body.hip - 1, 61, legW + 1, 1);
  px(ctx, CX + body.hip - legW, 61, legW + 1, 1);
  // lacets
  if (cfg.outfit !== 'sport') {
    ctx.fillStyle = '#3A4258';
    px(ctx, CX - body.hip + 1, 57, 2, 1);
    px(ctx, CX + body.hip - 3, 57, 2, 1);
  }

  // ── CEINTURE (y 38-39) ──
  ctx.fillStyle = '#2A2418';
  px(ctx, CX - body.hip, 38, body.hip * 2, 2);
  ctx.fillStyle = cfg.outfit === 'ceremonie' ? '#F0C040' : '#6B5B3E';
  px(ctx, CX - 1, 38, 3, 2);

  // ── TORSE (y 22 → 38) ──
  cloth(CX - body.shoulder, 22, body.shoulder * 2, 16, { camo: true });
  // lumière haut-gauche
  ctx.fillStyle = outfit.light;
  px(ctx, CX - body.shoulder, 22, body.shoulder * 2 - 1, 1);
  px(ctx, CX - body.shoulder, 23, 1, 12);

  // ── BRAS (y 23 → 39) + MAINS ──
  cloth(CX - body.shoulder - body.arm, 23, body.arm, 16, { camo: true });
  cloth(CX + body.shoulder, 23, body.arm, 16, { camo: true });
  ctx.fillStyle = skin.hex;
  px(ctx, CX - body.shoulder - body.arm, 39, body.arm, 4);
  px(ctx, CX + body.shoulder, 39, body.arm, 4);
  ctx.fillStyle = skin.shadow;
  px(ctx, CX - body.shoulder - body.arm, 42, body.arm, 1);
  px(ctx, CX + body.shoulder, 42, body.arm, 1);
  if (cfg.details.includes('tatouage_bras') && cfg.outfit === 'sport') {
    ctx.fillStyle = '#1A2540';
    px(ctx, CX + body.shoulder, 32, body.arm, 4);
  }

  // ── Détails de tenue ──
  drawOutfitDetails(ctx, cfg, outfit, body);

  // ── COU (y 19 → 23) ──
  ctx.fillStyle = skin.hex;
  px(ctx, CX - 3, 19, 6, 4);
  ctx.fillStyle = skin.shadow;
  px(ctx, CX - 3, 19, 6, 1); // ombre du menton
  if (cfg.details.includes('tatouage_cou')) {
    ctx.fillStyle = '#1A2540';
    px(ctx, CX + 1, 20, 2, 2);
  }

  // ── TÊTE (y 4 → 19) ──
  ctx.fillStyle = skin.hex;
  px(ctx, CX - 7, 5, 14, 13); // bloc visage
  px(ctx, CX - 6, 18, 12, 1); // menton 1
  px(ctx, CX - 4, 19, 8, 1); // menton 2
  // ombrage côté droit + sous la frange
  ctx.fillStyle = skin.shadow;
  px(ctx, CX + 5, 6, 2, 12);
  px(ctx, CX + 3, 18, 3, 1);
  // lumière côté gauche
  ctx.fillStyle = skin.light;
  px(ctx, CX - 7, 6, 1, 10);
  // oreilles
  ctx.fillStyle = skin.hex;
  px(ctx, CX - 8, 10, 1, 4);
  px(ctx, CX + 7, 10, 1, 4);
  ctx.fillStyle = skin.shadow;
  px(ctx, CX - 8, 12, 1, 2);
  px(ctx, CX + 7, 12, 1, 2);

  // ── VISAGE ──
  drawFace(ctx, cfg, skin, eye);

  // ── CHEVEUX ──
  drawHair(ctx, cfg.hairStyle, hair);

  // ── DÉTAILS DISTINCTIFS ──
  for (const d of cfg.details) drawDetail(ctx, d, skin, hair);

  // ── CONTOUR AUTOMATIQUE ──
  outline(ctx);
}

function drawFace(
  ctx: CanvasRenderingContext2D,
  cfg: SpriteConfig,
  skin: ColorTriple,
  eye: { hex: string; light: string }
) {
  const e = cfg.expression;
  const browColor = '#2A1A10';

  // Sourcils (y 9-10 selon expression)
  ctx.fillStyle = browColor;
  if (e === 'angry') {
    px(ctx, CX - 5, 10, 3, 1);
    px(ctx, CX - 2, 9, 1, 1);
    px(ctx, CX + 1, 9, 1, 1);
    px(ctx, CX + 2, 10, 3, 1);
  } else if (e === 'sad') {
    px(ctx, CX - 5, 9, 1, 1);
    px(ctx, CX - 4, 10, 2, 1);
    px(ctx, CX + 2, 10, 2, 1);
    px(ctx, CX + 4, 9, 1, 1);
  } else if (e === 'surprised') {
    px(ctx, CX - 5, 8, 3, 1);
    px(ctx, CX + 2, 8, 3, 1);
  } else {
    px(ctx, CX - 5, 9, 3, 1);
    px(ctx, CX + 2, 9, 3, 1);
  }

  // Yeux (blanc 3×2, iris 2×2 + reflet)
  const eyeY = 11;
  ctx.fillStyle = '#FFFFFF';
  px(ctx, CX - 5, eyeY, 3, 2);
  px(ctx, CX + 2, eyeY, 3, 2);
  ctx.fillStyle = eye.hex;
  px(ctx, CX - 4, eyeY, 2, 2);
  ctx.fillStyle = cfg.eyeColor === 'heterochromie' ? eye.light : eye.hex;
  px(ctx, CX + 2, eyeY, 2, 2);
  ctx.fillStyle = '#FFFFFF';
  px(ctx, CX - 4, eyeY, 0.5, 0.5);
  px(ctx, CX + 2, eyeY, 0.5, 0.5);
  if (e === 'thoughtful' || e === 'sad') {
    // paupières mi-closes
    ctx.fillStyle = skin.shadow;
    px(ctx, CX - 5, eyeY, 3, 0.5);
    px(ctx, CX + 2, eyeY, 3, 0.5);
  }

  // Nez (ombre verticale légère)
  ctx.fillStyle = skin.shadow;
  px(ctx, CX, 13.5, 1, 1.5);

  // Bouche (y 16) selon expression
  const mouth = '#8A4438';
  ctx.fillStyle = mouth;
  switch (e) {
    case 'happy':
      px(ctx, CX - 2, 16, 4, 1);
      ctx.fillStyle = skin.shadow;
      px(ctx, CX - 3, 15.5, 1, 1);
      px(ctx, CX + 2, 15.5, 1, 1);
      break;
    case 'sad':
      px(ctx, CX - 1.5, 16.5, 3, 1);
      ctx.fillStyle = skin.shadow;
      px(ctx, CX - 2.5, 17, 1, 0.5);
      px(ctx, CX + 1.5, 17, 1, 0.5);
      break;
    case 'angry':
      px(ctx, CX - 2, 16.5, 4, 1);
      break;
    case 'surprised':
      px(ctx, CX - 1, 15.5, 2, 2);
      break;
    case 'thoughtful':
      px(ctx, CX - 2.5, 16, 3, 1);
      break;
    default:
      px(ctx, CX - 1.5, 16, 3, 1);
  }
}

function drawOutfitDetails(
  ctx: CanvasRenderingContext2D,
  cfg: SpriteConfig,
  outfit: (typeof OUTFITS)[OutfitKey],
  body: Body
) {
  switch (cfg.outfit) {
    case 'treillis':
    case 'terrain':
      // col en V
      ctx.fillStyle = outfit.shadow;
      px(ctx, CX - 4, 22, 8, 1);
      px(ctx, CX - 2, 23, 4, 1);
      // poches poitrine avec rabat
      ctx.fillStyle = outfit.shadow;
      px(ctx, CX - body.shoulder + 2, 27, 4, 3);
      px(ctx, CX + body.shoulder - 6, 27, 4, 3);
      ctx.fillStyle = outfit.light;
      px(ctx, CX - body.shoulder + 2, 27, 4, 1);
      px(ctx, CX + body.shoulder - 6, 27, 4, 1);
      // boutonnière centrale
      ctx.fillStyle = outfit.shadow;
      px(ctx, CX, 24, 1, 14);
      if (cfg.outfit === 'terrain') {
        // gilet tactique
        ctx.fillStyle = outfit.accent;
        px(ctx, CX - body.shoulder + 1, 24, body.shoulder * 2 - 2, 9);
        ctx.fillStyle = '#1A1F18';
        px(ctx, CX - body.shoulder + 2, 26, 3, 3);
        px(ctx, CX + body.shoulder - 5, 26, 3, 3);
        px(ctx, CX - 1.5, 27, 3, 4);
      }
      break;
    case 'ceremonie':
      // épaulettes dorées
      ctx.fillStyle = outfit.accent;
      px(ctx, CX - body.shoulder, 22, 3, 2);
      px(ctx, CX + body.shoulder - 3, 22, 3, 2);
      // boutons dorés
      px(ctx, CX, 26, 1, 1);
      px(ctx, CX, 29, 1, 1);
      px(ctx, CX, 32, 1, 1);
      px(ctx, CX, 35, 1, 1);
      // col
      ctx.fillStyle = outfit.shadow;
      px(ctx, CX - 4, 22, 8, 1);
      break;
    case 'sport':
      // bande crème sur la poitrine + manches
      ctx.fillStyle = outfit.accent;
      px(ctx, CX - body.shoulder, 27, body.shoulder * 2, 2);
      px(ctx, CX - body.shoulder - body.arm, 27, body.arm, 2);
      px(ctx, CX + body.shoulder, 27, body.arm, 2);
      // col rond
      ctx.fillStyle = outfit.shadow;
      px(ctx, CX - 3, 22, 6, 1);
      break;
    case 'civil':
      // capuche derrière le cou
      ctx.fillStyle = outfit.shadow;
      px(ctx, CX - 6, 21, 12, 2);
      // cordons
      ctx.fillStyle = '#C8D0D8';
      px(ctx, CX - 2, 24, 1, 5);
      px(ctx, CX + 1, 24, 1, 5);
      // poche kangourou
      ctx.fillStyle = outfit.shadow;
      px(ctx, CX - 5, 32, 10, 1);
      px(ctx, CX - 5, 32, 1, 5);
      px(ctx, CX + 4, 32, 1, 5);
      break;
    case 'stage':
      // bande haute visibilité
      ctx.fillStyle = outfit.accent;
      px(ctx, CX - body.shoulder, 30, body.shoulder * 2, 2);
      // badge
      ctx.fillStyle = '#F2EDD7';
      px(ctx, CX + body.shoulder - 5, 25, 3, 2);
      // fermeture
      ctx.fillStyle = outfit.shadow;
      px(ctx, CX, 23, 1, 15);
      break;
  }
}

function drawHair(ctx: CanvasRenderingContext2D, style: string, hair: ColorTriple) {
  const base = () => {
    // calotte de base recouvrant le haut du crâne (y 2 → 7)
    ctx.fillStyle = hair.hex;
    px(ctx, CX - 7, 2, 14, 4);
    px(ctx, CX - 8, 4, 16, 3);
    // mèche de lumière
    ctx.fillStyle = hair.light;
    px(ctx, CX - 5, 2, 5, 1);
  };
  ctx.fillStyle = hair.hex;
  switch (style) {
    case 'crane_rase':
      break;
    case 'rase_court':
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 7, 3, 14, 3);
      px(ctx, CX - 8, 5, 1, 4);
      px(ctx, CX + 7, 5, 1, 4);
      break;
    case 'degrade_court':
      base();
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 8, 6, 1, 4);
      px(ctx, CX + 7, 6, 1, 4);
      break;
    case 'courts_ondules':
      base();
      ctx.fillStyle = hair.hex;
      px(ctx, CX - 8, 5, 2, 4);
      px(ctx, CX + 6, 5, 2, 4);
      ctx.fillStyle = hair.light;
      px(ctx, CX - 6, 3, 2, 1);
      px(ctx, CX + 1, 2, 3, 1);
      px(ctx, CX - 2, 4, 2, 1);
      break;
    case 'carre':
      base();
      px(ctx, CX - 9, 4, 2, 12);
      px(ctx, CX + 7, 4, 2, 12);
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 9, 14, 2, 2);
      px(ctx, CX + 7, 14, 2, 2);
      break;
    case 'mi_longs_raides':
      base();
      px(ctx, CX - 10, 4, 3, 20);
      px(ctx, CX + 7, 4, 3, 20);
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 10, 18, 3, 6);
      px(ctx, CX + 7, 18, 3, 6);
      ctx.fillStyle = hair.light;
      px(ctx, CX - 9, 6, 1, 8);
      break;
    case 'mi_longs_ondules':
      base();
      px(ctx, CX - 10, 4, 3, 18);
      px(ctx, CX + 7, 4, 3, 18);
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 10, 8, 1, 2);
      px(ctx, CX + 9, 12, 1, 2);
      px(ctx, CX - 9, 16, 2, 2);
      px(ctx, CX + 7, 18, 3, 4);
      px(ctx, CX - 10, 20, 3, 2);
      ctx.fillStyle = hair.light;
      px(ctx, CX - 9, 5, 1, 6);
      break;
    case 'frises_courts':
      base();
      ctx.fillStyle = hair.hex;
      px(ctx, CX - 8, 1, 16, 3);
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 7, 1, 2, 1);
      px(ctx, CX - 2, 2, 2, 1);
      px(ctx, CX + 4, 1, 2, 1);
      ctx.fillStyle = hair.light;
      px(ctx, CX - 4, 1, 2, 1);
      px(ctx, CX + 1, 1, 2, 1);
      break;
    case 'frises_longs':
      px(ctx, CX - 9, 0, 18, 6);
      px(ctx, CX - 10, 3, 20, 6);
      px(ctx, CX - 10, 8, 3, 12);
      px(ctx, CX + 7, 8, 3, 12);
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 8, 1, 2, 1);
      px(ctx, CX + 2, 2, 2, 1);
      px(ctx, CX - 10, 12, 3, 2);
      px(ctx, CX + 7, 15, 3, 2);
      ctx.fillStyle = hair.light;
      px(ctx, CX - 3, 0, 3, 1);
      px(ctx, CX + 5, 1, 2, 1);
      break;
    case 'afro':
      px(ctx, CX - 10, 0, 20, 8);
      px(ctx, CX - 11, 2, 22, 5);
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 9, 1, 2, 1);
      px(ctx, CX + 3, 2, 2, 1);
      px(ctx, CX - 3, 5, 2, 1);
      px(ctx, CX + 8, 4, 2, 1);
      ctx.fillStyle = hair.light;
      px(ctx, CX - 4, 0, 3, 1);
      px(ctx, CX + 6, 1, 2, 1);
      break;
    case 'tresses_attachees':
      base();
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 6, 1, 1, 4);
      px(ctx, CX - 3, 1, 1, 4);
      px(ctx, CX, 1, 1, 4);
      px(ctx, CX + 3, 1, 1, 4);
      px(ctx, CX + 6, 1, 1, 4);
      break;
    case 'tresses_tombantes':
      base();
      px(ctx, CX - 10, 5, 2, 22);
      px(ctx, CX + 8, 5, 2, 22);
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 10, 8, 2, 1);
      px(ctx, CX - 10, 13, 2, 1);
      px(ctx, CX - 10, 18, 2, 1);
      px(ctx, CX + 8, 10, 2, 1);
      px(ctx, CX + 8, 15, 2, 1);
      px(ctx, CX + 8, 20, 2, 1);
      break;
    case 'queue_cheval':
      base();
      px(ctx, CX + 6, 4, 3, 4);
      px(ctx, CX + 7, 7, 3, 14);
      ctx.fillStyle = hair.shadow;
      px(ctx, CX + 8, 12, 2, 9);
      ctx.fillStyle = '#C0392B';
      px(ctx, CX + 7, 7, 3, 1);
      break;
    case 'chignon_haut':
      base();
      ctx.fillStyle = hair.hex;
      px(ctx, CX - 3, -0.5, 6, 3);
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 3, 1.5, 6, 1);
      break;
    case 'chignon_bas':
      base();
      ctx.fillStyle = hair.hex;
      px(ctx, CX + 6, 14, 4, 5);
      ctx.fillStyle = hair.shadow;
      px(ctx, CX + 7, 17, 3, 2);
      break;
    case 'mohawk':
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 7, 3, 14, 2);
      ctx.fillStyle = hair.hex;
      px(ctx, CX - 1.5, -1, 3, 6);
      ctx.fillStyle = hair.light;
      px(ctx, CX - 1.5, -1, 1, 5);
      break;
    case 'undercut':
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 8, 5, 2, 4);
      px(ctx, CX + 6, 5, 2, 4);
      ctx.fillStyle = hair.hex;
      px(ctx, CX - 7, 1.5, 14, 4);
      ctx.fillStyle = hair.light;
      px(ctx, CX - 6, 1.5, 8, 1);
      break;
    default:
      base();
  }
}

function drawDetail(ctx: CanvasRenderingContext2D, d: string, skin: ColorTriple, hair: ColorTriple) {
  switch (d) {
    case 'lunettes_rect':
      ctx.fillStyle = '#10141E';
      px(ctx, CX - 6, 10.5, 5, 0.5);
      px(ctx, CX - 6, 13, 5, 0.5);
      px(ctx, CX - 6, 10.5, 0.5, 3);
      px(ctx, CX - 1.5, 10.5, 0.5, 3);
      px(ctx, CX + 1, 10.5, 5, 0.5);
      px(ctx, CX + 1, 13, 5, 0.5);
      px(ctx, CX + 1, 10.5, 0.5, 3);
      px(ctx, CX + 5.5, 10.5, 0.5, 3);
      px(ctx, CX - 1, 11.5, 2, 0.5);
      break;
    case 'lunettes_rondes':
      ctx.fillStyle = '#10141E';
      px(ctx, CX - 5.5, 10.5, 4, 0.5);
      px(ctx, CX - 5.5, 13, 4, 0.5);
      px(ctx, CX - 6, 11, 0.5, 2);
      px(ctx, CX - 1.5, 11, 0.5, 2);
      px(ctx, CX + 1.5, 10.5, 4, 0.5);
      px(ctx, CX + 1.5, 13, 4, 0.5);
      px(ctx, CX + 1, 11, 0.5, 2);
      px(ctx, CX + 5.5, 11, 0.5, 2);
      px(ctx, CX - 1, 11.5, 2, 0.5);
      break;
    case 'cicatrice_joue':
      ctx.fillStyle = skin.light;
      px(ctx, CX + 4, 13.5, 1, 3);
      break;
    case 'cicatrice_front':
      ctx.fillStyle = skin.light;
      px(ctx, CX - 4, 7, 3, 1);
      break;
    case 'taches_rousseur':
      ctx.fillStyle = skin.shadow;
      px(ctx, CX - 5, 14, 1, 1);
      px(ctx, CX - 3.5, 14.7, 1, 1);
      px(ctx, CX + 2.7, 14, 1, 1);
      px(ctx, CX + 4.3, 14.7, 1, 1);
      break;
    case 'grain_beaute':
      ctx.fillStyle = '#3A2010';
      px(ctx, CX + 3.5, 15, 1, 1);
      break;
    case 'barbe_courte':
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 6, 15, 1, 3);
      px(ctx, CX + 5, 15, 1, 3);
      px(ctx, CX - 5, 17.5, 10, 1.5);
      px(ctx, CX - 4, 19, 8, 1);
      break;
    case 'barbe_longue':
      ctx.fillStyle = hair.hex;
      px(ctx, CX - 6, 14, 1.5, 4);
      px(ctx, CX + 4.5, 14, 1.5, 4);
      px(ctx, CX - 5, 17, 10, 4);
      px(ctx, CX - 3, 21, 6, 2);
      ctx.fillStyle = hair.shadow;
      px(ctx, CX - 3, 22, 6, 1);
      break;
    case 'moustache':
      ctx.fillStyle = hair.hex;
      px(ctx, CX - 3, 15, 6, 1);
      break;
    case 'piercing_nez':
      ctx.fillStyle = '#F0C040';
      px(ctx, CX + 1, 14.5, 0.7, 0.7);
      break;
    case 'piercing_sourcil':
      ctx.fillStyle = '#F0C040';
      px(ctx, CX + 5, 9, 0.7, 0.7);
      break;
    case 'piercing_levre':
      ctx.fillStyle = '#F0C040';
      px(ctx, CX + 1.5, 17, 0.7, 0.7);
      break;
    case 'boucles_oreilles':
      ctx.fillStyle = '#F0C040';
      px(ctx, CX - 8, 13.5, 1, 1);
      px(ctx, CX + 7, 13.5, 1, 1);
      break;
    case 'bandana':
      ctx.fillStyle = '#C0392B';
      px(ctx, CX - 8, 6, 16, 2.5);
      ctx.fillStyle = '#901018';
      px(ctx, CX - 8, 7.7, 16, 0.8);
      px(ctx, CX + 7, 8.5, 2, 3);
      break;
  }
}

// Contour : tout pixel transparent voisin d'un pixel opaque devient
// une bordure sombre — lisibilité du sprite sur n'importe quel décor.
function outline(ctx: CanvasRenderingContext2D) {
  const img = ctx.getImageData(0, 0, W * P, H * P);
  const d = img.data;
  const width = W * P;
  const height = H * P;
  const opaque = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < width && y < height && d[(y * width + x) * 4 + 3] > 60;

  const toOutline: number[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (d[idx + 3] > 60) continue;
      if (opaque(x - 1, y) || opaque(x + 1, y) || opaque(x, y - 1) || opaque(x, y + 1)) {
        toOutline.push(idx);
      }
    }
  }
  const r = parseInt(OUTLINE.slice(1, 3), 16);
  const g = parseInt(OUTLINE.slice(3, 5), 16);
  const b = parseInt(OUTLINE.slice(5, 7), 16);
  for (const idx of toOutline) {
    d[idx] = r;
    d[idx + 1] = g;
    d[idx + 2] = b;
    d[idx + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}
