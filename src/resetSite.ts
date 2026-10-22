import { revalidatePath } from 'next/cache';
import defaults from './lib/defaults.json';
import sectionDefaults from './lib/sectionDefaults.json';

const WIPE = [
  'projects',
  'capstones',
  'experience',
  'tech-stack',
  'media',
] as const;

type Downloaded = { data: Buffer; mimetype: string; name: string };

function getOrigin(req: any) {
  const host =
    req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
  const local = host.startsWith('localhost') || host.startsWith('127.0.0.1');
  const proto =
    req.headers.get('x-forwarded-proto') || (local ? 'http' : 'https');
  return `${proto}://${host}`;
}

export const resetSiteHandler = async (req: any) => {
  if (!req.user) {
    return Response.json({ error: 'Please log in first' }, { status: 401 });
  }

  let body: any = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }
  if (body?.confirm !== 'RESET') {
    return Response.json(
      { error: 'Confirmation text is missing' },
      { status: 400 },
    );
  }

  const payload = req.payload;
  const origin = getOrigin(req);

  // step 1: download every image first, so nothing is deleted if one is missing
  const paths = Array.from(
    new Set([defaults.profile.photo, ...defaults.projects.map(p => p.image)]),
  );
  const files = new Map<string, Downloaded>();
  const missing: string[] = [];

  await Promise.all(
    paths.map(async publicPath => {
      try {
        const res = await fetch(origin + publicPath);
        const mimetype = (res.headers.get('content-type') || '').split(';')[0];
        if (!res.ok || !mimetype.startsWith('image/'))
          throw new Error('not an image');
        const data = Buffer.from(await res.arrayBuffer());
        files.set(publicPath, {
          data,
          mimetype,
          name: publicPath.split('/').pop() as string,
        });
      } catch {
        missing.push(publicPath);
      }
    }),
  );

  if (missing.length > 0) {
    return Response.json(
      {
        error: `Nothing was changed. These images could not be loaded: ${missing.join(', ')}`,
      },
      { status: 400 },
    );
  }

  const uploaded = new Map<string, string>();

  // upload an already downloaded image to the media library
  async function image(publicPath: string, alt: string) {
    if (uploaded.has(publicPath)) return uploaded.get(publicPath);
    const file = files.get(publicPath) as Downloaded;
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: file.data,
        mimetype: file.mimetype,
        name: file.name,
        size: file.data.length,
      },
    });
    uploaded.set(publicPath, doc.id);
    return doc.id;
  }

  try {
    // step 2: wipe site content, users and messages stay untouched
    for (const collection of WIPE) {
      await payload.delete({ collection, where: { id: { exists: true } } });
    }

    // step 3: single page sections
    const photo = await image(defaults.profile.photo, defaults.profile.name);
    await payload.updateGlobal({
      slug: 'profile',
      data: { ...defaults.profile, photo, resumeFile: null },
    });
    await payload.updateGlobal({ slug: 'about', data: defaults.about });
    await payload.updateGlobal({
      slug: 'section-titles',
      data: sectionDefaults,
    });

    // step 4: lists
    for (const project of defaults.projects) {
      const projectImage = await image(
        project.image,
        `${project.title} screenshot`,
      );
      await payload.create({
        collection: 'projects',
        data: { ...project, image: projectImage },
      });
    }
    for (const doc of defaults.capstones) {
      await payload.create({ collection: 'capstones', data: doc });
    }
    for (const doc of defaults.experience) {
      await payload.create({ collection: 'experience', data: doc });
    }
    for (const doc of defaults.techStack) {
      await payload.create({ collection: 'tech-stack', data: doc });
    }
  } catch (err) {
    console.error('Reset failed:', err);
    const reason = err instanceof Error ? err.message : 'unknown error';
    return Response.json(
      {
        error: `Reset stopped halfway (${reason}). Press reset again to retry.`,
      },
      { status: 500 },
    );
  }

  try {
    revalidatePath('/', 'layout');
    revalidatePath('/sitemap.xml');
  } catch {
    console.warn('Revalidate skipped');
  }

  return Response.json({ ok: true });
};
