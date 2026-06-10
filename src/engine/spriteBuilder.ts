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

export const OUTFITS: Record<OutfitKey, { label: string; main: string; shadow: string; accent: string }> = {
  civil: { label: 'Civil', main: '#3D5A80', shadow: '#2A3F5C', accent: '#506080' },
  treillis: { label: 'Treillis F3', main: '#4A5D3A', shadow: '#36452A', accent: '#5D7548' },
  sport: { label: 'Survêtement SMV', main: '#2D6A2F', shadow: '#1E4A20', accent: '#F2EDD7' },
  terrain: { label: 'Treillis + gilet', main: '#4A5D3A', shadow: '#36452A', accent: '#2A2F28' },
  ceremonie: { label: 'Tenue de cérémonie', main: '#3A4A30', shadow: '#28341F', accent: '#F0C040' },
  stage: { label: 'Tenue de travail', main: '#506080', shadow: '#3A4660', accent: '#C4A35A' }
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

// ── Rendu Canvas pixel-perfect 96×128 (logique 24×32, scale ×4) ──
// Couches : corps → peau → yeux → tenue → cheveux → détails → expression
const P = 4; // taille d'un "pixel" logique dans le canvas 96×128

function px(ctx: CanvasRenderingContext2D, x: number, y: number, w = 1, h = 1) {
  ctx.fillRect(x * P, y * P, w * P, h * P);
}

interface Body {
  shoulderW: number;
  torsoW: number;
  hipW: number;
  armW: number;
}

const BODIES: Record<Morphology, Body> = {
  slim: { shoulderW: 8, torsoW: 7, hipW: 6, armW: 1 },
  average: { shoulderW: 10, torsoW: 9, hipW: 8, armW: 2 },
  athletic: { shoulderW: 12, torsoW: 10, hipW: 8, armW: 2 },
  stocky: { shoulderW: 12, torsoW: 12, hipW: 11, armW: 2 }
};

export function drawSprite(ctx: CanvasRenderingContext2D, cfg: SpriteConfig) {
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, 96, 128);

  const skin = SKIN_TONES[cfg.skinTone] ?? SKIN_TONES.rosee;
  const hair = HAIR_COLORS[cfg.hairColor] ?? HAIR_COLORS.chatain;
  const eye = EYE_COLORS[cfg.eyeColor] ?? EYE_COLORS.marron_fonce;
  const outfit = OUTFITS[cfg.outfit] ?? OUTFITS.civil;
  const body = BODIES[cfg.morphology] ?? BODIES.average;
  const cx = 12; // centre horizontal (en pixels logiques sur 24)

  // ── Jambes / pantalon ──
  ctx.fillStyle = outfit.shadow;
  px(ctx, cx - body.hipW / 2, 22, body.hipW, 6);
  px(ctx, cx - body.hipW / 2, 28, Math.floor(body.hipW / 2) - 1, 3);
  px(ctx, cx + 1, 28, Math.floor(body.hipW / 2) - 1, 3);
  // Rangers
  ctx.fillStyle = '#0A0F1E';
  px(ctx, cx - body.hipW / 2 - 0.5, 31, Math.floor(body.hipW / 2), 1);
  px(ctx, cx + 0.5, 31, Math.floor(body.hipW / 2), 1);

  // ── Torse / tenue ──
  ctx.fillStyle = outfit.main;
  px(ctx, cx - body.shoulderW / 2, 13, body.shoulderW, 3);
  px(ctx, cx - body.torsoW / 2, 16, body.torsoW, 6);
  // Bras
  px(ctx, cx - body.shoulderW / 2 - body.armW, 14, body.armW, 7);
  px(ctx, cx + body.shoulderW / 2, 14, body.armW, 7);
  // Mains (peau)
  ctx.fillStyle = skin.hex;
  px(ctx, cx - body.shoulderW / 2 - body.armW, 21, body.armW, 2);
  px(ctx, cx + body.shoulderW / 2, 21, body.armW, 2);
  // Détail tenue
  ctx.fillStyle = outfit.accent;
  if (cfg.outfit === 'treillis' || cfg.outfit === 'terrain' || cfg.outfit === 'ceremonie') {
    px(ctx, cx - body.torsoW / 2 + 1, 17, 2, 1); // poche
    px(ctx, cx + body.torsoW / 2 - 3, 17, 2, 1);
  } else {
    px(ctx, cx - 1, 16, 2, 5); // zip / bande centrale
  }
  if (cfg.outfit === 'terrain') {
    ctx.fillStyle = '#2A2F28'; // gilet tactique
    px(ctx, cx - body.torsoW / 2 + 1, 15, body.torsoW - 2, 5);
  }
  if (cfg.outfit === 'ceremonie') {
    ctx.fillStyle = '#F0C040';
    px(ctx, cx - body.shoulderW / 2, 13, 1, 2); // épaulettes
    px(ctx, cx + body.shoulderW / 2 - 1, 13, 1, 2);
  }
  // Tatouage avant-bras (visible en sport uniquement)
  if (cfg.details.includes('tatouage_bras') && cfg.outfit === 'sport') {
    ctx.fillStyle = '#1A2540';
    px(ctx, cx + body.shoulderW / 2, 17, body.armW, 2);
  }

  // ── Cou + tête ──
  ctx.fillStyle = skin.hex;
  px(ctx, cx - 1.5, 11, 3, 2); // cou
  px(ctx, cx - 4, 3, 8, 8); // visage
  ctx.fillStyle = skin.shadow;
  px(ctx, cx - 4, 9, 8, 2); // ombre menton
  ctx.fillStyle = skin.hex;
  px(ctx, cx - 4, 9, 7, 1);
  if (cfg.details.includes('tatouage_cou')) {
    ctx.fillStyle = '#1A2540';
    px(ctx, cx + 0.5, 11, 1.5, 1.5);
  }

  // ── Yeux (2×2 logique → ici 1.5) ──
  const eyeY = 6;
  ctx.fillStyle = '#FFFFFF';
  px(ctx, cx - 3, eyeY, 2, 1.5);
  px(ctx, cx + 1, eyeY, 2, 1.5);
  ctx.fillStyle = eye.hex;
  px(ctx, cx - 2.5, eyeY, 1, 1.5);
  ctx.fillStyle = cfg.eyeColor === 'heterochromie' ? eye.light : eye.hex;
  px(ctx, cx + 1.5, eyeY, 1, 1.5);

  // ── Expression (bouche / sourcils) ──
  ctx.fillStyle = skin.shadow;
  switch (cfg.expression) {
    case 'happy':
      px(ctx, cx - 1.5, 8.5, 3, 0.5);
      px(ctx, cx - 2, 8, 0.5, 0.5);
      px(ctx, cx + 1.5, 8, 0.5, 0.5);
      break;
    case 'sad':
      px(ctx, cx - 1, 9, 2, 0.5);
      px(ctx, cx - 3.5, 5, 2, 0.5);
      px(ctx, cx + 1.5, 5, 2, 0.5);
      break;
    case 'angry':
      px(ctx, cx - 1.5, 9, 3, 0.5);
      ctx.fillStyle = '#0A0F1E';
      px(ctx, cx - 3.5, 4.5, 2.5, 0.7);
      px(ctx, cx + 1, 4.5, 2.5, 0.7);
      break;
    case 'surprised':
      px(ctx, cx - 0.75, 8.5, 1.5, 1);
      break;
    case 'thoughtful':
      px(ctx, cx - 2, 8.7, 2, 0.5);
      break;
    default:
      px(ctx, cx - 1.5, 8.7, 3, 0.5);
  }

  // ── Cheveux ──
  drawHair(ctx, cfg.hairStyle, hair.hex, hair.shadow, cx);

  // ── Détails du visage ──
  for (const d of cfg.details) drawDetail(ctx, d, cx, skin);
}

