import Link from 'next/link';
import styles from './sevardheter.module.css';

const categories = [
  {
    title: 'GROTTOR OCH NATURUNDER',
    intro: 'Mallorca döljer ett fantastiskt underjordiskt landskap av grottor och sjöar.',
    items: [
      {
        name: 'Coves del Drach',
        description: 'En av Europas mest imponerande grottsystem med fyra sammanlänkade grottor och den underjordiska sjön Lago Martel. Konserter hålls inne i grottan med gondolbåtar på sjön - en overklig upplevelse.',
        info: 'Plats: Porto Cristo | Öppet: Dagligen | Tid: Ca 1 timme',
        image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c38a?w=600&q=80',
        lat: 39.5234,
        lon: 3.3312,
      },
      {
        name: 'Coves dels Hams',
        description: 'Fantastiska grottor med stalaktiter formade som fiskkrokar. Underjordiska sjöar och magisk ljussättning skapar en overklig atmosfär som du aldrig glömmer.',
        info: 'Plats: Porto Cristo | Öppet: Dagligen | Tid: Ca 45 min',
        image: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=600&q=80',
        lat: 39.5289,
        lon: 3.3198,
      },
      {
        name: "Coves d'Arta",
        description: 'Dramatiska grottor högt uppe i klippan med utsikt över havet. Kända för sina enorma stalaktiter - den högsta mäter över 22 meter. En av Mallorcas mest imponerande naturupplevelser.',
        info: 'Plats: Capdepera | Öppet: Dagligen | Tid: Ca 1 timme',
        image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&q=80',
        lat: 39.7123,
        lon: 3.4567,
      },
    ],
  },
  {
    title: 'HISTORISKA TORN OCH SLOTT',
    intro: 'Längs ostkusten reser sig medeltida torn och slott som berättar om en stormig historia.',
    items: [
      {
        name: 'Torre de Canyamel',
        description: 'Ett majestätiskt försvarstorn från 1300-talet som skyddade byborna från pirater. Tornet är perfekt bevarat och erbjuder fantastisk utsikt över kusten och havet.',
        info: 'Plats: Capdepera | Öppet: Variera | Tid: Ca 30 min',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80',
        lat: 39.7234,
        lon: 3.4123,
      },
      {
        name: 'Castell de Santueri',
        description: 'Ett av Mallorcas bäst bevarade medeltida slott 408 meter över havet. Arabiska rötter och spännande historia - och en av öns mest spektakulära panoramautsikter över ostkusten.',
        info: 'Plats: Felanitx | Öppet: Dagligen | Tid: Ca 1.5 timmar',
        image: 'https://images.unsplash.com/photo-1574236170878-7cc7d5c5f61d?w=600&q=80',
        lat: 39.4567,
        lon: 3.1789,
      },
      {
        name: 'Puig de Sant Salvador',
        description: 'Ett heligt berg med ett vackert kloster på toppen. Härifrån har man utsikt över hela ostkusten, Cabreras arkipelag och på klara dagar till och med Ibiza. En andlig och visuell upplevelse.',
        info: 'Plats: Felanitx | Öppet: Dagligen | Tid: Ca 2 timmar',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
        lat: 39.4389,
        lon: 3.1456,
      },
    ],
  },
  {
    title: 'NATURRESERVAT OCH UTSIKTSPLATSER',
    intro: 'Ostkusten bjuder på dramatiska naturlandskap och utsiktsplatser som tar andan ur en.',
    items: [
      {
        name: 'Parc Natural de Mondrago',
        description: 'Skyddat naturreservat med kristallklara vikar, klippformationer och rik flora. Hem till sällsynta fågelarter och en av Mallorcas finaste naturstränder - ett paradis för naturälskare.',
        info: 'Plats: Santanyi | Öppet: Dagligen | Tid: Halv dag',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
        lat: 39.3456,
        lon: 3.2123,
      },
      {
        name: 'Cap de Ses Salines',
        description: 'Mallorcas sydligaste udde med ett historiskt fyrtorn och enastående utsikt mot Cabrera-arkipelagen. Fågelskådare älskar platsen för de sällsynta arterna som rastar här under migration.',
        info: 'Plats: Ses Salines | Öppet: Alltid | Tid: Ca 1 timme',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
        lat: 39.2678,
        lon: 3.0523,
      },
      {
        name: 'Mirador de ses Puntes',
        description: 'En dramatisk utsiktsplats över ostkustens klippiga kuster och det azurblå havet. Solnedgångarna härifrån är legendariska bland fotografer - kom i god tid för bästa plats.',
        info: 'Plats: Manacor | Öppet: Alltid | Tid: Ca 30 min',
        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80',
        lat: 39.5678,
        lon: 3.3901,
      },
    ],
  },
  {
    title: 'CHARMING BYAR OCH MARKNADER',
    intro: 'Ostkusten är hem till några av Mallorcas mest autentiska och fotograferade fiskebyar.',
    items: [
      {
        name: 'Cala Figuera - Pittoresk Fiskevik',
        description: 'En av Mallorcas vackraste fiskebyar där vita hus speglas i det stilla vattnet. Gamla båt-garage gapar mot viken och fiskare lagar sina nät - en levande tavla som måste ses.',
        info: 'Plats: Santanyi | Öppet: Alltid | Tips: Tidigt på morgonen',
        image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&q=80',
        lat: 39.3289,
        lon: 3.1567,
      },
      {
        name: 'Porto Cristo - Hamnen',
        description: 'En pittoresk hamn där traditionella fiskebåtar ligger förtöjda bredvid moderna segelbåtar. Promenera längs kajen, besök de lokala restaurangerna och upplev en genuint mallorcansk atmosfär.',
        info: 'Plats: Manacor | Öppet: Alltid | Tips: Besök grottorna samtidigt',
        image: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=600&q=80',
        lat: 39.5234,
        lon: 3.3401,
      },
      {
        name: 'Santanyi - Marknaden',
        description: 'En av Mallorcas mest autentiska marknader med lokala hantverkare, färsk frukt, olivolja och traditionella mallorcanska produkter. Onsdagar och lördagar är de bästa dagarna att besöka.',
        info: 'Plats: Santanyi | Marknad: Ons & Lör | Tid: Ca 2 timmar',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80',
        lat: 39.3589,
        lon: 3.1234,
      },
    ],
  },
];

export default function SevardheterPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&q=80')" }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>HISTORIA, NATUR OCH KULTUR</p>
          <h1 className={styles.heroTitle}>SEVÄRDHETER PÅ OSTKUSTEN</h1>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.sectionsWrapper}>
          {categories.map((category, index) => (
            <div key={index} className={styles.section}>
              <h2 className={styles.sectionHeading}>{category.title}</h2>
              <p className={styles.sectionDescription}>{category.intro}</p>
              <div className={styles.beachGrid}>
                {category.items.map((item) => (
                  <article key={item.name} className={styles.beachCard}>
                    <div className={styles.beachCardImage} style={{ backgroundImage: `url('${item.image}')` }} />
                    <div className={styles.beachCardContent}>
                      <h3 className={styles.beachName}>{item.name}</h3>
                      <p className={styles.beachDescription}>{item.description}</p>
                      <div className={styles.beachInfo}>{item.info}</div>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lon}`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.mapBtn}
                      >
                        Visa på karta
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
