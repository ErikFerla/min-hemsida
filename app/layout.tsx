import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import { OrganizationSchema, WebSiteSchema } from '@/app/components/SchemaOrg';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

const SITE_NAME = 'MyMallorca';
const DEFAULT_TITLE = 'MyMallorca – svensk guide till Mallorca';
const DEFAULT_DESCRIPTION =
  'Svensk guide till Mallorca för barnfamiljer, par och dig som bor på ön – stränder, byar, mat, vingårdar, golf och barnaktiviteter med lokala tips.';
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1566993850067-bb8df9c9807e?w=1200&h=630&fit=crop&q=85';

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
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Palma de Mallorca med katedralen La Seu vid havet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className={`${inter.variable} ${playfair.variable}`} style={{ margin: 0, background: '#fefefb', color: '#383a46' }}>
        <a href="#main" className="skip-link">Hoppa till innehållet</a>
        <Navbar />
        <OrganizationSchema />
        <WebSiteSchema />
        <main id="main" tabIndex={-1} style={{ width: '100%', overflowX: 'hidden' }}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
