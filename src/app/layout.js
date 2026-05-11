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
  title: 'Tawchiful Islam - Frontend Developer',
  description:
    'Frontend developer from Chittagong, Bangladesh. Building clean, responsive, and user-friendly web experiences with React and Next.js.',
  verification: {
    google: 'google34ad16eac17c680e',
  },
  keywords: [
    'Tawchiful Islam',
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
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
    title: 'Tawchiful Islam - Frontend Developer',
    description:
      'Frontend developer from Chittagong, Bangladesh. Building clean, responsive, and user-friendly web experiences with React and Next.js.',
    siteName: 'Tawchiful Islam',
    images: [
      {
        url: '/images/tawchif.jpg',
        width: 1200,
        height: 630,
        alt: 'Tawchiful Islam - Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tawchiful Islam - Frontend Developer',
    description:
      'Frontend developer from Chittagong, Bangladesh. Building clean, responsive, and user-friendly web experiences with React and Next.js.',
    creator: '@tawchifulislam',
    images: ['/images/tawchif.jpg'],
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
