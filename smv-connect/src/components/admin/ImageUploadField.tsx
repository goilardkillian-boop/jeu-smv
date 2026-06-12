import { ImagePlus, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { uploadImage } from '../../services/storage';
import { toast } from '../../store/toastStore';
import { Loader } from '../ui/Loader';

export interface ImageUploadFieldProps {
  label: string;
  /** URL actuelle de l'image (ou chaîne vide). */
  valeur: string;
  onChange: (url: string) => void;
  /** Dossier de destination dans le bucket Supabase Storage. */
  dossier: string;
}

/** Upload d'image vers Supabase Storage avec aperçu (data-URL en mode démo). */
export function ImageUploadField({ label, valeur, onChange, dossier }: ImageUploadFieldProps) {
  const [envoi, setEnvoi] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const surFichier = async (fichier: File | undefined) => {
    if (!fichier) return;
    setEnvoi(true);
    try {
      const url = await uploadImage(fichier, dossier);
      onChange(url);
      toast.success('Image enregistrée');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Upload impossible');
    } finally {
      setEnvoi(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-smv-gray-900">{label}</p>
      {!isSupabaseConfigured ? (
        <p className="mb-2 text-xs text-amber-700">
          Mode démo : l'image est stockée localement (aperçu uniquement, non persistée).
        </p>
      ) : null}
      {valeur ? (
        <div className="relative mb-2 inline-block">
          <img src={valeur} alt="Aperçu de l'image sélectionnée" className="h-32 rounded-md border border-smv-gray-100 object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Retirer l'image"
            className="absolute -right-2 -top-2 rounded-full border border-smv-gray-100 bg-white p-1.5 text-smv-red shadow hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}
      <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border-2 border-dashed border-smv-gray-300 px-4 py-2.5 text-sm font-semibold text-smv-gray-600 hover:border-smv-navy hover:text-smv-navy">
        {envoi ? <Loader size="sm" label="Envoi de l'image" /> : <ImagePlus className="h-4 w-4" aria-hidden="true" />}
        {envoi ? 'Envoi…' : valeur ? "Remplacer l'image" : 'Choisir une image'}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={envoi}
          onChange={(e) => void surFichier(e.target.files?.[0])}
        />
      </label>
    </div>
  );
}
