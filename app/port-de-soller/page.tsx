export default function PortDeSoller() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>NORDVÄSTRA MALLORCA · VACKER HAMNBY</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Port de Sóller</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>En av Mallorcas mest pittoreska hamnbyar med naturlig vik – nådd med historisk spårvagn från Sóller</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Port de Sóller</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Port de Sóller är en av Mallorcas mest pittoreska hamnbyar med en naturlig rundad vik omgiven av Tramuntana-bergen. Nås med den historiska spårvagnen från Sóller – en upplevelse i sig.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Hamnen omges av restauranger och caféer med utsikt mot det blågröna Medelhavet. Viken är skyddad och lugn, perfekt för simning och snorkling. På kvällen samlas besökare längs promenaden för att se solen gå ned bakom bergen.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px' }}>Grytes tips 🌟</h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Ta spårvagnen från Sóller – 15 min och passa på att sitta utomhus</li>
              <li>Solnedgången vid hamnen är bland de vackraste på hela ön</li>
              <li>Hyr kajak direkt vid stranden och paddla ut i viken</li>
              <li>Lunch på någon av restaurangerna med havsutsikt vid hamnen</li>
            </ul>
            <div style={{ marginTop: '40px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '16px' }}>Höjdpunkter</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ fontSize: '1.3rem' }}>⭐</span>
                  <span style={{ fontSize: '1rem', color: '#1F2937', lineHeight: '1.5' }}>Historiska spårvagnen från Sóller</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ fontSize: '1.3rem' }}>🏛️</span>
                  <span style={{ fontSize: '1rem', color: '#1F2937', lineHeight: '1.5' }}>Solnedgången vid hamnen</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ fontSize: '1.3rem' }}>📍</span>
                  <span style={{ fontSize: '1rem', color: '#1F2937', lineHeight: '1.5' }}>Snorkling och kajakpaddling i viken</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem' }}>📍 Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Nordväst, 30 km från Palma<br/>
                <strong>Spårvagn:</strong> 15 min från Sóller<br/>
                <strong>Känd för:</strong> Hamn, spårvagn, natur<br/>
                <strong>Stränder nearby:</strong> Platja de Port de Sóller
              </p>
            </div>
            <a href="https://maps.google.com/?q=Port+de+Soller+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
