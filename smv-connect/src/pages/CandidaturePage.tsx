import { CheckCircle2, Copy } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StepContact } from '../components/candidature/StepContact';
import { StepIndicator } from '../components/candidature/StepIndicator';
import { StepProfil } from '../components/candidature/StepProfil';
import { StepProjet } from '../components/candidature/StepProjet';
import { StepValidation } from '../components/candidature/StepValidation';
import { Alert } from '../components/ui/Alert';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Seo } from '../components/ui/Seo';
import { Skeleton } from '../components/ui/Skeleton';
import { useAsyncData } from '../hooks/useAsyncData';
import { useCentres } from '../hooks/useCentres';
import { fetchFormationParSlug, fetchFormationsParCentre } from '../services/formations';
import { soumettreCandidature } from '../services/candidatures';
import { toast } from '../store/toastStore';
import type {
  StepContactValues,
  StepProfilValues,
  StepProjetValues,
} from '../lib/validators';

const ETAPES = ['Profil', 'Mon projet', 'Contact', 'Validation'];
const BROUILLON_KEY = 'smv-candidature-brouillon';

interface Brouillon {
  etape?: number;
  profil?: StepProfilValues;
  projet?: StepProjetValues;
  contact?: StepContactValues;
}

function chargerBrouillon(): Brouillon {
  try {
    const brut = sessionStorage.getItem(BROUILLON_KEY);
    return brut ? (JSON.parse(brut) as Brouillon) : {};
  } catch {
    return {};
  }
}

function sauverBrouillon(brouillon: Brouillon): void {
  try {
    sessionStorage.setItem(BROUILLON_KEY, JSON.stringify(brouillon));
  } catch {
    // stockage indisponible : la progression reste en mémoire
  }
}

