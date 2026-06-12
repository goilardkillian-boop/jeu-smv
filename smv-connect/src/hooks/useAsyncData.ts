import { useCallback, useEffect, useRef, useState } from 'react';

export interface AsyncDataState<T> {
  data: T | null;
  chargement: boolean;
  erreur: string | null;
  recharger: () => void;
}

/**
 * Hook générique de chargement asynchrone : gère chargement / erreur /
 * rechargement et ignore les réponses obsolètes (changement de deps).
 */
export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  deps: ReadonlyArray<unknown> = [],
): AsyncDataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let actif = true;
    setChargement(true);
    setErreur(null);
    fetcherRef
      .current()
      .then((resultat) => {
        if (actif) setData(resultat);
      })
      .catch((e: unknown) => {
        if (actif) setErreur(e instanceof Error ? e.message : 'Une erreur est survenue');
      })
      .finally(() => {
        if (actif) setChargement(false);
      });
    return () => {
      actif = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, version]);

  const recharger = useCallback(() => setVersion((v) => v + 1), []);

  return { data, chargement, erreur, recharger };
}
