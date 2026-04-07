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
    <div style={{
      background: '#0E7490',
      color: 'white',
      textAlign: 'center',
      padding: '10px 20px',
      fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
      letterSpacing: '0.15em',
      fontWeight: '500',
    }}>
      🌴 Din personliga guide till Mallorcas bästa hemligheter – på svenska
    </div>
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
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 'clamp(20px, 5vw, 80px)',
        left: 'clamp(20px, 5vw, 80px)',
        right: 'clamp(20px, 5vw, 80px)',
        color: 'white',
        maxWidth: '700px',
      }}>
        <p style={{
          fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '8px',
          opacity: 0.8,
        }}>
          {bilder[aktiv].plats}
        </p>
        <h1 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(2rem, 8vw, 5rem)',
          fontWeight: '400',
          letterSpacing: '0.05em',
          margin: '0 0 8px',
          lineHeight: 1,
          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
        }}>
          {bilder[aktiv].text}
        </h1>
        <p style={{
          fontSize: 'clamp(0.85rem, 2vw, 1rem)',
          marginTop: '8px',
          marginBottom: '20px',
          opacity: 0.85,
          fontWeight: '400',
          letterSpacing: '0.03em',
          maxWidth: '480px',
        }}>
          Din personliga guide till Mallorcas bästa hemligheter
        </p>
        {/* CTA-knappar – visas alltid men extra viktiga på mobil */}
        <div className="mobile-cta-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="/kontakt" style={{
            display: 'inline-block',
            padding: 'clamp(10px, 2vw, 14px) clamp(20px, 3vw, 32px)',
            background: '#F59E0B',
            color: '#1F2937',
            borderRadius: '8px',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            fontWeight: '700',
          }}>
            PLANERA DIN RESA
          </a>
          <a href="/strandar" style={{
            display: 'inline-block',
            padding: 'clamp(10px, 2vw, 14px) clamp(20px, 3vw, 32px)',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.7)',
            borderRadius: '8px',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            backdropFilter: 'blur(4px)',
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
