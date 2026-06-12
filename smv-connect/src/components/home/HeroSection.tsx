import { ChevronDown } from 'lucide-react';
import type { Centre } from '../../types/app.types';
import { Button } from '../ui/Button';
import { GeoSearch } from './GeoSearch';

export interface HeroSectionProps {
  centres: Centre[];
}

export function HeroSection({ centres }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Fond généré (aucune ressource externe) + overlay navy 60 % */}
      <div className="hero-fond absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-smv-navy/60" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-page flex-col items-start gap-6 px-4 pb-16 pt-36">
        <h1 className="font-display text-5xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-[80px]">
          Armé pour
          <br />
          <span className="text-smv-green-light">l'avenir</span>
        </h1>
        <p className="max-w-xl text-lg text-white/90 sm:text-xl">
          7 centres dans toute la France pour t'aider à construire ton avenir. Une formation
          militaire et professionnelle rémunérée, pour les 18-25 ans.
        </p>

        <GeoSearch centres={centres} />

        <Button to="/decouvrir" variant="ghost" className="border-white text-white hover:bg-white hover:text-smv-navy">
          Découvrir le SMV
        </Button>
      </div>

      <a
        href="#chiffres-cles"
        aria-label="Descendre vers les chiffres clés"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full p-2 text-white/70 hover:text-white"
      >
        <ChevronDown className="h-7 w-7 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
