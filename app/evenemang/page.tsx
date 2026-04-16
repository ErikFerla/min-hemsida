'use client';
import { useState } from 'react';
import { evenemang } from '@/app/components/SectionEvents';
import { IconCalendar, IconPin } from '@/components/Icons';

const kategorier = ['Alla', 'Sport', 'Musik', 'Kultur', 'Mat & Dryck', 'Marknad', 'Familj'];

const kategoriColor: Record<string, string> = {
  'Sport': '#2563eb',
  'Musik': '#7c3aed',
  'Kultur': '#d97706',
  'Mat & Dryck': '#16a34a',
  'Marknad': '#92400e',
  'Familj': '#db2777',
};

type Evenemang = { namn: string; datum: string; plats: string; kategori: string; beskrivning: string; länk: string; bild: string };

const sektioner: { rubrik: string; kategorier: string[] }[] = [
  { rubrik: 'Sport', kategorier: ['Sport'] },
  { rubrik: 'Musik & Kultur', kategorier: ['Musik', 'Kultur'] },
  { rubrik: 'Mat & Dryck', kategorier: ['Mat & Dryck'] },
  { rubrik: 'Marknader', kategorier: ['Marknad'] },
  { rubrik: 'Familj', kategorier: ['Familj'] },
];

export default function EvenemangPage() {
  const [aktiv, setAktiv] = useState('Alla');
  const filtrerade = aktiv === 'Alla' ? evenemang : evenemang.filter(e => e.kategori === aktiv);

  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <header className="evenemang-hero" style={{ background: '#eeede4', padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,80px) clamp(36px,5vw,56px)', textAlign: 'center' }}>
        <p style={{ fontSize: 'clamp(0.7rem,1.5vw,0.8rem)', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#993335', fontWeight: 700, margin: '0 0 14px' }}>Mallorca 2026</p>
        <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(1.75rem,6vw,3rem)', fontWeight: 500, letterSpacing: '-0.012em', margin: '0 auto 16px', lineHeight: 1.1, color: '#383a46', maxWidth: '18ch' }}>Evenemang på Mallorca 2026</h1>
        <div style={{ width: 48, height: 2, background: '#993335', margin: '0 auto 20px', borderRadius: 2 }} />
        <p style={{ fontSize: 'clamp(0.95rem,2.2vw,1.1rem)', color: '#374151', margin: '0 auto', maxWidth: '60ch', lineHeight: 1.6 }}>Festivaler, marknader, sport och kultur — planera din resa runt Mallorcas bästa evenemang.</p>
      </header>

      <div className="evenemang-main" style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(32px,4vw,60px) clamp(16px,4vw,60px)' }}>
        <style>{`
          .evenemang-filter-row::-webkit-scrollbar { display: none; }
          @media (max-width: 768px) {
            .evenemang-hero { padding: 40px 20px !important; }
            .evenemang-main { padding: 32px 20px !important; }
            .evenemang-filter-row { overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
            .evenemang-filter-btn { min-height: 44px; flex-shrink: 0; }
          }
        `}</style>

        <div className="evenemang-filter-row" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
          {kategorier.map(k => (
            <button
              key={k}
              className="evenemang-filter-btn"
              onClick={() => setAktiv(k)}
              style={{
                padding: '8px 20px',
                borderRadius: 24,
                border: '2px solid ' + (aktiv === k ? '#993335' : '#d9cfc1'),
                background: aktiv === k ? '#993335' : 'white',
                color: aktiv === k ? 'white' : '#383a46',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {k}
            </button>
          ))}
          <span style={{ alignSelf: 'center', marginLeft: 8, fontSize: '0.85rem', color: '#6B7280' }}>
            {filtrerade.length} evenemang
          </span>
        </div>

        {aktiv === 'Alla' ? (
          sektioner.map(sektion => {
            const items = evenemang.filter(e => sektion.kategorier.includes(e.kategori));
            if (items.length === 0) return null;
            return (
              <section key={sektion.rubrik} style={{ marginBottom: 56 }}>
                <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: 500, letterSpacing: '-0.012em', margin: '0 0 24px', color: '#383a46' }}>{sektion.rubrik}</h2>
                <EventGrid items={items} />
              </section>
            );
          })
        ) : (
          <EventGrid items={filtrerade} />
        )}
      </div>
    </div>
  );
}

function EventGrid({ items }: { items: Evenemang[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
      {items.map((e, i) => (
        <article key={i} style={{ background: '#fefefb', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', border: '1px solid #ede5da' }}>
          <div style={{ position: 'relative' }}>
            <img src={e.bild} alt={e.namn} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
            <span style={{
              position: 'absolute', top: 12, left: 12,
              background: kategoriColor[e.kategori] ?? '#383a46',
              color: 'white', borderRadius: 6,
              padding: '3px 10px', fontSize: '0.72rem', fontWeight: 700,
            }}>
              {e.kategori}
            </span>
          </div>
          <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconCalendar size={12} /> {e.datum}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconPin size={12} /> {e.plats}</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.015em', margin: 0, color: '#383a46' }}>{e.namn}</h3>
            <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.55, margin: 0, flex: 1 }}>{e.beskrivning}</p>
            <a
              href={e.länk}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 10, display: 'inline-block', padding: '7px 16px', background: '#993335', color: '#fefefb', borderRadius: 6, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-start' }}
            >
              Läs mer ↗
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
