import { Newspaper } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ActualiteCard } from '../components/actualites/ActualiteCard';
import { Alert } from '../components/ui/Alert';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { EmptyState } from '../components/ui/EmptyState';
import { Pagination } from '../components/ui/Pagination';
import { Seo } from '../components/ui/Seo';
import { SkeletonGrid } from '../components/ui/Skeleton';
import { useActualites } from '../hooks/useActualites';
import { CATEGORIES_ACTUALITE } from '../lib/constants';
import { cn } from '../lib/utils';

const PAR_PAGE = 9;

export default function ActualitesPage() {
  const { data: actualites, chargement, erreur } = useActualites();
  const [categorie, setCategorie] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtrees = useMemo(() => {
    if (!actualites) return [];
    return categorie ? actualites.filter((a) => a.categorie === categorie) : actualites;
  }, [actualites, categorie]);

  const pageCourante = Math.min(page, Math.max(1, Math.ceil(filtrees.length / PAR_PAGE)));
  const visibles = filtrees.slice((pageCourante - 1) * PAR_PAGE, pageCourante * PAR_PAGE);

  return (
    <>
      <Seo
        titre="Actualités"
        description="Toute l'actualité du Service Militaire Volontaire et de ses centres : recrutements, événements, vie des centres et partenariats."
        cheminCanonique="/actualites"
      />
      <div className="mx-auto max-w-page px-4 pb-16">
        <Breadcrumb items={[{ label: 'Actualités' }]} />
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy sm:text-5xl">
          Actualités
        </h1>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filtrer par catégorie">
          <button
            type="button"
            role="tab"
            aria-selected={categorie === null}
            onClick={() => {
              setCategorie(null);
              setPage(1);
            }}
            className={cn(
              'shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold',
              categorie === null
                ? 'border-smv-navy bg-smv-navy text-white'
                : 'border-smv-gray-300 text-smv-gray-600 hover:border-smv-navy',
            )}
          >
            Toutes
          </button>
          {CATEGORIES_ACTUALITE.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={categorie === id}
              onClick={() => {
                setCategorie(categorie === id ? null : id);
                setPage(1);
              }}
              className={cn(
                'shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold',
                categorie === id
                  ? 'border-smv-navy bg-smv-navy text-white'
                  : 'border-smv-gray-300 text-smv-gray-600 hover:border-smv-navy',
              )}
            >
              {id}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {chargement ? (
            <SkeletonGrid nombre={6} />
          ) : erreur ? (
            <Alert type="error">{erreur}</Alert>
          ) : visibles.length === 0 ? (
            <EmptyState
              icon={Newspaper}
              titre="Aucune actualité"
              description="Aucun article publié dans cette catégorie pour le moment."
            />
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibles.map((actualite) => (
                  <ActualiteCard key={actualite.id} actualite={actualite} />
                ))}
              </div>
              <Pagination
                total={filtrees.length}
                page={pageCourante}
                parPage={PAR_PAGE}
                onChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
