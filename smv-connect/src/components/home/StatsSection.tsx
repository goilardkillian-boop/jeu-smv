import { CHIFFRES_CLES, type ChiffreCle } from '../../lib/constants';
import { useCountUp } from '../../hooks/useCountUp';

function Chiffre({ chiffre }: { chiffre: ChiffreCle }) {
  const { valeur, ref } = useCountUp(chiffre.valeur);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center">
      <span className="font-display text-5xl font-extrabold text-smv-green-light sm:text-6xl">
        {chiffre.prefixe ?? ''}
        {valeur.toLocaleString('fr-FR')}
        {chiffre.suffixe ?? ''}
      </span>
      <span className="max-w-[12rem] text-sm text-white/85">{chiffre.label}</span>
    </div>
  );
}

/** Chiffres clés animés au scroll (counter-up via IntersectionObserver). */
export function StatsSection() {
  return (
    <section id="chiffres-cles" aria-label="Les chiffres clés du SMV" className="bg-smv-navy py-14">
      <div className="mx-auto grid max-w-page grid-cols-2 gap-8 px-4 lg:grid-cols-4">
        {CHIFFRES_CLES.map((chiffre) => (
          <Chiffre key={chiffre.label} chiffre={chiffre} />
        ))}
      </div>
    </section>
  );
}
