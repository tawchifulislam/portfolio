import { cache } from 'react';
import { getPayload } from 'payload';
import config from '@payload-config';

const getClient = cache(() => getPayload({ config }));

const mediaUrl = media =>
  media && typeof media === 'object' ? media.url || '' : '';

const texts = items => (items ?? []).map(item => item.text);

// same shape the old MDX helpers returned, plus the case study text
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

// one cached fetch per request, shared by all sections
export const getSiteData = cache(async () => {
  const payload = await getClient();

  const [profile, about, projects, capstones, experience, techStack] =
    await Promise.all([
      payload.findGlobal({ slug: 'profile', depth: 1 }),
      payload.findGlobal({ slug: 'about' }),
      payload.find({
        collection: 'projects',
        depth: 1,
        limit: 100,
        sort: 'order',
      }),
      payload.find({ collection: 'capstones', limit: 100, sort: 'order' }),
      payload.find({ collection: 'experience', limit: 100, sort: 'order' }),
      payload.find({ collection: 'tech-stack', limit: 200, sort: 'createdAt' }),
    ]);

  return {
    personalInfo: {
      name: profile.name,
      title: profile.title,
      location: profile.location,
      email: profile.email,
      bio: profile.bio,
      image: mediaUrl(profile.photo),
      resume: profile.resume,
      social: {
        github: profile.github,
        linkedin: profile.linkedin,
        twitter: profile.twitter,
      },
      statusText: profile.statusText,
      headline: {
        start: profile.headlineStart,
        highlight: profile.headlineHighlight,
        end: profile.headlineEnd,
      },
    },
    stats: (profile.stats ?? []).map(s => ({ value: s.value, label: s.label })),
    about: {
      heading: about.heading,
      paragraphs: texts(about.paragraphs),
      focuses: (about.focuses ?? []).map(f => ({
        title: f.title,
        text: f.text,
      })),
    },
    projects: projects.docs.map(mapProject),
    capstones: capstones.docs.map(c => ({
      id: c.id,
      title: c.title,
      summary: c.summary,
      note: c.note,
      repo: c.repo,
    })),
    experience: experience.docs.map(e => ({
      id: e.id,
      role: e.role,
      organization: e.organization,
      mode: e.mode,
      period: e.period,
      highlights: texts(e.highlights),
      links: (e.links ?? []).map(l => ({ label: l.label, href: l.href })),
    })),
    techStack: techStack.docs.map(t => ({
      name: t.name,
      category: t.category,
      icon: t.icon || '',
    })),
  };
});
