export const personalInfo = {
  name: 'Tawchiful Islam',
  shortName: 'Tawchif',
  title: 'Frontend Developer',
  subtitle: 'Turning ideas into clean, interactive web experiences.',
  location: 'Chittagong, Bangladesh',
  email: 'tawchif04@gmail.com',
  bio: "I'm a frontend developer from Chittagong, Bangladesh, passionate about crafting clean, responsive, and performant web applications. Currently expanding into full-stack development with Node.js, Express, and MongoDB — always learning, always building.",
  image: '/images/tawchif.jpg',
  resume: '/resume.pdf',
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
    id: 1,
    title: 'Bookworm',
    description:
      'A full-stack digital library app where users can explore books, filter by category, and borrow titles digitally. Built with Next.js API routes, MongoDB, and BetterAuth for secure authentication.',
    tags: ['Next.js', 'Tailwind CSS', 'DaisyUI', 'MongoDB', 'BetterAuth'],
    liveUrl: 'https://bookworm-nxt.vercel.app',
    githubUrl: 'https://github.com/tawchifulislam/Bookworm-Nxt',
    featured: true,
  },
  {
    id: 2,
    title: 'Keen Keeper',
    description:
      'A relationship manager app to track interactions with friends — calls, texts, and video — and visualize communication patterns through interactive pie charts.',
    tags: ['React', 'React Router', 'Tailwind CSS', 'Recharts'],
    liveUrl: 'https://keeen.netlify.app',
    githubUrl: 'https://github.com/tawchifulislam/KEEN',
    featured: true,
  },
  {
    id: 3,
    title: 'DigiTools',
    description:
      'A digital marketplace featuring a smart cart system, dynamic pricing plans, toast notifications, and a fully responsive layout from 320px to 1440px+.',
    tags: ['React 19', 'Vite', 'Tailwind CSS v4', 'DaisyUI v5'],
    liveUrl: 'https://digtools.netlify.app',
    githubUrl: 'https://github.com/tawchifulislam/DigiTools',
    featured: false,
  },
  {
    id: 4,
    title: 'Meghdut',
    description:
      'A minimal dark-aesthetic weather app delivering real-time conditions, 5-day forecasts, sunrise/sunset times, and city search — built with pure HTML, CSS, JS, and WeatherAPI.',
    tags: ['Vanilla JS', 'WeatherAPI', 'HTML5', 'Tailwind CSS'],
    liveUrl: 'https://meghdut-weather.netlify.app',
    githubUrl: 'https://github.com/tawchifulislam/Meghdut',
    featured: false,
  },
  {
    id: 5,
    title: 'GitHub Issues Tracker',
    description:
      'A lightweight tool to search and filter GitHub repository issues by status using the GitHub REST API — built with vanilla JavaScript.',
    tags: ['Vanilla JS', 'GitHub REST API', 'HTML', 'CSS'],
    liveUrl: 'https://t4wchif.github.io/GitHub-Issues-Tracker/',
    githubUrl: 'https://github.com/tawchifulislam/GitHub-Issues-Tracker',
    featured: false,
  },
];

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#techstack' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];
