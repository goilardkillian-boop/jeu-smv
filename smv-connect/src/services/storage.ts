import { supabase } from '../lib/supabase';

const BUCKET = 'images';
const TAILLE_MAX_OCTETS = 4 * 1024 * 1024; // 4 Mo

function lireEnDataUrl(fichier: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const lecteur = new FileReader();
    lecteur.onload = () => resolve(String(lecteur.result));
    lecteur.onerror = () => reject(new Error('Lecture du fichier impossible'));
    lecteur.readAsDataURL(fichier);
  });
}

/**
 * Upload d'une image vers Supabase Storage (bucket public `images`).
 * En mode démo, l'image est encodée en data-URL (aperçu local uniquement).
 */
export async function uploadImage(fichier: File, dossier: string): Promise<string> {
  if (!fichier.type.startsWith('image/')) {
    throw new Error('Seules les images sont acceptées');
  }
  if (fichier.size > TAILLE_MAX_OCTETS) {
    throw new Error('Image trop lourde (4 Mo maximum)');
  }

  if (!supabase) {
    return lireEnDataUrl(fichier);
  }

  const extension = fichier.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const chemin = `${dossier}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from(BUCKET).upload(chemin, fichier, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw new Error(`Upload impossible : ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(chemin);
  return data.publicUrl;
}
