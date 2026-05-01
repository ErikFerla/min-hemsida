'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import AffiliateCard from '@/app/components/AffiliateCard';

// HERO-BILD: Caló des Moro (södra Mallorca) – Unsplash
// TODO: Byt ut till canonical CDN-URL för Chloé Lefleurs foto F0ZUIUeW490
// (https://unsplash.com/photos/a-blue-lagoon-surrounded-by-trees-on-a-sunny-day-F0ZUIUeW490)
// när fotografens URL är bekräftad. Tills dess används en befintlig Caló des Moro-bild.
const HERO_BASE = 'https://images.unsplash.com/photo-1560243360-0eb6e88f0d08';
const HERO_Q = 'q=80&auto=format&fm=webp&fit=crop';
const HERO_SRC = `${HERO_BASE}?w=1600&${HERO_Q}`;
const HERO_SRCSET = [640, 960, 1280, 1600, 2000]
  .map(w => `${HERO_BASE}?w=${w}&${HERO_Q} ${w}w`)
  .join(', ');
const HERO_ALT = 'Caló des Moro på södra Mallorca – turkost vatten, kalkstensklippor och pinjeskog vid en dold vik';

const stränder = [
  { namn: 'Caló des Moro', region: 'Syd', typ: 'Vik', svårighet: 'Promenad krävs', längd: '40m', beskrivning: 'Topprankad år efter år som Spaniens vackraste vik. Turkost vatten likt en pool, omgiven av klippor och tallskog. Inga faciliteter – kom tidigt!', tips: 'Kom före kl 9 på morgonen – fullsatt redan kl 10 på sommaren', maps: 'https://maps.google.com/?q=Calo+des+Moro+Mallorca', bild: 'https://images.unsplash.com/photo-1560243360-0eb6e88f0d08?w=600&q=80', familj: false, snorkling: true, nudist: false, redaktionellt: { typ: 'varning', text: 'Kom INTE efter kl 10 på sommaren – stranden är fullsatt och parkeringen stängd' } },
  { namn: 'Es Trenc', region: 'Syd', typ: 'Sandstrand', svårighet: 'Enkel', längd: '2,1 km', beskrivning: 'Mallorcas Karibien – 2 km kritvit sandstrand och turkost vatten i ett naturreservat. Ingen storskalig bebyggelse. Nudistsektion finns.', tips: 'Ta bussen från Campos – parkeringen kostar 8€ och fylls snabbt', maps: 'https://maps.google.com/?q=Es+Trenc+Mallorca', bild: 'https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=80', familj: true, snorkling: false, nudist: true, redaktionellt: { typ: 'bast', text: 'Bäst för: Långa stranddagar och äkta Mallorca-känsla utan hotellkomplex' } },
  { namn: 'Cala Figuera (Formentor)', region: 'Norr', typ: 'Stenstrand', svårighet: 'Promenad krävs', längd: '30m', beskrivning: 'Rankad #1 av Holidu. Avskild vik på Formentorhalvön med kristallklart vatten och rik marin miljö. Perfekt för snorkling.', tips: '1,5 km promenad från parkeringen – ta med vattenskor', maps: 'https://maps.google.com/?q=Cala+Figuera+Formentor+Mallorca', bild: 'https://images.unsplash.com/photo-1593174898997-488a0443e852?w=600&q=80', familj: false, snorkling: true, nudist: false, redaktionellt: { typ: 'tips', text: 'Ta med vattenskor – bottnen är stenig men vattnet är helt fantastiskt' } },
  { namn: 'Cala Llombards', region: 'Syd', typ: 'Vik', svårighet: 'Enkel', längd: '80m', beskrivning: 'Vacker avskild vik nära Santanyi med brant klippomgivning och kristallklart turkost vatten. Liten strandbar på plats.', tips: 'Bäst på morgonen – populär men inte överfull om man kommer tidigt', maps: 'https://maps.google.com/?q=Cala+Llombards+Mallorca', bild: 'https://images.unsplash.com/photo-1560243360-0eb6e88f0d08?w=600&q=80', familj: true, snorkling: true, nudist: false, redaktionellt: { typ: 'info', text: 'Liten parkering som fylls tidigt – cykla dit om du bor i närheten' } },
  { namn: 'Cala Mesquida', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '350m', beskrivning: 'Vacker naturstrand i naturreservat nära Capdepera med vita sanddyner och tallskog. Extra populär bland surfare tack vare bra vågor.', tips: 'Parkering 100m från stranden – kom tidigt på helger', maps: 'https://maps.google.com/?q=Cala+Mesquida+Mallorca', bild: 'https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=80', familj: true, snorkling: false, nudist: false, redaktionellt: { typ: 'bast', text: 'Bäst för: Surfare och de som vill ha naturstrand utan lyxhotell' } },
  { namn: 'Cala Agulla', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '400m', beskrivning: 'Blåflagg-strand i naturreservat nära Cala Ratjada med klarblått vatten och tallskogsbakgrund. Perfekt för familjer och vattensporter.', tips: 'En av öns renaste stränder – vattnet är grunt och perfekt för barn', maps: 'https://maps.google.com/?q=Cala+Agulla+Mallorca', bild: 'https://images.unsplash.com/photo-1606729734060-3d6de0048e43?w=600&q=80', familj: true, snorkling: true, nudist: false, redaktionellt: { typ: 'tips', text: 'Blåflagg varje år – ett av öns renaste vatten, grunt och perfekt för barn' } },
  { namn: "Cala Mondragó / S'Aramador", region: 'Syd', typ: 'Sandstrand', svårighet: 'Enkel', längd: '75m', beskrivning: "S'Aramador har utsetts till Europas bästa strand. Naturpark med välskyddad vik, grunt barnvänligt vatten och fin ljus sand.", tips: 'Ta turisttåget från Porto Petro på sommaren – enkelt och smidigt', maps: 'https://maps.google.com/?q=Cala+Mondrago+Mallorca', bild: 'https://images.unsplash.com/photo-1606729734060-3d6de0048e43?w=600&q=80', familj: true, snorkling: true, nudist: false, redaktionellt: { typ: 'info', text: 'Naturreservat – ta inte med engångsgrillar eller husdjur' } },
  { namn: 'Playa de Formentor', region: 'Norr', typ: 'Sandstrand', svårighet: 'Enkel', längd: '1,5 km', beskrivning: 'En av öns finaste sandstränder med kritvit sand och utsikt över Pollensabukten. Omgiven av tallskog och dramatiska berg.', tips: 'Färja från Port de Pollença på sommaren – undvik trängsel vid bilparkering', maps: 'https://maps.google.com/?q=Playa+Formentor+Mallorca', bild: 'https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=80', familj: true, snorkling: false, nudist: false, redaktionellt: { typ: 'varning', text: 'Biltillstånd krävs på sommaren – ta bussen från Port de Pollença' } },
  { namn: 'Playa de Muro', region: 'Norr', typ: 'Sandstrand', svårighet: 'Enkel', längd: '5 km', beskrivning: 'En av Mallorcas längsta sandstränder – barnfamiljernas paradis med grunt vatten och sanddyner. Blåflagg och alla faciliteter.', tips: 'Bäst för familjer med barn – grunt och lugnt vatten hela vägen', maps: 'https://maps.google.com/?q=Playa+de+Muro+Mallorca', bild: 'https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=80', familj: true, snorkling: false, nudist: false, redaktionellt: { typ: 'bast', text: 'Bäst för: Barnfamiljer som vill ha allt på ett ställe' } },
  { namn: "Playa d'Alcúdia", region: 'Norr', typ: 'Sandstrand', svårighet: 'Enkel', längd: '15 km', beskrivning: 'Mallorcas längsta sammanhängande strand – 15 km fin sandstrand med alla aktiviteter, restauranger och vattensporter.', tips: 'Perfekt för vattensport – jetski, vindsurfing och parasailing finns tillgängligt', maps: 'https://maps.google.com/?q=Playa+Alcudia+Mallorca', bild: 'https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=80', familj: true, snorkling: false, nudist: false, redaktionellt: { typ: 'tips', text: 'Norra delen är lugnare – gå förbi de stora hotellen' } },
  { namn: 'Sa Calobra', region: 'Nordväst', typ: 'Stenstrand', svårighet: 'Vandring/tunnel', längd: '200m', beskrivning: 'Mallorcas mest dramatiska strand – nås genom tunnlar i berget. Omgiven av skyhöga klippor med turkost kristallklart vatten.', tips: 'Kom tidigt eller sent – fullsatt mitt på dagen. Ta med vattenskor.', maps: 'https://maps.google.com/?q=Sa+Calobra+Mallorca', bild: 'https://images.unsplash.com/photo-1593174898997-488a0443e852?w=600&q=80', familj: false, snorkling: true, nudist: false },
  { namn: 'Cala Varques', region: 'Öst', typ: 'Vik', svårighet: 'Vandring krävs', längd: '60m', beskrivning: 'Orörd paradisvik nära Calas de Mallorca som kräver 20 min vandring genom tallskog. Belöningen är ett av öns vackraste vatten.', tips: 'Ta med picknick – inga faciliteter men absolut värt vandringen', maps: 'https://maps.google.com/?q=Cala+Varques+Mallorca', bild: 'https://images.unsplash.com/photo-1560243360-0eb6e88f0d08?w=600&q=80', familj: false, snorkling: true, nudist: true },
  { namn: "Cala d'Or", region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '5 stränder', beskrivning: "Fem charmiga små stränder – Cala d'Or, Cala Esmeralda, Cala Ferrera, Cala Serena och Cala Gran – omgivna av tallskog och klippor.", tips: 'Cala Gran är störst och mest familjevänlig av de fem bukterna', maps: 'https://maps.google.com/?q=Cala+d+Or+Mallorca', bild: 'https://images.unsplash.com/photo-1606729734060-3d6de0048e43?w=600&q=80', familj: true, snorkling: true, nudist: false },
  { namn: 'Cala Millor', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '1,5 km', beskrivning: 'Populär turiststrand med fin gyllene sand, lugnt vatten och alla faciliteter. Blåflagg och bra för familjer.', tips: 'Nordliga delen av stranden är lugnare och mindre fullsatt', maps: 'https://maps.google.com/?q=Cala+Millor+Mallorca', bild: 'https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Porto Cristo', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '350m', beskrivning: 'Skyddad stadsvik med gyllene sand och hamnanslutning. Perfekt utgångspunkt för Coves del Drach. Alla faciliteter.', tips: 'Kombinera med besök i de berömda drakgrottorna Coves del Drach', maps: 'https://maps.google.com/?q=Porto+Cristo+strand+Mallorca', bild: 'https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Cala Tuent', region: 'Nordväst', typ: 'Vik', svårighet: 'Smal bergväg', längd: '150m', beskrivning: 'Vildromantisk vik vid foten av Tramuntana-bergen med dramatisk klipplandskap. Lugn och avskild med restaurang på plats.', tips: 'Smal och kurvig väg ned – ta det lugnt med bilen', maps: 'https://maps.google.com/?q=Cala+Tuent+Mallorca', bild: 'https://images.unsplash.com/photo-1560243360-0eb6e88f0d08?w=600&q=80', familj: false, snorkling: true, nudist: false },
  { namn: 'Port de Sóller', region: 'Nordväst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '500m', beskrivning: 'Charmig strandby med halvmånformad sandstrand och historisk spårvagn. Mysig atmosfär med bergsutsikt.', tips: 'Ta spårvagnen från Sóller – en upplevelse i sig!', maps: 'https://maps.google.com/?q=Port+de+Soller+strand+Mallorca', bild: 'https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Cala Estellencs', region: 'Nordväst', typ: 'Stenstrand', svårighet: 'Brant väg', längd: '50m', beskrivning: 'Liten stenstrand under Tramuntana-bergen med kristallklart vatten och dramatisk klippomgivning. Populär bland dykare.', tips: 'Brant, smal väg ned – belönas med fantastisk utsikt och klart vatten', maps: 'https://maps.google.com/?q=Cala+Estellencs+Mallorca', bild: 'https://images.unsplash.com/photo-1593174898997-488a0443e852?w=600&q=80', familj: false, snorkling: true, nudist: false },
  { namn: 'Cala Xinxell', region: 'Sydväst', typ: 'Vik', svårighet: 'Enkel', längd: '80m', beskrivning: 'Lugn och undanskymd vik vid Illetas, populär bland lokalbefolkningen. Rena klippor och klart vatten utan turistmassor.', tips: 'Okänd pärla som undviker massturism – lokalbors favorit', maps: 'https://maps.google.com/?q=Cala+Xinxell+Illetas+Mallorca', bild: 'https://images.unsplash.com/photo-1560243360-0eb6e88f0d08?w=600&q=80', familj: false, snorkling: true, nudist: false },
  { namn: 'Playa de Palma', region: 'Sydväst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '5 km', beskrivning: 'Palmas stora stadsriviera med 5 km sandstrand, strandpromenad, restauranger och nöjesutbud. Pulserande atmosfär.', tips: 'Perfekt för dem som vill kombinera strand med stadsliv och nöjen', maps: 'https://maps.google.com/?q=Playa+de+Palma+Mallorca', bild: 'https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Cala Canyamel', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '300m', beskrivning: 'Lugn sandstrand mellan Cala Ratjada och Cala Millor med vackra berg i bakgrunden. Lite mindre besökt än grannstränderna.', tips: 'Bra alternativ om Cala Millor känns för fullsatt', maps: 'https://maps.google.com/?q=Cala+Canyamel+Mallorca', bild: 'https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Es Carbó', region: 'Syd', typ: 'Sandstrand', svårighet: 'Enkel', längd: '1 km', beskrivning: 'Lugn och rensatt sandstrand på södra Mallorca med turkost vatten och färre turister än grannstränder som Es Trenc.', tips: 'Bra alternativ till Es Trenc om du vill ha mer lugn och ro', maps: 'https://maps.google.com/?q=Es+Carbo+Mallorca', bild: 'https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Port de Pollença', region: 'Norr', typ: 'Sandstrand', svårighet: 'Enkel', längd: '2 km', beskrivning: 'Lång smal sandstrand med lugnt vatten och vacker bergsutsikt. Charmig strandpromenad och livlig restaurangscen.', tips: 'Perfekt för morgonpromenad – en av öns bästa strandpromenader', maps: 'https://maps.google.com/?q=Port+de+Pollenca+strand+Mallorca', bild: 'https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Cala Ferrera', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '200m', beskrivning: "En av de fem charmiga bukterna i Cala d'Or-området med fin sand och klart vatten. Lugn och familjevänlig.", tips: 'Mindre och mer intim än grannbukterna – bra för par', maps: 'https://maps.google.com/?q=Cala+Ferrera+Mallorca', bild: 'https://images.unsplash.com/photo-1606729734060-3d6de0048e43?w=600&q=80', familj: true, snorkling: true, nudist: false },
  { namn: 'Cala Romantica', region: 'Öst', typ: 'Vik', svårighet: 'Enkel', längd: '100m', beskrivning: 'Vacker skyddad vik med klart vatten och tallskog runt om. Lugn atmosfär som passar för romantiska utflykter.', tips: 'Kom tidigt – den lilla parkeringen fylls snabbt på sommaren', maps: 'https://maps.google.com/?q=Cala+Romantica+Mallorca', bild: 'https://images.unsplash.com/photo-1560243360-0eb6e88f0d08?w=600&q=80', familj: false, snorkling: true, nudist: false },
  { namn: 'Cala Sa Nau', region: 'Öst', typ: 'Vik', svårighet: 'Enkel', längd: '80m', beskrivning: "Pittoresk bukt nära Cala d'Or med riktigt klart vatten och fin sand. Populär bland snorklare och familjer.", tips: 'En av östkustens mest underskattade stränder', maps: 'https://maps.google.com/?q=Cala+Sa+Nau+Mallorca', bild: 'https://images.unsplash.com/photo-1560243360-0eb6e88f0d08?w=600&q=80', familj: true, snorkling: true, nudist: false },
  { namn: 'Portal Vells', region: 'Sydväst', typ: 'Vik', svårighet: 'Grusväg', längd: '100m', beskrivning: 'Gömd strand utan hotell och turism – lokalbornas hemliga favorit. Gratis parkering, liten gratisparkering.', tips: 'Kom tidigt – liten gratisparkering. Nästan bara lokalbefolkning här.', maps: 'https://maps.google.com/?q=Portal+Vells+Mallorca', bild: 'https://images.unsplash.com/photo-1560243360-0eb6e88f0d08?w=600&q=80', familj: false, snorkling: true, nudist: true },
  { namn: 'Cala Marçal', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '500m', beskrivning: 'Fin sandstrand nära Porto Colom med lugnt vatten och bra faciliteter. Barnvänlig och välorganiserad.', tips: 'Perfekt dagstrip från Porto Colom – ta med snorkelmask', maps: 'https://maps.google.com/?q=Cala+Marcal+Mallorca', bild: 'https://images.unsplash.com/photo-1606729734060-3d6de0048e43?w=600&q=80', familj: true, snorkling: true, nudist: false },
  { namn: 'Cala Torta', region: 'Öst', typ: 'Sandstrand', svårighet: 'Grusväg', längd: '400m', beskrivning: 'Naturstrand nära Artà utan hotell eller kommersiell verksamhet. Omgiven av klippor och tallskog – äkta Mallorca.', tips: 'Grusväg dit – ta det lugnt. Inga solstolar att hyra, ta med parasol.', maps: 'https://maps.google.com/?q=Cala+Torta+Mallorca', bild: 'https://images.unsplash.com/photo-1606729734060-3d6de0048e43?w=600&q=80', familj: false, snorkling: true, nudist: true },
  { namn: 'Cala Bona', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '250m', beskrivning: 'Charmig strand med liten fiskehamn nära Cala Millor. Mer autentisk atmosfär än grannorten med lokala restauranger.', tips: 'Ät middag vid hamnen efter ett dopp – bättre restauranger än Cala Millor', maps: 'https://maps.google.com/?q=Cala+Bona+Mallorca', bild: 'https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=80', familj: true, snorkling: false, nudist: false },
];

const regioner = ['Alla', 'Norr', 'Nordväst', 'Öst', 'Syd', 'Sydväst'];
const typer = ['Alla typer', 'Sandstrand', 'Vik', 'Stenstrand'];

export default function StrandarPage() {
  return (
    <Suspense fallback={<div style={{ background: '#fefefb', minHeight: '100vh' }} />}>
      <StrandarContent />
    </Suspense>
  );
}

function StrandarContent() {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get('region');

  const [region, setRegion] = useState('Alla');
  const [typ, setTyp] = useState('Alla typer');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (regionParam) setRegion(regionParam);
  }, [regionParam]);

  const visade = stränder.filter(s => {
    if (region !== 'Alla' && s.region !== region) return false;
    if (typ !== 'Alla typer' && s.typ !== typ) return false;
    if (filter === 'familj' && !s.familj) return false;
    if (filter === 'snorkling' && !s.snorkling) return false;
    if (filter === 'nudist' && !s.nudist) return false;
    return true;
  });

  const chipStyle = (aktiv: boolean) => ({
    minHeight: '40px',
    padding: '0 16px',
    borderRadius: '999px',
    border: aktiv ? '1px solid #383a46' : '1px solid #E2D8C8',
    background: aktiv ? '#383a46' : '#FFFFFF',
    color: aktiv ? '#FFFFFF' : '#383a46',
    fontWeight: 600 as const,
    cursor: 'pointer',
    fontSize: '0.88rem',
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
    transition: 'all 0.16s ease',
  });

  const scrollRowStyle = {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto' as const,
    overflowY: 'hidden' as const,
    WebkitOverflowScrolling: 'touch' as const,
    scrollbarWidth: 'none' as const,
    padding: '2px 2px 4px',
  };

  const filterLabelStyle = {
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: '#9CA3AF',
    margin: '0 0 10px',
  };

  const hasActiveFilter = region !== 'Alla' || typ !== 'Alla typer' || filter !== '';

  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <header>
        {/* Hero-bild – LCP-element, eager-laddad med srcset och fetchpriority="high" */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(360px, 58vh, 620px)',
          overflow: 'hidden',
          background: '#0b1f2a',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_SRC}
            srcSet={HERO_SRCSET}
            sizes="100vw"
            alt={HERO_ALT}
            width={2000}
            height={1333}
            // @ts-expect-error – fetchpriority är giltigt HTML-attribut men ännu inte i Reacts DOM-typer i alla versioner
            fetchpriority="high"
            loading="eager"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 55%',
              display: 'block',
            }}
          />
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.55) 100%)',
          }} />
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            padding: 'clamp(24px,5vw,56px) clamp(20px,5vw,80px)',
            color: '#fff',
          }}>
            <p style={{ fontSize: 'clamp(0.7rem,1.5vw,0.8rem)', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fff', fontWeight: 700, margin: '0 0 12px', opacity: 0.92, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              Upptäck kusten
            </p>
            <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem,6vw,3.4rem)', fontWeight: 600, letterSpacing: '-0.015em', margin: '0 0 6px', lineHeight: 1.05, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.45)' }}>
              Stränder på Mallorca
            </h1>
            <div style={{ width: 48, height: 2, background: '#fff', opacity: 0.9, margin: '14px 0 0', borderRadius: 2 }} />
          </div>
        </div>
        <p style={{
          margin: '8px 0 0',
          padding: '0 clamp(16px, 4vw, 40px)',
          fontSize: '0.75rem',
          color: '#6b7280',
          textAlign: 'right',
          letterSpacing: '0.02em',
          lineHeight: 1.4,
        }}>
          Foto: Chloé Lefleur / Unsplash
        </p>

        {/* Intro – geografisk översikt med interna länkar */}
        <div style={{ background: '#fefefb', padding: 'clamp(32px,5vw,56px) clamp(20px,5vw,80px) clamp(16px,3vw,32px)' }}>
          <div style={{ maxWidth: '68ch', margin: '0 auto' }}>
            <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.1rem)', color: '#374151', lineHeight: 1.75, margin: '0 0 18px' }}>
              Mallorca rymmer mer än 200 stränder och vikar längs sina fyra kuster. På ostkusten ligger öns mest fotograferade <em>calas</em> – små turkosa vikar inbäddade mellan kalkstensklippor och pinjeskog, som Caló des Moro och Cala Mondragó. Nordkusten bjuder på långa sandstränder i de grunda bukterna vid{' '}
              <a href="/alcudia" style={{ color: '#993335', textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '3px' }}>Alcúdia</a>
              {' '}och{' '}
              <a href="/pollenca" style={{ color: '#993335', textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '3px' }}>Pollença</a>
              {' '}– perfekta för barnfamiljer. Västkusten domineras av Serra de Tramuntanas dramatiska klippor som faller rakt ner i havet – få stränder, men desto fler hemliga vikar och båtankringsplatser. Och söderut öppnar sig de långa sandstränderna kring Es Trenc, med ett Karibien-liknande vatten.
            </p>
            <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.1rem)', color: '#374151', lineHeight: 1.75, margin: 0 }}>
              Här är våra 30 favoriter – handplockade efter vatten, atmosfär och vad som gör varje plats unik.
            </p>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(30px, 4vw, 60px) clamp(16px, 4vw, 60px)' }}>
        <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.65, margin: '0 0 24px', maxWidth: '62ch' }}>
          Använd filtren nedan för att hitta rätt strand för dig. Filtrera på område, strandtyp eller kännetecken som familjevänlighet eller snorkling.
        </p>
        <style>{`
          .strand-scroll-row::-webkit-scrollbar { display: none; }
        `}</style>
        <div style={{ marginBottom: '32px', background: 'white', border: '1px solid #ede5da', borderRadius: '16px', padding: 'clamp(16px,4vw,22px)', boxShadow: '0 4px 14px rgba(31,41,55,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', gap: 12 }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#383a46', margin: 0 }}>Filtrera stränder</p>
            {hasActiveFilter && (
              <button onClick={() => { setRegion('Alla'); setTyp('Alla typer'); setFilter(''); }} style={{ background: 'none', border: 'none', color: '#993335', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', padding: 6, minHeight: 32 }}>Rensa</button>
            )}
          </div>

          <div style={{ marginBottom: '18px' }}>
            <p style={filterLabelStyle}>Område</p>
            <div className="strand-scroll-row" style={scrollRowStyle}>
              {regioner.map(r => <button key={r} onClick={() => setRegion(r)} style={chipStyle(region === r)}>{r}</button>)}
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <p style={filterLabelStyle}>Typ</p>
            <div className="strand-scroll-row" style={scrollRowStyle}>
              {typer.map(t => <button key={t} onClick={() => setTyp(t)} style={chipStyle(typ === t)}>{t}</button>)}
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <p style={filterLabelStyle}>Kännetecken</p>
            <div className="strand-scroll-row" style={scrollRowStyle}>
              {[['', 'Visa alla'], ['familj', 'Familjevänlig'], ['snorkling', 'Snorkling'], ['nudist', 'Nudistsektion']].map(([val, label]) =>
                <button key={val} onClick={() => setFilter(val)} style={chipStyle(filter === val)}>{label}</button>
              )}
            </div>
          </div>

          <p style={{ marginTop: '12px', color: '#6B5D4F', fontSize: '0.9rem', fontWeight: 600 }}>{visade.length} stränder visas</p>
        </div>

        <div style={{ background: '#F0EBE3', borderRadius: '12px', padding: '18px 20px', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <p style={{ margin: 0, fontSize: '0.92rem', color: '#374151', lineHeight: 1.5, flex: '1 1 220px' }}>
            <strong>Vill du ha djupare analys?</strong> Läs vår rankade guide med GPS, parkeringstips och insider-tips.
          </p>
          <a href="/guide/basta-stranderna-mallorca" style={{ background: '#993335', color: 'white', padding: '0 20px', minHeight: '44px', display: 'inline-flex', alignItems: 'center', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '700', whiteSpace: 'nowrap' }}>
            Läs guiden →
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '20px' }}>
          {visade.map((s, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.06)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 35px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)'; }}>
              <div style={{ position: 'relative', aspectRatio: '16 / 9' }}>
                <Image src={s.bild} alt={s.namn} fill sizes="(max-width: 600px) 100vw, 400px" style={{ objectFit: 'cover' }} loading="lazy" />
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                  <span style={{ background: 'rgba(0,0,0,0.65)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.02em' }}>{s.region}</span>
                  <span style={{ background: 'rgba(14,116,144,0.92)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.02em' }}>{s.typ}</span>
                </div>
              </div>
              <div style={{ padding: '20px 20px 22px' }}>
                <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.55rem', letterSpacing: '0.04em', margin: '0 0 8px', lineHeight: 1.1, color: '#111' }}>{s.namn}</h2>
                <p style={{ fontSize: '0.82rem', color: '#7A6B5C', margin: '0 0 14px', fontWeight: 500 }}>
                  {s.längd} <span style={{ color: '#D4C7B5', margin: '0 8px' }}>•</span> {s.svårighet}
                </p>
                <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.6, margin: '0 0 14px' }}>{s.beskrivning}</p>
                <div style={{ background: '#FDF6EC', borderLeft: '3px solid #993335', borderRadius: '6px', padding: '10px 14px', fontSize: '0.88rem', color: '#4B3F2F', marginBottom: '14px', lineHeight: 1.55 }}>
                  <strong style={{ color: '#8B6F47', fontWeight: 700 }}>Tips:</strong> {s.tips}
                </div>
                {(s.familj || s.snorkling || s.nudist) && (
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    {s.familj && <span style={{ background: '#E8F3EC', color: '#2e7d32', padding: '5px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>Familj</span>}
                    {s.snorkling && <span style={{ background: '#E3EFF8', color: '#1565c0', padding: '5px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>Snorkling</span>}
                    {s.nudist && <span style={{ background: '#FBEFE0', color: '#B65C17', padding: '5px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>Nudist</span>}
                  </div>
                )}
                {s.redaktionellt && (
                  <div style={{
                    padding: '10px 14px', borderRadius: '6px', marginBottom: '16px',
                    background: s.redaktionellt.typ === 'varning' ? '#FFF6E0' : s.redaktionellt.typ === 'tips' ? '#E8F3EC' : s.redaktionellt.typ === 'bast' ? '#E3EFF8' : '#F3E8F5',
                    borderLeft: `3px solid ${s.redaktionellt.typ === 'varning' ? '#f39c12' : s.redaktionellt.typ === 'tips' ? '#27ae60' : s.redaktionellt.typ === 'bast' ? '#2980b9' : '#8e44ad'}`,
                    fontSize: '0.85rem', color: '#2F2A24', lineHeight: 1.55,
                  }}>
                    <strong style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem', display: 'block', marginBottom: '4px', color: s.redaktionellt.typ === 'varning' ? '#B8791C' : s.redaktionellt.typ === 'tips' ? '#1F6B3A' : s.redaktionellt.typ === 'bast' ? '#1E5A8C' : '#6A2F82' }}>
                      {s.redaktionellt.typ === 'varning' ? 'Varning' : s.redaktionellt.typ === 'tips' ? 'Redaktionens tips' : s.redaktionellt.typ === 'bast' ? 'Bäst för' : 'Info'}
                    </strong>
                    {s.redaktionellt.text}
                  </div>
                )}
                <a href={s.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '48px', background: '#993335', color: '#fefefb', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em' }}>
                  Visa på karta ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid #ede5da' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#993335', fontWeight: '600', marginBottom: '8px' }}>PLANERA VIDARE</p>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '0.05em', marginBottom: '32px', color: '#383a46' }}>Boka upplevelser vid stranden</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px,100%), 1fr))', gap: '20px' }}>
            <AffiliateCard
              typ="aktivitet"
              titel="Snorkeltur till Cala des Moro"
              beskrivning="Guidad snorkeltur med liten grupp till Mallorcas klaraste vatten. Utrustning ingår."
              pris="från 495 kr"
              betyg={4.8}
              badge="Vår favorit"
              länk="https://www.getyourguide.com/mallorca-l234/snorkeling-tc63/?partner_id=DITT_ID"
              bild="https://images.unsplash.com/photo-1606729734060-3d6de0048e43?w=600&q=75"
            />
            <AffiliateCard
              typ="aktivitet"
              titel="Kayakpaddling längs nordkusten"
              beskrivning="Paddla längs dramatiska klippor och in i dolda grottor. Perfekt för nybörjare."
              pris="från 695 kr"
              betyg={4.7}
              länk="https://www.getyourguide.com/mallorca-l234/kayaking-tc99/?partner_id=DITT_ID"
              bild="https://images.unsplash.com/photo-1560243360-0eb6e88f0d08?w=600&q=75"
            />
            <AffiliateCard
              typ="transfer"
              titel="Transfer flygplats ↔ hotell"
              beskrivning="Privat transfer från PMI. Fast pris, ingen stress. Chauffören väntar med namnskylt."
              pris="från 349 kr"
              betyg={4.9}
              badge="Populärt val"
              länk="https://www.getyourguide.com/palma-de-mallorca-l790/transfers-tc188/?partner_id=DITT_ID"
              bild="https://images.unsplash.com/photo-1608126313950-b17430292454?w=600&q=75"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
