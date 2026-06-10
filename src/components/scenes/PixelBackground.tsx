import { useEffect, useRef, useState } from 'react';
import { generateBackground, aiEnabled } from '../../ai/imageGenerator';

// Décors procéduraux pixel art (fallback sans token Hugging Face).
// Chaque scène est dessinée en 160×90 puis upscalée en CSS (pixelated).

interface SceneDef {
  sky: [string, string]; // dégradé haut/bas (2 bandes pixel)
  ground: string;
  draw?: (ctx: CanvasRenderingContext2D) => void;
}

const px = (ctx: CanvasRenderingContext2D, color: string, x: number, y: number, w: number, h: number) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

function building(ctx: CanvasRenderingContext2D, x: number, w: number, h: number, color: string, windowColor = '#F0C040') {
  px(ctx, color, x, 62 - h, w, h);
  for (let wy = 66 - h; wy < 58; wy += 7) {
    for (let wx = x + 3; wx < x + w - 4; wx += 8) {
      if (Math.sin(wx * wy) > 0.2) px(ctx, windowColor, wx, wy, 3, 3);
    }
  }
}

function tent(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, color: string, dark: string) {
  for (let i = 0; i < w / 2; i++) px(ctx, color, x + i, y + w / 2 - i, w - i * 2, 1);
  px(ctx, dark, x + w / 2 - 1, y + 2, 2, w / 2 - 2);
}

function tree(ctx: CanvasRenderingContext2D, x: number, y: number, h: number, leaf: string, trunk = '#3A2010') {
  px(ctx, trunk, x + 2, y + h - 4, 2, 4);
  for (let i = 0; i < h - 4; i++) {
    const w = Math.max(1, Math.round(((h - 4 - i) / (h - 4)) * 7));
    px(ctx, leaf, x + 3 - Math.floor(w / 2), y + i, w, 1);
  }
}

function flag(ctx: CanvasRenderingContext2D, x: number, y: number) {
  px(ctx, '#C8D0D8', x, y, 1, 22);
  px(ctx, '#2040A0', x + 1, y, 3, 5);
  px(ctx, '#F2EDD7', x + 4, y, 3, 5);
  px(ctx, '#C0392B', x + 7, y, 3, 5);
}

function beds(ctx: CanvasRenderingContext2D, dark: boolean) {
  const blanket = dark ? '#22302A' : '#3A4A30';
  const sheet = dark ? '#5A6470' : '#C8C0A0';
  for (let i = 0; i < 4; i++) {
    const x = 12 + i * 38;
    px(ctx, '#283048', x, 60, 30, 14);
    px(ctx, blanket, x + 1, 58, 28, 8);
    px(ctx, sheet, x + 1, 56, 28, 3);
    px(ctx, dark ? '#10141E' : '#1A2540', x + 2, 50, 8, 5); // oreiller
  }
}

function desk(ctx: CanvasRenderingContext2D, x: number, w: number, color = '#5A3820') {
  px(ctx, color, x, 58, w, 4);
  px(ctx, '#3A2010', x + 2, 62, 3, 14);
  px(ctx, '#3A2010', x + w - 5, 62, 3, 14);
}

