import styles from './page.module.css';
import Link from 'next/link';
import Gallery from '@/components/Gallery';

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80', caption: 'Marinan' },
  { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', caption: 'Segelbatar' },
  { url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80', caption: 'Klippor vid havet' },
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', caption: 'Kristallklart vatten' },
  { url: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=800&q=80', caption: 'Solnedgang over havet' },
  { url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80', caption: 'Lugn vik' },
];

const faqs = [
  { q: 'Vad gör Porto Petro så exklusivt?', a: 'Porto Petro är mindre än Porto Colom och saknar helt massturism. Det är en real marina med lyxiga segelb\u00e5tar och ett diskret, exklusivt v\u00e4rdshus. Bara ungef\u00e4r 100 h\u00e4ll\u00e4re bor h\u00e4r permanent.' },
  { q: 'Hur \u00e4r vattnet h\u00e4r?', a: 'Vattnet \u00e4r kristallklart och mellan 20-25 grader under sommaren perfekt f\u00f6r bada, snorkling och dykning. Inga stora v\u00e5gor d\u00e5 det \u00e4r v\u00e4lskyddat av b\u00e5la.' },
  { q: 'Vilka aktiviteter kan man g\u00f6ra?', a: 'Segling, dykning, snorkling och bara att koppla av vid stranden. F\u00f6r de aktiva finns cykling och vandringsled i n\u00e4rheten. Det finns ocks\u00e5 en liten restaurang och caf\u00e9.' },
  { q: '\u00c4r det l\u00e4mpligt f\u00f6r familjer?', a: 'Ja, det \u00e4r mycket l\u00e4mpligt f\u00f6r familjer och par som s\u00f6ker lugn och privat. Det finns inga utel\u00e9ver eller massturism, bara fridfullt badande och snorkling.' },
];

export default function PortoPetro() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>EXKLUSIV MARINA</p>
          <h1 className={styles.heroTitle}>Porto Petro</h1>
        </div>
      </section>
      <div className={styles.container}>
        <section className={styles.intro}>
          <h2 className={styles.sectionHeading}>Välkommen till Porto Petro</h2>
          <p>Porto Petro är en liten och exklusiv marinaby på Mallorcas östkust. Med sitt kristallklara vatten, lyxiga segelb\u00e5tar och diskreta atmosf\u00e4r är det perfekt f\u00f6r par och de som söker en verkligt avskild upplevelse långt bort från massturismen.</p>
          <p><strong>Kristallklart vatten</strong><br />Porto Petro omges av klippor och blomstrande träd som beskyddar det kristallklara Medellhavsvannet. Vattnet är så rent att du kan se fisk genom snorkeln m\u00e5nga meter ner. Det är perfekt f\u00f6r fagfulla dykare och snorklare.</p>
          <p><strong>Lyxig men nedtonad</strong><br />Här ankrar man privata segelbåtar och exklusiva yachter. Det finns ingen strandrestaurang eller stor lokal närvaro, bara en handvävd känsla av lugn och exklusivitet. Detta gör det till ett favoritställe för rika och välkända som söker privatliv.</p>
          <p><strong>För de som söker lugn</strong><br />Är du trött på människomängder och turistatmosfär? Porto Petro är ditt svar. Här finns bara några få restauranger och kaféer, mycket få människor och en känsla av att världen bara stannat upp. Perfekt för par eller mindre grupper.</p>
          <Link href="/kontakt" className={styles.ctaBtn}>BOKA RESA</Link>
        </section>
        <Gallery images={galleryImages} />
        <section className={styles.quotes}>
          <h2 className={styles.sectionHeading}>Vad gäster älskar</h2>
          <blockquote className={styles.quote}>
            <p>Porto Petro är för de som redan hittat Porto Colom och nu söker något ännu mindre. En verklig skatt för de som älskar lugn och exklusivitet.</p>
            <cite>— Yachtmagasin Skandinavien</cite>
          </blockquote>
          <blockquote className={styles.quote}>
            <p>Vi har aldrig sett vattnet så klart utanför Karriben. Porto Petro minskar perfekt detta. Slutsats: Vi kommer tillbaka varje sommar!</p>
            <cite>— Dykbloggen Djupt</cite>
          </blockquote>
        </section>
        <section className={styles.photoGrid}>
          {['Marina', 'Vatten', 'Båtar', 'Strand'].map((f, i) => (
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
