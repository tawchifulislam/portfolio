import { notFound } from 'next/navigation';
import {
  getProjectSlugs,
  getProjectBySlug,
  getAllProjectsMeta,
  getAdjacentProject,
} from '@/lib/projects';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import ProjectDetail from './ProjectDetail';

export async function generateStaticParams() {
  return getProjectSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getAllProjectsMeta().find(p => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} - Tawchiful Islam`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const projects = getAllProjectsMeta();
  const index = projects.findIndex(p => p.slug === slug);

  if (index === -1) notFound();

  const project = await getProjectBySlug(slug, mdxComponents);
  if (!project) notFound();

  const nextProject = getAdjacentProject(slug);

  return (
    <ProjectDetail
      meta={project.frontmatter}
      content={project.content}
      index={index + 1}
      total={projects.length}
      nextProject={nextProject}
    />
  );
}
