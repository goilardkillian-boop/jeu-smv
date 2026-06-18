import { useMemo, useState } from 'react';
import { useFormations } from '../../hooks/useFormations';
import { categorieParId } from '../../lib/constants';
import { cn } from '../../lib/utils';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { SkeletonGrid } from '../ui/Skeleton';
import { FormationCard } from '../formations/FormationCard';

/** Aperçu des formations sur l'accueil : 6 cards filtrables par catégorie. */
export function FormationsPreview() {
  const { data: formations, chargement, erreur } = useFormations();
  const [categorie, setCategorie] = useState<string | null>(null);

  const categoriesPresentes = useMemo(() => {
    if (!formations) return [];
    return [...new Set(formations.map((f) => f.categorie))];
  }, [formations]);

  const visibles = useMemo(() => {
    if (!formations) return [];
    const filtrees = categorie ? formations.filter((f) => f.categorie === categorie) : formations;
    return [...filtrees]
      .sort((a, b) => b.created_at.localeCompare(a.created_at) || a.titre.localeCompare(b.titre, 'fr'))
      .slice(0, 6);
  }, [formations, categorie]);

  return (
    <section aria-labelledby="formations-titre" className="bg-white py-16">
      <div className="mx-auto max-w-page px-4">
        <h2
          id="formations-titre"
          className="text-center font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy"
        >
          Nos formations
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-smv-gray-600">
          Des filières choisies avec les entreprises qui recrutent, partout en France.
        </p>

        <div
          role="tablist"
          aria-label="Filtrer par catégorie"
          className="mt-8 flex gap-2 overflow-x-auto pb-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={categorie === null}
            onClick={() => setCategorie(null)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors',
              categorie === null
                ? 'border-smv-navy bg-smv-navy text-white'
                : 'border-smv-gray-300 text-smv-gray-600 hover:border-smv-navy hover:text-smv-navy',
            )}
          >
            Toutes
          </button>
          {categoriesPresentes.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={categorie === id}
              onClick={() => setCategorie(categorie === id ? null : id)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors',
                categorie === id
                  ? 'border-smv-navy bg-smv-navy text-white'
                  : 'border-smv-gray-300 text-smv-gray-600 hover:border-smv-navy hover:text-smv-navy',
              )}
            >
              {categorieParId(id)?.label ?? id}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {chargement ? (
            <SkeletonGrid nombre={6} />
          ) : erreur ? (
            <Alert type="error">{erreur}</Alert>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibles.map((formation) => (
                <FormationCard key={formation.id} formation={formation} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Button to="/formations" variant="secondary" size="lg">
            Voir toutes les formations
          </Button>
        </div>
      </div>
    </section>
  );
}
