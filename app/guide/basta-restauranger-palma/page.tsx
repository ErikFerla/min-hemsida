import { IconPin, IconInfo, IconBookmark, IconUsers, PriceTag, tierFromEmoji } from '@/components/Icons';
import HeroImage from '@/components/HeroImage';

export const metadata = {
  title: '15 bästa restaurangerna i Palma 2026 – Lokal guide | MyMallorca',
  description: 'Rankade av en lokal: de 15 bästa restaurangerna i Palma de Mallorca. Michelinkrogar, bästa tapas, fisk och skaldjur, och dolda pärlor utan turistpriser.',
};

type Restaurant = {
  namn: string;
  adress: string;
  pris: string;
  specialitet: string;
  bästRätt: string;
  insiderTips: string;
};

const restauranger: Record<string, Restaurant[]> = {
  michelin: [
    { namn: 'Zaranda', adress: 'Carrer de Son Espanyolet, Palma', pris: '💰💰💰💰', specialitet: 'Haute cuisine med mallorquinska råvaror', bästRätt: 'Smörstekt pilgrimsmussla med svart tryffel', insiderTips: 'Boka en månad i förväg. Lunchen (12:30) är billigare och lika bra som middagen.' },
    { namn: 'Marc Fosh', adress: 'Carrer de la Missió, Palma gamla stad', pris: '💰💰💰💰', specialitet: 'Modern medelhavsmat, brittisk kock', bästRätt: 'Bacallà (torsk) med olivolja och örter', insiderTips: 'Boka ett bord vid fönstret mot klostergården. Provmeny (7 rätter) ger bäst värde.' },
    { namn: 'Adrian Quetglas', adress: 'Passeig del Born, Palma', pris: '💰💰💰', specialitet: 'Fusion av spanskt och östeuropeiskt', bästRätt: 'Suckling pig med äpple och chutney', insiderTips: 'Bordsplacering vid baren ger bäst utsikt mot köket. Avsluta med deras hemgjorda glass.' },
  ],
  tapas: [
    { namn: 'La Bodeguilla', adress: 'Carrer de Sant Jaume, Palma', pris: '💰💰', specialitet: 'Klassisk spansk tapas och jamón ibérico', bästRätt: 'Jamón ibérico bellota + manchego + pan con tomate', insiderTips: 'Stå vid bardisken för bäst servis. Beställ hela tapasmenyn – inte á la carte.' },
    { namn: 'Bar España', adress: 'Plaça de Weyler, Palma', pris: '💰', specialitet: 'Lokalt hänge med autentisk atmosfär', bästRätt: 'Croquetas de jamón (husmanskost i världsklass)', insiderTips: 'Dit för frukost kl 09–11. Palmesanerna börjar dagen med kaffe och en tapas.' },
    { namn: 'Tast Club', adress: 'Carrer de Sant Jaume, Palma', pris: '💰💰💰', specialitet: 'Modern tapas, smakrik och kreativ', bästRätt: 'Sobrassada med honung och brioche', insiderTips: 'Sista bordet kl 22:00 – perfekt för en sen spansk middag utan att rusa.' },
    { namn: 'El Camino', adress: 'Carrer dels Apuntadors, La Lonja', pris: '💰💰', specialitet: 'Internationella smaker med spansk bas', bästRätt: 'Burrata med färska tomater och basilikaolja', insiderTips: 'Utomhusservering i bakgården – boka den! Inomhus är trångt.' },
  ],
  fisk: [
    { namn: 'Portixol Restaurant', adress: 'Carrer de Sirena, Portixol hamn', pris: '💰💰💰', specialitet: 'Färsk fisk, utsikt mot hamnen', bästRätt: 'Rissotto med havskräfta och saffran', insiderTips: 'Be om bord nummer 12 – direkt mot vattnet. Kom i solnedgången 20:00.' },
    { namn: 'Es Parlament', adress: 'Carrer del Conquistador, Palma', pris: '💰💰💰', specialitet: 'Klassisk mallorquinsk fiskrestaurang', bästRätt: 'Suquet de peix – mallorquinsk fiskgryta', insiderTips: 'Traditionellt hak frequenterat av lokala politiker. Aldrig dåligt.' },
    { namn: 'Caballito de Mar', adress: 'Passeig de Sagrera, Palma', pris: '💰💰', specialitet: 'Enkelt och fräscht, rätt vid havet', bästRätt: 'Friterad sardiner med aioli', insiderTips: 'Perfekt för lunch i solen. Gå till kassan och välj dagens fångst – handpekat.' },
    { namn: 'Llaut del Born', adress: 'Passeig del Born, Palma', pris: '💰💰', specialitet: 'Fisk och skaldjur mitt i centrum', bästRätt: 'Gambas al ajillo (vitlöksräkor)', insiderTips: 'Beläget på bästa adress. Terrassen längs promenaden är oslagbar för kvällsmiddag.' },
  ],
  lokalt: [
    { namn: 'Celler Sa Premsa', adress: 'Plaça del Bisbe Berenguer de Palou, Palma', pris: '💰', specialitet: 'Palmas mest klassiska lokala restaurang', bästRätt: 'Frit mallorquín (traditionell rätter med potatis och grönsaker)', insiderTips: 'Restaurangen är identisk sedan 1940-talet. Kom hungry – portionerna är enorma.' },
    { namn: "Ca'n Joan de s'Aigo", adress: 'Carrer de Can Sanç, Palma', pris: '💰', specialitet: 'Historiskt kafé sedan 1700-talet', bästRätt: 'Ensaïmada med crema + xocolata (drickchoklad)', insiderTips: 'Det äldsta kaféet på Mallorca. Frukost här kl 08–10 är obligatorisk.' },
    { namn: "Mercat de l'Olivar", adress: "Plaça de l'Olivar, Palma", pris: '💰', specialitet: 'Lokalt matmarknad med barer och tapas', bästRätt: 'Vad som helst från fiskedisken – direkt från havet', insiderTips: 'Köp färsk fisk på nedervåningen, gå upp och be en bar laga den. Obeskrivlig upplevelse.' },
    { namn: 'Calatrava Bistro', adress: 'Carrer dels Calatrava, gamla stan', pris: '💰💰', specialitet: 'Mysig bistro i hjärtat av gamla Palma', bästRätt: 'Dagsmenyn (14:00–16:00) – 3 rätter + vin för 18 €', insiderTips: 'Bäst förbordsköp i Palma – den dolda Dagsmenyn listas inte på hemsidan, fråga personalen.' },
  ],
};

