export default function Soller() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Nordvästra Mallorca · Tramuntana</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Sóller</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Bergsby med historisk spårvagn, omgiven av apelsinlundar och Serra de Tramuntana</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Sóller</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Sóller ligger inbäddad i en frodig dal omgiven av Tramuntanabergens dramatiska siluetter. Det är en bergsby med franskt inflytande – en gång välbärgad tack vare handel med apelsiner och citrus, vilket syns i de modernistiska byggnaderna runt torget.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Den historiska trätåget från Palma (sedan 1912) och spårvägen ner till Port de Sóller är en av Mallorcas mest ikoniska upplevelser. Port de Sóller är en halvmåneformad bukt med en avslappnad strandpromenad och bra fiskrestauranger.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px' }}>Grytes tips 🌟</h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Ta det historiska träntåget från Palma – ett minne för livet (boka i förväg)</li>
              <li>Åk spårvägen ner till Port de Sóller och ta en bukt-kaffe på morgonen</li>
              <li>Köp färska apelsiner direkt från en bonde längs vägen in i byn</li>
              <li>Vandringen till Biniaraix – 45 min – är en av öns bästa korta leder</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#1F2937' }}>Topp 3 i Sóller</h2>
              {[
                { icon: '⭐', text: 'Historiska spårvagnen ner till Port de Sóller – åk tur och retur' },
                { icon: '🏛️', text: 'Apelsinlundarna – köp färskpressad juice direkt från bönderna' },
                { icon: '📍', text: 'Firó-festivalen i maj – unikt historiskt skådespäl på gatorna' },
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
                <strong>Tåg:</strong> Från Palma (Ferrocarril de Sóller)<br/>
                <strong>Bästa tid:</strong> April–juni, september<br/>
                <strong>Känd för:</strong> Spårvagn, apelsiner, Tramuntana<br/>
                <strong>Stränder nearby:</strong> Port de Sóller, Platja d'en Repic
              </p>
            </div>
            <a href="https://maps.google.com/?q=Soller+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}