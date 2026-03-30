import styles from './page.module.css';
import Link from 'next/link';
import Gallery from '@/components/Gallery';

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=800&q=80', caption: 'Hamnen i Porto Colom' },
  { url: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=800&q=80', caption: 'Kristallklart vatten' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', caption: 'Sandstrand' },
  { url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80', caption: 'Batar i hamnen' },
  { url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', caption: 'Utsikt over viken' },
  { url: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80', caption: 'Solnedgang' },
];

const faqs = [
  { q: 'Varför är Porto Colom så populärt?', a: 'Porto Colom är känt för sin naturliga hamn som är en av de vackraste på Mallorca. Den lugna atmosfären, de autentiska fiskebåtarna och de utmärkta fiskrestaurangerna gör det perfekt för familjer.' },
  { q: 'Vilka aktiviteter kan man göra här?', a: 'Snorkling och dykning i det kristallklara vattnet är populärt. Du kan också ta en båttur, hyra cykel längs kusten, eller bara koppla av på någon av de närliggande stränderna.' },
  { q: 'Vilka restauranger rekommenderas?', a: 'De små fiskrestaurangerna längs hamnen serverar färsk fisksoppa och lokala specialiteter. Många av dem har varit familjeägda i generationer och erbjuder autentisk Mallorcansk mat.' },
  { q: 'Hur långt är det från Palma?', a: 'Porto Colom ligger cirka 50 km från Palma, ungefär en timmes bilresa. Det är enkelt att nå med bil eller buss, och många gör det som ett dagutflyktstips.' },
];

export default function PortoColom() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1600&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>PITTORESK FISKEBY</p>
          <h1 className={styles.heroTitle}>Porto Colom</h1>
        </div>
      </section>
      <div className={styles.container}>
        <section className={styles.intro}>
          <h2 className={styles.sectionHeading}>Välkommen till Porto Colom</h2>
          <p>Porto Colom är en liten, pittoresk fiskeby på Mallorcas östkust. Med sin naturliga hamn, autentisk fiskarkultur och turkosa vatten är det en av öns mest charmiga destinationer för den som söker lugn och autenticitet.</p>
          <p><strong>En naturlig hamn</strong><br />Porto Colom är känd för sin spektakulära naturhamn som är helt skyddad och omgiven av klassiska vita fiskarvillor. Här ankrar fiskebåtarna upp och serverar direkt från båten.</p>
          <p><strong>Familjevänligt och lugnt</strong><br />Till skillnad från de stora badbyarna är Porto Colom lugnt och familjevänligt. Det är perfekt för större som helst söker en mer autentisk upplevelse utan massturism. Stränderna är närliggande och är idealiska för små barn.</p>
          <p><strong>Mat och kultur</strong><br />De små fiskrestaurangerna längs hamnen serverar dag efter dag samma rätter från källan. Fisksoppan (caldero) är en klassiker här, liksom grillad mellanhaj och bläckfisk. Atmosfären är enkelt men genuint mallorcansk.</p>
          <Link href="/kontakt" className={styles.ctaBtn}>BOKA RESA</Link>
        </section>
        <Gallery images={galleryImages} />
        <section className={styles.quotes}>
          <h2 className={styles.sectionHeading}>Vad sina älskar Porto Colom</h2>
          <blockquote className={styles.quote}>
            <p>Porto Colom är det mest autentiska vi hittat på Mallorca. Ingen artificiell turism, bara verklig fiskeby-kultur och fantastisk mat.</p>
            <cite>— Familjebloggen Vandrar</cite>
          </blockquote>
          <blockquote className={styles.quote}>
            <p>Det är svårt att hitta en större hamn i Europa som är så vacker och så bevarad. Porto Colom är en skatt.</p>
            <cite>— Reseledare.se</cite>
          </blockquote>
        </section>
        <section className={styles.photoGrid}>
          {['Hamnen', 'Fiskarvillor', 'Strand', 'Restaurang'].map((f, i) => (
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
