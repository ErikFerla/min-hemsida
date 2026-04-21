import { IconStar, IconBuilding, IconPin, IconSparkle } from '@/components/Icons';
import { CITIES, buildCityMetadata } from '@/app/lib/city-seo';
import { CityJsonLd } from '@/app/lib/CityJsonLd';
import HeroImage from '@/components/HeroImage';

const city = CITIES['campos'];
export const metadata = buildCityMetadata(city);

export default function Campos() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <CityJsonLd city={city} />
      {/* TODO: replace with Campos-specific hero photo (salt flats, Es Trenc or Campos stadskärna) — this is a generic southern-Mallorca Unsplash placeholder */}
      <HeroImage
        src="https://images.unsplash.com/photo-1533105079780-92b9be482077"
        alt="Södra Mallorcas lantliga landskap med torrmurar och jordbruksmark nära Campos och Es Trenc"
        kicker="Södra Mallorca · Lantlig"
        title="Campos"
        subtitle="Saltstaden med två marknadsdagar och porten till Es Trenc"
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div className="city-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Campos</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Campos ligger på Migjorn-slätten i södra Mallorca – bokstavligen omgivet av jordbruksmark, mandelträd och låga stenmurar. Det är en riktig mallorcansk småstad utan turistförskönad fasad, med sandstenskvarter, gröna fönsterluckor och torg där äldre fortfarande pratar bred mallorquí.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Stadens hjärta är marknaderna – två per vecka, på torsdagar och lördagar – där lokala bönder säljer allt från getostar och Sa Pobla-potatis till kryddor och grovt salt från de närliggande saltpannorna. Just saltet är Campos signatur: Flor de Sal d&apos;Es Trenc skördas för hand i de gamla saltpannorna några kilometer söderut och räknas till världens finaste havssalt. Och bakom saltpannorna öppnar sig Es Trenc – en 6 kilometer lång orörd strand med vatten så turkost att den kallas Mallorcas Karibien.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Insider-tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Gå på torsdagsmarknaden, inte lördagen – mindre folk och bönderna tar tid att prata</li>
              <li>Köp saltet direkt från fabriken vid Salines d&apos;Es Trenc – betydligt billigare än i Palma, och du ser produktionen</li>
              <li>Parkera i Campos och ta bussen (linje 525) till Es Trenc i juli–augusti – parkeringarna vid stranden är fulla före 10:30</li>
              <li>Testa en ensaïmada från något av Campos gamla bagerier tidigt på morgonen, fortfarande varm</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#383a46' }}>Topp 3 i Campos &amp; omnejd</h2>
              {[
                { Icon: IconStar, text: 'Es Trenc-stranden – 6 km orörd sand, turkost vatten, ingen bebyggelse (10 min bort)' },
                { Icon: IconBuilding, text: 'Salines d\u2019Es Trenc – besök saltpannorna där Flor de Sal skördas för hand, guidad tur ~50 min' },
                { Icon: IconPin, text: 'Torsdags- eller lördagsmarknaden – äkta lokal marknad med producenter från hela södra Mallorca' },
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
                <strong>Plats:</strong> Södra Mallorca, lantligt<br/>
                <strong>Flyg:</strong> 30 min från PMI-flygplatsen<br/>
                <strong>Buss:</strong> Direktlinje från flygplatsen några gånger per dag<br/>
                <strong>Bästa tid:</strong> Maj–juni, september (före och efter Es Trenc-rusningen)<br/>
                <strong>Känd för:</strong> Flor de Sal, Es Trenc, torsdags- och lördagsmarknad<br/>
                <strong>I närheten:</strong> Es Trenc (10 min), Colònia de Sant Jordi, Ses Covetes
              </p>
            </div>
            <a href="https://maps.google.com/?q=Campos+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginTop: '20px', border: '1px solid #ede5da' }}>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.05em', marginBottom: '16px', color: '#383a46', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconSparkle size={18} /> Boka upplevelser i Campos</h3>
              {[
                { text: 'Guidad tur i Salines d\u2019Es Trenc', pris: 'från 10 €', länk: 'https://www.getyourguide.com/campos-l173478/salines-tc56/?partner_id=DITT_ID' },
                { text: 'Kajakpaddling vid Es Trenc-kusten', pris: 'från 35 €', länk: 'https://www.getyourguide.com/campos-l173478/kayaking-tc55/?partner_id=DITT_ID' },
                { text: 'Flor de Sal provsmakning och workshop', pris: 'från 25 €', länk: 'https://www.getyourguide.com/campos-l173478/food-workshops-tc96/?partner_id=DITT_ID' },
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
