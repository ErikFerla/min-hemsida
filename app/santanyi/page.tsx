export default function Santanyi() {
  return (
    <div style={{ background: '#e8e8e8', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1562564055-71e051d33c19?w=1600&q=90)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Södra Mallorca · Mallorca</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Santanyi</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Charmig marknadsby i söder, känd för sin onsdagsmarknad och närheten till Cala Llombards</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Santanyi</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Santanyi är en av Mallorcas mest charmiga byar, byggd i den karakteristiska gulbruna sandstenen som kallas ”mares”. Byn har ett levande torgliv, ett starkt konsthantverk och en avslappnad atmosfär som lockar tillbaka besökare år efter år.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Onsdags- och lördagsmarknaden är en av öns bästa – här blandas lokala producenter med konsthantverk, textilier och olivoljor. Under sommaren tar arkaderna skugga och det är perfekt att ta en pausa på något av kafeteriorna runt torget.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px' }}>Grytes tips 🌟</h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Onsdagsmarknaden är bättre än lördagens – mindre folk, mer lokalt</li>
              <li>Cala Llombards (15 min bort) är en av öns vackraste privatstränder</li>
              <li>Beställ ”pa amb oli” på baren vid kyrkan – klassisk mallorcansk snack</li>
              <li>Glöm inte galleriet Sa Quartera – gratis och riktigt bra samtidskonst</li>
            </ul>
          </div>
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem' }}>📍 Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Södra Mallorca, 65 km från Palma<br/>
                <strong>Bil:</strong> Ca 55 min från Palma<br/>
                <strong>Marknad:</strong> Onsdag &amp; lördag fm<br/>
                <strong>Känd för:</strong> Marknad, sandstensarkitektur<br/>
                <strong>Stränder nearby:</strong> Cala Llombards, Cala Santanyi
              </p>
            </div>
            <a href="https://maps.google.com/?q=Santanyi+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

