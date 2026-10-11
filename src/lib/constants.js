export const SITE_URL = 'https://tawchif.vercel.app';

export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  experience: 'experience',
  techstack: 'techstack',
  projects: 'projects',
  contact: 'contact',
};

export const SECTION_ID_LIST = Object.values(SECTION_IDS);

export const EASE = [0.22, 1, 0.36, 1];

export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: EASE },
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: 32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: EASE },
    },
  },
  drawLine: {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: EASE },
    },
  },
};
