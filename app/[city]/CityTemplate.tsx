import Image from 'next/image';
import Link from 'next/link';
import HeroImage from '@/components/HeroImage';
import TipBox from '@/components/TipBox';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import LastChecked from '@/app/components/LastChecked';
import { CityJsonLd, cityBreadcrumbs } from '@/app/lib/CityJsonLd';
import type { City, CityText } from '@/data/cities';
import { beaches, type BeachRegion } from '@/data/beaches';
import { STRAND_FILTER_ID } from '@/app/strandar/anchors';
import { beachRegion, heroCredit, kidsNearby, nearbyCities } from './nearby';
import styles from './CityTemplate.module.css';

const BEACH_NAMES = new Set(beaches.map((b) => b.namn));
const BEACH_REGION = new Map(beaches.map((b) => [b.namn, b.region]));

/**
 * /strandar filtrerad på en region (StrandFilter läser ?region=). Länken går till filterrutan –
 * då syns både det valda området och de första stränderna under det fasta sidhuvudet.
 */
function strandarHref(region: BeachRegion | undefined) {
  return region ? `/strandar?region=${encodeURIComponent(region)}#${STRAND_FILTER_ID}` : `/strandar#${STRAND_FILTER_ID}`;
}

/** Strandchip → /strandar filtrerad på strandens region. */
function beachHref(name: string) {
  return strandarHref(BEACH_REGION.get(name));
}

/** Länktext för "Mer i närheten": regionerna på /strandar som läsbar svenska. */
const REGION_LINK_TEXT: Record<BeachRegion, string> = {
  Norr: 'Stränder i norr',
  Nordväst: 'Stränder i nordväst',
  Öst: 'Stränder på östkusten',
  Syd: 'Stränder på sydkusten',
  Sydväst: 'Stränder i sydväst',
};

/** Text med valfri intern länk på slutet (samma form som insidertipsen). */
function RichText({ value }: { value: CityText }) {
  if (typeof value === 'string') return <>{value}</>;
  return (
    <>
      {value.text}{' '}
      <Link href={value.link.href} className={styles.link}>{value.link.label}</Link>
    </>
  );
}

function Paragraphs({ items }: { items: CityText[] }) {
  return (
    <>
      {items.map((t, i) => (
        <p key={i}><RichText value={t} /></p>
      ))}
    </>
  );
}

