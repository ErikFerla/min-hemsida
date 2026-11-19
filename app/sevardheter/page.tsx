import Image from 'next/image';
import { IconPin, IconClock } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import TipBox from '@/components/TipBox';
import LastChecked from '@/app/components/LastChecked';
import styles from './sevardheter.module.css';

// Redaktionell notis som enkel text med statusprick (5.3) – kortets enda ruta är tipset (TipBox).
const notisKlass: Record<string, string> = {
  varning: styles.note_varning,
  tips: styles.note_tips,
  bast: styles.note_bast,
  info: styles.note_info,
};

const sevardheter = [
  {
    namn: 'La Seu – Palmas katedral',
    plats: 'Palma',
    kategori: 'Kyrka & kloster',
    beskrivning: 'En av Europas mest imponerande gotiska katedraler, påbörjad 1229. Antoni Gaudí renoverade interiören på 1900-talet. Utsikten från strandpromenaden är magnifik.',
    tips: 'Bor du på Mallorca går du in gratis på fredagar (visa id-handling i kassan). Ljusspelet genom rosfönstret sker bara två gånger per år.',
    oppet: 'Mån–fre ca 10–17.15 (apr–nov, kortare på vintern), lör ca 10–14.15, sön stängt för besökare',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Catedral_de_Santa_Mar%C3%ADa_de_Palma_de_Mallorca_in_2024.jpg/960px-Catedral_de_Santa_Mar%C3%ADa_de_Palma_de_Mallorca_in_2024.jpg',
    bildAlt: "La Seu, Palmas gotiska katedral, sedd från Parc de la Mar",
    maps: 'https://maps.google.com/?q=La+Seu+Cathedral+Palma+Mallorca',
    redaktionellt: { typ: 'tips', text: 'Takterrasserna visas med en egen, dyrare biljett – inte för barn under 9 år' },
  },
  {
    namn: 'Castell de Bellver',
    plats: 'Palma',
    kategori: 'Slott & borg',
    beskrivning: 'Unikt runt slott från 1300-talet på en kulle med fantastisk utsikt över Palma och bukten. Tidigare kungligt sommarresidens och fängelse.',
    tips: 'Bästa utsiktsplatsen över Palma. I november–januari går solen ner före stängning.',
    oppet: 'Tis–lör 10–19 (apr–sep), 10–18 (okt–mar), sön och helgdagar 10–15, mån stängt',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/035_2015_06_02_Castell_de_Bellver.jpg/1920px-035_2015_06_02_Castell_de_Bellver.jpg',
    bildAlt: "Den runda borggården med två våningar arkader i Castell de Bellver",
    maps: 'https://maps.google.com/?q=Bellver+Castle+Palma+Mallorca',
    redaktionellt: { typ: 'bast', text: 'Bäst för: Utsikten över Palma och bukten – på sommaren stänger slottet långt före solnedgången' },
  },
  {
    namn: 'Kartusianklostret i Valldemossa',
    plats: 'Valldemossa',
    kategori: 'Kyrka & kloster',
    beskrivning: 'Historiskt kloster där Frédéric Chopin och George Sand bodde vintern 1838–39. Museer, konst och Mallorcas vackraste bergsby runt om.',
    tips: 'Kom tidigt på morgonen innan turistbussarna anländer.',
    oppet: 'Mån–lör från ca kl. 10, kortare dagar på vintern – söndagsöppet varierar',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Valldemossa_Cartoixa_Patio-3875.jpg/960px-Valldemossa_Cartoixa_Patio-3875.jpg',
    bildAlt: "Trädgårdsgården i Kartusianklostret i Valldemossa",
    maps: 'https://maps.google.com/?q=Valldemossa+Monastery+Mallorca',
    redaktionellt: { typ: 'varning', text: 'Mest folk mitt på dagen på sommaren – kom vid öppning eller sent på eftermiddagen' },
  },
  {
    namn: 'Coves del Drac',
    plats: 'Porto Cristo',
    kategori: 'Natur & grottor',
    beskrivning: 'Dramatiska underjordiska grottor med en av världens största underjordiska sjöar – Llac Martel. Klassisk konsert på sjön och båttur ingår i biljetten.',
    tips: 'Boka biljett med insläppstid online i förväg – en av öns mest besökta attraktioner.',
    oppet: 'Dagligen med fasta insläppstider (färre på vintern), stängt 25 dec och 1 jan',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Coves_del_Drac_21.jpg/1920px-Coves_del_Drac_21.jpg',
    bildAlt: "Droppstenar speglas i den underjordiska sjön i Coves del Drac",
    maps: 'https://maps.google.com/?q=Coves+del+Drach+Porto+Cristo+Mallorca',
    redaktionellt: { typ: 'tips', text: 'Boka alltid online – köerna till kassan kan bli långa på högsäsong' },
  },
  {
    namn: 'Serra de Tramuntana',
    plats: 'Nordvästra Mallorca',
    kategori: 'Natur & landskap',
    beskrivning: 'På Unescos världsarvslista sedan 2011. Dramatisk bergskedja med vandringsleder, olivlundar och medeltida byar. Högsta topp: Puig Major på 1 445 m.',
    tips: 'GR 221 ”Ruta de Pedra en Sec” är en av Europas vackraste vandringsleder.',
    oppet: 'Alltid öppet – ta med karta och vatten',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Serra_de_Tramuntana_Valldemossa_01.jpg/960px-Serra_de_Tramuntana_Valldemossa_01.jpg',
    bildAlt: "Olivträd framför bergen i Serra de Tramuntana vid Valldemossa",
    maps: 'https://maps.google.com/?q=Serra+de+Tramuntana+Mallorca',
    redaktionellt: { typ: 'bast', text: 'Bäst för: Cykelentusiaster och vandrare – GR 221 är en av Europas vackraste leder' },
  },
  {
    namn: 'Cap de Formentor',
    plats: 'Norra Mallorca',
    kategori: 'Natur & landskap',
    beskrivning: 'Mallorcas dramatiska nordspets med klippor som stupar rakt ner i havet. Ikoniskt fyrtorn och en av öns vackraste utsiktsplatser.',
    tips: 'Vägen ut till fyren är stängd för privatbilar dagtid på sommarhalvåret – ta TIB-bussen från Port de Pollença.',
    oppet: 'Alltid öppet',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Far_de_Formentor_-_Majorca_-_01.jpg/960px-Far_de_Formentor_-_Majorca_-_01.jpg',
    bildAlt: "Den vita fyren på Cap de Formentor mot blå himmel",
    maps: 'https://maps.google.com/?q=Cap+de+Formentor+Mallorca',
    redaktionellt: { typ: 'info', text: 'Privatbilar får inte köra ut till fyren dagtid 15 maj–18 oktober (2026) – ta buss 334 från Port de Pollença' },
  },
  {
    namn: "Palau de l'Almudaina",
    plats: 'Palma',
    kategori: 'Slott & borg',
    beskrivning: 'Kungligt palats bredvid La Seu, byggt på arabiska fundamenter. Officiellt residens för spanska kungafamiljen vid besök på Mallorca.',
    tips: 'Kombinera alltid med ett besök i katedralen – de ligger vägg i vägg.',
    oppet: 'Nyöppnat i juli 2026 efter renovering – tiderna varierar, se Patrimonio Nacional',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/335_Palau_de_l%27Almudaina_%28Palma%29%2C_palau_del_Rei%2C_fa%C3%A7ana_sud.jpg/960px-335_Palau_de_l%27Almudaina_%28Palma%29%2C_palau_del_Rei%2C_fa%C3%A7ana_sud.jpg',
    bildAlt: "Arkaderna på Palau de l'Almudainas södra fasad i Palma",
    maps: 'https://maps.google.com/?q=Palau+de+l+Almudaina+Palma+Mallorca',
    redaktionellt: { typ: 'tips', text: 'Kombinera alltid med La Seu – de ligger vägg i vägg' },
  },
  {
    namn: 'Sa Calobra',
    plats: 'Nordvästra Mallorca',
    kategori: 'Natur & landskap',
    beskrivning: 'En av Mallorcas mest spektakulära platser – nås via en legendarisk slingrande bergsväg eller med båt. Grottor och turkost vatten vid mynningen av Torrent de Pareis.',
    tips: 'Ta båten från Port de Sóller för den mest dramatiska upplevelsen.',
    oppet: 'Alltid öppet',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Sa_Calobra_%282016.05.17%29.jpg/960px-Sa_Calobra_%282016.05.17%29.jpg',
    bildAlt: "Serpentinvägen som slingrar sig ner mot Sa Calobra",
    maps: 'https://maps.google.com/?q=Sa+Calobra+Mallorca',
    redaktionellt: { typ: 'varning', text: 'Mötande trafik på slingrande bergsväg – kör lugnt och parkera tidigt' },
  },
  {
    namn: 'Fundació Miró Mallorca',
    plats: 'Palma',
    kategori: 'Konst & kultur',
    beskrivning: 'Joan Mirós egen ateljé och museum i Palma, designat av Josep Lluís Sert. Stor samling av Mirós konst i den studio han använde fram till sin död 1983.',
    tips: 'En av Europas bäst bevarade konstnärsateljéer – unik upplevelse.',
    oppet: 'Tis–lör 10–18, sön 10–15, mån stängt',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Fundaci%C3%B3_Pilar_i_Joan_Mir%C3%B3_Aussen_1.jpg/960px-Fundaci%C3%B3_Pilar_i_Joan_Mir%C3%B3_Aussen_1.jpg',
    bildAlt: "Fundació Pilar i Joan Mirós byggnader med vattenspeglar i Palma",
    maps: 'https://maps.google.com/?q=Fundacio+Miro+Mallorca+Palma',
    redaktionellt: { typ: 'bast', text: 'Bäst för: Konstälskare – ateljén är en av Europas bäst bevarade' },
  },
  {
    namn: "Coves d'Artà",
    plats: 'Canyamel, Capdepera',
    kategori: 'Natur & grottor',
    beskrivning: 'Dramatiska grottor vid nordostkusten med enorma stalaktiter och stalagmiter. Jules Verne ska ha inspirerats av grottan när han skrev Vingt mille lieues sous les mers.',
    tips: 'Mindre välkänd än Coves del Drac – färre turister och lika imponerande.',
    oppet: 'Dagligen ca 10–17 (nov–apr), ca 10–18 (maj–okt)',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Coves_d%27Art%C3%A0_41.jpg/960px-Coves_d%27Art%C3%A0_41.jpg',
    bildAlt: "Stor upplyst droppstensformation i Coves d'Artà",
    maps: 'https://maps.google.com/?q=Coves+d+Arta+Mallorca',
    redaktionellt: { typ: 'info', text: 'Mycket färre turister än Coves del Drac – lika vackert men lugnare' },
  },
  {
    namn: 'Museu de Mallorca',
    plats: 'Palma',
    kategori: 'Konst & kultur',
    beskrivning: 'Mallorcas viktigaste historiska museum i ett vackert renässanspalats i gamla stan. Arkeologi, konst och historia från förhistorisk tid till 1900-talet.',
    tips: 'Gamla stadens gränder runt museet är värda ett strövtåg.',
    oppet: 'Kontrollera aktuella öppettider på museets webbplats',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Museu_de_Mallorca._Vista_del_port_de_Palma.jpg/960px-Museu_de_Mallorca._Vista_del_port_de_Palma.jpg',
    bildAlt: "Målning ur Museu de Mallorcas samling som visar Palmas hamn på 1800-talet",
    maps: 'https://maps.google.com/?q=Museu+de+Mallorca+Palma',
    redaktionellt: { typ: 'tips', text: 'Perfekt att kombinera med en promenad i gamla stan' },
  },
  {
    namn: 'Santuari de Lluc',
    plats: 'Escorca',
    kategori: 'Kyrka & kloster',
    beskrivning: 'Mallorcas heligaste plats – ett kloster i Tramuntanabergen som pilgrimsmål sedan 1200-talet. Vacker natur, museum och den svarta madonnan ”La Moreneta”.',
    tips: 'Stanna till lunch i klosterrestaurangen – god och autentisk mallorkinsk mat.',
    oppet: 'Basilikan är öppen dagligen – museets tider varierar',
    bild: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Santuari_de_Lluc_-_View_from_Monte_del_Rosario.jpg/960px-Santuari_de_Lluc_-_View_from_Monte_del_Rosario.jpg',
    bildAlt: "Santuari de Lluc med klosterbyggnaderna omgivna av skog",
    maps: 'https://maps.google.com/?q=Santuari+de+Lluc+Mallorca',
    redaktionellt: { typ: 'bast', text: 'Bäst för: En lugn dag i bergen borta från strandlivet – restaurangen är utmärkt' },
  },
];

