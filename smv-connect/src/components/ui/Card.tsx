import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps {
  hoverable?: boolean;
  className?: string;
  children: ReactNode;
}

export function Card({ hoverable = false, className, children }: CardProps) {
  return (
    <article
      className={cn(
        'rounded-lg border border-smv-gray-100 bg-white shadow-sm',
        hoverable && 'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg',
        className,
      )}
    >
      {children}
    </article>
  );
}
