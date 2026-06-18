import { X } from 'lucide-react';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

export interface ModalProps {
  ouvert: boolean;
  onClose: () => void;
  titre: string;
  size?: 'md' | 'lg' | 'xl';
  footer?: ReactNode;
  children: ReactNode;
}

const TAILLES = { md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

export function Modal({ ouvert, onClose, titre, size = 'md', footer, children }: ModalProps) {
  const titreId = useId();
  const panneauRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ouvert) return;
    const surClavier = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', surClavier);
    document.body.style.overflow = 'hidden';
    panneauRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', surClavier);
      document.body.style.overflow = '';
    };
  }, [ouvert, onClose]);

  if (!ouvert) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-smv-navy-dark/60 backdrop-blur-sm" aria-hidden="true" />
      <div
        ref={panneauRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titreId}
        tabIndex={-1}
        className={cn(
          'relative z-10 flex max-h-[92vh] w-full flex-col rounded-t-lg bg-white shadow-xl outline-none sm:rounded-lg',
          TAILLES[size],
          'animate-fade-in',
        )}
      >
        <header className="flex items-center justify-between gap-4 border-b border-smv-gray-100 px-5 py-4">
          <h2 id={titreId} className="font-display text-xl font-bold uppercase text-smv-navy">
            {titre}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            className="rounded-md p-1.5 text-smv-gray-600 hover:bg-smv-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-smv-navy"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>
        <div className="overflow-y-auto px-5 py-4">{children}</div>
        {footer ? (
          <footer className="flex flex-wrap justify-end gap-3 border-t border-smv-gray-100 px-5 py-4">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
