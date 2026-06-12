import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Plus, UserCog } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { InputField } from '../../components/ui/FormField';
import { Loader } from '../../components/ui/Loader';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';
import { Seo } from '../../components/ui/Seo';
import { Skeleton } from '../../components/ui/Skeleton';
import { useAsyncData } from '../../hooks/useAsyncData';
import { useTousCentres } from '../../hooks/useCentres';
import { isSupabaseConfigured } from '../../lib/supabase';
import { utilisateurSchema, type UtilisateurFormValues } from '../../lib/validators';
import {
  createUtilisateur,
  fetchProfiles,
  reinitialiserMotDePasse,
  setProfileActif,
} from '../../services/utilisateurs';
import { toast } from '../../store/toastStore';
import type { Centre, Profile } from '../../types/app.types';

const ROLES = [
  { value: 'recruteur', label: 'Recruteur' },
  { value: 'admin_centre', label: 'Admin de centre' },
  { value: 'super_admin', label: 'Super admin national' },
];

function CreationModal({
  centres,
  onClose,
  onSaved,
}: {
  centres: Centre[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [envoi, setEnvoi] = useState(false);
  const [motDePasse, setMotDePasse] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UtilisateurFormValues>({
    resolver: zodResolver(utilisateurSchema),
    defaultValues: { role: 'recruteur' },
  });

  const role = watch('role');

  const creer = async (valeurs: UtilisateurFormValues) => {
    if (valeurs.role !== 'super_admin' && !valeurs.centre_id) {
      toast.warning('Associe un centre à ce compte');
      return;
    }
    setEnvoi(true);
    try {
      const { motDePasseProvisoire } = await createUtilisateur({
        email: valeurs.email,
        prenom: valeurs.prenom,
        nom: valeurs.nom,
        role: valeurs.role,
        centre_id: valeurs.role === 'super_admin' ? null : (valeurs.centre_id ?? null),
      });
      toast.success('Compte créé');
      setMotDePasse(motDePasseProvisoire);
      onSaved();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Création impossible');
    } finally {
      setEnvoi(false);
    }
  };

  if (motDePasse) {
    return (
      <Modal ouvert onClose={onClose} titre="Compte créé">
        <Alert type="success" title="Mot de passe provisoire">
          Transmets ce mot de passe au recruteur de façon sécurisée — il ne sera plus affiché :
          <code className="mt-2 block w-fit rounded bg-white px-3 py-1.5 font-mono text-base">
            {motDePasse}
          </code>
        </Alert>
        <div className="mt-4 flex justify-end">
          <Button size="sm" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal ouvert onClose={onClose} titre="Créer un compte recruteur">
      {!isSupabaseConfigured ? (
        <Alert type="info" className="mb-4">
          Mode démo : le compte sera créé localement (sans authentification réelle).
        </Alert>
      ) : null}
      <form onSubmit={handleSubmit(creer)} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="Prénom" requis error={errors.prenom?.message} {...register('prenom')} />
          <InputField label="Nom" requis error={errors.nom?.message} {...register('nom')} />
        </div>
        <InputField label="Email professionnel" requis type="email" error={errors.email?.message} {...register('email')} />
        <Select label="Rôle *" options={ROLES} error={errors.role?.message} {...register('role')} />
        {role !== 'super_admin' ? (
          <Select
            label="Centre associé *"
            placeholder="Choisissez un centre…"
            options={centres.map((centre) => ({ value: centre.id, label: centre.nom }))}
            error={errors.centre_id?.message}
            {...register('centre_id')}
          />
        ) : null}
        <div className="flex justify-end gap-3 border-t border-smv-gray-100 pt-4">
          <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={envoi}>
            Annuler
          </Button>
          <Button type="submit" size="sm" disabled={envoi}>
            {envoi ? <Loader size="sm" label="Création" /> : null}
            Créer le compte
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminUtilisateurs() {
  const { data, chargement, erreur, recharger } = useAsyncData(() => fetchProfiles(), []);
  const { data: centres } = useTousCentres();
  const [creation, setCreation] = useState(false);

  const nomCentre = (profile: Profile): string =>
    profile.centre_id
      ? (centres ?? []).find((c) => c.id === profile.centre_id)?.nom ?? 'Centre inconnu'
      : 'National';

  const basculer = async (profile: Profile) => {
    try {
      await setProfileActif(profile.id, !profile.actif);
      toast.success(profile.actif ? 'Compte désactivé' : 'Compte réactivé');
      recharger();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Mise à jour impossible');
    }
  };

  const reinitialiser = async (profile: Profile) => {
    if (!profile.email) return;
    try {
      await reinitialiserMotDePasse(profile.email);
      toast.success(`Email de réinitialisation envoyé à ${profile.email}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Réinitialisation impossible');
    }
  };

  return (
    <>
      <Seo titre="Utilisateurs — Admin" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy">
            Comptes recruteurs
          </h1>
          <p className="mt-1 text-sm text-smv-gray-600">
            Création, désactivation et réinitialisation des accès à l'espace admin.
          </p>
        </div>
        <Button size="sm" onClick={() => setCreation(true)}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Créer un compte
        </Button>
      </div>

      <div className="mt-6">
        {chargement ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : erreur ? (
          <Alert type="error">{erreur}</Alert>
        ) : (data ?? []).length === 0 ? (
          <EmptyState icon={UserCog} titre="Aucun compte" />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-smv-gray-100 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-smv-gray-100 bg-smv-off-white text-xs uppercase tracking-wide text-smv-gray-600">
                <tr>
                  <th scope="col" className="px-4 py-2.5">Utilisateur</th>
                  <th scope="col" className="px-4 py-2.5">Rôle</th>
                  <th scope="col" className="px-4 py-2.5">Centre</th>
                  <th scope="col" className="px-4 py-2.5">Statut</th>
                  <th scope="col" className="px-4 py-2.5">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-smv-gray-100">
                {(data ?? []).map((profile) => (
                  <tr key={profile.id} className="hover:bg-smv-off-white">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-smv-navy">
                        {profile.prenom} {profile.nom}
                      </p>
                      <p className="text-xs text-smv-gray-600">{profile.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={profile.role === 'super_admin' ? 'navy' : 'gray'}
                        label={ROLES.find((r) => r.value === profile.role)?.label ?? profile.role}
                      />
                    </td>
                    <td className="px-4 py-3">{nomCentre(profile)}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => void basculer(profile)}
                        aria-label={profile.actif ? 'Désactiver le compte' : 'Réactiver le compte'}
                      >
                        <Badge
                          variant={profile.actif ? 'green' : 'gray'}
                          label={profile.actif ? 'Actif' : 'Désactivé'}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => void reinitialiser(profile)}
                        aria-label={`Réinitialiser le mot de passe de ${profile.email ?? ''}`}
                        className="inline-flex items-center gap-1 rounded p-1.5 text-smv-navy hover:bg-smv-gray-100"
                      >
                        <KeyRound className="h-4 w-4" aria-hidden="true" />
                        <span className="text-xs font-semibold">Réinitialiser</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {creation ? (
        <CreationModal centres={centres ?? []} onClose={() => setCreation(false)} onSaved={recharger} />
      ) : null}
    </>
  );
}
