import { BACKGROUND_PROMPTS } from './promptLibrary';
import { getCachedAsset, cacheAsset } from './assetCache';

// Génération d'images pixel art — trois fournisseurs :
//   'pollinations'  : GRATUIT, SANS CLÉ (https://image.pollinations.ai) — défaut
//   'huggingface'   : token HF gratuit (nerijs/pixel-art-xl)
//   'off'           : décors procéduraux intégrés uniquement
// Dans tous les cas : cache IndexedDB (une génération par décor),
// et repli silencieux sur les décors procéduraux en cas d'échec/hors-ligne.

export type AiProvider = 'pollinations' | 'huggingface' | 'off';

const PROVIDER_KEY = 'smv_ai_provider';
const TOKEN_KEY = 'smv_hf_token';
const HF_MODEL = 'nerijs/pixel-art-xl';

export function getAiProvider(): AiProvider {
  const v = localStorage.getItem(PROVIDER_KEY);
  if (v === 'huggingface' || v === 'off') return v;
  return 'pollinations'; // gratuit et sans clé par défaut
}

export function setAiProvider(p: AiProvider) {
  localStorage.setItem(PROVIDER_KEY, p);
}

export function getHfToken(): string | null {
  return import.meta.env.VITE_HF_TOKEN || localStorage.getItem(TOKEN_KEY) || null;
}

export function setHfToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearHfToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// ── File d'attente Pollinations ──────────────────────────────
// Le palier anonyme n'accepte qu'une requête à la fois par IP :
// on sérialise les générations et on espace les appels.
let queue: Promise<void> = Promise.resolve();
const SPACING_MS = 6000;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function enqueue<T>(job: () => Promise<T>): Promise<T> {
  const run = queue.then(job);
  queue = run.then(
    () => wait(SPACING_MS),
    () => wait(SPACING_MS)
  ).then(() => undefined);
  return run;
}

// Seed stable par clé de décor → même image à chaque partie (cohérence + cache CDN)
function stableSeed(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return h % 100000;
}

async function fetchPollinations(prompt: string, seed: number): Promise<Blob | null> {
  const url =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}` +
    `?width=512&height=288&seed=${seed}&nologo=true&model=flux`;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const blob = await res.blob();
        if (blob.type.startsWith('image/')) return blob;
        return null;
      }
      // 402/429 = file pleine côté Pollinations → on retente une fois après pause
      if (res.status === 402 || res.status === 429) {
        await wait(8000);
        continue;
      }
      return null;
    } catch {
      return null; // hors-ligne → décor procédural
    }
  }
  return null;
}

async function fetchHuggingFace(prompt: string): Promise<Blob | null> {
  const token = getHfToken();
  if (!token) return null;
  try {
    const res = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: prompt, options: { wait_for_model: true } })
    });
    if (!res.ok) return null;
    const blob = await res.blob();
    return blob.type.startsWith('image/') ? blob : null;
  } catch {
    return null;
  }
}

const inFlight = new Map<string, Promise<string | null>>();

export async function generateImage(prompt: string, cacheKey: string): Promise<string | null> {
  const cached = await getCachedAsset(cacheKey);
  if (cached) return cached;

  const provider = getAiProvider();
  if (provider === 'off') return null;

  const existing = inFlight.get(cacheKey);
  if (existing) return existing;

  const job = enqueue(async () => {
    const again = await getCachedAsset(cacheKey);
    if (again) return again;
    const blob =
      provider === 'huggingface'
        ? await fetchHuggingFace(prompt)
        : await fetchPollinations(prompt, stableSeed(cacheKey));
    if (!blob) return null;
    return cacheAsset(cacheKey, blob);
  }).finally(() => inFlight.delete(cacheKey));

  inFlight.set(cacheKey, job);
  return job;
}

export async function generateBackground(key: string): Promise<string | null> {
  const prompt = BACKGROUND_PROMPTS[key];
  if (!prompt) return null;
  return generateImage(prompt, `bg_${key}`);
}

export const aiEnabled = () => getAiProvider() !== 'off';
