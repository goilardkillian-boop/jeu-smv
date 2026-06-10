import { BACKGROUND_PROMPTS } from './promptLibrary';
import { getCachedAsset, cacheAsset } from './assetCache';

// Génération d'images via Hugging Face Inference API (optionnelle).
// Sans token : le jeu utilise les décors procéduraux de PixelBackground.

const MODEL = 'nerijs/pixel-art-xl';
const TOKEN_KEY = 'smv_hf_token';

export function getHfToken(): string | null {
  return import.meta.env.VITE_HF_TOKEN || localStorage.getItem(TOKEN_KEY) || null;
}

export function setHfToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearHfToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function generateImage(prompt: string, cacheKey: string): Promise<string | null> {
  const cached = await getCachedAsset(cacheKey);
  if (cached) return cached;

  const token = getHfToken();
  if (!token) return null;

  try {
    const res = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: prompt, options: { wait_for_model: true } })
    });
    if (!res.ok) return null;
    const blob = await res.blob();
    if (!blob.type.startsWith('image/')) return null;
    return await cacheAsset(cacheKey, blob);
  } catch {
    return null;
  }
}

export async function generateBackground(key: string): Promise<string | null> {
  const prompt = BACKGROUND_PROMPTS[key];
  if (!prompt) return null;
  return generateImage(prompt, `bg_${key}`);
}
