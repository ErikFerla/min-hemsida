'use client';
import { useState } from 'react';

export default function KontaktPage() {
  const [steg, setSteg] = useState(1);
  const [formData, setFormData] = useState({
    namn: '',
    email: '',
    antalPersoner: '2',
    antalDagar: '7',
    budget: 'medel',
    intressen: [] as string[],
    boende: 'hotell',
    tid: '',
    meddelande: '',
  });
  const [skickat, setSkickat] = useState(false);

  const intresseVal = ['🏖️ Strand', '🏛️ Kultur', '🍽️ Mat & Vin', '🧗 Äventyr', '👨‍👩‍👧 Familj', '🚴 Cykling', '⛵ Segling', '🌿 Natur'];

  const toggleIntresse = (i: string) => {
    setFormData(prev => ({
      ...prev,
      intressen: prev.intressen.includes(i) ? prev.intressen.filter(x => x !== i) : [...prev.intressen, i]
    }));
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    background: 'white',
    outline: 'none',
  } as React.CSSProperties;

  const knappAktiv = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '2px solid #111',
    background: '#111',
    color: 'white',
    fontWeight: '600' as const,
    cursor: 'pointer',
    fontSize: '0.95rem',
  };

  const knappInaktiv = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '2px solid #111',
    background: 'transparent',
    color: '#111',
    fontWeight: '600' as const,
    cursor: 'pointer',
    fontSize: '0.95rem',
  };

  if (skickat) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🌴</div>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Tack {formData.namn}!
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.7', marginBottom: '32px' }}>
            Vi har tagit emot din förfrågan och återkommer inom 24 timmar med ett skräddarsytt förslag för din Mallorca-resa!
          </p>
          <a href="/" style={{ display: 'inline-block', padding: '14px 32px', background: '#c0392b', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '1rem' }}>
            Tillbaka till startsidan
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#F8F5F0', minHeight: '100vh' }}>
      <div style={{ background: '#111', color: 'white', padding: '80px 40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '3rem', fontWeight: '700', letterSpacing: '-0.04em', marginBottom: '16px' }}>
          Planera din resa
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#aaa', maxWidth: '600px', margin: '0 auto' }}>
          Berätta om din drömresa – vi hjälper dig hitta Mallorcas bästa hemligheter
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{
              width: '40px', height: '4px', borderRadius: '2px',
              background: s <= steg ? '#c0392b' : '#444',
              transition: 'background 0.3s'
            }} />
          ))}
        </div>
        <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '12px' }}>Steg {steg} av 3</p>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 40px' }}>

        {steg === 1 && (
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '32px' }}>Om dig</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Ditt namn</label>
                <input style={inputStyle} placeholder="Förnamn Efternamn" value={formData.namn} onChange={e => setFormData(p => ({ ...p, namn: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>E-postadress</label>
                <input style={inputStyle} type="email" placeholder="din@email.se" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px' }}>Antal resenärer</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {['1', '2', '3-4', '5-8', '8+'].map(a => (
                    <button key={a} onClick={() => setFormData(p => ({ ...p, antalPersoner: a }))} style={formData.antalPersoner === a ? knappAktiv : knappInaktiv}>{a} pers</button>
                  ))}
                </div>
              </div>
              <button onClick={() => setSteg(2)} disabled={!formData.namn || !formData.email} style={{ marginTop: '16px', padding: '16px 40px', background: formData.namn && formData.email ? '#c0392b' : '#ccc', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '700', cursor: formData.namn && formData.email ? 'pointer' : 'not-allowed' }}>
                Nästa steg →
              </button>
            </div>
          </div>
        )}

        {steg === 2 && (
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '32px' }}>Din resa</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px' }}>Hur länge reser du?</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {['3', '5', '7', '10', '14'].map(d => (
                    <button key={d} onClick={() => setFormData(p => ({ ...p, antalDagar: d }))} style={formData.antalDagar === d ? knappAktiv : knappInaktiv}>{d} dagar</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px' }}>Vad intresserar dig?</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {intresseVal.map(i => (
                    <button key={i} onClick={() => toggleIntresse(i)} style={formData.intressen.includes(i) ? knappAktiv : knappInaktiv}>{i}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px' }}>Önskad resperiod</label>
                <input style={inputStyle} placeholder="T.ex. Juli 2025 eller v.28-30" value={formData.tid} onChange={e => setFormData(p => ({ ...p, tid: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px' }}>Budget per person</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[{ val: 'budget', text: '💰 Budget' }, { val: 'medel', text: '💰💰 Medel' }, { val: 'lyx', text: '💰💰💰 Lyx' }].map(b => (
                    <button key={b.val} onClick={() => setFormData(p => ({ ...p, budget: b.val }))} style={formData.budget === b.val ? knappAktiv : knappInaktiv}>{b.text}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setSteg(1)} style={{ ...knappInaktiv, padding: '16px 24px' }}>← Tillbaka</button>
                <button onClick={() => setSteg(3)} style={{ flex: 1, padding: '16px 40px', background: '#c0392b', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer' }}>
                  Nästa steg →
                </button>
              </div>
            </div>
          </div>
        )}

        {steg === 3 && (
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '32px' }}>Önskemål & boende</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px' }}>Önskat boende</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[{ val: 'hotell', text: '🏨 Hotell' }, { val: 'villa', text: '🏡 Villa' }, { val: 'airbnb', text: '🛋️ Airbnb' }, { val: 'resort', text: '🌴 Resort' }].map(b => (
                    <button key={b.val} onClick={() => setFormData(p => ({ ...p, boende: b.val }))} style={formData.boende === b.val ? knappAktiv : knappInaktiv}>{b.text}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Övriga önskemål eller frågor</label>
                <textarea style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} placeholder="Berätta mer om din drömresa..." value={formData.meddelande} onChange={e => setFormData(p => ({ ...p, meddelande: e.target.value }))} />
              </div>
              <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <h3 style={{ fontWeight: '700', marginBottom: '12px' }}>📋 Din sammanfattning</h3>
                <p>👤 {formData.namn} · {formData.antalPersoner} pers</p>
                <p>📅 {formData.antalDagar} dagar · {formData.tid || 'Tid ej angiven'}</p>
                <p>💰 {formData.budget === 'budget' ? 'Budget' : formData.budget === 'medel' ? 'Medel' : 'Lyx'} · 🏠 {formData.boende}</p>
                <p>❤️ {formData.intressen.join(', ') || 'Inga intressen valda'}</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setSteg(2)} style={{ ...knappInaktiv, padding: '16px 24px' }}>← Tillbaka</button>
                <button onClick={() => setSkickat(true)} style={{ flex: 1, padding: '16px 40px', background: '#c0392b', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer' }}>
                  🌴 Skicka förfrågan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