const SCENES: Record<string, SceneDef> = {
  chambre_avant: {
    sky: ['#1A2030', '#222A40'], ground: '#2A2435',
    draw: (c) => { px(c, '#101828', 110, 8, 36, 30); px(c, '#304060', 112, 10, 32, 26); px(c, '#283048', 14, 56, 50, 18); px(c, '#3A4258', 15, 52, 48, 6); px(c, '#C0392B', 70, 70, 12, 4); px(c, '#3D5A80', 88, 72, 10, 3); }
  },
  phone_screen: {
    sky: ['#05070E', '#0A0F1E'], ground: '#05070E',
    draw: (c) => { px(c, '#181C28', 55, 12, 50, 70); px(c, '#2A3A58', 58, 16, 44, 56); px(c, '#4A9E4D', 62, 24, 36, 12); px(c, '#C8D0D8', 62, 42, 36, 2); px(c, '#C8D0D8', 62, 48, 28, 2); px(c, '#C8D0D8', 62, 54, 32, 2); c.strokeStyle = '#8898B0'; c.lineWidth = 1; c.beginPath(); c.moveTo(60, 14); c.lineTo(80, 40); c.lineTo(72, 60); c.stroke(); }
  },
  mission_locale: {
    sky: ['#C8C0A0', '#B0A888'], ground: '#8A8068',
    draw: (c) => { desk(c, 50, 60); px(c, '#283048', 60, 44, 16, 14); px(c, '#4A9E4D', 12, 20, 22, 30); px(c, '#F2EDD7', 14, 22, 18, 8); px(c, '#3D5A80', 120, 18, 26, 34); }
  },
  arret_bus: {
    sky: ['#3A4258', '#56607A'], ground: '#2E3340',
    draw: (c) => { px(c, '#1A2030', 50, 30, 60, 4); px(c, '#1A2030', 52, 34, 3, 28); px(c, '#1A2030', 104, 34, 3, 28); px(c, '#28304A', 58, 38, 44, 18); px(c, '#F0C040', 130, 12, 2, 50); px(c, '#F0E0A0', 126, 8, 10, 6); }
  },
  caserne_exterior_rain: {
    sky: ['#10182E', '#1E2B4A'], ground: '#181E30',
    draw: (c) => { building(c, 10, 40, 28, '#222C44', '#C8B060'); building(c, 110, 42, 32, '#1E2840', '#C8B060'); px(c, '#0A0F1E', 56, 36, 48, 26); px(c, '#3D5A80', 58, 38, 44, 22); for (let i = 0; i < 11; i++) px(c, '#0A0F1E', 58 + i * 4, 38, 2, 22); px(c, '#4A9E4D', 62, 28, 36, 7); flag(c, 80, 4); }
  },
  caserne_exterior_jour: {
    sky: ['#7A98C0', '#C8C8A8'], ground: '#6A7058',
    draw: (c) => { building(c, 10, 40, 28, '#3A4866', '#F2EDD7'); building(c, 110, 42, 32, '#36425C', '#F2EDD7'); px(c, '#283048', 56, 36, 48, 26); px(c, '#C4A35A', 58, 38, 44, 22); px(c, '#4A9E4D', 62, 28, 36, 7); flag(c, 80, 4); }
  },
  cour_caserne: {
    sky: ['#6A7890', '#9AA4B0'], ground: '#56607A',
    draw: (c) => { building(c, 0, 56, 24, '#2E3A56', '#C8B060'); building(c, 104, 56, 24, '#2E3A56', '#C8B060'); flag(c, 79, 14); px(c, '#F2EDD7', 20, 70, 120, 1); px(c, '#F2EDD7', 20, 78, 120, 1); }
  },
  cour_ceremonie: {
    sky: ['#C09850', '#E8C888'], ground: '#7A6A48',
    draw: (c) => { building(c, 0, 50, 22, '#3A3450'); building(c, 110, 50, 22, '#3A3450'); flag(c, 60, 10); flag(c, 96, 10); px(c, '#8B3A2A', 56, 60, 48, 6); px(c, '#C4A35A', 58, 58, 44, 2); for (let i = 0; i < 12; i++) px(c, i % 2 ? '#283048' : '#56445A', 8 + i * 4, 64, 3, 8); }
  },
  magasin_habillement: {
    sky: ['#3A4048', '#4A5058'], ground: '#32363E',
    draw: (c) => { for (let s = 0; s < 3; s++) { px(c, '#28303E', 12 + s * 50, 14, 40, 44); for (let r = 0; r < 4; r++) { px(c, '#4A5D3A', 15 + s * 50, 18 + r * 10, 34, 6); px(c, '#36452A', 15 + s * 50, 22 + r * 10, 34, 2); } } }
  },
  chambree: { sky: ['#8A94A8', '#A8B0BE'], ground: '#6A7080', draw: (c) => { px(c, '#C8D0E0', 116, 10, 30, 26); px(c, '#7A98C0', 118, 12, 26, 22); beds(c, false); for (let i = 0; i < 3; i++) px(c, '#3A4258', 10 + i * 20, 8, 14, 30); } },
  chambree_nuit: { sky: ['#0A0F1E', '#141C30'], ground: '#10141E', draw: (c) => { px(c, '#283858', 116, 10, 30, 26); px(c, '#506890', 118, 12, 26, 22); px(c, '#E8EEF0', 132, 16, 6, 6); beds(c, true); } },
  refectoire: {
    sky: ['#6A5840', '#8A7858'], ground: '#54462E',
    draw: (c) => { px(c, '#C4A35A', 8, 50, 60, 4); px(c, '#8B6A3A', 10, 54, 3, 16); px(c, '#8B6A3A', 60, 54, 3, 16); px(c, '#C4A35A', 92, 50, 60, 4); px(c, '#8B6A3A', 94, 54, 3, 16); px(c, '#8B6A3A', 144, 54, 3, 16); px(c, '#3A3024', 60, 16, 40, 22); px(c, '#F0C040', 64, 20, 32, 4); }
  },
  foyer: {
    sky: ['#403448', '#564458'], ground: '#36303E',
    draw: (c) => { px(c, '#181420', 18, 22, 30, 22); px(c, '#4080C0', 20, 24, 26, 18); px(c, '#6A4A3A', 70, 52, 44, 12); px(c, '#54382A', 70, 64, 44, 4); px(c, '#C0392B', 126, 24, 20, 40); px(c, '#F0C040', 130, 28, 12, 8); }
  },
  zone_fumeur: {
    sky: ['#48506A', '#5A647A'], ground: '#3A4050',
    draw: (c) => { px(c, '#2E3A56', 0, 10, 160, 36); for (let i = 0; i < 26; i++) px(c, '#202A40', 4 + i * 6, 12, 1, 32); px(c, '#6A4A3A', 40, 58, 50, 4); px(c, '#54382A', 42, 62, 3, 10); px(c, '#54382A', 84, 62, 3, 10); px(c, '#8A8068', 120, 50, 6, 22); }
  },
  couloir: {
    sky: ['#4A5468', '#5E6878'], ground: '#3A4250',
    draw: (c) => { c.fillStyle = '#2E3848'; c.beginPath(); c.moveTo(0, 90); c.lineTo(60, 46); c.lineTo(100, 46); c.lineTo(160, 90); c.fill(); px(c, '#222C40', 60, 14, 40, 32); px(c, '#C8B060', 64, 18, 6, 24); px(c, '#C8B060', 90, 18, 6, 24); px(c, '#F0E8D0', 20, 8, 24, 4); px(c, '#F0E8D0', 116, 8, 24, 4); }
  },
  salle_formation: {
    sky: ['#8A94A0', '#9AA4AE'], ground: '#6A7480',
    draw: (c) => { px(c, '#F2EDD7', 44, 12, 72, 26); px(c, '#3D5A80', 48, 16, 30, 3); px(c, '#3D5A80', 48, 22, 44, 3); desk(c, 16, 32, '#8A7048'); desk(c, 64, 32, '#8A7048'); desk(c, 112, 32, '#8A7048'); }
  },
  bureau_ferreira: {
    sky: ['#3A4050', '#46506A'], ground: '#2E3442',
    draw: (c) => { desk(c, 50, 60, '#4A3828'); px(c, '#283048', 64, 40, 18, 16); flag(c, 18, 14); px(c, '#C4A35A', 110, 14, 36, 26); px(c, '#4A9E4D', 114, 18, 28, 18); }
  },
  bureau_moreau: {
    sky: ['#4A4438', '#5E5848'], ground: '#3A362A',
    draw: (c) => { desk(c, 46, 64, '#4A3828'); px(c, '#283048', 12, 10, 26, 48); for (let r = 0; r < 5; r++) px(c, ['#8B3A2A', '#2D6A2F', '#C4A35A', '#3D5A80'][r % 4], 14, 13 + r * 9, 22, 5); px(c, '#7A98C0', 116, 12, 30, 24); px(c, '#C8C8A8', 116, 30, 30, 6); }
  },
  bureau_commandant: {
    sky: ['#2E2A3A', '#3A3448'], ground: '#262230',
    draw: (c) => { desk(c, 40, 78, '#3A2C1C'); px(c, '#1E1828', 60, 36, 36, 20); flag(c, 14, 12); flag(c, 142, 12); px(c, '#F0C040', 70, 16, 18, 10); }
  },
  bureau_claire: {
    sky: ['#C0B090', '#CCBC9C'], ground: '#9A8A68',
    draw: (c) => { px(c, '#4A9E4D', 14, 36, 14, 26); px(c, '#2D6A2F', 16, 30, 10, 10); px(c, '#8B6A3A', 18, 62, 6, 12); px(c, '#6A4A3A', 56, 52, 24, 14); px(c, '#6A4A3A', 100, 52, 24, 14); px(c, '#F0C040', 132, 18, 12, 16); px(c, '#C8D0E0', 64, 14, 30, 20); }
  },
  terrain_boue: {
    sky: ['#56607A', '#6A7488'], ground: '#4A3A28',
    draw: (c) => { px(c, '#3A2C1C', 0, 70, 160, 20); for (let i = 0; i < 30; i++) px(c, '#2E2214', (i * 23) % 160, 72 + ((i * 7) % 14), 6, 2); px(c, '#5A4430', 30, 42, 6, 30); px(c, '#5A4430', 60, 42, 6, 30); px(c, '#4A3828', 30, 42, 36, 4); px(c, '#5A4430', 100, 50, 40, 5); px(c, '#3A2C1C', 104, 55, 4, 18); px(c, '#3A2C1C', 130, 55, 4, 18); }
  },
  camp_karola_jour: {
    sky: ['#7A98C0', '#A8C0D8'], ground: '#8A8058',
    draw: (c) => { px(c, '#3D6A8A', 0, 38, 160, 5); tree(c, 14, 26, 22, '#2D6A2F'); tree(c, 134, 24, 24, '#2D6A2F'); tent(c, 44, 50, 24, '#4A5D3A', '#36452A'); tent(c, 90, 52, 20, '#4A5D3A', '#36452A'); }
  },
  camp_karola_night: {
    sky: ['#0A0F2E', '#1A2348'], ground: '#1E2218',
    draw: (c) => { for (let i = 0; i < 24; i++) px(c, '#E8EEF0', (i * 37) % 158, (i * 13) % 34, 1, 1); px(c, '#16243A', 0, 38, 160, 5); tree(c, 14, 26, 22, '#14301A'); tree(c, 134, 24, 24, '#14301A'); tent(c, 44, 50, 24, '#2E3A28', '#202818'); tent(c, 100, 52, 20, '#2E3A28', '#202818'); px(c, '#F0C040', 78, 64, 8, 5); px(c, '#E06830', 80, 60, 4, 4); px(c, '#F0E0A0', 81, 57, 2, 3); }
  },
  route_aube: {
    sky: ['#1A2048', '#C05020'], ground: '#2A2A32',
    draw: (c) => { c.fillStyle = '#3A3A44'; c.beginPath(); c.moveTo(50, 90); c.lineTo(76, 46); c.lineTo(84, 46); c.lineTo(110, 90); c.fill(); for (let i = 0; i < 5; i++) { px(c, '#0A0F1E', 72 + i * 3, 50 + i * 7, 3, 6 + i); px(c, '#C0392B', 73 + i * 3, 49 + i * 7, 1, 1); } px(c, '#E8A0A0', 0, 40, 160, 2); }
  },
  route_jour: {
    sky: ['#7A98C0', '#B8C8D0'], ground: '#6A7058',
    draw: (c) => { c.fillStyle = '#5A5A64'; c.beginPath(); c.moveTo(50, 90); c.lineTo(76, 46); c.lineTo(84, 46); c.lineTo(110, 90); c.fill(); for (let i = 0; i < 6; i++) px(c, '#3A4430', 70 + i * 4, 48 + i * 6, 4, 7 + i); tree(c, 20, 30, 20, '#4A7048'); tree(c, 130, 32, 18, '#4A7048'); px(c, '#F2EDD7', 78, 60, 3, 6); px(c, '#F2EDD7', 79, 74, 3, 8); }
  },
  ville_larochelle: {
    sky: ['#C07840', '#E8C888'], ground: '#3D6A8A',
    draw: (c) => { px(c, '#2E5A7A', 0, 60, 160, 30); px(c, '#54442E', 16, 26, 14, 40); px(c, '#3A3024', 14, 20, 18, 8); px(c, '#54442E', 120, 24, 16, 42); px(c, '#3A3024', 118, 16, 20, 10); for (let i = 0; i < 4; i++) { px(c, '#F2EDD7', 50 + i * 16, 66 + (i % 2) * 3, 10, 3); px(c, '#8B3A2A', 52 + i * 16, 62 + (i % 2) * 3, 2, 5); } px(c, '#F0E0A0', 70, 8, 14, 14); }
  },
  stage_lieu: {
    sky: ['#5A6068', '#6E747C'], ground: '#464A50',
    draw: (c) => { for (let s = 0; s < 2; s++) { px(c, '#3A4048', 14 + s * 80, 16, 52, 44); for (let r = 0; r < 3; r++) px(c, '#C4A35A', 18 + s * 80, 22 + r * 13, 44, 8); } px(c, '#F0C040', 70, 64, 20, 12); px(c, '#0A0F1E', 72, 68, 16, 2); }
  }
};

