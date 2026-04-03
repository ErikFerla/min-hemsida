'use client';
import { useState } from 'react';

const flygplatser = [
  { kod: 'GOT', namn: 'Göteborg Landvetter', emoji: '✈️' },
  { kod: 'ARN', namn: 'Stockholm Arlanda', emoji: '✈️' },
  { kod: 'MMX', namn: 'Malmö Airport', emoji: '✈️' },
  { kod: 'OSL', namn: 'Oslo Gardermoen', emoji: '✈️' },
];

const destinations = [
  { kod: 'PMI', namn: 'Palma de Mallorca', bild: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80' },
];

export default function FlygPage() {
  const [från, setFrån] = useState('GOT');
  const [utresa, setUtresa] = useState('');
  const [hemresa, setHemresa] = useState('');
  const [resenärer, setResenärer] = useState('1');

  const sökFlyg = () => {
    const url = `https://www.skyscanner.se/transport/flyg/${från.toLowerCase()}/pmi/${utresa.replace(/-/g, '')}/${hemresa.replace(/-/g, '')}/?adults=${resenärer}&currency=SEK&locale=sv-SE`;
    window.open(url, '_blank');
  };

  const snabbSök = (frånKod: string) => {
    window.open(`https://www.skyscanner.se/transport/flyg/${frånKod.toLowerCase()}/pmi/?adults=1&currency=SEK&locale=sv-SE`, '_blank');
  };

  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{
        position: 'relative', height: '55vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=90)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'flex-end',
        padding: 'clamp(20px,5vw,60px) clamp(16px,5vw,80px)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Res till Mallorca</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem,7vw,5rem)', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>
            Hitta flyg till Palma
          </h1>
          <p style={{ fontSize: 'clamp(0.9rem,2.5vw,1.1rem)', marginTop: '12px', opacity: 0.9 }}>
            Sök och jämför flyg från Sverige till Mallorca
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(24px,4vw,60px) clamp(16px,4vw,40px)' }}>

        {/* Sökformulär */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', marginBottom: '48px' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', letterSpacing: '0.05em', margin: '0 0 28px', color: '#111' }}>
            🔍 Sök flyg till Palma de Mallorca
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '8px', color: '#555' }}>AVRESA FRÅN</label>
              <select
                value={från}
                onChange={e => setFrån(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '1rem', background: 'white', cursor: 'pointer' }}
              >
                {flygplatser.map(f => (
                  <option key={f.kod} value={f.kod}>{f.emoji} {f.namn} ({f.kod})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '8px', color: '#555' }}>DESTINATION</label>
              <div style={{ width: '100%', padding: '12px 16px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '1rem', background: '#f9f9f9', color: '#555' }}>
                🌴 Palma de Mallorca (PMI)
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '8px', color: '#555' }}>UTRESEDATUM</label>
              <input
                type="date"
                value={utresa}
                onChange={e => setUtresa(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '1rem', boxSizing: 'border-box' as const }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '8px', color: '#555' }}>HEMRESEDATUM</label>
              <input
                type="date"
                value={hemresa}
                onChange={e => setHemresa(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '1rem', boxSizing: 'border-box' as const }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '8px', color: '#555' }}>RESENÄRER</label>
              <select
                value={resenärer}
                onChange={e => setResenärer(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '1rem', background: 'white', cursor: 'pointer' }}
              >
                {[1,2,3,4,5,6,7,8].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'person' : 'personer'}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={sökFlyg}
            style={{ width: '100%', padding: '16px', background: '#F59E0B', color: '#1F2937', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.1em', cursor: 'pointer' }}
          >
            SÖK FLYG PÅ SKYSCANNER →
          </button>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#aaa', marginTop: '12px' }}>
            Du vidarebefordras till Skyscanner för att slutföra sökningen
          </p>
        </div>

        {/* Snabbknappar */}
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', letterSpacing: '0.05em', marginBottom: '24px', paddingBottom: '12px', borderBottom: '3px solid #F59E0B', color: '#111' }}>
          ⚡ Snabbsök – Populära avgångar
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          {flygplatser.map(f => (
            <div key={f.kod} style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✈️</div>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', margin: '0 0 4px', color: '#111' }}>{f.namn}</h3>
              <p style={{ fontSize: '0.85rem', color: '#888', margin: '0 0 16px' }}>{f.kod} → PMI · Palma de Mallorca</p>
              <button
                onClick={() => snabbSök(f.kod)}
                style={{ width: '100%', padding: '10px', background: '#F59E0B', color: '#1F2937', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer' }}
              >
                Sök flyg →
              </button>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div style={{ background: '#111', borderRadius: '16px', padding: '32px', color: 'white' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px' }}>
            💡 Tips för billigare flyg till Mallorca
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { icon: '📅', tips: 'Boka 6–8 veckor i förväg för bästa pris' },
              { icon: '🌤️', tips: 'Maj och september är billigare än juli–aug' },
              { icon: '⏰', tips: 'Tidiga morgon- eller sena kvällsflygningar är ofta billigast' },
              { icon: '🔔', tips: 'Sätt prisvarning på Skyscanner och vänta på rea' },
            ].map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{t.icon}</div>
                <p style={{ fontSize: '0.9rem', color: '#ddd', margin: 0, lineHeight: '1.5' }}>{t.tips}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
