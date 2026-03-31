import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });

export const metadata: Metadata = {
  title: 'Grytes Mallorca Guide',
  description: 'Din kompletta guide till Mallorca',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className={`${inter.className} ${bebasNeue.variable}`} style={{ margin: 0, background: '#e8e8e8', color: '#111111' }}>
        <Navbar />
        <main>{children}</main>
        <footer style={{
          borderTop: '1px solid #cccccc',
          padding: '32px 20px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#666666',
          marginTop: '60px'
        }}>
          <nav style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
            {['Start', 'Byar', 'Strandar', 'Sevardheter', 'Mat', 'Aktiviteter', 'Vader'].map(l => (
              <a key={l} href={l === 'Start' ? '/' : '/' + l.toLowerCase()}
                style={{ color: '#666666', fontSize: '0.85rem', textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <p style={{ margin: 0 }}>Webbplatsen innehaller annonslankarna</p>
        </footer>
      </body>
    </html>
  );
}