export default function CandidaturePage() {
  const { data: centres, chargement: chargementCentres } = useCentres();
  const [searchParams] = useSearchParams();

  const [brouillon, setBrouillon] = useState<Brouillon>(() => chargerBrouillon());
  const [etape, setEtape] = useState(() => chargerBrouillon().etape ?? 0);
  const [envoi, setEnvoi] = useState(false);
  const [erreurEnvoi, setErreurEnvoi] = useState<string | null>(null);
  const [numeroDossier, setNumeroDossier] = useState<string | null>(null);

  // Pré-remplissage depuis l'URL (?centre=slug&formation=slug).
  useEffect(() => {
    const centreSlug = searchParams.get('centre');
    const formationSlug = searchParams.get('formation');
    if ((!centreSlug && !formationSlug) || brouillon.projet?.centre_id) return;
    if (!centres) return;

    const appliquer = async () => {
      let centreId = centres.find((c) => c.slug === centreSlug)?.id ?? '';
      let formationId = '';
      let type: StepProjetValues['type_volontaire'] | undefined;
      if (formationSlug) {
        const formation = await fetchFormationParSlug(formationSlug);
        if (formation) {
          formationId = formation.id;
          centreId = formation.centre_id;
          type = formation.public_vise === 'Volontaire expert' ? 'expert' : 'stagiaire';
        }
      }
      if (!centreId && !formationId) return;
      setBrouillon((precedent) => {
        const projet: StepProjetValues = {
          type_volontaire: precedent.projet?.type_volontaire ?? type ?? 'stagiaire',
          centre_id: centreId,
          formation_id: formationId || undefined,
          date_incorporation_souhaitee: undefined,
        };
        const suivant = { ...precedent, projet };
        sauverBrouillon(suivant);
        return suivant;
      });
    };
    void appliquer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centres, searchParams]);

  const majBrouillon = (maj: Partial<Brouillon>, prochaineEtape: number) => {
    setBrouillon((precedent) => {
      const suivant = { ...precedent, ...maj, etape: prochaineEtape };
      sauverBrouillon(suivant);
      return suivant;
    });
    setEtape(prochaineEtape);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const centreChoisi = useMemo(
    () => centres?.find((c) => c.id === brouillon.projet?.centre_id) ?? null,
    [centres, brouillon.projet?.centre_id],
  );

  const { data: formationsCentre } = useAsyncData(
    () =>
      brouillon.projet?.centre_id
        ? fetchFormationsParCentre(brouillon.projet.centre_id)
        : Promise.resolve([]),
    [brouillon.projet?.centre_id],
  );
  const formationChoisie = useMemo(
    () => formationsCentre?.find((f) => f.id === brouillon.projet?.formation_id) ?? null,
    [formationsCentre, brouillon.projet?.formation_id],
  );

  const envoyer = async () => {
    const { profil, projet, contact } = brouillon;
    if (!profil || !projet || !contact) return;
    setEnvoi(true);
    setErreurEnvoi(null);
    try {
      const { numeroDossier: numero } = await soumettreCandidature({
        centre_id: projet.centre_id,
        formation_id: projet.formation_id || null,
        nom: profil.nom,
        prenom: profil.prenom,
        email: contact.email,
        telephone: contact.telephone,
        date_naissance: profil.date_naissance,
        adresse: contact.adresse,
        ville_residence: contact.ville_residence,
        code_postal: contact.code_postal,
        nationalite_francaise: profil.nationalite_francaise === 'oui',
        situation_handicap: profil.situation_handicap === 'oui',
        situation_actuelle: profil.situation_actuelle,
        type_volontaire: projet.type_volontaire,
        niveau_etudes: profil.niveau_etudes,
        date_incorporation_souhaitee: projet.date_incorporation_souhaitee || null,
        source_connaissance: contact.source_connaissance,
        message: contact.message || null,
      });
      sessionStorage.removeItem(BROUILLON_KEY);
      setNumeroDossier(numero);
      toast.success('Ta candidature a bien été envoyée !');
      window.scrollTo({ top: 0 });
    } catch (e) {
      const message = e instanceof Error ? e.message : "L'envoi a échoué, réessaie dans un instant";
      setErreurEnvoi(message);
      toast.error(message);
    } finally {
      setEnvoi(false);
    }
  };

  if (numeroDossier) {
    return (
      <>
        <Seo titre="Candidature envoyée" cheminCanonique="/candidater" />
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-smv-green" aria-hidden="true" />
          <h1 className="mt-4 font-display text-4xl font-extrabold uppercase text-smv-navy">
            Candidature envoyée !
          </h1>
          <p className="mt-3 text-smv-gray-900">
            Ton dossier a bien été transmis au centre SMV{centreChoisi ? ` de ${centreChoisi.nom}` : ''}.
            Le recruteur te recontactera sous quelques jours par téléphone ou par email.
          </p>
          <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-lg border-2 border-dashed border-smv-green bg-smv-green-light/15 px-6 py-4">
            <div className="text-left">
              <p className="text-xs uppercase tracking-wide text-smv-gray-600">Numéro de dossier</p>
              <p className="font-display text-2xl font-extrabold text-smv-navy">{numeroDossier}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                void navigator.clipboard?.writeText(numeroDossier).then(() => toast.info('Numéro copié !'));
              }}
              aria-label="Copier le numéro de dossier"
              className="rounded-md p-2 text-smv-navy hover:bg-white"
            >
              <Copy className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-4 text-sm text-smv-gray-600">
            Garde ce numéro précieusement : il te sera demandé lors de tes échanges avec le centre.
            Un email de confirmation t'a été envoyé.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/" variant="secondary">
              Retour à l'accueil
            </Button>
            <Button to="/formations" variant="ghost">
              Voir d'autres formations
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo
        titre="Je candidate au SMV"
        description="Dépose ta candidature au Service Militaire Volontaire en 4 étapes : profil, projet, contact, validation. Réponse du recruteur sous quelques jours."
        cheminCanonique="/candidater"
      />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <Breadcrumb items={[{ label: 'Je candidate' }]} />
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy sm:text-5xl">
          Je candidate
        </h1>
        <p className="mt-2 text-smv-gray-600">
          4 étapes, moins de 5 minutes. Ta progression est sauvegardée automatiquement sur cet
          appareil.
        </p>

        <div className="mt-8">
          <StepIndicator etapes={ETAPES} courante={etape} />
        </div>

        <div className="mt-8 rounded-lg border border-smv-gray-100 bg-white p-5 shadow-md sm:p-8">
          {erreurEnvoi ? (
            <Alert type="error" className="mb-5">
              {erreurEnvoi}
            </Alert>
          ) : null}

          {etape === 0 ? (
            <StepProfil
              defaut={brouillon.profil}
              onSubmit={(profil) => majBrouillon({ profil }, 1)}
            />
          ) : null}

          {etape === 1 ? (
            chargementCentres ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <StepProjet
                defaut={brouillon.projet}
                profil={brouillon.profil}
                centres={centres ?? []}
                onSubmit={(projet) => majBrouillon({ projet }, 2)}
                onBack={() => majBrouillon({}, 0)}
              />
            )
          ) : null}

          {etape === 2 ? (
            <StepContact
              defaut={brouillon.contact}
              onSubmit={(contact) => majBrouillon({ contact }, 3)}
              onBack={() => majBrouillon({}, 1)}
            />
          ) : null}

          {etape === 3 && brouillon.profil && brouillon.projet && brouillon.contact ? (
            <StepValidation
              valeurs={{ ...brouillon.profil, ...brouillon.projet, ...brouillon.contact }}
              nomCentre={centreChoisi?.nom ?? 'Centre SMV'}
              titreFormation={formationChoisie?.titre ?? null}
              envoi={envoi}
              onSubmit={() => void envoyer()}
              onBack={() => majBrouillon({}, 2)}
              onEdit={(cible) => majBrouillon({}, cible)}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
