import { AlertTriangle, CheckCircle2, Info, XCircle, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

const STYLES: Record<AlertType, { classes: string; icon: LucideIcon }> = {
  info: { classes: 'bg-blue-50 border-blue-200 text-blue-900', icon: Info },
  success: { classes: 'bg-green-50 border-green-200 text-green-900', icon: CheckCircle2 },
  warning: { classes: 'bg-amber-50 border-amber-300 text-amber-900', icon: AlertTriangle },
  error: { classes: 'bg-red-50 border-red-200 text-red-900', icon: XCircle },
};

export interface AlertProps {
  type?: AlertType;
  title?: string;
  className?: string;
  children: ReactNode;
}

export function Alert({ type = 'info', title, className, children }: AlertProps) {
  const { classes, icon: Icon } = STYLES[type];
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={cn('flex gap-3 rounded-md border p-4 text-sm', classes, className)}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        {title ? <p className="mb-1 font-bold">{title}</p> : null}
        <div className="[&_a]:underline">{children}</div>
      </div>
    </div>
  );
}
