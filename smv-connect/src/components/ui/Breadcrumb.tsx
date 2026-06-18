import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface BreadcrumbProps {
  /** Éléments après « Accueil » ; le dernier est la page courante. */
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const tous: BreadcrumbItem[] = [{ label: 'Accueil', to: '/' }, ...items];
  return (
    <nav aria-label="Fil d'Ariane" className="py-3">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {tous.map((item, index) => {
          const dernier = index === tous.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 ? (
                <ChevronRight className="h-4 w-4 shrink-0 text-smv-gray-300" aria-hidden="true" />
              ) : null}
              <li className="min-w-0">
                {dernier || !item.to ? (
                  <span aria-current={dernier ? 'page' : undefined} className="truncate text-smv-gray-600">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.to} className="text-smv-navy underline-offset-2 hover:underline">
                    {item.label}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
