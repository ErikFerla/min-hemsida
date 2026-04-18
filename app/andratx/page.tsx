import { IconStar, IconBuilding, IconPin } from '@/components/Icons';

export default function Andratx() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1566815687825-39bd872e6e09?w=1600&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Sydvästra Mallorca · Tramuntana</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Andratx</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Lugn stadskärna i sydväst med exklusiv marina och dramatisk bergskuliss</p>
        </div>
      </div>
      <div className="city-page-container">
        <div className="city-page-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Andratx</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Andratx är en dubbel destination – den lugna stadskärnan uppe i en dal och den exklusiva Port d&apos;Andratx nere vid havet. Stadskärnan har en avslappnad autenticitet med en onsdagsmarknad och ett levande torgliv, medan hamnen är en av Mallorcas snyggaste med lyxiga segelbåtar och exklusiva restauranger.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Centre Cultural Andratx är ett av öns bästa konstgallerier och är värt ett besök oavsett om du är konstintresserad eller bara vill njuta av den vackra byggnaden och trädgården. Camp de Mar strax norr om hamnen är en av de finaste stränderna i sydväst.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Grytes tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Port d&apos;Andratx vid solnedgång – bäst sett från kajen med ett glas cava</li>
              <li>Camp de Mar – stranden dit de lokala för sina barn, inte turisterna</li>
              <li>Centre Cultural Andratx – öppet tisdag–lördag, ofta gratis</li>
              <li>Onsdagsmarknad i stadskärnan – mindre känd men värd besöket</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#383a46' }}>Topp 3 i Andratx</h2>
              {[
                { Icon: IconStar, text: "Port d'Andratx marina – en av öns snyggaste hamnar med lyxbåtar och terrasser" },
                { Icon: IconBuilding, text: 'Camp de Mar-stranden – lugn och vacker sandstrand norr om hamnen' },
                { Icon: IconPin, text: 'Centre Cultural Andratx – samtidskonst i en vacker miljö' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 0', borderBottom: i < 2 ? '1px solid #ede5da' : 'none' }}>
                  <span style={{ flexShrink: 0, color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><item.Icon size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#374151', lineHeight: '1.6' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconPin size={16} /> Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Sydväst, 30 km från Palma<br/>
                <strong>Bil:</strong> Ca 30 min från Palma<br/>
                <strong>Port d&apos;Andratx:</strong> 7 min med bil<br/>
                <strong>Marknad:</strong> Onsdagar i stadskärnan<br/>
                <strong>Bästa tid:</strong> Maj–juni, september
              </p>
            </div>
            <a href="https://maps.google.com/?q=Andratx+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
