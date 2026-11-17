import Link from 'next/link';
import { featureItems as cards } from '@/app/components/FeatureCards';

// Samma kort som desktop (FeatureCards) så att mobil och desktop visar samma innehåll.
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
        <Link
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
          <span aria-hidden="true" style={{ flexShrink: 0, lineHeight: 1, marginBottom: '0' }}>
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
        </Link>
      ))}
    </div>
  );
}
