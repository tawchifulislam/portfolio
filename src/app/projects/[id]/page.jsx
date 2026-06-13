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
  const project = projects.find(p => p.id === id);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
