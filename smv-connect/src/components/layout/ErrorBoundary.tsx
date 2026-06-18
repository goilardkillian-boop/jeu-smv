import { AlertTriangle } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '../ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  erreur: Error | null;
}

/** Garde-fou React : page 500 personnalisée aux couleurs SMV. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { erreur: null };

  static getDerivedStateFromError(erreur: Error): ErrorBoundaryState {
    return { erreur };
  }

  componentDidCatch(erreur: Error, info: ErrorInfo): void {
    console.error('Erreur applicative :', erreur, info.componentStack);
  }

  render(): ReactNode {
    if (!this.state.erreur) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-smv-navy px-4 text-center text-white">
        <AlertTriangle className="h-16 w-16 text-smv-green-light" aria-hidden="true" />
        <p className="font-display text-6xl font-extrabold uppercase">Erreur 500</p>
        <p className="max-w-md text-white/85">
          Quelque chose s'est mal passé de notre côté. Recharge la page ou reviens un peu plus
          tard — ta candidature n'est pas perdue.
        </p>
        <Button onClick={() => window.location.reload()} variant="primary">
          Recharger la page
        </Button>
      </div>
    );
  }
}
