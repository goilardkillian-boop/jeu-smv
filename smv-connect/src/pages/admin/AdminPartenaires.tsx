import { zodResolver } from '@hookform/resolvers/zod';
import { Handshake, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageUploadField } from '../../components/admin/ImageUploadField';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { CheckboxField, InputField } from '../../components/ui/FormField';
import { Loader } from '../../components/ui/Loader';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';
import { Seo } from '../../components/ui/Seo';
import { Skeleton } from '../../components/ui/Skeleton';
import { useAsyncData } from '../../hooks/useAsyncData';
import { useAuth } from '../../hooks/useAuth';
import { TYPES_PARTENAIRE } from '../../lib/constants';
import { partenaireSchema, type PartenaireFormValues } from '../../lib/validators';
import {
  createPartenaire,
  deletePartenaire,
  fetchPartenairesAdmin,
  updatePartenaire,
} from '../../services/partenaires';
import { toast } from '../../store/toastStore';
import type { Partenaire } from '../../types/app.types';

function PartenaireFormModal({
  initiale,
  centreId,
  onClose,
  onSaved,
}: {
  initiale: Partenaire | null;
  centreId: string | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [logoUrl, setLogoUrl] = useState(initiale?.logo_url ?? '');
  const [envoi, setEnvoi] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartenaireFormValues>({
    resolver: zodResolver(partenaireSchema),
    defaultValues: {
      nom: initiale?.nom ?? '',
      site_web: initiale?.site_web ?? '',
      type: initiale?.type ?? null,
      actif: initiale?.actif ?? true,
    } as Partial<PartenaireFormValues>,
  });

  const enregistrer = async (valeurs: PartenaireFormValues) => {
    setEnvoi(true);
    try {
      const payload = {
        centre_id: initiale ? initiale.centre_id : centreId,
        nom: valeurs.nom,
        logo_url: logoUrl || null,
        site_web: valeurs.site_web?.trim() ? valeurs.site_web.trim() : null,
        type: valeurs.type ?? null,
        actif: valeurs.actif,
      };
      if (initiale) {
        await updatePartenaire(initiale.id, payload);
        toast.success('Partenaire mis à jour');
      } else {
        await createPartenaire(payload);
        toast.success('Partenaire ajouté');
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
    <Modal ouvert onClose={onClose} titre={initiale ? 'Modifier le partenaire' : 'Nouveau partenaire'}>
      <form onSubmit={handleSubmit(enregistrer)} noValidate className="space-y-4">
        <InputField label="Nom" requis error={errors.nom?.message} {...register('nom')} />
        <InputField
          label="Site web"
          type="url"
          placeholder="https://…"
          error={errors.site_web?.message}
          {...register('site_web')}
        />
        <Select
          label="Type"
          placeholder="Choisissez…"
          options={TYPES_PARTENAIRE.map((type) => ({ value: type.id, label: type.label }))}
          error={errors.type?.message}
          {...register('type')}
        />
        <ImageUploadField label="Logo" valeur={logoUrl} onChange={setLogoUrl} dossier="partenaires" />
        <CheckboxField label="Partenaire actif (visible sur le site)" {...register('actif')} />
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

export default function AdminPartenaires() {
  const { centreId } = useAuth();
  const { data, chargement, erreur, recharger } = useAsyncData(
    () => fetchPartenairesAdmin(centreId),
    [centreId],
  );
  const [edition, setEdition] = useState<Partenaire | null>(null);
  const [creation, setCreation] = useState(false);

  const supprimer = async (partenaire: Partenaire) => {
    try {
      await deletePartenaire(partenaire.id);
      toast.success('Partenaire supprimé');
      recharger();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Suppression impossible');
    }
  };

  const peutModifier = (partenaire: Partenaire): boolean =>
    centreId === null || partenaire.centre_id === centreId;

  return (
    <>
      <Seo titre="Partenaires — Admin" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy">
            Partenaires
          </h1>
          <p className="mt-1 text-sm text-smv-gray-600">
            Les partenaires nationaux et ceux de ton centre (seuls ces derniers sont modifiables
            par un admin de centre).
          </p>
        </div>
        <Button size="sm" onClick={() => setCreation(true)}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nouveau partenaire
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
          <EmptyState icon={Handshake} titre="Aucun partenaire" />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-smv-gray-100 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-smv-gray-100 bg-smv-off-white text-xs uppercase tracking-wide text-smv-gray-600">
                <tr>
                  <th scope="col" className="px-4 py-2.5">Nom</th>
                  <th scope="col" className="px-4 py-2.5">Type</th>
                  <th scope="col" className="px-4 py-2.5">Portée</th>
                  <th scope="col" className="px-4 py-2.5">Actif</th>
                  <th scope="col" className="px-4 py-2.5">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-smv-gray-100">
                {(data ?? []).map((partenaire) => (
                  <tr key={partenaire.id} className="hover:bg-smv-off-white">
                    <td className="px-4 py-3 font-semibold text-smv-navy">
                      {partenaire.site_web ? (
                        <a href={partenaire.site_web} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {partenaire.nom}
                        </a>
                      ) : (
                        partenaire.nom
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {TYPES_PARTENAIRE.find((t) => t.id === partenaire.type)?.label ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={partenaire.centre_id === null ? 'navy' : 'gray'}
                        label={partenaire.centre_id === null ? 'National' : 'Centre'}
                      />
                    </td>
                    <td className="px-4 py-3">{partenaire.actif ? 'Oui' : 'Non'}</td>
                    <td className="px-4 py-3">
                      {peutModifier(partenaire) ? (
                        <span className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEdition(partenaire)}
                            aria-label={`Modifier ${partenaire.nom}`}
                            className="rounded p-1.5 text-smv-navy hover:bg-smv-gray-100"
                          >
                            <Pencil className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => void supprimer(partenaire)}
                            aria-label={`Supprimer ${partenaire.nom}`}
                            className="rounded p-1.5 text-smv-red hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </span>
                      ) : (
                        <span className="text-xs text-smv-gray-600">Géré au national</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {creation || edition ? (
        <PartenaireFormModal
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
