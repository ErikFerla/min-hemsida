'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { marknaderPåDag, veckodag, VECKODAGAR } from '@/data/markets';
import type { Evenemang } from './data';
import EvenemangKort from './EvenemangKort';
import styles from './Resekalender.module.css';

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const MAX_DAGAR = 31;
const KORT_MÅNAD = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];

function giltigt(v: string | null): string {
  if (!v || !ISO.test(v)) return '';
  const d = new Date(`${v}T12:00:00Z`);
  return Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== v ? '' : v;
}

function plusDagar(iso: string, n: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function dagText(iso: string): string {
  const dag = VECKODAGAR[veckodag(iso) - 1].namn;
  return `${dag} ${Number(iso.slice(8, 10))} ${KORT_MÅNAD[Number(iso.slice(5, 7)) - 1]}`;
}

function versal(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Uppdaterar URL:en utan omladdning – Next.js kopplar replaceState till useSearchParams. */
function sättDatum(fran: string, till: string) {
  const params = new URLSearchParams(window.location.search);
  if (fran) params.set('fran', fran);
  else params.delete('fran');
  if (till) params.set('till', till);
  else params.delete('till');
  const q = params.toString();
  window.history.replaceState(null, '', q ? `?${q}#resekalender` : `${window.location.pathname}#resekalender`);
}

/** Formulär och resultat. `fran`/`till` kommer från URL:en (?fran=ÅÅÅÅ-MM-DD&till=ÅÅÅÅ-MM-DD). */
function Vy({ evenemang, fran, till }: { evenemang: Evenemang[]; fran: string; till: string }) {
  const harBåda = Boolean(fran && till);
  const omvänd = harBåda && till < fran;
  const slut = harBåda && !omvänd ? (till > plusDagar(fran, MAX_DAGAR - 1) ? plusDagar(fran, MAX_DAGAR - 1) : till) : '';
  const förLång = harBåda && !omvänd && slut !== till;

  const dagar: string[] = [];
  if (slut) for (let d = fran; d <= slut; d = plusDagar(d, 1)) dagar.push(d);

  const underResan = slut ? evenemang.filter(e => e.start <= slut && e.slut >= fran) : [];
  const säkra = underResan.filter(e => e.status !== 'preliminärt');
  const preliminära = underResan.filter(e => e.status === 'preliminärt');

  return (
    <div>
      <form className={styles.form} onSubmit={ev => ev.preventDefault()} aria-describedby="resekalender-hjalp">
        <div className={styles.field}>
          <label htmlFor="fran">Ankomst</label>
          <input id="fran" type="date" value={fran} onChange={ev => sättDatum(ev.target.value, till)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="till">Avresa</label>
          <input id="till" type="date" value={till} min={fran || undefined} onChange={ev => sättDatum(fran, ev.target.value)} />
        </div>
        {(fran || till) && (
          <button type="button" className={styles.clear} onClick={() => sättDatum('', '')}>
            Rensa datum
          </button>
        )}
      </form>
      <p id="resekalender-hjalp" className={styles.help}>
        Datumen sparas i adressen, så du kan spara eller dela länken. Upp till {MAX_DAGAR} dagar visas.
      </p>

      <div aria-live="polite">
        {!harBåda && <p className={styles.empty}>Välj ankomst- och avresedatum så visar vi evenemang och veckomarknader under din resa.</p>}
        {omvänd && <p className={styles.warning}>Avresedatumet ligger före ankomsten – byt plats på datumen.</p>}

        {slut && (
          <div className={styles.result}>
            {förLång && <p className={styles.warning}>Vi visar de första {MAX_DAGAR} dagarna, till och med {dagText(slut)}.</p>}

            <h3 className={styles.resultTitle}>
              Evenemang {dagText(fran)} – {dagText(slut)}
            </h3>
            {säkra.length === 0 && preliminära.length === 0 && (
              <p className={styles.empty}>
                Vi känner inte till några större evenemang de dagarna. Byarna har ofta egna fester – fråga gärna på hotellet eller turistbyrån.
              </p>
            )}
            {säkra.length > 0 && (
              <div className={styles.grid}>
                {säkra.map(e => (
                  <EvenemangKort key={e.key} e={e} kompakt />
                ))}
              </div>
            )}
            {preliminära.length > 0 && (
              <>
                <p className={styles.prelIntro}>
                  Kanske under din resa – datumet är inte publicerat än, så kontrollera närmare resan:
                </p>
                <div className={styles.grid}>
                  {preliminära.map(e => (
                    <EvenemangKort key={e.key} e={e} kompakt />
                  ))}
                </div>
              </>
            )}

            <h3 className={styles.resultTitle}>Veckomarknader dag för dag</h3>
            <ul className={styles.days}>
              {dagar.map(d => {
                const m = marknaderPåDag(veckodag(d));
                return (
                  <li key={d} className={styles.day}>
                    <span className={styles.dayName}>{versal(dagText(d))}</span>
                    <span className={styles.dayMarkets}>
                      {m.length === 0
                        ? 'Ingen marknad i vår lista'
                        : m.map((x, i) => (
                            <span key={x.id}>
                              {i > 0 && ', '}
                              <Link href={`/marknader#${x.id}`}>{x.ort}</Link>
                            </span>
                          ))}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className={styles.help}>
              Marknaderna håller på förmiddagen. Mer om varje marknad på sidan <Link href="/marknader">Veckomarknader på Mallorca</Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ResekalenderStatisk({ evenemang }: { evenemang: Evenemang[] }) {
  return <Vy evenemang={evenemang} fran="" till="" />;
}

export default function Resekalender({ evenemang }: { evenemang: Evenemang[] }) {
  const sp = useSearchParams();
  return <Vy evenemang={evenemang} fran={giltigt(sp.get('fran'))} till={giltigt(sp.get('till'))} />;
}
