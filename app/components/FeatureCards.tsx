'use client';
import { useEffect, useState } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const items = [
  { icon: '🏖️', title: 'Stränder', desc: 'De 30 bästa stränderna – från vilda klippvikar till familjevänliga sandstränder', href: '/strandar' },
  { icon: '🏙️', title: 'Städer & byar', desc: '18 destinationer med insider-tips från Palma till dolda bergsbyer', href: '/byar' },
  { icon: '🍽️', title: 'Mat & Vin', desc: 'Restaurangtips, lokala vindistriktet och Michelinstjärnor', href: '/mat' },
  { icon: '⛳', title: 'Golf', desc: '22 banor i världsklass – boka rätt bana för din nivå', href: '/aktiviteter/golf' },
  { icon: '🎉', title: 'Evenemang 2026', desc: 'Festivaler, marknader och lokala fester hela säsongen', href: '/evenemang' },
  { icon: '✈️', title: 'Planera resan', desc: 'Flyg, hyrbil, bästa restid – allt du behöver veta', href: '/flyg' },
];

export default function FeatureCards() {
  const isMobile = useIsMobile();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: isMobile ? '12px' : '24px',
      marginTop: '8px',
    }}>
      {items.map((item) => (
        <a
          key={item.title}
          href={item.href}
          style={{
            display: isMobile ? 'flex' : 'block',
            flexDirection: isMobile ? 'row' : 'column' as const,
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? '12px' : '0',
            padding: isMobile ? '14px 16px' : '28px 24px',
            background: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            minHeight: isMobile ? '44px' : 'auto',
            transition: 'transform 0.22s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.22s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        >
          {/* Emoji */}
          <div style={{
            fontSize: isMobile ? '1.6rem' : '1.5rem',
            marginBottom: isMobile ? '0' : '12px',
            lineHeight: 1,
            flexShrink: 0,
          }}>{item.icon}</div>

          {/* Titel + beskrivning */}
          <div style={{ flex: isMobile ? 1 : 'unset' as const }}>
            <div style={{
              fontSize: isMobile ? '0.875rem' : '1rem',
              fontWeight: isMobile ? 600 : 700,
              color: '#1F2937',
              marginBottom: isMobile ? '2px' : '8px',
              textTransform: isMobile ? 'none' : 'uppercase',
              letterSpacing: isMobile ? '0' : '0.04em',
            }}>{item.title}</div>

            <div style={{
              fontSize: isMobile ? '0.72rem' : '0.88rem',
              color: isMobile ? 'rgb(136,136,136)' : '#6B7280',
              lineHeight: 1.4,
            }}>{item.desc}</div>
          </div>

          {/* LÄS MER — dölj på mobil */}
          {!isMobile && (
            <div style={{
              marginTop: '16px',
              fontSize: 'var(--btn-font-size, 0.8125rem)',
              color: 'var(--turkos)',
              fontWeight: 700,
              letterSpacing: 'var(--btn-letter-spacing, 0.08em)',
              textTransform: 'uppercase',
            }}>LÄS MER →</div>
          )}
        </a>
      ))}
    </div>
  );
}
