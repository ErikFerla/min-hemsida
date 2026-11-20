'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { HERO_QUALITY, isUnsplash, sizedImageSrcSet, sizedImageUrl } from '@/app/lib/image-url';
import styles from './HeroSlideshow.module.css';

type Bild = {
  /** Unsplash-bas-URL utan query-sträng, Commons-thumb-URL (1920px) eller lokal fil (/bilder/...) */
  bas: string;
  alt: string;
  rubrik: string;
  plats: string;
  lank: string;
  cta: string;
};

const bilder: Bild[] = [
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Catedral_de_Santa_Mar%C3%ADa%2C_Palma_de_Mallorca%2C_Espa%C3%B1a%2C_2022-10-06%2C_DD_16-18_HDR.jpg/1920px-Catedral_de_Santa_Mar%C3%ADa%2C_Palma_de_Mallorca%2C_Espa%C3%B1a%2C_2022-10-06%2C_DD_16-18_HDR.jpg',
    alt: 'Katedralen La Seu i Palma de Mallorca i kvällsljus, med stadsmuren framför',
    rubrik: 'Palma de Mallorca',
    plats: 'Palma · Huvudstaden',
    lank: '/palma-de-mallorca',
    cta: 'Utforska Palma',
  },
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Es_trenc_summer.jpg/1920px-Es_trenc_summer.jpg',
    alt: 'Sandstranden Es Trenc med turkost vatten en sommardag',
    rubrik: 'Kristallklara stränder',
    plats: 'Es Trenc · Södra Mallorca',
    lank: '/strandar',
    cta: 'Utforska stränderna',
  },
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Alcudia_bay_2025.jpg/1920px-Alcudia_bay_2025.jpg',
    alt: 'Alcúdiabukten i skymningen på norra Mallorca',
    rubrik: 'Mallorca med barn',
    plats: 'Alcúdiabukten · Norra Mallorca',
    lank: '/barn',
    cta: 'Se barnaktiviteterna',
  },
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pula_Golfplatz_01.jpg/1920px-Pula_Golfplatz_01.jpg',
    alt: 'Fairway och green på golfbanan Pula Golf vid Son Servera',
    rubrik: 'Golf i världsklass',
    plats: 'Pula Golf · Son Servera',
    lank: '/aktiviteter/golf',
    cta: 'Se golfbanorna',
  },
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_village_of_Valldemossa_in_Mallorca%2C_Spain_%2848001682373%29.jpg/1920px-The_village_of_Valldemossa_in_Mallorca%2C_Spain_%2848001682373%29.jpg',
    alt: 'Bergsbyn Valldemossa med kartusianklostret i Tramuntanas dal',
    rubrik: 'Valldemossa',
    plats: 'Valldemossa · Västra Mallorca',
    lank: '/valldemossa',
    cta: 'Utforska Valldemossa',
  },
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Blick_in_die_Bucht_von_Port_de_S%C3%B3ller_bei_Sonnenuntergang.jpg/1920px-Blick_in_die_Bucht_von_Port_de_S%C3%B3ller_bei_Sonnenuntergang.jpg',
    alt: 'Viken i Port de Sóller i solnedgången, omgiven av Tramuntanabergen',
    rubrik: 'Port de Sóller',
    plats: 'Port de Sóller · Nordväst',
    lank: '/port-de-soller',
    cta: 'Utforska Port de Sóller',
  },
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Ensa%C3%AFmada.jpg/1920px-Ensa%C3%AFmada.jpg',
    alt: 'En ensaïmada – Mallorcas spiralformade bakelse pudrad med florsocker',
    rubrik: 'Mat & vin på Mallorca',
    plats: 'Hela ön · Kulinariska upplevelser',
    lank: '/mat',
    cta: 'Se mat & vin',
  },
];

const INTERVALL_MS = 6000;
const SRCSET_BREDDER = [640, 960, 1280, 1600, 2000];

function bildUrl(bas: string, bredd: number) {
  if (!isUnsplash(bas)) return sizedImageUrl(bas, bredd, HERO_QUALITY);
  return `${bas}?w=${bredd}&q=75&fm=webp&auto=format&fit=crop`;
}

function bildSrcSet(bas: string) {
  if (!isUnsplash(bas)) return sizedImageSrcSet(bas, HERO_QUALITY);
  return SRCSET_BREDDER.map((w) => `${bildUrl(bas, w)} ${w}w`).join(', ');
}

/* prefers-reduced-motion via useSyncExternalStore (ingen setState i effekt) */
const RM_QUERY = '(prefers-reduced-motion: reduce)';
function prenumereraRM(cb: () => void) {
  const mql = window.matchMedia(RM_QUERY);
  mql.addEventListener('change', cb);
  return () => mql.removeEventListener('change', cb);
}
const rmKlient = () => window.matchMedia(RM_QUERY).matches;
// På servern antar vi reducerad rörelse så att inget autospel startar före hydrering.
const rmServer = () => true;

/** Fast text över bildspelet: sajtens h1, ingress och genvägar per målgrupp (app/page.tsx). */
type Props = {
  rubrik: string;
  ingress: string;
  genvagar: ReadonlyArray<{ label: string; href: string }>;
};

