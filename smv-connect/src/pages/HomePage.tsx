import { ActualitesSection } from '../components/home/ActualitesSection';
import { FormationsPreview } from '../components/home/FormationsPreview';
import { HeroSection } from '../components/home/HeroSection';
import { MapSection } from '../components/home/MapSection';
import { ParcoursSection } from '../components/home/ParcoursSection';
import { PartenairesSection } from '../components/home/PartenairesSection';
import { StatsSection } from '../components/home/StatsSection';
import { TestimonialSection } from '../components/home/TestimonialSection';
import { Seo } from '../components/ui/Seo';
import { useCentres } from '../hooks/useCentres';

export default function HomePage() {
  const { data: centres } = useCentres();

  return (
    <>
      <Seo
        titre="Armé pour l'avenir"
        description="Le Service Militaire Volontaire : 7 centres dans toute la France pour t'aider à construire ton avenir. Formation militaire et professionnelle rémunérée pour les 18-25 ans."
        cheminCanonique="/"
      />
      <HeroSection centres={centres ?? []} />
      <StatsSection />
      <ParcoursSection />
      <MapSection centres={centres ?? []} />
      <FormationsPreview />
      <TestimonialSection />
      <ActualitesSection />
      <PartenairesSection />
    </>
  );
}
