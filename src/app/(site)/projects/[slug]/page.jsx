import { notFound } from 'next/navigation';
import { getSiteData } from '@/lib/cms';
import ProjectBody from '@/components/projects/ProjectBody';
import { SITE_URL } from '@/lib/constants';
import ProjectDetail from './ProjectDetail';

export async function generateStaticParams() {
  const { projects } = await getSiteData();
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { projects } = await getSiteData();
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} - Tawchiful Islam`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const { projects } = await getSiteData();
  const index = projects.findIndex(p => p.slug === slug);

  if (index === -1) notFound();

  const project = projects[index];
  const nextProject =
    projects.length > 1 ? projects[(index + 1) % projects.length] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: `${SITE_URL}/projects/${slug}`,
    image: project.image,
    keywords: project.tags?.join(', '),
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
        meta={project}
        content={<ProjectBody project={project} />}
        index={index + 1}
        total={projects.length}
        nextProject={nextProject}
      />
    </>
  );
}
