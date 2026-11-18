import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import s from './components/section.module.css';
import HeroSlideshow from '@/components/HeroSlideshow';
import SectionSeason from './components/SectionSeason';
import SectionPlanner from './components/SectionPlanner';
import SectionEvents from './components/SectionEvents';
import Map from '@/components/Map';
import { cityMapMarkers } from '@/data/cities';
import FeatureCards from './components/FeatureCards';
import MobileFeatureCards from '@/components/MobileFeatureCards';
import { BreadcrumbSchema } from '@/app/components/SchemaOrg';

// Startsidans "Kommande evenemang" beror på dagens datum – bygg om sidan en gång per dygn.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Mallorcaguide på svenska – stränder & byar | MyMallorca',
  description: 'Din kompletta guide till Mallorca på svenska. Hitta de bästa stränderna, städerna, restaurangerna och aktiviteterna. Insidertips från Mallorca 2026.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <div className={styles.page}>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }]} />
      <h1 className="sr-only">Guide till Mallorca på svenska 2026</h1>
      <HeroSlideshow />

      <div className={styles.container}>
        <section className={styles.discover}>
          <div className={s.inner}>
            <p className={s.label}>VAD VILL DU UPPLEVA?</p>
            <h2 className={s.title}>Upptäck Mallorca</h2>
            <div className={s.divider}></div>
            {/* MOBIL: kompakta kort */}
            <div className={styles.mobileOnly}>
              <MobileFeatureCards />
            </div>
            {/* DESKTOP: feature-cards med hover */}
            <div className={styles.desktopOnly}>
              <FeatureCards />
            </div>
          </div>
        </section>

        <section className={`${s.pageSection} ${styles.clip}`}>
          <div className={styles.split}>

            {/* BILD VÄNSTER – Palmas gamla stan (Foto: Luca / Unsplash) */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1666522561774-81df403b6872?w=1280&q=80&fm=webp&auto=format"
                srcSet="https://images.unsplash.com/photo-1666522561774-81df403b6872?w=640&q=80&fm=webp&auto=format 640w, https://images.unsplash.com/photo-1666522561774-81df403b6872?w=960&q=80&fm=webp&auto=format 960w, https://images.unsplash.com/photo-1666522561774-81df403b6872?w=1280&q=80&fm=webp&auto=format 1280w, https://images.unsplash.com/photo-1666522561774-81df403b6872?w=1600&q=80&fm=webp&auto=format 1600w, https://images.unsplash.com/photo-1666522561774-81df403b6872?w=2000&q=80&fm=webp&auto=format 2000w"
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Stentrappa i Palmas gamla stan med gyllene sandstensfasader, blommor och en kyrka i fjärran"
                title="Foto: Luca / Unsplash"
                width={1280}
                height={1600}
                loading="lazy"
                decoding="async"
                className={styles.portrait}
              />
            </div>

            {/* TEXT HÖGER */}
            <div>
              <p className={s.label}>
                VARFÖR MALLORCA
              </p>
              <h2 className={s.title}>
                En ö med allt – året om
              </h2>
              <div className={styles.dividerWide} />
              <p className={`${styles.lead} ${styles.mb20}`}>
                Mallorca är mer än sol och sand. Det är klippor som faller rakt ner i turkost hav, medeltida bergsbyar dolda bland olivlundar och en matkultur som sträcker sig från enkla fiskrestauranger till Michelinstjärnor.
              </p>
              <p className={`${styles.lead} ${styles.mb36}`}>
                Öns nordvästra bergsmassiv, Serra de Tramuntana, finns på Unescos världsarvslista. Längs kusterna hittar du över 200 stränder med vatten så klart att det knappast verkar verkligt. Och mitt i allt detta – en levande lokal kultur som pågår oberoende av turistsäsongen.
              </p>
              <div className={styles.stats}>
                {[
                  { siffra: '200+', text: 'Stränder och vikar', href: '/strandar' },
                  { siffra: '22', text: 'Golfbanor', href: '/aktiviteter/golf' },
                  { siffra: '300', text: 'Soldagar per år', href: '/vader' },
                  { siffra: '70+', text: 'Vingårdar på ön', href: '/vingardar' },
                ].map((stat, i) => (
                  <Link key={i} href={stat.href} className={styles.stat}>
                    <p className={styles.statNumber}>{stat.siffra}</p>
                    <p className={styles.statText}>{stat.text}</p>
                  </Link>
                ))}
              </div>
              <Link href="/byar" className={s.btnPrimary}>
                UTFORSKA ÖN →
              </Link>
            </div>
          </div>
        </section>
        <section className={s.pageSection}>
          <div className={styles.split}>

            {/* BILD VÄNSTER */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=1280&q=80&fm=webp&auto=format"
                srcSet="https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=640&q=80&fm=webp&auto=format 640w, https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=960&q=80&fm=webp&auto=format 960w, https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=1280&q=80&fm=webp&auto=format 1280w, https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=1600&q=80&fm=webp&auto=format 1600w, https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=2000&q=80&fm=webp&auto=format 2000w"
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Solig terrassvy med utsikt över Mallorcas kust och olivlundar"
                width={1280}
                height={1600}
                loading="lazy"
                decoding="async"
                className={styles.portrait}
              />
            </div>

            {/* TEXT HÖGER */}
            <div>
              <p className={s.label}>
                UPPLEV SKILLNADEN
              </p>
              <h2 className={s.title}>
                Din guide till Mallorca – inifrån och ut
              </h2>
              <div className={s.divider} />
              <p className={`${styles.body} ${styles.mb20px}`}>
                De flesta reser till Mallorca. Vi vill hjälpa dig att uppleva den.
                Det är skillnaden mellan en semester vid hotellpoolen och en morgon
                på en okänd strand i nordväst – där vattnet är turkost och du
                är ensam om den.
              </p>
              <p className={`${styles.body} ${styles.mb32px}`}>
                MyMallorca drivs av kärlek till ön, inte av försäljning. Här
                samlar vi stränder, byar, barnaktiviteter, vingårdar och
                smultronställen som vi själva återvänder till – för dig som
                reser med familjen, som par eller har ditt andra hem på ön.
              </p>
              <Link href="/guider" className={s.btnPrimary}>
                SE VÅRA GUIDER →
              </Link>
            </div>
          </div>
        </section>
        <div><SectionSeason /></div>
        <div><SectionPlanner /></div>
        <div><SectionEvents /></div>
        <section className={s.pageSection}>
          <div className={s.wide}>
            <p className={`${s.label} ${s.center}`}>
              UTFORSKA ÖN
            </p>
            <h2 className={`${s.title} ${s.center}`}>
              Städer &amp; byar på Mallorca
            </h2>
            <p className={styles.mapIntro}>
              Klicka på en stad för att hitta insidertips, sevärdheter och lokala favoriter.
            </p>
            {/* Leaflet laddas först nära vyn; alla orter finns även som länklista under kartan (SSR). */}
            <Map
              markers={cityMapMarkers}
              height="clamp(350px, 55vh, 500px)"
              ariaLabel="Karta över städer och byar på Mallorca"
              ctaLabel="Utforska"
              listLabel={`Visa alla ${cityMapMarkers.length} städer och byar som lista`}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
