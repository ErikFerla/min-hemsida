'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import Map, { type MapMarker } from '@/components/Map';
import {
  LEDIG,
  alternativ,
  byggPlan,
  dagval,
  förslag,
  formateraMinuter,
  harAnkomstOchHemresa,
  intressen,
  körning,
  läsVal,
  mittdagar,
  områdesNamn,
  valTillSök,
  ärFörslagsId,
  ärÄndrad,
  type Dagar,
  type IntresseId,
  type MittDag,
  type Orter,
  type PlanDag,
  type Val,
} from '@/app/lib/planner';
import styles from './ResplanVerktyg.module.css';

/** Visas när adressen saknar val – och i den serverrenderade HTML:en. */
const EXEMPEL: Val & { dagar: Dagar } = { dagar: '7', intressen: ['strand', 'kultur', 'mat'], plan: null };

const URL_HÄNDELSE = 'resplan-url';

function prenumerera(callback: () => void) {
  window.addEventListener('popstate', callback);
  window.addEventListener(URL_HÄNDELSE, callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(URL_HÄNDELSE, callback);
  };
}

const ingenPrenumeration = () => () => {};

function skrivVal(val: Val) {
  window.history.replaceState(window.history.state, '', `${window.location.pathname}?${valTillSök(val)}`);
  window.dispatchEvent(new Event(URL_HÄNDELSE));
}

const listaText = (delar: string[]) =>
  delar.length <= 1 ? delar.join('') : `${delar.slice(0, -1).join(', ')} och ${delar[delar.length - 1]}`;

type Fokus = { index: number; knapp: 'upp' | 'ner' | 'byt' } | null;