const sections = [
  { key: 'michelin', label: 'Michelinkrogar', kicker: 'Haute cuisine', items: restauranger.michelin },
  { key: 'tapas', label: 'Bästa tapas', kicker: 'Bar & små rätter', items: restauranger.tapas },
  { key: 'fisk', label: 'Fisk och skaldjur', kicker: 'Havet på tallriken', items: restauranger.fisk },
  { key: 'lokalt', label: 'Lokalt & budget', kicker: 'Autentiskt och prisvärt', items: restauranger.lokalt },
];

export default function BästaRestaurangerPalma() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <HeroImage
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
        alt="Dukat restaurangbord med mallorcanska tapas och färska råvaror i Palma"
        kicker="Matguide · 2026"
        title="15 bästa restaurangerna i Palma"
        subtitle="Handplockade av en lokal – inte TripAdvisor-rankade. Från Michelinstjärnor till 1 €-frukost."
        height="52vh"
      />

      <div style={{ maxWidth: '820px', margin: '0 auto', padding: 'clamp(32px,6vw,64px) clamp(16px,5vw,40px)' }}>
        <div style={{ background: 'white', border: '1px solid #ede5da', borderRadius: 16, padding: '18px 20px', marginBottom: 40 }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: 600, margin: '0 0 10px' }}>Prisskala</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 16px', fontSize: '0.85rem', color: '#374151' }}>
            <Row tier={1} label="Under 20 €" />
            <Row tier={2} label="20–40 €" />
            <Row tier={3} label="40–70 €" />
            <Row tier={4} label="70+ €" />
          </div>
        </div>

        {sections.map(section => (
          <section key={section.key} style={{ marginBottom: 56 }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#993335', fontWeight: 700, margin: '0 0 6px' }}>{section.kicker}</p>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem,5.2vw,2.4rem)', letterSpacing: '0.03em', color: '#383a46', margin: '0 0 22px', lineHeight: 1 }}>{section.label}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {section.items.map(r => <RestaurantCard key={r.namn} r={r} />)}
            </div>
          </section>
        ))}

        <div style={{ background: '#383a46', borderRadius: 20, padding: 'clamp(28px,6vw,40px)', textAlign: 'center', color: 'white', marginTop: 40 }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.6rem,5vw,2rem)', letterSpacing: '0.03em', margin: '0 0 10px' }}>Mer mat och vin på Mallorca</h2>
          <p style={{ opacity: 0.8, margin: '0 0 22px', fontSize: '0.95rem', lineHeight: 1.55 }}>Vingårdar, lokala marknader och fler restaurangtips utanför Palma.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/mat" style={{ display: 'inline-block', background: '#993335', color: '#fefefb', padding: '12px 24px', borderRadius: 10, fontFamily: '"Bebas Neue", sans-serif', fontSize: '1rem', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 700 }}>SE MATGUIDEN</a>
            <a href="/vingardar" style={{ display: 'inline-block', background: 'transparent', color: 'white', padding: '12px 24px', borderRadius: 10, fontFamily: '"Bebas Neue", sans-serif', fontSize: '1rem', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 700, border: '1px solid rgba(255,255,255,0.3)' }}>VINGÅRDAR</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ tier, label }: { tier: number; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <PriceTag tier={tier} /> <span>{label}</span>
    </div>
  );
}

