import { BadgeCheck, Briefcase, CalendarDays, Clock, MapPin, Users } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { PlaceholderImage } from '../components/ui/PlaceholderImage';
import { Seo } from '../components/ui/Seo';
import { SimpleMarkdown } from '../components/ui/SimpleMarkdown';
import { Skeleton } from '../components/ui/Skeleton';
import { Tag } from '../components/ui/Tag';
import { useFormation } from '../hooks/useFormations';
import { categorieParId } from '../lib/constants';
import { prochaineIncorporation } from '../lib/utils';
import NotFoundPage from './NotFoundPage';

export default function FormationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: formation, chargement, erreur } = useFormation(slug);

  if (chargement) {
    return (
      <div className="mx-auto max-w-page space-y-6 px-4 py-10">
        <Skeleton className="h-56 w-full" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }
  if (erreur) {
    return (
      <div className="mx-auto max-w-page px-4 py-10">
        <Alert type="error">{erreur}</Alert>
      </div>
    );
  }
  if (!formation) return <NotFoundPage />;

  const categorie = categorieParId(formation.categorie);
  const estExpert = formation.public_vise === 'Volontaire expert';
  const prochaine = prochaineIncorporation(formation.dates_incorporation);
  const lienCandidature = `/candidater?centre=${formation.centre?.slug ?? ''}&formation=${formation.slug}`;

  return (
    <>
      <Seo
        titre={formation.titre}
        description={`Formation ${formation.titre} au centre SMV de ${formation.centre?.nom ?? ''} : ${formation.duree_mois} mois, ${formation.public_vise}. Candidate en ligne.`}
        cheminCanonique={`/formations/${formation.slug}`}
      />
      <div className="mx-auto max-w-page px-4 pb-16">
        <Breadcrumb
          items={[{ label: 'Formations', to: '/formations' }, { label: formation.titre }]}
        />

        <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div>
            <div className="relative overflow-hidden rounded-lg">
              {formation.image_url ? (
                <img src={formation.image_url} alt="" className="h-64 w-full object-cover" />
              ) : (
                <PlaceholderImage
                  categorie={formation.categorie}
                  graine={formation.slug}
                  className="h-64 w-full"
                />
              )}
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <Badge label={categorie?.label ?? formation.categorie} className={categorie?.badgeClasses} />
                <Badge
                  variant={estExpert ? 'navy' : 'green'}
                  label={formation.public_vise}
                />
              </div>
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy">
              {formation.titre}
            </h1>

            {formation.centre ? (
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-smv-gray-600">
                <MapPin className="h-4 w-4 text-smv-green" aria-hidden="true" />
                Formation dispensée au{' '}
                <Button to={`/centres/${formation.centre.slug}`} variant="ghost" size="sm">
                  Centre SMV de {formation.centre.nom}
                </Button>
              </p>
            ) : null}

            {formation.description ? (
              <section aria-labelledby="prog-titre" className="mt-8">
                <h2 id="prog-titre" className="mb-3 font-display text-2xl font-bold uppercase text-smv-navy">
                  La formation
                </h2>
                <SimpleMarkdown texte={formation.description} />
              </section>
            ) : null}

            {formation.debouches && formation.debouches.length > 0 ? (
              <section aria-labelledby="debouches-titre" className="mt-8">
                <h2 id="debouches-titre" className="mb-3 font-display text-2xl font-bold uppercase text-smv-navy">
                  Débouchés
                </h2>
                <ul className="space-y-2">
                  {formation.debouches.map((debouche) => (
                    <li key={debouche} className="flex items-center gap-2 text-sm text-smv-gray-900">
                      <Briefcase className="h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                      {debouche}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {formation.certifications && formation.certifications.length > 0 ? (
              <section aria-labelledby="certifs-titre" className="mt-8">
                <h2 id="certifs-titre" className="mb-3 font-display text-2xl font-bold uppercase text-smv-navy">
                  Certifications obtenues
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {formation.certifications.map((certification) => (
                    <li key={certification}>
                      <Tag label={certification} tone="green" />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="space-y-4 rounded-lg border border-smv-gray-100 bg-white p-5 shadow-md">
              <h2 className="font-display text-xl font-bold uppercase text-smv-navy">Infos pratiques</h2>
              <ul className="space-y-3 text-sm text-smv-gray-900">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                  Durée : <strong>{formation.duree_mois} mois</strong>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                  Public : <strong>{formation.public_vise}</strong>
                </li>
                {formation.places_disponibles !== null ? (
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                    {formation.places_disponibles} places disponibles
                  </li>
                ) : null}
              </ul>

              {formation.dates_incorporation && formation.dates_incorporation.length > 0 ? (
                <div className="border-t border-smv-gray-100 pt-4">
                  <p className="mb-2 flex items-center gap-2 text-sm font-bold text-smv-navy">
                    <CalendarDays className="h-4 w-4 text-smv-green" aria-hidden="true" />
                    Prochaines incorporations
                  </p>
                  <ul className="space-y-1.5">
                    {formation.dates_incorporation.map((date) => (
                      <li
                        key={date}
                        className={
                          prochaine?.label === date
                            ? 'rounded-md bg-smv-green-light/30 px-3 py-1.5 text-sm font-bold text-green-900'
                            : 'px-3 py-1.5 text-sm text-smv-gray-900'
                        }
                      >
                        {date}
                        {prochaine?.label === date ? ' — prochaine rentrée' : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="border-t border-smv-gray-100 pt-4">
                <Button to={lienCandidature} size="lg" className="w-full">
                  Je candidate
                </Button>
                <p className="mt-2 text-center text-xs text-smv-gray-600">
                  Gratuit — réponse du recruteur sous quelques jours
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
