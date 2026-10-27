import { SITE_URL } from '@/lib/constants';

// other spellings people may type
const ALTERNATE_NAMES = ['Tawchif', 'Tawchif Islam', 'Tawsiful Islam'];

export function buildStructuredData({ personalInfo, techStack }) {
  const personId = `${SITE_URL}/#person`;
  const [givenName, ...rest] = personalInfo.name.split(' ');

  const knowsAbout = techStack
    .filter(tech => ['frontend', 'backend', 'database'].includes(tech.category))
    .map(tech => tech.name);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: personalInfo.name,
        givenName,
        familyName: rest.join(' '),
        alternateName: ALTERNATE_NAMES,
        url: SITE_URL,
        image: personalInfo.image || undefined,
        jobTitle: personalInfo.title,
        description: personalInfo.bio,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chittagong',
          addressRegion: 'Chittagong Division',
          addressCountry: 'BD',
        },
        homeLocation: {
          '@type': 'Place',
          name: 'Chittagong (Chattogram), Bangladesh',
        },
        knowsAbout,
        sameAs: Object.values(personalInfo.social).filter(Boolean),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${personalInfo.name} | Portfolio`,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
    ],
  };
}
