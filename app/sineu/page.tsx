export default function Sineu() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1600&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Centrala Mallorca · Inland</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Sineu</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Mallorcas geografiska hjärta med öns äldsta marknad – sedan kung Jaume II år 1306</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Sineu</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Sineu är beläget i exakt centrum av Mallorca – geografiskt och kulturellt. Onsdagsmarknaden har pågått sedan kung Jaume II utfärdade privilegiet år 1306, vilket gör den till öns äldsta. Levande djur, lokala produkter, hantverk och grönsaker säljs sida vid sida på stadens olika torg.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Kyrkan Mare de Déu dels Àngels dominerar stadsbilden med sin imponerande fasad och torn. Sa Plaça är torgets hjärta med caféer och barer som serverar ärlig mat till ärliga priser – utan turistpåslag. Det är Mallorca som det en gång var.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px' }}>Grytes tips 🌟</h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Onsdagsmarknaden – kom 08:00 för bästa upplevelsen, fullt efter 10</li>
              <li>Fråga lokalt om djurmarknaden – hålls på ett separat torg</li>
              <li>Fixa fika på Sa Plaça – torgets kaffebar är perfekt för att se livet gå</li>
              <li>Kombinera gärna med ett stopp i Petra eller Inca samma dag</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#1F2937' }}>Topp 3 i Sineu</h2>
              {[
                { icon: '⭐', text: 'Onsdagsmarknaden – öns äldsta marknad sedan 1306, kom tidigt' },
                { icon: '🏛️', text: 'Sa Placa-torget – hjärtat av byn med caféer och äkta mallorcansk stämning' },
                { icon: '📍', text: 'Kyrkan Mare de Déu dels Àngels – imponerande gotisk katedral mitt i byn' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 0', borderBottom: i < 2 ? '1px solid #ede5da' : 'none' }}>
                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: '1rem', color: '#374151', lineHeight: '1.6' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem' }}>📍 Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Centrala Mallorca, 30 km från Palma<br/>
                <strong>Bil:</strong> Ca 30 min från Palma<br/>
                <strong>Marknad:</strong> Onsdagar 08:00–13:00<br/>
                <strong>Känd för:</strong> Öns äldsta marknad<br/>
                <strong>Parkering:</strong> Utanför stadskärnan
              </p>
            </div>
            <a href="https://maps.google.com/?q=Sineu+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
