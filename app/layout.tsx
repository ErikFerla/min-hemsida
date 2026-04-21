import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import { OrganizationSchema, WebSiteSchema } from '@/app/components/SchemaOrg';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mymallorca.se'),
  alternates: { canonical: '/' },
  title: 'Mallorca guide på svenska 2026 – Stränder, städer & tips | MyMallorca',
  description: 'Din kompletta guide till Mallorca på svenska. Hitta de bästa stränderna, städerna, restaurangerna och aktiviteterna. Insider-tips från Mallorca 2026.',
  keywords: 'Mallorca guide svenska, resa till Mallorca, Mallorca tips, Mallorca stränder 2026, Mallorca familjesemester',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1566993850067-bb8df9c9807e?w=2000&q=80&auto=format" fetchPriority="high" />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`} style={{ margin: 0, background: '#fefefb', color: '#383a46' }}>
        <Navbar />
        <OrganizationSchema />
        <WebSiteSchema />
        <main style={{ width: '100%', overflowX: 'hidden' }}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

