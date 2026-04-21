import { IconStar, IconPin } from '@/components/Icons';
import { CITIES, buildCityMetadata } from '@/app/lib/city-seo';
import { CityJsonLd } from '@/app/lib/CityJsonLd';
import HeroImage from '@/components/HeroImage';

const city = CITIES['porto-petro'];
export const metadata = buildCityMetadata(city);

export default function PortoPetro() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <CityJsonLd city={city} />
      {/* TODO: hero photo reused across multiple towns — replace with Porto Petro-specific (marinan) */}
      <HeroImage
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Exklusiv marinaby Porto Petro i södra Mallorca med segelbåtar"
        kicker="Sydkusten · Mallorca"
        title="Porto Petro"
        subtitle="Exklusiv och lugn marinaby i sydost, populär bland segelbåtar och fridfulla resenärer"
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div className="city-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Porto Petro</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Porto Petro är en av Mallorcas mest exklusiva och minst kända marinabyer. Belägen längs sydkusten har den lyckats undfly massturismen och bevarat sin karaktär av ett stilla fiskesamhälle – nu befolkat av segelbåtar och stillsamma flanörer.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Det kristallklara vattnet i marinan speglar omgivande klippor och tallskog. Längs kajen finns några enstaka restauranger och en bar – och det är allt. Inget bråk, ingen kö, ingen DJ. Bara det bästa av Medelhavet.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Insider-tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Kayaka runt viken på morgonen – vattnet är spegelblank och orört</li>
              <li>Bar Cala Mondragó (5 min bort) – hyra parasol och ta en öl i paradiset</li>
              <li>Parkera ute vid landsvägen och promenera ner – spar frustration</li>
              <li>Solnedgångsprosecco på kajen är den bästa aktiviteten i Porto Petro</li>
            </ul>
          </div>
          <aside>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconPin size={16} /> Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                <strong>Plats:</strong> Sydkusten, 65 km från Palma<br/>
                <strong>Bil:</strong> Ca 55 min från Palma<br/>
                <strong>Bästa tid:</strong> Maj–september<br/>
                <strong>Känd för:</strong> Marinan, lugn, snorkling<br/>
                <strong>Stränder i närheten:</strong> Cala Mondragó, Cala Egos
              </p>
            </div>
            <a href="https://maps.google.com/?q=Porto+Petro+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}