import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NIVEAUX_ETUDES, SITUATIONS_ACTUELLES } from '../../lib/constants';
import { calculerAge } from '../../lib/utils';
import { stepProfilSchema, type StepProfilValues } from '../../lib/validators';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { InputField } from '../ui/FormField';
import { Select } from '../ui/Select';

export interface StepProfilProps {
  defaut?: Partial<StepProfilValues>;
  onSubmit: (valeurs: StepProfilValues) => void;
}

/** Étape 1 — Profil (identité, âge, nationalité, niveau d'études). */
export function StepProfil({ defaut, onSubmit }: StepProfilProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StepProfilValues>({
    resolver: zodResolver(stepProfilSchema),
    defaultValues: defaut,
    mode: 'onTouched',
  });

  const dateNaissance = watch('date_naissance');
  const age = dateNaissance ? calculerAge(dateNaissance) : null;
  const handicap = watch('situation_handicap');

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Prénom"
          requis
          autoComplete="given-name"
          error={errors.prenom?.message}
          {...register('prenom')}
        />
        <InputField
          label="Nom"
          requis
          autoComplete="family-name"
          error={errors.nom?.message}
          {...register('nom')}
        />
      </div>

      <div>
        <InputField
          label="Date de naissance"
          requis
          type="date"
          error={errors.date_naissance?.message}
          {...register('date_naissance')}
        />
        {age !== null && age >= 18 && age <= 25 ? (
          <p className="mt-1 text-xs font-semibold text-smv-green">Tu as {age} ans — c'est bon !</p>
        ) : null}
        {age !== null && age < 18 ? (
          <Alert type="warning" className="mt-2">
            Tu dois avoir au moins 18 ans pour rejoindre le SMV.
          </Alert>
        ) : null}
        {age !== null && age > 25 ? (
          <Alert type="warning" className="mt-2">
            Le SMV accueille les jeunes jusqu'à 25 ans.
          </Alert>
        ) : null}
      </div>

      <Select
        label="Nationalité *"
        placeholder="Choisis…"
        options={[
          { value: 'oui', label: 'Française' },
          { value: 'non', label: 'Autre nationalité' },
        ]}
        error={errors.nationalite_francaise?.message}
        {...register('nationalite_francaise')}
      />

      <div>
        <Select
          label="Es-tu en situation de handicap ? *"
          placeholder="Choisis…"
          options={[
            { value: 'non', label: 'Non' },
            { value: 'oui', label: 'Oui' },
          ]}
          error={errors.situation_handicap?.message}
          {...register('situation_handicap')}
        />
        {handicap === 'oui' ? (
          <Alert type="info" className="mt-2">
            Le SMV étudie chaque situation au cas par cas. Pense à te munir de ta notification
            MDPH : elle sera utile lors de l'étude de ton dossier et de la visite médicale.
          </Alert>
        ) : null}
      </div>

      <Select
        label="Niveau d'études *"
        placeholder="Choisis…"
        options={NIVEAUX_ETUDES.map((niveau) => ({ value: niveau, label: niveau }))}
        error={errors.niveau_etudes?.message}
        {...register('niveau_etudes')}
      />

      <Select
        label="Situation actuelle *"
        placeholder="Choisis…"
        options={SITUATIONS_ACTUELLES.map((situation) => ({ value: situation, label: situation }))}
        error={errors.situation_actuelle?.message}
        {...register('situation_actuelle')}
      />

      <div className="flex justify-end">
        <Button type="submit">Continuer</Button>
      </div>
    </form>
  );
}
