'use client';
import { useEffect, useState, type ReactNode } from 'react';

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

const svgProps = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: '#1f2937', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const items: { icon: ReactNode; title: string; desc: string; href: string }[] = [
  { icon: <svg {...svgProps}><path d="M2 12c0-5.5 4-10 10-10s10 4.5 10 10"/><path d="M4.5 17.5C6 16 8 15 10 16s4 2 6 1 4-2 4-2"/></svg>, title: 'Stränder', desc: 'De 30 bästa stränderna – från vilda klippvikar till familjevänliga sandstränder', href: '/strandar' },
  { icon: <svg {...svgProps}><path d="M3 21h18M3 7l9-4 9 4M4 21V7M20 21V7M9 21v-4a3 3 0 016 0v4"/><rect x="9" y="10" width="2" height="3"/><rect x="13" y="10" width="2" height="3"/></svg>, title: 'Städer & byar', desc: '18 destinationer med insider-tips från Palma till dolda bergsbyer', href: '/byar' },
  { icon: <svg {...svgProps}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>, title: 'Mat & Vin', desc: 'Restaurangtips, lokala vindistriktet och Michelinstjärnor', href: '/mat' },
  { icon: <svg {...svgProps}><path d="M12 2v20M12 2l8 4-8 4"/><ellipse cx="12" cy="21" rx="9" ry="1.5"/></svg>, title: 'Golf', desc: '22 banor i världsklass – boka rätt bana för din nivå', href: '/aktiviteter/golf' },
  { icon: <svg {...svgProps}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>, title: 'Evenemang 2026', desc: 'Festivaler, marknader och lokala fester hela säsongen', href: '/evenemang' },
  { icon: <svg {...svgProps}><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2 6.3-6.4 2 2-6.3z"/></svg>, title: 'Planera resan', desc: 'Flyg, hyrbil, bästa restid – allt du behöver veta', href: '/flyg' },
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
          {/* Icon */}
          <div style={{
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
