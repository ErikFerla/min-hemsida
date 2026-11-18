import Link from 'next/link';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import HeroImage from '@/components/HeroImage';
import JsonLd from '@/app/components/JsonLd';
import { SITE_URL } from '@/app/guide/guides';
import { IconSun, IconUsers, IconWave, IconForkKnife, IconFlag, IconPin, IconGlass, IconSnow, IconHiker, IconCompass, IconSnorkel } from '@/components/Icons';
import styles from './guider.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Guider till Mallorca – barn, stränder & golf | MyMallorca' },
  description:
    'Alla våra guider till Mallorca: bästa restid, var du ska bo, med barn eller som par, stränder, restauranger, golf, vandring, båtturer och vintern.',
  alternates: { canonical: '/guider' },
  openGraph: {
    title: 'Guider till Mallorca – restid, barn, stränder & golf',
    description:
      'Alla våra guider till Mallorca: bästa restid, var du ska bo, med barn eller som par, stränder, restauranger, golf, vandring, båtturer och vintern.',
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
  {
    href: '/var-ska-man-bo',
    title: 'Var ska man bo på Mallorca?',
    passar: 'För alla som planerar',
    text: 'Öns områden med för- och nackdelar för barnfamiljer, par, aktiva och dig som vill bo länge – och ett quiz som föreslår orter som passar er.',
    Icon: IconPin,
  },
  {
    href: '/mallorca-for-par',
    title: 'Mallorca för par',
    passar: 'För par i alla åldrar',
    text: 'Vingårdar, golf, lugna byar, stränder och middagar – våra förslag för en resa på tu man hand.',
    Icon: IconGlass,
  },
  {
    href: '/vandring-och-cykling',
    title: 'Vandring och cykling',
    passar: 'För aktiva',
    text: 'GR 221 i Serra de Tramuntana, klassiska vandringar och cykelstigningar – med säsong, svårighetsgrad och säkerhet.',
    Icon: IconHiker,
  },
  {
    href: '/batutflykter-och-cabrera',
    title: 'Båtutflykter och Cabrera',
    passar: 'För havsälskare',
    text: 'Båtturer längs kusten och nationalparken Cabrera – hur du tar dig dit och vad du behöver veta.',
    Icon: IconSnorkel,
  },
  {
    href: '/dagsturer-utan-bil',
    title: 'Dagsturer utan bil',
    passar: 'För dig utan hyrbil',
    text: 'Utflykter från Palma med tåg, buss och spårvagn – till Sóller, Valldemossa, marknaderna i inlandet och norra kusten.',
    Icon: IconCompass,
  },
  {
    href: '/mallorca-pa-vintern',
    title: 'Mallorca på vintern',
    passar: 'För vinterresenärer och öbor',
    text: 'Vad som är öppet, hur vädret brukar vara, mandelblomningen och vinterns fester – när ön är som lugnast.',
    Icon: IconSnow,
  },
];

const merAttUtforska: { label: string; href: string }[] = [
  { label: 'Resplan dag för dag', href: '/resplan' },
  { label: 'Flyg', href: '/flyg' },
  { label: 'Hyrbil & transport', href: '/hyrbil-och-transport' },
  { label: 'Budget & priser', href: '/budget-och-priser' },
  { label: 'Praktiskt & säkerhet', href: '/praktiskt' },
  { label: 'Marknader', href: '/marknader' },
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
    <div className={styles.page}>
      <JsonLd data={jsonLd} />
      <HeroImage
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Turkost vatten och sandstrand på Mallorca en solig dag"
        kicker="Guider · Mallorca"
        title="Våra guider till Mallorca"
        subtitle="Fördjupningar för dig som vill få ut mer av ön – oavsett om du reser med barn, i par eller bor här."
        height="45vh"
      />

      <div className={styles.container}>
        <p className={styles.intro}>
          Guiderna är skrivna av oss som älskar Mallorca och har upptäckt ön under många år. Här samlar vi det vi själva
          vill veta inför en resa: när det är bäst att åka, vilka stränder som är värda omvägen, var maten är som godast och
          hur du får en lyckad semester med barnen. Välj den guide som passar dig och din resa.
        </p>

        <section aria-labelledby="alla-guider" className={styles.allGuides}>
          <h2 id="alla-guider" className={styles.heading}>
            Alla guider
          </h2>
          <ul className={styles.list}>
            {guider.map(({ href, title, passar, text, Icon }) => (
              <li key={href} className={styles.item}>
                <Link href={href} className={styles.card}>
                  <span className={styles.kicker}>
                    <Icon size={18} />
                    {passar}
                  </span>
                  <h3 className={styles.cardTitle}>
                    {title}
                  </h3>
                  <span className={styles.cardText}>
                    {text}
                  </span>
                  <span className={styles.cardLink}>
                    Läs guiden →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="mer-att-utforska" className={styles.more}>
          <h2 id="mer-att-utforska" className={styles.heading}>
            Mer att utforska
          </h2>
          <p className={styles.moreText}>
            Vill du gå vidare på egen hand? Här hittar du våra översikter över orter, stränder, mat och aktiviteter på ön.
          </p>
          <ul className={styles.chips}>
            {merAttUtforska.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.chip}>
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
