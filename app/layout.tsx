import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import { OrganizationSchema, WebSiteSchema } from '@/app/components/SchemaOrg';
import { DEFAULT_OG_IMAGE } from '@/app/lib/city-seo';

// Self-hostade fonter (latin-subset, från Fontsource, SIL OFL – se app/fonts/OFL-*.txt).
// Bygget beror inte längre på Google Fonts.
// Designsystemet (5.1) använder bara Inter 400/600 och Playfair 700 + kursiv 400,
// så vi laddar statiska filer för exakt de skärningarna (≈93 kB totalt).
const inter = localFont({
  src: [
    { path: './fonts/inter-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/inter-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
});
// Playfair 700 (rubriker) och kursiv 400 (rösten) är två localFont-anrop med SAMMA
// font-family-namn, så att --font-playfair (och därmed --font-heading) täcker båda
// skärningarna. Kursiven syns nästan alltid längre ned på sidan och förladdas inte (5.6) –
// den hämtas när första kursiva texten läggs ut. Bara Inter 400/600 och Playfair 700 får
// <link rel="preload">. Båda anropen behåller adjustFontFallback (Times New Roman med
// justerade mått) så att bytet från reservtypsnittet blir litet.
const playfair = localFont({
  src: './fonts/playfair-display-latin-700-normal.woff2',
  weight: '700',
  style: 'normal',
  variable: '--font-playfair',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
  declarations: [{ prop: 'font-family', value: 'playfair' }],
});
const playfairItalic = localFont({
  src: './fonts/playfair-display-latin-400-italic.woff2',
  weight: '400',
  style: 'italic',
  // Samma familj som ovan; variabeln behövs bara för att @font-face-reglerna ska tas med.
  variable: '--font-playfair-italic',
  display: 'swap',
  preload: false,
  adjustFontFallback: 'Times New Roman',
  declarations: [{ prop: 'font-family', value: 'playfair' }],
});
const SITE_NAME = 'MyMallorca';
const DEFAULT_TITLE = 'MyMallorca – svensk guide till Mallorca';
const DEFAULT_DESCRIPTION =
  'Svensk guide till Mallorca för barnfamiljer, par och dig som bor på ön – stränder, byar, mat, vingårdar, golf och barnaktiviteter med lokala tips.';
// Sajten har bara ljust tema: 'only light' hindrar webbläsarnas automatiska mörkläge
// (t.ex. Chrome på Android) från att invertera ytor och foton. themeColor = --color-bg.
export const viewport: Viewport = {
  colorScheme: 'only light',
  themeColor: '#fefefb',
};

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
      <body className={`${inter.variable} ${playfair.variable} ${playfairItalic.variable}`}>
        <a href="#main" className="skip-link">Hoppa till innehållet</a>
        <Navbar />
        <OrganizationSchema />
        <WebSiteSchema />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
        {/* Cookiefri besöksstatistik (Vercel Web Analytics, samma origin: /_vercel/insights). Skickar bara data i
            produktionsbygget; i `next dev` laddas Vercels felsökningsskript, som bara loggar i konsolen. */}
        <Analytics />
      </body>
    </html>
  );
}
