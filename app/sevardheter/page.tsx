import Image from 'next/image';
import { IconPin, IconClock, IconBulb, IconStar, IconInfo } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import styles from './sevardheter.module.css';

const notisKlass: Record<string, string> = {
  varning: styles.note_varning,
  tips: styles.note_tips,
  bast: styles.note_bast,
};

const sevardheter = [
  {
    namn: 'La Seu – Palmas katedral',
    plats: 'Palma',
    kategori: 'Kyrka & kloster',
    beskrivning: 'En av Europas mest imponerande gotiska katedraler, påbörjad 1229. Antoni Gaudí renoverade interiören på 1900-talet. Utsikten från strandpromenaden är magnifik.',
    tips: 'Gratis att besöka vardagar före kl. 10. Ljusspelet genom rosfönstret sker bara två gånger per år.',
    oppet: 'Mån–lör 10–17, sön stängd för turister',
    bild: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85',
    maps: 'https://maps.google.com/?q=La+Seu+Cathedral+Palma+Mallorca',
    redaktionellt: { typ: 'tips', text: 'Gratis entré vardagar före kl. 10 – kom kl. 9.30 för bästa ljuset genom rosfönstret' },
  },
  {
    namn: 'Castell de Bellver',
    plats: 'Palma',
    kategori: 'Slott & borg',
    beskrivning: 'Unikt runt slott från 1300-talet på en kulle med fantastisk utsikt över Palma och bukten. Tidigare kungligt sommarresidens och fängelse.',
    tips: 'Bästa utsiktsplatsen över Palma – perfekt vid solnedgång.',
    oppet: 'Tis–sön 10–19 (sommar), 10–18 (vinter)',
    bild: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1600&q=85',
    maps: 'https://maps.google.com/?q=Bellver+Castle+Palma+Mallorca',
    redaktionellt: { typ: 'bast', text: 'Bäst för: Solnedgångsutsikt över Palma – kom kl. 18 på sommaren' },
  },
  {
    namn: 'Kartusianklostret i Valldemossa',
    plats: 'Valldemossa',
    kategori: 'Kyrka & kloster',
    beskrivning: 'Historiskt kloster där Frédéric Chopin och George Sand bodde vintern 1838–39. Museer, konst och Mallorcas vackraste bergsby runt om.',
    tips: 'Kom tidigt på morgonen innan turistbussarna anländer kl. 10.',
    oppet: 'Mån–lör 9.30–18.30, sön 10–13',
    bild: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85',
    maps: 'https://maps.google.com/?q=Valldemossa+Monastery+Mallorca',
    redaktionellt: { typ: 'varning', text: 'Fullsatt 10–14 på sommaren – kom vid öppning eller efter kl. 15' },
  },
  {
    namn: 'Coves del Drac',
    plats: 'Porto Cristo',
    kategori: 'Natur & grottor',
    beskrivning: 'Dramatiska underjordiska grottor med en av världens största underjordiska sjöar – Llac Martel. Klassisk konsert på vattnet ingår i besöket.',
    tips: 'Boka biljetter online i förväg – populäraste attraktionen på ön.',
    oppet: 'Dagligen 10–17 (apr–okt), 10–15 (nov–mar)',
    bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80',
    maps: 'https://maps.google.com/?q=Coves+del+Drach+Porto+Cristo+Mallorca',
    redaktionellt: { typ: 'tips', text: 'Boka alltid online – kassaköerna kan vara 1–2 timmar på högsäsong' },
  },
  {
    namn: 'Serra de Tramuntana',
    plats: 'Nordvästra Mallorca',
    kategori: 'Natur & landskap',
    beskrivning: 'På Unescos världsarvslista sedan 2011. Dramatisk bergskedja med vandringsleder, olivlundar och medeltida byar. Högsta topp: Puig Major på 1 445 m.',
    tips: 'GR 221 ”Ruta de Pedra en Sec” är en av Europas vackraste vandringsleder.',
    oppet: 'Alltid öppet – ta med karta och vatten',
    bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80',
    maps: 'https://maps.google.com/?q=Serra+de+Tramuntana+Mallorca',
    redaktionellt: { typ: 'bast', text: 'Bäst för: Cykelentusiaster och vandrare – GR 221 är en av Europas vackraste leder' },
  },
  {
    namn: 'Cap de Formentor',
    plats: 'Norra Mallorca',
    kategori: 'Natur & landskap',
    beskrivning: 'Mallorcas dramatiska nordspets med klippor som stupar rakt ner i havet. Ikoniskt fyrtorn och en av öns vackraste utsiktsplatser.',
    tips: 'Biltrafiken är begränsad på sommaren – ta bussen från Port de Pollença.',
    oppet: 'Alltid öppet',
    bild: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80',
    maps: 'https://maps.google.com/?q=Cap+de+Formentor+Mallorca',
    redaktionellt: { typ: 'info', text: 'Biltillstånd krävs maj–oktober – ta bussen från Port de Pollença' },
  },
  {
    namn: "Palau de l'Almudaina",
    plats: 'Palma',
    kategori: 'Slott & borg',
    beskrivning: 'Kungligt palats bredvid La Seu, byggt på arabiska fundamenter. Officiellt residens för spanska kungafamiljen vid besök på Mallorca.',
    tips: 'Kombinera alltid med ett besök i katedralen – de ligger vägg i vägg.',
    oppet: 'Mån–fre 10–18, lör 10–14',
    bild: 'https://images.unsplash.com/photo-1548783300-a25c9c4fad6a?w=1600&q=85',
    maps: 'https://maps.google.com/?q=Palau+de+l+Almudaina+Palma+Mallorca',
    redaktionellt: { typ: 'tips', text: 'Kombinera alltid med La Seu – de ligger 50 meter från varandra' },
  },
  {
    namn: 'Sa Calobra',
    plats: 'Nordvästra Mallorca',
    kategori: 'Natur & landskap',
    beskrivning: 'En av Mallorcas mest spektakulära platser – nås via en legendarisk slingrande bergsväg eller med båt. Grottor och turkost vatten vid mynningen av Torrent de Pareis.',
    tips: 'Ta båten från Port de Sóller för den mest dramatiska upplevelsen.',
    oppet: 'Alltid öppet',
    bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80',
    maps: 'https://maps.google.com/?q=Sa+Calobra+Mallorca',
    redaktionellt: { typ: 'varning', text: 'Mötande trafik på slingrande bergsväg – kör lugnt och parkera tidigt' },
  },
  {
    namn: 'Fundació Miró Mallorca',
    plats: 'Palma',
    kategori: 'Konst & kultur',
    beskrivning: 'Joan Mirós egen ateljé och museum i Palma, designat av Josep Lluís Sert. Stor samling av Mirós konst i den studio han använde fram till sin död 1983.',
    tips: 'En av Europas bäst bevarade konstnärsateljéer – unik upplevelse.',
    oppet: 'Tis–lör 10–18, sön 10–15',
    bild: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80',
    maps: 'https://maps.google.com/?q=Fundacio+Miro+Mallorca+Palma',
    redaktionellt: { typ: 'bast', text: 'Bäst för: Konstälskare – ateljén är en av Europas bäst bevarade' },
  },
  {
    namn: "Coves d'Artà",
    plats: 'Capdepera',
    kategori: 'Natur & grottor',
    beskrivning: 'Dramatiska grottor vid nordostkusten med enorma stalaktiter och stalagmiter. Jules Verne ska ha inspirerats av grottan när han skrev Vingt mille lieues sous les mers.',
    tips: 'Mindre välkänd än Coves del Drac – färre turister och lika imponerande.',
    oppet: 'Dagligen 10–17',
    bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80',
    maps: 'https://maps.google.com/?q=Coves+d+Arta+Mallorca',
    redaktionellt: { typ: 'info', text: 'Mycket färre turister än Coves del Drac – lika vackert men lugnare' },
  },
  {
    namn: 'Museu de Mallorca',
    plats: 'Palma',
    kategori: 'Konst & kultur',
    beskrivning: 'Mallorcas viktigaste historiska museum i ett vackert renässanspalats i gamla stan. Arkeologi, konst och historia från förhistorisk tid till 1900-talet.',
    tips: 'Gratis entré söndagar. Gamla stadens gränder runt museet är värda ett strövtåg.',
    oppet: 'Tis–lör 10–19, sön 10–14',
    bild: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80',
    maps: 'https://maps.google.com/?q=Museu+de+Mallorca+Palma',
    redaktionellt: { typ: 'tips', text: 'Gratis söndagar – perfekt att kombinera med en promenad i gamla stan' },
  },
  {
    namn: 'Santuari de Lluc',
    plats: 'Escorca',
    kategori: 'Kyrka & kloster',
    beskrivning: 'Mallorcas heligaste plats – ett kloster i Tramuntanabergen som pilgrimsmål sedan 1200-talet. Vacker natur, museum och den svarta madonnan ”La Moreneta”.',
    tips: 'Stanna till lunch i klosterrestaurangen – god och autentisk mallorkinsk mat.',
    oppet: 'Dagligen 10–18',
    bild: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85',
    maps: 'https://maps.google.com/?q=Santuari+de+Lluc+Mallorca',
    redaktionellt: { typ: 'bast', text: 'Bäst för: En lugn dag i bergen borta från strandlivet – restaurangen är utmärkt' },
  },
];

