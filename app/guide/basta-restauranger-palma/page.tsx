import Link from 'next/link';
import { IconPin, IconInfo, IconBookmark, PriceTag, tierFromEmoji } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import h from '../headings.module.css';
import styles from './page.module.css';

type Restaurant = {
  namn: string;
  adress: string;
  pris: string;
  specialitet: string;
  bästRätt: string;
  insiderTips: string;
};

const restauranger: Record<string, Restaurant[]> = {
  michelin: [
    { namn: 'Zaranda', adress: 'Carrer de Son Espanyolet, Palma', pris: '💰💰💰💰', specialitet: 'Haute cuisine med mallorquinska råvaror', bästRätt: 'Smörstekt pilgrimsmussla med svart tryffel', insiderTips: 'Boka en månad i förväg. Lunchen (12:30) är billigare och lika bra som middagen.' },
    { namn: 'Marc Fosh', adress: 'Carrer de la Missió, Palma gamla stad', pris: '💰💰💰💰', specialitet: 'Modern medelhavsmat, brittisk kock', bästRätt: 'Bacallà (torsk) med olivolja och örter', insiderTips: 'Boka ett bord vid fönstret mot klostergården. Provmeny (7 rätter) ger bäst värde.' },
    { namn: 'Adrian Quetglas', adress: 'Passeig del Born, Palma', pris: '💰💰💰', specialitet: 'Fusion av spanskt och östeuropeiskt', bästRätt: 'Suckling pig med äpple och chutney', insiderTips: 'Bordsplacering vid baren ger bäst utsikt mot köket. Avsluta med deras hemgjorda glass.' },
  ],
  tapas: [
    { namn: 'La Bodeguilla', adress: 'Carrer de Sant Jaume, Palma', pris: '💰💰', specialitet: 'Klassisk spansk tapas och jamón ibérico', bästRätt: 'Jamón ibérico bellota + manchego + pan con tomate', insiderTips: 'Stå vid bardisken för bäst servis. Beställ hela tapasmenyn – inte á la carte.' },
    { namn: 'Bar España', adress: 'Plaça de Weyler, Palma', pris: '💰', specialitet: 'Lokalt hänge med autentisk atmosfär', bästRätt: 'Croquetas de jamón (husmanskost i världsklass)', insiderTips: 'Dit för frukost kl 09–11. Palmesanerna börjar dagen med kaffe och en tapas.' },
    { namn: 'Tast Club', adress: 'Carrer de Sant Jaume, Palma', pris: '💰💰💰', specialitet: 'Modern tapas, smakrik och kreativ', bästRätt: 'Sobrassada med honung och brioche', insiderTips: 'Sista bordet kl 22:00 – perfekt för en sen spansk middag utan att rusa.' },
    { namn: 'El Camino', adress: 'Carrer dels Apuntadors, La Lonja', pris: '💰💰', specialitet: 'Internationella smaker med spansk bas', bästRätt: 'Burrata med färska tomater och basilikaolja', insiderTips: 'Utomhusservering i bakgården – boka den! Inomhus är trångt.' },
  ],
  fisk: [
    { namn: 'Portixol Restaurant', adress: 'Carrer de Sirena, Portixol hamn', pris: '💰💰💰', specialitet: 'Färsk fisk, utsikt mot hamnen', bästRätt: 'Rissotto med havskräfta och saffran', insiderTips: 'Be om bord nummer 12 – direkt mot vattnet. Kom i solnedgången 20:00.' },
    { namn: 'Es Parlament', adress: 'Carrer del Conquistador, Palma', pris: '💰💰💰', specialitet: 'Klassisk mallorquinsk fiskrestaurang', bästRätt: 'Suquet de peix – mallorquinsk fiskgryta', insiderTips: 'Traditionellt hak frequenterat av lokala politiker. Aldrig dåligt.' },
    { namn: 'Caballito de Mar', adress: 'Passeig de Sagrera, Palma', pris: '💰💰', specialitet: 'Enkelt och fräscht, rätt vid havet', bästRätt: 'Friterad sardiner med aioli', insiderTips: 'Perfekt för lunch i solen. Gå till kassan och välj dagens fångst – handpekat.' },
    { namn: 'Llaut del Born', adress: 'Passeig del Born, Palma', pris: '💰💰', specialitet: 'Fisk och skaldjur mitt i centrum', bästRätt: 'Gambas al ajillo (vitlöksräkor)', insiderTips: 'Beläget på bästa adress. Terrassen längs promenaden är oslagbar för kvällsmiddag.' },
  ],
  lokalt: [
    { namn: 'Celler Sa Premsa', adress: 'Plaça del Bisbe Berenguer de Palou, Palma', pris: '💰', specialitet: 'Palmas mest klassiska lokala restaurang', bästRätt: 'Frit mallorquín (traditionell rätter med potatis och grönsaker)', insiderTips: 'Restaurangen är identisk sedan 1940-talet. Kom hungry – portionerna är enorma.' },
    { namn: "Ca'n Joan de s'Aigo", adress: 'Carrer de Can Sanç, Palma', pris: '💰', specialitet: 'Historiskt kafé sedan 1700-talet', bästRätt: 'Ensaïmada med crema + xocolata (drickchoklad)', insiderTips: 'Det äldsta kaféet på Mallorca. Frukost här kl 08–10 är obligatorisk.' },
    { namn: "Mercat de l'Olivar", adress: "Plaça de l'Olivar, Palma", pris: '💰', specialitet: 'Lokalt matmarknad med barer och tapas', bästRätt: 'Vad som helst från fiskedisken – direkt från havet', insiderTips: 'Köp färsk fisk på nedervåningen, gå upp och be en bar laga den. Obeskrivlig upplevelse.' },
    { namn: 'Calatrava Bistro', adress: 'Carrer dels Calatrava, gamla stan', pris: '💰💰', specialitet: 'Mysig bistro i hjärtat av gamla Palma', bästRätt: 'Dagsmenyn (14:00–16:00) – 3 rätter + vin för 18 €', insiderTips: 'Bäst förbordsköp i Palma – den dolda Dagsmenyn listas inte på hemsidan, fråga personalen.' },
  ],
};

