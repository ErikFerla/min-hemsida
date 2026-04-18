import { IconStar, IconBuilding, IconPin } from '@/components/Icons';

export default function Alcudia() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1566815687825-39bd872e6e09?w=1600&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>NORRA MALLORCA · HISTORISK KUSTSTAD</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Alcúdia</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>En av Mallorcas bäst bevarade medeltida städer med imponerande stadsmurer och romersk teater</p>
        </div>
      </div>
      <div className="city-page-container">
        <div className="city-page-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Alcúdia</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Alcúdia är en av Mallorcas bäst bevarade medeltida städer med imponerande stadsmurer från 1300-talet, en romersk teater och en av öns vackraste sandstränder alldeles intill.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Stadsmurarna som omger gamla stan är nästan intakta och det är lätt att promenera längs dem. Inuti murarna finns butiker, restauranger och kyrkan Sant Jaume. Alldeles utanför staden sprider sig Playa de Muro – en av Mallorcas längsta och finaste sandstränder.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Grytes tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Gå hela vägen runt stadsmurarna – tar ca 30 min och ger fin utsikt</li>
              <li>Pollentia-ruinerna är öppna för besök och inkluderar en romersk teater</li>
              <li>Tisdagsmarknaden är stor och populär – kom tidigt</li>
              <li>Playa de Muro är perfekt för familjer – grunt och sandigt</li>
            </ul>
            <div style={{ marginTop: '40px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '16px' }}>Höjdpunkter</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><IconStar size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#383a46', lineHeight: '1.5' }}>Medeltida stadsmurarna från 1300-talet</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><IconBuilding size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#383a46', lineHeight: '1.5' }}>Romerska teatern Pollentia</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><IconPin size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#383a46', lineHeight: '1.5' }}>Playa de Muro – lång sandstrand 5 min bort</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconPin size={16} /> Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Norra Mallorca, 54 km från Palma<br/>
                <strong>Bil:</strong> Ca 50 min från Palma<br/>
                <strong>Marknad:</strong> Tisdag &amp; söndag<br/>
                <strong>Känd för:</strong> Medeltida murar, strand, historia<br/>
                <strong>Stränder i närheten:</strong> Playa de Muro, Playa d&apos;Alcúdia
              </p>
            </div>
            <a href="https://maps.google.com/?q=Alcudia+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
