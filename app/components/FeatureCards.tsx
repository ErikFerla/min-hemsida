import Image from 'next/image';
import Link from 'next/link';
import styles from './FeatureCards.module.css';

// Startsidans genvägskort (5.3): bild 3:2 + rubrik + text + textlänk, samma kort på mobil och dator.
// Bilderna finns redan på sajten och är krediterade i data/credits (usedOn innehåller '/').
type FeatureItem = { title: string; desc: string; href: string; bild: string; bildAlt: string };

const featureItems: FeatureItem[] = [
  {
    title: 'Stränder',
    desc: 'De 30 bästa stränderna – från vilda klippvikar till familjevänliga sandstränder',
    href: '/strandar',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/View_of_the_bay_at_Calo_des_Moro%2C_Mallorca_%28Spain%29_%2823899506181%29.jpg/1920px-View_of_the_bay_at_Calo_des_Moro%2C_Mallorca_%28Spain%29_%2823899506181%29.jpg',
    bildAlt: 'Caló des Moro – turkost vatten mellan kalkstensklippor och tallskog',
  },
  {
    title: 'Med barn',
    desc: 'Grunda stränder, grottor, djurparker och vattenparker för hela familjen',
    href: '/barn',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Platja_de_Muro_R02.jpg/1920px-Platja_de_Muro_R02.jpg',
    bildAlt: 'Grunt vatten och sandstrand vid Platja de Muro',
  },
  {
    title: 'Städer & byar',
    desc: '18 orter med insidertips från Palma till dolda bergsbyer',
    href: '/byar',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Pollen%C3%A7a_from_near_the_top_of_the_Valvari_Steps.jpg/1920px-Pollen%C3%A7a_from_near_the_top_of_the_Valvari_Steps.jpg',
    bildAlt: 'Takåsarna i Pollença sedda från toppen av Calvari-trappan',
  },
  {
    title: 'Mat & vin',
    desc: 'Restaurangtips, vingårdar att besöka och lokala smaker',
    href: '/mat',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg/960px-Vinyes_Mortitx_and_limestone_mountains%2C_Escorca.jpg',
    bildAlt: 'Vinodlingar framför kalkstensberg vid Mortitx i Tramuntana',
  },
  {
    title: 'Golf',
    desc: 'Drygt 20 banor – hitta rätt bana för din nivå',
    href: '/aktiviteter/golf',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Canyamel_Golf.JPG/1280px-Canyamel_Golf.JPG',
    bildAlt: 'Green på Canyamel Golf med berg och palmer',
  },
  {
    title: 'Planera resan',
    desc: 'Flyg, hyrbil, bästa restid – allt du behöver veta',
    href: '/flyg',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/S%C3%B3ller_Tren_de_S%C3%B3ller-4334.jpg/1920px-S%C3%B3ller_Tren_de_S%C3%B3ller-4334.jpg',
    bildAlt: 'Det gamla trätåget Tren de Sóller på stationen i Sóller',
  },
];

export default function FeatureCards() {
  return (
    <ul className={styles.grid}>
      {featureItems.map((item) => (
        <li key={item.href} className={styles.item}>
          <Link href={item.href} className={styles.card}>
            <div className={styles.media}>
              <Image
                src={item.bild}
                alt={item.bildAlt}
                fill
                sizes="(max-width: 1023px) 50vw, 360px"
                loading="lazy"
              />
            </div>
            <div className={styles.body}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
              <span aria-hidden="true" className={`link-arrow ${styles.more}`}>Läs mer →</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
