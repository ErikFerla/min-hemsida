'use client';
import { useRef, useState, type FormEvent } from 'react';
import { IconPlane, IconSparkle, IconBulb, IconCalendar, IconSun, IconClock, IconInfo } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import h from '../guide/headings.module.css';
import styles from './flyg.module.css';

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
    <div className={styles.page}>
      {/* Hero */}
      <HeroImage
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
        alt="Flygplan över moln ovanför Medelhavet på väg till Palma de Mallorca"
        kicker="Res till Mallorca"
        title="Hitta flyg till Palma"
        subtitle="Sök och jämför flyg från Sverige till Mallorca"
        height="55vh"
      />

      <div className={styles.container}>

        {/* Sökformulär */}
        <section aria-labelledby="flygsok-rubrik" className={styles.search}>
          <h2 id="flygsok-rubrik" className={`${h.h2} ${styles.heading}`}>
            Sök flyg till Palma de Mallorca
          </h2>

          <form onSubmit={sökFlyg} noValidate aria-labelledby="flygsok-rubrik">
            <div className={styles.fields}>
              <div>
                <label htmlFor="flyg-fran" className={styles.label}>AVRESA FRÅN</label>
                <select
                  id="flyg-fran"
                  name="fran"
                  value={från}
                  onChange={e => setFrån(e.target.value)}
                  className={`${styles.field} ${styles.select}`}
                >
                  {flygplatser.map(f => (
                    <option key={f.kod} value={f.kod}>{f.namn} ({f.kod})</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="flyg-till" className={styles.label}>DESTINATION</label>
                <input
                  id="flyg-till"
                  type="text"
                  value="Palma de Mallorca (PMI)"
                  readOnly
                  className={`${styles.field} ${styles.readonly}`}
                />
              </div>

              <div>
                <label htmlFor="flyg-utresa" className={styles.label}>UTRESEDATUM</label>
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
                  className={styles.field}
                />
                <p id="flyg-utresa-fel" aria-live="polite" className={styles.error}>{fel.utresa}</p>
              </div>

              <div>
                <label htmlFor="flyg-hemresa" className={styles.label}>HEMRESEDATUM</label>
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
                  className={styles.field}
                />
                <p id="flyg-hemresa-hjalp" className={styles.help}>Lämna tomt för enkelresa.</p>
                <p id="flyg-hemresa-fel" aria-live="polite" className={styles.error}>{fel.hemresa}</p>
              </div>

              <div>
                <label htmlFor="flyg-resenarer" className={styles.label}>RESENÄRER</label>
                <select
                  id="flyg-resenarer"
                  name="resenarer"
                  value={resenärer}
                  onChange={e => setResenärer(e.target.value)}
                  className={`${styles.field} ${styles.select}`}
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
              className={styles.submit}
            >
              SÖK FLYG PÅ SKYSCANNER →
            </button>
            <p id="flyg-skyscanner-info" className={styles.note}>
              Sökningen öppnas hos Skyscanner i en ny flik. Vi sparar inget av det du fyller i.
            </p>
          </form>
        </section>

        {/* Snabbknappar */}
        <h2 className={`${h.h2} ${styles.quickHeading}`}>
          <IconSparkle size={22} /> Snabbsök – Populära avgångar
        </h2>
        <div className={styles.quickGrid}>
          {flygplatser.map(f => (
            <div key={f.kod} className={styles.airport}>
              <div className={styles.airportIcon}><IconPlane size={28} /></div>
              <h3 className={`${h.h3} ${styles.airportName}`}>{f.namn}</h3>
              <p className={styles.route}>{f.kod} → PMI · Palma de Mallorca</p>
              <a
                href={`https://www.skyscanner.se/transport/flyg/${f.kod.toLowerCase()}/pmi/?adults=1&currency=SEK&locale=sv-SE`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.airportLink}
              >
                Sök flyg från {f.kod} <span aria-hidden="true">→</span>
                <span className="sr-only"> (öppnas i ny flik)</span>
              </a>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className={styles.tips}>
          <h2 className={`${h.h2} ${styles.tipsHeading}`}>
            <IconBulb size={22} /> Tips för billigare flyg till Mallorca
          </h2>
          <div className={styles.tipsGrid}>
            {[
              { Icon: IconCalendar, tips: 'Boka 6–8 veckor i förväg för bästa pris' },
              { Icon: IconSun, tips: 'Maj och september är billigare än juli–aug' },
              { Icon: IconClock, tips: 'Tidiga morgon- eller sena kvällsflygningar är ofta billigast' },
              { Icon: IconInfo, tips: 'Sätt prisvarning på Skyscanner och vänta på rea' },
            ].map((t, i) => (
              <div key={i} className={styles.tip}>
                <div className={styles.tipIcon}><t.Icon size={22} /></div>
                <p className={styles.tipText}>{t.tips}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
