import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import { personalInfo } from '@/lib/data';
import { SITE_URL } from '@/lib/constants';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata = {
  title: 'Tawchiful Islam - Full-Stack Developer',
  description:
    'Full-stack developer from Chittagong, Bangladesh. Building clean, responsive, and user-friendly web experiences with React, Next.js, Node.js, and more.',
  verification: {
    google: 'XLpyYO33DiPxz57WSmbRNp1cSATk6hBbLztjG2zv-do',
  },
  keywords: [
    'Tawchiful Islam',
    'Tawsiful Islam',
    'Tawchif',
    'Tawsif',
    'Full-Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Web Developer Bangladesh',
    'Chittagong Developer',
  ],
  authors: [{ name: 'Tawchiful Islam', url: SITE_URL }],
  creator: 'Tawchiful Islam',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Tawchiful Islam - Full-Stack Developer',
    description:
      'Full-stack developer from Chittagong, Bangladesh. Building clean, responsive, and user-friendly web experiences with React, Next.js, Node.js, and more.',
    siteName: 'Tawchiful Islam',
    images: [
      {
        url: '/images/tawchif.png',
        width: 1200,
        height: 630,
        alt: 'Tawchiful Islam - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tawchiful Islam - Full-Stack Developer',
    description:
      'Full-stack developer from Chittagong, Bangladesh. Building clean, responsive, and user-friendly web experiences with React, Next.js, Node.js, and more.',
    creator: '@tawchifulislam',
    images: ['/images/tawchif.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tawchiful Islam',
  additionalName: 'Tawsiful Islam',
  alternateName: [
    'Tawsif',
    'Tawchif',
    'Tausif',
    'Tosif',
    'Tasif',
    'Taosif',
    'Taosib',
    'Tawsib',
    'Tawchib',
    'Tawchiful',
    'Taosiful',
    'Tawsiful',
  ],
  url: SITE_URL,
  jobTitle: 'Full-Stack Developer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chittagong',
    addressCountry: 'Bangladesh',
  },
  sameAs: [
    personalInfo.social.github,
    personalInfo.social.linkedin,
    personalInfo.social.twitter,
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-ink text-paper"
        suppressHydrationWarning
      >
        <script
          id="google-schema-markup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
