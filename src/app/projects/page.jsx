import { getAllProjectsMeta } from '@/lib/projects';
import Projects from '@/components/sections/Projects';

export const metadata = {
  title: 'Projects - Tawchiful Islam',
  description: 'A selection of full-stack projects, presented as case studies.',
};

export default function ProjectsPage() {
  const projects = getAllProjectsMeta();
  return <Projects projects={projects} />;
}
