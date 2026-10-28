import Hero from '@/components/sections/Hero';
import StatsStrip from '@/components/sections/StatsStrip';
import Work from '@/components/sections/Work';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import TechStack from '@/components/sections/TechStack';
import Contact from '@/components/sections/Contact';
import { getSiteData } from '@/lib/cms';

export default async function Home() {
  const { projects, personalInfo } = await getSiteData();

  return (
    <>
      <Hero />
      <StatsStrip />
      <Work projects={projects} />
      <About />
      <Experience />
      <TechStack />
      <Contact personalInfo={personalInfo} />
    </>
  );
}
