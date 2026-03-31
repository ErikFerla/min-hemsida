import Link from 'next/link';

const golfbanor = [
  {
    namn: 'Son Gual Golf',
    plats: 'Palma',
    hål: 18,
    svårighet: 'Medel',
    pris: '💰💰💰',
    beskrivning: 'Mallorcas mest prestigefyllda bana med fantastisk utsikt över Palma och havet. Designad av Thomas Himmel.',
    bild: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
    maps: 'https://maps.google.com/?q=Son+Gual+Golf+Palma+Mallorca',
    tips: 'Boka minst 2 dagar i förväg – mycket populär',
  },
  {
    namn: 'Golf Son Muntaner',
    plats: 'Palma',
    hål: 18,
    svårighet: 'Svår',
    pris: '💰💰💰💰',
    beskrivning: 'Exklusiv bana vid Arabella Hotel med vackra fairways kantade av mandelträd och olivlundar.',
    bild: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
    maps: 'https://maps.google.com/?q=Golf+Son+Muntaner+Palma+Mallorca',
    tips: 'Bäst på morgonen – undvik middagssolen',
  },
  {
    namn: 'Capdepera Golf',
    plats: 'Capdepera',
    hål: 18,
    svårighet: 'Medel',
    pris: '💰💰💰',
    beskrivning: 'Storslagen bana i nordöstra Mallorca med dramatisk bergsutsikt och välskötta greener.',
    bild: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=600&q=80',
    maps: 'https://maps.google.com/?q=Capdepera+Golf+Mallorca',
    tips: 'Kombinera med besök i Capdepera-borgen efteråt',
  },
  {
    namn: 'Pula Golf Resort',
    plats: 'Son Servera',
    hål: 18,
    svårighet: 'Medel',
    pris: '💰💰💰',
    beskrivning: 'Pittoresk bana omgiven av pinjeskogen nära östkusten. Perfekt för alla nivåer.',
    bild: 'https://images.unsplash.com/photo-1611374243147-44a702c2d44c?w=600&q=80',
    maps: 'https://maps.google.com/?q=Pula+Golf+Son+Servera+Mallorca',
    tips: 'Restaurangen på klubbhuset serverar utmärkt mallorquinsk mat',
  },
  {
    namn: 'Golf de Andratx',
    plats: 'Camp de Mar',
    hål: 18,
    svårighet: 'Svår',
    pris: '💰💰💰💰',
    beskrivning: 'Spektakulär bana i sydvästra Mallorca med havsutsikt och utmanande terräng i bergslandskapet.',
    bild: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=600&q=80',
    maps: 'https://maps.google.com/?q=Golf+de+Andratx+Camp+de+Mar+Mallorca',
    tips: 'En av Europas vackraste banor – ett måste för golfentusiaster',
  },
  {
    namn: 'Santa Ponsa Golf',
    plats: 'Santa Ponsa',
    hål: 27,
    svårighet: 'Lätt',
    pris: '💰💰',
    beskrivning: 'Tre 9-hålsbanor som kan kombineras på olika sätt. Perfekt för nybörjare och familjer.',
    bild: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80',
    maps: 'https://maps.google.com/?q=Santa+Ponsa+Golf+Mallorca',
    tips: 'Bra pris-kvalitet, nära stränder och restauranger',
  },
  {
    namn: 'Pollensa Golf',
    plats: 'Pollença',
    hål: 18,
    svårighet: 'Lätt',
    pris: '💰💰',
    beskrivning: 'Välkomnande bana i norra Mallorca med fantastisk utsikt över Tramuntana-bergen. Perfekt för avkoppling.',
    bild: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80',
    maps: 'https://maps.google.com/?q=Pollensa+Golf+Mallorca',
    tips: 'Lugnt och avslappnat – bra för nybörjare',
  },
  {
    namn: 'Alcanada Golf',
    plats: 'Alcúdia',
    hål: 18,
    svårighet: 'Svår',
    pris: '💰💰💰💰',
    beskrivning: 'Kustnära bana norr om Alcúdia med utsikt mot havet och fyren. Rankas bland Europas bästa banor.',
    bild: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80',
    maps: 'https://maps.google.com/?q=Alcanada+Golf+Alcudia+Mallorca',
    tips: 'Hål 12 med utsikt mot fyren är ett av Europas vackraste hål',
  },
];

const svårighetFärg: Record<string, string> = {
  'Lätt': '#27ae60',
  'Medel': '#f39c12',
  'Svår': '#c0392b',
};

export default function GolfPage() {
  return (
    <div style={{ background: '#e8e8e8', minHeight: '100vh' }}>
      <div style={{
        position: 'relative',
        height: '60vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=90)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '60px 80px',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>
            Aktiviteter på Mallorca
          </p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>
            Golf på Mallorca
          </h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9, maxWidth: '500px' }}>
            Ön har över 20 golfbanor – från nybörjarvänliga till europeisk toppklass
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.03em', margin: 0 }}>
              Bästa golfbanorna
            </h2>
            <p style={{ color: '#666', marginTop: '8px' }}>{golfbanor.length} utvalda banor för alla nivåer</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['Lätt', 'Medel', 'Svår'].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: svårighetFärg[s] }} />
                {s}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {golfbanor.map((b, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', transition: 'transform 0.2s' }}>
              <div style={{ position: 'relative' }}>
                <img src={b.bild} alt={b.namn} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: svårighetFärg[b.svårighet], color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700' }}>
                  {b.svårighet}
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>{b.namn}</h3>
                  <span style={{ fontSize: '0.9rem' }}>{b.pris}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', fontSize: '0.85rem', color: '#666' }}>
                  <span>📍 {b.plats}</span>
                  <span>⛳ {b.hål} hål</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6', margin: '0 0 12px' }}>{b.beskrivning}</p>
                <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '0.85rem', color: '#444' }}>
                  💡 {b.tips}
                </div>
                <a href={b.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
                  Visa på karta
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '60px', background: '#111', borderRadius: '16px', padding: '40px', color: 'white', textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.5rem', letterSpacing: '0.05em', marginBottom: '16px' }}>
            Planera din golfsemester
          </h2>
          <p style={{ color: '#aaa', fontSize: '1rem', marginBottom: '28px', maxWidth: '500px', margin: '0 auto 28px' }}>
            Vill du ha hjälp att boka greenfee, hyra utrustning eller kombinera golf med andra aktiviteter?
          </p>
          <Link href="/kontakt" style={{ display: 'inline-block', padding: '14px 40px', background: '#c0392b', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '1rem' }}>
            Planera min golfsemester →
          </Link>
        </div>
      </div>
    </div>
  );
}