export default function SevardheterPage() {
  return (
    <div className={styles.page}>
      <HeroImage
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/0057-Catedral_von_Palma_de_Mallorca.JPG/1920px-0057-Catedral_von_Palma_de_Mallorca.JPG"
        alt="La Seu, Palmas katedral, reser sig över hamnen och strandpromenaden"
        kicker="Historia, natur och kultur"
        title="Sevärdheter på Mallorca"
        subtitle="12 utvalda sevärdheter – från gotiska katedraler till dramatiska grottor"
        height="55vh"
      />

      <div className={styles.inner}>
        <div className={styles.grid}>
          {sevardheter.map((s, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.media}>
                <Image src={s.bild} alt={s.bildAlt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px" loading="lazy" />
                <span className={styles.category}>{s.kategori}</span>
              </div>
              <div className={styles.body}>
                <h2 className={styles.title}>{s.namn}</h2>
                <p className={styles.place}>
                  <span className={styles.placeItem}><IconPin size={12} /> {s.plats}</span>
                  <span className={styles.placeItem}><IconClock size={12} /> {s.oppet}</span>
                </p>
                <p className={styles.description}>{s.beskrivning}</p>
                <TipBox variant="compact" heading="Tips" as="p" className={styles.tip}>
                  <p>{s.tips}</p>
                </TipBox>
                {s.redaktionellt && (
                  <p className={`${styles.note} ${notisKlass[s.redaktionellt.typ] ?? ''}`}>
                    {s.redaktionellt.text}
                  </p>
                )}
                <div className={styles.actions}>
                  <a href={s.maps} target="_blank" rel="noopener noreferrer" className="link-arrow">
                    Visa på karta ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <LastChecked
          date="2026-11-18"
          note="Öppettider ändras ofta med säsongen – kontrollera alltid hos sevärdheten innan du åker."
          sources={[
            { label: 'Catedral de Mallorca', href: 'https://catedraldemallorca.org' },
            { label: 'CAIB – geotop Puig Major (1 445 m)', href: 'https://intranet.caib.es/geoturfront/fichero/download/466/LIG%20PUIG%20MAJOR%20CAS.pdf' },
            { label: 'Castell de Bellver (Ajuntament de Palma)', href: 'https://castelldebellver.palma.cat' },
            { label: 'Coves del Drac', href: 'https://www.cuevasdeldrach.com' },
            { label: 'DGT: trafik till Formentor 2026', href: 'https://www.dgt.es/conoce-el-estado-del-trafico/rutas-de-interes/trafico-acceso-faro-de-formentor/' },
            { label: 'Patrimonio Nacional: La Almudaina', href: 'https://www.patrimonionacional.es' },
            { label: 'Fundació Miró Mallorca', href: 'https://miromallorca.com' },
          ]}
        />
      </div>
    </div>
  );
}