'use client';
import { IconSparkle, IconBuilding, IconPlane, IconStar } from '@/components/Icons';
import type { ComponentType } from 'react';

interface AffiliateCardProps {
  typ: 'aktivitet' | 'hotell' | 'hyrbil' | 'transfer';
  titel: string;
  beskrivning: string;
  pris?: string;
  betyg?: number;
  länk: string;
  bild?: string;
  badge?: string;
}

export default function AffiliateCard({ typ, titel, beskrivning, pris, betyg, länk, bild, badge }: AffiliateCardProps) {
  const ikoner: Record<AffiliateCardProps['typ'], ComponentType<{ size?: number }>> = { aktivitet: IconSparkle, hotell: IconBuilding, hyrbil: IconSparkle, transfer: IconPlane };
  const Ikon = ikoner[typ];
  const färger = { aktivitet: '#0E7490', hotell: '#7C3AED', hyrbil: '#EA580C', transfer: '#0E7490' };

  return (
    <a href={länk} target="_blank" rel="noopener noreferrer sponsored"
      style={{ display: 'block', textDecoration: 'none', borderRadius: '16px', overflow: 'hidden',
        background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #ede5da',
        transition: 'transform 0.2s, box-shadow 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'; }}
    >
      {bild && <img src={bild} alt={titel} style={{ width: '100%', height: '180px', objectFit: 'cover' }} loading="lazy" />}
      <div style={{ padding: '20px' }}>
        {badge && (
          <span style={{ display: 'inline-block', background: '#FEF3C7', color: '#92400E', padding: '3px 10px',
            borderRadius: '20px', fontSize: '0.72rem', fontWeight: '700', marginBottom: '10px', letterSpacing: '0.05em' }}>
            {badge}
          </span>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.15rem', letterSpacing: '0.05em',
            color: '#1F2937', margin: 0, lineHeight: 1.2, flex: 1, display: 'inline-flex', alignItems: 'center', gap: 8 }}><Ikon size={18} /> {titel}</h3>
          {pris && <span style={{ fontWeight: '700', color: färger[typ], fontSize: '0.95rem', flexShrink: 0, marginLeft: '8px' }}>{pris}</span>}
        </div>
        <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.55', margin: '0 0 14px' }}>{beskrivning}</p>
        {betyg && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px', color: '#F59E0B' }}>
            {Array.from({ length: Math.round(betyg) }).map((_, i) => <IconStar key={i} size={14} />)}
            <span style={{ fontSize: '0.8rem', color: '#6B7280', marginLeft: '4px' }}>{betyg.toFixed(1)}</span>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ background: färger[typ], color: 'white', padding: '9px 18px', borderRadius: '8px',
            fontFamily: '"Bebas Neue", sans-serif', fontSize: '0.9rem', letterSpacing: '0.08em' }}>
            BOKA NU →
          </span>
          <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>via partner</span>
        </div>
      </div>
    </a>
  );
}
