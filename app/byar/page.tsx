import Link from 'next/link';
import Image from 'next/image';
import { IconStar, IconBuilding, IconPin, IconBulb, IconMap } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';
import JsonLd from '@/app/components/JsonLd';
import { cities, cityPath } from '@/data/cities';
import { cityUrl } from '@/app/lib/city-seo';

const TOP3_ICONS = [IconStar, IconBuilding, IconPin] as const;

const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Städer och byar på Mallorca',
  numberOfItems: cities.length,
  itemListElement: cities.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    url: cityUrl(c),
  })),
};

export default function ByarSida() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <JsonLd data={itemList} />
      <HeroImage
        src="https://images.unsplash.com/photo-1566815687825-39bd872e6e09"
        alt="Panoramabild över Mallorca med vita stenhus och Tramuntanabergen – översikt över öns städer och byar"
        kicker="Utforska Mallorca"
        title="Städer och Byar"
        subtitle={`${cities.length} utvalda destinationer runt hela ön`}
        height="55vh"
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(30px, 4vw, 60px) clamp(16px, 4vw, 60px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '24px' }}>
          {cities.map((stad) => (
            <div key={stad.slug} className="byar-card" style={{ background: 'white', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <Image src={stad.card.image} alt={stad.name} width={600} height={180} style={{ width: '100%', height: '180px', objectFit: 'cover' }} loading="lazy" />
                <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#993335', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.05em' }}>
                  {stad.region}
                </div>
              </div>
              <div style={{ padding: '22px' }}>
                <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.05em', margin: '0 0 8px', lineHeight: '1.15', color: '#111' }}>{stad.name}</h2>
                <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: '1.7', margin: '0 0 12px' }}>{stad.card.description}</p>
                <div style={{ margin: '12px 0' }}>
                  {stad.card.top3.map((sak, j) => {
                    const Icon = TOP3_ICONS[j];
                    return (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', borderBottom: j < 2 ? '1px solid #f0ebe3' : 'none' }}>
                        <span style={{ flexShrink: 0, color: '#383a46', display: 'inline-flex', alignItems: 'center' }}>
                          <Icon size={16} />
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#374151' }}>{sak}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '8px 12px', fontSize: '0.85rem', color: '#444', marginTop: '10px', marginBottom: '14px', lineHeight: '1.6' }}>
                  <IconBulb size={14} style={{ verticalAlign: '-2px', marginRight: 4 }} /> {stad.card.tip}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stad.name + ' Mallorca')}`} target="_blank" rel="noopener noreferrer"
                    style={{ flex: 1, textAlign: 'center', padding: '8px 12px', background: '#993335', color: '#fefefb', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem' }}>
                    <IconMap size={14} style={{ verticalAlign: '-2px', marginRight: 4 }} /> Visa på karta
                  </a>
                  <Link href={cityPath(stad)}
                    style={{ flex: 1, textAlign: 'center', padding: '8px 12px', background: 'white', color: '#993335', border: '2px solid #993335', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem' }}>
                    Utforska →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
