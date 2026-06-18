import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageUploadField } from '../../components/admin/ImageUploadField';
import { CentreMap } from '../../components/centres/CentreMap';
import { Alert } from '../../components/ui/Alert';
import { Button } from '../../components/ui/Button';
import { CheckboxField, InputField, TextareaField } from '../../components/ui/FormField';
import { Loader } from '../../components/ui/Loader';
import { Select } from '../../components/ui/Select';
import { Seo } from '../../components/ui/Seo';
import { Skeleton } from '../../components/ui/Skeleton';
import { useAuth } from '../../hooks/useAuth';
import { useTousCentres } from '../../hooks/useCentres';
import { centreSchema, type CentreFormValues } from '../../lib/validators';
import { updateCentre } from '../../services/centres';
import { toast } from '../../store/toastStore';
import type { Centre } from '../../types/app.types';

function FormulaireCentre({ centre, onSaved }: { centre: Centre; onSaved: () => void }) {
  const [blasonUrl, setBlasonUrl] = useState(centre.blason_url ?? '');
  const [confirme, setConfirme] = useState(false);
  const [envoi, setEnvoi] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CentreFormValues>({
    resolver: zodResolver(centreSchema),
    defaultValues: {
      nom: centre.nom,
      nom_regiment: centre.nom_regiment ?? '',
      region: centre.region,
      adresse: centre.adresse,
      code_postal: centre.code_postal,
      ville: centre.ville,
      latitude: centre.latitude,
      longitude: centre.longitude,
      telephone_1: centre.telephone_1 ?? '',
      telephone_2: centre.telephone_2 ?? '',
      email_recrutement: centre.email_recrutement,
      commandant: centre.commandant ?? '',
      description: centre.description ?? '',
      description_courte: centre.description_courte ?? '',
      capacite_annuelle: centre.capacite_annuelle,
      video_youtube: centre.video_youtube ?? '',
      social_facebook: centre.social_facebook ?? '',
      social_instagram: centre.social_instagram ?? '',
      social_linkedin: centre.social_linkedin ?? '',
      social_youtube: centre.social_youtube ?? '',
      horaires_recrutement: centre.horaires_recrutement ?? '',
    } as Partial<CentreFormValues>,
  });

  const latitude = Number(watch('latitude'));
  const longitude = Number(watch('longitude'));
  const apercuCentre: Centre = useMemo(
    () => ({
      ...centre,
      latitude: Number.isFinite(latitude) ? latitude : centre.latitude,
      longitude: Number.isFinite(longitude) ? longitude : centre.longitude,
    }),
    [centre, latitude, longitude],
  );

  const vide = (valeur: string | undefined): string | null =>
    valeur && valeur.trim() ? valeur.trim() : null;

  const enregistrer = async (valeurs: CentreFormValues) => {
    if (!confirme) {
      toast.warning("Coche la case de validation avant d'enregistrer");
      return;
    }
    setEnvoi(true);
    try {
      await updateCentre(centre.id, {
        nom: valeurs.nom,
        nom_regiment: vide(valeurs.nom_regiment),
        region: valeurs.region,
        adresse: valeurs.adresse,
        code_postal: valeurs.code_postal,
        ville: valeurs.ville,
        latitude: valeurs.latitude,
        longitude: valeurs.longitude,
        telephone_1: vide(valeurs.telephone_1),
        telephone_2: vide(valeurs.telephone_2),
        email_recrutement: valeurs.email_recrutement,
        commandant: vide(valeurs.commandant),
        description: vide(valeurs.description),
        description_courte: vide(valeurs.description_courte),
        capacite_annuelle: valeurs.capacite_annuelle ?? null,
        blason_url: blasonUrl || null,
        video_youtube: vide(valeurs.video_youtube),
        social_facebook: vide(valeurs.social_facebook),
        social_instagram: vide(valeurs.social_instagram),
        social_linkedin: vide(valeurs.social_linkedin),
        social_youtube: vide(valeurs.social_youtube),
        horaires_recrutement: vide(valeurs.horaires_recrutement),
      });
      toast.success('Fiche centre enregistrée');
      setConfirme(false);
      onSaved();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Enregistrement impossible');
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(enregistrer)} noValidate className="max-w-4xl space-y-8">
      <section className="space-y-5">
        <h2 className="font-display text-xl font-bold uppercase text-smv-navy">Identité</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <InputField label="Nom du centre" requis error={errors.nom?.message} {...register('nom')} />
          <InputField label="Régiment / antenne" error={errors.nom_regiment?.message} {...register('nom_regiment')} />
          <InputField label="Région" requis error={errors.region?.message} {...register('region')} />
          <InputField label="Commandant / chef de corps" error={errors.commandant?.message} {...register('commandant')} />
          <InputField
            label="Capacité annuelle (jeunes/an)"
            type="number"
            min={0}
            error={errors.capacite_annuelle?.message}
            {...register('capacite_annuelle')}
          />
        </div>
        <TextareaField
          label="Description courte (cards)"
          rows={2}
          maxLength={300}
          error={errors.description_courte?.message}
          {...register('description_courte')}
        />
        <TextareaField
          label="Description longue"
          rows={7}
          hint="Markdown léger accepté : paragraphes, listes « - », **gras**."
          error={errors.description?.message}
          {...register('description')}
        />
        <ImageUploadField label="Blason du centre" valeur={blasonUrl} onChange={setBlasonUrl} dossier="blasons" />
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-xl font-bold uppercase text-smv-navy">Contact</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <InputField label="Adresse" requis error={errors.adresse?.message} {...register('adresse')} />
          <InputField label="Ville" requis error={errors.ville?.message} {...register('ville')} />
          <InputField label="Code postal" requis maxLength={5} error={errors.code_postal?.message} {...register('code_postal')} />
          <InputField label="Email recrutement" requis type="email" error={errors.email_recrutement?.message} {...register('email_recrutement')} />
          <InputField label="Téléphone 1" type="tel" error={errors.telephone_1?.message} {...register('telephone_1')} />
          <InputField label="Téléphone 2" type="tel" error={errors.telephone_2?.message} {...register('telephone_2')} />
        </div>
        <InputField
          label="Horaires de permanence recrutement"
          placeholder="Ex. Permanence téléphonique les lundi, mercredi et vendredi"
          error={errors.horaires_recrutement?.message}
          {...register('horaires_recrutement')}
        />
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-xl font-bold uppercase text-smv-navy">
          Coordonnées GPS
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Latitude"
            requis
            type="number"
            step="0.0001"
            error={errors.latitude?.message}
            {...register('latitude')}
          />
          <InputField
            label="Longitude"
            requis
            type="number"
            step="0.0001"
            error={errors.longitude?.message}
            {...register('longitude')}
          />
        </div>
        <CentreMap centres={[apercuCentre]} cadrage="auto" className="md:h-[300px]" />
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-xl font-bold uppercase text-smv-navy">
          Vidéo & réseaux sociaux
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="ID vidéo YouTube"
            placeholder="Ex. C5Harzf7XCg"
            hint="L'identifiant après « watch?v= » dans l'URL YouTube."
            error={errors.video_youtube?.message}
            {...register('video_youtube')}
          />
          <InputField label="Facebook (identifiant de page)" error={errors.social_facebook?.message} {...register('social_facebook')} />
          <InputField label="Instagram (pseudo)" error={errors.social_instagram?.message} {...register('social_instagram')} />
          <InputField label="LinkedIn (identifiant)" error={errors.social_linkedin?.message} {...register('social_linkedin')} />
          <InputField label="YouTube (chaîne)" error={errors.social_youtube?.message} {...register('social_youtube')} />
        </div>
      </section>

      {Object.keys(errors).length > 0 ? (
        <Alert type="error">Corrige les champs en erreur avant d'enregistrer.</Alert>
      ) : null}

      <div className="space-y-4 border-t border-smv-gray-100 pt-5">
        <CheckboxField
          label="Je confirme l'exactitude des informations saisies — elles seront immédiatement visibles sur le site public."
          checked={confirme}
          onChange={(e) => setConfirme(e.target.checked)}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={envoi}>
            {envoi ? <Loader size="sm" label="Enregistrement" /> : null}
            Enregistrer la fiche centre
          </Button>
        </div>
      </div>
    </form>
  );
}

