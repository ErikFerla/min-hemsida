'use client';
import { useState } from 'react';
import { evenemang } from '@/app/components/SectionEvents';

const kategorier = ['Alla', 'Sport', 'Musik', 'Kultur', 'Mat & Dryck', 'Marknad', 'Familj'];

const kategoriColor: Record<string, string> = {
  'Sport': '#2563eb',
  'Musik': '#7c3aed',
  'Kultur': '#d97706',
  'Mat & Dryck': '#16a34a',
  'Marknad': '#92400e',
  'Familj': '#db2777',
};

export default function EvenemangPage() {
  const [aktiv, setAktiv] = useState('Alla');
  const filtrerade = aktiv === 'Alla' ? evenemang : evenemang.filter(e => e.kategori === aktiv);

  return (
    <div style={{ background: '#e8e8e8', minHeight: '100vh' }}>
      <div style={{ background: '#111', padding: '80px 80px 60px', color: 'white' }}>
        <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '12px' }}>Mallorca 2026</p>
        <h1 style={{ fontFamily: '"Bebas Neue", var(--font-bebas), sans-serif', fontSize: '4.5rem', fontWeight: '400', letterSpacing: '0.05em', margin: '0 0 16px', lineHeight: 1 }}>EVENEMANG</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', margin: 0 }}>Alla evenemang, festivaler och marknader på Mallorca under 2026. Planera din resa runt dem.</p>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 60px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {kategorier.map(k => (
            <button
              key={k}
              onClick={() => setAktiv(k)}
              style={{
                padding: '8px 20px',
                borderRadius: '24px',
                border: '2px solid ' + (aktiv === k ? '#111' : '#bbb'),
                background: aktiv === k ? '#111' : 'white',
                color: aktiv === k ? 'white' : '#333',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {k}
            </button>
          ))}
          <span style={{ alignSelf: 'center', marginLeft: '8px', fontSize: '0.85rem', color: '#666' }}>
            {filtrerade.length} evenemang
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filtrerade.map((e, i) => (
            <div key={i} style={{ background: '#e0e0e0', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <img src={e.bild} alt={e.namn} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                <span style={{
                  position: 'absolute', top: '12px', left: '12px',
                  background: kategoriColor[e.kategori] ?? '#111',
                  color: 'white', borderRadius: '6px',
                  padding: '3px 10px', fontSize: '0.72rem', fontWeight: '700',
                }}>
                  {e.kategori}
                </span>
              </div>
              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '0.78rem', color: '#555', display: 'flex', gap: '12px' }}>
                  <span>📅 {e.datum}</span>
                  <span>📍 {e.plats}</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', letterSpacing: '-0.02em', margin: 0, color: '#111' }}>{e.namn}</h3>
                <p style={{ fontSize: '0.875rem', color: '#444', lineHeight: '1.55', margin: 0, flex: 1 }}>{e.beskrivning}</p>
                <a
                  href={e.länk}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: '10px', display: 'inline-block', padding: '7px 16px', background: '#111', color: 'white', borderRadius: '6px', fontSize: '0.82rem', fontWeight: '600', textDecoration: 'none' }}
                >
                  Läs mer ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
