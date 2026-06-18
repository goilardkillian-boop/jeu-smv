import { useAsyncData } from '../../hooks/useAsyncData';
import { fetchPartenairesActifs } from '../../services/partenaires';
import type { Partenaire } from '../../types/app.types';

function LogoPartenaire({ partenaire }: { partenaire: Partenaire }) {
  const initiales = partenaire.nom
    .split(/\s+/)
    .slice(0, 2)
    .map((mot) => (mot[0] ?? '').toUpperCase())
    .join('');

  const contenu = (
    <span className="flex items-center gap-3 rounded-md border border-smv-gray-100 bg-white px-5 py-3 shadow-sm">
      {partenaire.logo_url ? (
        <img src={partenaire.logo_url} alt="" loading="lazy" className="h-9 w-9 object-contain" />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-smv-navy font-display text-sm font-bold text-white"
        >
          {initiales}
        </span>
      )}
      <span className="whitespace-nowrap text-sm font-semibold text-smv-gray-900">{partenaire.nom}</span>
    </span>
  );

  return partenaire.site_web ? (
    <a
      href={partenaire.site_web}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${partenaire.nom} (nouvelle fenêtre)`}
      className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-smv-navy"
    >
      {contenu}
    </a>
  ) : (
    contenu
  );
}

/** Carrousel auto-défilant des partenaires nationaux. */
export function PartenairesSection() {
  const { data: partenaires } = useAsyncData(() => fetchPartenairesActifs(), []);

  if (!partenaires || partenaires.length === 0) return null;
  const boucle = [...partenaires, ...partenaires];

  return (
    <section aria-labelledby="partenaires-titre" className="border-t border-smv-gray-100 bg-smv-off-white py-12">
      <div className="mx-auto max-w-page px-4">
        <h2
          id="partenaires-titre"
          className="text-center font-display text-2xl font-bold uppercase tracking-tight text-smv-gray-600"
        >
          Ils sont partenaires du SMV
        </h2>
      </div>
      <div className="mt-6 overflow-hidden" aria-hidden="false">
        <ul className="flex w-max gap-4 animate-marquee px-4 hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
          {boucle.map((partenaire, i) => (
            <li key={`${partenaire.id}-${i}`} aria-hidden={i >= partenaires.length}>
              <LogoPartenaire partenaire={partenaire} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