export default function SevardheterPage() {
  return (
    <div className={styles.page}>
      <HeroImage
        src="https://images.unsplash.com/photo-1548783300-a25c9c4fad6a"
        alt="La Seu-katedralen i Palma – en av öns mest ikoniska sevärdheter"
        kicker="Historia, natur och kultur"
        title="Sevärdheter på Mallorca"
        subtitle="12 utvalda sevärdheter – från gotiska katedraler till dramatiska grottor"
        height="55vh"
      />

      <div className={styles.inner}>
        <div className={styles.grid}>
          {sevardheter.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.media}>
                <Image src={s.bild} alt={s.namn} width={600} height={200} className={styles.image} loading="lazy" />
                <div className={styles.category}>{s.kategori}</div>
              </div>
              <div className={styles.body}>
                <h2 className={styles.title}>{s.namn}</h2>
                <p className={styles.place}><IconPin size={12} /> {s.plats} · <IconClock size={12} /> {s.oppet}</p>
                <p className={styles.description}>{s.beskrivning}</p>
                <div className={styles.tip}><IconBulb size={14} className={styles.tipIcon} /> {s.tips}</div>
                {s.redaktionellt && (
                  <div className={`${styles.note} ${notisKlass[s.redaktionellt.typ] ?? ''}`}>
                    <span className={styles.noteIcon}>
                      {s.redaktionellt.typ === 'varning' ? <IconInfo size={16} /> : s.redaktionellt.typ === 'tips' ? <IconStar size={16} /> : s.redaktionellt.typ === 'bast' ? <IconStar size={16} /> : <IconBulb size={16} />}
                    </span>
                    <span>{s.redaktionellt.text}</span>
                  </div>
                )}
                <a href={s.maps} target="_blank" rel="noopener noreferrer" className={styles.mapButton}>
                  Visa på karta ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}