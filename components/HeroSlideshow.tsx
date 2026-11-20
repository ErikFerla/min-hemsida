'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react';
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
  /**
   * Kort, tyst film som spelas i loop ovanpå bilden (HeroFilm nedan). `bas` är då filmens poster:
   * sidans LCP-bild, och det enda som visas vid reducerad rörelse, Save-Data och långsam
   * anslutning. null/utelämnad = bara bilden.
   */
  video?: HeroVideo | null;
};

type HeroVideo = {
  /** VP9 (valfri) – listas först, så att webbläsare som klarar den väljer den. */
  webm?: string;
  /** H.264 – fungerar överallt. */
  mp4: string;
  /** Klippets första bildruta (JPEG, 1280 px) – samma fil som bildens `bas`. */
  poster: string;
};

/**
 * Startsidans film: Pexels "Aerial View of Mallorca's Stunning Beach" (id 31819589, Oskar Gross,
 * Pexels License, kreditpost i data/credits/d1.ts). Filerna skapas med
 * scripts/encode-hero-video.sh – se README, "Startsidans film".
 *
 * Med film blir den här bilden första bild i bildspelet och ersätter strandbilden (samma länk).
 * Sätt `video: null` för att stänga av filmen: då är bildspelet som före filmen (Palma först,
 * Es Trenc som strandbild) och den här posten används inte – ta då också bort kreditposten.
 */
const filmBild: Bild = {
  bas: '/video/hero-strand-poster.jpg',
  alt: 'Flygbild över en lång sandstrand med turkost vatten och tallskog på Mallorca',
  rubrik: 'Stränder och vikar',
  plats: 'Mallorcas kust · Från ovan',
  lank: '/strandar',
  cta: 'Utforska stränderna',
  video: {
    webm: '/video/hero-strand.webm',
    mp4: '/video/hero-strand.mp4',
    poster: '/video/hero-strand-poster.jpg',
  },
};

const fotoBilder: Bild[] = [
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
    rubrik: 'Stränder och vikar',
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
    rubrik: 'Golf året runt',
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

const bilder: Bild[] = filmBild.video
  ? [filmBild, ...fotoBilder.filter((b) => b.lank !== filmBild.lank)]
  : fotoBilder;

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

/*
 * Snål dataanvändning: Save-Data, (prefers-reduced-data: reduce) eller långsam anslutning
 * (slow-2g/2g/3g enligt Network Information API). Då visas bara filmens poster. Webbläsare utan
 * API:t (Safari, Firefox) räknas som snabba.
 */
type Natinfo = EventTarget & { saveData?: boolean; effectiveType?: string };
const LANGSAMMA = new Set(['slow-2g', '2g', '3g']);
const RD_QUERY = '(prefers-reduced-data: reduce)';
function natinfo(): Natinfo | undefined {
  return (navigator as Navigator & { connection?: Natinfo }).connection;
}
function prenumereraNat(cb: () => void) {
  const c = natinfo();
  c?.addEventListener('change', cb);
  return () => c?.removeEventListener('change', cb);
}
const snalKlient = () => {
  const c = natinfo();
  return c?.saveData === true || LANGSAMMA.has(c?.effectiveType ?? '') || window.matchMedia(RD_QUERY).matches;
};
const snalServer = () => true;

/* Fliken dold (Page Visibility API) */
function prenumereraSynlighet(cb: () => void) {
  document.addEventListener('visibilitychange', cb);
  return () => document.removeEventListener('visibilitychange', cb);
}
const doldKlient = () => document.hidden;
const doldServer = () => true;

/** Kör `cb` när sidan har laddat klart och webbläsaren har en ledig stund. Returnerar avbryt. */
function efterLoad(cb: () => void): () => void {
  let idle: number | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const nar = () => {
    if ('requestIdleCallback' in window) idle = window.requestIdleCallback(cb, { timeout: 2000 });
    else timer = setTimeout(cb, 200);
  };
  if (document.readyState === 'complete') nar();
  else window.addEventListener('load', nar, { once: true });
  return () => {
    window.removeEventListener('load', nar);
    if (idle !== undefined) window.cancelIdleCallback(idle);
    if (timer !== undefined) clearTimeout(timer);
  };
}

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
    return efterLoad(() => setLaddade((prev) => (prev.includes(1) ? prev : [...prev, 1])));
  }, [spelar]);

  // Filmen (första bilden) monteras först efter load + idle, och bara om rörelse och dataläge
  // tillåter det och bildspelet spelar. Postern (första <img>) är och förblir LCP-elementet.
  const film = bilder[0].video ?? null;
  const snalData = useSyncExternalStore(prenumereraNat, snalKlient, snalServer);
  const flikDold = useSyncExternalStore(prenumereraSynlighet, doldKlient, doldServer);
  const filmTillaten = film !== null && !reduceraRorelse && !snalData;
  const [filmMonterad, setFilmMonterad] = useState(false);
  // Hur länge filmen har kvar (ms) när den började spela; null = spelar inte.
  const [filmKvarMs, setFilmKvarMs] = useState<number | null>(null);

  useEffect(() => {
    if (!filmTillaten || !spelar || filmMonterad) return;
    return efterLoad(() => setFilmMonterad(true));
  }, [filmTillaten, spelar, filmMonterad]);

  // Första bilden står kvar tills filmen har gått ett helt varv (minst INTERVALL_MS) – ett byte
  // mitt i drönarens rörelse ser avhugget ut. Spelar filmen inte (laddas, pausad, bara poster)
  // gäller INTERVALL_MS som för de andra bilderna.
  const fordrojning = aktiv === 0 && filmKvarMs !== null ? Math.max(INTERVALL_MS, filmKvarMs) : INTERVALL_MS;
  useEffect(() => {
    if (!spelar) return;
    const timer = setTimeout(() => visa((aktiv + 1) % bilder.length), fordrojning);
    return () => clearTimeout(timer);
  }, [spelar, aktiv, visa, fordrojning]);

  const bild = bilder[aktiv];
  const forstaBildRef = useRef<HTMLImageElement>(null);

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
              ref={i === 0 ? forstaBildRef : undefined}
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

        {film && filmTillaten && filmMonterad && (
          <HeroFilm
            video={film}
            spela={spelar && aktiv === 0 && !flikDold}
            visas={aktiv === 0}
            posterRef={forstaBildRef}
            onKvar={setFilmKvarMs}
          />
        )}

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

