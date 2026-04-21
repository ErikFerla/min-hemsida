import { IconStar, IconBuilding, IconPin } from '@/components/Icons';
import { CITIES, buildCityMetadata } from '@/app/lib/city-seo';
import { CityJsonLd } from '@/app/lib/CityJsonLd';
import HeroImage from '@/components/HeroImage';

const city = CITIES['inca'];
export const metadata = buildCityMetadata(city);

export default function Inca() {
  const topItems = [
    { Icon: IconStar, text: 'Torsdagsmarknaden – öns näst största, fantastiskt urval av läderskor till rea' },
    { Icon: IconBuilding, text: 'Cellers – traditionella källarrestauranger med äkta mallorquinska rätter' },
    { Icon: IconPin, text: 'Dijous Bo i november – Mallorcas största marknadshändelse sedan medeltiden' },
  ];
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <CityJsonLd city={city} />
      {/* TODO: hero photo reused across multiple towns — replace with Inca-specific (torsdagsmarknaden / läder / cellers) */}
      <HeroImage
        src="https://images.unsplash.com/photo-1566815687825-39bd872e6e09"
        alt="Läderstaden Inca i centrala Mallorca"
        kicker="Centrala Mallorca · Raiguer"
        title="Inca"
        subtitle="Mallorcas läderhuvudstad med berömd torsdagsmarknad och traditionella källarrestauranger"
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div className="city-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Inca</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Inca är Mallorcas näst folkrikaste stad och känd som öns läderhuvudstad. Läderfabriker och butiker har producerat skor, väskor och bälten här i generationer, och torsdagsmarknaden – öns näst största – lockar köpare från hela Mallorca. Priserna på kvalitetsskor är ofta långt under det du betalar i Stockholm.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Celler-restaurangerna är en unik inkansk tradition – källare under gamla stadshus som börjat som vinförråd och nu serverar traditionell mallorquinska mat. Dijous Bo i november är Mallorcas största marknadshändelse med hundratusentals besökare.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Insider-tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Torsdagsmarknaden – kom 08:30 för bästa urval av skor och läder</li>
              <li>Celler-restaurang till lunch – ärlig mallorcansk mat i vinkällare</li>
              <li>Dijous Bo i november – öns största marknadshändelse, boka hotell tidigt</li>
              <li>Ta tåget från Palma – spar parkering och stressfriheten</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#383a46' }}>Topp 3 i Inca</h2>
              {topItems.map((item, i) => (
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
                <strong>Plats:</strong> Centrala Mallorca, 30 km från Palma<br/>
                <strong>Tåg:</strong> Direktlinje från Palma (30 min)<br/>
                <strong>Marknad:</strong> Torsdagar<br/>
                <strong>Dijous Bo:</strong> November – öns största<br/>
                <strong>Känd för:</strong> Läder, skor, celler-mat
              </p>
            </div>
            <a href="https://maps.google.com/?q=Inca+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
