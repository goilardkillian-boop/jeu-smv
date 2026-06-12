import { Inbox, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export interface EmptyStateProps {
  icon?: LucideIcon;
  titre: string;
  description?: string;
  action?: ReactNode;
}

/** État vide illustré (aucune donnée). */
export function EmptyState({ icon: Icon = Inbox, titre, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-smv-gray-300 bg-smv-off-white px-6 py-14 text-center">
      <span className="rounded-full bg-white p-4 shadow-sm">
        <Icon className="h-8 w-8 text-smv-gray-300" aria-hidden="true" />
      </span>
      <p className="font-display text-xl font-bold uppercase text-smv-navy">{titre}</p>
      {description ? <p className="max-w-md text-sm text-smv-gray-600">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
