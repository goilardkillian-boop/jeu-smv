import { useEffect } from 'react';
import { SITE_NAME } from '../../lib/constants';

export interface SeoProps {
  titre: string;
  description?: string;
  image?: string;
  /** Chemin canonique (ex. `/centres/la-rochelle`). */
  cheminCanonique?: string;
}

function definirMeta(attribut: 'name' | 'property', cle: string, contenu: string): void {
  let balise = document.head.querySelector<HTMLMetaElement>(`meta[${attribut}="${cle}"]`);
  if (!balise) {
    balise = document.createElement('meta');
    balise.setAttribute(attribut, cle);
    document.head.appendChild(balise);
  }
  balise.setAttribute('content', contenu);
}

/** Méta-tags par page (titre, description, Open Graph, canonical). */
export function Seo({ titre, description, image, cheminCanonique }: SeoProps) {
  useEffect(() => {
    const titreComplet = `${titre} | ${SITE_NAME}`;
    document.title = titreComplet;
    definirMeta('property', 'og:title', titreComplet);
    definirMeta('property', 'og:type', 'website');
    if (description) {
      definirMeta('name', 'description', description);
      definirMeta('property', 'og:description', description);
    }
    if (image) definirMeta('property', 'og:image', image);

    if (cheminCanonique) {
      let lien = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!lien) {
        lien = document.createElement('link');
        lien.rel = 'canonical';
        document.head.appendChild(lien);
      }
      lien.href = `${window.location.origin}${cheminCanonique}`;
    }
  }, [titre, description, image, cheminCanonique]);

  return null;
}
