import styles from './page.module.css';
import Link from 'next/link';
import Gallery from '@/components/Gallery';

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', caption: 'Byn Santanyi' },
  { url: 'https://images.unsplash.com/photo-1555990538-c4e462d1b2cb?w=800&q=80', caption: 'Marknaden' },
  { url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80', caption: 'Sandstensarkitektur' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', caption: 'Cala Santanyi strand' },
  { url: 'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=800&q=80', caption: 'Hantverksmarknad' },
  { url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', caption: 'Solnedgang vid havet' },
];

const faqs = [
  { q: 'Vad är Santanyi känt för?', a: 'Santanyi är känt för sin charmiga marknadsplats, vacker sandstensarkitektur och sin historiska karaktär. Det är en av de viktigaste marknadsborna på Mallorca och motsvarar en klassisk spansk small town atmosfär.' },
  { q: 'Vilken strand rekommenderas?', a: 'Cala Santanyi är en av öns vackraste stränder med vita sandkampar och turkos vatten. Det är endast 3 km från bygdan. Stranden är omgiven av kiparträd och klippor som ger ett naturligt skydd från vinden.' },
  { q: 'Vilken dag är marknaden?', a: 'Veckomarknaden i Santanyi hålls på lördag morgon. Här kan du handla lokala produkter, frukt, grönsaker, tyger och olika konsthantverk. Det är en autentisk och färgrik lokalt event.' },
  { q: 'Vilka restauranger finns det?', a: 'Santanyi har ett urval av traditionella spanska och mallorcanska restauranger. Många ligger på eller nära marknadsplatsen. Pizza-restauranger och caféer finns också för ett snabbare ätande.' },
];

export default function Santanyi() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589179447604-26cc7dd49e53?w=1600&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>CHARMIG MARKNADSBY</p>
          <h1 className={styles.heroTitle}>Santanyi</h1>
        </div>
      </section>
      <div className={styles.container}>
        <section className={styles.intro}>
          <h2 className={styles.sectionHeading}>Välkommen till Santanyi</h2>
          <p>Santanyi är en klassisk spansk marknadsby i södra Mallorca. Med sin charmiga arkitektur i sandsten, levande marknadsplats och närhet till vackra stränder är det en perfekt destination för att uppleva autentisk lokonal kultur.</p>
          <p><strong>Sandstensarkitektur</strong><br />Santanyi är berömt för sina byggnader byggda i gul sandsten. Detta ger byn en varm och hemtrevlig känsla som andra byar på ön saknar. Många av husen är flera hundra år gamla och väl bevarade.</p>
          <p><strong>Marknader och hantverkare</strong><br />Veckomarknaden på lördagar lockar både turister och lokalbor. Men Santanyi är också känt som an konsthantverksby. Många lokala konstnärer och keramiker arbetar här och säljer sina verk genom små gallerier.</p>
          <p><strong>Strander och natur</strong><br />Cala Santanyi ligger bara några kilometer därifrån och är en av öns vackraste stränder. Kiparträd och klippor ramar in den lysande vita Sanden och kristallklara vattnet. Perfekt för ett avslappnat stranddag eller snorkling.</p>
          <Link href="/kontakt" className={styles.ctaBtn}>BOKA RESA</Link>
        </section>
        <Gallery images={galleryImages} />
        <section className={styles.quotes}>
          <h2 className={styles.sectionHeading}>Besökares favoriter</h2>
          <blockquote className={styles.quote}>
            <p>Santanyi är en riktig pärla. Den perfekta blandningen av spanish charm och moderna bekvämligheter. Vi återkommer varje år.</p>
            <cite>— Kulturmagasin i Malmö</cite>
          </blockquote>
          <blockquote className={styles.quote}>
            <p>Marknaden på lördagen är en måste-upplevelse. Färger, dofter, lokala produkter... det är en verklig karneval!</p>
            <cite>— Travel blogger Stockholm</cite>
          </blockquote>
        </section>
        <section className={styles.photoGrid}>
          {['Marknaden', 'Sandsten', 'Cala Santanyi', 'Gator'].map((f, i) => (
            <div key={i} className={styles.photoItem}>
              <div className={styles.photoPlaceholder}><span>{f}</span></div>
              <p className={styles.photoCaption}>{f}</p>
            </div>
          ))}
        </section>
        <section className={styles.faq}>
          <h2 className={styles.sectionHeading}>Vanliga frågor</h2>
          {faqs.map((item, i) => (
            <div key={i} className={styles.faqItem}>
              <h3 className={styles.faqQ}>{item.q}</h3>
              <p className={styles.faqA}>{item.a}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
