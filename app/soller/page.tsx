'use client';
import styles from '../page.module.css';
import Link from 'next/link';
import Gallery from '@/components/Gallery';

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=80', caption: 'Soller by' },
  { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', caption: 'Tramuntanabergen' },
  { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', caption: 'Apelsinlundar' },
  { url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80', caption: 'Bergsutsikt' },
  { url: 'https://images.unsplash.com/photo-1445620466293-d6316372ab59?w=800&q=80', caption: 'Port de Soller' },
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', caption: 'Hamnen' },
];

export default function Soller() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>BERGSBY MED CHARM</p>
          <h1 className={styles.heroTitle}>Soller</h1>
        </div>
      </section>
      <div className={styles.container}>
        <section className={styles.intro}>
          <h2 className={styles.sectionHeading}>Om Soller</h2>
          <p>Soller ar en av Mallorcas mest charmiga byar, belagen i en frodig dal omgiven av Tramuntanabergen i nordvast. Byn ar kand for sina apelsinlundar, sin historiska sparvagn och sin avslappnade atmosfar.</p>
          <p><strong>Sparvagnen</strong><br />Den historiska trasparvagnen gar mellan Soller och Port de Soller sedan 1913. En klassisk upplevelse som lockar besokare fran hela varlden.</p>
          <p><strong>Vandring och cykling</strong><br />Soller ar ett utmarkt utgangspunkt for vandring i Serra de Tramuntana, som ar ett UNESCO-världsarv. Flera av Mallorcas basta vandringsleder startar har.</p>
          <Link href="/kontakt" className={styles.ctaBtn}>BOKA RESA</Link>
        </section>
        <Gallery images={galleryImages} title="Bildgalleri - Soller" />
        <section className={styles.faq}>
          <h2 className={styles.sectionHeading}>Vanliga fragor</h2>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQ}>Hur tar man sig till Soller?</h3>
            <p className={styles.faqA}>Fran Palma kan man aka det historiska taget over bergen, kora bil via tunneln eller ta den kurviga bergsvagen. Taget ar den mest minnesvarda upplevelsen.</p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQ}>Vad ska man se i Soller?</h3>
            <p className={styles.faqA}>Torget med kyrkan Sant Bartomeu, den botaniska tradgarden, marknaden pa lordagar och naturligtvis sparvagnsturen ner till Port de Soller.</p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQ}>Nar ar basta tiden att besoka Soller?</h3>
            <p className={styles.faqA}>Varen och hosten ar idealiska — apelsinerna blommar pa varen och temperaturen ar perfekt for vandring. Sommaren ar varm men mer turisttatt.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