function drawHair(ctx: CanvasRenderingContext2D, style: string, hex: string, shadow: string, cx: number) {
  ctx.fillStyle = hex;
  switch (style) {
    case 'crane_rase':
      break;
    case 'rase_court':
      px(ctx, cx - 4, 2.5, 8, 1);
      break;
    case 'degrade_court':
      px(ctx, cx - 4, 2, 8, 1.5);
      px(ctx, cx - 4.5, 3, 1, 2);
      px(ctx, cx + 3.5, 3, 1, 2);
      break;
    case 'courts_ondules':
      px(ctx, cx - 4.5, 1.5, 9, 2);
      px(ctx, cx - 3.5, 1, 2, 1);
      px(ctx, cx + 1, 1, 2, 1);
      break;
    case 'carre':
      px(ctx, cx - 4.5, 1.5, 9, 2);
      px(ctx, cx - 5, 3, 1.5, 6);
      px(ctx, cx + 3.5, 3, 1.5, 6);
      break;
    case 'mi_longs_raides':
      px(ctx, cx - 4.5, 1.5, 9, 2);
      px(ctx, cx - 5.5, 3, 1.5, 10);
      px(ctx, cx + 4, 3, 1.5, 10);
      break;
    case 'mi_longs_ondules':
      px(ctx, cx - 4.5, 1.5, 9, 2);
      px(ctx, cx - 5.5, 3, 1.5, 9);
      px(ctx, cx + 4, 3, 1.5, 9);
      ctx.fillStyle = shadow;
      px(ctx, cx - 5.5, 6, 1.5, 1);
      px(ctx, cx + 4, 8, 1.5, 1);
      break;
    case 'frises_courts':
      px(ctx, cx - 4.5, 1, 9, 2.5);
      px(ctx, cx - 5, 2, 1, 2);
      px(ctx, cx + 4, 2, 1, 2);
      break;
    case 'frises_longs':
      px(ctx, cx - 5, 0.5, 10, 3);
      px(ctx, cx - 5.5, 2.5, 1.5, 8);
      px(ctx, cx + 4, 2.5, 1.5, 8);
      break;
    case 'afro':
      px(ctx, cx - 5.5, 0, 11, 4);
      px(ctx, cx - 6, 1, 12, 2.5);
      break;
    case 'tresses_attachees':
      px(ctx, cx - 4.5, 1.5, 9, 2);
      ctx.fillStyle = shadow;
      px(ctx, cx - 3, 1, 1, 1.5);
      px(ctx, cx - 0.5, 1, 1, 1.5);
      px(ctx, cx + 2, 1, 1, 1.5);
      break;
    case 'tresses_tombantes':
      px(ctx, cx - 4.5, 1.5, 9, 2);
      px(ctx, cx - 5.5, 3, 1, 11);
      px(ctx, cx + 4.5, 3, 1, 11);
      ctx.fillStyle = shadow;
      px(ctx, cx - 5.5, 5, 1, 1);
      px(ctx, cx + 4.5, 7, 1, 1);
      break;
    case 'queue_cheval':
      px(ctx, cx - 4.5, 1.5, 9, 2);
      px(ctx, cx + 3, 3, 2, 8);
      break;
    case 'chignon_haut':
      px(ctx, cx - 4, 2, 8, 1.5);
      px(ctx, cx - 1.5, 0, 3, 2);
      break;
    case 'chignon_bas':
      px(ctx, cx - 4, 2, 8, 1.5);
      px(ctx, cx + 3.5, 8, 2, 2.5);
      break;
    case 'mohawk':
      px(ctx, cx - 1, 0, 2, 3.5);
      break;
    case 'undercut':
      px(ctx, cx - 4, 1.5, 8, 2);
      ctx.fillStyle = shadow;
      px(ctx, cx - 4.5, 3, 1, 1.5);
      px(ctx, cx + 3.5, 3, 1, 1.5);
      break;
    default:
      px(ctx, cx - 4, 2, 8, 1.5);
  }
}

