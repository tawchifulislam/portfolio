import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { getPayload } from 'payload';
import { headers as getHeaders } from 'next/headers';
import config from '@payload-config';
import {
  personalInfo,
  stats,
  capstones,
  experience,
  techStack,
} from '@/lib/data';

const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, 'src', 'content', 'projects');

const about = {
  heading: 'Self-taught, and building things that hold up.',
  paragraphs: [
    "I'm a self-taught full-stack developer from Chittagong. My formal programming journey began in 2025, though I'd been absorbing how software is made long before I wrote my first line of code. Since then I've built and deployed complete products: a gym management platform, a doctor appointment system, a travel discovery platform with an AI assistant, and a crowdfunding app.",
    'What I enjoy most is the moment a hard problem finally makes sense. I try to build the parts users never see but always depend on: role-based access, payments, scheduled jobs, and graceful handling of retries and dropped connections.',
    'In 2026 I completed the FlyRank AI Internship Program in the Backend AI Engineering track. Each of my three approved capstones ships with a design document, a build log and recorded evidence of its checks, along with a plain list of what it does not do.',
    "Away from the keyboard, you'll find me with a book, any genre, or playing football.",
  ],
  focuses: [
    {
      title: 'Real problems first',
      text: "Booking a doctor, managing a gym, planning a trip. Every project starts from someone's actual need.",
    },
    {
      title: 'Whole-system thinking',
      text: 'React and Next.js interfaces, Express APIs and MongoDB schemas, built as one system with clear boundaries between the parts.',
    },
    {
      title: 'Interfaces that feel considered',
      text: 'Responsive, accessible and quick to load, built with Tailwind and Framer Motion.',
    },
    {
      title: 'Dependable by design',
      text: 'JWT auth, role-based access, idempotent writes, verified webhooks and honest error codes are planned in from the start, not patched on.',
    },
  ],
};

// split an MDX body into sections by "## " headings
function parseSections(body) {
  const sections = {};
  let current = '';
  for (const line of body.split(/\r?\n/)) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) {
      current = h[1]
        .trim()
        .toLowerCase()
        .replace(/[\u2018\u2019]/g, "'");
      sections[current] = [];
      continue;
    }
    if (current) sections[current].push(line);
  }
  return sections;
}

// join wrapped lines into paragraphs
function asText(lines) {
  const paragraphs = [];
  let current = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      if (current.length) paragraphs.push(current.join(' '));
      current = [];
      continue;
    }
    current.push(line);
  }
  if (current.length) paragraphs.push(current.join(' '));
  return paragraphs.join('\n\n');
}

// turn "- item" bullets (with wrapped lines) into an array
function asList(lines) {
  const items = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('- ')) items.push(line.slice(2).trim());
    else if (items.length) items[items.length - 1] += ' ' + line;
  }
  return items;
}

function pick(sections, key) {
  const name = Object.keys(sections).find(k => k.includes(key));
  return name ? sections[name] : [];
}

