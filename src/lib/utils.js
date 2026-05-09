export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const scrollToSection = sectionId => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const formatEmail = email => {
  return `mailto:${email}`;
};