function drawDetail(ctx: CanvasRenderingContext2D, d: string, cx: number, skin: ColorTriple) {
  switch (d) {
    case 'lunettes_rect':
      ctx.fillStyle = '#0A0F1E';
      ctx.strokeStyle = '#0A0F1E';
      ctx.lineWidth = 2;
      ctx.strokeRect((cx - 3.2) * P, 5.8 * P, 2.4 * P, 1.9 * P);
      ctx.strokeRect((cx + 0.8) * P, 5.8 * P, 2.4 * P, 1.9 * P);
      px(ctx, cx - 0.8, 6.4, 1.6, 0.4);
      break;
    case 'lunettes_rondes': {
      ctx.strokeStyle = '#0A0F1E';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc((cx - 2) * P, 6.8 * P, 1.3 * P, 0, Math.PI * 2);
      ctx.arc((cx + 2) * P, 6.8 * P, 1.3 * P, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
    case 'cicatrice_joue':
      ctx.fillStyle = skin.light;
      px(ctx, cx + 2.5, 7.5, 0.5, 1.5);
      break;
    case 'cicatrice_front':
      ctx.fillStyle = skin.light;
      px(ctx, cx - 2.5, 4, 1.5, 0.5);
      break;
    case 'taches_rousseur':
      ctx.fillStyle = skin.shadow;
      px(ctx, cx - 3, 7.8, 0.4, 0.4);
      px(ctx, cx - 2.2, 8.1, 0.4, 0.4);
      px(ctx, cx + 2, 7.8, 0.4, 0.4);
      px(ctx, cx + 2.7, 8.1, 0.4, 0.4);
      break;
    case 'grain_beaute':
      ctx.fillStyle = '#3A2010';
      px(ctx, cx + 2.2, 8.2, 0.5, 0.5);
      break;
    case 'barbe_courte':
      ctx.fillStyle = skin.shadow;
      px(ctx, cx - 3.5, 9.2, 7, 1.3);
      break;
    case 'barbe_longue':
      ctx.fillStyle = '#3A2010';
      px(ctx, cx - 3.5, 9, 7, 2.5);
      break;
    case 'moustache':
      ctx.fillStyle = '#3A2010';
      px(ctx, cx - 1.8, 8.2, 3.6, 0.6);
      break;
    case 'piercing_nez':
      ctx.fillStyle = '#F0C040';
      px(ctx, cx + 0.8, 7.8, 0.4, 0.4);
      break;
    case 'piercing_sourcil':
      ctx.fillStyle = '#F0C040';
      px(ctx, cx + 2.8, 5.2, 0.4, 0.4);
      break;
    case 'piercing_levre':
      ctx.fillStyle = '#F0C040';
      px(ctx, cx + 1, 9, 0.4, 0.4);
      break;
    case 'boucles_oreilles':
      ctx.fillStyle = '#F0C040';
      px(ctx, cx - 4.3, 7.5, 0.5, 0.7);
      px(ctx, cx + 3.8, 7.5, 0.5, 0.7);
      break;
    case 'bandana':
      ctx.fillStyle = '#C0392B';
      px(ctx, cx - 4.2, 2.8, 8.4, 1.2);
      break;
  }
}
