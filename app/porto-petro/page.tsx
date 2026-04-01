export default function PortoPetro() {
  return (
    <div style={{ background: '#e8e8e8', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1600&q=90)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Sydkusten · Mallorca</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Porto Petro</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Exklusiv och lugn marinaby i sydost, populär bland segelbåtar och fridfulla resenärer</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Porto Petro</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Porto Petro är en av Mallorcas mest exklusiva och minst kända marinabyer. Belägen längs sydkusten har den lyckats undfly massturismen och bevarat sin karaktär av ett stilla fiskesamhälle – nu befolkat av segelbåtar och stillsamma flanörer.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Det kristallklara vattnet i marinan speglar omgivande klippor och tallskog. Längs kajen finns några enstaka restauranger och en bar – och det är allt. Inget bråk, ingen kö, ingen DJ. Bara det bästa av Medelhavet.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px' }}>Grytes tips 🌟</h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Kayaka runt viken på morgonen – vattnet är spegelblank och orört</li>
              <li>Bar Cala Mondragó (5 min bort) – hyra parasol och ta en öl i paradiset</li>
              <li>Parkera ute vid landsvägen och promenera ner – spar frustration</li>
              <li>Solnedgångsprosecco på kajen är den bästa aktiviteten i Porto Petro</li>
            </ul>
          </div>
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem' }}>📍 Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Sydkusten, 65 km från Palma<br/>
                <strong>Bil:</strong> Ca 55 min från Palma<br/>
                <strong>Bästa tid:</strong> Maj–september<br/>
                <strong>Känd för:</strong> Marinan, lugn, snorkling<br/>
                <strong>Stränder nearby:</strong> Cala Mondragó, Cala Egos
              </p>
            </div>
            <a href="https://maps.google.com/?q=Porto+Petro+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}