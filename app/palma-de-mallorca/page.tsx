export default function PalmaDeMallorca() {
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1555993539-1732b0258235?w=1600&q=90)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Mallorcas hjärta · Huvudstaden</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Palma de Mallorca</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Öns pulserande huvudstad med La Seu, historisk gamla stan och livlig restaurangscen</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Palma de Mallorca</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Palma är en av Medelhavseuropas mest dynamiska städer – en plats där gotisk katedral möter modernistisk arkitektur, och där lokala tapasrestauranger samsas med internationellt erkända kockars krogar. Många som kom för en vecka stannade för ett liv.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>La Seu-katedralen, som reser sig majestätiskt ur havet, dominerar stadsbilden och är ett av Spaniens vackraste gotiska mästerverk. Inne i gamla stan snirklar sig smala gränder förbi mörka patiohus, konstgallerier och välgömda restauranger med bara tio sittplatser.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px' }}>Grytes tips 🌟</h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Besök La Seu på en vardag tidig morgon – inga köer och ljuset är magiskt</li>
              <li>Santa Catalina-kvarteret är det bästa för mat och nattliv – gå dit på kvällen</li>
              <li>Hyra en el-scooter och kör längs paseo marítimo i solnedgången</li>
              <li>Mercat de l'Olivar är bäst på fredags- och lördagsmorgon för färska råvaror</li>
            </ul>
          </div>
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem' }}>📍 Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Sydväst Mallorca, huvudstad<br/>
                <strong>Flyg:</strong> 15 min från PMI-flygplatsen<br/>
                <strong>Bästa tid:</strong> Maj, juni, september<br/>
                <strong>Känd för:</strong> La Seu, gamla stan, restauranger<br/>
                <strong>Stränder nearby:</strong> Platja de Palma, Cala Major
              </p>
            </div>
            <a href="https://maps.google.com/?q=Palma+de+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}