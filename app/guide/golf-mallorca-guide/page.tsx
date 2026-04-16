import { IconStar, IconFlag, IconBulb, IconCalendar } from '@/components/Icons';

export const metadata = {
  title: 'Golf på Mallorca 2026 – Komplett guide till alla 22 banor | MyMallorca',
  description: 'Komplett golfguide för Mallorca. De 5 bästa banorna djupanalyserade + komplett lista på alla 22 banor med grön-avgift, svårighet och kontakt.',
};

const toppBanor = [
  {
    rank: 1,
    namn: 'Son Gual',
    region: 'Palma (norr)',
    hål: 18,
    par: 71,
    grönAvgift: '120–190 €',
    svårighet: 5,
    beskrivning: 'Son Gual är Mallorcas absolut bästa golfbana och rankas bland de 100 bästa i Europa. Designad av Thomas Himmel med fantastisk utsikt mot Tramuntanabergen och havet. Fairways i perfekt skick.',
    insider: 'Boka tee-time minst 2 veckor i förväg under mars–juni. Banan är lättast tillgänglig tidig morgon. Restaurangen efter rundan är outstanding.',
    bästTid: 'November–april (under 25°C, inga turister)',
  },
  {
    rank: 2,
    namn: 'Arabella Golf Son Vida',
    region: 'Palma (väst)',
    hål: 18,
    par: 72,
    grönAvgift: '95–150 €',
    svårighet: 4,
    beskrivning: 'Tre banor på samma lyxiga resort nära Palma. Son Vida-banan är den äldsta på ön (1964) och har Mallorcas mest imponerande panoramautsikt. Favoritbana för proffsiga resenärer.',
    insider: 'Golfresor till Son Vida inkluderar ofta rabatterade greenfees. Hotellpaketen är värda det – du kan gå till banan direkt från rummet.',
    bästTid: 'Oktober–maj',
  },
  {
    rank: 3,
    namn: 'Son Quint',
    region: 'Palma (sydöst)',
    hål: 9,
    par: 36,
    grönAvgift: '60–80 €',
    svårighet: 3,
    beskrivning: 'En av Mallorcas vackraste 9-hålsbanor, omringad av olivlundar och mandelträd. Perfekt för en halvdags golf med utsikt. Mer avslappnad atmosfär än de stora banorna.',
    insider: 'Ideal för par som vill kombinera golf och sightseeing. Spelat rundan på ca 2,5 timmar – gott om tid för en middag i Palma efteråt.',
    bästTid: 'Hela året – aldrig för trångt',
  },
  {
    rank: 4,
    namn: 'Club de Golf Alcanada',
    region: 'Alcúdia (norr)',
    hål: 18,
    par: 72,
    grönAvgift: '100–160 €',
    svårighet: 4,
    beskrivning: 'Nordens bästa golfupplevelse på Mallorca. Från tee 15 ser du ut över ett litet fyr-ö i havet – ett av öns mest fotograferade golfmotiv. Vindigt och utmanande.',
    insider: 'Hål 15 är "foto-obligatoriskt". Ta med fler bollar än vanligt – vinden tar de flesta amatörers bollar i havet på hål 14–16.',
    bästTid: 'Maj och oktober – juni–september är mycket vindig',
  },
  {
    rank: 5,
    namn: 'Golf Son Servera',
    region: 'Son Servera (östkust)',
    hål: 9,
    par: 36,
    grönAvgift: '45–65 €',
    svårighet: 2,
    beskrivning: 'En av Mallorcas äldsta banor (1967) och favoriten för avslappnad golf. Omgiven av tallar och olivträd med havsutsikt. Bra för nybörjare och de som vill ha en enkel runda.',
    insider: 'Priset är det lägsta bland de bra banorna. Kombinera med en middag i Porto Cristo (15 min). Lokal och vänlig personal – inget snobb.',
    bästTid: 'Hela året – aldrig trångt',
  },
];

