export const metadata = {
  title: 'De 15 bästa stränderna på Mallorca 2026 – Rankade av en lokal | MyMallorca',
  description: 'Vi har besökt och rankat Mallorcas 15 bästa stränder. Från dolda paradisvikar till barnvänliga sandstränder – med GPS, parkering och insider-tips.',
};

const stränder = [
  {
    rank: 1,
    namn: 'Cala des Moro',
    region: 'Östkusten · Santanyí',
    typ: 'Stenvik · Kristallklart vatten',
    beskrivning: 'Cala des Moro är utan tvekan en av Mallorcas allra vackraste stränder. Det turkosa vattnet är så klart att du kan se botten på 8 meters djup. Stranden är liten – bara 30 meter bred – vilket gör att den snabbt fylls på sommaren.',
    insider: 'Kom senast 08:30 på högsommaren. Parkeringen längs vägen är begränsad till 20–30 bilar. Alternativt: parkera i Cala Llombards och vandra 25 min.',
    gps: '39.3289° N, 3.2158° E',
    bästaTid: 'Juni eller september – juli och augusti är för trångt',
    bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    rank: 2,
    namn: 'Es Trenc',
    region: 'Sydkusten · Campos',
    typ: 'Sandstrand · 3 km lång',
    beskrivning: 'Es Trenc kallas Mallorcas Karibien – och det är förtjänt. Den 3 kilometer långa stranden med vitt sand och turkost vatten är skyddad som naturreservat, vilket innebär inga hotell, inga paraplyer att hyra och minimal kommersialisering.',
    insider: 'Ta med allt själv – det finns en foodtruck men ingenting annat. Naturistdelen börjar längst till höger om du är vänd mot havet. Bästa parkeringen är vid Ses Covetes (norra änden) – billigare och kortare kö.',
    gps: '39.3447° N, 2.9758° E',
    bästaTid: 'Maj och september – stranden är 3 km lång men p-platsen klarar inte sommartrycket',
    bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80',
  },
  {
    rank: 3,
    namn: 'Cala Mondragó',
    region: 'Östkusten · Portopetro',
    typ: 'Naturreservat · Snorkling',
    beskrivning: 'Cala Mondragó är ett av Mallorcas naturreservat och består av två sammankopplade vikar – S\'Amarador och Cala Mondragó. Vattnet är kristallklart och fullt av marint liv. Snorkling här är en upplevelse i världsklass.',
    insider: 'Snorkla tidigt på morgonen innan båtarna börjar trafikera viken. Hyr utrustning i byn Portopetro (5 min i bil) – det är billigare än på stranden.',
    gps: '39.3489° N, 3.1858° E',
    bästaTid: 'Maj till oktober – reservatet är öppet hela året men bäst sikt under sen sommar',
    bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=800&q=80',
  },
  {
    rank: 4,
    namn: 'Cala Figuera',
    region: 'Sydkusten · Santanyí',
    typ: 'Pittoresk fiskeby · Klart vatten',
    beskrivning: 'Cala Figuera är inte en traditionell badstrand – det är en liten fiskeby med en av Mallorcas vackraste naturhamnar. Klipphyllor att hoppa från, smaragdgrönt vatten och fiskebåtar som glider förbi.',
    insider: 'Bästa klipphoppen finns på norra sidan av viken. Parkeringen är gratis men begränsad. Ät frukost på Café Cala Figuera med utsikt över hamnen.',
    gps: '39.3281° N, 3.1692° E',
    bästaTid: 'Hela säsongen – minst turister tidigt morgon',
    bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    rank: 5,
    namn: 'Playa de Muro',
    region: 'Norr · Alcúdia',
    typ: 'Sandstrand · Familjevänlig',
    beskrivning: 'Playa de Muro är Mallorcas bästa familjestrand. 5 km sandstrand med grunt vatten, fina faciliteter och ett lugnt hav som gör det perfekt för barn i alla åldrar.',
    insider: 'Undvik hotellsektionen mitt på stranden – gå 500 m söderut mot Cap des Pinar för lugnare och vackrare avsnitt med färre turister.',
    gps: '39.8201° N, 3.1142° E',
    bästaTid: 'Maj–oktober. Håller kusten jämn temperatur hela säsongen.',
    bild: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80',
  },
];

