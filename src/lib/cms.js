import { cache } from 'react';
import { getPayload } from 'payload';
import config from '@payload-config';

const getClient = cache(() => getPayload({ config }));

// retry so a short network hiccup does not fail a build
async function withRetry(task, tries = 3) {
  let lastError;
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      return await task();
    } catch (err) {
      lastError = err;
      if (attempt < tries) {
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
      }
    }
  }
  throw lastError;
}

const mediaUrl = media =>
  media && typeof media === 'object' ? media.url || '' : '';

const texts = items => (items ?? []).map(item => item.text);

function mapProject(p) {
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    tags: p.tags ?? [],
    image: mediaUrl(p.image),
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    serverUrl: p.serverUrl || undefined,
    featured: Boolean(p.featured),
    order: p.order,
    problem: p.problem,
    approach: p.approach,
    keyDecisions: texts(p.keyDecisions),
    outcome: p.outcome,
    whatsNext: texts(p.whatsNext),
  };
}

// profile, hero text and stats
export const getProfile = cache(() =>
  withRetry(async () => {
    const payload = await getClient();
    const p = await payload.findGlobal({ slug: 'profile', depth: 1 });
    return {
      personalInfo: {
        name: p.name,
        title: p.title,
        location: p.location,
        email: p.email,
        bio: p.bio,
        image: mediaUrl(p.photo),
        resume: p.resume,
        social: {
          github: p.github,
          linkedin: p.linkedin,
          twitter: p.twitter,
        },
        statusText: p.statusText,
        headline: {
          start: p.headlineStart,
          highlight: p.headlineHighlight,
          end: p.headlineEnd,
        },
      },
      stats: (p.stats ?? []).map(s => ({ value: s.value, label: s.label })),
    };
  }),
);

export const getAbout = cache(() =>
  withRetry(async () => {
    const payload = await getClient();
    const a = await payload.findGlobal({ slug: 'about' });
    return {
      heading: a.heading,
      paragraphs: texts(a.paragraphs),
      focuses: (a.focuses ?? []).map(f => ({ title: f.title, text: f.text })),
    };
  }),
);

// light list for the home page, case study text is not loaded
export const getProjectList = cache(() =>
  withRetry(async () => {
    const payload = await getClient();
    const result = await payload.find({
      collection: 'projects',
      depth: 1,
      limit: 100,
      sort: 'order',
      select: {
        title: true,
        slug: true,
        order: true,
        featured: true,
        summary: true,
        image: true,
        tags: true,
        liveUrl: true,
        githubUrl: true,
        serverUrl: true,
      },
    });
    return result.docs.map(mapProject);
  }),
);

// one full project with its case study text
export const getProject = cache(slug =>
  withRetry(async () => {
    const payload = await getClient();
    const result = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    });
    return result.docs[0] ? mapProject(result.docs[0]) : null;
  }),
);

export const getCapstones = cache(() =>
  withRetry(async () => {
    const payload = await getClient();
    const result = await payload.find({
      collection: 'capstones',
      limit: 100,
      sort: 'order',
    });
    return result.docs.map(c => ({
      id: c.id,
      title: c.title,
      summary: c.summary,
      note: c.note,
      repo: c.repo,
    }));
  }),
);

export const getExperience = cache(() =>
  withRetry(async () => {
    const payload = await getClient();
    const result = await payload.find({
      collection: 'experience',
      limit: 100,
      sort: 'order',
    });
    return result.docs.map(e => ({
      id: e.id,
      role: e.role,
      organization: e.organization,
      mode: e.mode,
      period: e.period,
      highlights: texts(e.highlights),
      links: (e.links ?? []).map(l => ({ label: l.label, href: l.href })),
    }));
  }),
);

export const getTechStack = cache(() =>
  withRetry(async () => {
    const payload = await getClient();
    const result = await payload.find({
      collection: 'tech-stack',
      limit: 200,
      sort: 'createdAt',
    });
    return result.docs.map(t => ({
      name: t.name,
      category: t.category,
      icon: t.icon || '',
    }));
  }),
);

// everything for the home page sections
export const getSiteData = cache(async () => {
  const [profile, about, projects, capstones, experience, techStack] =
    await Promise.all([
      getProfile(),
      getAbout(),
      getProjectList(),
      getCapstones(),
      getExperience(),
      getTechStack(),
    ]);

  return {
    personalInfo: profile.personalInfo,
    stats: profile.stats,
    about,
    projects,
    capstones,
    experience,
    techStack,
  };
});
