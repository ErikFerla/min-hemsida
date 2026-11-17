'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

type Bild = {
  /** Unsplash-bas-URL utan query-sträng */
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
    bas: 'https://images.unsplash.com/photo-1566993850067-bb8df9c9807e',
    alt: 'Katedralen La Seu i Palma de Mallorca sedd över hamnen',
    rubrik: 'Palma de Mallorca',
    undertext: 'Gotisk katedral, kulinarisk scen och levande gamla stan',
    plats: 'Palma · Huvudstaden',
    lank: '/palma-de-mallorca',
    cta: 'UTFORSKA PALMA',
  },
  {
    bas: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    alt: 'Turkost vatten och vit sandstrand en solig dag',
    rubrik: 'Kristallklara stränder',
    undertext: 'Från dolda klippvikar till långa, grunda sandstränder för hela familjen',
    plats: 'Es Trenc · Södra Mallorca',
    lank: '/strandar',
    cta: 'UTFORSKA STRÄNDERNA',
  },
  {
    bas: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834',
    alt: 'Barnfamilj som badar vid en vattenpark',
    rubrik: 'Mallorca med barn',
    undertext: 'Grunda stränder, grottor, djurparker och vattenparker – tips för hela familjen',
    plats: 'Hela ön · För barnfamiljer',
    lank: '/barn',
    cta: 'SE BARNAKTIVITETERNA',
  },
  {
    bas: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa',
    alt: 'Golfbana med gröna fairways under blå himmel',
    rubrik: 'Golf i världsklass',
    undertext: '22 banor i fantastiska miljöer – från bergspanorama till havsutsikt',
    plats: 'Son Gual Golf · Palma',
    lank: '/aktiviteter/golf',
    cta: 'SE GOLFBANORNA',
  },
  {
    bas: 'https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec',
    alt: 'Stenhus och smala gränder i bergsbyn Valldemossa',
    rubrik: 'Valldemossa',
    undertext: 'Charmiga gränder, klosterhistoria och UNESCO-skyddad bergsnatur',
    plats: 'Valldemossa · Västra Mallorca',
    lank: '/valldemossa',
    cta: 'UTFORSKA VALLDEMOSSA',
  },
  {
    bas: 'https://images.unsplash.com/photo-1566815687825-39bd872e6e09',
    alt: 'Hamnen i Port de Sóller omgiven av Tramuntanabergen',
    rubrik: 'Port de Sóller',
    undertext: 'Pittoresk hamn omgiven av Tramuntana-bergen – nås med historisk spårvagn',
    plats: 'Port de Sóller · Nordväst',
    lank: '/port-de-soller',
    cta: 'UTFORSKA PORT DE SÓLLER',
  },
  {
    bas: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    alt: 'Dukat restaurangbord med mat och vinglas',
    rubrik: 'Mat & vin på Mallorca',
    undertext: 'Lokala vingårdar, färsk fisk direkt från havet och kvällar på terrassen',
    plats: 'Hela ön · Kulinariska upplevelser',
    lank: '/mat',
    cta: 'SE MAT & VIN',
  },
];

const INTERVALL_MS = 6000;
const SRCSET_BREDDER = [640, 960, 1280, 1600, 2000];

function bildUrl(bas: string, bredd: number) {
  return `${bas}?w=${bredd}&q=75&fm=webp&auto=format&fit=crop`;
}

function bildSrcSet(bas: string) {
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
  const overgang = reduceraRorelse ? 'none' : 'opacity 1.2s ease-in-out';

  return (
    <section
      aria-roledescription="karusell"
      aria-label="Utvalda platser och upplevelser på Mallorca"
      style={{ position: 'relative', width: '100%', height: 'clamp(500px, 85vh, 900px)', overflow: 'hidden', background: '#0b1f2a' }}
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
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              opacity: arAktiv ? 1 : 0,
              transition: overgang,
            }}
          />
        );
      })}

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.1) 100%)',
        }}
      />

      {/* Klickbar yta för mus – dold för tangentbord och skärmläsare (CTA-länken nedan är den riktiga länken) */}
      <Link
        href={bild.lank}
        prefetch={false}
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      />

      {/* Text */}
      <div
        aria-live={spelar ? 'off' : 'polite'}
        aria-atomic="true"
        style={{
          position: 'absolute', bottom: '18%', left: '8%', right: '8%',
          color: 'white', zIndex: 2, maxWidth: '640px',
          pointerEvents: 'none',
        }}
      >
        <p style={{
          fontSize: '0.72rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          marginBottom: '14px',
          color: 'rgba(255,255,255,0.9)',
          fontWeight: 600,
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        }}>
          {bild.plats}
        </p>

        {/* Sidans enda h1 finns i app/page.tsx – bildrubriken är därför en p */}
        <p style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(2.8rem, 5vw, 5rem)',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          lineHeight: 1.05,
          margin: 0,
          textShadow: '0 2px 12px rgba(0,0,0,0.5)',
        }}>
          {bild.rubrik}
        </p>

        <p style={{
          fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
          marginTop: '16px',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.92)',
          textShadow: '0 1px 6px rgba(0,0,0,0.6)',
          fontWeight: 400,
        }}>
          {bild.undertext}
        </p>

        <Link
          href={bild.lank}
          style={{
            display: 'inline-block',
            marginTop: '28px',
            padding: '13px 30px',
            background: 'white',
            color: '#383a46',
            borderRadius: '3px',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textDecoration: 'none',
            pointerEvents: 'auto',
            transition: 'background 0.2s, color 0.2s',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#993335';
            e.currentTarget.style.color = '#fefefb';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#383a46';
          }}
        >
          {bild.cta} <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Kontroller: paus + bildväljare (klickytor ≥24 px) */}
      <div style={{
        position: 'absolute', bottom: '16px', left: 'calc(8% - 8px)',
        display: 'flex', alignItems: 'center', gap: '2px', zIndex: 2,
      }}>
        <button
          type="button"
          onClick={() => setAnvandarPaus(!pausad)}
          aria-label={pausad ? 'Starta bildspelet' : 'Pausa bildspelet'}
          style={{
            width: '36px', height: '36px',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.6)',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            padding: 0,
            marginRight: '8px',
          }}
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
            style={{
              minWidth: '24px',
              height: '32px',
              padding: '0 4px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: i === aktiv ? '36px' : '12px',
                height: '4px',
                borderRadius: '2px',
                background: i === aktiv ? 'white' : 'rgba(255,255,255,0.55)',
                transition: reduceraRorelse ? 'none' : 'all 0.35s ease',
              }}
            />
          </button>
        ))}
      </div>

      {/* Räknare */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '24px', right: '5%',
          color: 'rgba(255,255,255,0.9)', fontSize: '0.75rem',
          letterSpacing: '0.15em', zIndex: 2,
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 1px 4px rgba(0,0,0,0.7)',
        }}
      >
        {String(aktiv + 1).padStart(2, '0')} / {String(bilder.length).padStart(2, '0')}
      </div>
    </section>
  );
}
