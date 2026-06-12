import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { calculerAge } from '../../lib/utils';
import {
  stepValidationSchema,
  type CandidatureFormValues,
  type StepValidationValues,
} from '../../lib/validators';
import { Button } from '../ui/Button';
import { CheckboxField } from '../ui/FormField';
import { Loader } from '../ui/Loader';

export interface StepValidationProps {
  valeurs: CandidatureFormValues;
  nomCentre: string;
  titreFormation: string | null;
  envoi: boolean;
  onSubmit: () => void;
  onBack: () => void;
  /** Aller directement à une étape pour corriger. */
  onEdit: (etape: number) => void;
}

interface LigneRecap {
  label: string;
  valeur: string;
}

function Section({
  titre,
  lignes,
  etape,
  onEdit,
}: {
  titre: string;
  lignes: LigneRecap[];
  etape: number;
  onEdit: (etape: number) => void;
}) {
  return (
    <section className="rounded-md border border-smv-gray-100 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-display text-lg font-bold uppercase text-smv-navy">{titre}</h3>
        <button
          type="button"
          onClick={() => onEdit(etape)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-smv-green underline-offset-2 hover:underline"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          Modifier
        </button>
      </div>
      <dl className="grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
        {lignes.map((ligne) => (
          <div key={ligne.label} className="flex flex-col">
            <dt className="text-xs uppercase tracking-wide text-smv-gray-600">{ligne.label}</dt>
            <dd className="font-semibold text-smv-gray-900">{ligne.valeur || '—'}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Étape 4 — Récapitulatif + consentements RGPD + envoi. */
export function StepValidation({
  valeurs,
  nomCentre,
  titreFormation,
  envoi,
  onSubmit,
  onBack,
  onEdit,
}: StepValidationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepValidationValues>({
    resolver: zodResolver(stepValidationSchema),
  });

  const age = calculerAge(valeurs.date_naissance);

  return (
    <form onSubmit={handleSubmit(() => onSubmit())} noValidate className="space-y-5">
      <Section
        titre="Ton profil"
        etape={0}
        onEdit={onEdit}
        lignes={[
          { label: 'Identité', valeur: `${valeurs.prenom} ${valeurs.nom}` },
          { label: 'Âge', valeur: age !== null ? `${age} ans` : valeurs.date_naissance },
          { label: 'Nationalité', valeur: valeurs.nationalite_francaise === 'oui' ? 'Française' : 'Autre' },
          { label: 'Situation de handicap', valeur: valeurs.situation_handicap === 'oui' ? 'Oui' : 'Non' },
          { label: "Niveau d'études", valeur: valeurs.niveau_etudes },
          { label: 'Situation actuelle', valeur: valeurs.situation_actuelle },
        ]}
      />
      <Section
        titre="Ton projet"
        etape={1}
        onEdit={onEdit}
        lignes={[
          {
            label: 'Type de volontariat',
            valeur: valeurs.type_volontaire === 'expert' ? 'Volontaire expert (VE)' : 'Volontaire stagiaire (VS)',
          },
          { label: 'Centre SMV', valeur: nomCentre },
          { label: 'Formation', valeur: titreFormation ?? 'À définir avec le recruteur' },
          { label: 'Incorporation souhaitée', valeur: valeurs.date_incorporation_souhaitee ?? '' },
        ]}
      />
      <Section
        titre="Tes coordonnées"
        etape={2}
        onEdit={onEdit}
        lignes={[
          { label: 'Email', valeur: valeurs.email },
          { label: 'Téléphone', valeur: valeurs.telephone },
          {
            label: 'Adresse',
            valeur: `${valeurs.adresse}, ${valeurs.code_postal} ${valeurs.ville_residence}`,
          },
          { label: 'Tu as connu le SMV par', valeur: valeurs.source_connaissance },
        ]}
      />

      <div className="space-y-3 rounded-md bg-smv-off-white p-4">
        <CheckboxField
          label="J'accepte que mes données soient transmises au centre SMV choisi pour le traitement de ma candidature."
          error={errors.consentement_rgpd?.message}
          {...register('consentement_rgpd')}
        />
        <CheckboxField
          label="J'ai pris connaissance des conditions d'engagement militaire du Service Militaire Volontaire."
          error={errors.consentement_engagement?.message}
          {...register('consentement_engagement')}
        />
        <p className="text-xs text-smv-gray-600">
          Tes données sont conservées le temps du traitement de ta candidature. Consulte la page{' '}
          <a href="/rgpd" className="underline underline-offset-2">
            RGPD
          </a>{' '}
          pour connaître tes droits.
        </p>
      </div>

      <div className="flex flex-wrap justify-between gap-3">
        <Button type="button" variant="ghost" onClick={onBack} disabled={envoi}>
          Retour
        </Button>
        <Button type="submit" size="lg" disabled={envoi}>
          {envoi ? <Loader size="sm" label="Envoi en cours" /> : null}
          {envoi ? 'Envoi en cours…' : 'Envoyer ma candidature'}
        </Button>
      </div>
    </form>
  );
}
