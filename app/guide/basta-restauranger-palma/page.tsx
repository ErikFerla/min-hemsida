import Link from 'next/link';
import { IconPin, PriceTag, tierFromPris } from '@/components/Icons';
import CardTip from '@/components/CardTip';
import HeroImage from '@/components/HeroImage';
import LastChecked from '@/app/components/LastChecked';
import h from '../headings.module.css';
import styles from './page.module.css';
import Breadcrumbs from '@/app/components/Breadcrumbs';

type Restaurant = {
  namn: string;
  adress: string;
  pris: string;
  specialitet: string;
  bästRätt: string;
  insiderTips: string;
};

const restauranger: Record<string, Restaurant[]> = {
  fin: [
    { namn: 'Zaranda', adress: 'Carrer de la Bala Roja, Palma (hotellet Es Príncep)', pris: '€€€€', specialitet: 'Avsmakningsmenyer av kocken Fernando Pérez Arellano – en Michelinstjärna', bästRätt: 'Avsmakningsmenyn', insiderTips: 'Restaurangen har egen entré, skild från hotellets. Boka i god tid.' },
    { namn: 'Marc Fosh', adress: 'Carrer de la Missió, Palma gamla stad', pris: '€€€€', specialitet: 'Modern medelhavsmat av den brittiske kocken Marc Fosh – en Michelinstjärna', bästRätt: 'Avsmakningsmenyn', insiderTips: 'Restaurangen ligger i hotellet Convent de la Missió, ett gammalt kloster i gamla stan.' },
    { namn: 'DINS Santi Taura', adress: 'Plaça de Llorenç Villalonga, Palma', pris: '€€€€', specialitet: 'Gamla mallorkinska recept i ny tappning – en Michelinstjärna', bästRätt: 'Avsmakningsmenyn', insiderTips: 'Liten matsal i det gamla judiska kvarteret La Calatrava – boka i god tid.' },
    { namn: 'Adrián Quetglas', adress: 'Passeig de Mallorca, Palma', pris: '€€€€', specialitet: 'Kreativa avsmakningsmenyer – restaurangen förlorade sin Michelinstjärna 2024 (guiden 2025)', bästRätt: 'Den längre avsmakningsmenyn', insiderTips: 'Bistron D’Gustar alldeles intill drivs av samma kock och är ett enklare alternativ.' },
  ],
  tapas: [
    { namn: 'La Bodeguilla', adress: 'Carrer de Sant Jaume, Palma', pris: '€€', specialitet: 'Klassiska tapas och rätter från hela Spanien', bästRätt: 'Jamón ibérico, manchego och pa amb oli', insiderTips: 'Ett tryggt val mitt i stan när du vill äta spanskt utan krångel.' },
    { namn: 'Bar España', adress: 'Carrer de Can Escursac, Palma', pris: '€', specialitet: 'Pintxos i en liten gränd nära Plaça Major', bästRätt: 'Pintxos direkt från bardisken', insiderTips: 'Prisvärt och populärt – räkna med trängsel vid disken på kvällen.' },
    { namn: 'Tast Club', adress: 'Carrer de Sant Jaume, Palma', pris: '€€€', specialitet: 'Tapas i en bar som påminner om en gammal engelsk herrklubb', bästRätt: 'Låt personalen föreslå dagens tapas', insiderTips: 'Ingången är diskret – håll utkik efter adressen på Carrer de Sant Jaume.' },
    { namn: 'El Camino', adress: 'Carrer de Can Brondo, Palma', pris: '€€', specialitet: 'Tapas vid en lång bardisk framför det öppna köket', bästRätt: 'Dagens tapas – fråga vid disken', insiderTips: 'Sitt vid bardisken och se kockarna arbeta. Kom tidigt – det fylls snabbt.' },
    { namn: 'Toque de Queda', adress: 'Carrer de Can Cavalleria, Palma', pris: '€€', specialitet: 'Chark- och ostbrickor, cocas och champagne', bästRätt: 'En tabla med chark och ost att dela', insiderTips: 'Ägarna kommer från Emilia-Romagna, så det italienska märks i både chark och viner.' },
  ],
  fisk: [
    { namn: 'Patrón Lunares', adress: 'Carrer de la Fàbrica, Santa Catalina', pris: '€€€', specialitet: 'Fisk, skaldjur och risrätter', bästRätt: 'En risrätt med skaldjur att dela', insiderTips: 'Ofta fullt – boka bord, särskilt på helger.' },
    { namn: 'Caballito de Mar', adress: 'Passeig de Sagrera 5, Palma', pris: '€€€', specialitet: 'Klassisk fiskrestaurang mitt emot Sa Llotja, öppnad igen efter en renovering', bästRätt: 'Dagens fisk', insiderTips: 'Bra för en lång lunch på terrassen – kontrollera öppettiderna, som har varierat.' },
  ],
  lokalt: [
    { namn: 'Celler Sa Premsa', adress: 'Plaça del Bisbe Berenguer de Palou, Palma', pris: '€', specialitet: 'En av Palmas klassiska källarkrogar, sedan 1958', bästRätt: 'Frit mallorquí (traditionell rätt med inälvor, potatis och grönsaker)', insiderTips: 'Interiören har knappt ändrats på årtionden. Kom hungrig – portionerna är stora.' },
    { namn: "Ca'n Joan de s'Aigo", adress: 'Carrer de Can Sanç, Palma', pris: '€', specialitet: 'Historiskt kafé, grundat omkring år 1700', bästRätt: 'Ensaïmada med varm choklad, eller mandelglass', insiderTips: 'Räknas som Palmas äldsta kafé. Gå till huset på Carrer de Can Sanç – det mest anrika av kaféets lokaler.' },
    { namn: "Mercat de l'Olivar", adress: "Plaça de l'Olivar, Palma", pris: '€', specialitet: 'Stadens stora saluhall med fisk, kött och grönsaker – och flera tapasbarer', bästRätt: 'Färsk fisk och skaldjur vid någon av barerna', insiderTips: 'Gå dit på förmiddagen när det är som mest liv bland fiskstånden och ät lunch vid en bardisk.' },
  ],
};

