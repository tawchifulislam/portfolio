import Hero from '@/components/sections/Hero';
import StatsStrip from '@/components/sections/StatsStrip';
import Work from '@/components/sections/Work';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import TechStack from '@/components/sections/TechStack';
import Contact from '@/components/sections/Contact';
import { getAllProjectsMeta } from '@/lib/projects';

export default function Home() {
  const projects = getAllProjectsMeta();

  return (
    <>
      <Hero />
      <StatsStrip projectCount={projects.length} />
      <Work projects={projects} />
      <About />
      <Experience />
      <TechStack />
      <Contact />
    </>
  );
}