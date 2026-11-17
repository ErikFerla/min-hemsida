import Link from 'next/link';
import { IconStar, IconBuilding, IconPin } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { CityJsonLd, cityBreadcrumbs } from '@/app/lib/CityJsonLd';
import type { City } from '@/data/cities';

const HIGHLIGHT_ICONS = [IconStar, IconBuilding, IconPin] as const;

/** Gemensam mall för alla stadssidor. Allt innehåll kommer från data/cities.ts. */
export default function CityTemplate({ city }: { city: City }) {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <CityJsonLd city={city} />
      <HeroImage
        src={city.hero.image}
        alt={city.hero.alt}
        kicker={city.hero.kicker}
        title={city.name}
        subtitle={city.hero.subtitle}
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 60px' }}>
        <div style={{ marginBottom: '32px' }}>
          <Breadcrumbs items={cityBreadcrumbs(city)} />
        </div>
        <div className="city-grid">
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '16px' }}>Om {city.name}</h2>
            {city.about.map((text, i) => (
              <p key={i} style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>{text}</p>
            ))}
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>Insider-tips <IconStar size={20} /></h3>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#444', paddingLeft: '20px' }}>
              {city.tips.map((tip, i) =>
                typeof tip === 'string' ? (
                  <li key={i}>{tip}</li>
                ) : (
                  <li key={i}>
                    {tip.text}{' '}
                    <Link href={tip.link.href} style={{ color: '#993335', fontWeight: 600, textDecoration: 'underline' }}>{tip.link.label}</Link>
                  </li>
                ),
              )}
            </ul>
            {city.highlights?.variant === 'list' && (
              <div style={{ marginTop: '32px', marginBottom: '32px' }}>
                <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', letterSpacing: '0.05em', marginBottom: '20px', color: '#383a46' }}>{city.highlights.heading}</h2>
                {city.highlights.items.map((text, i, all) => {
                  const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
                  return (
                    <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 0', borderBottom: i < all.length - 1 ? '1px solid #ede5da' : 'none' }}>
                      <span style={{ flexShrink: 0, color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><Icon size={20} /></span>
                      <span style={{ fontSize: '1rem', color: '#374151', lineHeight: '1.6' }}>{text}</span>
                    </div>
                  );
                })}
              </div>
            )}
            {city.highlights?.variant === 'cards' && (
              <div style={{ marginTop: '40px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '16px' }}>{city.highlights.heading}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {city.highlights.items.map((text, i) => {
                    const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'white', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
                        <span style={{ color: '#383a46', display: 'inline-flex', alignItems: 'center' }}><Icon size={20} /></span>
                        <span style={{ fontSize: '1rem', color: '#383a46', lineHeight: '1.5' }}>{text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <aside>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '16px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconPin size={16} /> Praktisk info</h3>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.8' }}>
                {city.practical.map((row, i) => (
                  <span key={row.label}>
                    {i > 0 && <br />}
                    <strong>{row.label}:</strong> {row.value}
                  </span>
                ))}
              </p>
            </div>
            <a href={`https://maps.google.com/?q=${city.mapsQuery}`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.95rem' }}>
              Visa på karta ↗
            </a>
            {city.places && (
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginTop: '20px', border: '1px solid #ede5da' }}>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.05em', marginBottom: '16px', color: '#383a46', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconPin size={18} /> {city.places.heading}</h3>
                {city.places.items.map((item, i, all) => (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '12px 0', borderBottom: i < all.length - 1 ? '1px solid #f0ebe3' : 'none',
                      textDecoration: 'none', color: '#383a46' }}
                  >
                    <span style={{ fontSize: '0.9rem' }}>{item.text}</span>
                    <span style={{ fontSize: '0.85rem', color: '#993335', fontWeight: '700', flexShrink: 0 }}>Karta ↗</span>
                  </a>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
