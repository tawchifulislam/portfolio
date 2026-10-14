export const personalInfo = {
  name: 'Tawchiful Islam',
  shortName: 'Tawchif',
  title: 'Full-Stack Developer',
  subtitle: 'Turning ideas into clean, interactive web experiences.',
  headline: "Hi, I'm Tawchiful. I build whole products, front to back.",
  location: 'Chittagong, Bangladesh',
  email: 'tawchif04@gmail.com',
  bio: "I'm a full-stack developer from Chittagong. React and Next.js on the front, Node, Express and MongoDB behind it. I care about clean architecture, readable code and interfaces that feel good to use.",
  justFinished:
    'Back-End AI Engineering internship with FlyRank, Jul to Oct 2026.',
  image: '/images/tawchif.webp',
  resume:
    'https://drive.google.com/file/d/137fe6Z1fmbpzrGc7KesccAiNwvhW3vmy/view?usp=drive_link',
  social: {
    github: 'https://github.com/tawchifulislam',
    linkedin: 'https://linkedin.com/in/tawchiful-islam',
    twitter: 'https://x.com/tawchifulislam',
  },
};

export const stats = [
  { value: '35', label: 'internship assignments completed' },
  { value: '221+', label: 'documented hours of practice' },
  { value: '20', label: 'verified Anthropic Academy courses' },
];

export const capstones = [
  {
    id: 'metering-billing',
    title: 'LLM Usage Metering and Billing Service',
    summary:
      "A multi-tenant backend that tells every customer how much they've used, what it costs, and whether they've hit their plan limit.",
    note: 'AI token counts are simulated and Stripe runs in test mode only.',
    repo: 'https://github.com/tawchifulislam/flyrank-capstone-metering-billing',
  },
  {
    id: 'widget-platform',
    title: 'Embeddable Widget and Lead-Capture Platform',
    summary:
      'Customers build a form widget, paste one script tag into any site, and collect submissions in a dashboard.',
    note: 'Geo lookups and email are mocked by default, and rate limit counters live in the memory of one server process.',
    repo: 'https://github.com/tawchifulislam/flyrank-capstone-widget-platform',
  },
  {
    id: 'social-studio',
    title: 'Social Media Studio',
    summary:
      'Turns one blog post into a social campaign: a variant per platform, a human approves each one, then a scheduler publishes.',
    note: 'Variants come from templates, not an AI model, and the API has no authentication.',
    repo: 'https://github.com/tawchifulislam/flyrank-capstone-social-studio',
  },
];

export const experience = [
  {
    id: 'flyrank-ai',
    role: 'Back-End AI Engineering Intern',
    organization: 'FlyRank AI Internship Program',
    period: 'Jul 2026 to Oct 2026',
    format: 'Remote internship program',
    track: 'Backend AI Engineering',
    summary:
      'Completed a structured internship program in the Backend AI Engineering track, working through practical assignments and building backend capstone projects.',
    highlights: [
      'Completed 35 practical assignments covering API contracts, task design and prompting, retrieval and grounding, and evaluation and operations.',
      'Had three capstones approved in the Backend AI Engineering track, each with a design document, a build log, and recorded evidence of its checks.',
      'Documented at least 221 hours across assignments, capstone work, program meetings, and coursework.',
      'Attended 7 program meetings and completed 20 verified Anthropic Academy courses.',
    ],
    links: [
      {
        label: 'Certificate',
        href: 'https://drive.google.com/file/d/1yXckSQy8lvMz2fKzgADQY2szZY7yUtkH/view?usp=drive_link',
      },
      {
        label: 'Recommendation Letter',
        href: 'https://drive.google.com/file/d/1U6lrYpVOpUSUPykhD7-iCly5ze6hUnXw/view?usp=drive_link',
      },
      {
        label: 'Verify Online',
        href: 'https://internship.flyrank.ai/verify?id=FR-D11-0A5C0-2D943',
      },
    ],
  },
];

export const techStack = [
  { name: 'HTML5', category: 'core' },
  { name: 'CSS3', category: 'core' },
  { name: 'JavaScript', category: 'core' },
  { name: 'TypeScript', category: 'core' },
  { name: 'Prisma', category: 'core' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'Zustand', category: 'frontend' },
  { name: 'Shadcn', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'JWT', category: 'backend' },
  { name: 'Git', category: 'tools' },
  { name: 'GitHub', category: 'tools' },
  { name: 'VS Code', category: 'tools' },
  { name: 'Vercel', category: 'tools' },
  { name: 'Netlify', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'Render', category: 'tools' },
];

export const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Stack', href: '#techstack' },
];

export const navCta = { name: 'Say hello', href: '#contact' };
