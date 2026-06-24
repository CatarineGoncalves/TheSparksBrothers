import CinematicHero from './../src/components/CinematicHero';
import VoltStorySection from './../src/components/VoltStorySection';
import PlanetExplores from './../src/components/PlanetExplorerSection';
import InitialHero from './../src/components/InitialHero';

export default function Home() {
  return (
    <main>
      <InitialHero />
      <VoltStorySection />
      <PlanetExplores />
      <CinematicHero />
    </main>
  );
}
