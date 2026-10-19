import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { personalInfo } from '@/lib/data';
import { SITE_URL } from '@/lib/constants';

const bricolage = localFont({
  src: '../../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2',
  variable: '--font-bricolage',
  weight: '200 800',
  display: 'swap',
});

const plexSans = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexMono = localFont({
  src: '../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2',
  variable: '--font-plex-mono',
  weight: '400',
  display: 'swap',
});

export const viewport = {
  themeColor: '#0b1220',
};

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tawchiful Islam - Full-Stack Developer',
    description:
      'Full-stack developer from Chittagong, Bangladesh. Building clean, responsive, and user-friendly web experiences with React, Next.js, Node.js, and more.',
    creator: '@tawchifulislam',
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
      className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
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
        <ScrollToTop />
      </body>
    </html>
  );
}
