import Link from 'next/link';
import { IconStar, IconBuilding, IconPin } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { CityJsonLd, cityBreadcrumbs } from '@/app/lib/CityJsonLd';
import type { City } from '@/data/cities';
import styles from './CityTemplate.module.css';

const HIGHLIGHT_ICONS = [IconStar, IconBuilding, IconPin] as const;

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
            <h3 className={`${styles.withIcon} ${styles.tipsTitle}`}>Insider-tips <IconStar size={20} /></h3>
            <ul className={styles.tips}>
              {city.tips.map((tip, i) =>
                typeof tip === 'string' ? (
                  <li key={i}>{tip}</li>
                ) : (
                  <li key={i}>
                    {tip.text}{' '}
                    <Link href={tip.link.href} className={styles.link}>{tip.link.label}</Link>
                  </li>
                ),
              )}
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
      </div>
    </div>
  );
}
