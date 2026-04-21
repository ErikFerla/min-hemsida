// verified 2026-04-07
import { IconStar, IconBuilding, IconPin } from '@/components/Icons';
import { CITIES, buildCityMetadata } from '@/app/lib/city-seo';
import { CityJsonLd } from '@/app/lib/CityJsonLd';
import HeroImage from '@/components/HeroImage';

const city = CITIES['soller'];
export const metadata = buildCityMetadata(city);

export default function Soller() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <CityJsonLd city={city} />
      {/* TODO: hero photo is a generic Tramuntana image reused on multiple towns — replace with Sóller-specific imagery */}
      <HeroImage
        src="https://images.unsplash.com/photo-1566815687825-39bd872e6e09"
        alt="Bergsby i Serra de Tramuntana – Sóller omgiven av apelsinlundar och klippväggar"
        kicker="Nordvästra Mallorca · Tramuntana"
        title="Sóller"
        subtitle="Bergsby med historisk spårvagn, omgiven av apelsinlundar och Serra de Tramuntana"
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div className="city-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Sóller</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Sóller ligger inbäddad i en frodig dal omgiven av Tramuntanabergens dramatiska siluetter. Det är en bergsby med franskt inflytande – en gång välbärgad tack vare handel med apelsiner och citrus, vilket syns i de modernistiska byggnaderna runt torget.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Den historiska trätåget från Palma (sedan 1912) och spårvägen ner till Port de Sóller är en av Mallorcas mest ikoniska upplevelser. Port de Sóller är en halvmåneformad bukt med en avslappnad strandpromenad och bra fiskrestauranger.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Insider-tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Ta det historiska träntåget från Palma – ett minne för livet (boka i förväg)</li>
              <li>Åk spårvägen ner till Port de Sóller och ta en bukt-kaffe på morgonen</li>
              <li>Köp färska apelsiner direkt från en bonde längs vägen in i byn</li>
              <li>Vandringen till Biniaraix – 45 min – är en av öns bästa korta leder</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#383a46' }}>Topp 3 i Sóller</h2>
              {[
                { Icon: IconStar, text: 'Historiska spårvagnen ner till Port de Sóller – åk tur och retur' },
                { Icon: IconBuilding, text: 'Apelsinlundarna – köp färskpressad juice direkt från bönderna' },
                { Icon: IconPin, text: 'Firó-festivalen i maj – unikt historiskt skådespäl på gatorna' },
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
                <strong>Plats:</strong> Nordväst, 30 km från Palma<br/>
                <strong>Tåg:</strong> Från Palma (Ferrocarril de Sóller)<br/>
                <strong>Bästa tid:</strong> April–juni, september<br/>
                <strong>Känd för:</strong> Spårvagn, apelsiner, Tramuntana<br/>
                <strong>Stränder i närheten:</strong> Port de Sóller, Platja d'en Repic
              </p>
            </div>
            <a href="https://maps.google.com/?q=Soller+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta ↗
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}