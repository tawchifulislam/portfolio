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
    id: '1',
    title: 'Healync',
    description:
      'A full-stack doctor appointment booking platform that streamlines specialist discovery and consultation scheduling. Built with Next.js, Node.js, MongoDB, and BetterAuth for a seamless digital-first patient experience.',
    longDescription:
      'Healync is a full-stack healthcare platform designed to replace manual hospital visits with a modern, digital-first approach to medical appointments. Patients can browse verified specialists across multiple medical fields, book appointments directly, and even request a trained Medical Companion for in-person support during hospital visits, tests, and prescription reviews. The platform also delivers curated daily health tips covering nutrition, vision care, bone health, and lifestyle habits to promote preventive healthcare awareness. Secure session management is handled by BetterAuth, ensuring a safe and smooth experience for every user,',
    tags: [
      'Next.js',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'BetterAuth',
    ],
    image: '/images/projects/healync.png',
    liveUrl: 'https://healync.vercel.app',
    githubUrl: 'https://github.com/tawchifulislam/healnyc',
    serverUrl: 'https://github.com/tawchifulislam/healnyc-server',
    featured: true,
    challenges: [
      'Designing a real-time appointment scheduling system that prevents double-booking and accurately reflects specialist availability across time zones.',
      'Integrating the Medical Companion request flow into the booking pipeline while keeping the user experience intuitive and friction-free.',
      'Configuring BetterAuth with a separate Node.js/Express backend and MongoDB to maintain secure, consistent session management across client and server.',
    ],
    improvements: [
      'Add an in-app chat or video consultation feature for remote appointments.',
      'Implement automated appointment reminders and follow-up notifications via email or SMS.',
      'Build a dedicated admin and doctor dashboard for managing schedules, patient records, and companion assignments.',
    ],
  },
  {
    id: '2',
    title: 'Bookworm',
    description:
      'A full-stack digital library app where users can explore books, filter by category, and borrow titles digitally. Built with Next.js API routes, MongoDB, and BetterAuth for secure authentication.',
    longDescription:
      'Bookworm is a full-stack digital library platform designed to bring the traditional library experience online. Users can browse an extensive book collection, filter by category, view detailed book information, and digitally borrow titles. The platform features a secure authentication system built with BetterAuth, ensuring user data protection and seamless login experience.',
    tags: ['Next.js', 'Tailwind CSS', 'DaisyUI', 'MongoDB', 'BetterAuth'],
    image: '/images/projects/bookworm.png',
    liveUrl: 'https://bookworm-nxt.vercel.app',
    githubUrl: 'https://github.com/tawchifulislam/Bookworm-Nxt',
    featured: true,
    challenges: [
      'Implementing BetterAuth for secure session management was complex as it required careful configuration with MongoDB.',
      'Building a dynamic borrowing system that tracks book availability in real-time across multiple users.',
      'Optimizing MongoDB queries for fast book filtering and search across large datasets.',
    ],
    improvements: [
      'Add a user review and rating system for books.',
      'Implement email notifications for due date reminders.',
      'Add an admin dashboard for managing the book inventory.',
    ],
  },
  {
    id: '3',
    title: 'Keen Keeper',
    description:
      'A relationship manager app to track interactions with friends-calls, texts, and video-visualizing communication patterns through interactive pie charts and sending automated reminders for friends you haven`t spoken to in a while.',
    longDescription:
      'Keen Keeper is a relationship management web app that helps users maintain meaningful connections with friends and family. It allows users to log interactions - phone calls, text messages, and video calls - and visualize their communication patterns through interactive pie charts powered by Recharts. The app encourages intentional relationship building by making communication habits visible.',
    tags: ['React', 'React Router', 'Tailwind CSS', 'Recharts', 'Context API'],
    image: '/images/projects/keenkeeper.png',
    liveUrl: 'https://keeen.netlify.app',
    githubUrl: 'https://github.com/tawchifulislam/KEEN',
    featured: true,
    challenges: [
      'Designing an intuitive UI that makes logging interactions quick and frictionless.',
      'Implementing dynamic chart updates using Recharts whenever new interaction data is added.',
      'Managing complex state across multiple components without a global state manager.',
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
