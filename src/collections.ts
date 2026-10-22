import { collectionHooks } from './revalidate';
import type { CollectionConfig } from 'payload';

const SITE =
  process.env.NODE_ENV === 'production'
    ? 'https://tawchif.vercel.app'
    : 'http://localhost:3000';

// Users (admin login)
export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 14400,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  admin: {
    useAsTitle: 'email',
    group: 'Settings',
    description: 'Admin accounts. Keep this list short.',
  },
  fields: [],
};

// Media (every image on the site)
export const Media: CollectionConfig = {
  slug: 'media',
  hooks: collectionHooks,
  access: { read: () => true }, // images must be public so visitors can see them
  upload: { mimeTypes: ['image/*'] },
  admin: {
    group: 'Content',
    description:
      'Every image used on the site. Upload here, then pick it inside a project or the profile.',
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Short description of the image (for accessibility).',
      },
    },
  ],
};

// Documents (PDF files such as the resume)
export const Documents: CollectionConfig = {
  slug: 'documents',
  access: { read: () => true },
  hooks: collectionHooks,
  upload: { mimeTypes: ['application/pdf'] },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description:
      'PDF files, for example the resume. Upload here, then pick the file in Profile and Hero.',
    hideAPIURL: true,
  },
  fields: [{ name: 'title', type: 'text', required: true }],
};

// Projects (Work section + case study pages)
export const Projects: CollectionConfig = {
  slug: 'projects',
  hooks: collectionHooks,
  defaultSort: 'order',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'order', 'updatedAt'],
    listSearchableFields: ['title', 'slug'],
    group: 'Content',
    description:
      'Case studies shown in the Work section. A smaller order number shows first.',
    hideAPIURL: true,
    preview: doc => `${SITE}/projects/${doc.slug}`,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Used in the page URL, e.g. brawnix. Lowercase letters, numbers and dashes only.',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        position: 'sidebar',
        description: 'Smaller number shows first.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      admin: { description: 'Technologies used. Type one and press Enter.' },
    },
    { name: 'liveUrl', type: 'text', required: true, label: 'Live site URL' },
    {
      name: 'githubUrl',
      type: 'text',
      required: true,
      label: 'GitHub URL (client, or the only repo)',
    },
    { name: 'serverUrl', type: 'text', label: 'Server repo URL (optional)' },
    { name: 'problem', type: 'textarea', required: true },
    { name: 'approach', type: 'textarea', required: true },
    {
      name: 'keyDecisions',
      type: 'array',
      label: 'Key decisions',
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    { name: 'outcome', type: 'textarea', required: true },
    {
      name: 'whatsNext',
      type: 'array',
      label: "What's next",
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
  ],
};

// Capstones (cards under the Work section)
export const Capstones: CollectionConfig = {
  slug: 'capstones',
  hooks: collectionHooks,
  defaultSort: 'order',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
    group: 'Content',
    description: 'Internship capstone cards shown under the Work section.',
    hideAPIURL: true,
    preview: () => `${SITE}/#work`,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        position: 'sidebar',
        description: 'Smaller number shows first.',
      },
    },
    { name: 'summary', type: 'textarea', required: true },
    {
      name: 'note',
      type: 'textarea',
      admin: {
        description: 'Honest limitations note shown under the summary.',
      },
    },
    { name: 'repo', type: 'text', required: true, label: 'GitHub repo URL' },
  ],
};

// Experience
export const Experience: CollectionConfig = {
  slug: 'experience',
  hooks: collectionHooks,
  labels: { singular: 'Experience', plural: 'Experience' },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['role', 'organization', 'period', 'order'],
    group: 'Content',
    description: 'Roles shown in the Experience section.',
    hideAPIURL: true,
    preview: () => `${SITE}/#experience`,
  },
  fields: [
    { name: 'role', type: 'text', required: true },
    { name: 'organization', type: 'text', required: true },
    {
      name: 'mode',
      type: 'text',
      admin: { description: 'e.g. Remote, On-site, Hybrid' },
    },
    {
      name: 'period',
      type: 'text',
      required: true,
      admin: { description: 'e.g. Jul 2026 to Oct 2026' },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        position: 'sidebar',
        description: 'Smaller number shows first.',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          admin: {
            description:
              'Put ** on both sides of a phrase to make it bold, e.g. **35 assignments**.',
          },
        },
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true, label: 'URL' },
      ],
    },
  ],
};

// Tech stack
export const TechStack: CollectionConfig = {
  slug: 'tech-stack',
  hooks: collectionHooks,
  labels: { singular: 'Tech', plural: 'Tech Stack' },
  defaultSort: 'name',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'icon'],
    group: 'Content',
    description:
      'Tools and languages shown in the Tech stack section, grouped by category.',
    hideAPIURL: true,
    preview: () => `${SITE}/#techstack`,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Core', value: 'core' },
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Tools', value: 'tools' },
      ],
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description:
          'Icon name from simpleicons.org, e.g. react, docker, nextdotjs. Leave empty for a default icon.',
      },
    },
  ],
};

// Messages (contact form inbox)
export const Messages: CollectionConfig = {
  slug: 'messages',
  defaultSort: '-createdAt',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'isRead', 'createdAt'],
    group: 'Inbox',
    description:
      'Messages sent from the contact form. Tick Marked as read once handled.',
    hideAPIURL: true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, admin: { readOnly: true } },
    { name: 'email', type: 'email', required: true, admin: { readOnly: true } },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'isRead',
      type: 'checkbox',
      label: 'Marked as read',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
};