export default function ResplanVerktyg({ orter, baseUrl }: { orter: Orter; baseUrl: string }) {
  // Valen i URL:en är sanningen. På servern (och vid första renderingen) visas exemplet.
  const search = useSyncExternalStore(prenumerera, () => window.location.search, () => '');
  const kanDela = useSyncExternalStore(ingenPrenumeration, () => typeof navigator.share === 'function', () => false);
  const frånUrl = läsVal(search);
  const ärExempel = frånUrl.dagar === '';
  const val: Val & { dagar: Dagar } = ärExempel ? EXEMPEL : { ...frånUrl, dagar: frånUrl.dagar as Dagar };

  const mitt = mittdagar(val);
  const plan = byggPlan(val);
  const ändrad = ärÄndrad(val);
  const offset = harAnkomstOchHemresa(val.dagar) ? 1 : 0;
  const delbarUrl = `${baseUrl}/resplan?${valTillSök({ ...val, plan: mitt })}`;

  const [meddelande, setMeddelande] = useState('');
  const [delning, setDelning] = useState('');
  const [karta, setKarta] = useState<'alla' | number>('alla');
  const fokus = useRef<Fokus>(null);

  useEffect(() => {
    const f = fokus.current;
    if (!f) return;
    fokus.current = null;
    if (f.knapp === 'byt') {
      document.getElementById(`dag-${f.index}-byt`)?.focus();
      return;
    }
    const knapp = document.getElementById(`dag-${f.index}-${f.knapp}`) as HTMLButtonElement | null;
    const annan = document.getElementById(`dag-${f.index}-${f.knapp === 'upp' ? 'ner' : 'upp'}`) as HTMLButtonElement | null;
    (knapp && !knapp.disabled ? knapp : annan)?.focus();
  }, [search]);

  /* ---------------------------- Körningar ---------------------------- */

  const körningar = plan.map((dag, i) => {
    const från = i === 0 ? 'palma-de-mallorca' : plan[i - 1].ort;
    if (i === 0 && dag.typ === 'ankomst') return null;
    return { från: orter[från], k: körning(orter[från], orter[dag.ort]) };
  });
  const totalKm = körningar.reduce((sum, k) => sum + (k?.k?.km ?? 0), 0);

  /* ------------------------------ Karta ------------------------------ */

  const valdKarta = karta !== 'alla' && karta < plan.length ? karta : 'alla';
  const planNyckel = plan.map(d => `${d.id ?? d.typ}:${d.ort}`).join('|');
  const markörer = useMemo<MapMarker[]>(() => {
    const markör = (slug: PlanDag['ort'], desc: string, main: boolean): MapMarker => ({
      name: orter[slug].name, lat: orter[slug].lat, lng: orter[slug].lng, href: `/${slug}`, desc, main,
    });
    if (valdKarta === 'alla') {
      const perOrt = new globalThis.Map<PlanDag['ort'], number[]>();
      plan.forEach((d, i) => perOrt.set(d.ort, [...(perOrt.get(d.ort) ?? []), i + 1]));
      return [...perOrt].map(([slug, dagar]) =>
        markör(slug, `Dag ${listaText(dagar.map(String))}`, slug === 'palma-de-mallorca'),
      );
    }
    const dag = plan[valdKarta];
    const lista = [markör(dag.ort, `Dag ${valdKarta + 1}: ${dag.innehåll.titel}`, true)];
    const före = valdKarta > 0 ? plan[valdKarta - 1] : null;
    if (före && före.ort !== dag.ort) lista.push(markör(före.ort, `Dag ${valdKarta}: ${före.innehåll.titel}`, false));
    return lista;
    // planNyckel fångar allt i planen som påverkar markörerna
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planNyckel, valdKarta, orter]);

  /* ----------------------------- Ändringar ---------------------------- */

  const väljDagar = (d: Dagar) => {
    skrivVal({ dagar: d, intressen: val.intressen, plan: null });
    setKarta('alla');
    setMeddelande(`Planen visar nu ${d} dagar.`);
  };

  const toggleIntresse = (id: IntresseId) => {
    const nya = val.intressen.includes(id) ? val.intressen.filter(x => x !== id) : [...val.intressen, id];
    skrivVal({ dagar: val.dagar, intressen: intressen.map(i => i.id).filter(x => nya.includes(x)), plan: null });
    setMeddelande('Planen är uppdaterad efter dina intressen.');
  };

  const flytta = (i: number, steg: -1 | 1) => {
    const j = i + steg;
    if (j < 0 || j >= mitt.length) return;
    const ny = [...mitt];
    [ny[i], ny[j]] = [ny[j], ny[i]];
    fokus.current = { index: j + offset + 1, knapp: steg < 0 ? 'upp' : 'ner' };
    skrivVal({ ...val, plan: ny });
    setMeddelande(`Dag ${i + offset + 1} är flyttad till dag ${j + offset + 1}.`);
  };

  // Bytet sker först när man trycker på Byt-knappen, så att man kan bläddra i listan med
  // piltangenterna utan att dagen byts vid varje tryck (WCAG 3.2.2).
  const byt = (i: number, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nytt = String(new FormData(e.currentTarget).get('forslag') ?? '');
    if (nytt !== LEDIG && !ärFörslagsId(nytt)) return;
    const ny = [...mitt];
    ny[i] = nytt as MittDag;
    fokus.current = { index: i + offset + 1, knapp: 'byt' };
    skrivVal({ ...val, plan: ny });
    const titel = nytt === LEDIG ? 'en ledig dag' : förslag[nytt].titel;
    setMeddelande(`Dag ${i + offset + 1} är utbytt mot ${titel}.`);
  };

  const återställ = () => {
    skrivVal({ ...val, plan: null });
    setMeddelande('Planen är återställd till förslaget.');
  };

  /* ------------------------------ Dela ------------------------------ */

  const kopiera = async () => {
    try {
      await navigator.clipboard.writeText(delbarUrl);
      setDelning('Länken är kopierad.');
    } catch {
      setDelning('Det gick inte att kopiera. Kopiera adressen i webbläsarens adressfält i stället.');
    }
  };

  const dela = async () => {
    try {
      await navigator.share({ title: 'Resplan för Mallorca', text: `${val.dagar} dagar på Mallorca – dag för dag`, url: delbarUrl });
    } catch {
      // Avbruten delning är inget fel
    }
  };

  const valdaNamn = intressen.filter(i => val.intressen.includes(i.id)).map(i => i.label);

  return (
    <div className={styles.tool}>
      {/* Val */}
      <section aria-labelledby="resplan-val" className={`${styles.choices} ${styles.noPrint}`}>
        <h2 id="resplan-val" className={styles.h2}>Välj din resa</h2>
        <p className={styles.lead}>Planen ändras direkt när du väljer. Allt sparas i adressen – inget sparas hos oss.</p>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Hur länge reser du?</legend>
          <div className={styles.options}>
            {dagval.map(d => (
              <button key={d} type="button" aria-pressed={!ärExempel && val.dagar === d} onClick={() => väljDagar(d)} className={styles.option}>
                {d} dagar
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Vad intresserar dig? (välj flera)</legend>
          <div className={styles.options}>
            {intressen.map(({ id, label }) => (
              <button key={id} type="button" aria-pressed={!ärExempel && val.intressen.includes(id)} onClick={() => toggleIntresse(id)} className={styles.option}>
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <p aria-live="polite" className={styles.status}>{meddelande}</p>
      </section>

      {/* Planen */}
      <section aria-labelledby="resplan-plan" className={styles.plan}>
        <p className={styles.kicker}>{ärExempel ? 'Exempelplan' : ändrad ? 'Din resplan – ändrad' : 'Din resplan'}</p>
        <h2 id="resplan-plan" className={styles.h2}>
          {val.dagar} dagar på Mallorca{valdaNamn.length > 0 ? `: ${valdaNamn.join(' + ')}` : ': klassikerna'}
        </h2>
        <p className={styles.summary}>
          {ärExempel && 'Så här kan en vecka se ut för den som gillar stränder, kultur och mat. Välj dina egna dagar och intressen ovan, så räknas en ny plan fram. '}
          Dagarna är ordnade efter område, så att du slipper åka fram och tillbaka över ön.
          {totalKm > 0 && ` Sammanlagt blir det ca ${totalKm} km bilkörning mellan dagarnas orter, räknat med schablonen nedan.`}
          {Number(val.dagar) >= 10 && ' Med så här många dagar lönar det sig att byta boende en gång, till exempel från Palma eller västkusten till norra eller östra Mallorca.'}
        </p>

        <div className={`${styles.actions} ${styles.noPrint}`}>
          <button type="button" onClick={kopiera} className={styles.action}>Kopiera länk</button>
          {kanDela && <button type="button" onClick={dela} className={styles.action}>Dela</button>}
          <button type="button" onClick={() => window.print()} className={styles.action}>Skriv ut / spara som PDF</button>
          {ändrad && <button type="button" onClick={återställ} className={styles.actionQuiet}>Återställ förslaget</button>}
          <p aria-live="polite" className={styles.actionNote}>
            {delning || 'Länken innehåller hela planen, även dagar du har bytt eller flyttat.'}
          </p>
        </div>
        <p className={styles.printOnly}>Planen finns på: {delbarUrl}</p>

        {/* Karta */}
        <div className={`${styles.mapBox} ${styles.noPrint}`}>
          <div className={styles.mapHead}>
            <h3 className={styles.h3}>Karta</h3>
            <label className={styles.mapLabel}>
              <span>Visa</span>
              <select
                value={valdKarta === 'alla' ? 'alla' : String(valdKarta)}
                onChange={e => setKarta(e.target.value === 'alla' ? 'alla' : Number(e.target.value))}
                className={styles.select}
              >
                <option value="alla">Hela resan</option>
                {plan.map((d, i) => (
                  <option key={i} value={i}>Dag {i + 1}: {d.innehåll.titel} ({orter[d.ort].name})</option>
                ))}
              </select>
            </label>
          </div>
          <Map
            markers={markörer}
            height="clamp(300px, 50vh, 440px)"
            ariaLabel={valdKarta === 'alla' ? 'Karta över resans orter' : `Karta över dag ${valdKarta + 1}`}
            ctaLabel="Om orten"
            listLabel={`Visa ${valdKarta === 'alla' ? 'resans orter' : 'dagens orter'} som lista`}
          />
        </div>

        {/* Dag för dag */}
        <ol className={styles.days}>
          {plan.map((dag, i) => {
            const n = i + 1;
            const mittIndex = i - offset;
            const kanÄndras = dag.typ === 'förslag' || dag.typ === 'ledig';
            const k = körningar[i];
            const ort = orter[dag.ort];
            const område = dag.innehåll.område ? områdesNamn[dag.innehåll.område] : null;
            const alt = kanÄndras ? alternativ(mitt, mittIndex, val.intressen) : null;
            const altText = (id: (typeof mitt)[number]) =>
              id === LEDIG ? 'Ledig dag' : `${förslag[id].titel} (${orter[förslag[id].ort].name})`;
            return (
              <li key={`${n}-${dag.id ?? dag.typ}`} className={styles.day} aria-labelledby={`dag-${n}-rubrik`}>
                <p className={styles.dayKicker}>
                  <span className={styles.dayNumber}>Dag {n}</span>
                  {område && <span>{område}</span>}
                </p>
                <h3 id={`dag-${n}-rubrik`} className={styles.dayTitle}>
                  <span className="sr-only">Dag {n}: </span>{dag.innehåll.titel}
                </h3>
                <p className={styles.place}>
                  {dag.typ === 'ledig' ? 'Stanna i trakten kring ' : 'Utgångspunkt: '}
                  <Link href={`/${dag.ort}`} className={styles.link}>{ort.name}</Link>
                  {k && (
                    <span className={styles.drive}>
                      {k.k
                        ? `Bil från ${k.från.name}: ca ${k.k.km} km, ca ${formateraMinuter(k.k.minuter)}`
                        : i === 0 ? 'Nära flygplatsen och Palma' : 'Samma ort som dagen före'}
                    </span>
                  )}
                </p>
                <dl className={styles.parts}>
                  <div className={styles.part}>
                    <dt>Förmiddag</dt>
                    <dd>{dag.innehåll.förmiddag}</dd>
                  </div>
                  <div className={styles.part}>
                    <dt>Eftermiddag</dt>
                    <dd>{dag.innehåll.eftermiddag}</dd>
                  </div>
                  <div className={styles.part}>
                    <dt>Kväll</dt>
                    <dd>{dag.innehåll.kväll}</dd>
                  </div>
                </dl>
                <p className={styles.meta}>
                  {dag.taggar.length > 0 && <span className={styles.tags}>{dag.taggar.join(' · ')}</span>}
                  {dag.innehåll.länkar.map(l => (
                    <Link key={l.href} href={l.href} className={styles.link}>{l.label}</Link>
                  ))}
                </p>

                {kanÄndras && alt && (
                  <div className={`${styles.controls} ${styles.noPrint}`}>
                    <div className={styles.move}>
                      <button
                        id={`dag-${n}-upp`}
                        type="button"
                        onClick={() => flytta(mittIndex, -1)}
                        disabled={mittIndex === 0}
                        className={styles.small}
                        aria-label={`Flytta dag ${n} en dag tidigare`}
                      >
                        ↑ Tidigare
                      </button>
                      <button
                        id={`dag-${n}-ner`}
                        type="button"
                        onClick={() => flytta(mittIndex, 1)}
                        disabled={mittIndex === mitt.length - 1}
                        className={styles.small}
                        aria-label={`Flytta dag ${n} en dag senare`}
                      >
                        ↓ Senare
                      </button>
                    </div>
                    <form className={styles.swap} onSubmit={e => byt(mittIndex, e)}>
                      <label htmlFor={`dag-${n}-forslag`}>Byt ut dag {n}</label>
                      <select id={`dag-${n}-forslag`} name="forslag" defaultValue="" required className={styles.select}>
                        <option value="" disabled>Välj ett annat förslag …</option>
                        {alt.passar.length > 0 && (
                          <optgroup label="Passar dina intressen">
                            {alt.passar.map(id => <option key={id} value={id}>{altText(id)}</option>)}
                          </optgroup>
                        )}
                        {alt.sammaOmråde.length > 0 && (
                          <optgroup label="I samma område">
                            {alt.sammaOmråde.map(id => <option key={id} value={id}>{altText(id)}</option>)}
                          </optgroup>
                        )}
                        <optgroup label="Övriga förslag">
                          {dag.typ !== 'ledig' && <option value={LEDIG}>Ledig dag</option>}
                          {alt.övriga.map(id => <option key={id} value={id}>{altText(id)}</option>)}
                        </optgroup>
                      </select>
                      <button id={`dag-${n}-byt`} type="submit" className={styles.small}>
                        Byt
                      </button>
                    </form>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
