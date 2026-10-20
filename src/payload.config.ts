import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
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

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users',
    importMap: { baseDir: path.resolve(dirname) },
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
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({ url: process.env.DATABASE_URL || '' }),
  sharp,
});
