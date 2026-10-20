import { getSiteData } from '@/lib/cms';
import { SITE_URL } from '@/lib/constants';

export default async function sitemap() {
  const { projects } = await getSiteData();

  const projectRoutes = projects.map(project => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectRoutes,
  ];
}
