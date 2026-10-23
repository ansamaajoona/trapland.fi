import type { Metadata, Viewport } from 'next';
import { Archivo, Mrs_Saint_Delafield } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { SITE } from '@/app/content';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const signature = Mrs_Saint_Delafield({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

// Departure Mono by Helena Zhang, SIL OFL 1.1 (fonts/DepartureMono-LICENSE.txt).
const departure = localFont({
  src: './fonts/DepartureMono-Regular.woff2',
  variable: '--font-departure',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: 'trapland.fi',
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary',
    title: SITE.title,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${archivo.variable} ${departure.variable} ${signature.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
