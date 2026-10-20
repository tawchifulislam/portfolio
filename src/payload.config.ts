import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
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

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users',
    importMap: { baseDir: path.resolve(dirname) },
    components: {
      beforeDashboard: ['/components/admin/ResetSite'],
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
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({ url: process.env.DATABASE_URL || '' }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: { disablePayloadAccessControl: true },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  sharp,
});
