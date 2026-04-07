'use client';
import { useState, useEffect } from 'react';

const bilder = [
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80',
    rubrik: 'Kristallklara stränder',
    undertext: 'Från dolda paradisvikar till långa familjesandstränder',
    plats: 'Es Trenc · Södra Mallorca',
    lank: '/strandar',
    cta: 'UTFORSKA STRÄNDERNA',
  },
  {
    url: 'https://images.unsplash.com/photo-1566993850067-bb8df9c9807e?w=1600&q=85',
    rubrik: 'Palma de Mallorca',
    undertext: 'Gotisk katedral, kulinarisk scen och levande gamla stan',
    plats: 'Palma · Huvudstaden',
    lank: '/palma-de-mallorca',
    cta: 'UTFORSKA PALMA',
  },
  {
    url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600&q=80',
    rubrik: 'Världsklassigt golf',
    undertext: '22 banor i fantastiska miljöer – från bergspanorama till havsutsikt',
    plats: 'Son Gual Golf · Palma',
    lank: '/aktiviteter/golf',
    cta: 'SE GOLFBANORNA',
  },
  {
    url: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec?w=1600&q=85',
    rubrik: 'Valldemossa',
    undertext: 'Charmiga gränder, klosterhistoria och UNESCO-skyddad bergsnatur',
    plats: 'Valldemossa · Västra Mallorca',
    lank: '/valldemossa',
    cta: 'UTFORSKA VALLDEMOSSA',
  },
  {
    url: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09?w=1600&q=85',
    rubrik: 'Port de Sóller',
    undertext: 'Pittoresk hamn omgiven av Tramuntana-bergen – nås med historisk spårvagn',
    plats: 'Port de Sóller · Nordväst',
    lank: '/port-de-soller',
    cta: 'UTFORSKA SÓLLER',
  },
  {
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80',
    rubrik: 'Mat & Vin på Mallorca',
    undertext: 'Michelinkrogar, lokala vingårdar och färsk fisk direkt från havet',
    plats: 'Hela ön · Kulinarisk upplevelse',
    lank: '/mat',
    cta: 'SE MAT & VIN',
  },
];

export default function HeroSlideshow() {
  const [aktiv, setAktiv] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAktiv(prev => (prev + 1) % bilder.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const bild = bilder[aktiv];

  return (
    <div style={{ position: 'relative', width: '100%', height: 'clamp(50vh, 90vh, 90vh)', overflow: 'hidden' }}>

      {/* Bildspel */}
      {bilder.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${b.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === aktiv ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.1) 100%)',
      }} />

      {/* Klickbar overlay */}
      <a
        href={bild.lank}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        aria-label={`Gå till ${bild.rubrik}`}
      />

      {/* Text */}
      <div style={{
        position: 'absolute', bottom: '18%', left: '8%',
        color: 'white', zIndex: 2, maxWidth: '640px',
        pointerEvents: 'none',
      }}>
        <p style={{
          fontSize: '0.72rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          marginBottom: '14px',
          opacity: 0.8,
          fontWeight: 600,
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        }}>
          {bild.plats}
        </p>

        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(2.8rem, 5vw, 5rem)',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          lineHeight: 1.05,
          margin: 0,
          textShadow: '0 2px 12px rgba(0,0,0,0.5)',
        }}>
          {bild.rubrik}
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
          marginTop: '16px',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.92)',
          textShadow: '0 1px 6px rgba(0,0,0,0.6)',
          fontWeight: 400,
        }}>
          {bild.undertext}
        </p>

        <a
          href={bild.lank}
          style={{
            display: 'inline-block',
            marginTop: '28px',
            padding: '13px 30px',
            background: 'white',
            color: '#1F2937',
            borderRadius: '3px',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textDecoration: 'none',
            pointerEvents: 'auto',
            transition: 'background 0.2s, color 0.2s',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#F59E0B';
            e.currentTarget.style.color = '#1F2937';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#1F2937';
          }}
        >
          {bild.cta} →
        </a>
      </div>

      {/* Navigation-dots */}
      <div style={{
        position: 'absolute', bottom: '28px', left: '8%',
        display: 'flex', gap: '10px', zIndex: 2,
      }}>
        {bilder.map((_, i) => (
          <button
            key={i}
            onClick={() => setAktiv(i)}
            style={{
              width: i === aktiv ? '36px' : '8px',
              height: '3px',
              borderRadius: '2px',
              background: i === aktiv ? 'white' : 'rgba(255,255,255,0.35)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Raknare */}
      <div style={{
        position: 'absolute', bottom: '22px', right: '5%',
        color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem',
        letterSpacing: '0.15em', zIndex: 2,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {String(aktiv + 1).padStart(2, '0')} / {String(bilder.length).padStart(2, '0')}
      </div>

    </div>
  );
}