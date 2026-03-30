'use client';

import styles from './strander.module.css';

const beachSections = [
  {
    title: 'Barnvänliga stränder',
    description: 'Lugna, grunda stränder perfekta för familjer',
    beaches: [
      {
        name: 'Playa de Muro',
        description: 'En av Mallorcas längsta och svalaste stränder med grunda vatten och fin sand.',
        parking: 'Stor parkering',
        facilities: 'Stallningar, duschar, restauranger',
        difficulty: 'Lätt',
        lat: 39.8234,
        lon: 3.1089,
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80'
      },
      {
        name: 'Cala Millor',
        description: 'Populär familjestrand med rent vatten och många faciliteter längs stranden.',
        parking: 'Parkering tillgänglig',
        facilities: 'Stallningar, bar, restaurang, vattenaktiviteter',
        difficulty: 'Lätt',
        lat: 39.5847,
        lon: 3.3891,
        imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80'
      },
      {
        name: 'Playa de Palma',
        description: 'Lång, bred strand nära Palma med grunda vatten och gott om utrymme.',
        parking: 'Flera parkeringar',
        facilities: 'Många stallningar, restauranger, aktiviteter',
        difficulty: 'Lätt',
        lat: 39.5063,
        lon: 2.7386,
        imageUrl: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80'
      },
      {
        name: 'Santa Ponsa',
        description: 'Vacker strand med grunda vatten och många faciliteter för barn.',
        parking: 'Parkering nära strand',
        facilities: 'Stallningar, bar, aktiva barnaktiviteter',
        difficulty: 'Lätt',
        lat: 39.5089,
        lon: 2.4789,
        imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600&q=80'
      },
      {
        name: 'Cala Romantica',
        description: 'Liten, skyddad strand med kristallklart och varmt vatten för små barn.',
        parking: 'Parkeringsmöjligheter',
        facilities: 'Bar, några stallningar, lugn atmosfär',
        difficulty: 'Lätt',
        lat: 39.5456,
        lon: 3.3712,
        imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80'
      }
    ]
  },
  {
    title: 'Stränder med högst betyg',
    description: 'Mest omtyckta och vackraste stränder på Mallorca',
    beaches: [
      {
        name: 'Cala Agulla',
        description: 'En av Mallorcas vackraste stränder med turkos vatten och fri sandstrand.',
        parking: 'Begränsad parkering',
        facilities: 'Stallningar, bar, duschar',
        difficulty: 'Lätt',
        lat: 39.7234,
        lon: 3.4567,
        imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80'
      },
      {
        name: 'Es Trenc',
        description: 'Spektakulär vit sandstrand med obebyggd naturlig miljö och vildsint vacker utsikt.',
        parking: 'Parkering vid strand',
        facilities: 'Minimal - endast några bars',
        difficulty: 'Lätt',
        lat: 39.3456,
        lon: 2.9876,
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
      },
      {
        name: 'Cala Mondargo',
        description: 'Skyddad liten strand omgiven av skog och medelhavsnatur.',
        parking: 'Parkering tillgänglig',
        facilities: 'Bar, stallningar, snorkling',
        difficulty: 'Lätt',
        lat: 39.3567,
        lon: 3.2134,
        imageUrl: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=600&q=80'
      },
      {
        name: 'Cala Llombards',
        description: 'Pittoresk strand med höga klippor och kristallklart vatten.',
        parking: 'Begränsad parkering',
        facilities: 'En bar, sandstrand, dykning',
        difficulty: 'Lätt',
        lat: 39.3123,
        lon: 3.1567,
        imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80'
      },
      {
        name: 'Formentor',
        description: 'Strand vid Palma de Mallorcas nordligaste punkt med dramatisk scenery.',
        parking: 'Parkering vid liten by',
        facilities: 'Bar, restautrang, vacker scen',
        difficulty: 'Lågt',
        lat: 39.9234,
        lon: 3.1989,
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80'
      }
    ]
  },
  {
    title: 'Stränder som kräver en promenad',
    description: 'Lite svårare att nå men belönar besökaren med lugn och vacker natur',
    beaches: [
      {
        name: 'Cala Bóquer',
        description: 'Vacker strand genom ett litet dalgång, kräver ungefär 20 minuters promenad.',
        parking: 'Parkering vid utgångspunkten',
        facilities: 'Minimal - bara strand',
        difficulty: 'Medel',
        lat: 39.9089,
        lon: 3.1234,
        imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80'
      },
      {
        name: 'Cala des Moro',
        description: 'Spektakulär strand ned från höga klippor, en av öns vackraste.',
        parking: 'Parkering vid väg',
        facilities: 'Ingen, helt naturlig',
        difficulty: 'Medel',
        lat: 39.3234,
        lon: 3.2456,
        imageUrl: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&q=80'
      },
      {
        name: 'Cala Tuent',
        description: 'Isolerad strand bland höga klippor med kristallklart vatten för dykning.',
        parking: 'Parkering vid väg',
        facilities: 'Restaurang, snorkling',
        difficulty: 'Medel',
        lat: 39.8456,
        lon: 2.7234,
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'
      },
      {
        name: 'Platja de Llevant',
        description: 'Långsträckt vit sandstrand på Mallorcas nordöstra spets.',
        parking: 'Parkering i närliggande by',
        facilities: 'Minimal - lugn strand',
        difficulty: 'Medel',
        lat: 39.9456,
        lon: 3.2089,
        imageUrl: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=600&q=80'
      },
      {
        name: 'Cala Figuera',
        description: 'Liten pittoresk strand mellan klippor med traditionella fiskebåtar.',
        parking: 'Begränsad parkering',
        facilities: 'Två små restauranger',
        difficulty: 'Medel',
        lat: 39.3389,
        lon: 3.1678,
        imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&q=80'
      }
    ]
  },
  {
    title: 'Stränder med minst besökare',
    description: 'Lugna och avskilda stränder långt från massturismen',
    beaches: [
      {
        name: 'Cala Estreta',
        description: 'Nästan helt okänd strand med vita sand och turkost vatten, knappt någon turism.',
        parking: 'Begränsad parkering',
        facilities: 'Ingen',
        difficulty: 'Svart',
        lat: 39.6789,
        lon: 3.4123,
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80'
      },
      {
        name: 'Cala Matzoc',
        description: 'Väl gömd strand på sydkusten, perfekt för isolering.',
        parking: 'Mycket begränsad',
        facilities: 'Ingen',
        difficulty: 'Svart',
        lat: 39.7567,
        lon: 3.4234,
        imageUrl: 'https://images.unsplash.com/photo-1445620466293-d6316372ab59?w=600&q=80'
      },
      {
        name: 'Es Caragol',
        description: 'Liten stenig strand långt från vägen och städerna.',
        parking: 'Väl gömd parkering',
        facilities: 'Ingen',
        difficulty: 'Svart',
        lat: 39.3089,
        lon: 2.9456,
        imageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80'
      },
      {
        name: 'Platja de Ses Covetes',
        description: 'Dold strand på sydkusten mellan vegetation och mindre väl känd.',
        parking: 'Begränsad parkering',
        facilities: 'Minimal',
        difficulty: 'Svart',
        lat: 39.3512,
        lon: 2.9923,
        imageUrl: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=80'
      },
      {
        name: 'Cala en Tugores',
        description: 'Utomordentligt vacker men väl gömd strand vid Santanyi, knappt utvecklat.',
        parking: 'Mycket begränsad parkering',
        facilities: 'En liten bar',
        difficulty: 'Svart',
        lat: 39.5234,
        lon: 3.3456,
        imageUrl: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80'
      }
    ]
  }
];

