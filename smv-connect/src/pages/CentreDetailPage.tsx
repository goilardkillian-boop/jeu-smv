import {
  CalendarClock,
  Clock,
  Facebook,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Users,
  Youtube,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CentreMap } from '../components/centres/CentreMap';
import { CentresProches } from '../components/centres/CentresProches';
import { FormationCard } from '../components/formations/FormationCard';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { PlaceholderBlason } from '../components/ui/PlaceholderImage';
import { Seo } from '../components/ui/Seo';
import { SimpleMarkdown } from '../components/ui/SimpleMarkdown';
import { Skeleton, SkeletonGrid } from '../components/ui/Skeleton';
import { useCentre } from '../hooks/useCentres';
import { useFormationsCentre } from '../hooks/useFormations';
import { categorieParId } from '../lib/constants';
import { cn, telHref } from '../lib/utils';
import type { FormationAvecCentre } from '../types/app.types';
import NotFoundPage from './NotFoundPage';

const RESEAUX = [
  { cle: 'social_facebook', label: 'Facebook', icon: Facebook, base: 'https://www.facebook.com/' },
  { cle: 'social_instagram', label: 'Instagram', icon: Instagram, base: 'https://www.instagram.com/' },
  { cle: 'social_linkedin', label: 'LinkedIn', icon: Linkedin, base: 'https://www.linkedin.com/company/' },
  { cle: 'social_youtube', label: 'YouTube', icon: Youtube, base: 'https://www.youtube.com/@' },
] as const;

