'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IconPin, IconFlag, IconBulb, IconStar, IconInfo, PriceTag, tierFromEmoji } from '@/components/Icons';
import GolfMapWrapper from '@/components/GolfMapWrapper';
import { golfbanor } from '@/data/golf-courses';

const svårighetFärg: Record<string, string> = {
  'Lätt': '#27ae60',
  'Medel': '#f39c12',
  'Svår': '#993335',
};

const regioner = ['Alla', 'Palma', 'Norr', 'Öst', 'Syd', 'Sydväst'];

export default function GolfPage() {
  const [aktivRegion, setAktivRegion] = useState('Alla');

  const filtrerade = aktivRegion === 'Alla'
    ? golfbanor
    : golfbanor.filter(b => b.region === aktivRegion);

  const knappAktiv = {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '2px solid #993335',
    background: '#993335',
    color: 'white',
    fontWeight: '600' as const,
    cursor: 'pointer',
    fontSize: '0.9rem',
  };

  const knappInaktiv = {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '2px solid #ccc',
    background: 'white',
    color: '#444',
    fontWeight: '600' as const,
    cursor: 'pointer',
    fontSize: '0.9rem',
  };

  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <div style={{
        position: 'relative',
        height: '60vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=90)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 'clamp(30px, 5vw, 60px) clamp(20px, 5vw, 80px)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>
            Aktiviteter på Mallorca
          </p>
          <h1 style={{ fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>
            22 golfbanor på Mallorca
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', marginTop: '16px', lineHeight: '1.6', opacity: 0.85, maxWidth: '600px' }}>
            Komplett guide till alla golfbanor – för alla nivåer och budgetar
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(30px, 4vw, 60px) clamp(16px, 4vw, 60px)' }}>

        {/* ── KARTA ── */}
        <section aria-labelledby="golf-map-title" style={{ marginBottom: '48px' }}>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#993335', fontWeight: 600, margin: '0 0 8px' }}>
              Utforska på karta
            </p>
            <h2 id="golf-map-title" style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
              Alla 22 golfbanor på Mallorca
            </h2>
            <p style={{ color: '#666', marginTop: '8px', fontSize: '0.95rem', maxWidth: '60ch' }}>
              Klicka på en flagga för att se banan i listan nedan. Från Alcanada i norr till Andratx i sydväst.
            </p>
          </div>
          <GolfMapWrapper />

          {/* Textfallback – alltid synlig, både a11y- och SEO-fördel */}
          <details style={{ marginTop: '16px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: '#383a46', padding: '8px 0' }}>
              Visa alla banor som textlista
            </summary>
            <ul style={{ columns: 2, columnGap: '32px', marginTop: '12px', padding: 0, listStyle: 'none', fontSize: '0.9rem' }}>
              {golfbanor.map(b => (
                <li key={b.slug} style={{ padding: '4px 0', breakInside: 'avoid' }}>
                  <a href={`#${b.slug}`} style={{ color: '#383a46', textDecoration: 'none', borderBottom: '1px dotted #993335' }}>
                    {b.namn}
                  </a>{' '}
                  <span style={{ color: '#6b7280', fontSize: '0.82rem' }}>· {b.plats}</span>
                </li>
              ))}
            </ul>
          </details>
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.03em', margin: 0 }}>
              Alla golfbanor
            </h2>
            <p style={{ color: '#666', marginTop: '8px' }}>{filtrerade.length} banor visas</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {['Lätt', 'Medel', 'Svår'].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: svårighetFärg[s] }} />
                {s}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {regioner.map(r => (
            <button key={r} onClick={() => setAktivRegion(r)} style={aktivRegion === r ? knappAktiv : knappInaktiv}>
              {r}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '24px' }}>
          {filtrerade.map((b) => (
            <article
              key={b.slug}
              id={b.slug}
              style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', transition: 'transform 0.2s ease, box-shadow 0.2s ease', scrollMarginTop: '80px' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 35px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)'; }}
            >
              <div style={{ position: 'relative' }}>
                <Image src={b.bild} alt={b.namn} width={600} height={200} style={{ width: '100%', height: '200px', objectFit: 'cover' }} loading="lazy" />
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: svårighetFärg[b.svårighet], color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700' }}>
                  {b.svårighet}
                </div>
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' }}>
                  {b.region}
                </div>
              </div>
              <div style={{ padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', fontWeight: '700', margin: '0 0 8px', lineHeight: '1.15' }}>{b.namn}</h3>
                  <span style={{ flexShrink: 0, marginLeft: '8px' }}><PriceTag tier={tierFromEmoji(b.pris)} /></span>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', fontSize: '0.85rem', color: '#666' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconPin size={12} /> {b.plats}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconFlag size={12} /> {b.hål} hål</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: '1.7', margin: '0 0 12px' }}>{b.beskrivning}</p>
                <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '10px 14px', marginTop: '10px', marginBottom: '14px', lineHeight: '1.6', fontSize: '0.85rem', color: '#444' }}>
                  <IconBulb size={14} style={{ verticalAlign: '-2px', marginRight: 4 }} /> {b.tips}
                </div>
                {b.redaktionellt && (
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: '8px',
                    padding: '8px 12px', borderRadius: '8px', marginBottom: '12px',
                    background: b.redaktionellt.typ === 'varning' ? '#fff3cd' : b.redaktionellt.typ === 'tips' ? '#e8f5e9' : b.redaktionellt.typ === 'bast' ? '#e3f2fd' : '#f3e5f5',
                    borderLeft: `3px solid ${b.redaktionellt.typ === 'varning' ? '#f39c12' : b.redaktionellt.typ === 'tips' ? '#27ae60' : b.redaktionellt.typ === 'bast' ? '#2980b9' : '#8e44ad'}`,
                    fontSize: '0.82rem', color: '#333', lineHeight: '1.5',
                  }}>
                    <span style={{ flexShrink: 0, color: '#383a46', display: 'inline-flex', alignItems: 'center' }}>
                      {b.redaktionellt.typ === 'varning' ? <IconInfo size={16} /> : b.redaktionellt.typ === 'tips' ? <IconStar size={16} /> : b.redaktionellt.typ === 'bast' ? <IconStar size={16} /> : <IconBulb size={16} />}
                    </span>
                    <span>{b.redaktionellt.text}</span>
                  </div>
                )}
                <a href={b.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#993335', color: '#fefefb', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
                  Visa på karta
                </a>
                <a href={b.webb} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '10px', background: 'white', color: '#993335', border: '2px solid #993335', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', marginTop: '8px' }}>
                  Besök hemsida →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: '60px', background: '#111', borderRadius: '16px', padding: '40px', color: 'white', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif', fontSize: '2.5rem', letterSpacing: '0.05em', marginBottom: '16px' }}>
            Planera din golfsemester
          </h2>
          <p style={{ color: '#aaa', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 28px' }}>
            Vill du ha hjälp att boka greenfee, hyra utrustning eller kombinera golf med andra aktiviteter?
          </p>
          <Link href="/kontakt" style={{ display: 'inline-block', padding: '14px 40px', background: '#993335', color: '#fefefb', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '1rem' }}>
            Planera min golfsemester →
          </Link>
        </div>
      </div>
    </div>
  );
}