const allabanor = [
  { namn: 'Son Gual', region: 'Palma', hål: 18, grönAvgift: '120–190 €', svårighet: 5 },
  { namn: 'Arabella Golf Son Vida', region: 'Palma', hål: 18, grönAvgift: '95–150 €', svårighet: 4 },
  { namn: 'Son Quint', region: 'Palma', hål: 9, grönAvgift: '60–80 €', svårighet: 3 },
  { namn: 'Club de Golf Alcanada', region: 'Alcúdia', hål: 18, grönAvgift: '100–160 €', svårighet: 4 },
  { namn: 'Golf Son Servera', region: 'Son Servera', hål: 9, grönAvgift: '45–65 €', svårighet: 2 },
  { namn: 'Golf Pollença', region: 'Pollença', hål: 9, grönAvgift: '40–55 €', svårighet: 2 },
  { namn: 'Vall d\'Or Golf', region: 'Felanitx', hål: 9, grönAvgift: '50–70 €', svårighet: 3 },
  { namn: 'Club de Golf Santa Ponsa', region: 'Santa Ponsa', hål: 18, grönAvgift: '55–90 €', svårighet: 3 },
  { namn: 'Golf Poniente', region: 'Santa Ponsa', hål: 18, grönAvgift: '60–85 €', svårighet: 3 },
  { namn: 'Real Golf de Bendinat', region: 'Calviá', hål: 18, grönAvgift: '70–100 €', svårighet: 3 },
  { namn: 'Capdepera Golf', region: 'Capdepera', hål: 18, grönAvgift: '60–90 €', svårighet: 3 },
  { namn: 'Son Antem Golf', region: 'Llucmajor', hål: 36, grönAvgift: '55–80 €', svårighet: 3 },
  { namn: 'Golf Maioris', region: 'Llucmajor', hål: 18, grönAvgift: '50–75 €', svårighet: 3 },
  { namn: 'Pula Golf', region: 'Son Servera', hål: 18, grönAvgift: '60–95 €', svårighet: 4 },
  { namn: 'Golf Son Muntaner', region: 'Palma', hål: 18, grönAvgift: '85–130 €', svårighet: 4 },
  { namn: 'T Golf Poniente', region: 'Magaluf', hål: 18, grönAvgift: '50–70 €', svårighet: 2 },
  { namn: 'Golf de Andratx', region: 'Andratx', hål: 18, grönAvgift: '100–160 €', svårighet: 4 },
  { namn: 'Son Gual Pitch & Putt', region: 'Palma', hål: 9, grönAvgift: '20–30 €', svårighet: 1 },
  { namn: 'Golf Costa de los Pinos', region: 'Son Servera', hål: 9, grönAvgift: '40–55 €', svårighet: 2 },
  { namn: 'Canyamel Golf', region: 'Artà', hål: 18, grönAvgift: '55–85 €', svårighet: 3 },
  { namn: 'Rotana Golf', region: 'Manacor', hål: 9, grönAvgift: '35–50 €', svårighet: 2 },
  { namn: 'Son Floriana Golf', region: 'Cala Millor', hål: 9, grönAvgift: '30–45 €', svårighet: 2 },
];

