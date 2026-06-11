import { useEffect, useRef, useState } from 'react';
import type { ExpressionKey, NpcKey, SpriteConfig } from '../../engine/types';
import { drawSprite } from '../../engine/spriteBuilder';

// Sprites PNJ : mêmes couches Canvas que le joueur, configs fixes.
const NPC_SPRITES: Record<NpcKey, SpriteConfig> = {
  ferreira: { morphology: 'athletic', skinTone: 'rosee', hairColor: 'gris_sel', hairStyle: 'rase_court', eyeColor: 'gris', details: [], outfit: 'treillis', expression: 'neutral' },
  ines: { morphology: 'slim', skinTone: 'beige_dore', hairColor: 'brun_noisette', hairStyle: 'queue_cheval', eyeColor: 'marron_clair', details: [], outfit: 'treillis', expression: 'neutral' },
  dimitri: { morphology: 'average', skinTone: 'rosee', hairColor: 'brun_fonce', hairStyle: 'degrade_court', eyeColor: 'marron_fonce', details: [], outfit: 'treillis', expression: 'happy' },
  moreau: { morphology: 'average', skinTone: 'porcelaine', hairColor: 'chatain', hairStyle: 'rase_court', eyeColor: 'bleu_gris', details: [], outfit: 'ceremonie', expression: 'neutral' },
  thomas: { morphology: 'slim', skinTone: 'porcelaine', hairColor: 'chatain', hairStyle: 'degrade_court', eyeColor: 'bleu_clair', details: ['taches_rousseur'], outfit: 'treillis', expression: 'sad' },
  kevin: { morphology: 'athletic', skinTone: 'miel', hairColor: 'noir_corbeau', hairStyle: 'rase_court', eyeColor: 'marron_fonce', details: [], outfit: 'sport', expression: 'happy' },
  lea: { morphology: 'slim', skinTone: 'rosee', hairColor: 'noir_corbeau', hairStyle: 'carre', eyeColor: 'noir', details: ['grain_beaute'], outfit: 'treillis', expression: 'thoughtful' },
  momo: { morphology: 'stocky', skinTone: 'miel', hairColor: 'gris_sel', hairStyle: 'rase_court', eyeColor: 'marron_fonce', details: ['moustache'], outfit: 'stage', expression: 'happy' },
  claire: { morphology: 'average', skinTone: 'rosee', hairColor: 'auburn', hairStyle: 'chignon_bas', eyeColor: 'vert_clair', details: ['lunettes_rondes'], outfit: 'civil', expression: 'happy' },
  enzo: { morphology: 'average', skinTone: 'beige_dore', hairColor: 'noir_corbeau', hairStyle: 'undercut', eyeColor: 'marron_fonce', details: ['piercing_sourcil'], outfit: 'treillis', expression: 'happy' },
  famille: { morphology: 'average', skinTone: 'rosee', hairColor: 'chatain', hairStyle: 'chignon_bas', eyeColor: 'marron_fonce', details: [], outfit: 'civil', expression: 'happy' }
};

interface Props {
  config?: SpriteConfig;
  npc?: NpcKey;
  expression?: ExpressionKey;
  scale?: number;
  className?: string;
}

// Sprites PNJ fournis par l'utilisateur (public/images/sprites/).
// Priorité : <pnj>_<expression>.png > <pnj>.png > sprite Canvas intégré.
const spriteProbeCache = new Map<string, Promise<string | null>>();

function probeImage(url: string): Promise<string | null> {
  let p = spriteProbeCache.get(url);
  if (!p) {
    p = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(null);
      img.src = url;
    });
    spriteProbeCache.set(url, p);
  }
  return p;
}

async function probeNpcSprite(npc: NpcKey, expression: ExpressionKey): Promise<string | null> {
  return (
    (await probeImage(`/images/sprites/${npc}_${expression}.png`)) ??
    (await probeImage(`/images/sprites/${npc}.png`))
  );
}

export function CharacterSprite({ config, npc, expression, scale = 2, className = '' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [localUrl, setLocalUrl] = useState<string | null>(null);

  const spriteConfig: SpriteConfig | null = config ?? (npc ? { ...NPC_SPRITES[npc], expression: expression ?? NPC_SPRITES[npc].expression } : null);

  useEffect(() => {
    setLocalUrl(null);
    if (!npc || config) return; // le sprite joueur reste dessiné en Canvas (dynamique)
    let alive = true;
    void probeNpcSprite(npc, expression ?? NPC_SPRITES[npc].expression).then((url) => {
      if (alive && url) setLocalUrl(url);
    });
    return () => {
      alive = false;
    };
  }, [npc, expression, config]);

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    if (!ctx || !spriteConfig || localUrl) return;
    drawSprite(ctx, spriteConfig);
  }, [JSON.stringify(spriteConfig), localUrl]);

  if (!spriteConfig) return null;
  if (localUrl) {
    return (
      <img
        src={localUrl}
        alt=""
        className={className}
        style={{ width: 96 * scale, height: 128 * scale, imageRendering: 'pixelated', objectFit: 'contain' }}
      />
    );
  }
  return (
    <canvas
      ref={ref}
      width={96}
      height={128}
      className={className}
      style={{ width: 96 * scale, height: 128 * scale, imageRendering: 'pixelated' }}
    />
  );
}
