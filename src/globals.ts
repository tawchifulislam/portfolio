import sectionDefaults from './lib/sectionDefaults.json';
import { globalHooks } from './revalidate';
import type { GlobalConfig } from 'payload';

const SITE =
  process.env.NODE_ENV === 'production'
    ? 'https://tawchif.vercel.app'
    : 'http://localhost:3000';

export const Profile: GlobalConfig = {
  slug: 'profile',
  hooks: globalHooks,
  label: 'Profile & Hero',
  admin: {
    group: 'Site',
    description: 'Your name, photo, Hero text, links and stats.',
    preview: () => `${SITE}/`,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'e.g. Full-Stack Developer' },
    },
    { name: 'location', type: 'text' },
    { name: 'email', type: 'email', required: true },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Short intro. Only the first sentence is shown in the Hero, so lead with the strongest one.',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile photo',
      admin: {
        description:
          'Use a PNG with a transparent background. It sits on the yellow arch in the Hero.',
      },
    },
    {
      name: 'resumeFile',
      type: 'upload',
      relationTo: 'documents',
      label: 'Resume (PDF)',
      admin: {
        description:
          'Upload a PDF in Documents, then pick it here. It replaces the link below.',
      },
    },
    {
      name: 'resume',
      type: 'text',
      label: 'Resume link (URL)',
      admin: { description: 'Used only when no PDF is selected above.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'github', type: 'text', label: 'GitHub URL' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'twitter', type: 'text', label: 'X (Twitter) URL' },
      ],
    },
    {
      name: 'statusText',
      type: 'text',
      defaultValue: 'Open for work',
      admin: {
        description:
          'Small badge at the top of the Hero. Separate parts with a middle dot, for example: Open for work · UTC+6 · available full-time.',
      },
    },
    {
      name: 'headlineStart',
      type: 'text',
      defaultValue: "Hi, I'm Tawchiful. I build",
      admin: {
        description:
          'First part of the Hero headline. The first sentence becomes a small greeting above the big statement.',
      },
    },
    {
      name: 'headlineHighlight',
      type: 'text',
      defaultValue: 'whole products',
      admin: {
        description: 'Middle words of the headline, joined into the statement.',
      },
    },
    {
      name: 'headlineEnd',
      type: 'text',
      defaultValue: ', front to back.',
      admin: { description: 'Headline ending.' },
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      admin: {
        description:
          'Short facts about your work. A stat written like "8 → 1" drives the lane animation in the Hero, and its label becomes the caption under the buttons.',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: { description: 'e.g. 35 or 8 → 1' },
        },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
};

export const About: GlobalConfig = {
  slug: 'about',
  hooks: globalHooks,
  label: 'About',
  admin: {
    group: 'Site',
    description:
      'The About section. The first two sentences of the first paragraph are shown on the page, the rest is kept for screen readers and search.',
    preview: () => `${SITE}/#about`,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Self-taught, and building things that hold up.',
    },
    {
      name: 'paragraphs',
      type: 'array',
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'focuses',
      type: 'array',
      label: 'Focus cards',
      admin: {
        description: 'Keep each text under 40 characters so it shows on the page.',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
      ],
    },
  ],
};

export const SectionTitles: GlobalConfig = {
  slug: 'section-titles',
  label: 'Section titles',
  hooks: globalHooks,
  admin: {
    group: 'Site',
    description:
      'Headings shown above the Work, Experience and Tech stack sections. Only the titles are shown on the current design.',
    preview: () => `${SITE}/#work`,
  },
  fields: [
    {
      name: 'work',
      type: 'group',
      label: 'Work',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
          defaultValue: sectionDefaults.work.eyebrow,
          admin: { description: 'Not shown on the current design.' },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: sectionDefaults.work.title,
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: sectionDefaults.work.description,
          admin: { description: 'Not shown on the current design.' },
        },
      ],
    },
    {
      name: 'experience',
      type: 'group',
      label: 'Experience',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
          defaultValue: sectionDefaults.experience.eyebrow,
          admin: { description: 'Not shown on the current design.' },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: sectionDefaults.experience.title,
        },
      ],
    },
    {
      name: 'techStack',
      type: 'group',
      label: 'Tech stack',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
          defaultValue: sectionDefaults.techStack.eyebrow,
          admin: { description: 'Not shown on the current design.' },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: sectionDefaults.techStack.title,
        },
      ],
    },
  ],
};
