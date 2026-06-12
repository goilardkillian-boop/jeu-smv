import { zodResolver } from '@hookform/resolvers/zod';
import { LocateFixed, MapPin } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useAsyncData } from '../../hooks/useAsyncData';
import { useGeolocation } from '../../hooks/useGeolocation';
import { trierCentresParDistance } from '../../lib/haversine';
import { fetchFormationsParCentre } from '../../services/formations';
import { useSearchStore } from '../../store/searchStore';
import type { Centre } from '../../types/app.types';
import { stepProjetSchema, type StepProfilValues, type StepProjetValues } from '../../lib/validators';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { Loader } from '../ui/Loader';
import { Select } from '../ui/Select';

const NIVEAUX_SANS_CAP = ['Aucun diplôme', 'Brevet des collèges'];

export interface StepProjetProps {
  defaut?: Partial<StepProjetValues>;
  profil?: StepProfilValues;
  centres: Centre[];
  onSubmit: (valeurs: StepProjetValues) => void;
  onBack: () => void;
}

/** Étape 2 — Mon projet (type de volontariat, centre, formation, incorporation). */
export function StepProjet({ defaut, profil, centres, onSubmit, onBack }: StepProjetProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StepProjetValues>({
    resolver: zodResolver(stepProjetSchema),
    defaultValues: defaut,
    mode: 'onTouched',
  });

  const typeVolontaire = watch('type_volontaire');
  const centreId = watch('centre_id');
  const formationId = watch('formation_id');

  const origine = useSearchStore((s) => s.origine);
  const { localisation, demanderPosition } = useGeolocation();

  // « Centre le plus proche » : à partir de l'origine connue (recherche ou GPS).
  useEffect(() => {
    if (!origine || centres.length === 0) return;
    const tri = trierCentresParDistance(centres, origine);
    const plusProche = tri[0];
    if (plusProche && !centreId) {
      setValue('centre_id', plusProche.id, { shouldValidate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origine, centres]);

  const { data: formations, chargement: chargementFormations } = useAsyncData(
    () => (centreId ? fetchFormationsParCentre(centreId) : Promise.resolve([])),
    [centreId],
  );

  const formationsFiltrees = useMemo(() => {
    if (!formations) return [];
    if (!typeVolontaire) return formations;
    const publicVise = typeVolontaire === 'expert' ? 'Volontaire expert' : 'Volontaire stagiaire';
    return formations.filter((f) => f.public_vise === publicVise);
  }, [formations, typeVolontaire]);

  const formationChoisie = formationsFiltrees.find((f) => f.id === formationId);
  const centreChoisi = centres.find((c) => c.id === centreId);

  // Réinitialise la formation si elle ne correspond plus au centre/type.
  useEffect(() => {
    if (formationId && !formationsFiltrees.some((f) => f.id === formationId) && !chargementFormations) {
      setValue('formation_id', '');
      setValue('date_incorporation_souhaitee', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formationsFiltrees, chargementFormations]);

  const avertissementVE =
    typeVolontaire === 'expert' && profil && NIVEAUX_SANS_CAP.includes(profil.niveau_etudes);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-smv-gray-900">
          Type de volontariat souhaité <span className="text-smv-red" aria-hidden="true">*</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              value: 'stagiaire',
              titre: 'Volontaire stagiaire',
              detail: 'Sans diplôme · 8 à 12 mois · 358 €/mois nourri-logé',
            },
            {
              value: 'expert',
              titre: 'Volontaire expert',
              detail: 'CAP minimum · 1 an renouvelable · 745 €/mois nourri-logé',
            },
          ].map((option) => (
            <label
              key={option.value}
              className={
                typeVolontaire === option.value
                  ? 'cursor-pointer rounded-md border-2 border-smv-green bg-smv-green-light/15 p-4'
                  : 'cursor-pointer rounded-md border-2 border-smv-gray-100 p-4 hover:border-smv-gray-300'
              }
            >
              <input
                type="radio"
                value={option.value}
                className="sr-only"
                {...register('type_volontaire')}
              />
              <span className="block font-display text-lg font-bold uppercase text-smv-navy">
                {option.titre}
              </span>
              <span className="mt-1 block text-xs text-smv-gray-600">{option.detail}</span>
            </label>
          ))}
        </div>
        {errors.type_volontaire ? (
          <p role="alert" className="mt-1 text-xs font-semibold text-smv-red">
            {errors.type_volontaire.message}
          </p>
        ) : null}
      </fieldset>

      {avertissementVE ? (
        <Alert type="warning">
          Le volontariat expert demande en principe un diplôme de niveau CAP minimum. Tu peux
          continuer ta candidature, mais le recruteur pourra te proposer le parcours volontaire
          stagiaire, mieux adapté.
        </Alert>
      ) : null}

      <div>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <p className="text-sm font-semibold text-smv-gray-900">
            Centre SMV souhaité <span className="text-smv-red" aria-hidden="true">*</span>
          </p>
          <button
            type="button"
            onClick={demanderPosition}
            disabled={localisation}
            className="inline-flex items-center gap-1 text-xs font-bold text-smv-green underline-offset-2 hover:underline disabled:opacity-50"
          >
            {localisation ? (
              <Loader size="sm" label="Localisation" />
            ) : (
              <LocateFixed className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            Centre le plus proche
          </button>
        </div>
        <Select
          aria-label="Centre SMV souhaité"
          placeholder="Choisis ton centre…"
          options={centres.map((centre) => ({
            value: centre.id,
            label: `${centre.nom} — ${centre.region}`,
          }))}
          error={errors.centre_id?.message}
          className="mt-1"
          {...register('centre_id')}
        />
        {centreChoisi ? (
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-smv-gray-600">
            <MapPin className="h-3.5 w-3.5 text-smv-green" aria-hidden="true" />
            {centreChoisi.nom_regiment} · {centreChoisi.ville} ({centreChoisi.region})
          </p>
        ) : null}
      </div>

      <div>
        <Select
          label="Formation souhaitée"
          placeholder={
            !centreId
              ? "Choisis d'abord un centre"
              : chargementFormations
                ? 'Chargement des formations…'
                : formationsFiltrees.length === 0
                  ? 'Aucune formation pour ce choix — le recruteur te conseillera'
                  : 'Choisis une formation (facultatif)'
          }
          disabled={!centreId || chargementFormations}
          options={formationsFiltrees.map((formation) => ({
            value: formation.id,
            label: `${formation.titre} (${formation.duree_mois} mois)`,
          }))}
          error={errors.formation_id?.message}
          {...register('formation_id')}
        />
      </div>

      {formationChoisie && formationChoisie.dates_incorporation && formationChoisie.dates_incorporation.length > 0 ? (
        <Select
          label="Date d'incorporation préférée"
          placeholder="Choisis une date (facultatif)"
          options={formationChoisie.dates_incorporation.map((date) => ({ value: date, label: date }))}
          error={errors.date_incorporation_souhaitee?.message}
          {...register('date_incorporation_souhaitee')}
        />
      ) : null}

      <div className="flex flex-wrap justify-between gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          Retour
        </Button>
        <Button type="submit">Continuer</Button>
      </div>
    </form>
  );
}
