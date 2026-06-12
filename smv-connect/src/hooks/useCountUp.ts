import { useEffect, useRef, useState } from 'react';

/**
 * Compteur animé : démarre quand l'élément entre dans le viewport
 * (IntersectionObserver, une seule fois) et monte jusqu'à `cible`.
 */
export function useCountUp(cible: number, dureeMs = 1500): {
  valeur: number;
  ref: (node: HTMLElement | null) => void;
} {
  const [valeur, setValeur] = useState(0);
  const [element, setElement] = useState<HTMLElement | null>(null);
  const lance = useRef(false);

  useEffect(() => {
    if (!element || lance.current) return;

    const observer = new IntersectionObserver(
      (entrees) => {
        const entree = entrees[0];
        if (!entree?.isIntersecting || lance.current) return;
        lance.current = true;
        observer.disconnect();

        const debut = performance.now();
        const animer = (maintenant: number) => {
          const progression = Math.min((maintenant - debut) / dureeMs, 1);
          // easing easeOutCubic
          const facteur = 1 - (1 - progression) ** 3;
          setValeur(Math.round(cible * facteur));
          if (progression < 1) requestAnimationFrame(animer);
        };
        requestAnimationFrame(animer);
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, cible, dureeMs]);

  return { valeur, ref: setElement };
}
