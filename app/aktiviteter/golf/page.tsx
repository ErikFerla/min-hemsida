'use client';
import { useState } from 'react';
import Link from 'next/link';

const golfbanor = [
  { namn: 'Son Gual Golf', plats: 'Palma', region: 'Palma', hål: 18, svårighet: 'Medel', pris: '💰💰💰', beskrivning: 'En av Mallorcas mest prestigefyllda banor med fantastisk utsikt. Rankad på plats 51 i Europa, värd för Senior European Tour 2009.', bild: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Gual+Golf+Palma+Mallorca', webb: 'https://www.golfsongual.com', tips: 'Boka minst 2 dagar i förväg – mycket populär', redaktionellt: { typ: 'bast', text: 'Bäst för: Serösa golfare som vill ha Mallorcas tuffaste utmaning' } },
  { namn: 'Club de Golf Alcanada', plats: 'Alcúdia', region: 'Norr', hål: 18, svårighet: 'Svår', pris: '💰💰💰💰', beskrivning: 'Spektakulär kustnära bana med utsikt mot havet och fyren från 14 av 18 hål. Rankad bland Europas bästa.', bild: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80', maps: 'https://maps.google.com/?q=Club+de+Golf+Alcanada+Alcudia+Mallorca', webb: 'https://www.golf-alcanada.com', tips: 'Hål 12 med utsikt mot fyren är ett av Europas vackraste hål', redaktionellt: { typ: 'tips', text: 'Hål 18 med utsikt över fyrtornet är ett av Europas vackraste avslutningar' } },
  { namn: 'Son Muntaner Golf (ArabellaGolf)', plats: 'Palma', region: 'Palma', hål: 18, svårighet: 'Svår', pris: '💰💰💰💰', beskrivning: 'Exklusiv bana med vackra fairways kantade av mandelträd och olivlundar. Del av Arabella Golf-komplexet.', bild: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Muntaner+Golf+Palma+Mallorca', webb: 'https://www.arabellagolf.com', tips: 'Bäst på morgonen – undvik middagssolen', redaktionellt: { typ: 'tips', text: 'Smalare banor med mer tekniska utmaningar – bättre för erfarna golfare' } },
  { namn: 'Son Vida Golf (ArabellaGolf)', plats: 'Palma', region: 'Palma', hål: 18, svårighet: 'Medel', pris: '💰💰💰', beskrivning: 'Mallorcas äldsta golfbana från 1964. Har stått värd för Europa Tour två gånger. Fantastisk utsikt över Palmabukten.', bild: 'https://images.unsplash.com/photo-1611374243147-44a702c2d44c?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Vida+Golf+Palma+Mallorca', webb: 'https://www.arabellagolf.com', tips: 'Klassisk bana – passar alla nivåer', redaktionellt: { typ: 'info', text: 'Äldsta golfbanan på ön sedan 1964 – historisk känsla genom hela rundan' } },
  { namn: 'Son Quint Golf (ArabellaGolf)', plats: 'Palma', region: 'Palma', hål: 18, svårighet: 'Lätt', pris: '💰💰', beskrivning: 'Den nyaste banan i Arabella Golf-komplexet. Ligger vid infarten till lyxbostadsområdet Son Vida.', bild: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Quint+Golf+Palma+Mallorca', webb: 'https://www.arabellagolf.com', tips: 'Bra för nybörjare – lättaste av Arabella-banorna', redaktionellt: { typ: 'info', text: 'Kort och teknisk bana – perfekt för uppvärmning eller en snabb runda' } },
  { namn: 'Capdepera Golf', plats: 'Capdepera', region: 'Öst', hål: 18, svårighet: 'Medel', pris: '💰💰💰', beskrivning: 'Storslagen bana i nordöstra Mallorca med dramatisk bergsutsikt. Hål 15 erbjuder fantastisk utsikt över kusten.', bild: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80', maps: 'https://maps.google.com/?q=Capdepera+Golf+Mallorca', webb: 'https://www.capdepera-golf.com', tips: 'Kombinera med besök i Capdepera-borgen efteråt', redaktionellt: { typ: 'tips', text: 'Boka direkt med banan – ofta 20–30% billigare än via bokningssajter' } },
  { namn: 'Pula Golf Resort', plats: 'Son Servera', region: 'Öst', hål: 18, svårighet: 'Medel', pris: '💰💰💰', beskrivning: 'Internationellt känd tävlingsbana designad av José María Olazábal 2007. Komplett resort med hotell, pool och spa.', bild: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80', maps: 'https://maps.google.com/?q=Pula+Golf+Son+Servera+Mallorca', webb: 'https://www.pulagolf.com', tips: 'Restaurangen på klubbhuset serverar utmärkt mallorquinsk mat', redaktionellt: { typ: 'bast', text: 'Bäst för: Naturupplevelsen – banan ringlar genom ek- och olivlundar' } },
  { namn: 'Golf de Andratx', plats: 'Camp de Mar', region: 'Sydväst', hål: 18, svårighet: 'Svår', pris: '💰💰💰💰', beskrivning: 'Spektakulär bana i sydvästra Mallorca med havsutsikt och utmanande bergslandskap. Rankas bland Europas absolut vackraste golfbanor.', bild: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80', maps: 'https://maps.google.com/?q=Golf+de+Andratx+Camp+de+Mar+Mallorca', webb: 'https://www.golfdeandratx.com', tips: 'Ett måste för golfentusiaster – boka långt i förväg', redaktionellt: { typ: 'bast', text: 'Bäst för: Fantastisk utsikt – mer sceneri än golf egentligen' } },
  { namn: 'Golf Santa Ponsa I', plats: 'Santa Ponsa', region: 'Sydväst', hål: 18, svårighet: 'Medel', pris: '💰💰💰', beskrivning: 'Invigd 1977 och värd för Europa Tour sex gånger med spelare som Ballesteros och Olazábal. Svenska Prinsessan Birgitta är hedersmedlem och ambassadör.', bild: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80', maps: 'https://maps.google.com/?q=Golf+Santa+Ponsa+Mallorca', webb: 'https://www.golfsantaponsa.com', tips: 'Historisk bana med internationellt rykte – bra för alla nivåer', redaktionellt: { typ: 'tips', text: 'En av öns längsta banor – ta med extra bollar om du är nybörjare' } },
  { namn: 'Real Golf de Bendinat', plats: 'Bendinat', region: 'Sydväst', hål: 18, svårighet: 'Svår', pris: '💰💰💰', beskrivning: 'En av de äldsta och mest populära banorna nära Magaluf. Utmanande och tuff – passar golfare som vill ha utmaning.', bild: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80', maps: 'https://maps.google.com/?q=Real+Golf+de+Bendinat+Mallorca', webb: 'https://www.golfbendinat.com', tips: 'Räkna med 4 timmar för en full runda – planera middagen efteråt i Palma', redaktionellt: { typ: 'varning', text: 'Dresscode gäller strikt – inga jeans eller collegetröjor på banan' } },
  { namn: 'Son Antem Golf (East Course)', plats: 'Llucmajor', region: 'Syd', hål: 18, svårighet: 'Medel', pris: '💰💰💰', beskrivning: 'En av 36-håls anläggningens två banor. Platt medelhavsterräng, lätt att gå. 10-20 min från Palma.', bild: 'https://images.unsplash.com/photo-1611374243147-44a702c2d44c?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Antem+Golf+Llucmajor+Mallorca', webb: 'https://www.sonantem.com', tips: 'East anses lite lättare än West – bra startalternativ', redaktionellt: { typ: 'bast', text: 'Bäst för: Golfare som vill ha två banor på ett ställe – East är den lättare' } },
  { namn: 'Son Antem Golf (West Course)', plats: 'Llucmajor', region: 'Syd', hål: 18, svårighet: 'Svår', pris: '💰💰💰', beskrivning: 'Den mer utmanande av Son Antems två banor. Utmärkt anläggning med hotell och spa i anslutning.', bild: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=600&q=80', maps: 'https://maps.google.com/?q=Son+Antem+Golf+Llucmajor+Mallorca', webb: 'https://www.sonantem.com', tips: 'Kombinera med övernattning på anläggningens hotell', redaktionellt: { typ: 'info', text: 'West Course är tuffare med fler vattenhinder – rekommenderas för hcp under 20' } },
  { namn: 'T Golf Palma Puntiró', plats: 'Palma', region: 'Palma', hål: 18, svårighet: 'Medel', pris: '💰💰💰', beskrivning: 'Designad av Jack Nicklaus Design 2006. 15 min från Palma med typisk mallorquinsk miljö – tall, olivträd och johannesbröd.', bild: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80', maps: 'https://maps.google.com/?q=T+Golf+Palma+Puntiro+Mallorca', webb: 'https://www.tgolfmallorca.com', tips: 'Medlemmar kan spela på alla 120 Nicklaus-banor världen över', redaktionellt: { typ: 'tips', text: 'Bara 10 min från Palma centrum – perfekt om du vill spela en kvällsrunda' } },
  { namn: 'Golf Maioris', plats: 'Llucmajor', region: 'Syd', hål: 18, svårighet: 'Medel', pris: '💰💰', beskrivning: 'Designad av R.S. Group 2006. Känd för sin utmärkta restaurang och golfakademi. Bra pris-kvalitet.', bild: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80', maps: 'https://maps.google.com/?q=Golf+Maioris+Llucmajor+Mallorca', webb: 'https://www.golfmaioris.com', tips: 'Restaurangen är en av de bästa vid någon golfbana på ön', redaktionellt: { typ: 'bast', text: 'Bäst för: Nybörjare och mellannivå – parklanda och välskötta greener' } },
  { namn: 'Club de Golf Son Servera', plats: 'Son Servera', region: 'Öst', hål: 9, svårighet: 'Lätt', pris: '💰', beskrivning: 'En av Mallorcas äldsta banor från 1960-talet. Naturskönt läge vid kusten med utsikt mot Cala Millor-bukten.', bild: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80', maps: 'https://maps.google.com/?q=Club+de+Golf+Son+Servera+Mallorca', webb: 'https://www.golfsonservera.com', tips: 'Bra för nybörjare och avkopplad golfrunda', redaktionellt: { typ: 'info', text: 'En av öns äldsta banor med karaktäristisk terräng vid nordöstligaste kusten' } },
  { namn: "Vall d'or Golf", plats: 'Felanitx', region: 'Öst', hål: 18, svårighet: 'Lätt', pris: '💰💰', beskrivning: 'Rolig bana nära Portocolom med vacker utsikt över bukten från flera hål. Passar alla spelare.', bild: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80', maps: 'https://maps.google.com/?q=Vall+d+Or+Golf+Felanitx+Mallorca', webb: 'https://www.valldorgolf.com', tips: 'Avsluta med middag i Porto Colom – 10 min bort' },
  { namn: 'Golf Santa Ponsa II', plats: 'Santa Ponsa', region: 'Sydväst', hål: 9, svårighet: 'Lätt', pris: '💰', beskrivning: 'Kompletterande 9-hålsbana till Santa Ponsa I. Perfekt för en snabb runda eller nybörjare.', bild: 'https://images.unsplash.com/photo-1611374243147-44a702c2d44c?w=600&q=80', maps: 'https://maps.google.com/?q=Golf+Santa+Ponsa+II+Mallorca', webb: 'https://www.golfsantaponsa.com', tips: 'Kombinera med Santa Ponsa I för en full 27-håls dag', redaktionellt: { typ: 'tips', text: 'Kortare än Santa Ponsa I men mer kuperad – kul variation om du spelar båda' } },
  { namn: 'T Golf Poniente', plats: 'Magaluf', region: 'Sydväst', hål: 18, svårighet: 'Medel', pris: '💰💰💰', beskrivning: 'Vacker bana kantad av tall-, oliv- och mandelträd nära Magaluf. Välskött med bra faciliteter.', bild: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80', maps: 'https://maps.google.com/?q=T+Golf+Poniente+Magaluf+Mallorca', webb: 'https://www.tgolfmallorca.com', tips: 'Bra läge nära stränder och restauranger i Magaluf', redaktionellt: { typ: 'bast', text: 'Bäst för: Havsutsikt – flera hål längs kusten med fantastisk panoramautsikt' } },
  { namn: 'Golf de Son Termes', plats: 'Bunyola', region: 'Palma', hål: 18, svårighet: 'Medel', pris: '💰💰', beskrivning: 'Stilla och naturskön bana i inlandet nära Bunyola med bergsutsikt. Lugnt alternativ till de mer besökta banorna.', bild: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=600&q=80', maps: 'https://maps.google.com/?q=Golf+de+Son+Termes+Bunyola+Mallorca', webb: 'https://www.sontermes.com', tips: 'Perfekt för en lugn runda utan folkmassor', redaktionellt: { typ: 'info', text: 'Lugn och avskild bana i bergsmiljö – populär bland lokalbefolkningen' } },
  { namn: 'Pollensa Golf', plats: 'Pollença', region: 'Norr', hål: 18, svårighet: 'Lätt', pris: '💰💰', beskrivning: 'Välkomnande bana i norra Mallorca med fantastisk utsikt över Tramuntana-bergen. Perfekt för avkoppling.', bild: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80', maps: 'https://maps.google.com/?q=Pollensa+Golf+Mallorca', webb: 'https://www.pollensagolf.com', tips: 'Lugnt och avslappnat – bra för nybörjare och rekreationsgolfare', redaktionellt: { typ: 'tips', text: 'Vackert läge vid Tramuntana-bergen – kombinera med en eftermiddag i Pollença' } },
  { namn: 'Cap Vermell Country Club', plats: 'Canyamel', region: 'Öst', hål: 18, svårighet: 'Svår', pris: '💰💰💰💰', beskrivning: 'Exklusiv och utmanande bana nära Canyamel med kuperad terräng och havsutsikt. En av öns nyare banor.', bild: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80', maps: 'https://maps.google.com/?q=Cap+Vermell+Country+Club+Canyamel+Mallorca', webb: 'https://www.capvermellgolf.com', tips: 'Kräver precision – inte för nybörjare', redaktionellt: { typ: 'bast', text: 'Bäst för: Lyx-golfare – privatklubb med Mallorcas bästa clubhouse och service' } },
  { namn: 'Club de Golf Canyamel', plats: 'Canyamel', region: 'Öst', hål: 18, svårighet: 'Medel', pris: '💰💰💰', beskrivning: 'Vacker bana i östra Mallorca nära Canyamel med tallskog och buskvegetation. Vattenhinder och doglegs.', bild: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80', maps: 'https://maps.google.com/?q=Club+de+Golf+Canyamel+Mallorca', webb: 'https://www.canyamelgolf.com', tips: "Nära Coves d'Artà – perfekt att kombinera utflykt och golf", redaktionellt: { typ: 'varning', text: 'Banan är kuperad med branta stigningar – ta golfvagn om du har knäproblem' } },
];

const svårighetFärg: Record<string, string> = {
  'Lätt': '#27ae60',
  'Medel': '#f39c12',
  'Svår': '#c0392b',
};

const regioner = ['Alla', 'Palma', 'Norr', 'Öst', 'Syd', 'Sydväst'];

export default function GolfPage() {
  const [aktivRegion, setAktivRegion] = useState('Alla');

  const filtrerade = aktivRegion === 'Alla'
    ? golfbanor
    : golfbanor.filter(b => b.region === aktivRegion);

  const knappAktiv = {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '2px solid #111',
    background: '#111',
    color: 'white',
    fontWeight: '600' as const,
    cursor: 'pointer',
    fontSize: '0.9rem',
  };

  const knappInaktiv = {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '2px solid #ccc',
    background: 'white',
    color: '#444',
    fontWeight: '600' as const,
    cursor: 'pointer',
    fontSize: '0.9rem',
  };

  return (
    <div style={{ background: '#e8e8e8', minHeight: '100vh' }}>
      <div style={{
        position: 'relative',
        height: '60vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=90)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 'clamp(30px, 5vw, 60px) clamp(20px, 5vw, 80px)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>
            Aktiviteter på Mallorca
          </p>
          <h1 style={{ fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: '400', letterSpacing: '0.05em', margin: 0, lineHeight: 1 }}>
            22 golfbanor på Mallorca
          </h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9, maxWidth: '600px' }}>
            Komplett guide till alla golfbanor – för alla nivåer och budgetar
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(30px, 4vw, 60px) clamp(16px, 4vw, 60px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.03em', margin: 0 }}>
              Alla golfbanor
            </h2>
            <p style={{ color: '#666', marginTop: '8px' }}>{filtrerade.length} banor visas</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {['Lätt', 'Medel', 'Svår'].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: svårighetFärg[s] }} />
                {s}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {regioner.map(r => (
            <button key={r} onClick={() => setAktivRegion(r)} style={aktivRegion === r ? knappAktiv : knappInaktiv}>
              {r}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '24px' }}>
          {filtrerade.map((b, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
              <div style={{ position: 'relative' }}>
                <img src={b.bild} alt={b.namn} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: svårighetFärg[b.svårighet], color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700' }}>
                  {b.svårighet}
                </div>
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600' }}>
                  {b.region}
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', fontWeight: '700', margin: 0 }}>{b.namn}</h3>
                  <span style={{ fontSize: '0.9rem', flexShrink: 0, marginLeft: '8px' }}>{b.pris}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', fontSize: '0.85rem', color: '#666' }}>
                  <span>📍 {b.plats}</span>
                  <span>⛳ {b.hål} hål</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6', margin: '0 0 12px' }}>{b.beskrivning}</p>
                <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '0.85rem', color: '#444' }}>
                  💡 {b.tips}
                </div>
                {b.redaktionellt && (
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: '8px',
                    padding: '8px 12px', borderRadius: '8px', marginBottom: '12px',
                    background: b.redaktionellt.typ === 'varning' ? '#fff3cd' : b.redaktionellt.typ === 'tips' ? '#e8f5e9' : b.redaktionellt.typ === 'bast' ? '#e3f2fd' : '#f3e5f5',
                    borderLeft: `3px solid ${b.redaktionellt.typ === 'varning' ? '#f39c12' : b.redaktionellt.typ === 'tips' ? '#27ae60' : b.redaktionellt.typ === 'bast' ? '#2980b9' : '#8e44ad'}`,
                    fontSize: '0.82rem', color: '#333', lineHeight: '1.5',
                  }}>
                    <span style={{ flexShrink: 0 }}>
                      {b.redaktionellt.typ === 'varning' ? '⚠️' : b.redaktionellt.typ === 'tips' ? '⭐' : b.redaktionellt.typ === 'bast' ? '🏆' : '💡'}
                    </span>
                    <span>{b.redaktionellt.text}</span>
                  </div>
                )}
                <a href={b.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#111', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
                  Visa på karta
                </a>
                <a href={b.webb} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '10px', background: 'white', color: '#111', border: '2px solid #111', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', marginTop: '8px' }}>
                  Besök hemsida →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '60px', background: '#111', borderRadius: '16px', padding: '40px', color: 'white', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif', fontSize: '2.5rem', letterSpacing: '0.05em', marginBottom: '16px' }}>
            Planera din golfsemester
          </h2>
          <p style={{ color: '#aaa', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 28px' }}>
            Vill du ha hjälp att boka greenfee, hyra utrustning eller kombinera golf med andra aktiviteter?
          </p>
          <Link href="/kontakt" style={{ display: 'inline-block', padding: '14px 40px', background: '#c0392b', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '1rem' }}>
            Planera min golfsemester →
          </Link>
        </div>
      </div>
    </div>
  );
}