export default function CentreDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: centre, chargement, erreur } = useCentre(slug);
  const { data: formations, chargement: chargementFormations } = useFormationsCentre(centre?.id);
  const [categorie, setCategorie] = useState<string | null>(null);

  const formationsAvecCentre: FormationAvecCentre[] = useMemo(() => {
    if (!formations || !centre) return [];
    const lien = {
      id: centre.id,
      slug: centre.slug,
      nom: centre.nom,
      region: centre.region,
      ville: centre.ville,
    };
    const filtrees = categorie ? formations.filter((f) => f.categorie === categorie) : formations;
    return filtrees.map((f) => ({ ...f, centre: lien }));
  }, [formations, centre, categorie]);

  const categoriesPresentes = useMemo(
    () => [...new Set((formations ?? []).map((f) => f.categorie))],
    [formations],
  );

  if (chargement) {
    return (
      <div className="mx-auto max-w-page space-y-6 px-4 py-10">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-32 w-full" />
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
  if (!centre) return <NotFoundPage />;

  const adresseComplete = `${centre.adresse}, ${centre.code_postal} ${centre.ville}`;
  const lienMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresseComplete)}`;
  const reseauxActifs = RESEAUX.filter((r) => centre[r.cle]);

  return (
    <>
      <Seo
        titre={`Centre SMV de ${centre.nom}`}
        description={centre.description_courte ?? `Le centre SMV de ${centre.nom} (${centre.region}) : contact recrutement, formations et candidature.`}
        cheminCanonique={`/centres/${centre.slug}`}
      />

      {/* 1. Hero */}
      <header className="relative overflow-hidden bg-smv-navy">
        <div className="hero-fond absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-page flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant="green" label={centre.region} />
            <h1 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight text-white sm:text-6xl">
              {centre.nom}
            </h1>
            <p className="mt-1 text-lg text-white/85">{centre.nom_regiment}</p>
            {centre.commandant ? (
              <p className="mt-1 text-sm text-white/70">Commandé par {centre.commandant}</p>
            ) : null}
            <div className="mt-5">
              <Button to={`/candidater?centre=${centre.slug}`} size="lg">
                Je candidate
              </Button>
            </div>
          </div>
          {centre.blason_url ? (
            <img src={centre.blason_url} alt={`Blason du centre de ${centre.nom}`} className="h-36 w-32 object-contain" />
          ) : (
            <PlaceholderBlason nom={centre.nom} className="h-36 w-32 shrink-0 self-start sm:self-center" />
          )}
        </div>
      </header>

      <div className="mx-auto max-w-page px-4 pb-16">
        <Breadcrumb items={[{ label: 'Nos centres', to: '/centres' }, { label: centre.nom }]} />

        <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-10">
            {/* 3. Description */}
            {centre.description ? (
              <section aria-labelledby="presentation-titre">
                <h2 id="presentation-titre" className="mb-4 font-display text-3xl font-extrabold uppercase text-smv-navy">
                  Le centre
                </h2>
                <SimpleMarkdown texte={centre.description} />
              </section>
            ) : null}

            {/* 4. Vidéo */}
            {centre.video_youtube ? (
              <section aria-label={`Vidéo de présentation du centre de ${centre.nom}`}>
                <div className="aspect-video overflow-hidden rounded-lg border border-smv-gray-100">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${centre.video_youtube}`}
                    title={`Vidéo du centre SMV de ${centre.nom}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </section>
            ) : null}

            {/* 5. Informations clés */}
            <section aria-labelledby="chiffres-centre">
              <h2 id="chiffres-centre" className="mb-4 font-display text-3xl font-extrabold uppercase text-smv-navy">
                En bref
              </h2>
              <dl className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-smv-off-white p-4 text-center">
                  <Users className="mx-auto h-6 w-6 text-smv-green" aria-hidden="true" />
                  <dd className="mt-1 font-display text-3xl font-extrabold text-smv-navy">
                    {centre.capacite_annuelle ?? '—'}
                  </dd>
                  <dt className="text-xs text-smv-gray-600">jeunes formés par an</dt>
                </div>
                <div className="rounded-lg bg-smv-off-white p-4 text-center">
                  <CalendarClock className="mx-auto h-6 w-6 text-smv-green" aria-hidden="true" />
                  <dd className="mt-1 font-display text-3xl font-extrabold text-smv-navy">2 mois</dd>
                  <dt className="text-xs text-smv-gray-600">entre chaque incorporation</dt>
                </div>
                <div className="rounded-lg bg-smv-off-white p-4 text-center">
                  <GraduationCap className="mx-auto h-6 w-6 text-smv-green" aria-hidden="true" />
                  <dd className="mt-1 font-display text-3xl font-extrabold text-smv-navy">
                    {categoriesPresentes.length || '—'}
                  </dd>
                  <dt className="text-xs text-smv-gray-600">filières représentées ici</dt>
                </div>
              </dl>
            </section>

            {/* 6. Formations du centre */}
            <section aria-labelledby="formations-centre">
              <h2 id="formations-centre" className="mb-4 font-display text-3xl font-extrabold uppercase text-smv-navy">
                Formations proposées
              </h2>
              {categoriesPresentes.length > 1 ? (
                <div className="mb-4 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filtrer par catégorie">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={categorie === null}
                    onClick={() => setCategorie(null)}
                    className={cn(
                      'shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold',
                      categorie === null
                        ? 'border-smv-navy bg-smv-navy text-white'
                        : 'border-smv-gray-300 text-smv-gray-600 hover:border-smv-navy',
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
                        'shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold',
                        categorie === id
                          ? 'border-smv-navy bg-smv-navy text-white'
                          : 'border-smv-gray-300 text-smv-gray-600 hover:border-smv-navy',
                      )}
                    >
                      {categorieParId(id)?.label ?? id}
                    </button>
                  ))}
                </div>
              ) : null}
              {chargementFormations ? (
                <SkeletonGrid nombre={2} />
              ) : formationsAvecCentre.length === 0 ? (
                <Alert type="info">
                  Les formations de ce centre seront bientôt publiées — contacte le recrutement
                  pour connaître les filières ouvertes.
                </Alert>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {formationsAvecCentre.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>
              )}
            </section>

            {/* 7. Mini carte */}
            <section aria-labelledby="acces-titre">
              <h2 id="acces-titre" className="mb-4 font-display text-3xl font-extrabold uppercase text-smv-navy">
                Où nous trouver
              </h2>
              <CentreMap centres={[centre]} cadrage="auto" afficherBassins className="md:h-[360px]" />
            </section>

            {/* 9. Centres proches */}
            <section aria-labelledby="proches-titre">
              <h2 id="proches-titre" className="mb-4 font-display text-3xl font-extrabold uppercase text-smv-navy">
                Centres proches
              </h2>
              <CentresProches centre={centre} />
            </section>
          </div>

          {/* 2. Bloc contact (sidebar) */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="space-y-4 rounded-lg border border-smv-gray-100 bg-white p-5 shadow-md">
              <h2 className="font-display text-xl font-bold uppercase text-smv-navy">Contact recrutement</h2>
              <p className="flex items-start gap-2 text-sm text-smv-gray-900">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                <a href={lienMaps} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {adresseComplete}
                  <span className="block text-xs text-smv-gray-600">Ouvrir dans Google Maps</span>
                </a>
              </p>
              {[centre.telephone_1, centre.telephone_2].filter(Boolean).map((telephone) => (
                <p key={telephone} className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                  <a href={telHref(telephone ?? '')} className="font-semibold text-smv-navy hover:underline">
                    {telephone}
                  </a>
                </p>
              ))}
              <p className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                <a
                  href={`mailto:${centre.email_recrutement}`}
                  className="break-all font-semibold text-smv-navy hover:underline"
                >
                  {centre.email_recrutement}
                </a>
              </p>
              {centre.horaires_recrutement ? (
                <p className="flex items-start gap-2 text-sm text-smv-gray-900">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-smv-green" aria-hidden="true" />
                  {centre.horaires_recrutement}
                </p>
              ) : null}

              {reseauxActifs.length > 0 ? (
                <ul className="flex gap-2 pt-1" aria-label={`Réseaux sociaux du centre de ${centre.nom}`}>
                  {reseauxActifs.map(({ cle, label, icon: Icon, base }) => (
                    <li key={cle}>
                      <a
                        href={`${base}${centre[cle] ?? ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} du centre (nouvelle fenêtre)`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-smv-navy text-white transition-colors hover:bg-smv-green"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* 8. CTA double */}
              <div className="space-y-2 border-t border-smv-gray-100 pt-4">
                <Button to={`/candidater?centre=${centre.slug}`} className="w-full">
                  Je candidate à ce centre
                </Button>
                <Button
                  href={`mailto:${centre.email_recrutement}?subject=${encodeURIComponent('Demande de contact — SMV ' + centre.nom)}&body=${encodeURIComponent('Bonjour,\n\nJe souhaite être recontacté·e au sujet du SMV.\n\nMes coordonnées :\n- Nom :\n- Téléphone :\n- Ville :')}`}
                  variant="secondary"
                  className="w-full"
                >
                  Être contacté par le recruteur
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
