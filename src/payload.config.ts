import path from 'path';
import { fileURLToPath } from 'url';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { buildConfig } from 'payload';

import {
  Users,
  Media,
  Projects,
  Capstones,
  Experience,
  TechStack,
  Messages,
} from './collections';
import { Profile, About } from './globals';
import { resetSiteHandler } from './resetSite';

const trusted = ['https://tawchif.vercel.app', 'http://localhost:3000'];

const secret = process.env.PAYLOAD_SECRET;
if (!secret) throw new Error('PAYLOAD_SECRET is not set');

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users',
    importMap: { baseDir: path.resolve(dirname) },
    theme: 'dark',
    dateFormat: 'd MMM yyyy, h:mm a',
    meta: {
      titleSuffix: ' | Portfolio admin',
      icons: [{ rel: 'icon', url: '/favicon.ico' }],
    },
    toast: { position: 'bottom-center', duration: 3000, limit: 3 },
    components: {
      graphics: {
        Logo: '/components/admin/Logo',
        Icon: '/components/admin/Icon',
      },
      beforeDashboard: ['/components/admin/DashboardHome'],
      afterDashboard: ['/components/admin/ResetSite'],
    },
  },
  collections: [
    Users,
    Media,
    Projects,
    Capstones,
    Experience,
    TechStack,
    Messages,
  ],
  globals: [Profile, About],
  endpoints: [
    { path: '/reset-site', method: 'post', handler: resetSiteHandler },
  ],
  editor: lexicalEditor(),
  secret,
  csrf: trusted,
  cors: trusted,
  graphQL: { disable: true },
  upload: { limits: { fileSize: 4_000_000 } },
  db: mongooseAdapter({ url: process.env.DATABASE_URL || '' }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: { disablePayloadAccessControl: true },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