const sections = [
  { key: 'michelin', label: 'Michelinkrogar', kicker: 'Haute cuisine', items: restauranger.michelin },
  { key: 'tapas', label: 'Bästa tapas', kicker: 'Bar & små rätter', items: restauranger.tapas },
  { key: 'fisk', label: 'Fisk och skaldjur', kicker: 'Havet på tallriken', items: restauranger.fisk },
  { key: 'lokalt', label: 'Lokalt & budget', kicker: 'Autentiskt och prisvärt', items: restauranger.lokalt },
];

export default function BästaRestaurangerPalma() {
  return (
    <div className={styles.page}>
      <HeroImage
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
        alt="Dukat restaurangbord med mallorcanska tapas och färska råvaror i Palma"
        kicker="Matguide · 2026"
        title="15 bästa restaurangerna i Palma"
        subtitle="Handplockade av en lokal – inte TripAdvisor-rankade. Från Michelinstjärnor till 1 €-frukost."
        height="52vh"
      />

      <div className={styles.container}>
        <div className={styles.priceBox}>
          <p className={styles.priceLabel}>Prisskala</p>
          <div className={styles.priceGrid}>
            <Row tier={1} label="Under 20 €" />
            <Row tier={2} label="20–40 €" />
            <Row tier={3} label="40–70 €" />
            <Row tier={4} label="70+ €" />
          </div>
        </div>

        {sections.map(section => (
          <section key={section.key} className={styles.section}>
            <p className={styles.kicker}>{section.kicker}</p>
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
            <Link href="/mat" className={styles.ctaButton}>SE MATGUIDEN</Link>
            <Link href="/vingardar" className={styles.ctaButtonGhost}>VINGÅRDAR</Link>
          </div>
        </div>
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
        <PriceTag tier={tierFromEmoji(r.pris)} />
      </div>
      <p className={styles.address}>
        <IconPin size={12} /> {r.adress}
      </p>
      <p className={styles.speciality}>{r.specialitet}</p>
      <div className={styles.infoList}>
        <InfoBlock label="Beställ detta" icon={<IconBookmark size={12} stroke={2} />} tone="warm">{r.bästRätt}</InfoBlock>
        <InfoBlock label="Insider-tips" icon={<IconInfo size={12} stroke={2} />} tone="teal">{r.insiderTips}</InfoBlock>
      </div>
    </article>
  );
}

function InfoBlock({ label, icon, tone, children }: { label: string; icon: React.ReactNode; tone: 'warm' | 'teal'; children: React.ReactNode }) {
  return (
    <div className={`${styles.info} ${tone === 'warm' ? styles.infoWarm : styles.infoTeal}`}>
      <p className={styles.infoLabel}>
        {icon} {label}
      </p>
      <p className={styles.infoText}>{children}</p>
    </div>
  );
}