export default function GolfMallorcaGuide() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '55vh', backgroundImage: 'url(https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: 'clamp(20px,5vw,60px) clamp(16px,5vw,80px)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Golfguide · Uppdaterad 2026</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem,7vw,5rem)', fontWeight: '400', letterSpacing: '0.04em', margin: 0, lineHeight: 1 }}>Golf på Mallorca</h1>
          <p style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)', marginTop: '16px', opacity: 0.9, maxWidth: '600px' }}>Komplett guide till alla 22 golfbanor. De 5 bästa djupanalyserade med grön-avgifter, insider-tips och info om bästa säsong.</p>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,40px)' }}>

        {/* Snabbfakta */}
        <div style={{ background: '#F0EBE3', borderRadius: '16px', padding: '24px 28px', marginBottom: '48px', borderLeft: '4px solid #993335' }}>
          <p style={{ fontWeight: '700', color: '#383a46', marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconFlag size={18} /> Golfinfo Mallorca – snabbfakta</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '0.88rem', color: '#374151' }}>
            <div><strong>Antal banor:</strong> 22</div>
            <div><strong>Bästa säsong:</strong> November–april</div>
            <div><strong>Billigaste banan:</strong> från 20 €</div>
            <div><strong>Dyraste banan:</strong> upp till 190 €</div>
            <div><strong>Snitt greenfee:</strong> 65–90 €</div>
            <div><strong>Utrustningsuthyrning:</strong> finns på alla banor</div>
          </div>
        </div>

        {/* Topp 5 */}
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem,4vw,2.5rem)', letterSpacing: '0.05em', color: '#383a46', marginBottom: '32px' }}>De 5 bästa banorna – djupanalys</h2>

        {toppBanor.map((bana) => (
          <article key={bana.rank} style={{ marginBottom: '48px', background: 'white', borderRadius: '20px', padding: '28px', border: '1px solid #ede5da' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ background: '#993335', color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', flexShrink: 0 }}>#{bana.rank}</span>
              <div>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.5rem,3vw,2rem)', letterSpacing: '0.05em', margin: 0, color: '#383a46', lineHeight: 1 }}>{bana.namn}</h3>
                <p style={{ margin: 0, color: '#993335', fontSize: '0.85rem', fontWeight: '600', marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>{bana.region} · {bana.hål} hål · Par {bana.par} · <span style={{ display: 'inline-flex', color: '#993335' }}>{Array.from({ length: bana.svårighet }).map((_, j) => <IconStar key={j} size={12} />)}</span></p>
              </div>
            </div>
            <p style={{ fontSize: '0.98rem', lineHeight: '1.75', color: '#374151', marginBottom: '20px' }}>{bana.beskrivning}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ background: '#F0EBE3', borderRadius: '10px', padding: '14px' }}>
                <p style={{ margin: '0 0 4px', fontSize: '0.72rem', color: '#993335', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: 6 }}><IconBulb size={12} /> INSIDER-TIPS</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#374151' }}>{bana.insider}</p>
              </div>
              <div style={{ background: '#F9F6F1', borderRadius: '10px', padding: '14px' }}>
                <p style={{ margin: '0 0 4px', fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600' }}>GREENFEE · BÄSTA TID</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#383a46', fontWeight: '600' }}>{bana.grönAvgift}</p>
                <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#6B7280' }}>{bana.bästTid}</p>
              </div>
            </div>
          </article>
        ))}

        {/* Alla 22 banor – kompaktlista */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem,4vw,2.5rem)', letterSpacing: '0.05em', color: '#383a46', marginBottom: '24px' }}>Alla 22 golfbanor på Mallorca</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#EDE4D8' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#383a46', fontWeight: '700' }}>Bana</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#383a46', fontWeight: '700' }}>Region</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', color: '#383a46', fontWeight: '700' }}>Hål</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#383a46', fontWeight: '700' }}>Greenfee</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', color: '#383a46', fontWeight: '700' }}>Svårighet</th>
                </tr>
              </thead>
              <tbody>
                {allabanor.map((b, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#F9F6F1', borderBottom: '1px solid #ede5da' }}>
                    <td style={{ padding: '11px 16px', color: '#383a46', fontWeight: '500' }}>{b.namn}</td>
                    <td style={{ padding: '11px 16px', color: '#6B7280' }}>{b.region}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'center', color: '#6B7280' }}>{b.hål}</td>
                    <td style={{ padding: '11px 16px', color: '#374151' }}>{b.grönAvgift}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'center', color: '#993335' }}><span style={{ display: 'inline-flex' }}>{Array.from({ length: b.svårighet }).map((_, j) => <IconStar key={j} size={12} />)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips om säsong */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.6rem,3vw,2rem)', letterSpacing: '0.05em', color: '#383a46', marginBottom: '20px', display: 'inline-flex', alignItems: 'center', gap: 10 }}><IconCalendar size={22} /> Bästa tid att spela golf på Mallorca</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { period: 'Nov – Februari', rating: 5, text: 'Perfekt. Behaglig 15–20°C. Inga köer. 30–40% lägre priser.' },
              { period: 'Mars – April', rating: 5, text: 'Toppsäsong. Mandelblomningstid, 18–23°C. Boka tidigt.' },
              { period: 'Maj – Juni', rating: 4, text: 'Fortfarande bra. Varmare men hanterbart. Fler turister.' },
              { period: 'Juli – Augusti', rating: 2, text: 'För varmt (33–36°C). Spela bara tidigt 07:00–09:30.' },
              { period: 'September – Oktober', rating: 4, text: 'Bra alternativ. Varmt hav, svalare luft. Bra priser.' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #ede5da' }}>
                <p style={{ fontWeight: '700', color: '#383a46', margin: '0 0 4px', fontSize: '0.9rem' }}>{s.period}</p>
                <p style={{ margin: '0 0 6px', fontSize: '0.8rem', color: '#993335', display: 'inline-flex' }}>{Array.from({ length: s.rating }).map((_, j) => <IconStar key={j} size={12} />)}</p>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#6B7280', lineHeight: '1.5' }}>{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: '#993335', borderRadius: '20px', padding: '40px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', letterSpacing: '0.05em', margin: '0 0 12px' }}>Mer om golf på Mallorca</h2>
          <p style={{ opacity: 0.85, marginBottom: '24px' }}>Boka tider, läs mer om paketresor och golfhotell.</p>
          <a href="/aktiviteter/golf" style={{ display: 'inline-block', background: '#993335', color: '#fefefb', padding: '14px 32px', borderRadius: '10px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: '700' }}>SE GOLFGUIDEN →</a>
        </div>
      </div>
    </div>
  );
}
