import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SOURCES_CONNAISSANCE } from '../../lib/constants';
import { masquerTelephone } from '../../lib/utils';
import { stepContactSchema, type StepContactValues } from '../../lib/validators';
import { Button } from '../ui/Button';
import { InputField, TextareaField } from '../ui/FormField';
import { Select } from '../ui/Select';

export interface StepContactProps {
  defaut?: Partial<StepContactValues>;
  onSubmit: (valeurs: StepContactValues) => void;
  onBack: () => void;
}

/** Étape 3 — Contact (coordonnées + comment as-tu connu le SMV). */
export function StepContact({ defaut, onSubmit, onBack }: StepContactProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StepContactValues>({
    resolver: zodResolver(stepContactSchema),
    defaultValues: defaut,
    mode: 'onTouched',
  });

  const telephoneRegistre = register('telephone');

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Email"
          requis
          type="email"
          autoComplete="email"
          placeholder="prenom.nom@exemple.fr"
          error={errors.email?.message}
          {...register('email')}
        />
        <InputField
          label="Téléphone mobile"
          requis
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="06 12 34 56 78"
          hint="Format : 06 XX XX XX XX"
          error={errors.telephone?.message}
          {...telephoneRegistre}
          onChange={(e) => {
            const masque = masquerTelephone(e.target.value);
            setValue('telephone', masque, { shouldValidate: false });
          }}
        />
      </div>

      <InputField
        label="Adresse"
        requis
        autoComplete="street-address"
        placeholder="N° et rue"
        error={errors.adresse?.message}
        {...register('adresse')}
      />

      <div className="grid gap-5 sm:grid-cols-[10rem,1fr]">
        <InputField
          label="Code postal"
          requis
          inputMode="numeric"
          maxLength={5}
          autoComplete="postal-code"
          error={errors.code_postal?.message}
          {...register('code_postal')}
        />
        <InputField
          label="Ville"
          requis
          autoComplete="address-level2"
          error={errors.ville_residence?.message}
          {...register('ville_residence')}
        />
      </div>

      <Select
        label="Comment as-tu connu le SMV ? *"
        placeholder="Choisis…"
        options={SOURCES_CONNAISSANCE.map((source) => ({ value: source, label: source }))}
        error={errors.source_connaissance?.message}
        {...register('source_connaissance')}
      />

      <TextareaField
        label="Un message pour le recruteur ? (facultatif)"
        rows={4}
        placeholder="Parle-nous de ta motivation, de tes disponibilités…"
        error={errors.message?.message}
        {...register('message')}
      />

      <div className="flex flex-wrap justify-between gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          Retour
        </Button>
        <Button type="submit">Continuer</Button>
      </div>
    </form>
  );
}