function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <article style={{ background: 'white', borderRadius: 16, padding: '20px', border: '1px solid #ede5da', boxShadow: '0 4px 14px rgba(31,41,55,0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
        <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.35rem', letterSpacing: '0.04em', margin: 0, color: '#383a46', lineHeight: 1.1 }}>{r.namn}</h3>
        <PriceTag tier={tierFromEmoji(r.pris)} />
      </div>
      <p style={{ margin: '0 0 10px', fontSize: '0.8rem', color: '#9CA3AF', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <IconPin size={12} /> {r.adress}
      </p>
      <p style={{ margin: '0 0 14px', fontSize: '0.92rem', color: '#374151', lineHeight: 1.5 }}>{r.specialitet}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <InfoBlock label="Beställ detta" icon={<IconBookmark size={12} stroke={2} />} tone="warm">{r.bästRätt}</InfoBlock>
        <InfoBlock label="Insider-tips" icon={<IconInfo size={12} stroke={2} />} tone="teal">{r.insiderTips}</InfoBlock>
      </div>
    </article>
  );
}

function InfoBlock({ label, icon, tone, children }: { label: string; icon: React.ReactNode; tone: 'warm' | 'teal'; children: React.ReactNode }) {
  const colors = tone === 'warm'
    ? { bg: '#F9F6F1', label: '#9B7B3C' }
    : { bg: '#EEF6F7', label: '#993335' };
  return (
    <div style={{ background: colors.bg, borderRadius: 10, padding: '12px 14px' }}>
      <p style={{ margin: '0 0 4px', fontSize: '0.68rem', color: colors.label, textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {icon} {label}
      </p>
      <p style={{ margin: 0, fontSize: '0.88rem', color: '#374151', lineHeight: 1.5 }}>{children}</p>
    </div>
  );
}
