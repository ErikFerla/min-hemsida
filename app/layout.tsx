import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import FooterAccordion from '@/components/FooterAccordion';

const inter = Inter({ subsets: ['latin'] });
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });

export const metadata: Metadata = {
  title: 'Mymallorca.se – Din personliga guide till Mallorcas bästa hemligheter',
  description: 'Din personliga guide till Mallorcas bästa hemligheter på svenska. Stränder, mat, golf, sevärdheter och insider-tips från en som kan ön utan och innan.',
  keywords: 'Mallorca, reseguide, stränder, restauranger, golf, aktiviteter, Palma',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className={`${inter.className} ${bebasNeue.variable}`} style={{ margin: 0, background: '#FDF8F2', color: '#111111' }}>
        <Navbar />
        <main>{children}</main>
        <footer style={{ background: '#2C2018', color: 'white', padding: '0 0 0' }}>

          {/* Mobilsnabbval ovanför footer – visas bara på mobil */}
          <div className="footer-mobile-quicklinks">
            {[
              { text: '🏖️ Stränder', href: '/strandar' },
              { text: '🏙️ Städer', href: '/byar' },
              { text: '🗺️ Planera resan', href: '/kontakt' },
              { text: '☀️ Väder', href: '/vader' },
              { text: '🎉 Evenemang', href: '/evenemang' },
            ].map(({ text, href }) => (
              <a key={href} href={href} className="footer-mobile-quicklink">{text}</a>
            ))}
          </div>

          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 60px 30px' }} className="footer-inner">

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }} className="footer-desktop-grid">
              <div>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', letterSpacing: '0.1em', marginBottom: '16px', color: '#FDF8F2' }}>DIN GUIDE PÅ MALLORCA 🌴</h3>
                <p style={{ color: 'rgba(253,248,242,0.6)', fontSize: '0.9rem', lineHeight: '1.7' }}>Din kompletta guide till Mallorca på svenska. Insider-tips, stränder, mat, golf och mycket mer.</p>
              </div>
              <div>
                <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '16px', color: '#F59E0B' }}>UTFORSKA</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[['Städer & Byar', '/byar'], ['Stränder', '/strandar'], ['Sevärdheter', '/sevardheter'], ['Mat & Vin', '/mat'], ['Barnvänligt', '/barn']].map(([text, href]) => (
                    <a key={href} href={href} className="footer-link">{text}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '16px', color: '#F59E0B' }}>POPULÄRT</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[['Väder', '/vader'], ['Evenemang', '/evenemang'], ['Sevärdheter', '/sevardheter'], ['Planera din resa', '/kontakt'], ['Se alla stränder', '/strandar']].map(([text, href]) => (
                    <a key={text} href={href} className="footer-link">{text}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '16px', color: '#F59E0B' }}>STÄDER</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[['Palma de Mallorca', '/palma-de-mallorca'], ['Sóller', '/soller'], ['Porto Colom', '/porto-colom'], ['Santanyí', '/santanyi'], ['Se alla städer', '/byar']].map(([text, href]) => (
                    <a key={href} href={href} className="footer-link">{text}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobilaccordion – visas bara på mobil */}
            <FooterAccordion />

            <div style={{ borderTop: '1px solid rgba(253,248,242,0.15)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <p style={{ color: 'rgba(253,248,242,0.35)', fontSize: '0.85rem', margin: 0 }}>© 2026 mymallorca.se – Din guide till Mallorca</p>
              <p style={{ color: 'rgba(253,248,242,0.35)', fontSize: '0.85rem', margin: 0 }}>Med ❤️ från Mallorca</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

