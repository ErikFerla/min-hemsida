'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { isUnsplash, sizedImageSrcSet, sizedImageUrl } from '@/app/lib/image-url';
import styles from './HeroSlideshow.module.css';

type Bild = {
  /** Unsplash-bas-URL utan query-sträng, Commons-thumb-URL (1920px) eller lokal fil (/bilder/...) */
  bas: string;
  alt: string;
  rubrik: string;
  undertext: string;
  plats: string;
  lank: string;
  cta: string;
};

const bilder: Bild[] = [
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Catedral_de_Santa_Mar%C3%ADa%2C_Palma_de_Mallorca%2C_Espa%C3%B1a%2C_2022-10-06%2C_DD_16-18_HDR.jpg/1920px-Catedral_de_Santa_Mar%C3%ADa%2C_Palma_de_Mallorca%2C_Espa%C3%B1a%2C_2022-10-06%2C_DD_16-18_HDR.jpg',
    alt: 'Katedralen La Seu i Palma de Mallorca i kvällsljus, med stadsmuren framför',
    rubrik: 'Palma de Mallorca',
    undertext: 'Gotisk katedral, kulinarisk scen och levande gamla stan',
    plats: 'Palma · Huvudstaden',
    lank: '/palma-de-mallorca',
    cta: 'Utforska Palma',
  },
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Es_trenc_summer.jpg/1920px-Es_trenc_summer.jpg',
    alt: 'Sandstranden Es Trenc med turkost vatten en sommardag',
    rubrik: 'Kristallklara stränder',
    undertext: 'Från dolda klippvikar till långa, grunda sandstränder för hela familjen',
    plats: 'Es Trenc · Södra Mallorca',
    lank: '/strandar',
    cta: 'Utforska stränderna',
  },
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Alcudia_bay_2025.jpg/1920px-Alcudia_bay_2025.jpg',
    alt: 'Alcúdiabukten i skymningen på norra Mallorca',
    rubrik: 'Mallorca med barn',
    undertext: 'Grunda stränder, grottor, djurparker och vattenparker – tips för hela familjen',
    plats: 'Alcúdiabukten · Norra Mallorca',
    lank: '/barn',
    cta: 'Se barnaktiviteterna',
  },
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pula_Golfplatz_01.jpg/1920px-Pula_Golfplatz_01.jpg',
    alt: 'Fairway och green på golfbanan Pula Golf vid Son Servera',
    rubrik: 'Golf i världsklass',
    undertext: 'Drygt 20 banor i fantastiska miljöer – från bergspanorama till havsutsikt',
    plats: 'Pula Golf · Son Servera',
    lank: '/aktiviteter/golf',
    cta: 'Se golfbanorna',
  },
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_village_of_Valldemossa_in_Mallorca%2C_Spain_%2848001682373%29.jpg/1920px-The_village_of_Valldemossa_in_Mallorca%2C_Spain_%2848001682373%29.jpg',
    alt: 'Bergsbyn Valldemossa med kartusianklostret i Tramuntanas dal',
    rubrik: 'Valldemossa',
    undertext: 'Charmiga gränder, klosterhistoria och bergsnatur på Unescos världsarvslista',
    plats: 'Valldemossa · Västra Mallorca',
    lank: '/valldemossa',
    cta: 'Utforska Valldemossa',
  },
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Blick_in_die_Bucht_von_Port_de_S%C3%B3ller_bei_Sonnenuntergang.jpg/1920px-Blick_in_die_Bucht_von_Port_de_S%C3%B3ller_bei_Sonnenuntergang.jpg',
    alt: 'Viken i Port de Sóller i solnedgången, omgiven av Tramuntanabergen',
    rubrik: 'Port de Sóller',
    undertext: 'Pittoresk hamn omgiven av Tramuntanabergen – dit går en historisk spårvagn',
    plats: 'Port de Sóller · Nordväst',
    lank: '/port-de-soller',
    cta: 'Utforska Port de Sóller',
  },
  {
    bas: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Ensa%C3%AFmada.jpg/1920px-Ensa%C3%AFmada.jpg',
    alt: 'En ensaïmada – Mallorcas spiralformade bakelse pudrad med florsocker',
    rubrik: 'Mat & vin på Mallorca',
    undertext: 'Lokala vingårdar, färsk fisk direkt från havet och kvällar på terrassen',
    plats: 'Hela ön · Kulinariska upplevelser',
    lank: '/mat',
    cta: 'Se mat & vin',
  },
];

const INTERVALL_MS = 6000;
const SRCSET_BREDDER = [640, 960, 1280, 1600, 2000];

function bildUrl(bas: string, bredd: number) {
  if (!isUnsplash(bas)) return sizedImageUrl(bas, bredd);
  return `${bas}?w=${bredd}&q=75&fm=webp&auto=format&fit=crop`;
}

function bildSrcSet(bas: string) {
  if (!isUnsplash(bas)) return sizedImageSrcSet(bas);
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

export default function HeroSlideshow() {
  const [aktiv, setAktiv] = useState(0);
  // Bilder som har visats (eller förladdats) behålls monterade för en mjuk övertoning.
  const [laddade, setLaddade] = useState<number[]>([0, 1]);
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

  useEffect(() => {
    if (!spelar) return;
    const timer = setTimeout(() => visa((aktiv + 1) % bilder.length), INTERVALL_MS);
    return () => clearTimeout(timer);
  }, [spelar, aktiv, visa]);

  const bild = bilder[aktiv];

  return (
    <section
      aria-roledescription="karusell"
      aria-label="Utvalda platser och upplevelser på Mallorca"
      className={styles.hero}
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

      {/* Klickbar yta för mus – dold för tangentbord och skärmläsare (CTA-länken nedan är den riktiga länken) */}
      <Link
        href={bild.lank}
        prefetch={false}
        tabIndex={-1}
        aria-hidden="true"
        className={styles.clickArea}
      />

      {/* Text */}
      <div
        aria-live={spelar ? 'off' : 'polite'}
        aria-atomic="true"
        className={styles.text}
      >
        <div className={styles.textInner}>
          <p className={styles.place}>{bild.plats}</p>

          {/* Sidans enda h1 finns i app/page.tsx – bildrubriken är därför en p */}
          <p className={styles.title}>{bild.rubrik}</p>

          <p className={styles.sub}>{bild.undertext}</p>

          <Link href={bild.lank} className={`btn btn-primary ${styles.cta}`}>
            {bild.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

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
  );
}
