import type { LucideIcon } from 'lucide-react';

export interface Metrique {
  label: string;
  valeur: string;
  icon: LucideIcon;
  detail?: string;
}

export interface DashboardMetricsProps {
  metriques: Metrique[];
}

/** Cartes de métriques du tableau de bord admin. */
export function DashboardMetrics({ metriques }: DashboardMetricsProps) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metriques.map((metrique) => (
        <div
          key={metrique.label}
          className="rounded-lg border border-smv-gray-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <dt className="text-sm font-semibold text-smv-gray-600">{metrique.label}</dt>
            <metrique.icon className="h-5 w-5 shrink-0 text-smv-green" aria-hidden="true" />
          </div>
          <dd className="mt-2 font-display text-4xl font-extrabold text-smv-navy">
            {metrique.valeur}
          </dd>
          {metrique.detail ? (
            <p className="mt-1 text-xs text-smv-gray-600">{metrique.detail}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
