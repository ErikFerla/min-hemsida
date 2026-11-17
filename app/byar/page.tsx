import Link from 'next/link';
import Image from 'next/image';
import { IconStar, IconBuilding, IconPin, IconBulb, IconMap } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import JsonLd from '@/app/components/JsonLd';
import { cities, cityPath } from '@/data/cities';
import { cityUrl } from '@/app/lib/city-seo';
import styles from './byar.module.css';

const TOP3_ICONS = [IconStar, IconBuilding, IconPin] as const;

const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Städer och byar på Mallorca',
  numberOfItems: cities.length,
  itemListElement: cities.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    url: cityUrl(c),
  })),
};

export default function ByarSida() {
  return (
    <div className={styles.page}>
      <JsonLd data={itemList} />
      <HeroImage
        src="https://images.unsplash.com/photo-1566815687825-39bd872e6e09"
        alt="Panoramabild över Mallorca med vita stenhus och Tramuntanabergen – översikt över öns städer och byar"
        kicker="Utforska Mallorca"
        title="Städer och Byar"
        subtitle={`${cities.length} utvalda destinationer runt hela ön`}
        height="55vh"
      />

      <div className={styles.container}>
        <div className={styles.grid}>
          {cities.map((stad) => (
            <div key={stad.slug} className={styles.card}>
              <div className={styles.media}>
                <Image src={stad.card.image} alt={stad.name} width={600} height={180} className={styles.image} loading="lazy" />
                <div className={styles.region}>
                  {stad.region}
                </div>
              </div>
              <div className={styles.body}>
                <h2 className={styles.name}>{stad.name}</h2>
                <p className={styles.description}>{stad.card.description}</p>
                <div className={styles.top3}>
                  {stad.card.top3.map((sak, j) => {
                    const Icon = TOP3_ICONS[j];
                    return (
                      <div key={j} className={styles.top3Row}>
                        <span className={styles.icon}>
                          <Icon size={16} />
                        </span>
                        <span className={styles.top3Text}>{sak}</span>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.tip}>
                  <IconBulb size={14} className={styles.inlineIcon} /> {stad.card.tip}
                </div>
                <div className={styles.actions}>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stad.name + ' Mallorca')}`} target="_blank" rel="noopener noreferrer" className={styles.button}>
                    <IconMap size={14} className={styles.inlineIcon} /> Visa på karta
                  </a>
                  <Link href={cityPath(stad)} className={styles.buttonOutline}>
                    Utforska →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
