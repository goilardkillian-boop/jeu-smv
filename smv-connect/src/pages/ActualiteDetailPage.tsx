import { CalendarDays } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { PlaceholderImage } from '../components/ui/PlaceholderImage';
import { Seo } from '../components/ui/Seo';
import { SimpleMarkdown } from '../components/ui/SimpleMarkdown';
import { Skeleton } from '../components/ui/Skeleton';
import { useActualite } from '../hooks/useActualites';
import { formatDate } from '../lib/utils';
import NotFoundPage from './NotFoundPage';

export default function ActualiteDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: actualite, chargement, erreur } = useActualite(slug);

  if (chargement) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-56 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }
  if (erreur) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Alert type="error">{erreur}</Alert>
      </div>
    );
  }
  if (!actualite) return <NotFoundPage />;

  return (
    <>
      <Seo
        titre={actualite.titre}
        description={actualite.extrait ?? undefined}
        image={actualite.image_url ?? undefined}
        cheminCanonique={`/actualites/${actualite.slug}`}
      />
      <article className="mx-auto max-w-3xl px-4 pb-16">
        <Breadcrumb items={[{ label: 'Actualités', to: '/actualites' }, { label: actualite.titre }]} />

        <header>
          <div className="flex flex-wrap items-center gap-2 text-sm text-smv-gray-600">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-4 w-4 text-smv-green" aria-hidden="true" />
              <time dateTime={actualite.publie_le}>{formatDate(actualite.publie_le)}</time>
            </span>
            {actualite.categorie ? <Badge variant="gray" label={actualite.categorie} /> : null}
            {actualite.centre ? <Badge variant="navy" label={`Centre de ${actualite.centre.nom}`} /> : null}
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-smv-navy sm:text-5xl">
            {actualite.titre}
          </h1>
          {actualite.extrait ? (
            <p className="mt-3 text-lg leading-relaxed text-smv-gray-600">{actualite.extrait}</p>
          ) : null}
        </header>

        <div className="mt-6 overflow-hidden rounded-lg">
          {actualite.image_url ? (
            <img src={actualite.image_url} alt="" className="max-h-96 w-full object-cover" />
          ) : (
            <PlaceholderImage graine={actualite.slug} className="h-56 w-full" />
          )}
        </div>

        <div className="mt-8">
          <SimpleMarkdown texte={actualite.contenu} />
        </div>

        <footer className="mt-10 flex flex-wrap gap-3 border-t border-smv-gray-100 pt-6">
          <Button to="/actualites" variant="ghost">
            Toutes les actualités
          </Button>
          {actualite.centre ? (
            <Button to={`/centres/${actualite.centre.slug}`} variant="secondary">
              Découvrir le centre de {actualite.centre.nom}
            </Button>
          ) : (
            <Button to="/candidater">Je candidate</Button>
          )}
        </footer>
      </article>
    </>
  );
}
