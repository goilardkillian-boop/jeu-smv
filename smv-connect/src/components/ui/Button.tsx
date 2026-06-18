import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-2 font-display font-bold uppercase tracking-wide ' +
  'rounded-md transition-colors duration-150 focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const VARIANTES: Record<ButtonVariant, string> = {
  primary: 'bg-smv-green text-white hover:bg-[#338a2c] focus-visible:outline-smv-green',
  secondary: 'bg-smv-navy text-white hover:bg-smv-navy-dark focus-visible:outline-smv-navy',
  ghost:
    'bg-transparent text-smv-navy border-2 border-current hover:bg-smv-navy hover:text-white focus-visible:outline-smv-navy',
  danger: 'bg-smv-red text-white hover:bg-[#9f2025] focus-visible:outline-smv-red',
};

const TAILLES: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-5 py-2.5',
  lg: 'text-lg px-7 py-3.5',
};

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Lien interne (rendu <Link>). */
  to?: string;
  /** Lien externe (rendu <a target="_blank">). */
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  title?: string;
  'aria-label'?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  disabled,
  onClick,
  className,
  title,
  children,
  ...aria
}: ButtonProps) {
  const classes = cn(BASE, VARIANTES[variant], TAILLES[size], className);

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} onClick={onClick} title={title} {...aria}>
        {children}
      </Link>
    );
  }
  if (href && !disabled) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        title={title}
        {...aria}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} title={title} {...aria}>
      {children}
    </button>
  );
}