export default function BästaSträndernaGuide() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '55vh', backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: 'clamp(20px,5vw,60px) clamp(16px,5vw,80px)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Lokal guide · Uppdaterad 2026</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem,7vw,5rem)', fontWeight: '400', letterSpacing: '0.04em', margin: 0, lineHeight: 1 }}>De 15 bästa stränderna på Mallorca</h1>
          <p style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)', marginTop: '16px', opacity: 0.9, maxWidth: '600px' }}>Rankade av en som bott på ön i 10 år. Med GPS-koordinater, parkeringstips och ärliga råd om när du ska undvika dem.</p>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,40px)' }}>

        {/* Snabbguide */}
        <div style={{ background: '#F0EBE3', borderRadius: '16px', padding: '24px 28px', marginBottom: '48px', borderLeft: '4px solid #993335' }}>
          <p style={{ fontWeight: 700, color: '#383a46', marginBottom: 8, fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Snabbguide – topp 5 för olika resenärer</p>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#374151', fontSize: '0.9rem', lineHeight: '2' }}>
            <li><strong>Vackraste stranden:</strong> Cala des Moro (östkusten)</li>
            <li><strong>Bäst för familjer:</strong> Playa de Muro (norr)</li>
            <li><strong>Mest orörda:</strong> Es Caragol (inga vägar, kräver vandring)</li>
            <li><strong>Bäst snorkling:</strong> Cala Mondragó (naturreservat)</li>
            <li><strong>Närmast Palma:</strong> Cala Major (15 min)</li>
          </ul>
        </div>

        {/* Strand-artiklar */}
        {stränder.map((strand) => (
          <article key={strand.rank} style={{ marginBottom: '64px', paddingBottom: '64px', borderBottom: '1px solid #ede5da' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ background: '#993335', color: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', flexShrink: 0 }}>#{strand.rank}</span>
              <div>
                <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem,4vw,2.5rem)', letterSpacing: '0.05em', margin: 0, color: '#383a46', lineHeight: 1 }}>{strand.namn}</h2>
                <p style={{ margin: 0, color: '#993335', fontSize: '0.85rem', fontWeight: '600', marginTop: '4px' }}>{strand.region} · {strand.typ}</p>
              </div>
            </div>

            <img src={strand.bild} alt={strand.namn} loading="lazy" style={{ width: '100%', height: 'clamp(200px, 35vw, 400px)', objectFit: 'cover', borderRadius: '16px', marginBottom: '24px' }} />

            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#374151', marginBottom: '24px' }}>{strand.beskrivning}</p>

            <div style={{ background: '#F0EBE3', borderRadius: '12px', padding: '20px 24px', marginBottom: '20px' }}>
              <p style={{ fontWeight: 700, color: '#993335', marginBottom: 8, fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Insider-tips</p>
              <p style={{ margin: 0, color: '#374151', fontSize: '0.95rem', lineHeight: '1.65' }}>{strand.insider}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <div style={{ background: 'white', borderRadius: '10px', padding: '14px', border: '1px solid #ede5da' }}>
                <p style={{ margin: '0 0 4px', fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600' }}>GPS</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#374151', fontWeight: '500' }}>{strand.gps}</p>
              </div>
              <div style={{ background: 'white', borderRadius: '10px', padding: '14px', border: '1px solid #ede5da' }}>
                <p style={{ margin: '0 0 4px', fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600' }}>BÄSTA TID</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#374151', fontWeight: '500' }}>{strand.bästaTid}</p>
              </div>
            </div>
          </article>
        ))}

        {/* Stränder 6–15: kompaktlista */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem,4vw,2.5rem)', letterSpacing: '0.05em', color: '#383a46', marginBottom: '24px' }}>Stränder 6–15: Komplett lista</h2>
          {[
            { rank: 6, namn: 'Cala Agulla', region: 'Nordöst · Capdepera', tips: 'Skyddad nationalpark, bra surfa tidiga morgnar.' },
            { rank: 7, namn: 'Cala Pi', region: 'Sydkust · Llucmajor', tips: 'Smal vik med klippväggar – en av öns vackraste silhuetter.' },
            { rank: 8, namn: 'Cala Llombards', region: 'Sydkust · Santanyí', tips: 'Lugn, grund och barnvänlig. Lokalt café med hembakad mat.' },
            { rank: 9, namn: 'Platja de Formentor', region: 'Nordkust · Pollença', tips: 'Bussbiljett krävs juli–aug – inga privata bilar tillåts.' },
            { rank: 10, namn: 'Cala Ratjada', region: 'Nordöst', tips: 'Livlig sommardestination med bra restauranger längs stranden.' },
            { rank: 11, namn: 'Cala Major', region: 'Väst · Palma', tips: 'Närmaste okej-stranden från Palma. 15 min med taxi.' },
            { rank: 12, namn: 'Platja de Palma', region: 'Palma', tips: 'Lång stadsstrand med allt – bra om du inte har bil.' },
            { rank: 13, namn: 'Cala Santanyí', region: 'Sydkust', tips: 'Pittoresk med lokalt café och turkost klart vatten.' },
            { rank: 14, namn: 'Cala Mesquida', region: 'Nordöst · Capdepera', tips: 'Strand + klitter + lite surfrep. Lugnt och vackert.' },
            { rank: 15, namn: 'Es Caragol', region: 'Sydkust (kräver 40 min vandring)', tips: 'Mallorcas mest orörda strand. Inga vägar dit – ta med vatten.' },
          ].map((s) => (
            <div key={s.rank} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px 0', borderBottom: '1px solid #ede5da' }}>
              <span style={{ background: '#EDE4D8', color: '#993335', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1rem', flexShrink: 0, fontWeight: '700' }}>#{s.rank}</span>
              <div>
                <p style={{ fontWeight: '700', color: '#383a46', margin: '0 0 4px' }}>{s.namn} <span style={{ fontWeight: '400', color: '#6B7280', fontSize: '0.85rem' }}>· {s.region}</span></p>
                <p style={{ margin: 0, color: '#6B7280', fontSize: '0.88rem' }}>{s.tips}</p>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div style={{ background: '#993335', borderRadius: '20px', padding: '40px', textAlign: 'center', color: 'white', marginTop: '40px' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', letterSpacing: '0.05em', margin: '0 0 12px' }}>Vill du utforska alla 30 stränder?</h2>
          <p style={{ opacity: 0.85, marginBottom: '24px', fontSize: '1rem' }}>Filtrera på region, typ och vad du letar efter i vår kompletta strandguide.</p>
          <a href="/strandar" style={{ display: 'inline-block', background: '#F59E0B', color: '#383a46', padding: '14px 32px', borderRadius: '10px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: '700' }}>SE ALLA 30 STRÄNDER →</a>
        </div>
      </div>
    </div>
  );
}
