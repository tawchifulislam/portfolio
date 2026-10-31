import { notFound } from 'next/navigation';
import { getProjectList, getProject } from '@/lib/cms';
import ProjectBody from '@/components/projects/ProjectBody';
import { SITE_URL } from '@/lib/constants';
import { safeJsonLd } from '@/lib/utils';
import ProjectDetail from './ProjectDetail';

export async function generateStaticParams() {
  const projects = await getProjectList();
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const projects = await getProjectList();
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} - Tawchiful Islam`;
  const url = `/projects/${slug}`;

  return {
    title,
    description: project.summary,
    keywords: project.tags,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description: project.summary,
      siteName: 'Tawchiful Islam',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const [projects, project] = await Promise.all([
    getProjectList(),
    getProject(slug),
  ]);

  if (!project) notFound();

  const index = projects.findIndex(p => p.slug === slug);
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
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <ProjectDetail
        meta={project}
        content={<ProjectBody project={project} />}
        nextProject={nextProject}
      />
    </>
  );
}
