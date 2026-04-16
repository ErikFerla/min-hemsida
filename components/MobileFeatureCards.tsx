'use client';
import type { ReactNode } from 'react';

const svgProps = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: '#383a46', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const cards: { icon: ReactNode; title: string; desc: string; href: string }[] = [
  { icon: <svg {...svgProps}><path d="M2 12c0-5.5 4-10 10-10s10 4.5 10 10"/><path d="M4.5 17.5C6 16 8 15 10 16s4 2 6 1 4-2 4-2"/></svg>, title: 'Stränder', desc: 'De 30 bästa stränderna – från vilda klippvikar till familjevänliga sandstränder', href: '/strandar' },
  { icon: <svg {...svgProps}><path d="M3 21h18M3 7l9-4 9 4M4 21V7M20 21V7M9 21v-4a3 3 0 016 0v4"/><rect x="9" y="10" width="2" height="3"/><rect x="13" y="10" width="2" height="3"/></svg>, title: 'Städer & byar', desc: '18 destinationer med insider-tips från Palma till dolda bergsbyer', href: '/byar' },
  { icon: <svg {...svgProps}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>, title: 'Mat & Vin', desc: 'Restaurangtips, lokala vindistriktet och Michelinstjärnor', href: '/mat' },
  { icon: <svg {...svgProps}><path d="M12 2v20M12 2l8 4-8 4"/><ellipse cx="12" cy="21" rx="9" ry="1.5"/></svg>, title: 'Golf', desc: '22 banor i världsklass – boka rätt bana för din nivå', href: '/aktiviteter/golf' },
  { icon: <svg {...svgProps}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>, title: 'Evenemang 2026', desc: 'Festivaler, marknader och lokala fester hela säsongen', href: '/evenemang' },
  { icon: <svg {...svgProps}><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2 6.3-6.4 2 2-6.3z"/></svg>, title: 'Planera resan', desc: 'Flyg, hyrbil, bästa restid – allt du behöver veta', href: '/flyg' },
];

export default function MobileFeatureCards() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      padding: '0 16px',
      marginTop: '16px',
    }}>
      {cards.map(card => (
        <a
          key={card.href}
          href={card.href}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '12px',
            padding: '14px',
            background: 'white',
            borderRadius: '12px',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            textDecoration: 'none',
            minHeight: '44px',
          }}
        >
          <span style={{ flexShrink: 0, lineHeight: 1, marginBottom: '0' }}>
            {card.icon}
          </span>
          <div>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#383a46',
              marginBottom: '2px',
              lineHeight: 1.2,
            }}>
              {card.title}
            </div>
            <div style={{
              fontSize: '0.72rem',
              color: '#888',
              lineHeight: 1.4,
            }}>
              {card.desc}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
