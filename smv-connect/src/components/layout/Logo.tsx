import { Link } from 'react-router-dom';
import { DEVISE } from '../../lib/constants';
import { cn } from '../../lib/utils';

export interface LogoProps {
  /** Variante claire (header transparent / footer navy). */
  surFondSombre?: boolean;
  avecDevise?: boolean;
  className?: string;
}

/** Logo SMV (écusson SVG original + texte). */
export function Logo({ surFondSombre = false, avecDevise = true, className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn('flex items-center gap-3', className)}
      aria-label="Service Militaire Volontaire — retour à l'accueil"
    >
      <svg viewBox="0 0 64 72" className="h-11 w-10 shrink-0" aria-hidden="true">
        <path d="M32 2 60 11v26c0 16-11.5 28.5-28 33C15.5 65.5 4 53 4 37V11Z" fill={surFondSombre ? '#FFFFFF' : '#2D3E73'} />
        <path d="M32 7 55 14.5V37c0 13-9.4 23.4-23 27.4C18.4 60.4 9 50 9 37V14.5Z" fill={surFondSombre ? '#2D3E73' : '#1E2A52'} />
        <path d="m18 34 14 10 14-10v9L32 53 18 43Z" fill="#3DA435" />
        <text x="32" y="28" textAnchor="middle" fill="#FFFFFF" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="15">
          SMV
        </text>
      </svg>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            'font-display text-xl font-extrabold uppercase tracking-tight',
            surFondSombre ? 'text-white' : 'text-smv-navy',
          )}
        >
          Service Militaire
          <br />
          Volontaire
        </span>
        {avecDevise ? (
          <span className={cn('text-xs italic', surFondSombre ? 'text-white/80' : 'text-smv-gray-600')}>
            « {DEVISE} »
          </span>
        ) : null}
      </span>
    </Link>
  );
}
