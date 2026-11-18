import Link from 'next/link';
import { IconCalendar, IconPin } from '@/components/Icons';
import { kommandeEvenemang, type Kategori } from '@/app/evenemang/data';
import s from './section.module.css';
import styles from './SectionEvents.module.css';

// Dekorativa stämningsbilder (alt="" eftersom kortets text redan säger vad det är). Bilderna
// visar typen av evenemang, inte själva tillfället – källor och licenser i data/credits/d3.ts.
const BILD = {
  eld: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/AtiarFoc_2011_%285380513659%29.jpg/1920px-AtiarFoc_2011_%285380513659%29.jpg',
  firo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Port_de_S%C3%B3ller._Fir%C3%B3._Can_Gener%C3%B3s._Batalla.jpg/960px-Port_de_S%C3%B3ller._Fir%C3%B3._Can_Gener%C3%B3s._Batalla.jpg',
  regatta: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Regata_Conde_de_Barcelona_-_panoramio.jpg/960px-Regata_Conde_de_Barcelona_-_panoramio.jpg',
  cykel: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/UPO_5863_%2854010340987%29.jpg/960px-UPO_5863_%2854010340987%29.jpg',
  marknad: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Dijous_bo.jpg/960px-Dijous_bo.jpg',
  parad: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cabalgata_de_Reyes_Magos_2022-JErez-IMG_20220105_173807.jpg/960px-Cabalgata_de_Reyes_Magos_2022-JErez-IMG_20220105_173807.jpg',
  konsert: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Mallorca_Live_Summer_2020.jpg/960px-Mallorca_Live_Summer_2020.jpg',
  mat: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pa_amb_oli_con_jam%C3%B3n_y_queso.jpg/1920px-Pa_amb_oli_con_jam%C3%B3n_y_queso.jpg',
  vin: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Vinya_a_Estellencs_%28Mallorca%29.JPG/960px-Vinya_a_Estellencs_%28Mallorca%29.JPG',
  palma: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Catedral_de_Santa_Mar%C3%ADa_de_Palma_de_Mallorca_in_2024.jpg/960px-Catedral_de_Santa_Mar%C3%ADa_de_Palma_de_Mallorca_in_2024.jpg',
};

const kategoriBild: Record<Kategori, string> = {
  'Sport': BILD.cykel,
  'Musik': BILD.konsert,
  'Kultur': BILD.palma,
  'Mat & dryck': BILD.mat,
  'Marknad': BILD.marknad,
  'Familj': BILD.parad,
};

/** Evenemang där en mer träffande bild finns än kategorins. */
const evenemangBild: Partial<Record<string, string>> = {
  'sant-antoni': BILD.eld,
  'sant-sebastia': BILD.eld,
  'nit-de-sant-joan': BILD.eld,
  'firo-soller': BILD.firo,
  'moros-pollenca': BILD.firo,
  'princesa-sofia': BILD.regatta,
  'palmavela': BILD.regatta,
  'copa-del-rey': BILD.regatta,
  'palma-marathon': BILD.palma,
  'festa-des-vermar': BILD.vin,
};

// Startsidans urval: de sex närmaste evenemangen. Datumet beräknas vid rendering –
// sidan som använder komponenten bör revalideras dagligen.
export default function SectionEvents() {
  const urval = kommandeEvenemang().slice(0, 6);

  return (
    <section className={`${s.pageSection} ${s.surface}`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={s.label}>På Mallorca</p>
            <h2 className={`${s.title} ${styles.uppercase}`}>Kommande evenemang</h2>
            <div className={s.divider} />
            <p className={styles.intro}>
              Fiestor, mässor, cykellopp och regattor året runt. Välj dina resdatum på evenemangssidan så ser du vad som händer – och vilka byar som har marknad – under just din resa.
            </p>
            <Link href="/evenemang#resekalender" className={s.btnPrimary}>
              SE VAD SOM HÄNDER UNDER DIN RESA →
            </Link>
          </div>
          <div className={styles.grid}>
            {urval.map(e => (
              <article key={e.key} className={styles.card}>
                <div className={styles.media}>
                  <img src={evenemangBild[e.id] ?? kategoriBild[e.kategori]} alt="" loading="lazy" decoding="async" width={600} height={140} className={styles.image} />
                  <div className={styles.category}>{e.kategori}</div>
                </div>
                <div className={styles.body}>
                  <p className={styles.meta}>
                    <IconCalendar size={12} /> {e.datum} · <IconPin size={12} /> {e.plats}
                  </p>
                  {e.status === 'preliminärt' && <p className={styles.unconfirmed}>Preliminärt datum</p>}
                  <h3 className={styles.name}>{e.namn}</h3>
                  <p className={styles.desc}>{e.beskrivning}</p>
                  <a href={e.källa.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {e.källa.label} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
