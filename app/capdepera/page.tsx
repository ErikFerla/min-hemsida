import { IconStar, IconBuilding, IconPin } from '@/components/Icons';
import { CITIES, buildCityMetadata } from '@/app/lib/city-seo';
import { CityJsonLd } from '@/app/lib/CityJsonLd';
import HeroImage from '@/components/HeroImage';

const city = CITIES['capdepera'];
export const metadata = buildCityMetadata(city);

export default function Capdepera() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <CityJsonLd city={city} />
      {/* TODO: hero photo reused across multiple towns — replace with Capdepera-specific (Castell de Capdepera) */}
      <HeroImage
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Pittoresk by i nordöstra Mallorca – Capdepera med det medeltida fortet"
        kicker="Nordöstra Mallorca · Llevant"
        title="Capdepera"
        subtitle="Pittoresk by dominerad av ett mäktigt medeltida fort med panoramautsikt över nordöstra Mallorca"
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div className="city-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Capdepera</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Capdepera domineras av Castell de Capdepera – ett enormt medeltida fort som kröner kullen ovanför byn. Inifrån murarna har man en fantastisk panoramautsikt över hela nordöstra hörnet av Mallorca, havet och bortom. Byn nedan är charmig med vita hus och blomsterprydda gränder.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Strax nedanför ligger Cala Rajada – ett livligt fiskeläge och badort med flera fina stränder. Solnedgångarna sett från borgmurarna är spektakulära och ett av de bästa fotomotivet på norra Mallorca.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Insider-tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Besök borgen vid solnedgång – utsikten och ljuset är oöverträffat</li>
              <li>Cala Rajada 5 min bort – bra stränder och fiskrestauranger</li>
              <li>Ta med picknick till borgmurarna – inga restauranger däruppe</li>
              <li>Kombinera med ett besök till Coves d&apos;Artà som ligger nära</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#383a46' }}>Topp 3 i Capdepera</h2>
              {[
                { Icon: IconStar, text: 'Castell de Capdepera vid solnedgång – panoramautsikt och magiskt ljus' },
                { Icon: IconBuilding, text: 'Cala Rajada – livlig hadstrand med fina stränder och fiskrestauranger' },
                { Icon: IconPin, text: 'Panoramautsikten över havet – en av nordöstras bästa utsiktspunkter' },
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
          </aside>
        </div>
      </div>
    </div>
  );
}