export async function GET() {
  // local use only
  if (process.env.NODE_ENV === 'production') {
    return new Response('Not found', { status: 404 });
  }

  const payload = await getPayload({ config });

  // only a logged-in admin can run this
  const { user } = await payload.auth({ headers: await getHeaders() });
  if (!user) {
    return new Response(
      'Please log in at /admin first, then open this page again.',
      {
        status: 401,
      },
    );
  }

  const lines = [];
  const log = (...parts) => {
    const text = parts.join(' ');
    lines.push(text);
    console.log(text);
  };

  // upload an image once, reuse it if the filename already exists
  async function uploadImage(publicPath, alt) {
    const filePath = path.join(ROOT, 'public', publicPath);
    if (!fs.existsSync(filePath)) {
      log('Image not found, skipped:', publicPath);
      return undefined;
    }
    const name = path.basename(filePath);
    const found = await payload.find({
      collection: 'media',
      where: { filename: { equals: name } },
      limit: 1,
    });
    if (found.docs[0]) return found.docs[0].id;
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      filePath,
    });
    log('uploaded image:', name);
    return doc.id;
  }

  // create only if missing, so re-running never overwrites dashboard edits
  async function createIfMissing(collection, field, value, data) {
    try {
      const found = await payload.find({
        collection,
        where: { [field]: { equals: value } },
        limit: 1,
      });
      if (found.docs[0]) {
        log('skipped (exists):', collection, value);
        return;
      }
      await payload.create({ collection, data });
      log('created:', collection, value);
    } catch (err) {
      log(
        'FAILED:',
        collection,
        value,
        '->',
        err.message,
        err.data ? JSON.stringify(err.data) : '',
      );
    }
  }

  // profile and hero
  try {
    const profile = await payload.findGlobal({ slug: 'profile' });
    if (profile?.email) {
      log('skipped (exists): global profile');
    } else {
      const photo = await uploadImage(personalInfo.image, personalInfo.name);
      await payload.updateGlobal({
        slug: 'profile',
        data: {
          name: personalInfo.name,
          title: personalInfo.title,
          location: personalInfo.location,
          email: personalInfo.email,
          bio: personalInfo.bio,
          photo,
          resume: personalInfo.resume,
          github: personalInfo.social.github,
          linkedin: personalInfo.social.linkedin,
          twitter: personalInfo.social.twitter,
          statusText: 'Open for work',
          headlineStart: "Hi, I'm Tawchiful. I build",
          headlineHighlight: 'whole products',
          headlineEnd: ', front to back.',
          stats: stats.map(s => ({ value: s.value, label: s.label })),
        },
      });
      log('created: global profile');
    }
  } catch (err) {
    log('FAILED: global profile ->', err.message);
  }

  // about
  try {
    const existing = await payload.findGlobal({ slug: 'about' });
    if (existing?.paragraphs?.length) {
      log('skipped (exists): global about');
    } else {
      await payload.updateGlobal({
        slug: 'about',
        data: {
          heading: about.heading,
          paragraphs: about.paragraphs.map(text => ({ text })),
          focuses: about.focuses,
        },
      });
      log('created: global about');
    }
  } catch (err) {
    log('FAILED: global about ->', err.message);
  }

  // projects from the MDX files
  const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.mdx'));
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8');
      const { data: meta, content } = matter(raw);
      const slug = meta.slug || file.replace(/\.mdx$/, '');
      const sections = parseSections(content);

      const problem = asText(pick(sections, 'problem'));
      const approach = asText(pick(sections, 'approach'));
      const outcome = asText(pick(sections, 'outcome'));
      if (!problem || !approach || !outcome) {
        log(
          'Missing section text in',
          file,
          '(filled with TODO, edit in dashboard)',
        );
      }

      const image = await uploadImage(meta.image, `${meta.title} screenshot`);

      await createIfMissing('projects', 'slug', slug, {
        title: meta.title,
        slug,
        order: meta.order ?? 1,
        featured: Boolean(meta.featured),
        summary: meta.summary,
        image,
        tags: meta.tags ?? [],
        liveUrl: meta.liveUrl,
        githubUrl: meta.githubUrl,
        serverUrl: meta.serverUrl || undefined,
        problem: problem || 'TODO',
        approach: approach || 'TODO',
        keyDecisions: asList(pick(sections, 'key decisions')).map(text => ({
          text,
        })),
        outcome: outcome || 'TODO',
        whatsNext: asList(pick(sections, 'what')).map(text => ({ text })),
      });
    } catch (err) {
      log('FAILED project file:', file, '->', err.message);
    }
  }

  // capstones
  for (const [i, c] of capstones.entries()) {
    await createIfMissing('capstones', 'title', c.title, {
      title: c.title,
      order: i + 1,
      summary: c.summary,
      note: c.note,
      repo: c.repo,
    });
  }

  // experience
  for (const [i, e] of experience.entries()) {
    await createIfMissing('experience', 'role', e.role, {
      role: e.role,
      organization: e.organization,
      mode: e.mode,
      period: e.period,
      order: i + 1,
      highlights: e.highlights.map(text => ({ text })),
      links: e.links.map(l => ({ label: l.label, href: l.href })),
    });
  }

  // tech stack
  for (const t of techStack) {
    await createIfMissing('tech-stack', 'name', t.name, {
      name: t.name,
      category: t.category,
    });
  }

  log('Done.');
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
