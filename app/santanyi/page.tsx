import { IconStar, IconPin } from '@/components/Icons';
import { CITIES, buildCityMetadata } from '@/app/lib/city-seo';
import { CityJsonLd } from '@/app/lib/CityJsonLd';
import HeroImage from '@/components/HeroImage';

const city = CITIES['santanyi'];
export const metadata = buildCityMetadata(city);

export default function Santanyi() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <CityJsonLd city={city} />
      {/* TODO: hero photo reused across multiple towns — replace with Santanyí-specific (onsdagsmarknaden / honungsgul sandsten) */}
      <HeroImage
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Marknadsby Santanyí i södra Mallorca byggd i honungsgul sandsten"
        kicker="Södra Mallorca · Mallorca"
        title="Santanyi"
        subtitle="Charmig marknadsby i söder, känd för sin onsdagsmarknad och närheten till Cala Llombards"
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div className="city-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Santanyi</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Santanyi är en av Mallorcas mest charmiga byar, byggd i den karakteristiska gulbruna sandstenen som kallas ”mares”. Byn har ett levande torgliv, ett starkt konsthantverk och en avslappnad atmosfär som lockar tillbaka besökare år efter år.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Onsdags- och lördagsmarknaden är en av öns bästa – här blandas lokala producenter med konsthantverk, textilier och olivoljor. Under sommaren tar arkaderna skugga och det är perfekt att ta en pausa på något av kafeteriorna runt torget.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Insider-tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Onsdagsmarknaden är bättre än lördagens – mindre folk, mer lokalt</li>
              <li>Cala Llombards (15 min bort) är en av öns vackraste privatstränder</li>
              <li>Beställ ”pa amb oli” på baren vid kyrkan – klassisk mallorcansk snack</li>
              <li>Glöm inte galleriet Sa Quartera – gratis och riktigt bra samtidskonst</li>
            </ul>
          </div>
          <aside>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconPin size={16} /> Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Södra Mallorca, 65 km från Palma<br/>
                <strong>Bil:</strong> Ca 55 min från Palma<br/>
                <strong>Marknad:</strong> Onsdag &amp; lördag fm<br/>
                <strong>Känd för:</strong> Marknad, sandstensarkitektur<br/>
                <strong>Stränder i närheten:</strong> Cala Llombards, Cala Santanyi
              </p>
            </div>
            <a href="https://maps.google.com/?q=Santanyi+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta ↗
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}

