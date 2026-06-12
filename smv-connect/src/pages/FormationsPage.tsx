import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FILTRES_INITIAUX,
  FormationFilters,
  type FiltresFormations,
  type TriFormations,
} from '../components/formations/FormationFilters';
import { FormationGrid } from '../components/formations/FormationGrid';
import { Alert } from '../components/ui/Alert';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Seo } from '../components/ui/Seo';
import { SkeletonGrid } from '../components/ui/Skeleton';
import { useCentres } from '../hooks/useCentres';
import { useFormations } from '../hooks/useFormations';
import { prochaineIncorporation } from '../lib/utils';
import type { FormationAvecCentre } from '../types/app.types';

function lireFiltres(params: URLSearchParams): FiltresFormations {
  const tri = params.get('tri');
  return {
    q: params.get('q') ?? '',
    categories: params.getAll('categorie'),
    centres: params.getAll('centre'),
    type: params.get('type') === 'expert' ? 'expert' : params.get('type') === 'stagiaire' ? 'stagiaire' : '',
    tri: tri === 'duree' || tri === 'alpha' ? (tri as TriFormations) : 'incorporation',
  };
}

function ecrireFiltres(filtres: FiltresFormations): URLSearchParams {
  const params = new URLSearchParams();
  if (filtres.q) params.set('q', filtres.q);
  filtres.categories.forEach((c) => params.append('categorie', c));
  filtres.centres.forEach((c) => params.append('centre', c));
  if (filtres.type) params.set('type', filtres.type);
  if (filtres.tri !== 'incorporation') params.set('tri', filtres.tri);
  return params;
}

function trier(formations: FormationAvecCentre[], tri: TriFormations): FormationAvecCentre[] {
  const copie = [...formations];
  if (tri === 'alpha') return copie.sort((a, b) => a.titre.localeCompare(b.titre, 'fr'));
  if (tri === 'duree') return copie.sort((a, b) => a.duree_mois - b.duree_mois || a.titre.localeCompare(b.titre, 'fr'));
  return copie.sort((a, b) => {
    const dateA = prochaineIncorporation(a.dates_incorporation)?.date.getTime() ?? Number.MAX_SAFE_INTEGER;
    const dateB = prochaineIncorporation(b.dates_incorporation)?.date.getTime() ?? Number.MAX_SAFE_INTEGER;
    return dateA - dateB || a.titre.localeCompare(b.titre, 'fr');
  });
}

export default function FormationsPage() {
  const { data: formations, chargement, erreur } = useFormations();
  const { data: centres } = useCentres();
  const [searchParams, setSearchParams] = useSearchParams();

  const filtres = useMemo(() => lireFiltres(searchParams), [searchParams]);
  const setFiltres = useCallback(
    (nouveaux: FiltresFormations) => setSearchParams(ecrireFiltres(nouveaux), { replace: true }),
    [setSearchParams],
  );

  const resultats = useMemo(() => {
    if (!formations) return [];
    const q = filtres.q.trim().toLowerCase();
    const publicVise =
      filtres.type === 'expert'
        ? 'Volontaire expert'
        : filtres.type === 'stagiaire'
          ? 'Volontaire stagiaire'
          : null;
    const filtrees = formations.filter((formation) => {
      if (q && !formation.titre.toLowerCase().includes(q)) return false;
      if (filtres.categories.length > 0 && !filtres.categories.includes(formation.categorie)) return false;
      if (filtres.centres.length > 0 && !filtres.centres.includes(formation.centre_id)) return false;
      if (publicVise && formation.public_vise !== publicVise) return false;
      return true;
    });
    return trier(filtrees, filtres.tri);
  }, [formations, filtres]);

  return (
    <>
      <Seo
        titre="Nos métiers et formations"
        description="Catalogue des formations professionnelles du Service Militaire Volontaire : transport, bâtiment, sécurité, restauration… Filtre par centre, catégorie et type de volontariat."
        cheminCanonique="/formations"
      />
      <div className="mx-auto max-w-page px-4 pb-16">
        <Breadcrumb items={[{ label: 'Formations' }]} />
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy sm:text-5xl">
          Nos métiers, nos formations
        </h1>
        <p className="mt-2 max-w-2xl text-smv-gray-600">
          Toutes nos filières sont construites avec les entreprises qui recrutent. Trouve la
          tienne et candidate en quelques minutes.
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[280px,1fr]">
          <FormationFilters
            filtres={filtres}
            onChange={setFiltres}
            centres={centres ?? []}
            nbResultats={resultats.length}
          />
          <div>
            {chargement ? (
              <SkeletonGrid nombre={6} />
            ) : erreur ? (
              <Alert type="error">{erreur}</Alert>
            ) : (
              <FormationGrid formations={resultats} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { FILTRES_INITIAUX };
