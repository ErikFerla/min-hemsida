'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const stränder = [
  { namn: 'Caló des Moro', region: 'Syd', typ: 'Vik', svårighet: 'Promenad krävs', längd: '40m', beskrivning: 'Topprankad år efter år som Spaniens vackraste vik. Turkost vatten likt en pool, omgiven av klippor och tallskog. Inga faciliteter – kom tidigt!', tips: 'Kom före kl 9 på morgonen – fullsatt redan kl 10 på sommaren', maps: 'https://maps.google.com/?q=Calo+des+Moro+Mallorca', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', familj: false, snorkling: true, nudist: false, redaktionellt: { typ: 'varning', text: 'Kom INTE efter kl 10 på sommaren – stranden är fullsatt och parkeringen stängd' } },
  { namn: 'Es Trenc', region: 'Syd', typ: 'Sandstrand', svårighet: 'Enkel', längd: '2,1 km', beskrivning: 'Mallorcas Karibien – 2 km kritvit sandstrand och turkost vatten i ett naturreservat. Ingen storskalig bebyggelse. Nudistsektion finns.', tips: 'Ta bussen från Campos – parkeringen kostar 8€ och fylls snabbt', maps: 'https://maps.google.com/?q=Es+Trenc+Mallorca', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', familj: true, snorkling: false, nudist: true, redaktionellt: { typ: 'bast', text: 'Bäst för: Långa stranddagar och äkta Mallorca-känsla utan hotellkomplex' } },
  { namn: 'Cala Figuera (Formentor)', region: 'Norr', typ: 'Stenstrand', svårighet: 'Promenad krävs', längd: '30m', beskrivning: 'Rankad #1 av Holidu. Avskild vik på Formentorhalvön med kristallklart vatten och rik marin miljö. Perfekt för snorkling.', tips: '1,5 km promenad från parkeringen – ta med vattenskor', maps: 'https://maps.google.com/?q=Cala+Figuera+Formentor+Mallorca', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', familj: false, snorkling: true, nudist: false, redaktionellt: { typ: 'tips', text: 'Ta med vattenskor – bottnen är stenig men vattnet är helt fantastiskt' } },
  { namn: 'Cala Llombards', region: 'Syd', typ: 'Vik', svårighet: 'Enkel', längd: '80m', beskrivning: 'Vacker avskild vik nära Santanyi med brant klippomgivning och kristallklart turkost vatten. Liten strandbar på plats.', tips: 'Bäst på morgonen – populär men inte överfull om man kommer tidigt', maps: 'https://maps.google.com/?q=Cala+Llombards+Mallorca', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', familj: true, snorkling: true, nudist: false, redaktionellt: { typ: 'info', text: 'Liten parkering som fylls tidigt – cykla dit om du bor i närheten' } },
  { namn: 'Cala Mesquida', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '350m', beskrivning: 'Vacker naturstrand i naturreservat nära Capdepera med vita sanddyner och tallskog. Extra populär bland surfare tack vare bra vågor.', tips: 'Parkering 100m från stranden – kom tidigt på helger', maps: 'https://maps.google.com/?q=Cala+Mesquida+Mallorca', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', familj: true, snorkling: false, nudist: false, redaktionellt: { typ: 'bast', text: 'Bäst för: Surfare och de som vill ha naturstrand utan lyxhotell' } },
  { namn: 'Cala Agulla', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '400m', beskrivning: 'Blåflagg-strand i naturreservat nära Cala Ratjada med klarblått vatten och tallskogsbakgrund. Perfekt för familjer och vattensporter.', tips: 'En av öns renaste stränder – vattnet är grunt och perfekt för barn', maps: 'https://maps.google.com/?q=Cala+Agulla+Mallorca', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', familj: true, snorkling: true, nudist: false, redaktionellt: { typ: 'tips', text: 'Blåflagg varje år – ett av öns renaste vatten, grunt och perfekt för barn' } },
  { namn: "Cala Mondragó / S'Aramador", region: 'Syd', typ: 'Sandstrand', svårighet: 'Enkel', längd: '75m', beskrivning: "S'Aramador har utsetts till Europas bästa strand. Naturpark med välskyddad vik, grunt barnvänligt vatten och fin ljus sand.", tips: 'Ta turisttåget från Porto Petro på sommaren – enkelt och smidigt', maps: 'https://maps.google.com/?q=Cala+Mondrago+Mallorca', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', familj: true, snorkling: true, nudist: false, redaktionellt: { typ: 'info', text: 'Naturreservat – ta inte med engångsgrillar eller husdjur' } },
  { namn: 'Playa de Formentor', region: 'Norr', typ: 'Sandstrand', svårighet: 'Enkel', längd: '1,5 km', beskrivning: 'En av öns finaste sandstränder med kritvit sand och utsikt över Pollensabukten. Omgiven av tallskog och dramatiska berg.', tips: 'Färja från Port de Pollença på sommaren – undvik trängsel vid bilparkering', maps: 'https://maps.google.com/?q=Playa+Formentor+Mallorca', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', familj: true, snorkling: false, nudist: false, redaktionellt: { typ: 'varning', text: 'Biltillstånd krävs på sommaren – ta bussen från Port de Pollença' } },
  { namn: 'Playa de Muro', region: 'Norr', typ: 'Sandstrand', svårighet: 'Enkel', längd: '5 km', beskrivning: 'En av Mallorcas längsta sandstränder – barnfamiljernas paradis med grunt vatten och sanddyner. Blåflagg och alla faciliteter.', tips: 'Bäst för familjer med barn – grunt och lugnt vatten hela vägen', maps: 'https://maps.google.com/?q=Playa+de+Muro+Mallorca', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', familj: true, snorkling: false, nudist: false, redaktionellt: { typ: 'bast', text: 'Bäst för: Barnfamiljer som vill ha allt på ett ställe' } },
  { namn: "Playa d'Alcúdia", region: 'Norr', typ: 'Sandstrand', svårighet: 'Enkel', längd: '15 km', beskrivning: 'Mallorcas längsta sammanhängande strand – 15 km fin sandstrand med alla aktiviteter, restauranger och vattensporter.', tips: 'Perfekt för vattensport – jetski, vindsurfing och parasailing finns tillgängligt', maps: 'https://maps.google.com/?q=Playa+Alcudia+Mallorca', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', familj: true, snorkling: false, nudist: false, redaktionellt: { typ: 'tips', text: 'Norra delen är lugnare – gå förbi de stora hotellen' } },
  { namn: 'Sa Calobra', region: 'Nordväst', typ: 'Stenstrand', svårighet: 'Vandring/tunnel', längd: '200m', beskrivning: 'Mallorcas mest dramatiska strand – nås genom tunnlar i berget. Omgiven av skyhöga klippor med turkost kristallklart vatten.', tips: 'Kom tidigt eller sent – fullsatt mitt på dagen. Ta med vattenskor.', maps: 'https://maps.google.com/?q=Sa+Calobra+Mallorca', bild: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', familj: false, snorkling: true, nudist: false },
  { namn: 'Cala Varques', region: 'Öst', typ: 'Vik', svårighet: 'Vandring krävs', längd: '60m', beskrivning: 'Orörd paradisvik nära Calas de Mallorca som kräver 20 min vandring genom tallskog. Belöningen är ett av öns vackraste vatten.', tips: 'Ta med picknick – inga faciliteter men absolut värt vandringen', maps: 'https://maps.google.com/?q=Cala+Varques+Mallorca', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', familj: false, snorkling: true, nudist: true },
  { namn: "Cala d'Or", region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '5 stränder', beskrivning: "Fem charmiga små stränder – Cala d'Or, Cala Esmeralda, Cala Ferrera, Cala Serena och Cala Gran – omgivna av tallskog och klippor.", tips: 'Cala Gran är störst och mest familjevänlig av de fem bukterna', maps: 'https://maps.google.com/?q=Cala+d+Or+Mallorca', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', familj: true, snorkling: true, nudist: false },
  { namn: 'Cala Millor', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '1,5 km', beskrivning: 'Populär turiststrand med fin gyllene sand, lugnt vatten och alla faciliteter. Blåflagg och bra för familjer.', tips: 'Nordliga delen av stranden är lugnare och mindre fullsatt', maps: 'https://maps.google.com/?q=Cala+Millor+Mallorca', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Porto Cristo', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '350m', beskrivning: 'Skyddad stadsvik med gyllene sand och hamnanslutning. Perfekt utgångspunkt för Coves del Drach. Alla faciliteter.', tips: 'Kombinera med besök i de berömda drakgrottorna Coves del Drach', maps: 'https://maps.google.com/?q=Porto+Cristo+strand+Mallorca', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Cala Tuent', region: 'Nordväst', typ: 'Vik', svårighet: 'Smal bergväg', längd: '150m', beskrivning: 'Vildromantisk vik vid foten av Tramuntana-bergen med dramatisk klipplandskap. Lugn och avskild med restaurang på plats.', tips: 'Smal och kurvig väg ned – ta det lugnt med bilen', maps: 'https://maps.google.com/?q=Cala+Tuent+Mallorca', bild: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', familj: false, snorkling: true, nudist: false },
  { namn: 'Port de Sóller', region: 'Nordväst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '500m', beskrivning: 'Charmig strandby med halvmånformad sandstrand och historisk spårvagn. Mysig atmosfär med bergsutsikt.', tips: 'Ta spårvagnen från Sóller – en upplevelse i sig!', maps: 'https://maps.google.com/?q=Port+de+Soller+strand+Mallorca', bild: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Cala Estellencs', region: 'Nordväst', typ: 'Stenstrand', svårighet: 'Brant väg', längd: '50m', beskrivning: 'Liten stenstrand under Tramuntana-bergen med kristallklart vatten och dramatisk klippomgivning. Populär bland dykare.', tips: 'Brant, smal väg ned – belönas med fantastisk utsikt och klart vatten', maps: 'https://maps.google.com/?q=Cala+Estellencs+Mallorca', bild: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', familj: false, snorkling: true, nudist: false },
  { namn: 'Cala Xinxell', region: 'Sydväst', typ: 'Vik', svårighet: 'Enkel', längd: '80m', beskrivning: 'Lugn och undanskymd vik vid Illetas, populär bland lokalbefolkningen. Rena klippor och klart vatten utan turistmassor.', tips: 'Okänd pärla som undviker massturism – lokalbors favorit', maps: 'https://maps.google.com/?q=Cala+Xinxell+Illetas+Mallorca', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', familj: false, snorkling: true, nudist: false },
  { namn: 'Playa de Palma', region: 'Sydväst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '5 km', beskrivning: 'Palmas stora stadsriviera med 5 km sandstrand, strandpromenad, restauranger och nöjesutbud. Pulserande atmosfär.', tips: 'Perfekt för dem som vill kombinera strand med stadsliv och nöjen', maps: 'https://maps.google.com/?q=Playa+de+Palma+Mallorca', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Cala Canyamel', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '300m', beskrivning: 'Lugn sandstrand mellan Cala Ratjada och Cala Millor med vackra berg i bakgrunden. Lite mindre besökt än grannstränderna.', tips: 'Bra alternativ om Cala Millor känns för fullsatt', maps: 'https://maps.google.com/?q=Cala+Canyamel+Mallorca', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Es Carbó', region: 'Syd', typ: 'Sandstrand', svårighet: 'Enkel', längd: '1 km', beskrivning: 'Lugn och rensatt sandstrand på södra Mallorca med turkost vatten och färre turister än grannstränder som Es Trenc.', tips: 'Bra alternativ till Es Trenc om du vill ha mer lugn och ro', maps: 'https://maps.google.com/?q=Es+Carbo+Mallorca', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Port de Pollença', region: 'Norr', typ: 'Sandstrand', svårighet: 'Enkel', längd: '2 km', beskrivning: 'Lång smal sandstrand med lugnt vatten och vacker bergsutsikt. Charmig strandpromenad och livlig restaurangscen.', tips: 'Perfekt för morgonpromenad – en av öns bästa strandpromenader', maps: 'https://maps.google.com/?q=Port+de+Pollenca+strand+Mallorca', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', familj: true, snorkling: false, nudist: false },
  { namn: 'Cala Ferrera', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '200m', beskrivning: "En av de fem charmiga bukterna i Cala d'Or-området med fin sand och klart vatten. Lugn och familjevänlig.", tips: 'Mindre och mer intim än grannbukterna – bra för par', maps: 'https://maps.google.com/?q=Cala+Ferrera+Mallorca', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', familj: true, snorkling: true, nudist: false },
  { namn: 'Cala Romantica', region: 'Öst', typ: 'Vik', svårighet: 'Enkel', längd: '100m', beskrivning: 'Vacker skyddad vik med klart vatten och tallskog runt om. Lugn atmosfär som passar för romantiska utflykter.', tips: 'Kom tidigt – den lilla parkeringen fylls snabbt på sommaren', maps: 'https://maps.google.com/?q=Cala+Romantica+Mallorca', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', familj: false, snorkling: true, nudist: false },
  { namn: 'Cala Sa Nau', region: 'Öst', typ: 'Vik', svårighet: 'Enkel', längd: '80m', beskrivning: "Pittoresk bukt nära Cala d'Or med riktigt klart vatten och fin sand. Populär bland snorklare och familjer.", tips: 'En av östkustens mest underskattade stränder', maps: 'https://maps.google.com/?q=Cala+Sa+Nau+Mallorca', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', familj: true, snorkling: true, nudist: false },
  { namn: 'Portal Vells', region: 'Sydväst', typ: 'Vik', svårighet: 'Grusväg', längd: '100m', beskrivning: 'Gömd strand utan hotell och turism – lokalbornas hemliga favorit. Gratis parkering, liten gratisparkering.', tips: 'Kom tidigt – liten gratisparkering. Nästan bara lokalbefolkning här.', maps: 'https://maps.google.com/?q=Portal+Vells+Mallorca', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', familj: false, snorkling: true, nudist: true },
  { namn: 'Cala Marçal', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '500m', beskrivning: 'Fin sandstrand nära Porto Colom med lugnt vatten och bra faciliteter. Barnvänlig och välorganiserad.', tips: 'Perfekt dagstrip från Porto Colom – ta med snorkelmask', maps: 'https://maps.google.com/?q=Cala+Marcal+Mallorca', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', familj: true, snorkling: true, nudist: false },
  { namn: 'Cala Torta', region: 'Öst', typ: 'Sandstrand', svårighet: 'Grusväg', längd: '400m', beskrivning: 'Naturstrand nära Artà utan hotell eller kommersiell verksamhet. Omgiven av klippor och tallskog – äkta Mallorca.', tips: 'Grusväg dit – ta det lugnt. Inga solstolar att hyra, ta med parasol.', maps: 'https://maps.google.com/?q=Cala+Torta+Mallorca', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', familj: false, snorkling: true, nudist: true },
  { namn: 'Cala Bona', region: 'Öst', typ: 'Sandstrand', svårighet: 'Enkel', längd: '250m', beskrivning: 'Charmig strand med liten fiskehamn nära Cala Millor. Mer autentisk atmosfär än grannorten med lokala restauranger.', tips: 'Ät middag vid hamnen efter ett dopp – bättre restauranger än Cala Millor', maps: 'https://maps.google.com/?q=Cala+Bona+Mallorca', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80', familj: true, snorkling: false, nudist: false },
];

const regioner = ['Alla', 'Norr', 'Nordväst', 'Öst', 'Syd', 'Sydväst'];
const typer = ['Alla typer', 'Sandstrand', 'Vik', 'Stenstrand'];

export default function StrandarPage() {
  return (
    <Suspense fallback={<div style={{ background: '#FDF8F2', minHeight: '100vh' }} />}>
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

  const knappStyle = (aktiv: boolean) => ({
    padding: '8px 18px',
    borderRadius: '20px',
    border: '2px solid #0E7490',
    background: aktiv ? '#0E7490' : 'transparent',
    color: aktiv ? 'white' : '#0E7490',
    fontWeight: '600' as const,
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{
        position: 'relative', height: '55vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=90)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'flex-end', padding: 'clamp(30px, 5vw, 60px) clamp(20px, 5vw, 80px)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>Mallorcas vackraste platser</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>Stränder på Mallorca</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>30 utvalda stränder – från folktomma paradisvikar till långa familjesandstränder</p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(30px, 4vw, 60px) clamp(16px, 4vw, 60px)' }}>
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c0392b', marginBottom: '16px' }}>Filtrera stränder</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {regioner.map(r => <button key={r} onClick={() => setRegion(r)} style={knappStyle(region === r)}>{r}</button>)}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {typer.map(t => <button key={t} onClick={() => setTyp(t)} style={knappStyle(typ === t)}>{t}</button>)}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[['', 'Visa alla'], ['familj', '👨‍👩‍👧 Familjevänlig'], ['snorkling', '🤿 Bra för snorkling'], ['nudist', '🏖️ Nudistsektion']].map(([val, label]) =>
              <button key={val} onClick={() => setFilter(val)} style={knappStyle(filter === val)}>{label}</button>
            )}
          </div>
          <p style={{ marginTop: '16px', color: '#666', fontSize: '0.9rem' }}>{visade.length} stränder visas</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '24px' }}>
          {visade.map((s, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 35px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)'; }}>
              <div style={{ position: 'relative' }}>
                <img src={s.bild} alt={s.namn} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.65)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' }}>{s.region}</div>
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#c0392b', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' }}>{s.typ}</div>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', letterSpacing: '0.05em', margin: 0, color: '#111' }}>{s.namn}</h2>
                  <span style={{ fontSize: '0.8rem', color: '#888', whiteSpace: 'nowrap', marginLeft: '8px' }}>📏 {s.längd}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#777', marginBottom: '8px' }}>🚶 {s.svårighet}</p>
                <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6', margin: '0 0 12px' }}>{s.beskrivning}</p>
                <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '8px 12px', fontSize: '0.85rem', color: '#444', marginBottom: '12px' }}>💡 {s.tips}</div>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  {s.familj && <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '3px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '600' }}>👨‍👩‍👧 Familj</span>}
                  {s.snorkling && <span style={{ background: '#e3f2fd', color: '#1565c0', padding: '3px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '600' }}>🤿 Snorkling</span>}
                  {s.nudist && <span style={{ background: '#fff3e0', color: '#e65100', padding: '3px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '600' }}>🏖️ Nudist</span>}
                </div>
                {s.redaktionellt && (
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: '8px',
                    padding: '8px 12px', borderRadius: '8px', marginBottom: '12px',
                    background: s.redaktionellt.typ === 'varning' ? '#fff3cd' : s.redaktionellt.typ === 'tips' ? '#e8f5e9' : s.redaktionellt.typ === 'bast' ? '#e3f2fd' : '#f3e5f5',
                    borderLeft: `3px solid ${s.redaktionellt.typ === 'varning' ? '#f39c12' : s.redaktionellt.typ === 'tips' ? '#27ae60' : s.redaktionellt.typ === 'bast' ? '#2980b9' : '#8e44ad'}`,
                    fontSize: '0.82rem', color: '#333', lineHeight: '1.5',
                  }}>
                    <span style={{ flexShrink: 0 }}>
                      {s.redaktionellt.typ === 'varning' ? '⚠️' : s.redaktionellt.typ === 'tips' ? '⭐' : s.redaktionellt.typ === 'bast' ? '🏆' : '💡'}
                    </span>
                    <span>{s.redaktionellt.text}</span>
                  </div>
                )}
                <a href={s.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#F59E0B', color: '#1F2937', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
                  Visa på karta →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
