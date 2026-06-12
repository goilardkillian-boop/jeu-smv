import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface PaginationProps {
  /** Nombre total d'éléments. */
  total: number;
  /** Page courante (1-indexée). */
  page: number;
  parPage?: number;
  onChange: (page: number) => void;
}

function pagesVisibles(pageCourante: number, nbPages: number): Array<number | '…'> {
  if (nbPages <= 7) return Array.from({ length: nbPages }, (_, i) => i + 1);
  const pages: Array<number | '…'> = [1];
  const debut = Math.max(2, pageCourante - 1);
  const fin = Math.min(nbPages - 1, pageCourante + 1);
  if (debut > 2) pages.push('…');
  for (let p = debut; p <= fin; p += 1) pages.push(p);
  if (fin < nbPages - 1) pages.push('…');
  pages.push(nbPages);
  return pages;
}

export function Pagination({ total, page, parPage = 12, onChange }: PaginationProps) {
  const nbPages = Math.max(1, Math.ceil(total / parPage));
  if (nbPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Page précédente"
        className="rounded-md border border-smv-gray-300 p-2 text-smv-navy hover:bg-smv-gray-100 disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      {pagesVisibles(page, nbPages).map((p, i) =>
        p === '…' ? (
          <span key={`e-${i}`} className="px-1 text-smv-gray-600" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
            className={cn(
              'min-w-[2.25rem] rounded-md border px-2 py-1.5 text-sm font-semibold',
              p === page
                ? 'border-smv-navy bg-smv-navy text-white'
                : 'border-smv-gray-300 text-smv-navy hover:bg-smv-gray-100',
            )}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= nbPages}
        aria-label="Page suivante"
        className="rounded-md border border-smv-gray-300 p-2 text-smv-navy hover:bg-smv-gray-100 disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
