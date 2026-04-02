import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });

export const metadata: Metadata = {
  title: 'Mymallorca.se – Din guide till Mallorca',
  description: 'Komplett reseguide till Mallorca på svenska. Stränder, restauranger, vingårdar, golf, aktiviteter och insider-tips från lokalerna.',
  keywords: 'Mallorca, reseguide, stränder, restauranger, golf, aktiviteter, Palma',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className={`${inter.className} ${bebasNeue.variable}`} style={{ margin: 0, background: '#e8e8e8', color: '#111111' }}>
        <Navbar />
        <main>{children}</main>
        <footer style={{ background: '#111', color: 'white', padding: '60px 60px 30px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
              <div>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', letterSpacing: '0.1em', marginBottom: '16px', color: 'white' }}>DIN GUIDE PÅ MALLORCA 🌴</h3>
                <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: '1.7' }}>Din kompletta guide till Mallorca på svenska. Insider-tips, stränder, mat, golf och mycket mer.</p>
              </div>
              <div>
                <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '16px', color: '#f5a623' }}>UTFORSKA</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[['Städer & Byar', '/byar'], ['Stränder', '/strandar'], ['Sevärdheter', '/sevardheter'], ['Mat & Vin', '/mat'], ['Barnvänligt', '/barn']].map(([text, href]) => (
                    <a key={href} href={href} className="footer-link">{text}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '16px', color: '#f5a623' }}>POPULÄRT</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[['Väder', '/vader'], ['Evenemang', '/evenemang'], ['Sevärdigheter', '/sevardheter'], ['Planera din resa', '/'], ['Se alla stränder', '/strandar']].map(([text, href]) => (
                    <a key={text} href={href} className="footer-link">{text}</a>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '16px', color: '#f5a623' }}>STÄDER</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[['Palma de Mallorca', '/palma-de-mallorca'], ['Sóller', '/soller'], ['Porto Colom', '/porto-colom'], ['Santanyí', '/santanyi'], ['Se alla städer', '/byar']].map(([text, href]) => (
                    <a key={href} href={href} className="footer-link">{text}</a>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #333', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>© 2026 mymallorca.se – Din guide till Mallorca</p>
              <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>Med ❤️ från Mallorca</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

