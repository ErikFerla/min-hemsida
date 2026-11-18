import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import { OrganizationSchema, WebSiteSchema } from '@/app/components/SchemaOrg';
import { DEFAULT_OG_IMAGE } from '@/app/lib/city-seo';

// Self-hostade fonter (latin-subset, från Fontsource, SIL OFL – se app/fonts/OFL-*.txt).
// Bygget beror inte längre på Google Fonts.
const inter = localFont({
  src: './fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-inter',
  display: 'swap',
});
const playfair = localFont({
  src: './fonts/playfair-display-latin-wght-normal.woff2',
  weight: '400 900',
  style: 'normal',
  variable: '--font-playfair',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});
const SITE_NAME = 'MyMallorca';
const DEFAULT_TITLE = 'MyMallorca – svensk guide till Mallorca';
const DEFAULT_DESCRIPTION =
  'Svensk guide till Mallorca för barnfamiljer, par och dig som bor på ön – stränder, byar, mat, vingårdar, golf och barnaktiviteter med lokala tips.';
// Ingen canonical här: den ärvs annars av alla sidor som saknar egen och pekar dem mot startsidan.
// Varje sida/layout sätter sin egen självrefererande canonical via alternates.
export const metadata: Metadata = {
  metadataBase: new URL('https://www.mymallorca.se'),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'sv_SE',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <a href="#main" className="skip-link">Hoppa till innehållet</a>
        <Navbar />
        <OrganizationSchema />
        <WebSiteSchema />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
