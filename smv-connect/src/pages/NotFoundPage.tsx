import { Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Seo } from '../components/ui/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo titre="Page introuvable (404)" />
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 py-16 text-center">
        <Compass className="h-16 w-16 text-smv-green" aria-hidden="true" />
        <p className="font-display text-7xl font-extrabold uppercase leading-none text-smv-navy">404</p>
        <h1 className="font-display text-2xl font-bold uppercase text-smv-navy">
          Tu t'es égaré·e en manœuvre
        </h1>
        <p className="max-w-md text-smv-gray-600">
          Cette page n'existe pas ou a changé d'adresse. Pas de panique : reprends la route vers
          l'accueil ou explore nos centres.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button to="/">Retour à l'accueil</Button>
          <Button to="/centres" variant="secondary">
            Voir les centres
          </Button>
        </div>
      </div>
    </>
  );
}
