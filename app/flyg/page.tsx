'use client';
import { useRef, useState, type FormEvent } from 'react';
import { IconPlane, IconSparkle, IconBulb, IconCalendar, IconSun, IconClock, IconInfo } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';

const flygplatser = [
  { kod: 'GOT', namn: 'Göteborg Landvetter' },
  { kod: 'ARN', namn: 'Stockholm Arlanda' },
  { kod: 'MMX', namn: 'Malmö Airport' },
  { kod: 'OSL', namn: 'Oslo Gardermoen' },
];

type Fält = 'utresa' | 'hemresa';
type Fel = Partial<Record<Fält, string>>;

/** ÅÅÅÅ-MM-DD → ÅÅMMDD (Skyscanners datumformat i sök-URL:en) */
const tillSkyscannerDatum = (iso: string) => iso.replace(/-/g, '').slice(2);

/** Dagens datum som ÅÅÅÅ-MM-DD i besökarens tidszon */
const idag = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
};

function valideraDatum(utresa: string, hemresa: string): Fel {
  const fel: Fel = {};
  if (!utresa) {
    fel.utresa = 'Välj ett utresedatum.';
  } else if (utresa < idag()) {
    fel.utresa = 'Utresedatumet har redan passerat. Välj dagens datum eller ett senare.';
  }
  if (hemresa && utresa && hemresa < utresa) {
    fel.hemresa = 'Hemresan kan inte vara före utresan.';
  }
  return fel;
}

