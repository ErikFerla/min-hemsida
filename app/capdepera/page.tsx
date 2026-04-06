export default function Capdepera() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1559519529-0936e4058364?w=1600&q=90)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Nordöstra Mallorca · Llevant</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Capdepera</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Pittoresk by dominerad av ett mäktigt medeltida fort med panoramautsikt över nordöstra Mallorca</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Capdepera</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Capdepera domineras av Castell de Capdepera – ett enormt medeltida fort som kröner kullen ovanför byn. Inifrån murarna har man en fantastisk panoramautsikt över hela nordöstra hörnet av Mallorca, havet och bortom. Byn nedan är charmig med vita hus och blomsterprydda gränder.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Strax nedanför ligger Cala Rajada – ett livligt fiskeläge och badort med flera fina stränder. Solnedgångarna sett från borgmurarna är spektakulära och ett av de bästa fotomotivet på norra Mallorca.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px' }}>Grytes tips 🌟</h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Besök borgen vid solnedgång – utsikten och ljuset är oöverträffat</li>
              <li>Cala Rajada 5 min bort – bra stränder och fiskrestauranger</li>
              <li>Ta med picknick till borgmurarna – inga restauranger däruppe</li>
              <li>Kombinera med ett besök till Coves d&apos;Artà som ligger nära</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#1F2937' }}>Topp 3 i Capdepera</h2>
              {[
                { icon: '⭐', text: 'Castell de Capdepera vid solnedgång – panoramautsikt och magiskt ljus' },
                { icon: '🏛️', text: 'Cala Rajada – livlig hadstrand med fina stränder och fiskrestauranger' },
                { icon: '📍', text: 'Panoramautsikten över havet – en av nordöstras bästa utsiktspunkter' },
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
                <strong>Plats:</strong> Nordöst, 80 km från Palma<br/>
                <strong>Bil:</strong> Ca 60 min från Palma<br/>
                <strong>Castell:</strong> Entré krävs, öppet dagligen<br/>
                <strong>Cala Rajada:</strong> 5 min med bil<br/>
                <strong>Bästa tid:</strong> Solnedgången från borgen
              </p>
            </div>
            <a href="https://maps.google.com/?q=Capdepera+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
