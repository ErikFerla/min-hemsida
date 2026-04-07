'use client';
import { useState, useEffect } from 'react';

const bilder = [
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80', text: 'Kristallklara stränder', plats: 'Es Trenc, södra Mallorca' },
  { url: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1600&q=80', text: 'Prisvärda vingårdar', plats: 'Binissalem, centrala Mallorca' },
  { url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=80', text: 'Magiska solnedgångar', plats: 'Cap de Formentor, norra Mallorca' },
  { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85', text: 'Historiska kyrkor', plats: 'Valldemossa, västra Mallorca' },
  { url: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1600&q=80', text: 'Äventyrliga båtturer', plats: 'Port de Sóller, nordvästra Mallorca' },
  { url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600&q=80', text: 'Världsklassigt golf', plats: 'Son Gual Golf, Palma' },
  { url: 'https://images.unsplash.com/photo-1504194104404-433180773017?w=1600&q=80', text: 'Charmiga fiskebyar', plats: 'Porto Colom, östkusten' },
  { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80', text: 'Lyxiga hotell & spa', plats: 'Palma de Mallorca' },
];

export default function HeroSlideshow() {
  const [aktiv, setAktiv] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAktiv(prev => (prev + 1) % bilder.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <div style={{ position: 'relative', width: '100%', height: 'clamp(50vh, 90vh, 90vh)', overflow: 'hidden' }}>
      {bilder.map((bild, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${bild.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: i === aktiv ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }} />
      ))}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
      }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '8%', color: 'white', zIndex: 2 }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px', opacity: 0.75, fontWeight: 500 }}>Mallorca på svenska</p>
        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 400, letterSpacing: '0.03em', lineHeight: 1, margin: 0, maxWidth: '700px' }}>
          Din lokala guide till Mallorca
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', marginTop: '20px', opacity: 0.85, maxWidth: '500px', lineHeight: 1.6 }}>
          Insider-tips, dolda stränder och de bästa restaurangerna – från en som bor på ön.
        </p>
        {/* CTA-knappar – visas alltid men extra viktiga på mobil */}
        <div className="mobile-cta-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '28px' }}>
          <a href="/kontakt" style={{
            display: 'inline-block',
            padding: 'clamp(10px, 2vw, 14px) clamp(20px, 3vw, 32px)',
            background: '#1F2937',
            color: 'white',
            borderRadius: '4px',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            letterSpacing: '0.08em',
            textDecoration: 'none',
          }}>
            PLANERA DIN RESA
          </a>
          <a href="/strandar" style={{
            display: 'inline-block',
            padding: 'clamp(10px, 2vw, 14px) clamp(20px, 3vw, 32px)',
            background: 'transparent',
            color: 'white',
            border: '1.5px solid rgba(255,255,255,0.7)',
            borderRadius: '4px',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            letterSpacing: '0.08em',
            textDecoration: 'none',
          }}>
            SE BÄSTA STRÄNDERNA
          </a>
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: 'clamp(12px, 2vw, 20px)', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: '8px',
      }}>
        {bilder.map((_, i) => (
          <button key={i} onClick={() => setAktiv(i)} style={{
            width: i === aktiv ? '32px' : '8px',
            height: '4px',
            borderRadius: '2px',
            background: i === aktiv ? 'white' : 'rgba(255,255,255,0.4)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s',
            padding: 0,
          }} />
        ))}
      </div>
    </div>
    </>
  );
}