export default function Strander() {
  const getDifficultyClass = (difficulty: string) => {
    switch(difficulty) {
      case 'Lätt':
        return styles.easyDifficulty;
      case 'Medel':
        return styles.mediumDifficulty;
      case 'Svart':
        return styles.hardDifficulty;
      default:
        return '';
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroTagline}>TURKOS VATTEN OCH VIT SAND</p>
          <h1 className={styles.heroTitle}>Mallorcas strander</h1>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.sectionsWrapper}>
          {beachSections.map((section, idx) => (
            <div key={idx} className={styles.section}>
              <h2 className={styles.sectionHeading}>{section.title}</h2>
              <p style={{ marginBottom: '24px', color: '#666', fontSize: '0.95rem' }}>
                {section.description}
              </p>
              <div className={styles.beachGrid}>
                {section.beaches.map((beach, beachIdx) => (
                  <div key={beachIdx} className={styles.beachCard}>
                    <div
                      className={styles.beachCardImage}
                      style={{ backgroundImage: `url('${beach.imageUrl}')` }}
                    />
                    <div className={styles.beachCardContent}>
                      <h3 className={styles.beachName}>{beach.name}</h3>
                      <p className={styles.beachDescription}>{beach.description}</p>
                      <div className={styles.beachInfo}>
                        <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Parkering:</span>
                          <span>{beach.parking}</span>
                        </div>
                        <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Faciliteter:</span>
                          <span>{beach.facilities}</span>
                        </div>
                        <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Svaarighet:</span>
                          <span className={getDifficultyClass(beach.difficulty)}>
                            {beach.difficulty}
                          </span>
                        </div>
                      </div>
                      <a
                        href={`https://www.google.com/maps?q=${beach.lat},${beach.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mapBtn}
                      >
                        🗺️ Visa på karta
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
