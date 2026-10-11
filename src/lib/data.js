export const personalInfo = {
  name: 'Tawchiful Islam',
  shortName: 'Tawchif',
  title: 'Full-Stack Developer',
  subtitle: 'Turning ideas into clean, interactive web experiences.',
  location: 'Chittagong, Bangladesh',
  email: 'tawchif04@gmail.com',
  bio: "I'm a full-stack developer from Chittagong, Bangladesh. I build across the entire stack - React and Next.js on the frontend, Node.js, Express, and MongoDB on the backend. I care about the details: clean architecture, readable code, and interfaces that actually feel good to use.",
  image: '/images/tawchif.webp',
  resume:
    'https://drive.google.com/file/d/137fe6Z1fmbpzrGc7KesccAiNwvhW3vmy/view?usp=drive_link',
  social: {
    github: 'https://github.com/tawchifulislam',
    linkedin: 'https://linkedin.com/in/tawchiful-islam',
    twitter: 'https://x.com/tawchifulislam',
  },
};

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
    projects: [
      {
        title: 'LLM Usage Metering and Billing Service',
        description:
          'A multi-tenant backend that answers three questions for every customer: how much they have used, what it costs, and whether they have hit their plan limit.',
        points: [
          'Exactly-once metering with idempotency keys and a per-tenant lock, so retried requests never double count.',
          'Quota enforcement with honest status codes: 429 when a quota is exceeded, 402 when the plan is not in good standing.',
          'Cost in integer micro-dollars, with cached input tokens priced lower and reasoning tokens billed as output.',
          'Signature-verified, deduplicated Stripe webhooks, and a background job that sends usage alerts at 80% and 100% of a quota.',
        ],
        stack: [
          'Node.js',
          'Express',
          'PostgreSQL',
          'Zod',
          'Stripe (test mode)',
          'Docker Compose',
        ],
        note: 'AI token counts are simulated and Stripe runs in test mode only.',
        repo: 'https://github.com/tawchifulislam/flyrank-capstone-metering-billing',
      },
      {
        title: 'Embeddable Widget and Lead-Capture Platform',
        description:
          'A platform where a customer creates a form widget, pastes one script tag into any website, and receives the submissions in a dashboard. The public submission endpoint is built for the open internet.',
        points: [
          'Tenant-isolated widget management behind JWT auth, where cross-owner access returns 404 so a widget id never reveals that it exists.',
          'Public submission endpoint with validation, CORS, per-IP and per-widget rate limits, honeypot spam filtering, and idempotency keys.',
          'Geo enrichment with provider fallback, and an email notification in a background job with 3 attempts that never blocks a submission.',
          'A versioned, immutable, long-cached widget bundle behind a short-lived loader, verified from a second origin.',
        ],
        stack: ['Node.js', 'PostgreSQL', 'Zod', 'JWT', 'Docker Compose'],
        note: 'Geo lookups and email are mocked by default, and rate limit counters live in the memory of one server process.',
        repo: 'https://github.com/tawchifulislam/flyrank-capstone-widget-platform',
      },
      {
        title: 'Social Media Studio',
        description:
          'Turns one blog post into a social campaign: one variant per platform, a person approves each variant, and a scheduler publishes each approved variant once through a single adapter interface.',
        points: [
          'Review workflow from draft to approved or rejected, with length and hashtag limits per platform enforced in code.',
          'Idempotent publishing: a unique key per variant and slot time, plus an atomic claim so concurrent calls cannot both publish.',
          'Crash recovery that verifies stuck slots through an adapter lookup, and retries with exponential backoff and jitter.',
          'One SocialPublisher interface with a real Telegram adapter and mock X and LinkedIn adapters.',
        ],
        stack: ['Node.js', 'SQLite', 'Telegram Bot API'],
        note: 'Variants come from templates, not an AI model, and the API has no authentication.',
        repo: 'https://github.com/tawchifulislam/flyrank-capstone-social-studio',
      },
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
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#techstack' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];
