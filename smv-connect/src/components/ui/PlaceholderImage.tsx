import { Shield } from 'lucide-react';
import { categorieParId } from '../../lib/constants';
import { cn } from '../../lib/utils';

const DEGRADES = [
  'from-smv-navy to-smv-navy-dark',
  'from-smv-navy-dark to-[#3a4d85]',
  'from-[#27406b] to-smv-navy',
];

function indiceDegrade(graine: string): number {
  let hash = 0;
  for (const caractere of graine) hash = (hash * 31 + caractere.charCodeAt(0)) % 997;
  return hash % DEGRADES.length;
}

export interface PlaceholderImageProps {
  /** Catégorie de formation → icône dédiée. */
  categorie?: string;
  /** Graine de variation du dégradé (slug, id…). */
  graine?: string;
  className?: string;
}

/** Visuel SVG/CSS généré pour les contenus sans photo (aucune ressource externe). */
export function PlaceholderImage({ categorie, graine = '', className }: PlaceholderImageProps) {
  const cat = categorie ? categorieParId(categorie) : undefined;
  const Icone = cat?.icon ?? Shield;
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-gradient-to-br',
        DEGRADES[indiceDegrade(graine + (categorie ?? ''))],
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M0 100 L60 0 L75 0 L15 100 Z" fill="#B8D584" />
        <path d="M30 100 L90 0 L100 0 L100 14 L48 100 Z" fill="#3DA435" />
      </svg>
      <Icone className="relative h-12 w-12 text-white/80" strokeWidth={1.5} />
    </div>
  );
}

/** Blason placeholder d'un centre (écusson + initiales). */
export function PlaceholderBlason({ nom, className }: { nom: string; className?: string }) {
  const initiales = nom
    .split(/[\s-]+/)
    .filter((mot) => mot.length > 2 || /^[A-Z]/.test(mot))
    .slice(0, 2)
    .map((mot) => (mot[0] ?? '').toUpperCase())
    .join('');
  return (
    <div
      aria-hidden="true"
      className={cn('relative flex items-center justify-center', className)}
    >
      <svg viewBox="0 0 64 72" className="h-full w-full drop-shadow-md">
        <path d="M32 2 60 11v26c0 16-11.5 28.5-28 33C15.5 65.5 4 53 4 37V11Z" fill="#2D3E73" />
        <path d="M32 7 55 14.5V37c0 13-9.4 23.4-23 27.4C18.4 60.4 9 50 9 37V14.5Z" fill="#1E2A52" />
        <path d="m18 34 14 10 14-10v9L32 53 18 43Z" fill="#3DA435" />
        <text
          x="32"
          y="28"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Barlow Condensed, sans-serif"
          fontWeight="700"
          fontSize="16"
        >
          {initiales || 'SMV'}
        </text>
      </svg>
    </div>
  );
}
