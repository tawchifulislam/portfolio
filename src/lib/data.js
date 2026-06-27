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
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'JWT', category: 'backend' },
  { name: 'Git', category: 'tools' },
  { name: 'GitHub', category: 'tools' },
  { name: 'VS Code', category: 'tools' },
  { name: 'Vercel', category: 'tools' },
  { name: 'Netlify', category: 'tools' },
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
    title: 'BondTrace',
    description:
      'A relationship management app that tracks how recently each friend has been contacted, flags relationships at risk of fading, and logs every call, text, and video interaction in an organized, visual timeline.',
    longDescription:
      'BondTrace is a relationship management app designed to help users stay consistently connected with the people who matter most in their lives. The app tracks how recently each friend has been contacted, flags relationships that are at risk of fading, and logs every call, text, and video interaction in an organized timeline. A dedicated analytics page visualizes interaction patterns through charts, helping users instantly see how much attention they have given to each relationship - turning everyday communication habits into clear, measurable insights.',
    tags: ['React.js', 'Vite', 'React Router DOM', 'Recharts', 'Tailwind CSS'],
    image: '/images/projects/bondtrace.png',
    liveUrl: 'https://bondtrace.netlify.app',
    githubUrl: 'https://github.com/tawchifulislam/BondTrace',
    featured: true,
    challenges: [
      'Designing status indicators that accurately highlight relationships needing attention based on contact recency.',
      'Implementing a visual timeline that logs and organizes every call, text, and video interaction clearly.',
      'Building an analytics page with charts that update dynamically as new interaction data is logged.',
    ],
    improvements: [
      "Add push notification reminders to reach out to friends you haven't contacted in a while.",
      'Integrate a calendar view to schedule future interactions.',
      'Add cloud sync so data persists across devices.',
    ],
  },
  {
    id: '4',
    title: 'DigiTools',
    description:
      'A digital marketplace featuring a smart cart system, dynamic pricing plans, toast notifications, and a fully responsive layout from 320px to 1440px+.',
    longDescription:
      'DigiTools is a digital product marketplace built with React 19 and Vite. It features a fully functional smart cart system where users can add or remove products, view cart totals, and proceed to checkout. The platform includes dynamic pricing plans, real-time toast notifications using React-Toastify, and a scroll-aware navbar. The design is fully responsive from 320px to 1440px+.',
    tags: ['React 19', 'Vite', 'Tailwind CSS v4', 'DaisyUI v5'],
    image: '/images/projects/digitools.png',
    liveUrl: 'https://digtools.netlify.app',
    githubUrl: 'https://github.com/tawchifulislam/DigiTools',
    featured: false,
    challenges: [
      'Building a smart cart system that updates in real-time across the navbar and cart section simultaneously.',
      'Implementing a scroll-aware navbar that changes style based on scroll position without performance issues.',
      'Ensuring pixel-perfect responsiveness across all screen sizes from 320px to 1440px+.',
    ],
    improvements: [
      'Add a payment gateway integration for actual transactions.',
      'Implement a product search and filter system.',
      'Add user authentication for personalized cart persistence.',
    ],
  },
  {
    id: '5',
    title: 'Meghdut',
    description:
      'A minimal dark-aesthetic weather app delivering real-time conditions, 5-day forecasts, sunrise/sunset times, and city search - built with pure HTML, CSS, JS, and WeatherAPI.',
    longDescription:
      'Meghdut is a beautifully designed weather application with a dark glassmorphism aesthetic. It fetches real-time weather data using the WeatherAPI and displays current conditions, a 5-day forecast, humidity, wind speed, and sunrise/sunset times. Users can search for any city worldwide and get instant weather updates. Built entirely with vanilla JavaScript without any frameworks.',
    tags: ['Vanilla JS', 'WeatherAPI', 'HTML5', 'Tailwind CSS'],
    image: '/images/projects/meghdut.png',
    liveUrl: 'https://meghdut-weather.netlify.app',
    githubUrl: 'https://github.com/tawchifulislam/Meghdut',
    featured: false,
    challenges: [
      'Handling API rate limits and error states gracefully when the WeatherAPI returns errors for invalid city names.',
      'Creating a smooth glassmorphism UI using only vanilla CSS without any component library.',
      'Managing asynchronous API calls and updating the DOM dynamically without a framework.',
    ],
    improvements: [
      "Add geolocation support to auto-detect the user's city on load.",
      'Implement an hourly forecast view in addition to the 5-day forecast.',
      'Add weather-based background animations that change with conditions.',
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
