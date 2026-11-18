'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import { IconWave, IconBuilding, IconForkKnife, IconHiker, IconUsers, IconFlag, IconMap, IconBulb, IconPalm } from '@/components/Icons';
import type { ComponentType } from 'react';
import { byggPlan, dagval, intressen, läsVal as läsPlanVal, valTillSök, type Dagar, type IntresseId } from '@/app/lib/planner';
import s from './section.module.css';
import styles from './SectionPlanner.module.css';

/* Planernas data och logik ligger i app/lib/planner.ts och delas med /resplan. */

const ikoner: Record<IntresseId, ComponentType<{ size?: number }>> = {
  strand: IconWave,
  kultur: IconBuilding,
  mat: IconForkKnife,
  aventyr: IconHiker,
  familj: IconUsers,
  golf: IconFlag,
};

/* ------------------------- URL-tillstånd ------------------------- */

type Val = { dagar: Dagar | ''; intressen: IntresseId[] };

function läsVal(search: string): Val {
  const { dagar, intressen } = läsPlanVal(search);
  return { dagar, intressen };
}

const URL_HÄNDELSE = 'resplan-url';

function prenumerera(callback: () => void) {
  window.addEventListener('popstate', callback);
  window.addEventListener(URL_HÄNDELSE, callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(URL_HÄNDELSE, callback);
  };
}

function skrivVal(val: Val) {
  const params = new URLSearchParams(window.location.search);
  params.set('dagar', val.dagar);
  params.set('intressen', val.intressen.join(','));
  window.history.replaceState(window.history.state, '', `${window.location.pathname}?${params.toString()}#resplanerare`);
  window.dispatchEvent(new Event(URL_HÄNDELSE));
}

const sammaVal = (a: Val, b: Val) => a.dagar === b.dagar && a.intressen.join() === b.intressen.join();

/* --------------------------- Komponent --------------------------- */