export default function HeroSlideshow({ rubrik, ingress, genvagar }: Props) {
  const [aktiv, setAktiv] = useState(0);
  // Bilder som har visats (eller förladdats) behålls monterade för en mjuk övertoning.
  // Från början bara bild 1 (LCP-bilden) – bild 2 monteras först efter sidans load-händelse
  // (se effekten nedan) så att den inte konkurrerar med LCP-bilden om bandbredden. Är bildspelet
  // pausat (t.ex. vid reducerad rörelse) laddas bild 2 först när användaren startar bildspelet
  // eller väljer en bild.
  const [laddade, setLaddade] = useState<number[]>([0]);
  // null = användaren har inte valt; annars användarens eget val.
  const [anvandarPaus, setAnvandarPaus] = useState<boolean | null>(null);

  const reduceraRorelse = useSyncExternalStore(prenumereraRM, rmKlient, rmServer);
  const pausad = anvandarPaus ?? reduceraRorelse;
  const spelar = !pausad;

  const visa = useCallback((index: number) => {
    const nasta = (index + 1) % bilder.length;
    setAktiv(index);
    setLaddade((prev) => {
      const ny = new Set(prev);
      ny.add(index);
      ny.add(nasta);
      return ny.size === prev.length ? prev : Array.from(ny);
    });
  }, []);

  // Förladda nästa bild när sidan har laddat klart (och webbläsaren har en ledig stund),
  // i god tid före första bytet efter INTERVALL_MS – men bara när bildspelet spelar.
  useEffect(() => {
    if (!spelar) return;
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const forladda = () => {
      const lagg = () => setLaddade((prev) => (prev.includes(1) ? prev : [...prev, 1]));
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(lagg, { timeout: 2000 });
      else timer = setTimeout(lagg, 200);
    };
    if (document.readyState === 'complete') forladda();
    else window.addEventListener('load', forladda, { once: true });
    return () => {
      window.removeEventListener('load', forladda);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [spelar]);

  useEffect(() => {
    if (!spelar) return;
    const timer = setTimeout(() => visa((aktiv + 1) % bilder.length), INTERVALL_MS);
    return () => clearTimeout(timer);
  }, [spelar, aktiv, visa]);

  const bild = bilder[aktiv];

  return (
    <div className={styles.hero}>
      {/* Text: fast rubrik och genvägar över bildspelet. Bara bildtextens länk leder till
          aktuell bilds sida – rubrik, ingress och ytan mellan chipsen är inte klickbara. */}
      <div className={styles.text}>
        <div className={styles.textInner}>
          {/* Sidans enda h1 – texten kommer från app/page.tsx */}
          <h1 className={styles.title}>{rubrik}</h1>
          <p className={styles.sub}>{ingress}</p>

          <nav aria-label="Genvägar" className={styles.shortcuts}>
            <ul className={styles.shortcutList}>
              {genvagar.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className={styles.shortcut}>{g.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bildtext för aktuell bild: plats + länk */}
          <p
            aria-live={spelar ? 'off' : 'polite'}
            aria-atomic="true"
            className={styles.caption}
          >
            <span className={styles.place}>{bild.plats}</span>
            <Link href={bild.lank} className={styles.captionLink}>
              {bild.cta} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </div>

      {/* Karusellregionen innehåller bara bilderna och kontrollerna. Sidans h1, ingress och
          genvägar ligger utanför (.text ovan) – de hör till sidan, inte till bildspelet. */}
      <section
        aria-roledescription="karusell"
        aria-label="Utvalda platser och upplevelser på Mallorca"
        className={styles.carousel}
      >
        {/* Bilder: bara aktiv + nästa (och redan visade) renderas */}
        {bilder.map((b, i) => {
          if (!laddade.includes(i)) return null;
          const arAktiv = i === aktiv;
          return (
            <img
              key={b.bas}
              src={bildUrl(b.bas, 1600)}
              srcSet={bildSrcSet(b.bas)}
              sizes="100vw"
              alt={arAktiv ? b.alt : ''}
              aria-hidden={arAktiv ? undefined : true}
              width={2000}
              height={1333}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding="async"
              className={arAktiv ? `${styles.slide} ${styles.slideActive}` : styles.slide}
            />
          );
        })}

        {/* Gradient overlay */}
        <div aria-hidden="true" className={styles.overlay} />

        {/* Kontroller: paus + bildväljare (klickytor ≥24 px) */}
        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => setAnvandarPaus(!pausad)}
            aria-label={pausad ? 'Starta bildspelet' : 'Pausa bildspelet'}
            className={styles.pause}
          >
            {pausad ? (
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
            )}
          </button>

          {bilder.map((b, i) => (
            <button
              key={b.bas}
              type="button"
              onClick={() => visa(i)}
              aria-label={`Visa bild ${i + 1} av ${bilder.length}: ${b.rubrik}`}
              aria-current={i === aktiv ? 'true' : undefined}
              className={styles.dotBtn}
            >
              <span aria-hidden="true" className={i === aktiv ? `${styles.dot} ${styles.dotActive}` : styles.dot} />
            </button>
          ))}
        </div>

        {/* Räknare */}
        <div aria-hidden="true" className={styles.counter}>
          {String(aktiv + 1).padStart(2, '0')} / {String(bilder.length).padStart(2, '0')}
        </div>
      </section>
    </div>
  );
}