interface Props {
  backgroundKey: string;
}

export function PixelBackground({ backgroundKey }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [aiUrl, setAiUrl] = useState<string | null>(null);

  useEffect(() => {
    setAiUrl(null);
    if (aiEnabled()) {
      let alive = true;
      void generateBackground(backgroundKey).then((url) => {
        if (alive && url) setAiUrl(url);
      });
      return () => {
        alive = false;
      };
    }
  }, [backgroundKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || aiUrl) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    const scene = SCENES[backgroundKey] ?? SCENES.cour_caserne;
    // Ciel en 2 bandes + dithering de jonction
    ctx.fillStyle = scene.sky[0];
    ctx.fillRect(0, 0, 160, 45);
    ctx.fillStyle = scene.sky[1];
    ctx.fillRect(0, 45, 160, 45);
    ctx.fillStyle = scene.sky[0];
    for (let x = 0; x < 160; x += 4) ctx.fillRect(x + ((x / 4) % 2) * 2, 45, 2, 2);
    ctx.fillStyle = scene.ground;
    ctx.fillRect(0, 64, 160, 26);
    scene.draw?.(ctx);
  }, [backgroundKey, aiUrl]);

  if (aiUrl) {
    return <img src={aiUrl} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} />;
  }
  return (
    <canvas
      ref={canvasRef}
      width={160}
      height={90}
      className="absolute inset-0 w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
