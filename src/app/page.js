import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import TechStack from '@/components/sections/TechStack';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import { getAllProjectsMeta } from '@/lib/projects';

export default function Home() {
  const projects = getAllProjectsMeta();

  return (
    <div>
      <Hero />
      <About />
      <Experience />
      <TechStack />
      <Projects projects={projects} />
      <Contact />
    </div>
  );
}
