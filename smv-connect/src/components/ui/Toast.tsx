import { AlertTriangle, CheckCircle2, Info, X, XCircle, type LucideIcon } from 'lucide-react';
import { useToastStore, type ToastType } from '../../store/toastStore';
import { cn } from '../../lib/utils';

const STYLES: Record<ToastType, { classes: string; icon: LucideIcon }> = {
  success: { classes: 'border-l-smv-green', icon: CheckCircle2 },
  error: { classes: 'border-l-smv-red', icon: XCircle },
  info: { classes: 'border-l-smv-navy', icon: Info },
  warning: { classes: 'border-l-amber-500', icon: AlertTriangle },
};

const COULEURS_ICONE: Record<ToastType, string> = {
  success: 'text-smv-green',
  error: 'text-smv-red',
  info: 'text-smv-navy',
  warning: 'text-amber-500',
};

/** Pile de notifications toast (coin bas-droit). À monter une fois dans l'app. */
export function ToastViewport() {
  const toasts = useToastStore((s) => s.toasts);
  const retirer = useToastStore((s) => s.retirer);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-4 right-4 z-[70] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2"
    >
      {toasts.map((toast) => {
        const { classes, icon: Icon } = STYLES[toast.type];
        return (
          <div
            key={toast.id}
            role="status"
            className={cn(
              'flex items-start gap-3 rounded-md border border-smv-gray-100 border-l-4 bg-white p-4 shadow-lg animate-slide-in-right',
              classes,
            )}
          >
            <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', COULEURS_ICONE[toast.type])} aria-hidden="true" />
            <p className="min-w-0 flex-1 text-sm text-smv-gray-900">{toast.message}</p>
            <button
              type="button"
              onClick={() => retirer(toast.id)}
              aria-label="Fermer la notification"
              className="rounded p-0.5 text-smv-gray-600 hover:bg-smv-gray-100"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
