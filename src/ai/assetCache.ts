import { db } from '../engine/saveSystem';

// Cache des assets générés par IA (IndexedDB, table `assets`).
export async function getCachedAsset(key: string): Promise<string | null> {
  const row = await db.assets.get(key);
  return row ? URL.createObjectURL(row.blob) : null;
}

export async function cacheAsset(key: string, blob: Blob): Promise<string> {
  await db.assets.put({ key, blob, createdAt: Date.now() });
  return URL.createObjectURL(blob);
}

export async function clearAssetCache(): Promise<void> {
  await db.assets.clear();
}
