import { IconStar, IconBuilding, IconPin, IconSparkle } from '@/components/Icons';
import { CITIES, buildCityMetadata } from '@/app/lib/city-seo';
import { CityJsonLd } from '@/app/lib/CityJsonLd';
import HeroImage from '@/components/HeroImage';

const city = CITIES['manacor'];
export const metadata = buildCityMetadata(city);

export default function Manacor() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <CityJsonLd city={city} />
      {/* TODO: replace with Manacor-specific hero photo — this is a generic rural-Mallorca Unsplash placeholder reused across the site */}
      <HeroImage
        src="https://images.unsplash.com/photo-1474722883778-792e7990302f"
        alt="Mallorcas landsbygd med mandelträd, olivlundar och torrmurar – östra slätten kring Manacor"
        kicker="Östra Mallorca · Näst största staden"
        title="Manacor"
        subtitle="Pärlstaden med Rafa Nadals hemmaplan – porten till öns östkust och Drach-grottorna"
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div className="city-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Manacor</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Manacor är Mallorcas näst största stad och ligger mitt på öns östra sida. Till skillnad från kustbyarna skriker den inte efter uppmärksamhet. Det här är en arbetsstad med gamla rötter i hantverk och jordbruk – och just därför en av de mest autentiska platserna du kan besöka på ön.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Staden är mest känd som hemstad till Rafael Nadal, som fortfarande bor här, och för Majorica – fabriken som sedan 1890 tillverkar konstgjorda pärlor av fiskfjäll i ett så förfinat hantverk att de nästan är omöjliga att skilja från äkta. Tillsammans med den närliggande Drach-grottan och östkustens vikar gör detta Manacor till en perfekt bas för utforskning, inte bara en genomfartsort.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Insider-tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Åk tåget från Palma till Manacor – en timme, 8 euro, och du slipper bilköerna på östkustens småvägar</li>
              <li>Kombinera morgon i Manacor (marknaden på måndagar) med eftermiddag i Drach-grottorna, 20 minuter bort</li>
              <li>Rafa Nadal Museum Xperience är värt det om du är sportintresserad – men om du bara vill se trofeer räcker fönstertittandet</li>
              <li>Vineriet Bodega Miquel Gelabert bokas i förväg – små produktioner och personlig tasting</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#383a46' }}>Topp 3 i Manacor</h2>
              {[
                { Icon: IconStar, text: 'Majorica pärlafabriken – se hur pärlorna tillverkas för hand, handla direkt från outlet-butiken' },
                { Icon: IconBuilding, text: 'Rafa Nadal Museum Xperience – interaktivt sportmuseum med VR-simulatorer, troféer och personliga föremål' },
                { Icon: IconPin, text: 'Kyrkan Nostra Senyora dels Dolors – neogotisk med Mallorcas högsta klocktorn, syns långt in över slätten' },
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
                <strong>Plats:</strong> Östra Mallorca, inland<br/>
                <strong>Flyg:</strong> 45 min från PMI-flygplatsen<br/>
                <strong>Tåg:</strong> Direktlinje från Palma (~1 timme, varje timme)<br/>
                <strong>Bästa tid:</strong> April–juni, september–oktober<br/>
                <strong>Känd för:</strong> Majorica-pärlor, Rafa Nadal, Drach-grottorna<br/>
                <strong>I närheten:</strong> Porto Cristo (10 km), Cala Varques, Drach-grottorna
              </p>
            </div>
            <a href="https://maps.google.com/?q=Manacor+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginTop: '20px', border: '1px solid #ede5da' }}>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.05em', marginBottom: '16px', color: '#383a46', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconSparkle size={18} /> Boka upplevelser i Manacor</h3>
              {[
                { text: 'Drach-grottorna med båttur', pris: 'från 29 €', länk: 'https://www.getyourguide.com/manacor-l1030/caves-tc1340/?partner_id=DITT_ID' },
                { text: 'Rafa Nadal Museum Xperience-biljett', pris: 'från 12 €', länk: 'https://www.getyourguide.com/manacor-l1030/rafa-nadal-museum-tc2195/?partner_id=DITT_ID' },
                { text: 'Vingårdstur med tasting', pris: 'från 45 €', länk: 'https://www.getyourguide.com/manacor-l1030/wine-tasting-tc121/?partner_id=DITT_ID' },
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
