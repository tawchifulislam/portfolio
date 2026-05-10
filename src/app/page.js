import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import TechStack from '@/components/sections/TechStack';
import Projects from '@/components/sections/Projects';

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <TechStack />
      <Projects />
    </div>
  );
}
