import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Grytes Mallorca Guide',
  description: 'Din kompletta guide till Mallorca',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer style={{
          borderTop: '1px solid var(--border)',
          padding: '32px 20px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--muted)',
          marginTop: '60px'
        }}>
          <nav style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
            {['Start', 'Byar', 'Strandar', 'Sevardheter', 'Mat', 'Aktiviteter', 'Vader'].map(l => (
              <a key={l} href={l === 'Start' ? '/' : '/' + l.toLowerCase()}
                style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{l}</a>
            ))}
          </nav>
          <p style={{ margin: 0 }}>Webbplatsen innehaller annonslankarna</p>
        </footer>
      </body>
    </html>
  );
}
