import { IconStar, IconBuilding, IconPin, IconSparkle } from '@/components/Icons';
import { CITIES, buildCityMetadata } from '@/app/lib/city-seo';
import { CityJsonLd } from '@/app/lib/CityJsonLd';

const city = CITIES['palma-de-mallorca'];
export const metadata = buildCityMetadata(city);

export default function PalmaDeMallorca() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <CityJsonLd city={city} />
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1566993850067-bb8df9c9807e?w=1600&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Mallorcas hjärta · Huvudstaden</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Palma de Mallorca</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Öns pulserande huvudstad med La Seu, historisk gamla stan och livlig restaurangscen</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div className="city-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Palma de Mallorca</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Palma är en av Medelhavseuropas mest dynamiska städer – en plats där gotisk katedral möter modernistisk arkitektur, och där lokala tapasrestauranger samsas med internationellt erkända kockars krogar. Många som kom för en vecka stannade för ett liv.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>La Seu-katedralen, som reser sig majestätiskt ur havet, dominerar stadsbilden och är ett av Spaniens vackraste gotiska mästerverk. Inne i gamla stan snirklar sig smala gränder förbi mörka patiohus, konstgallerier och välgömda restauranger med bara tio sittplatser.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Insider-tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Besök La Seu på en vardag tidig morgon – inga köer och ljuset är magiskt</li>
              <li>Santa Catalina-kvarteret är det bästa för mat och nattliv – gå dit på kvällen</li>
              <li>Hyra en el-scooter och kör längs paseo marítimo i solnedgången</li>
              <li>Mercat de l'Olivar är bäst på fredags- och lördagsmorgon för färska råvaror</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#383a46' }}>Topp 3 i Palma</h2>
              {[
                { Icon: IconStar, text: 'La Seu-katedralen – gå dit innan kl 10 för gratis entré och bästa ljuset' },
                { Icon: IconBuilding, text: 'Gamla stan (Casc Antic) – gå vilse i gränderna och hitta dolda barer' },
                { Icon: IconPin, text: 'Bellver Slott – bästa utsikten över Palma, kom vid solnedgång' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 0', borderBottom: i < 2 ? '1px solid #ede5da' : 'none' }}>
                  <span style={{ flexShrink: 0, color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><item.Icon size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#374151', lineHeight: '1.6' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <aside>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconPin size={16} /> Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Sydväst Mallorca, huvudstad<br/>
                <strong>Flyg:</strong> 15 min från PMI-flygplatsen<br/>
                <strong>Bästa tid:</strong> Maj, juni, september<br/>
                <strong>Känd för:</strong> La Seu, gamla stan, restauranger<br/>
                <strong>Stränder i närheten:</strong> Platja de Palma, Cala Major
              </p>
            </div>
            <a href="https://maps.google.com/?q=Palma+de+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginTop: '20px', border: '1px solid #ede5da' }}>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.05em', marginBottom: '16px', color: '#383a46', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconSparkle size={18} /> Boka upplevelser i Palma</h3>
              {[
                { text: 'Guidad tur i gamla stan (2h)', pris: 'från 295 kr', länk: 'https://www.getyourguide.com/palma-de-mallorca-l790/walking-tours-tc56/?partner_id=DITT_ID' },
                { text: 'La Seu – guidad katedral-tur', pris: 'från 195 kr', länk: 'https://www.getyourguide.com/palma-de-mallorca-l790/la-seu-cathedral-tc257/?partner_id=DITT_ID' },
                { text: 'E-bike-tur runt Palma', pris: 'från 595 kr', länk: 'https://www.getyourguide.com/palma-de-mallorca-l790/bike-tours-tc64/?partner_id=DITT_ID' },
              ].map((item, i) => (
                <a key={i} href={item.länk} target="_blank" rel="noopener noreferrer sponsored"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 0', borderBottom: i < 2 ? '1px solid #f0ebe3' : 'none',
                    textDecoration: 'none', color: '#383a46' }}
                >
                  <span style={{ fontSize: '0.9rem' }}>{item.text}</span>
                  <span style={{ fontSize: '0.85rem', color: '#993335', fontWeight: '700', flexShrink: 0 }}>{item.pris} →</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}