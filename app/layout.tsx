import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import FooterAccordion from '@/components/FooterAccordion';
import { WebSiteSchema } from '@/app/components/SchemaOrg';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mymallorca.se'),
  alternates: { canonical: '/' },
  title: 'Mymallorca.se – Din personliga guide till Mallorcas bästa hemligheter',
  description: 'Din personliga guide till Mallorcas bästa hemligheter på svenska. Stränder, mat, golf, sevärdheter och insider-tips från en som kan ön utan och innan.',
  keywords: 'Mallorca, reseguide, stränder, restauranger, golf, aktiviteter, Palma',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80" />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`} style={{ margin: 0, background: '#FDF8F2', color: '#1F2937' }}>
        <Navbar />
        <WebSiteSchema />
        <main style={{ width: '100%', overflowX: 'hidden' }}>{children}</main>
        <footer style={{ background: '#f5eee4', color: '#1f2937', padding: '0' }}>
          {/* Gold top line */}
          <div style={{ borderTop: '1px solid #c9a96e' }} />

          <div className="footer-inner">
            <div className="footer-desktop-grid">

              {/* Kolumn 1 — Varumärke */}
              <div>
                <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', letterSpacing: '0.1em', color: '#FDF8F2', margin: '0 0 12px' }}>DIN GUIDE PÅ MALLORCA 🌴</p>
                <p style={{ color: 'rgba(253,248,242,0.6)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '24px' }}>Din kompletta guide till Mallorca på svenska. Insider-tips, stränder, mat, golf och mycket mer.</p>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <a href="#" aria-label="Instagram" className="footer-social-link">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Facebook" className="footer-social-link">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Kolumn 2 — UTFORSKA */}
              <div>
                <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a96e', fontWeight: 600, margin: '0 0 16px' }}>UTFORSKA</p>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[['Städer & Byar', '/byar'], ['Stränder', '/strandar'], ['Sevärdheter', '/sevardheter'], ['Mat & Vin', '/mat'], ['Golf', '/aktiviteter/golf'], ['Aktiviteter', '/aktiviteter']].map(([text, href]) => (
                    <a key={href} href={href} className="footer-nav-link">{text}</a>
                  ))}
                </div>
              </div>

              {/* Kolumn 3 — POPULÄRT */}
              <div>
                <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a96e', fontWeight: 600, margin: '0 0 16px' }}>POPULÄRT</p>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[['Väder', '/vader'], ['Evenemang', '/evenemang'], ['Sevärdheter', '/sevardheter'], ['Planera din resa', '/kontakt'], ['Se alla stränder', '/strandar']].map(([text, href]) => (
                    <a key={text} href={href} className="footer-nav-link">{text}</a>
                  ))}
                </div>
              </div>

              {/* Kolumn 4 — STÄDER */}
              <div>
                <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a96e', fontWeight: 600, margin: '0 0 16px' }}>STÄDER</p>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[['Palma de Mallorca', '/palma-de-mallorca'], ['Sóller', '/soller'], ['Valldemossa', '/valldemossa'], ['Alcúdia', '/alcudia'], ['Pollença', '/pollenca'], ['Porto Colom', '/porto-colom'], ['Se alla städer →', '/byar']].map(([text, href]) => (
                    <a key={href} href={href} className="footer-nav-link">{text}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobilaccordion */}
            <FooterAccordion />
          </div>

          {/* Footer bottom */}
          <div className="footer-bottom">
            <p style={{ color: 'rgba(253,248,242,0.5)', fontSize: '13px', margin: 0 }}>© 2026 mymallorca.se</p>
            <p style={{ color: 'rgba(253,248,242,0.5)', fontSize: '13px', margin: 0 }}>Integritetspolicy · Cookies</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

