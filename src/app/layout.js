import { Inter, Syne } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
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
  authors: [{ name: 'Tawchiful Islam', url: 'https://tawchif.vercel.app' }],
  creator: 'Tawchiful Islam',
  metadataBase: new URL('https://tawchif.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tawchif.vercel.app',
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
  url: 'https://tawchif.vercel.app',
  jobTitle: 'Full-Stack Developer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chittagong',
    addressCountry: 'Bangladesh',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-white">
        <script
          id="google-schema-markup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