/** Utbyggda sektioner (åtgärd 3.2). Varje sektion visas bara om den finns i datan. */
function CityGuideSections({ city }: { city: City }) {
  const g = city.guide;
  if (!g) return null;
  const unknown = g.beaches?.names.filter((n) => !BEACH_NAMES.has(n)) ?? [];
  if (unknown.length > 0) {
    // Fångas vid bygget: strandnamnen ska matcha data/beaches.ts så att /strandar har dem.
    throw new Error(`${city.slug}: okända strandnamn ${unknown.join(', ')}`);
  }
  return (
    <>
      {g.stay && (
        <section className={styles.section} aria-labelledby="bo">
          <h2 id="bo">Bo i {city.name}</h2>
          {g.stay.intro && <p>{g.stay.intro}</p>}
          <ul className={styles.areas}>
            {g.stay.areas.map((a) => (
              <li key={a.name} className={styles.area}>
                {/* Namnen slutar på punkt i datan (skrivna för löptext) – punkten tas bort i kortrubriken. */}
                <h3 className={styles.areaName}>{a.name.replace(/\.$/, '')}</h3>
                <p className={styles.areaText}>{a.text}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      {g.eat && (
        <section className={styles.section} aria-labelledby="ata">
          <h2 id="ata">Äta i {city.name}</h2>
          <p>{g.eat.intro}</p>
          {g.eat.dishes && (
            <ul className={styles.list}>
              {g.eat.dishes.map((d) => <li key={d}>{d}</li>)}
            </ul>
          )}
          {g.eat.tips && <Paragraphs items={g.eat.tips} />}
        </section>
      )}
      {g.getThere && (
        <section className={styles.section} aria-labelledby="ta-sig-dit">
          <h2 id="ta-sig-dit">Ta sig till {city.name}</h2>
          <dl className={styles.transport}>
            {g.getThere.map((t, i) => (
              <div key={i} className={styles.transportRow}>
                <dt className={styles.label}>{t.mode}</dt>
                <dd className={styles.transportText}><RichText value={t.text} /></dd>
              </div>
            ))}
          </dl>
        </section>
      )}
      {g.beaches && (
        <section className={styles.section} aria-labelledby="strander">
          <h2 id="strander">Stränder i närheten</h2>
          {g.beaches.text && <p>{g.beaches.text}</p>}
          <ul className={styles.chips}>
            {g.beaches.names.map((n) => (
              <li key={n}>
                <Link href={beachHref(n)} className={styles.chip}>{n}</Link>
              </li>
            ))}
          </ul>
          <p className={styles.more}>
            <Link href="/strandar" className="link-arrow">Läs mer om stränderna och filtrera på region →</Link>
          </p>
        </section>
      )}
      {g.market && (
        <section className={styles.section} aria-labelledby="marknad">
          <h2 id="marknad">Marknad</h2>
          <p className={styles.marketDays}>{g.market.days}</p>
          <Paragraphs items={g.market.text} />
          <p className={styles.more}>
            <Link href="/marknader" className="link-arrow">Alla veckomarknader på Mallorca dag för dag →</Link>
          </p>
        </section>
      )}
      {g.bestTime && (
        <section className={styles.section} aria-labelledby="basta-tid">
          <h2 id="basta-tid">Bästa tid att besöka {city.name}</h2>
          <Paragraphs items={g.bestTime} />
        </section>
      )}
      {g.families && (
        <section className={styles.section} aria-labelledby="barnfamiljer">
          <h2 id="barnfamiljer">För barnfamiljer</h2>
          <Paragraphs items={g.families} />
        </section>
      )}
      {g.couples && (
        <section className={styles.section} aria-labelledby="par">
          <h2 id="par">För par</h2>
          <Paragraphs items={g.couples} />
        </section>
      )}
    </>
  );
}

/**
 * "Mer i närheten" (sist i högerspalten, fäst på dator): stränder i regionen, barnaktiviteter
 * nära orten och genväg till orterna i närheten – vägar vidare in på sajten.
 */
function MoreNearby({ city }: { city: City }) {
  const region = beachRegion(city);
  const kids = kidsNearby(city);
  return (
    <section className={`${styles.box} ${styles.moreBox}`} aria-labelledby="mer-i-narheten">
      <h2 id="mer-i-narheten" className={styles.boxTitle}>Mer i närheten</h2>
      <ul className={styles.moreList}>
        <li>
          <Link href={strandarHref(region)} className={styles.moreLink}>
            {region ? REGION_LINK_TEXT[region] : 'Alla stränder på Mallorca'} <span aria-hidden="true">→</span>
          </Link>
        </li>
        {kids.map((k) => (
          <li key={k.href}>
            <Link href={k.href} className={styles.moreLink}>
              <span>
                <span className={styles.moreKicker}>Med barn</span> {k.name}
              </span>{' '}
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
        {kids.length === 0 && (
          <li>
            <Link href="/barn" className={styles.moreLink}>
              Med barn på Mallorca <span aria-hidden="true">→</span>
            </Link>
          </li>
        )}
        <li>
          <a href="#orter-i-narheten" className={styles.moreLink}>
            Orter i närheten <span aria-hidden="true">↓</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

/** "Orter i närheten": de fyra närmaste orterna fågelvägen, sist på sidan. */
function NearbyCities({ city }: { city: City }) {
  const nearby = nearbyCities(city, 4);
  return (
    <section id="orter-i-narheten" className={styles.nearby} aria-labelledby="orter-i-narheten-rubrik">
      <h2 id="orter-i-narheten-rubrik">Orter i närheten</h2>
      <ul className={styles.nearbyGrid}>
        {nearby.map(({ city: c, href, km }) => (
          <li key={c.slug}>
            <Link href={href} className={styles.nearbyCard}>
              <span className={styles.nearbyMedia}>
                <Image
                  src={c.card.image}
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 112px, 300px"
                  loading="lazy"
                />
              </span>
              <span className={styles.nearbyBody}>
                <h3 className={styles.nearbyName}>{c.name}</h3>
                <span className={styles.nearbyTagline}>{c.tagline}</span>
                <span className={styles.nearbyMeta}>
                  {c.region} · {km} km fågelvägen
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Gemensam mall för alla stadssidor. Allt innehåll kommer från data/cities.ts.
 *
 * Layout (5.4): textspalt (max 68ch) + högerspalt med faktarutan "Praktisk info", topp 3
 * ev. kartlänkar och "Mer i närheten" (fäst på dator). På mobil ligger högerspalten direkt efter
 * ingressen ("Om …"). Sist kommer "Orter i närheten" (närmaste orterna fågelvägen).
 */
export default function CityTemplate({ city }: { city: City }) {
  return (
    <div className={styles.page}>
      <CityJsonLd city={city} />
      <HeroImage
        src={city.hero.image}
        alt={city.hero.alt}
        kicker={city.hero.kicker}
        title={city.name}
        subtitle={city.hero.subtitle}
        photoCredit={heroCredit(city)}
      />
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Breadcrumbs items={cityBreadcrumbs(city)} />
        </div>
        <div className={styles.layout}>
          <section className={styles.intro} aria-labelledby="om">
            <h2 id="om">Om {city.name}</h2>
            {city.about.map((text, i) => (
              <p key={i} className={i === 0 ? styles.lead : undefined}>{text}</p>
            ))}
          </section>

          <aside className={styles.aside} aria-label={`Fakta om ${city.name}`}>
            <section className={styles.facts} aria-labelledby="praktisk-info">
              <h2 id="praktisk-info" className={styles.boxTitle}>Praktisk info</h2>
              <dl className={styles.factList}>
                {city.practical.map((row) => (
                  <div key={row.label}>
                    <dt className={styles.label}>{row.label}</dt>
                    <dd className={styles.factValue}>{row.value}</dd>
                  </div>
                ))}
              </dl>
              {/* Extern länk = textlänk, inte primärknapp (brief: knappregeln) – sidans vägar vidare är interna */}
              <a
                href={`https://maps.google.com/?q=${city.mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`link-arrow ${styles.mapLink}`}
              >
                Visa på karta ↗
              </a>
            </section>
            {city.highlights && (
              <section className={styles.box} aria-labelledby="hojdpunkter">
                <h2 id="hojdpunkter" className={styles.boxTitle}>{city.highlights.heading}</h2>
                <ol className={styles.boxList}>
                  {city.highlights.items.map((text) => <li key={text}>{text}</li>)}
                </ol>
              </section>
            )}
            {city.places && (
              <section className={styles.box} aria-labelledby="platser">
                <h2 id="platser" className={styles.boxTitle}>{city.places.heading}</h2>
                <ul className={styles.places}>
                  {city.places.items.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.place}>
                        <span>{item.text}</span>
                        <span className={styles.placeMap}>Karta ↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <MoreNearby city={city} />
          </aside>

          <div className={styles.main}>
            <div className={styles.sections}>
              <TipBox heading="Insidertips" as="h2">
                <ul>
                  {city.tips.map((tip, i) => (
                    <li key={i}><RichText value={tip} /></li>
                  ))}
                </ul>
              </TipBox>
              <CityGuideSections city={city} />
            </div>
            {city.checked && (
              <LastChecked
                date={city.checked}
                sources={city.sources}
                note="Restider är ungefärliga och tidtabeller, marknadsdagar och öppettider kan ändras – kontrollera hos källan innan du åker."
              />
            )}
          </div>
        </div>
        <NearbyCities city={city} />
      </div>
    </div>
  );
}
