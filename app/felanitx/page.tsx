import { IconStar, IconBuilding, IconPin } from '@/components/Icons';
import { CITIES, buildCityMetadata } from '@/app/lib/city-seo';
import { CityJsonLd } from '@/app/lib/CityJsonLd';
import HeroImage from '@/components/HeroImage';

const city = CITIES['felanitx'];
export const metadata = buildCityMetadata(city);

export default function Felanitx() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <CityJsonLd city={city} />
      {/* TODO: hero photo reused across multiple towns — replace with Felanitx-specific (keramik / vingård / Castell de Santueri) */}
      <HeroImage
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Traditionell inlandsstad Felanitx i östra Mallorca känd för keramik och vinodling"
        kicker="Östra Mallorca · Keramik & marknad"
        title="Felanitx"
        subtitle="Autentisk inlandsstad känd för sin fina keramik, lokala viner och livlig söndagsmarknad"
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div className="city-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Felanitx</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Felanitx är en autentisk inland-stad känd för sin fina keramik, lokala viner och en livlig söndagsmarknad. Nära Cala d&apos;Or och Portocolom – ett perfekt mellanstopp på en dag längs östkusten.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Uppe på Puig de Sant Salvador (509 m) finns ett kloster med fantastisk utsikt över hela östra Mallorca – ett besök värt att planera in. Nere i staden präglas torget av den imponerande kyrkan Sant Miquel.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Insider-tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Söndagsmarknaden startar tidigt – bäst läge är vid öppning kl 08</li>
              <li>Köp lokal keramik direkt från hantverkarna, priserna är rimliga</li>
              <li>Kör upp till Castell de Santueri för fantastisk panoramautsikt</li>
              <li>Kombinera med Portocolom (20 min) för en hel dagsutflykt</li>
            </ul>
            <div style={{ marginTop: '40px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '16px' }}>Höjdpunkter</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><IconStar size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#383a46', lineHeight: '1.5' }}>Söndagsmarknaden med lokal keramik</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><IconBuilding size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#383a46', lineHeight: '1.5' }}>Castell de Santueri med panoramautsikt</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                  <span style={{ color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><IconPin size={20} /></span>
                  <span style={{ fontSize: '1rem', color: '#383a46', lineHeight: '1.5' }}>Lokalt vin från Felanitx-vingårdarna</span>
                </div>
              </div>
            </div>
          </div>
          <aside>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconPin size={16} /> Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Östra Mallorca, 46 km från Palma<br/>
                <strong>Bil:</strong> Ca 45 min från Palma<br/>
                <strong>Marknad:</strong> Söndag<br/>
                <strong>Känd för:</strong> Keramik, vin, medeltida borg<br/>
                <strong>Stränder i närheten:</strong> Cala d&apos;Or, Portocolom
              </p>
            </div>
            <a href="https://maps.google.com/?q=Felanitx+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
