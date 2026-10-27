import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { getProfile, getTechStack } from '@/lib/cms';
import { buildStructuredData } from '@/lib/seo';
import { SITE_URL } from '@/lib/constants';
import { safeJsonLd } from '@/lib/utils';

const SEO_TITLE = 'Tawchiful Islam | Full Stack Developer';
const SEO_DESCRIPTION =
  'Full Stack Developer (Next.js, TypeScript, Node.js, PostgreSQL) open to remote junior and contract roles. Case studies: idempotent billing, concurrency-safe booking.';

const bricolage = localFont({
  src: '../../../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2',
  variable: '--font-bricolage',
  weight: '200 800',
  display: 'swap',
});

const plexSans = localFont({
  src: [
    {
      path: '../../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexMono = localFont({
  src: '../../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2',
  variable: '--font-plex-mono',
  weight: '400',
  display: 'swap',
});

export const viewport = {
  themeColor: '#0b1220',
};

export const metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  verification: {
    google: 'XLpyYO33DiPxz57WSmbRNp1cSATk6hBbLztjG2zv-do',
  },
  keywords: [
    'Tawchiful Islam',
    'Remote Full Stack Developer',
    'Node.js Developer',
    'PostgreSQL',
    'Next.js',
    'Stripe',
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
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    siteName: 'Tawchiful Islam',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
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

export default async function RootLayout({ children }) {
  const [{ personalInfo }, techStack] = await Promise.all([
    getProfile(),
    getTechStack(),
  ]);
  const jsonLd = buildStructuredData({ personalInfo, techStack });

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
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
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
