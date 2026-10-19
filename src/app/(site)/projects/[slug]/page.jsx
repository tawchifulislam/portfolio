import { notFound } from 'next/navigation';
import {
  getProjectSlugs,
  getProjectBySlug,
  getAllProjectsMeta,
  getAdjacentProject,
} from '@/lib/projects';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { SITE_URL } from '@/lib/constants';
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
  const meta = project.frontmatter;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: meta.title,
    description: meta.summary,
    url: `${SITE_URL}/projects/${slug}`,
    image: `${SITE_URL}${meta.image}`,
    keywords: meta.tags?.join(', '),
    author: {
      '@type': 'Person',
      name: 'Tawchiful Islam',
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail
        meta={meta}
        content={project.content}
        index={index + 1}
        total={projects.length}
        nextProject={nextProject}
      />
    </>
  );
}