type FilmProps = {
  video: HeroVideo;
  /** Bildspelet spelar, första bilden är aktiv och fliken syns. */
  spela: boolean;
  /** Första bilden är aktiv (annars tonas filmen ut tillsammans med bilden). */
  visas: boolean;
  /** Postern som redan visas – dess currentSrc (redan nedladdad) blir videons poster. */
  posterRef: RefObject<HTMLImageElement | null>;
  onKvar: (ms: number | null) => void;
};

/**
 * Dekorativ, ljudlös loop ovanpå postern (aria-hidden – bildens alt och bildtexten beskriver
 * sliden). Videon är genomskinlig tills den faktiskt spelar, så postern syns medan filen laddas
 * och om uppspelningen nekas. Pausas när bildspelet pausas, när heron inte syns
 * (IntersectionObserver), när fliken är dold och när en annan bild är aktiv; spolas till början
 * när första bilden visas igen.
 */
function HeroFilm({ video, spela, visas, posterRef, onKvar }: FilmProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [iVy, setIVy] = useState(true);
  const [harSpelat, setHarSpelat] = useState(false);
  const spolaOm = useRef(false);

  // Samma URL som bilden under (ur srcset, redan i cachen) – ingen extra hämtning för postern.
  useEffect(() => {
    ref.current?.setAttribute('poster', posterRef.current?.currentSrc || video.poster);
  }, [posterRef, video.poster]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setIVy(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visas) spolaOm.current = true;
  }, [visas]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (spela && iVy) {
      if (spolaOm.current) {
        el.currentTime = 0;
        spolaOm.current = false;
      }
      el.muted = true;
      el.play().catch(() => {
        // Uppspelningen nekades (t.ex. energisparläge) – postern ligger kvar.
      });
    } else {
      el.pause();
    }
  }, [spela, iVy]);

  const narSpelar = () => {
    const el = ref.current;
    if (!el) return;
    setHarSpelat(true);
    onKvar(Number.isFinite(el.duration) ? (el.duration - el.currentTime) * 1000 : null);
  };

  return (
    <video
      ref={ref}
      muted
      playsInline
      loop
      autoPlay
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      width={1280}
      height={720}
      data-hero-film=""
      onPlaying={narSpelar}
      onPause={() => onKvar(null)}
      className={visas && harSpelat ? `${styles.slide} ${styles.slideActive}` : styles.slide}
    >
      {video.webm && <source src={video.webm} type="video/webm" />}
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
}
