import type { Metadata } from 'next';
import { IconPalm } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Sidan kunde inte hittas – MyMallorca',
  description: 'Vi hittar inte sidan du letar efter. Utforska våra guider till stränder, städer och aktiviteter på Mallorca istället.',
  robots: { index: false, follow: true },
};

const popularaLankar: { label: string; href: string; beskrivning: string }[] = [
  { label: 'Förstasidan', href: '/', beskrivning: 'Börja om från startsidan' },
  { label: 'Städer & byar', href: '/byar', beskrivning: '18 utvalda destinationer på ön' },
  { label: 'Stränder', href: '/strandar', beskrivning: 'Från Es Trenc till dolda vikar' },
  { label: 'Planera din resa', href: '/kontakt', beskrivning: 'Skräddarsydda tips från lokalkännare' },
];

export default function NotFound() {
  return (
    <section
      style={{
        background: '#fefefb',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(40px, 8vw, 96px) clamp(16px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '720px', width: '100%', textAlign: 'center' }}>
        <div style={{ color: '#993335', display: 'inline-flex', marginBottom: '16px' }}>
          <IconPalm size={44} />
        </div>

        <p
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#993335',
            margin: '0 0 12px',
          }}
        >
          Felkod 404
        </p>

        <h1
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.6rem, 8vw, 5rem)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            margin: '0 0 20px',
            color: '#383a46',
            lineHeight: 1.05,
          }}
        >
          Sidan kunde inte hittas
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
            lineHeight: 1.7,
            color: '#4b5563',
            margin: '0 auto 48px',
            maxWidth: '52ch',
          }}
        >
          Vi hittar inte sidan du letar efter. Den kan ha flyttats eller aldrig ha funnits. Här är några populära sidor att fortsätta med istället.
        </p>

        <nav aria-label="Populära sidor på MyMallorca">
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'clamp(12px, 2vw, 18px)',
              textAlign: 'left',
            }}
          >
            {popularaLankar.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  style={{
                    display: 'block',
                    padding: '18px 20px',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                    textDecoration: 'none',
                    color: '#383a46',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.15rem',
                      letterSpacing: '0.05em',
                      color: '#383a46',
                      marginBottom: '4px',
                    }}
                  >
                    {l.label}
                  </span>
                  <span style={{ display: 'block', fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.45 }}>
                    {l.beskrivning}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
