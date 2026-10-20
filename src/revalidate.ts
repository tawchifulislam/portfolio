import { revalidatePath } from 'next/cache';

function refreshSite() {
  try {
    revalidatePath('/', 'layout');
    revalidatePath('/sitemap.xml');
  } catch (err) {
    // outside a Next.js request there is nothing to refresh
    console.warn('Revalidate skipped');
  }
}

const afterChange = ({ doc }: { doc: any }) => {
  refreshSite();
  return doc;
};

const afterDelete = ({ doc }: { doc: any }) => {
  refreshSite();
  return doc;
};

export const collectionHooks = {
  afterChange: [afterChange],
  afterDelete: [afterDelete],
};

export const globalHooks = {
  afterChange: [afterChange],
};
