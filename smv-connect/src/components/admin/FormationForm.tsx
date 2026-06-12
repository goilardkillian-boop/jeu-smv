import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CATEGORIES_FORMATION } from '../../lib/constants';
import { formationSchema, type FormationFormValues } from '../../lib/validators';
import { createFormation, updateFormation } from '../../services/formations';
import { toast } from '../../store/toastStore';
import type { Centre, Formation } from '../../types/app.types';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { CheckboxField, InputField, TextareaField } from '../ui/FormField';
import { Loader } from '../ui/Loader';
import { Select } from '../ui/Select';
import { ImageUploadField } from './ImageUploadField';
import { ListEditor } from './ListEditor';

export interface FormationFormProps {
  initiale?: Formation;
  /** Centre imposé (admin de centre) — sinon sélection parmi `centres`. */
  centreIdFixe: string | null;
  centres: Centre[];
  onDone: () => void;
}

/** Formulaire de création / édition d'une formation (espace admin). */
export function FormationForm({ initiale, centreIdFixe, centres, onDone }: FormationFormProps) {
  const [centreId, setCentreId] = useState(initiale?.centre_id ?? centreIdFixe ?? '');
  const [debouches, setDebouches] = useState<string[]>(initiale?.debouches ?? []);
  const [certifications, setCertifications] = useState<string[]>(initiale?.certifications ?? []);
  const [datesIncorporation, setDatesIncorporation] = useState<string[]>(
    initiale?.dates_incorporation ?? [],
  );
  const [imageUrl, setImageUrl] = useState(initiale?.image_url ?? '');
  const [envoi, setEnvoi] = useState(false);
  const [erreurCentre, setErreurCentre] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormationFormValues>({
    resolver: zodResolver(formationSchema),
    defaultValues: {
      titre: initiale?.titre ?? '',
      categorie: initiale?.categorie ?? '',
      public_vise: initiale?.public_vise ?? 'Volontaire stagiaire',
      duree_mois: initiale?.duree_mois ?? 8,
      description: initiale?.description ?? '',
      places_disponibles: initiale?.places_disponibles ?? null,
      actif: initiale?.actif ?? true,
    } as Partial<FormationFormValues>,
  });

  const enregistrer = async (valeurs: FormationFormValues) => {
    if (!centreId) {
      setErreurCentre('Choisissez le centre de rattachement');
      return;
    }
    setErreurCentre(null);
    setEnvoi(true);
    try {
      const payload = {
        centre_id: centreId,
        titre: valeurs.titre,
        categorie: valeurs.categorie,
        public_vise: valeurs.public_vise,
        duree_mois: valeurs.duree_mois,
        description: valeurs.description?.trim() ? valeurs.description.trim() : null,
        debouches,
        certifications,
        dates_incorporation: datesIncorporation,
        places_disponibles: valeurs.places_disponibles ?? null,
        image_url: imageUrl || null,
        actif: valeurs.actif,
      };
      if (initiale) {
        await updateFormation(initiale.id, payload);
        toast.success('Formation mise à jour');
      } else {
        await createFormation(payload);
        toast.success('Formation créée');
      }
      onDone();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Enregistrement impossible');
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(enregistrer)} noValidate className="max-w-3xl space-y-5">
      {centreIdFixe === null ? (
        <Select
          label="Centre de rattachement *"
          placeholder="Choisissez un centre…"
          options={centres.map((centre) => ({ value: centre.id, label: centre.nom }))}
          value={centreId}
          onChange={(e) => setCentreId(e.target.value)}
          error={erreurCentre ?? undefined}
        />
      ) : null}

      <InputField
        label="Titre de la formation"
        requis
        placeholder="Ex. Conducteur de transport de marchandises"
        error={errors.titre?.message}
        {...register('titre')}
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <Select
          label="Catégorie *"
          placeholder="Choisissez…"
          options={CATEGORIES_FORMATION.map((categorie) => ({
            value: categorie.id,
            label: categorie.label,
          }))}
          error={errors.categorie?.message}
          {...register('categorie')}
        />
        <Select
          label="Public visé *"
          options={[
            { value: 'Volontaire stagiaire', label: 'Volontaire stagiaire (VS)' },
            { value: 'Volontaire expert', label: 'Volontaire expert (VE)' },
          ]}
          error={errors.public_vise?.message}
          {...register('public_vise')}
        />
        <Select
          label="Durée *"
          options={[
            { value: '8', label: '8 mois' },
            { value: '12', label: '12 mois' },
          ]}
          error={errors.duree_mois?.message}
          {...register('duree_mois')}
        />
      </div>

      <TextareaField
        label="Description"
        rows={6}
        hint="Markdown léger accepté : paragraphes, listes « - », **gras**."
        error={errors.description?.message}
        {...register('description')}
      />

      <ListEditor
        label="Débouchés professionnels"
        valeurs={debouches}
        onChange={setDebouches}
        placeholder="Ex. CDI conducteur routier"
      />
      <ListEditor
        label="Certifications obtenues"
        valeurs={certifications}
        onChange={setCertifications}
        placeholder="Ex. CACES R489, SST…"
      />
      <ListEditor
        label="Dates d'incorporation"
        valeurs={datesIncorporation}
        onChange={setDatesIncorporation}
        placeholder="Ex. 7 septembre 2026"
        hint="Format : JJ mois AAAA (ex. « 7 septembre 2026 »)."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Places disponibles"
          type="number"
          min={0}
          error={errors.places_disponibles?.message}
          {...register('places_disponibles')}
        />
        <div className="sm:pt-7">
          <CheckboxField label="Formation active (visible sur le site public)" {...register('actif')} />
        </div>
      </div>

      <ImageUploadField
        label="Image de couverture"
        valeur={imageUrl}
        onChange={setImageUrl}
        dossier="formations"
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
          {initiale ? 'Enregistrer les modifications' : 'Créer la formation'}
        </Button>
      </div>
    </form>
  );
}
