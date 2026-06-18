import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSquareQuote, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageUploadField } from '../../components/admin/ImageUploadField';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { CheckboxField, InputField, TextareaField } from '../../components/ui/FormField';
import { Loader } from '../../components/ui/Loader';
import { Modal } from '../../components/ui/Modal';
import { Seo } from '../../components/ui/Seo';
import { Skeleton } from '../../components/ui/Skeleton';
import { useAsyncData } from '../../hooks/useAsyncData';
import { useAuth } from '../../hooks/useAuth';
import { temoignageSchema, type TemoignageFormValues } from '../../lib/validators';
import {
  createTemoignage,
  deleteTemoignage,
  fetchTemoignagesAdmin,
  updateTemoignage,
} from '../../services/temoignages';
import { toast } from '../../store/toastStore';
import type { Temoignage } from '../../types/app.types';

function TemoignageFormModal({
  initiale,
  centreId,
  onClose,
  onSaved,
}: {
  initiale: Temoignage | null;
  centreId: string | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [photoUrl, setPhotoUrl] = useState(initiale?.photo_url ?? '');
  const [envoi, setEnvoi] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TemoignageFormValues>({
    resolver: zodResolver(temoignageSchema),
    defaultValues: {
      prenom: initiale?.prenom ?? '',
      formation: initiale?.formation ?? '',
      promotion: initiale?.promotion ?? '',
      texte: initiale?.texte ?? '',
      publie: initiale?.publie ?? false,
    } as Partial<TemoignageFormValues>,
  });

  const enregistrer = async (valeurs: TemoignageFormValues) => {
    setEnvoi(true);
    try {
      const payload = {
        centre_id: initiale ? initiale.centre_id : centreId,
        prenom: valeurs.prenom,
        formation: valeurs.formation?.trim() ? valeurs.formation.trim() : null,
        promotion: valeurs.promotion?.trim() ? valeurs.promotion.trim() : null,
        texte: valeurs.texte,
        photo_url: photoUrl || null,
        publie: valeurs.publie,
      };
      if (initiale) {
        await updateTemoignage(initiale.id, payload);
        toast.success('Témoignage mis à jour');
      } else {
        await createTemoignage(payload);
        toast.success('Témoignage créé');
      }
      onSaved();
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Enregistrement impossible');
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <Modal ouvert onClose={onClose} titre={initiale ? 'Modifier le témoignage' : 'Nouveau témoignage'} size="lg">
      <form onSubmit={handleSubmit(enregistrer)} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <InputField label="Prénom" requis error={errors.prenom?.message} {...register('prenom')} />
          <InputField label="Formation suivie" error={errors.formation?.message} {...register('formation')} />
          <InputField label="Promotion" placeholder="Ex. Promotion 2025" error={errors.promotion?.message} {...register('promotion')} />
        </div>
        <TextareaField label="Témoignage" requis rows={5} error={errors.texte?.message} {...register('texte')} />
        <ImageUploadField label="Photo (facultative)" valeur={photoUrl} onChange={setPhotoUrl} dossier="temoignages" />
        <CheckboxField label="Publier sur le site" {...register('publie')} />
        <div className="flex justify-end gap-3 border-t border-smv-gray-100 pt-4">
          <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={envoi}>
            Annuler
          </Button>
          <Button type="submit" size="sm" disabled={envoi}>
            {envoi ? <Loader size="sm" label="Enregistrement" /> : null}
            Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminTemoignages() {
  const { centreId } = useAuth();
  const { data, chargement, erreur, recharger } = useAsyncData(
    () => fetchTemoignagesAdmin(centreId),
    [centreId],
  );
  const [edition, setEdition] = useState<Temoignage | null>(null);
  const [creation, setCreation] = useState(false);

  const supprimer = async (temoignage: Temoignage) => {
    try {
      await deleteTemoignage(temoignage.id);
      toast.success('Témoignage supprimé');
      recharger();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Suppression impossible');
    }
  };

  const basculer = async (temoignage: Temoignage) => {
    try {
      await updateTemoignage(temoignage.id, { publie: !temoignage.publie });
      recharger();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Mise à jour impossible');
    }
  };

  return (
    <>
      <Seo titre="Témoignages — Admin" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy">
            Témoignages
          </h1>
          <p className="mt-1 text-sm text-smv-gray-600">
            La parole des volontaires, affichée sur l'accueil du site.
          </p>
        </div>
        <Button size="sm" onClick={() => setCreation(true)}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nouveau témoignage
        </Button>
      </div>

      <div className="mt-6">
        {chargement ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : erreur ? (
          <Alert type="error">{erreur}</Alert>
        ) : (data ?? []).length === 0 ? (
          <EmptyState
            icon={MessageSquareQuote}
            titre="Aucun témoignage"
            description="Recueille la parole de tes anciens volontaires : rien ne convainc mieux les candidats."
            action={
              <Button size="sm" onClick={() => setCreation(true)}>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Nouveau témoignage
              </Button>
            }
          />
        ) : (
          <ul className="space-y-3">
            {(data ?? []).map((temoignage) => (
              <li
                key={temoignage.id}
                className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-smv-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-lg font-bold uppercase text-smv-navy">
                      {temoignage.prenom}
                    </p>
                    <button
                      type="button"
                      onClick={() => void basculer(temoignage)}
                      aria-label={temoignage.publie ? 'Dépublier' : 'Publier'}
                    >
                      <Badge
                        variant={temoignage.publie ? 'green' : 'orange'}
                        label={temoignage.publie ? 'Publié' : 'Brouillon'}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-smv-gray-600">
                    {[temoignage.formation, temoignage.promotion].filter(Boolean).join(' — ')}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-smv-gray-900">« {temoignage.texte} »</p>
                </div>
                <span className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEdition(temoignage)}
                    aria-label={`Modifier le témoignage de ${temoignage.prenom}`}
                    className="rounded p-1.5 text-smv-navy hover:bg-smv-gray-100"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void supprimer(temoignage)}
                    aria-label={`Supprimer le témoignage de ${temoignage.prenom}`}
                    className="rounded p-1.5 text-smv-red hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {creation || edition ? (
        <TemoignageFormModal
          initiale={edition}
          centreId={centreId}
          onClose={() => {
            setCreation(false);
            setEdition(null);
          }}
          onSaved={recharger}
        />
      ) : null}
    </>
  );
}
