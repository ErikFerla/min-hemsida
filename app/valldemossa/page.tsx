export default function Valldemossa() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&q=90)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Nordvästra Mallorca · Tramuntana</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Valldemossa</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>UNESCO-skyddad bergsby känd för Chopins vistelse och det magnifika kartusianerklostret</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Valldemossa</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Valldemossa är en av Mallorcas mest berömda byar, inte minst tack vare den polska tonsättaren Frédéric Chopin och hans älskarinna George Sand som tillbringade vintern 1838–39 i kartusianerklostret Real Cartuja. Byn är förtrollande vacker med stenhus täckta av blommor och smala gränder som slinrar sig uppför bergssluttningarna.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Kartusianerklostret är öppet för besökare och innehåller Chopins piano, George Sands originalhandskrifter och en privat kyrka med keramikkupoler. Byn är också känd för sina lokala bakelser – coca de patata – som säljs på torget.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px' }}>Grytes tips 🌟</h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Kom tidigt på morgonen – turistbussarna anländer efter 10</li>
              <li>Klostret stänger söndagar – planera runt det</li>
              <li>Prova coca de patata vid torgets bageri – en lokal klassiker</li>
              <li>Promenera ut ur byn norrut för fantastisk utsikt över bergen</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#1F2937' }}>Topp 3 i Valldemossa</h2>
              {[
                { icon: '⭐', text: 'Kartusianerklostret – Chopins piano och George Sands handskrifter' },
                { icon: '🏛️', text: 'Chopins pianosalong – en unik glimt av 1800-talets konstliv' },
                { icon: '📍', text: 'Utsikten från byplatsen – bergen och havet i samma vy' },
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
                <strong>Plats:</strong> Nordväst, 18 km från Palma<br/>
                <strong>Bil:</strong> Ca 25 min från Palma<br/>
                <strong>Klostret:</strong> Öppet 09:30–18:00 (stängt sön)<br/>
                <strong>Känd för:</strong> Chopin, kloster, bergsby<br/>
                <strong>Tips:</strong> Parkera utanför byn och gå in
              </p>
            </div>
            <a href="https://maps.google.com/?q=Valldemossa+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
