import type { Metadata } from 'next';
import Image from 'next/image';
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
import { BreadcrumbSchema } from '@/app/components/SchemaOrg';
import { DEFAULT_OG_IMAGE } from '@/app/lib/city-seo';
import { förslag } from '@/app/lib/planner';
import TipBox from '@/components/TipBox';

// Startsidans "Kommande evenemang" beror på dagens datum – bygg om sidan en gång per dygn.
export const revalidate = 86400;

const HOME_TITLE = 'Mallorcaguide på svenska – stränder & byar';
const HOME_DESCRIPTION =
  'Din kompletta guide till Mallorca på svenska. Hitta de bästa stränderna, städerna, restaurangerna och aktiviteterna. Insidertips från någon som känner ön.';

// title.template gäller bara undersegment, så startsidan anger hela titeln själv.
export const metadata: Metadata = {
  title: { absolute: `${HOME_TITLE} | MyMallorca` },
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'MyMallorca',
    locale: 'sv_SE',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

// "Grytes favoritstrand" – stranden och länkarna kommer från resplaneraren (app/lib/planner.ts),
// men texten är skriven för startsidan så att den inte läses som en dag i en resplan.
const favoritstrand = förslag['calo-des-moro'];

// Heron: sajtens h1 och genvägar för de tre målgrupperna (barnfamiljer, par, de som bor på ön).
const HERO_RUBRIK = 'Mallorca på svenska';
const HERO_INGRESS =
  'Stränder, byar, mat och utflykter med våra egna tips – för dig som reser med barn, som par eller bor på ön.';
const HERO_GENVAGAR = [
  { label: 'Med barn', href: '/barn' },
  { label: 'Som par', href: '/mallorca-for-par' },
  { label: 'Bor på ön', href: '/mallorca-pa-vintern#bor-pa-on' },
  { label: 'Planera resan', href: '/resplan' },
] as const;

export default function Home() {
  return (
    <div className={styles.page}>
      <BreadcrumbSchema items={[{ name: 'Hem', url: '/' }]} />
      <HeroSlideshow rubrik={HERO_RUBRIK} ingress={HERO_INGRESS} genvagar={HERO_GENVAGAR} />

      <div className={styles.container}>
        <section className={styles.discover}>
          <div className={s.inner}>
            <p className={s.label}>Vad vill du uppleva?</p>
            <h2 className={s.title}>Upptäck Mallorca</h2>
            {/* Samma genvägskort på mobil och dator (5.3) */}
            <FeatureCards />
          </div>
        </section>

        {/* Om MyMallorca: bild + text + Eriks tips */}
        <section className={`${s.pageSection} ${styles.flushBottom}`} aria-labelledby="om-rubrik">
          <div className={styles.split}>
            {/* BILD VÄNSTER – gata i Palmas centrum (Foto: Felix / Unsplash) */}
            <div>
              <Image
                src="/bilder/palma/felix-4pqjneOJa9k-unsplash.jpg"
                sizes="(max-width: 1023px) 100vw, 50vw"
                alt="Smal gata i Palmas centrum med balkonger, kaféer och ett utsmyckat modernistiskt hus med torn"
                title="Foto: Felix / Unsplash"
                width={4160}
                height={6240}
                loading="lazy"
                className={styles.portrait}
              />
            </div>

            <div className={styles.text}>
              <p className={s.label}>Om MyMallorca</p>
              <h2 id="om-rubrik" className={s.title}>
                Mallorca bortom hotellpoolen
              </h2>
              <p className={styles.body}>
                En semester på Mallorca kan vara poolen och stranden nedanför
                hotellet. Den kan också vara en tidig morgon i en klippvik, en
                marknadsdag i en by i inlandet eller en söndagslunch på en
                källarkrog. Det är den andra sortens resa vi skriver om.
              </p>
              <p className={styles.body}>
                MyMallorca drivs av kärlek till ön, inte av försäljning. Här
                samlar vi stränder, byar, barnaktiviteter, vingårdar och
                smultronställen som vi själva återvänder till – för dig som
                reser med familjen, som par eller har ditt andra hem på ön.
              </p>
              <TipBox signature="Erik" className={styles.quoteBox}>
                <p className={styles.quoteLabel}>Bästa månaderna</p>
                <p className={styles.quote}>
                  ”Mallorca är fantastiskt hela året – men maj och september är de bästa månaderna. Färre turister, perfekt temperatur och allt är öppet.”
                </p>
              </TipBox>
              <div>
                <Link href="/guider" className="btn btn-primary">
                  Se våra guider →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Grytes favoritstrand */}
        <section className={`${s.pageSection} ${styles.flushBottom}`} aria-labelledby="favoritstrand-rubrik">
          <div className={styles.favorite}>
            <div className={styles.favoriteImage}>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/View_of_the_bay_at_Calo_des_Moro%2C_Mallorca_%28Spain%29_%2823899506181%29.jpg/1920px-View_of_the_bay_at_Calo_des_Moro%2C_Mallorca_%28Spain%29_%2823899506181%29.jpg"
                sizes="(max-width: 1023px) 100vw, 45vw"
                alt="Caló des Moro – turkost vatten mellan kalkstensklippor och tallskog"
                title="Foto: Tommie Hansen / Wikimedia Commons (CC BY 2.0)"
                fill
                loading="lazy"
                className={styles.favoriteImg}
              />
            </div>
            <div className={styles.favoriteText}>
              <svg className={styles.wave} width="48" height="12" viewBox="0 0 48 12" aria-hidden="true" focusable="false">
                <path d="M1 7 Q7 1 13 7 T25 7 T37 7 T47 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <h2 id="favoritstrand-rubrik" className={styles.favoriteTitle}>Grytes favoritstrand</h2>
              <p className={styles.favoriteLead}>{favoritstrand.titel}</p>
              <p className={styles.favoriteBody}>
                Caló des Moro tidigt på morgonen, innan viken blir full – på sommaren helst före kl. 9. Sista biten går
                du till fots. Cala Llombards strax intill har sand, en kiosk och mer plats för en lång badeftermiddag.
              </p>
              <p className={styles.favoriteSign}>– Erik Gryte</p>
              <p className={styles.favoriteLinks}>
                {favoritstrand.länkar.map(l => (
                  <Link key={l.href} href={l.href} className="link-arrow">
                    {l.label} →
                  </Link>
                ))}
              </p>
            </div>
          </div>
        </section>

        {/* Varför Mallorca: text + siffror, bild till höger */}
        <section className={s.pageSection} aria-labelledby="varfor-rubrik">
          <div className={`${styles.split} ${styles.splitReverse}`}>
            {/* BILD – Palmas gamla stan (Foto: Luca / Unsplash) */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1666522561774-81df403b6872?w=1280&q=80&fm=webp&auto=format"
                srcSet="https://images.unsplash.com/photo-1666522561774-81df403b6872?w=640&q=80&fm=webp&auto=format 640w, https://images.unsplash.com/photo-1666522561774-81df403b6872?w=960&q=80&fm=webp&auto=format 960w, https://images.unsplash.com/photo-1666522561774-81df403b6872?w=1280&q=80&fm=webp&auto=format 1280w, https://images.unsplash.com/photo-1666522561774-81df403b6872?w=1600&q=80&fm=webp&auto=format 1600w, https://images.unsplash.com/photo-1666522561774-81df403b6872?w=2000&q=80&fm=webp&auto=format 2000w"
                sizes="(max-width: 1023px) 100vw, 50vw"
                alt="Stentrappa i Palmas gamla stan med gyllene sandstensfasader, blommor och en kyrka i fjärran"
                title="Foto: Luca / Unsplash"
                width={1280}
                height={1600}
                loading="lazy"
                decoding="async"
                className={styles.portrait}
              />
            </div>

            <div className={styles.text}>
              <p className={s.label}>Varför Mallorca</p>
              <h2 id="varfor-rubrik" className={s.title}>
                En ö med allt – året om
              </h2>
              <p className={styles.lead}>
                Mallorca är mer än sol och sand. Det är klippor som faller rakt ner i turkost hav, medeltida bergsbyar dolda bland olivlundar och en matkultur som sträcker sig från enkla fiskrestauranger till Michelinstjärnor.
              </p>
              <p className={styles.lead}>
                Öns nordvästra bergsmassiv, Serra de Tramuntana, finns på Unescos världsarvslista. Längs kusterna hittar du över 200 stränder med vatten så klart att det knappast verkar verkligt. Och mitt i allt detta – en levande mallorkinsk kultur som pågår oberoende av turistsäsongen.
              </p>
              <div className={styles.stats}>
                {[
                  { siffra: '200+', text: 'Stränder och vikar', href: '/strandar' },
                  { siffra: '20+', text: 'Golfbanor', href: '/aktiviteter/golf' },
                  { siffra: '2 750', text: 'Soltimmar per år', href: '/vader' },
                  { siffra: '70+', text: 'Vingårdar på ön', href: '/vingardar' },
                ].map((stat, i) => (
                  <Link key={i} href={stat.href} className={styles.stat}>
                    <span className={styles.statNumber}>{stat.siffra}</span>
                    <span className={styles.statText}>{stat.text}</span>
                  </Link>
                ))}
              </div>
              <div>
                <Link href="/byar" className="btn btn-secondary">
                  Utforska ön →
                </Link>
              </div>
            </div>
          </div>
        </section>
        <div><SectionSeason /></div>
        <div><SectionPlanner /></div>
        <div><SectionEvents /></div>
        <section className={s.pageSection} aria-labelledby="karta-rubrik">
          <div className={s.wide}>
            <p className={`${s.label} ${s.center}`}>
              Utforska ön
            </p>
            <h2 id="karta-rubrik" className={`${s.title} ${s.center}`}>
              Städer &amp; byar på Mallorca
            </h2>
            <p className={styles.mapIntro}>
              Välj en ort på kartan för sevärdheter, stränder, mat och tips.
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
