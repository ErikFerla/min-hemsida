import Link from 'next/link';
import styles from '../page.module.css';

const evenemang = [
  { namn: 'Mallorca 312 Cykellopp', datum: '26 april 2025', plats: 'Palma', beskrivning: 'Världens största cykellopp med 10 000 deltagare runt hela ön', länk: 'https://www.google.com/search?q=Mallorca+312+cykellopp', bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { namn: 'Copa del Rey Segelregatta', datum: '1-8 augusti 2025', plats: 'Palma', beskrivning: 'Kunglig segelregatta – en av Europas mest prestigefyllda', länk: 'https://www.google.com/search?q=Copa+del+Rey+Mallorca', bild: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80' },
  { namn: 'Fira de Sineu Marknad', datum: 'Varje onsdag', plats: 'Sineu', beskrivning: 'Mallorcas äldsta och mest autentiska marknad – levande djur, hantverk och lokal mat', länk: 'https://www.google.com/search?q=Fira+de+Sineu+marknad', bild: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80' },
  { namn: 'Palma International Boat Show', datum: 'April 2025', plats: 'Palma', beskrivning: 'Medelhavsregionens ledande båtmässa med lyxyachter och segelbåtar', länk: 'https://www.google.com/search?q=Palma+International+Boat+Show', bild: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80' },
  { namn: 'Magaluf Half Marathon', datum: 'Oktober 2025', plats: 'Magaluf', beskrivning: 'Populärt halvmaraton längs Mallorcas sydvästra kust', länk: 'https://www.google.com/search?q=Magaluf+Half+Marathon', bild: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&q=80' },
  { namn: 'PalmaVela Regatta', datum: 'Maj 2025', plats: 'Palma', beskrivning: 'Internationell segelregatta med tävlande från hela världen', länk: 'https://www.google.com/search?q=PalmaVela+Regatta', bild: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80' },
];

export default function SectionEvents() {
  return (
    <section className={styles.eventsSection}>
      <div className={styles.eventsLeft}>
        <h2 className={styles.eventsTitle}>KOMMANDE EVENEMANG</h2>
        <p className={styles.eventsText}>Mallorca är värd till många evenemang under året – cykellopp, segelregattor, jordbruksmarknader och internationella sportevenemang.</p>
        <Link href="/evenemang" className={styles.eventsBtn}>Se alla evenemang</Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', flex: 1 }}>
        {evenemang.map((e, i) => (
          <div key={i} style={{ background: '#e0e0e0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
            <img src={e.bild} alt={e.namn} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '0.75rem', color: '#555', display: 'flex', gap: '12px' }}>
                <span>📅 {e.datum}</span>
                <span>📍 {e.plats}</span>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', letterSpacing: '-0.02em', margin: 0, color: '#111' }}>{e.namn}</h3>
              <p style={{ fontSize: '0.85rem', color: '#444', lineHeight: '1.5', margin: 0, flex: 1 }}>{e.beskrivning}</p>
              <a href={e.länk} target="_blank" rel="noopener noreferrer" style={{ marginTop: '8px', display: 'inline-block', padding: '6px 14px', background: '#111', color: 'white', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', textDecoration: 'none' }}>Läs mer ↗</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
