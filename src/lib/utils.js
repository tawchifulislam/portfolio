export const scrollToSection = sectionId => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
export const safeJsonLd = data => JSON.stringify(data).replace(/</g, '\\u003c');
