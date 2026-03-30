import styles from './page.module.css';
import Link from 'next/link';
import Gallery from '@/components/Gallery';

const galleryImages = [
  { url: '/bilder/palma/alex-boscarato-oRddU3Onh3A-unsplash.jpg', caption: 'Palma gata' },
  { url: '/bilder/palma/david-vives-12cqhQNVUIg-unsplash.jpg', caption: 'Palma park' },
  { url: '/bilder/palma/david-vives-fz1dT3-se-o-unsplash.jpg', caption: 'Palma katedral' },
  { url: '/bilder/palma/david-vives-Wr3eym_diWU-unsplash.jpg', caption: 'Palma stad' },
  { url: '/bilder/palma/felix-4pqjneOJa9k-unsplash.jpg', caption: 'Palma vy' },
  { url: '/bilder/palma/luca-J5SQg9nYzo-unsplash.jpg', caption: 'Palma arkitektur' },
  { url: '/bilder/palma/maurits-bausenhart-QhgLeTJaVso-unsplash.jpg', caption: 'Palma utsikt' },
  { url: '/bilder/palma/sara-darcaj-swAWzza3rOc-unsplash.jpg', caption: 'Palma detalj' },
  { url: '/bilder/palma/tom-podmore-SaW5DBltJHI-unsplash.jpg', caption: 'Palma kväll' },
];

const faqs = [
  { q: 'Vad är Palma känt för?', a: 'Palma är Mallorcas huvudstad och känd för sin gotiska katedral La Seu, historia och kultur. Det är också känt för att ha världsklass-museer, lyxig shopping på Paseo Marítimo och ett vibrerande restaurang- och nattliv.' },
  { q: 'Vilka sevärdigheter bör man se?', a: 'La Seu-katedralen är obligatorisk. Du bör också besöka gamla stadskärnan med sina smala gator, Almudaina-palatset och flera konstmuseer. Den moderna konstmässan Museum of Art är också undebar.' },
  { q: 'Vilka restauranger rekommenderas?', a: 'Palma har allt från moderna Michelin-stjärnor-restauranger till små traditionella bodegar. Omkring hamnen finns många bra seafoodalternativ. Tapas-barerna är utmärkta för ett möte mellan vänner.' },
  { q: 'Hur långt är det från huvudflygplatsen?', a: 'Flygplatsen ligger endast 8 km öster om Palma. Det tar ungefär 15-20 minuter med taxi eller ungefär 30 minuter med buss. Det är mycket enkelt att nå Palma.' },
];

export default function PalmaDeMallorca() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} style={{ backgroundImage: "url('/bilder/palma/palma-hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>MALLORCAS HJÄRTA</p>
          <h1 className={styles.heroTitle}>Palma de Mallorca</h1>
        </div>
      </section>
      <div className={styles.container}>
        <section className={styles.intro}>
          <h2 className={styles.sectionHeading}>Välkommen till Palma</h2>
          <p>Palma de Mallorca är den vibrerande huvudstaden på Mallorca. Med sin imponerande gotiska katedral La Seu, ryktbar historia, världsklass-shopping och ett livligare restaurang- och nightlife-scen är det ett måste-besök för alla som reser till ön.</p>
          <p><strong>La Seu - Katedralen</strong><br />La Seu är en av Europas finaste gotiska katedraler, byggd på 1300-talet. Dess imponerande rosettfönster och höga valv är spektakulär från in- och utsida. Om du kan, gå in under solnedgången när solljuset skiner genom fönstren.</p>
          <p><strong>Historia och kultur</strong><br />Palmas gamla stad är ett labyrint av smala gatorna, medeltida kyrkor och hemliga trädgårdar. Här finns också flera konstmuseer inklusive Museu d'Art de Mallorca och det moderna Museum of Art. Konstintresserade kommer att bli begeistrade.</p>
          <p><strong>Shopping och nattliv</strong><br />Paseo Marítimo är hemmet för lyxiga butiker och upscale-restauranger. Katedral Square är pulsande på kvällen med människor som flanerar längs kajen. För nattlivet finns allt från trendy cocktail bars till klassiska diskotek.</p>
          <Link href="/kontakt" className={styles.ctaBtn}>BOKA RESA</Link>
        </section>
        <Gallery images={galleryImages} />
        <section className={styles.quotes}>
          <h2 className={styles.sectionHeading}>Media älskar Palma</h2>
          <blockquote className={styles.quote}>
            <p>Palma är en av Europas mest underskattade städer. Med dess historia, arkitektur och moderna kultur hör det hemma på samma lista som Barcelona och Madrid.</p>
            <cite>— The Guardian Travel</cite>
          </blockquote>
          <blockquote className={styles.quote}>
            <p>La Seu-katedralen är en av världens sju vackraste gotiska katedraler. Att besöka den är att stå inför konsthistorien personligen.</p>
            <cite>— Arkitektur och Design-tidskrift</cite>
          </blockquote>
        </section>
        <section className={styles.photoGrid}>
          {['La Seu', 'Gamla Stad', 'Kajpromenad', 'Nattliv'].map((f, i) => (
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
