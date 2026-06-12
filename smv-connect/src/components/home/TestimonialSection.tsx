import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState } from 'react';
import { useAsyncData } from '../../hooks/useAsyncData';
import { fetchTemoignagesPublies } from '../../services/temoignages';
import { Skeleton } from '../ui/Skeleton';

/** Carrousel de témoignages de volontaires (un à la fois, flèches). */
export function TestimonialSection() {
  const { data: temoignages, chargement } = useAsyncData(() => fetchTemoignagesPublies(), []);
  const [index, setIndex] = useState(0);

  if (chargement) {
    return (
      <section className="bg-smv-navy/5 py-16" aria-busy="true">
        <div className="mx-auto max-w-3xl space-y-4 px-4">
          <Skeleton className="mx-auto h-16 w-16 rounded-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="mx-auto h-4 w-48" />
        </div>
      </section>
    );
  }
  if (!temoignages || temoignages.length === 0) return null;

  const actuel = temoignages[((index % temoignages.length) + temoignages.length) % temoignages.length];
  if (!actuel) return null;

  return (
    <section aria-labelledby="temoignages-titre" className="bg-smv-navy/5 py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2
          id="temoignages-titre"
          className="font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy"
        >
          Ils l'ont vécu
        </h2>

        <div className="relative mt-8 rounded-lg bg-white p-6 shadow-md sm:p-10" aria-live="polite">
          <Quote className="mx-auto h-8 w-8 text-smv-green" aria-hidden="true" />

          {actuel.photo_url ? (
            <img
              src={actuel.photo_url}
              alt=""
              className="mx-auto mt-4 h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-smv-navy font-display text-2xl font-bold text-white"
            >
              {actuel.prenom[0] ?? 'S'}
            </span>
          )}

          <blockquote className="mt-4 text-base leading-relaxed text-smv-gray-900 sm:text-lg">
            « {actuel.texte} »
          </blockquote>
          <p className="mt-4 font-display text-xl font-bold uppercase text-smv-navy">{actuel.prenom}</p>
          <p className="text-sm text-smv-gray-600">
            {[actuel.formation, actuel.promotion].filter(Boolean).join(' — ')}
          </p>

          {temoignages.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => setIndex(index - 1)}
                aria-label="Témoignage précédent"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-smv-gray-300 bg-white p-2 text-smv-navy shadow hover:bg-smv-off-white sm:-left-5"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIndex(index + 1)}
                aria-label="Témoignage suivant"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-smv-gray-300 bg-white p-2 text-smv-navy shadow hover:bg-smv-off-white sm:-right-5"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          ) : null}
        </div>

        {temoignages.length > 1 ? (
          <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
            {temoignages.map((temoignage, i) => (
              <span
                key={temoignage.id}
                className={
                  i === ((index % temoignages.length) + temoignages.length) % temoignages.length
                    ? 'h-2 w-6 rounded-full bg-smv-green'
                    : 'h-2 w-2 rounded-full bg-smv-gray-300'
                }
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
