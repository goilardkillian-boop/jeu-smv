import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CATEGORIES_ACTUALITE } from '../../lib/constants';
import { actualiteSchema, type ActualiteFormValues } from '../../lib/validators';
import { createActualite, updateActualite } from '../../services/actualites';
import { toast } from '../../store/toastStore';
import type { Actualite, Centre } from '../../types/app.types';
import { Alert } from '../ui/Alert';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CheckboxField, InputField, TextareaField } from '../ui/FormField';
import { Loader } from '../ui/Loader';
import { Select } from '../ui/Select';
import { SimpleMarkdown } from '../ui/SimpleMarkdown';
import { ImageUploadField } from './ImageUploadField';

export interface ActualiteFormProps {
  initiale?: Actualite;
  /** Centre imposé (admin de centre) — le super admin choisit (ou « nationale »). */
  centreIdFixe: string | null;
  centres: Centre[];
  onDone: () => void;
}

/** Formulaire de création / édition d'actualité avec aperçu en temps réel. */
export function ActualiteForm({ initiale, centreIdFixe, centres, onDone }: ActualiteFormProps) {
  const [centreId, setCentreId] = useState<string>(
    initiale ? (initiale.centre_id ?? '') : (centreIdFixe ?? ''),
  );
  const [imageUrl, setImageUrl] = useState(initiale?.image_url ?? '');
  const [envoi, setEnvoi] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ActualiteFormValues>({
    resolver: zodResolver(actualiteSchema),
    defaultValues: {
      titre: initiale?.titre ?? '',
      categorie: initiale?.categorie ?? 'Vie du centre',
      publie_le: initiale?.publie_le ?? new Date().toISOString().slice(0, 10),
      extrait: initiale?.extrait ?? '',
      contenu: initiale?.contenu ?? '',
      publie: initiale?.publie ?? false,
    } as Partial<ActualiteFormValues>,
  });

  const apercu = watch();

  const enregistrer = async (valeurs: ActualiteFormValues) => {
    setEnvoi(true);
    try {
      const payload = {
        centre_id: centreId || null,
        titre: valeurs.titre,
        categorie: valeurs.categorie,
        publie_le: valeurs.publie_le,
        extrait: valeurs.extrait?.trim() ? valeurs.extrait.trim() : null,
        contenu: valeurs.contenu,
        image_url: imageUrl || null,
        publie: valeurs.publie,
      };
      if (initiale) {
        await updateActualite(initiale.id, payload);
        toast.success('Actualité mise à jour');
      } else {
        await createActualite(payload);
        toast.success(valeurs.publie ? 'Actualité publiée' : 'Brouillon enregistré');
      }
      onDone();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Enregistrement impossible');
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <div className="grid gap-8 xl:grid-cols-2">
      <form onSubmit={handleSubmit(enregistrer)} noValidate className="space-y-5">
        {centreIdFixe === null ? (
          <Select
            label="Portée de l'actualité"
            options={[
              { value: '', label: 'Nationale (tous les centres)' },
              ...centres.map((centre) => ({ value: centre.id, label: `Centre de ${centre.nom}` })),
            ]}
            value={centreId}
            onChange={(e) => setCentreId(e.target.value)}
          />
        ) : null}

        <InputField label="Titre" requis error={errors.titre?.message} {...register('titre')} />

        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            label="Catégorie *"
            options={CATEGORIES_ACTUALITE.map((categorie) => ({ value: categorie, label: categorie }))}
            error={errors.categorie?.message}
            {...register('categorie')}
          />
          <InputField
            label="Date de publication"
            requis
            type="date"
            error={errors.publie_le?.message}
            {...register('publie_le')}
          />
        </div>

        <TextareaField
          label="Extrait"
          rows={2}
          maxLength={250}
          hint={`${apercu.extrait?.length ?? 0}/250 caractères — affiché sur les cards.`}
          error={errors.extrait?.message}
          {...register('extrait')}
        />

        <TextareaField
          label="Contenu"
          requis
          rows={12}
          hint="Markdown léger : paragraphes (ligne vide), listes « - », **gras**, sous-titres « ## »."
          error={errors.contenu?.message}
          {...register('contenu')}
        />

        <ImageUploadField
          label="Image de couverture"
          valeur={imageUrl}
          onChange={setImageUrl}
          dossier="actualites"
        />

        <CheckboxField
          label="Publier (sinon : enregistré comme brouillon)"
          {...register('publie')}
        />

        {Object.keys(errors).length > 0 ? (
          <Alert type="error">Corrige les champs en erreur avant d'enregistrer.</Alert>
        ) : null}

        <div className="flex flex-wrap justify-end gap-3 border-t border-smv-gray-100 pt-5">
          <Button type="button" variant="ghost" onClick={onDone} disabled={envoi}>
            Annuler
          </Button>
          <Button type="submit" disabled={envoi}>
            {envoi ? <Loader size="sm" label="Enregistrement" /> : null}
            {initiale ? 'Enregistrer' : "Créer l'actualité"}
          </Button>
        </div>
      </form>

      <aside aria-label="Aperçu de l'article" className="xl:sticky xl:top-8 xl:self-start">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-smv-gray-600">
          Aperçu en temps réel
        </p>
        <div className="rounded-lg border border-smv-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 text-xs text-smv-gray-600">
            {apercu.publie_le ? <span>{apercu.publie_le}</span> : null}
            {apercu.categorie ? <Badge variant="gray" label={apercu.categorie} /> : null}
            <Badge
              variant={apercu.publie ? 'green' : 'orange'}
              label={apercu.publie ? 'Publié' : 'Brouillon'}
            />
          </div>
          <h2 className="mt-2 font-display text-2xl font-extrabold uppercase leading-tight text-smv-navy">
            {apercu.titre || "Titre de l'article"}
          </h2>
          {imageUrl ? (
            <img src={imageUrl} alt="" className="mt-3 max-h-48 w-full rounded-md object-cover" />
          ) : null}
          {apercu.extrait ? (
            <p className="mt-3 text-sm font-semibold text-smv-gray-600">{apercu.extrait}</p>
          ) : null}
          <div className="mt-4 text-sm">
            <SimpleMarkdown texte={apercu.contenu || '*(le contenu apparaîtra ici)*'} />
          </div>
        </div>
      </aside>
    </div>
  );
}
