import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import TechStack from '@/components/sections/TechStack';
import Contact from '@/components/sections/Contact';
import Projects from './projects/page';

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Contact />
    </div>
  );
}
