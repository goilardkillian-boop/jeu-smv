import Dexie, { type Table } from 'dexie';
import type { SaveData } from './types';

// Persistance IndexedDB via Dexie : sauvegardes + cache d'assets IA.
class SmvDatabase extends Dexie {
  saves!: Table<SaveData, number>;
  assets!: Table<{ key: string; blob: Blob; createdAt: number }, string>;

  constructor() {
    super('smv-une-vie-a-construire');
    this.version(1).stores({
      saves: '++id, slot, timestamp',
      assets: 'key, createdAt'
    });
  }
}

export const db = new SmvDatabase();

export async function saveGame(data: Omit<SaveData, 'id'>): Promise<void> {
  const existing = await db.saves.where('slot').equals(data.slot).first();
  if (existing?.id !== undefined) {
    await db.saves.update(existing.id, { ...data });
  } else {
    await db.saves.add(data as SaveData);
  }
}

export async function loadGame(slot: number): Promise<SaveData | undefined> {
  return db.saves.where('slot').equals(slot).first();
}

export async function listSaves(): Promise<SaveData[]> {
  return db.saves.orderBy('timestamp').reverse().toArray();
}

export async function deleteSave(slot: number): Promise<void> {
  await db.saves.where('slot').equals(slot).delete();
}

// Métadonnées hors-partie (fins vues, NG+) — localStorage suffit.
const META_KEY = 'smv_meta';

export interface MetaData {
  endingsSeen: string[];
  achievementsAllTime: string[];
  completedOnce: boolean;
  abandonedOnce: boolean;
}

export function loadMeta(): MetaData {
  try {
    const raw = localStorage.getItem(META_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* données corrompues → valeurs par défaut */
  }
  return { endingsSeen: [], achievementsAllTime: [], completedOnce: false, abandonedOnce: false };
}

export function saveMeta(meta: MetaData): void {
  localStorage.setItem(META_KEY, JSON.stringify(meta));
}
