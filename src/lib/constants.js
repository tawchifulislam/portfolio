export const SITE_URL = 'https://tawchif.vercel.app';

export const SECTION_IDS = {
  home: 'home',
  work: 'work',
  about: 'about',
  experience: 'experience',
  techstack: 'techstack',
  contact: 'contact',
};

export const SECTION_ID_LIST = Object.values(SECTION_IDS);

export const EASE = [0.22, 1, 0.36, 1];

export const variants = {
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
};
