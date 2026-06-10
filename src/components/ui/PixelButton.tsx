import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger';
  children: ReactNode;
}

export function PixelButton({ variant = 'default', className = '', children, ...rest }: Props) {
  return (
    <button
      className={`pixel-btn px-4 py-2 text-sm ${variant === 'primary' ? 'primary' : ''} ${variant === 'danger' ? 'danger' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