const fältStil = { width: '100%', padding: '12px 16px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '1rem', boxSizing: 'border-box' as const };
const felStil = { ...fältStil, border: '2px solid #b42318' };
const etikettStil = { display: 'block', fontWeight: '700', fontSize: '0.85rem', marginBottom: '8px', color: '#555' };
const hjälpStil = { fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '6px 0 0' };
const felTextStil = { fontSize: '0.85rem', color: '#b42318', fontWeight: 600, margin: '6px 0 0' };

export default function FlygPage() {
  const [från, setFrån] = useState('GOT');
  const [utresa, setUtresa] = useState('');
  const [hemresa, setHemresa] = useState('');
  const [resenärer, setResenärer] = useState('1');
  const [fel, setFel] = useState<Fel>({});
  const utresaRef = useRef<HTMLInputElement>(null);
  const hemresaRef = useRef<HTMLInputElement>(null);

  const sökFlyg = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nyaFel = valideraDatum(utresa, hemresa);
    setFel(nyaFel);
    if (nyaFel.utresa) { utresaRef.current?.focus(); return; }
    if (nyaFel.hemresa) { hemresaRef.current?.focus(); return; }
    const datum = [utresa, hemresa].filter(Boolean).map(tillSkyscannerDatum).join('/');
    const url = `https://www.skyscanner.se/transport/flyg/${från.toLowerCase()}/pmi/${datum}/?adults=${resenärer}&currency=SEK&locale=sv-SE`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      {/* Hero */}
      <HeroImage
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
        alt="Flygplan över moln ovanför Medelhavet på väg till Palma de Mallorca"
        kicker="Res till Mallorca"
        title="Hitta flyg till Palma"
        subtitle="Sök och jämför flyg från Sverige till Mallorca"
        height="55vh"
      />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(24px,4vw,60px) clamp(16px,4vw,40px)' }}>

        {/* Sökformulär */}
        <section aria-labelledby="flygsok-rubrik" style={{ background: 'white', borderRadius: '20px', padding: 'clamp(20px, 4vw, 40px)', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', marginBottom: '48px' }}>
          <h2 id="flygsok-rubrik" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.05em', margin: '0 0 28px', color: '#111' }}>
            Sök flyg till Palma de Mallorca
          </h2>

          <form onSubmit={sökFlyg} noValidate aria-labelledby="flygsok-rubrik">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label htmlFor="flyg-fran" style={etikettStil}>AVRESA FRÅN</label>
                <select
                  id="flyg-fran"
                  name="fran"
                  value={från}
                  onChange={e => setFrån(e.target.value)}
                  style={{ ...fältStil, background: 'white', cursor: 'pointer' }}
                >
                  {flygplatser.map(f => (
                    <option key={f.kod} value={f.kod}>{f.namn} ({f.kod})</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="flyg-till" style={etikettStil}>DESTINATION</label>
                <input
                  id="flyg-till"
                  type="text"
                  value="Palma de Mallorca (PMI)"
                  readOnly
                  style={{ ...fältStil, background: '#f9f9f9', color: '#555' }}
                />
              </div>

              <div>
                <label htmlFor="flyg-utresa" style={etikettStil}>UTRESEDATUM</label>
                <input
                  ref={utresaRef}
                  id="flyg-utresa"
                  name="utresa"
                  type="date"
                  required
                  aria-invalid={fel.utresa ? true : undefined}
                  aria-describedby="flyg-utresa-fel"
                  value={utresa}
                  onChange={e => { setUtresa(e.target.value); setFel(f => ({ ...f, utresa: undefined })); }}
                  style={fel.utresa ? felStil : fältStil}
                />
                <p id="flyg-utresa-fel" aria-live="polite" style={felTextStil}>{fel.utresa}</p>
              </div>

              <div>
                <label htmlFor="flyg-hemresa" style={etikettStil}>HEMRESEDATUM</label>
                <input
                  ref={hemresaRef}
                  id="flyg-hemresa"
                  name="hemresa"
                  type="date"
                  min={utresa || undefined}
                  aria-invalid={fel.hemresa ? true : undefined}
                  aria-describedby="flyg-hemresa-hjalp flyg-hemresa-fel"
                  value={hemresa}
                  onChange={e => { setHemresa(e.target.value); setFel(f => ({ ...f, hemresa: undefined })); }}
                  style={fel.hemresa ? felStil : fältStil}
                />
                <p id="flyg-hemresa-hjalp" style={hjälpStil}>Lämna tomt för enkelresa.</p>
                <p id="flyg-hemresa-fel" aria-live="polite" style={felTextStil}>{fel.hemresa}</p>
              </div>

              <div>
                <label htmlFor="flyg-resenarer" style={etikettStil}>RESENÄRER</label>
                <select
                  id="flyg-resenarer"
                  name="resenarer"
                  value={resenärer}
                  onChange={e => setResenärer(e.target.value)}
                  style={{ ...fältStil, background: 'white', cursor: 'pointer' }}
                >
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'person' : 'personer'}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              aria-describedby="flyg-skyscanner-info"
              style={{ width: '100%', padding: '16px', background: '#993335', color: '#fefefb', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', cursor: 'pointer' }}
            >
              SÖK FLYG PÅ SKYSCANNER →
            </button>
            <p id="flyg-skyscanner-info" style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '12px' }}>
              Sökningen öppnas hos Skyscanner i en ny flik. Vi sparar inget av det du fyller i.
            </p>
          </form>
        </section>

        {/* Snabbknappar */}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.05em', marginBottom: '24px', paddingBottom: '12px', borderBottom: '3px solid #993335', color: '#111', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <IconSparkle size={22} /> Snabbsök – Populära avgångar
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          {flygplatser.map(f => (
            <div key={f.kod} style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <div style={{ marginBottom: '8px', color: '#383a46' }}><IconPlane size={28} /></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '0 0 4px', color: '#111' }}>{f.namn}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '0 0 16px' }}>{f.kod} → PMI · Palma de Mallorca</p>
              <a
                href={`https://www.skyscanner.se/transport/flyg/${f.kod.toLowerCase()}/pmi/?adults=1&currency=SEK&locale=sv-SE`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', boxSizing: 'border-box', width: '100%', padding: '10px', background: '#993335', color: '#fefefb', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', textAlign: 'center', textDecoration: 'none' }}
              >
                Sök flyg från {f.kod} <span aria-hidden="true">→</span>
                <span className="sr-only"> (öppnas i ny flik)</span>
              </a>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div style={{ background: '#111', borderRadius: '16px', padding: '32px', color: 'white' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <IconBulb size={22} /> Tips för billigare flyg till Mallorca
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { Icon: IconCalendar, tips: 'Boka 6–8 veckor i förväg för bästa pris' },
              { Icon: IconSun, tips: 'Maj och september är billigare än juli–aug' },
              { Icon: IconClock, tips: 'Tidiga morgon- eller sena kvällsflygningar är ofta billigast' },
              { Icon: IconInfo, tips: 'Sätt prisvarning på Skyscanner och vänta på rea' },
            ].map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ marginBottom: '8px', color: 'white' }}><t.Icon size={22} /></div>
                <p style={{ fontSize: '0.9rem', color: '#ddd', margin: 0, lineHeight: '1.5' }}>{t.tips}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
