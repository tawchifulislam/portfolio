import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProjectDetail from './ProjectDetail';

export async function generateStaticParams() {
  return projects.map(project => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = projects.find(p => p.id === id);

  if (!project) return {};

  return {
    title: `${project.title} - Tawchiful Islam`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const currentIndex = projects.findIndex(p => p.id === id);
  const project = projects[currentIndex];

  if (!project) notFound();

  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <ProjectDetail
      project={project}
      index={currentIndex + 1}
      total={projects.length}
      nextProject={nextProject}
    />
  );
}
