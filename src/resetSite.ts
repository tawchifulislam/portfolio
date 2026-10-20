import { revalidatePath } from 'next/cache';
import defaults from './lib/defaults.json';

const WIPE = [
  'projects',
  'capstones',
  'experience',
  'tech-stack',
  'media',
] as const;

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
  const images = new Map<string, string>();

  // download an original image from the site and upload it to the media library
  async function image(publicPath: string, alt: string) {
    if (images.has(publicPath)) return images.get(publicPath);
    const res = await fetch(origin + publicPath);
    if (!res.ok)
      throw new Error(`Image not found: ${publicPath} (${res.status})`);
    const data = Buffer.from(await res.arrayBuffer());
    const mimetype = (res.headers.get('content-type') || 'image/png').split(
      ';',
    )[0];
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data,
        mimetype,
        name: publicPath.split('/').pop(),
        size: data.length,
      },
    });
    images.set(publicPath, doc.id);
    return doc.id;
  }

  try {
    // wipe site content, users and messages stay untouched
    for (const collection of WIPE) {
      await payload.delete({ collection, where: { id: { exists: true } } });
    }

    // single page sections
    const photo = await image(defaults.profile.photo, defaults.profile.name);
    await payload.updateGlobal({
      slug: 'profile',
      data: { ...defaults.profile, photo },
    });
    await payload.updateGlobal({ slug: 'about', data: defaults.about });

    // lists
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
