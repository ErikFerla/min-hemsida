



import { IconStar, IconBuilding, IconPin } from '@/components/Icons';
import { CITIES, buildCityMetadata } from '@/app/lib/city-seo';
import { CityJsonLd } from '@/app/lib/CityJsonLd';

const city = CITIES['porto-colom'];
export const metadata = buildCityMetadata(city);

export default function PortoColom() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <CityJsonLd city={city} />
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1566815687825-39bd872e6e09?w=1600&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Östkusten · Mallorca</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Porto Colom</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Pittoresk fiskeby med en av Mallorcas vackraste naturliga hamnar</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div className="city-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Porto Colom</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Porto Colom är en av Mallorcas mest autentiska fiskebyar, belägen på östkusten. Till skillnad från många andra kustorter har Porto Colom lyckats bevara sin ursprungliga karaktär med färglada fiskarbåtar, vita hus och en avslappnad atmosfär som tar dig tillbaka i tiden.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Hamnen är en av de vackraste naturliga hamnarna på ön och är omgiven av pittoreska byggnader i ockra och rosa toner. På morgonen kan du se fiskarna lossa sin fångst – och om du frågar snällt säljer de direkt från båten.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px' }}>Insider-tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Skippa turistkrogarna vid hamnen – gå till baksidan av torget</li>
              <li>Fråga efter “el peix del dia” – färsk fisk fångad samma dag</li>
              <li>Bästa solnädgången ses från klipporna vid Calo de Sa Barca Trencada</li>
              <li>Parkera vid kyrkan – parkeringen vid hamnen är alltid full</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#383a46' }}>Topp 3 i Porto Colom</h2>
              {[
                { Icon: IconStar, text: 'Naturhamnen – en av Mallorcas vackraste, perfekt för kvällspromenad' },
                { Icon: IconBuilding, text: 'Färsk fisk från fiskarna vid hamnen – kom kl 7–8 på morgonen' },
                { Icon: IconPin, text: 'Cala Marçal – fin sandstrand precis utanför byn' },
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
                <strong>Plats:</strong> Östkusten, 60 km från Palma<br/>
                <strong>Bil:</strong> Ca 50 min från Palma<br/>
                <strong>Bästa tid:</strong> Maj–oktober<br/>
                <strong>Känd för:</strong> Fiske, autentisk atmosfär<br/>
                <strong>Stränder i närheten:</strong> Cala Marçal, Cala Sa Nau
              </p>
            </div>
            <a href="https://maps.google.com/?q=Porto+Colom+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
