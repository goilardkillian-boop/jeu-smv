import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CENTRE_FRANCE, RAYON_BASSIN_KM, ZOOM_FRANCE } from '../../lib/constants';
import { cn } from '../../lib/utils';
import type { Centre, GeoOrigin } from '../../types/app.types';

const PIN_CENTRE = `
<svg viewBox="0 0 34 44" width="34" height="44" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 1C8.7 1 2 7.7 2 16c0 10.5 13.2 25.4 14.4 26.7a1 1 0 0 0 1.4 0C18.8 41.4 32 26.5 32 16 32 7.7 25.3 1 17 1Z"
        fill="#2D3E73" stroke="#FFFFFF" stroke-width="1.5"/>
  <circle cx="17" cy="16" r="7" fill="#3DA435"/>
</svg>`;

const PIN_UTILISATEUR = `
<svg viewBox="0 0 28 28" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
  <circle cx="14" cy="14" r="9" fill="#1d6fd8" stroke="#FFFFFF" stroke-width="3"/>
  <circle cx="14" cy="14" r="13" fill="#1d6fd8" opacity="0.2"/>
</svg>`;

function echapperHtml(texte: string): string {
  return texte
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function contenuPopup(centre: Centre): string {
  const telephone = centre.telephone_1
    ? `<a href="tel:${centre.telephone_1.replace(/\s/g, '')}">${echapperHtml(centre.telephone_1)}</a>`
    : '';
  return `
    <div class="smv-popup">
      <p class="smv-popup-nom">${echapperHtml(centre.nom)}</p>
      <p class="smv-popup-meta">${echapperHtml(centre.nom_regiment ?? '')} — ${echapperHtml(centre.region)}</p>
      ${telephone ? `<p class="smv-popup-ligne">${telephone}</p>` : ''}
      <p class="smv-popup-ligne"><a href="mailto:${echapperHtml(centre.email_recrutement)}">${echapperHtml(centre.email_recrutement)}</a></p>
      <a href="/centres/${echapperHtml(centre.slug)}" data-centre-lien="${echapperHtml(centre.slug)}" class="smv-popup-cta">Voir le centre</a>
    </div>`;
}

export interface CentreMapProps {
  centres: Centre[];
  /** Position de l'utilisateur (marqueur bleu). */
  origine?: GeoOrigin | null;
  /** Cercles de bassin de recrutement (200 km). */
  afficherBassins?: boolean;
  /** `france` : vue nationale fixe ; `auto` : ajuste aux marqueurs. */
  cadrage?: 'france' | 'auto';
  className?: string;
}

/** Carte Leaflet + OpenStreetMap avec marqueurs SMV personnalisés. */
export function CentreMap({
  centres,
  origine = null,
  afficherBassins = false,
  cadrage = 'france',
  className,
}: CentreMapProps) {
  const conteneurRef = useRef<HTMLDivElement>(null);
  const carteRef = useRef<L.Map | null>(null);
  const calquesRef = useRef<L.LayerGroup | null>(null);
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  // Création de la carte (une seule fois).
  useEffect(() => {
    const conteneur = conteneurRef.current;
    if (!conteneur || carteRef.current) return;

    const carte = L.map(conteneur, { scrollWheelZoom: false, zoomControl: true });
    carte.setView(CENTRE_FRANCE, ZOOM_FRANCE);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; les contributeurs <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(carte);

    // Navigation SPA depuis le lien du popup.
    carte.on('popupopen', (evenement: L.PopupEvent) => {
      const element = evenement.popup.getElement();
      const lien = element?.querySelector<HTMLAnchorElement>('a[data-centre-lien]');
      if (lien) {
        lien.addEventListener('click', (e) => {
          e.preventDefault();
          const slug = lien.getAttribute('data-centre-lien');
          if (slug) navigateRef.current(`/centres/${slug}`);
        });
      }
    });

    calquesRef.current = L.layerGroup().addTo(carte);
    carteRef.current = carte;

    return () => {
      carte.remove();
      carteRef.current = null;
      calquesRef.current = null;
    };
  }, []);

  // Synchronisation des marqueurs.
  useEffect(() => {
    const carte = carteRef.current;
    const calques = calquesRef.current;
    if (!carte || !calques) return;

    calques.clearLayers();

    const icone = L.divIcon({
      html: PIN_CENTRE,
      className: 'smv-marqueur',
      iconSize: [34, 44],
      iconAnchor: [17, 42],
      popupAnchor: [0, -38],
    });

    centres.forEach((centre) => {
      const marqueur = L.marker([centre.latitude, centre.longitude], {
        icon: icone,
        alt: `Centre SMV de ${centre.nom}`,
      });
      marqueur.bindTooltip(centre.nom, { direction: 'top', offset: [0, -38] });
      marqueur.bindPopup(contenuPopup(centre), { minWidth: 230 });
      calques.addLayer(marqueur);

      if (afficherBassins) {
        calques.addLayer(
          L.circle([centre.latitude, centre.longitude], {
            radius: RAYON_BASSIN_KM * 1000,
            color: '#2D3E73',
            weight: 1,
            opacity: 0.35,
            fillColor: '#3DA435',
            fillOpacity: 0.06,
            interactive: false,
          }),
        );
      }
    });

    if (origine) {
      const iconeUtilisateur = L.divIcon({
        html: PIN_UTILISATEUR,
        className: 'smv-marqueur',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      const marqueur = L.marker([origine.latitude, origine.longitude], {
        icon: iconeUtilisateur,
        alt: 'Ta position',
      });
      marqueur.bindTooltip(origine.label, { direction: 'top', offset: [0, -12] });
      calques.addLayer(marqueur);
    }

    if (cadrage === 'auto') {
      if (centres.length === 1 && !origine) {
        const seul = centres[0];
        if (seul) carte.setView([seul.latitude, seul.longitude], 10);
      } else if (centres.length > 0) {
        const points: L.LatLngTuple[] = centres.map((c) => [c.latitude, c.longitude]);
        if (origine) points.push([origine.latitude, origine.longitude]);
        carte.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 11 });
      }
    } else {
      carte.setView(CENTRE_FRANCE, ZOOM_FRANCE);
    }
  }, [centres, origine, afficherBassins, cadrage]);

  return (
    <div
      ref={conteneurRef}
      role="region"
      aria-label="Carte des centres SMV"
      className={cn('z-0 h-[300px] w-full rounded-lg border border-smv-gray-100 md:h-[500px]', className)}
    />
  );
}
