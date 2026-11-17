'use client';
import { useState } from 'react';
import Image from 'next/image';
import { IconCalendar, IconPin } from '@/components/Icons';
import type { Evenemang } from './data';

const kategorier = ['Alla', 'Sport', 'Musik', 'Kultur', 'Mat & Dryck', 'Marknad', 'Familj'];

// Mörkare nyanser för Kultur och Mat & Dryck så att vit text når AA-kontrast.
const kategoriColor: Record<string, string> = {
  'Sport': '#2563eb',
  'Musik': '#7c3aed',
  'Kultur': '#b45309',
  'Mat & Dryck': '#15803d',
  'Marknad': '#92400e',
  'Familj': '#db2777',
};

const sektioner: { rubrik: string; kategorier: string[] }[] = [
  { rubrik: 'Sport', kategorier: ['Sport'] },
  { rubrik: 'Musik & Kultur', kategorier: ['Musik', 'Kultur'] },
  { rubrik: 'Mat & Dryck', kategorier: ['Mat & Dryck'] },
  { rubrik: 'Marknader', kategorier: ['Marknad'] },
  { rubrik: 'Familj', kategorier: ['Familj'] },
];

export default function EvenemangLista({ kommande, passerade }: { kommande: Evenemang[]; passerade: Evenemang[] }) {
  const [aktiv, setAktiv] = useState('Alla');
  const filtrera = (lista: Evenemang[]) => (aktiv === 'Alla' ? lista : lista.filter(e => e.kategori === aktiv));
  const filtrerade = filtrera(kommande);
  const filtreradeArkiv = filtrera(passerade);

  return (
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
            type="button"
            className="evenemang-filter-btn"
            onClick={() => setAktiv(k)}
            aria-pressed={aktiv === k}
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
        <span style={{ alignSelf: 'center', marginLeft: 8, fontSize: '0.85rem', color: '#6B7280' }} aria-live="polite">
          {filtrerade.length} kommande evenemang
        </span>
      </div>

      {aktiv === 'Alla' ? (
        sektioner.map(sektion => {
          const items = kommande.filter(e => sektion.kategorier.includes(e.kategori));
          if (items.length === 0) return null;
          return (
            <section key={sektion.rubrik} style={{ marginBottom: 56 }}>
              <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: 500, letterSpacing: '-0.012em', margin: '0 0 24px', color: '#383a46' }}>{sektion.rubrik}</h2>
              <EventGrid items={items} />
            </section>
          );
        })
      ) : filtrerade.length > 0 ? (
        <EventGrid items={filtrerade} />
      ) : (
        <p style={{ color: '#4B5563', margin: '0 0 40px' }}>Inga kommande evenemang i den här kategorin just nu.</p>
      )}

      {filtreradeArkiv.length > 0 && (
        <section style={{ marginTop: 40, borderTop: '1px solid #ede5da', paddingTop: 32 }}>
          <details>
            <summary style={{ cursor: 'pointer', fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(1.25rem,3vw,1.6rem)', fontWeight: 500, color: '#383a46' }}>
              Har redan varit ({filtreradeArkiv.length})
            </summary>
            <p style={{ color: '#4B5563', fontSize: '0.9rem', margin: '12px 0 24px', lineHeight: 1.55 }}>
              Evenemang som redan har ägt rum. Många återkommer varje år – bra att känna till när du planerar nästa resa.
            </p>
            <EventGrid items={filtreradeArkiv} passerad />
          </details>
        </section>
      )}
    </div>
  );
}

function EventGrid({ items, passerad = false }: { items: Evenemang[]; passerad?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 20 }}>
      {items.map(e => (
        <article key={e.key} style={{ background: '#fefefb', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', border: '1px solid #ede5da', opacity: passerad ? 0.85 : 1 }}>
          <div style={{ position: 'relative' }}>
            <Image src={e.bild} alt={e.namn} width={600} height={180} sizes="(max-width: 700px) 100vw, 440px" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block', filter: passerad ? 'grayscale(40%)' : undefined }} />
            <span style={{
              position: 'absolute', top: 12, left: 12,
              background: kategoriColor[e.kategori] ?? '#383a46',
              color: 'white', borderRadius: 6,
              padding: '3px 10px', fontSize: '0.72rem', fontWeight: 700,
            }}>
              {e.kategori}
            </span>
            {(passerad || e.ejFastställt) && (
              <span style={{
                position: 'absolute', top: 12, right: 12,
                background: '#383a46', color: 'white', borderRadius: 6,
                padding: '3px 10px', fontSize: '0.72rem', fontWeight: 700,
              }}>
                {passerad ? 'Har varit' : 'Datum ej fastställt'}
              </span>
            )}
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