const sections = [
  { key: 'fin', label: 'Finkrogar', kicker: 'Michelinstjärnor och avsmakningsmenyer', items: restauranger.fin },
  { key: 'tapas', label: 'Bästa tapas', kicker: 'Barer och små rätter', items: restauranger.tapas },
  { key: 'fisk', label: 'Fisk och skaldjur', kicker: 'Havet på tallriken', items: restauranger.fisk },
  { key: 'lokalt', label: 'Lokalt och prisvärt', kicker: 'Husmanskost och cellers', items: restauranger.lokalt },
];

export default function BästaRestaurangerPalma() {
  return (
    <div className={styles.page}>
      <HeroImage
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Spanish_Tapas.jpg/1920px-Spanish_Tapas.jpg"
        alt="Flera små tapasrätter på ett bord – genrebild, inte från någon av restaurangerna"
        kicker="Matguide"
        title="De bästa restaurangerna i Palma"
        subtitle="Våra egna favoriter, inte en topplista från Tripadvisor. Från Michelinstjärnor till pintxos (små tilltugg på bröd) vid bardisken."
        height="52vh"
      />

      <div className={styles.container}>
        <Breadcrumbs spaced items={[{ name: 'Hem', url: '/' }, { name: 'Guider', url: '/guider' }, { name: 'De bästa restaurangerna i Palma', url: '/guide/basta-restauranger-palma' }]} />

        <div className={styles.priceBox}>
          <p className={styles.priceLabel}>Prisskala</p>
          <div className={styles.priceGrid}>
            <Row tier={1} label="Under 20 €" />
            <Row tier={2} label="20–40 €" />
            <Row tier={3} label="40–70 €" />
            <Row tier={4} label="Över 70 €" />
          </div>
        </div>

        {sections.map(section => (
          <section key={section.key} className={styles.section}>
            <p className={h.label}>{section.kicker}</p>
            <h2 className={`${h.h2} ${styles.sectionTitle}`}>{section.label}</h2>
            <div className={styles.cards}>
              {section.items.map(r => <RestaurantCard key={r.namn} r={r} />)}
            </div>
          </section>
        ))}

        <div className={styles.cta}>
          <h2 className={h.h2}>Mer mat och vin på Mallorca</h2>
          <p className={styles.ctaText}>Vingårdar, lokala marknader och fler restaurangtips utanför Palma.</p>
          <div className={styles.ctaButtons}>
            <Link href="/mat" className="btn btn-primary">Se matguiden →</Link>
            <Link href="/vingardar" className="btn btn-secondary">Vingårdar →</Link>
          </div>
        </div>

        <LastChecked
          date="2026-11-20"
          note="Michelinstjärnorna gäller Michelinguiden 2026. Öppettider ändras med säsongen – kontrollera hos restaurangen."
          sources={[
            { label: 'Michelinguiden: DINS Santi Taura', href: 'https://guide.michelin.com/en/islas-baleares/palma/restaurant/dins-santi-taura' },
            { label: 'Michelinguiden: Adrián Quetglas', href: 'https://guide.michelin.com/en/illes-balears/palma/restaurant/adrian-quetglas' },
            { label: 'Mallorcadiario: Quetglas utan stjärna', href: 'https://www.mallorcadiario.com/el-restaurante-del-chef-adrian-quetglas-no-logra-retener-su-estrella-michelin' },
            { label: 'Ajuntament de Palma: Celler Sa Premsa', href: 'https://web.palmaactiva.com/emblematics-palma/content/pdf/celler-sa-premsa.pdf' },
            { label: 'Última Hora: Ca’n Joan de s’Aigo 325 år', href: 'https://www.ultimahora.es/noticias/local/2025/11/09/2500845/joan-aigo-decano-325-anos-vida-reclamo-turistico-palma.html' },
            { label: 'Palma Weekly: tapas i Palma', href: 'https://www.palmaweekly.com/10-tapas-restaurants-in-palma-city-centre/' },
            { label: 'Última Hora: Caballito de Mar 2025', href: 'https://www.ultimahora.es/monograficos/cocinas-cocineros-alma-3/2025/12/11/14221/style-gastronomy-estas-fiestas-caballito-mar-vuelve-promocion-cocinas-cocineros-alma.html' },
            { label: 'Michelinguiden: La Bodeguilla', href: 'https://guide.michelin.com/en/illes-balears/palma/restaurant/la-bodeguilla' },
          ]}
        />
      </div>
    </div>
  );
}

function Row({ tier, label }: { tier: number; label: string }) {
  return (
    <div className={styles.priceRow}>
      <PriceTag tier={tier} /> <span>{label}</span>
    </div>
  );
}

function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHead}>
        <h3 className={`${h.h3} ${styles.cardTitle}`}>{r.namn}</h3>
        <PriceTag tier={tierFromPris(r.pris)} />
      </div>
      <p className={styles.address}>
        <IconPin size={12} /> {r.adress}
      </p>
      <p className={styles.speciality}>{r.specialitet}</p>
      <dl className={styles.order}>
        <dt>Beställ detta</dt>
        <dd>{r.bästRätt}</dd>
      </dl>
      <CardTip label="Insidertips" className={styles.tip}>{r.insiderTips}</CardTip>
    </article>
  );
}
