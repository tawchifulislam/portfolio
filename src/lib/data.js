export const personalInfo = {
  name: 'Tawchiful Islam',
  shortName: 'Tawchif',
  title: 'Full-Stack Developer',
  subtitle: 'Turning ideas into clean, interactive web experiences.',
  location: 'Chittagong, Bangladesh',
  email: 'tawchif04@gmail.com',
  phone: '+8801616241205',
  bio: "I'm a full-stack developer from Chittagong, Bangladesh, passionate about crafting clean, responsive, and performant web applications. Currently expanding into full-stack development with Node.js, Express, and MongoDB - always learning, always building.",
  image: '/images/tawchif.png',
  resume:
    'https://drive.google.com/file/d/137fe6Z1fmbpzrGc7KesccAiNwvhW3vmy/view?usp=drive_link',
  social: {
    github: 'https://github.com/tawchifulislam',
    linkedin: 'https://linkedin.com/in/tawchiful-islam',
    twitter: 'https://x.com/tawchifulislam',
  },
};

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

export const projects = [
  {
    id: '1',
    title: 'Brawnix',
    description:
      'A full-stack, role-based gym and fitness class management platform connecting members, trainers, and administrators in a single ecosystem - digitizing class discovery, booking, payment, and community engagement.',
    longDescription:
      'Brawnix is a full-stack, role-based gym and fitness class management platform that connects members, trainers, and administrators in a single ecosystem - digitizing class discovery, booking, payment, and community engagement that traditional gyms manage manually or through disconnected tools. The platform features three-tier role-based access control with isolated dashboards, Stripe-powered payments, a community forum with nested comment threads, and a real-time analytics dashboard for admins.',
    tags: [
      'Next.js',
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'BetterAuth',
      'Stripe',
      'Framer Motion',
    ],
    image: '/images/projects/brawnix.png',
    liveUrl: 'https://brawnix.vercel.app',
    githubUrl: 'https://github.com/tawchifulislam/brawnix-client',
    serverUrl: 'https://github.com/tawchifulislam/brawnix-server',
    featured: true,
    challenges: [
      'Designing a three-tier role-based access control system (Member, Trainer, Admin) with isolated dashboards and protected routes enforced via JWT verification on every API request.',
      'Integrating Stripe payments into the class booking flow while keeping the checkout experience smooth and reliable.',
      'Implementing server-side pagination, search, and category filtering directly with MongoDB queries for efficient data handling at scale.',
    ],
    improvements: [
      'Add a live class scheduling calendar with recurring session support.',
      'Implement push notifications for class approvals and trainer responses.',
      'Expand the analytics dashboard with revenue and retention insights.',
    ],
  },
  {
    id: '2',
    title: 'Healync',
    description:
      'A full-stack doctor appointment booking platform that bridges the gap between patients and verified medical specialists, combining appointment management, preventive health awareness, and personalized in-hospital assistance.',
    longDescription:
      'Healync is a full-stack healthcare platform designed to replace manual hospital visits with a modern, digital-first approach to medical appointments. Patients can browse verified specialists across multiple medical fields, book appointments through a secure, role-protected flow, and manage their schedule in real time. The platform also offers an on-demand Medical Companion service, automated email appointment reminders via Nodemailer and node-cron, and curated daily health tips to promote preventive healthcare awareness.',
    tags: [
      'Next.js',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'BetterAuth',
      'Nodemailer',
    ],
    image: '/images/projects/healync.png',
    liveUrl: 'https://healync.vercel.app',
    githubUrl: 'https://github.com/tawchifulislam/healync-client',
    serverUrl: 'https://github.com/tawchifulislam/healync-server',
    featured: true,
    challenges: [
      'Designing a real-time appointment management dashboard that lets patients view, update, or cancel bookings instantly without page reloads.',
      'Integrating the on-demand Medical Companion request flow into the booking pipeline while keeping the user experience intuitive and friction-free.',
      'Building an automated email reminder system with Nodemailer and scheduled cron jobs to proactively notify patients and reduce no-shows.',
    ],
    improvements: [
      'Add an in-app chat or video consultation feature for remote appointments.',
      'Implement SMS-based reminders alongside the existing email system.',
      'Build a dedicated admin and doctor dashboard for managing schedules, patient records, and companion assignments.',
    ],
  },
  {
    id: '3',
    title: 'Roamly',
    description:
      'A full-stack travel discovery platform that helps users explore destinations, view real traveler-driven trip ratings, and get personalized travel suggestions through an integrated AI chat assistant.',
    longDescription:
      'Roamly is a full-stack travel discovery platform built to solve decision fatigue when planning trips - instead of sifting through generic listings, users can explore destinations backed by real trip ratings and chat with an AI assistant powered by Google Gemini for personalized recommendations. The platform includes Google OAuth authentication via BetterAuth, a live trip rating system with real-time data fetching, and a fully independent frontend/backend deployment architecture.',
    tags: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'BetterAuth',
      'Gemini API',
      'Recharts',
    ],
    image: '/images/projects/roamly.png',
    liveUrl: 'https://roamly.vercel.app',
    githubUrl: 'https://github.com/tawchifulislam/roamly-client',
    serverUrl: 'https://github.com/tawchifulislam/roamly-server',
    featured: true,
    challenges: [
      'Resolving cross-domain cookie authentication issues in production by implementing a Next.js rewrite proxy so all API calls appear same-origin to the browser.',
      'Integrating the Gemini API to power a conversational AI assistant that gives genuinely useful, context-aware travel suggestions.',
      'Replacing an initial recommendation-engine concept with a trip rating system for more trustworthy, user-driven signal, based on clarified requirements.',
    ],
    improvements: [
      'Add collaborative trip planning where multiple users can build an itinerary together.',
      'Introduce personalized destination feeds based on past ratings and chat history.',
      'Expand the AI assistant to generate full day-by-day itineraries.',
    ],
  },
  {
    id: '4',
    title: 'Meghdut',
    description:
      'A minimal dark-aesthetic weather app delivering real-time conditions, 3-day forecasts, sunrise/sunset times, and city search - built with pure HTML, CSS, JS, and WeatherAPI.',
    longDescription:
      'Meghdut is a beautifully designed weather application with a dark glassmorphism aesthetic. It fetches real-time weather data using the WeatherAPI and displays current conditions, a 3-day forecast, humidity, wind speed, and sunrise/sunset times. Users can search for any city worldwide and get instant weather updates. Built entirely with vanilla JavaScript without any frameworks.',
    tags: ['Vanilla JS', 'WeatherAPI', 'HTML5', 'Tailwind CSS'],
    image: '/images/projects/meghdut.png',
    liveUrl: 'https://meghdut.vercel.app',
    githubUrl: 'https://github.com/tawchifulislam/Meghdut',
    featured: false,
    challenges: [
      'Handling API rate limits and error states gracefully when the WeatherAPI returns errors for invalid city names.',
      'Creating a smooth glassmorphism UI using only vanilla CSS without any component library.',
      'Managing asynchronous API calls and updating the DOM dynamically without a framework.',
    ],
    improvements: [
      "Add geolocation support to auto-detect the user's city on load.",
      'Implement an hourly forecast view in addition to the 3-day forecast.',
      'Add weather-based background animations that change with conditions.',
    ],
  },
  {
    id: '5',
    title: 'DaanBaksho',
    description:
      'A full-stack crowdfunding platform built around a credit economy, connecting supporters, creators, and admins in a transparent fundraising ecosystem.',
    longDescription:
      'DaanBaksho is a full-stack crowdfunding platform where Creators launch campaigns, Supporters contribute through a credit-based economy, and Admins oversee platform activity - all secured through a custom JWT authentication flow. The platform integrates Stripe (test mode) for credit purchases and imgBB for campaign image hosting, with role-specific dashboards tailored to each user type.',
    tags: [
      'Next.js',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'BetterAuth',
      'Stripe',
      'JWT',
    ],
    image: '/images/projects/daanbaksho.png',
    liveUrl: 'https://daanbaksho.vercel.app',
    githubUrl: 'https://github.com/tawchifulislam/daanbaksho-client',
    serverUrl: 'https://github.com/tawchifulislam/daanbaksho-server',
    featured: false,
    challenges: [
      'Replacing the BetterAuth JWT plugin (which threw Base64 errors) with a custom /api/token route issuing HMAC-signed JWTs via jsonwebtoken.',
      'Fixing an infinite redirect loop in the axios interceptor caused by improper handling of 401/403 responses.',
      'Designing a credit-based economy that ties Stripe test-mode payments directly to campaign contributions across three distinct user roles.',
    ],
    improvements: [
      'Add campaign progress notifications for supporters who back a project.',
      'Implement a public leaderboard of top-funded campaigns.',
      'Add withdrawal requests and payout tracking for creators.',
    ],
  },
];

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#techstack' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];
