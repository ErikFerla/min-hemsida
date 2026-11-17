import Link from 'next/link';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import HeroImage from '@/components/HeroImage';
import JsonLd from '@/app/components/JsonLd';
import { SITE_URL } from '@/app/guide/guides';
import { IconSun, IconUsers, IconWave, IconForkKnife, IconFlag } from '@/components/Icons';

export const metadata: Metadata = {
  title: { absolute: 'Guider till Mallorca – barn, stränder & golf | MyMallorca' },
  description:
    'Alla våra guider till Mallorca på ett ställe: bästa tiden att resa, Mallorca med barn, de bästa stränderna, restauranger i Palma och golf på ön.',
  alternates: { canonical: '/guider' },
  openGraph: {
    title: 'Guider till Mallorca – restid, barn, stränder & golf',
    description:
      'Alla våra guider till Mallorca på ett ställe: bästa tiden att resa, Mallorca med barn, de bästa stränderna, restauranger i Palma och golf på ön.',
    url: '/guider',
    type: 'website',
    locale: 'sv_SE',
  },
};

type Guide = {
  href: string;
  title: string;
  passar: string;
  text: string;
  Icon: ComponentType<{ size?: number }>;
};

const guider: Guide[] = [
  {
    href: '/guide/basta-tid-resa-mallorca',
    title: 'Bästa tiden att resa till Mallorca',
    passar: 'För alla som planerar',
    text: 'Månad för månad: temperatur, badvatten, hur mycket folk det är och vad det kostar. Här ser du när ön passar just dig – strand, vandring, golf eller en lugn kulturresa.',
    Icon: IconSun,
  },
  {
    href: '/guide/mallorca-med-barn',
    title: 'Familjesemester på Mallorca',
    passar: 'För barnfamiljer',
    text: 'Så planerar du resan med barn: vilken strand som passar vilken ålder, när ni ska åka, hyrbil och barnstol – och familjefavoriterna på en karta.',
    Icon: IconUsers,
  },
  {
    href: '/guide/basta-stranderna-mallorca',
    title: 'Mallorcas 15 bästa stränder',
    passar: 'För strandälskare',
    text: 'Från vita sandstränder som Es Trenc till små vikar längs kusten. Med tips om parkering, när du ska komma och vilka stränder som passar barn bäst.',
    Icon: IconWave,
  },
  {
    href: '/guide/basta-restauranger-palma',
    title: 'Bästa restaurangerna i Palma',
    passar: 'För matälskare',
    text: 'Våra favoriter i Palma de Mallorca – från kvarterskrogar och tapasbarer till fisk och skaldjur och några riktigt fina middagar.',
    Icon: IconForkKnife,
  },
  {
    href: '/guide/golf-mallorca-guide',
    title: 'De 5 bästa golfbanorna',
    passar: 'För golfare',
    text: 'Våra fem favoritbanor beskrivna närmare: svårighetsgrad, greenfee och vilken säsong som är bäst att spela.',
    Icon: IconFlag,
  },
];

const merAttUtforska: { label: string; href: string }[] = [
  { label: 'Städer & byar', href: '/byar' },
  { label: 'Alla stränder', href: '/strandar' },
  { label: 'Barnaktiviteter', href: '/barn' },
  { label: 'Mat & vin', href: '/mat' },
  { label: 'Vingårdar', href: '/vingardar' },
  { label: 'Aktiviteter', href: '/aktiviteter' },
  { label: 'Evenemang', href: '/evenemang' },
  { label: 'Väder', href: '/vader' },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Guider till Mallorca',
    url: `${SITE_URL}/guider`,
    numberOfItems: guider.length,
    itemListElement: guider.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.title,
      url: `${SITE_URL}${g.href}`,
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Guider', item: `${SITE_URL}/guider` },
    ],
  },
];

export default function GuiderPage() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <JsonLd data={jsonLd} />
      <HeroImage
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Turkost vatten och sandstrand på Mallorca en solig dag"
        kicker="Guider · Mallorca"
        title="Våra guider till Mallorca"
        subtitle="Fördjupningar för dig som vill få ut mer av ön – oavsett om du reser med barn, i par eller bor här."
        height="45vh"
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,40px)' }}>
        <p style={{ fontSize: 'clamp(1rem, 2.2vw, 1.15rem)', lineHeight: 1.7, color: '#4b5563', maxWidth: '68ch', margin: '0 0 48px' }}>
          Guiderna är skrivna av oss som älskar Mallorca och har upptäckt ön under många år. Här samlar vi det vi själva
          vill veta inför en resa: när det är bäst att åka, vilka stränder som är värda omvägen, var maten är som godast och
          hur du får en lyckad semester med barnen. Välj den guide som passar dig och din resa.
        </p>

        <section aria-labelledby="alla-guider">
          <h2
            id="alla-guider"
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 400, letterSpacing: '0.05em', color: '#383a46', margin: '0 0 24px' }}
          >
            Alla guider
          </h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(16px, 2.5vw, 24px)',
            }}
          >
            {guider.map(({ href, title, passar, text, Icon }) => (
              <li key={href} style={{ display: 'flex' }}>
                <Link
                  href={href}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    padding: '24px',
                    background: 'white',
                    borderRadius: '14px',
                    border: '1px solid #ede5da',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                    textDecoration: 'none',
                    color: '#383a46',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#993335', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '12px' }}>
                    <Icon size={18} />
                    {passar}
                  </span>
                  <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', fontWeight: 400, letterSpacing: '0.04em', lineHeight: 1.15, margin: '0 0 10px', color: '#383a46' }}>
                    {title}
                  </h3>
                  <span style={{ display: 'block', fontSize: '0.92rem', lineHeight: 1.6, color: '#4b5563', marginBottom: '16px', flexGrow: 1 }}>
                    {text}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#993335' }}>
                    Läs guiden →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="mer-att-utforska" style={{ marginTop: 'clamp(48px, 7vw, 72px)', background: '#F0EBE3', borderRadius: '16px', padding: 'clamp(24px, 4vw, 36px)', borderLeft: '4px solid #993335' }}>
          <h2
            id="mer-att-utforska"
            style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.5rem,3.5vw,2rem)', fontWeight: 400, letterSpacing: '0.05em', color: '#383a46', margin: '0 0 8px' }}
          >
            Mer att utforska
          </h2>
          <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 20px' }}>
            Vill du gå vidare på egen hand? Här hittar du våra översikter över orter, stränder, mat och aktiviteter på ön.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {merAttUtforska.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', padding: '0 16px', background: 'white', border: '1px solid #ede5da', borderRadius: '999px', color: '#383a46', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
