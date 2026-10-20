import type { GlobalConfig } from 'payload';

// Profile: personal info, Hero text, social links, stats
export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Profile & Hero',
  admin: { group: 'Site' },
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
      admin: { description: 'Short intro shown in the Hero.' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile photo',
    },
    { name: 'resume', type: 'text', label: 'Resume link (URL)' },
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
          'Small badge at the top of the Hero. The location is added after it.',
      },
    },
    {
      name: 'headlineStart',
      type: 'text',
      defaultValue: "Hi, I'm Tawchiful. I build",
      admin: { description: 'Big Hero headline, first part.' },
    },
    {
      name: 'headlineHighlight',
      type: 'text',
      defaultValue: 'whole products',
      admin: {
        description:
          'Highlighted (brass colour, underlined) words in the headline.',
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
      label: 'Stats strip',
      admin: {
        description:
          'Numbers shown under the Hero. The "projects shipped" count is added automatically.',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: { description: 'e.g. 35 or 221+' },
        },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
};

// About section
export const About: GlobalConfig = {
  slug: 'about',
  label: 'About',
  admin: { group: 'Site' },
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
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
      ],
    },
  ],
};
