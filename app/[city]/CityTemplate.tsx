import Link from 'next/link';
import { IconStar, IconBuilding, IconPin } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import LastChecked from '@/app/components/LastChecked';
import { CityJsonLd, cityBreadcrumbs } from '@/app/lib/CityJsonLd';
import type { City, CityText } from '@/data/cities';
import { beaches } from '@/data/beaches';
import styles from './CityTemplate.module.css';

const HIGHLIGHT_ICONS = [IconStar, IconBuilding, IconPin] as const;
const BEACH_NAMES = new Set(beaches.map((b) => b.namn));

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
        <p key={i} className={styles.about}><RichText value={t} /></p>
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
    <div className={styles.guide}>
      {g.stay && (
        <section className={styles.section} aria-labelledby="bo">
          <h2 id="bo">Bo i {city.name}</h2>
          {g.stay.intro && <p className={styles.about}>{g.stay.intro}</p>}
          <ul className={styles.areas}>
            {g.stay.areas.map((a) => (
              <li key={a.name}>
                <strong className={styles.areaName}>{a.name}</strong> {a.text}
              </li>
            ))}
          </ul>
        </section>
      )}
      {g.eat && (
        <section className={styles.section} aria-labelledby="ata">
          <h2 id="ata">Äta i {city.name}</h2>
          <p className={styles.about}>{g.eat.intro}</p>
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
                <dt className={styles.transportMode}>{t.mode}</dt>
                <dd className={styles.transportText}><RichText value={t.text} /></dd>
              </div>
            ))}
          </dl>
        </section>
      )}
      {g.beaches && (
        <section className={styles.section} aria-labelledby="strander">
          <h2 id="strander">Stränder i närheten</h2>
          {g.beaches.text && <p className={styles.about}>{g.beaches.text}</p>}
          <ul className={styles.chips}>
            {g.beaches.names.map((n) => (
              <li key={n}>
                <Link href="/strandar" className={styles.chip}>{n}</Link>
              </li>
            ))}
          </ul>
          <p className={styles.small}>
            <Link href="/strandar" className={styles.link}>Läs mer om stränderna och filtrera på region →</Link>
          </p>
        </section>
      )}
      {g.market && (
        <section className={styles.section} aria-labelledby="marknad">
          <h2 id="marknad">Marknad</h2>
          <p className={styles.marketDays}>{g.market.days}</p>
          <Paragraphs items={g.market.text} />
          <p className={styles.small}>
            <Link href="/marknader" className={styles.link}>Alla veckomarknader på Mallorca dag för dag →</Link>
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
    </div>
  );
}

/** Gemensam mall för alla stadssidor. Allt innehåll kommer från data/cities.ts. */
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
      />
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Breadcrumbs items={cityBreadcrumbs(city)} />
        </div>
        <div className={styles.grid}>
          <div>
            <h2>Om {city.name}</h2>
            {city.about.map((text, i) => (
              <p key={i} className={styles.about}>{text}</p>
            ))}
            <h3 className={`${styles.withIcon} ${styles.tipsTitle}`}>Insidertips <IconStar size={20} /></h3>
            <ul className={styles.tips}>
              {city.tips.map((tip, i) => (
                <li key={i}><RichText value={tip} /></li>
              ))}
            </ul>
            {city.highlights?.variant === 'list' && (
              <div className={styles.highlights}>
                <h2>{city.highlights.heading}</h2>
                {city.highlights.items.map((text, i) => {
                  const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
                  return (
                    <div key={i} className={styles.highlightRow}>
                      <span className={styles.icon}><Icon size={20} /></span>
                      <span className={styles.highlightText}>{text}</span>
                    </div>
                  );
                })}
              </div>
            )}
            {city.highlights?.variant === 'cards' && (
              <div className={styles.cardsBlock}>
                <h3>{city.highlights.heading}</h3>
                <div className={styles.cards}>
                  {city.highlights.items.map((text, i) => {
                    const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
                    return (
                      <div key={i} className={styles.card}>
                        <span className={styles.icon}><Icon size={20} /></span>
                        <span className={styles.cardText}>{text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <CityGuideSections city={city} />
          </div>
          <aside>
            <div className={styles.box}>
              <h3 className={styles.boxTitle}><IconPin size={16} /> Praktisk info</h3>
              <p className={styles.practical}>
                {city.practical.map((row, i) => (
                  <span key={row.label}>
                    {i > 0 && <br />}
                    <strong>{row.label}:</strong> {row.value}
                  </span>
                ))}
              </p>
            </div>
            <a href={`https://maps.google.com/?q=${city.mapsQuery}`} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
              Visa på karta ↗
            </a>
            {city.places && (
              <div className={styles.places}>
                <h3 className={styles.boxTitle}><IconPin size={18} /> {city.places.heading}</h3>
                {city.places.items.map((item) => (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={styles.place}>
                    <span className={styles.placeName}>{item.text}</span>
                    <span className={styles.placeMap}>Karta ↗</span>
                  </a>
                ))}
              </div>
            )}
          </aside>
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
  );
}
