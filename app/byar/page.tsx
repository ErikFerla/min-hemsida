import Link from 'next/link';
import Image from 'next/image';
import { IconStar, IconBuilding, IconPin, IconMap } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import TipBox from '@/components/TipBox';
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
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Pollen%C3%A7a_from_near_the_top_of_the_Valvari_Steps.jpg/1920px-Pollen%C3%A7a_from_near_the_top_of_the_Valvari_Steps.jpg"
        alt="Utsikt över takåsarna i Pollença från toppen av Calvari-trappan – en av Mallorcas gamla byar"
        kicker="Utforska Mallorca"
        title="Städer och byar"
        subtitle={`${cities.length} utvalda orter runt hela ön`}
        height="55vh"
      />

      <div className={styles.container}>
        <div className={styles.grid}>
          {cities.map((stad) => (
            <article key={stad.slug} className={styles.card}>
              <div className={styles.media}>
                <Image src={stad.card.image} alt={stad.name} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px" loading="lazy" />
                <span className={styles.region}>
                  {stad.region}
                </span>
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
                <TipBox variant="compact" heading="Tips" as="p" className={styles.tip}>
                  <p>{stad.card.tip}</p>
                </TipBox>
                <div className={styles.actions}>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stad.name + ' Mallorca')}`} target="_blank" rel="noopener noreferrer" className="link-arrow">
                    <IconMap size={14} /> Visa på karta ↗
                  </a>
                  <Link href={cityPath(stad)} className="link-arrow">
                    Utforska →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