export default function AdminCentre() {
  const { centre, estSuperAdmin } = useAuth();
  const { data: centres, chargement, recharger } = useTousCentres();
  const [centreChoisiId, setCentreChoisiId] = useState<string>('');

  // L'admin de centre édite le sien ; le super admin choisit dans la liste.
  useEffect(() => {
    if (centre && !centreChoisiId) setCentreChoisiId(centre.id);
  }, [centre, centreChoisiId]);

  const centreEdite = useMemo(
    () => (centres ?? []).find((c) => c.id === (centreChoisiId || centre?.id)) ?? null,
    [centres, centreChoisiId, centre],
  );

  if (chargement) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  return (
    <>
      <Seo titre="Fiche centre — Admin" />
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy">
        {estSuperAdmin ? 'Fiches centres' : 'Mon centre'}
      </h1>
      <p className="mb-6 mt-1 text-sm text-smv-gray-600">
        Ces informations alimentent la fiche publique du centre.
      </p>

      {estSuperAdmin ? (
        <Select
          label="Centre à modifier"
          placeholder="Choisissez un centre…"
          options={(centres ?? []).map((c) => ({ value: c.id, label: c.nom }))}
          value={centreChoisiId}
          onChange={(e) => setCentreChoisiId(e.target.value)}
          className="mb-8 max-w-sm"
        />
      ) : null}

      {centreEdite ? (
        <FormulaireCentre key={centreEdite.id} centre={centreEdite} onSaved={recharger} />
      ) : (
        <Alert type="info">
          {estSuperAdmin
            ? 'Choisissez un centre à modifier dans la liste ci-dessus.'
            : "Aucun centre n'est rattaché à ton compte — contacte l'administrateur national."}
        </Alert>
      )}
    </>
  );
}
