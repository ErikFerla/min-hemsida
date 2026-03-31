'use client';
import { useState, useEffect } from 'react';

const bilder = [
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=90', text: 'Kristallklara stränder', plats: 'Es Trenc, södra Mallorca' },
  { url: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1600&q=90', text: 'Prisvärda vingårdar', plats: 'Binissalem, centrala Mallorca' },
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90', text: 'Magiska solnedgångar', plats: 'Cap de Formentor, norra Mallorca' },
  { url: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1600&q=90', text: 'Historiska kyrkor', plats: 'Valldemossa, västra Mallorca' },
  { url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=90', text: 'Äventyrliga båtturer', plats: 'Port de Sóller, nordvästra Mallorca' },
  { url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=90', text: 'Världsklassigt golf', plats: 'Son Gual Golf, Palma' },
  { url: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=1600&q=90', text: 'Charmiga fiskebyar', plats: 'Porto Colom, östkusten' },
  { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=90', text: 'Lyxiga hotell & spa', plats: 'Palma de Mallorca' },
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
    <div style={{ position: 'relative', width: '100%', height: '90vh', overflow: 'hidden' }}>
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
        position: 'absolute', bottom: '80px', left: '80px', color: 'white',
      }}>
        <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>
          {bilder[aktiv].plats}
        </p>
        <h1 style={{
          fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
          fontSize: '5rem',
          fontWeight: '400',
          letterSpacing: '0.05em',
          margin: 0,
          lineHeight: 1,
          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
        }}>
          {bilder[aktiv].text}
        </h1>
      </div>
      <div style={{
        position: 'absolute', bottom: '40px', left: '80px',
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
  );
}