export default function SectionPlanner() {
  // Valen i URL:en är sanningen: en delad länk visar samma plan. Sidan är fortfarande statisk –
  // på servern (och vid första renderingen) är inget valt.
  const search = useSyncExternalStore(prenumerera, () => window.location.search, () => '');
  const frånUrl = läsVal(search);
  const [utkast, setUtkast] = useState<Val | null>(null);
  const [fel, setFel] = useState<{ dagar?: string; intressen?: string }>({});
  const [kopierad, setKopierad] = useState('');
  const planRubrik = useRef<HTMLHeadingElement>(null);
  const fokuseraPlan = useRef(false);

  const val = utkast ?? frånUrl;
  const planKlar = frånUrl.dagar !== '' && frånUrl.intressen.length > 0;
  const visaPlan = planKlar && (utkast === null || sammaVal(utkast, frånUrl));
  const plan = visaPlan && frånUrl.dagar
    ? byggPlan({ dagar: frånUrl.dagar, intressen: frånUrl.intressen, plan: null }).map(d => ({ text: d.innehåll.text, länkar: d.innehåll.länkar, taggar: d.taggar }))
    : [];
  const resplanHref = `/resplan?${valTillSök({ ...frånUrl, plan: null })}`;

  useEffect(() => {
    if (visaPlan && fokuseraPlan.current) {
      fokuseraPlan.current = false;
      planRubrik.current?.focus();
    }
  }, [visaPlan, search]);

  const väljDagar = (d: Dagar) => {
    setUtkast({ ...val, dagar: d });
    setFel(f => ({ ...f, dagar: undefined }));
  };

  const toggleIntresse = (id: IntresseId) => {
    const nya = val.intressen.includes(id) ? val.intressen.filter(x => x !== id) : [...val.intressen, id];
    setUtkast({ ...val, intressen: intressen.map(i => i.id).filter(x => nya.includes(x)) });
    setFel(f => ({ ...f, intressen: undefined }));
  };

  const skapaPlan = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nyaFel = {
      dagar: val.dagar ? undefined : 'Välj hur många dagar du reser.',
      intressen: val.intressen.length ? undefined : 'Välj minst ett intresse.',
    };
    setFel(nyaFel);
    if (nyaFel.dagar || nyaFel.intressen) {
      const förstaFel = document.getElementById(nyaFel.dagar ? 'planner-dagar' : 'planner-intressen');
      förstaFel?.querySelector<HTMLButtonElement>('button')?.focus();
      return;
    }
    fokuseraPlan.current = true;
    setKopierad('');
    skrivVal(val);
    setUtkast(null);
  };

  const kopieraLänk = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setKopierad('Länken är kopierad.');
    } catch {
      setKopierad('Det gick inte att kopiera. Kopiera adressen i webbläsarens adressfält i stället.');
    }
  };

  const dagarText = frånUrl.dagar;
  const valdaNamn = intressen.filter(i => frånUrl.intressen.includes(i.id)).map(i => i.label);

  return (
    <section id="resplanerare" className={styles.section} aria-labelledby="resplanerare-rubrik">
      <div className={styles.grid}>

        {/* Vänster: Hela planner-innehållet */}
        <div>
        <p className={s.label}>RESPLANERARE</p>
        <h2 id="resplanerare-rubrik" className={s.title}>Skräddarsy din resa</h2>
        <div className={s.divider}></div>
        <p className={styles.intro}>
          Berätta vad du gillar – få ett förslag på resplan för Mallorca
        </p>

        <form onSubmit={skapaPlan} noValidate aria-labelledby="resplanerare-rubrik">
          <fieldset id="planner-dagar" className={styles.fieldset} aria-describedby="planner-dagar-fel">
            <legend className={styles.legend}>Hur länge reser du?</legend>
            <div className={`${styles.options} ${styles.optionsDays}`}>
              {dagval.map(d => (
                <button key={d} type="button" aria-pressed={val.dagar === d} onClick={() => väljDagar(d)} className={styles.option}>
                  {d} dagar
                </button>
              ))}
            </div>
            <p id="planner-dagar-fel" aria-live="polite" className={fel.dagar ? styles.errorShown : styles.error}>{fel.dagar}</p>
          </fieldset>

          <fieldset id="planner-intressen" className={`${styles.fieldset} ${styles.fieldsetLast}`} aria-describedby="planner-intressen-fel">
            <legend className={styles.legend}>Vad intresserar dig? (välj flera)</legend>
            <div className={`${styles.options} ${styles.optionsInterests}`}>
              {intressen.map(({ id, label }) => {
                const Ikon = ikoner[id];
                return (
                  <button key={id} type="button" aria-pressed={val.intressen.includes(id)} onClick={() => toggleIntresse(id)} className={styles.option}>
                    <Ikon size={18} /> {label}
                  </button>
                );
              })}
            </div>
            <p id="planner-intressen-fel" aria-live="polite" className={fel.intressen ? styles.errorShown : styles.error}>{fel.intressen}</p>
          </fieldset>

          <button type="submit" className={styles.submit}>
            Skapa min resplan →
          </button>
        </form>

        {visaPlan && plan.length > 0 && (
          <div className={styles.plan}>
            <h3 ref={planRubrik} tabIndex={-1}>
              <span className={styles.planTitleText}>Förslag: {dagarText} dagar på Mallorca <IconMap size={20} /></span>
            </h3>
            <p className={styles.summary}>
              {valdaNamn.join(' + ')}. Dagarna är ordnade efter område, så att du slipper åka fram och tillbaka över ön.
              {Number(dagarText) >= 10 && ' Med så här många dagar lönar det sig att byta boende en gång, till exempel från Palma eller västkusten till norra eller östra Mallorca.'}
            </p>
            <ol className={styles.days}>
              {plan.map((dag, i) => (
                <li key={i} className={styles.day}>
                  <div aria-hidden="true" className={styles.dayNumber}>
                    {i + 1}
                  </div>
                  <div className={styles.dayBody}>
                    <p className={styles.dayText}>
                      <span className="sr-only">Dag {i + 1}: </span>{dag.text}
                    </p>
                    {(dag.taggar.length > 0 || dag.länkar.length > 0) && (
                      <p className={styles.dayMeta}>
                        {dag.taggar.length > 0 && (
                          <span className={styles.tags}>
                            {dag.taggar.join(' · ')}
                          </span>
                        )}
                        {dag.länkar.map(l => (
                          <Link key={l.href} href={l.href} className={styles.link}>
                            {l.label}
                          </Link>
                        ))}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <p className={styles.fullPlan}>
              <Link href={resplanHref} className={styles.fullPlanLink}>
                Öppna hela resplanen
              </Link>
              <span className={styles.fullPlanNote}>Dag för dag med förmiddag, eftermiddag och kväll, karta och körtider. Där kan du byta och flytta dagar och skriva ut planen.</span>
            </p>
            <div className={styles.share}>
              <button type="button" onClick={kopieraLänk} className={`${styles.option} ${styles.copy}`}>
                Kopiera länk till planen
              </button>
              <p aria-live="polite" className={styles.shareNote}>
                {kopierad || 'Valen sparas i adressen, så du kan dela planen eller spara den som bokmärke.'}
              </p>
            </div>
            <div className={styles.tip}>
              <p className={styles.tipText}>
                <IconBulb size={16} className={styles.bulb} /> <strong>Tips:</strong> Vill du läsa på mer inför resan? I <Link href="/guider" className={styles.link}>våra guider</Link> hittar du stränder, mat, golf och Mallorca med barn. Se också vad som händer på ön under din vecka i <Link href="/evenemang" className={styles.link}>evenemangskalendern</Link>.
              </p>
            </div>
          </div>
        )}
        </div>

        {/* Höger: Stämningsbild */}
        <div className={styles.aside}>
          <Image
            src="/bilder/palma/david-vives-fz1dT3-se-o-unsplash.jpg"
            sizes="(max-width: 768px) 100vw, 45vw"
            alt="Katedralen La Seu i Palma speglas i den stilla dammen i Parc de la Mar"
            title="Foto: David Vives / Unsplash"
            width={3531}
            height={5296}
            loading="lazy"
            className={styles.asideImage}
          />
          <div className={styles.local}>
            <p className={styles.localLabel}><IconPalm size={18} /> TIPS FRÅN EN LOKAL</p>
            <p className={styles.localQuote}>
              ”Mallorca är fantastiskt hela året – men maj och september är de bästa månaderna. Färre turister, perfekt temperatur och allt är öppet.”
            </p>
            <p className={styles.localSign}>– Erik, MyMallorca</p>
          </div>
        </div>

      </div>
    </section>
  );
}
