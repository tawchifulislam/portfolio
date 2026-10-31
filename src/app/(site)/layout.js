import { Syne, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollToTop from '@/components/ui/ScrollToTop';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { getProfile, getTechStack } from '@/lib/cms';
import { buildStructuredData } from '@/lib/seo';
import { SITE_URL } from '@/lib/constants';
import { safeJsonLd } from '@/lib/utils';

const SEO_TITLE = 'Tawchiful Islam | Full Stack Developer';
const SEO_DESCRIPTION =
  'Full Stack Developer (Next.js, TypeScript, Node.js, PostgreSQL) open to remote junior and contract roles. Case studies: idempotent billing, concurrency-safe booking.';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});

export const viewport = {
  themeColor: '#2a3cf2',
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
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
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
      className={`${syne.variable} ${hanken.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full flex-col bg-canvas font-body text-fg"
        suppressHydrationWarning
      >
        <script
          id="google-schema-markup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-full focus:bg-signal focus:px-5 focus:py-3 focus:font-semibold focus:text-night"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <CustomCursor />
        <Navbar />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
