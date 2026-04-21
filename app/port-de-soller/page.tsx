import { IconStar, IconBuilding, IconPin } from '@/components/Icons';
import { CITIES, buildCityMetadata } from '@/app/lib/city-seo';
import { CityJsonLd } from '@/app/lib/CityJsonLd';
import HeroImage from '@/components/HeroImage';

const city = CITIES['port-de-soller'];
export const metadata = buildCityMetadata(city);

export default function PortDeSoller() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <CityJsonLd city={city} />
      {/* TODO: hero photo reused across multiple towns — replace with Port de Sóller-specific (cirkelformad vik / spårvagn) */}
      <HeroImage
        src="https://images.unsplash.com/photo-1566815687825-39bd872e6e09"
        alt="Hamnby i Tramuntana – Port de Sóller med cirkelformad vik och fiskebåtar"
        kicker="Nordvästra Mallorca · Vacker hamnby"
        title="Port de Sóller"
        subtitle="En av Mallorcas mest pittoreska hamnbyar med naturlig vik – nådd med historisk spårvagn från Sóller"
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div className="city-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Port de Sóller</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Port de Sóller är en av Mallorcas mest pittoreska hamnbyar med en naturlig rundad vik omgiven av Tramuntana-bergen. Nås med den historiska spårvagnen från Sóller – en upplevelse i sig.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Hamnen omges av restauranger och caféer med utsikt mot det blågröna Medelhavet. Viken är skyddad och lugn, perfekt för simning och snorkling. På kvällen samlas besökare längs promenaden för att se solen gå ned bakom bergen.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Insider-tips <IconStar size={20} /></h3>
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
                  <span style={{ color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><IconStar size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#383a46', lineHeight: '1.5' }}>Historiska spårvagnen från Sóller</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><IconBuilding size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#383a46', lineHeight: '1.5' }}>Solnedgången vid hamnen</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><IconPin size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#383a46', lineHeight: '1.5' }}>Snorkling och kajakpaddling i viken</span>
                </div>
              </div>
            </div>
          </div>
          <aside>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconPin size={16} /> Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Nordväst, 30 km från Palma<br/>
                <strong>Spårvagn:</strong> 15 min från Sóller<br/>
                <strong>Känd för:</strong> Hamn, spårvagn, natur<br/>
                <strong>Stränder i närheten:</strong> Platja de Port de Sóller
              </p>
            </div>
            <a href="https://maps.google.com/?q=Port+de+Soller+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta ↗
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
