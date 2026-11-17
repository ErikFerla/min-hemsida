import Link from 'next/link';
import { IconCalendar, IconPin } from '@/components/Icons';
import { kommandeEvenemang } from '@/app/evenemang/data';

// Startsidans urval: de sex närmaste daterade evenemangen (veckomarknader och
// helårsattraktioner visas på /evenemang). Datumet beräknas vid rendering –
// sidan som använder komponenten bör revalideras dagligen.
export default function SectionEvents() {
  const urval = kommandeEvenemang().filter(e => !e.återkommande).slice(0, 6);

  return (
    <section className="page-section" style={{ background: '#eeede4' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="events-header-grid">
          <div>
            <p className="section-label">På Mallorca</p>
            <h2 className="section-title" style={{ textTransform: 'uppercase' }}>Kommande evenemang</h2>
            <div className="section-divider" />
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.7', marginBottom: '28px' }}>Mallorca är värd för många evenemang under året – fiestor, julmarknader, cykellopp, segelregattor och veckomarknader i byarna.</p>
            <Link href="/evenemang" className="btn-primary">
              SE ALLA EVENEMANG →
            </Link>
          </div>
          <div className="events-grid">
            {urval.map(e => (
              <article key={e.key} className="events-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <div style={{ position: 'relative' }}>
                  <img src={e.bild} alt={e.namn} loading="lazy" decoding="async" width={600} height={140} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#993335', color: '#fefefb', padding: '3px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '700' }}>
                    {e.kategori}
                  </div>
                </div>
                <div style={{ padding: '14px' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0 0 4px', display: 'inline-flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                    <IconCalendar size={12} /> {e.datum} · <IconPin size={12} /> {e.plats}
                  </p>
                  {e.ejFastställt && (
                    <p style={{ fontSize: '0.72rem', color: '#92400e', fontWeight: 600, margin: '0 0 4px' }}>Datum ej fastställt</p>
                  )}
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', letterSpacing: '0.05em', margin: '0 0 6px', color: '#111', lineHeight: 1.2 }}>{e.namn}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.5', margin: '0 0 12px' }}>{e.beskrivning}</p>
                  <a href={e.länk} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '7px', background: '#993335', color: '#fefefb', borderRadius: '6px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: '600' }}>
                    Läs mer om {e.namn} →
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
