import { IconStar, IconBuilding, IconPin } from '@/components/Icons';
import { CITIES, buildCityMetadata } from '@/app/lib/city-seo';
import { CityJsonLd } from '@/app/lib/CityJsonLd';

const city = CITIES['pollenca'];
export const metadata = buildCityMetadata(city);

export default function Pollenca() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <CityJsonLd city={city} />
      <div style={{ position: 'relative', height: '60vh', backgroundImage: 'url(https://images.unsplash.com/photo-1569231413036-dacdb2cfb7ec?w=1600&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: '60px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Norra Mallorca · Raiguer</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5rem', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Pollença</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>Autentisk by med 365 cypresskantade trappsteg, söndagsmarknad och världsberömd jazzfestival</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div className="city-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om Pollença</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Pollença är en av Mallorcas mest autentiska städer med en stark lokal identitet och lite turistifiering. De 365 cypresskantade trappstegen upp till Calvari är ett måste – en andfådd men värdig promenad som belönar med en av öns vackraste utsikter. Nere på torget pågår söndagsmarknaden varje vecka, år efter år.</p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>Pollença Jazzfestival i juli är ett av Spaniens mest ansedda – internationella stjärnor spelar i det antika romerska kloakerteatern under stjärnhimlen. Boka biljetter långt i förväg, det är alltid fullt. En kort biltur bort ligger Port de Pollença med en lång sandstrand.</p>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Insider-tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              <li>Klättra Calvari-trappan tidigt på morgonen – magisk ljussättning</li>
              <li>Söndagsmarknaden kl 8–13 – lokalt och äkta, ta fika på torget</li>
              <li>Jazzfestivalen i juli – boka tidigt, världsklass under bar himmel</li>
              <li>Port de Pollença 8 min bort – lång sandstrand med familjekänsla</li>
            </ul>
            <div style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#383a46' }}>Topp 3 i Pollença</h2>
              {[
                { Icon: IconStar, text: '365 trappsteg till Calvari – en av öns bästa utsiktspunkter, gratis' },
                { Icon: IconBuilding, text: 'Söndagsmarknaden – autentisk och lokal, en av öns bästa marknader' },
                { Icon: IconPin, text: 'Jazz-festivalen i juli – världsartister under bar himmel' },
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
                <strong>Plats:</strong> Norr, 55 km från Palma<br/>
                <strong>Bil:</strong> Ca 50 min från Palma<br/>
                <strong>Marknad:</strong> Söndagar 08:00–13:00<br/>
                <strong>Jazzfestival:</strong> Juli – boka tidigt<br/>
                <strong>Strand:</strong> Port de Pollença 8 min
              </p>
            </div>
            <a href="https://maps.google.com/?q=Pollenca+Mallorca" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta →
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
