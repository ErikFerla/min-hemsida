export default function Deia() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Nordvästra Mallorca · Tramuntana</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Deià</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Bohemisk konstnärsby i Tramuntana-bergen med havsutsikt och Robert Graves arv</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Deià</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Deià är en av Mallorcas mest romantiska och konstnärliga byar. Inbyggd i en bergssluttning med utsikt mot Medelhavet har den lockat konstnärer, författare och musiker i generationer. Den brittiske poeten Robert Graves levde och dog här, och hans hus är nu ett museum öppet för besökare.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Cala Deià – en liten klippbadstrand nedanför byn – är en av Mallorcas vackraste och mest avskilda badplatser. Promenaden ner tar ungefär 20 minuter och belöningen är ett turkost hav omringat av klippor och pinjeskog.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px' }}>Grytes tips 🌟</h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Robert Graves museum – öppet måndag–fredag, boka i förväg</li>
              <li>Promenera ner till Cala Deià tidigt – på eftermiddagen är det fullt</li>
              <li>Restaurang Ca&apos;n Quet har en av öns bästa terrasser med utsikt</li>
              <li>Parkera utanför byn – gatorna är mycket smala</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#1F2937' }}>Topp 3 i Deià</h2>
              {[
                { icon: '⭐', text: 'Robert Graves museum – hem och arbetsstugan för den berömde poeten' },
                { icon: '🏛️', text: 'Cala Deià – en av öns vackraste klippbadplatser, orört och fridfullt' },
                { icon: '📍', text: 'Utsikten från kyrkan – panorama över bergen och Medelhavet' },
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
                <strong>Plats:</strong> Nordväst, 30 km från Palma<br/>
                <strong>Bil:</strong> Ca 35 min från Palma<br/>
                <strong>Cala Deià:</strong> 20 min till fots från byn<br/>
                <strong>Känd för:</strong> Robert Graves, konst, natur<br/>
                <strong>Bästa tid:</strong> Vår och tidig höst
              </p>
            </div>
            <a href="https://maps.google.com/?q=Deia+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
