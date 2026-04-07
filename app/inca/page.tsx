export default function Inca() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1566993850067-bb8df9c9807e?w=1600&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Centrala Mallorca · Raiguer</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Inca</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Mallorcas läderhuvudstad med berömd torsdagsmarknad och traditionella källarrestauranger</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Inca</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Inca är Mallorcas näst folkrikaste stad och känd som öns läderhuvudstad. Läderfabriker och butiker har producerat skor, väskor och bälten här i generationer, och torsdagsmarknaden – öns näst största – lockar köpare från hela Mallorca. Priserna på kvalitetsskor är ofta långt under det du betalar i Stockholm.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Celler-restaurangerna är en unik inkansk tradition – källare under gamla stadshus som börjat som vinförråd och nu serverar traditionell mallorquinska mat. Dijous Bo i november är Mallorcas största marknadshändelse med hundratusentals besökare.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px' }}>Grytes tips 🌟</h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Torsdagsmarknaden – kom 08:30 för bästa urval av skor och läder</li>
              <li>Celler-restaurang till lunch – ärlig mallorcansk mat i vinkällare</li>
              <li>Dijous Bo i november – öns största marknadshändelse, boka hotell tidigt</li>
              <li>Ta tåget från Palma – spar parkering och stressfriheten</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#1F2937' }}>Topp 3 i Inca</h2>
              {[
                { icon: '⭐', text: 'Torsdagsmarknaden – öns näst största, fantastiskt urval av läderskor till rea' },
                { icon: '🏛️', text: 'Cellers – traditionella källarrestauranger med äkta mallorquinska rätter' },
                { icon: '📍', text: 'Dijous Bo i november – Mallorcas största marknadshändelse sedan medeltiden' },
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
                <strong>Tåg:</strong> Direktlinje från Palma (30 min)<br/>
                <strong>Marknad:</strong> Torsdagar<br/>
                <strong>Dijous Bo:</strong> November – öns största<br/>
                <strong>Känd för:</strong> Läder, skor, celler-mat
              </p>
            </div>
            <a href="https://maps.google.com/?q=Inca+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
