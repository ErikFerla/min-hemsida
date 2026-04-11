'use client';

const cards = [
  { emoji: '🏖️', title: 'Stränder', desc: 'De 30 bästa stränderna – från vilda klippvikar till familjevänliga sandstränder', href: '/strandar' },
  { emoji: '🏙️', title: 'Städer & byar', desc: '18 destinationer med insider-tips från Palma till dolda bergsbyer', href: '/byar' },
  { emoji: '🍽️', title: 'Mat & Vin', desc: 'Restaurangtips, lokala vindistriktet och Michelinstjärnor', href: '/mat' },
  { emoji: '⛳', title: 'Golf', desc: '22 banor i världsklass – boka rätt bana för din nivå', href: '/aktiviteter/golf' },
  { emoji: '🎉', title: 'Evenemang 2026', desc: 'Festivaler, marknader och lokala fester hela säsongen', href: '/evenemang' },
  { emoji: '✈️', title: 'Planera resan', desc: 'Flyg, hyrbil, bästa restid – allt du behöver veta', href: '/flyg' },
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
          <span style={{ fontSize: '1.6rem', flexShrink: 0, lineHeight: 1 }}>
            {card.emoji}
          </span>
          <div>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#1f2937',
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
