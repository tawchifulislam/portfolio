import { getProjectSlugs } from '@/lib/projects';
import { SITE_URL } from '@/lib/constants';

export default function sitemap() {
  const projectRoutes = getProjectSlugs().map(slug => ({
    url: `${SITE_URL}/projects/${slug}`,
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
