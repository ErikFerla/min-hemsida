import { notFound } from 'next/navigation';

const stadsData: Record<string, {
  namn: string, region: string, beskrivning: string, bild: string,
  tips: string, top3: string[], longDesc: string, praktiskt: string[]
}> = {
  'palma-de-mallorca': {
    namn: 'Palma de Mallorca', region: 'Sydväst',
    bild: 'https://images.unsplash.com/photo-1499678329028-101435549a02?w=1600&q=85',
    beskrivning: 'Öns pulserande huvudstad med La Seu-katedralen, gamla stan och livlig restaurangscen',
    tips: 'Bästa utsikten från Bellver slott',
    top3: ['La Seu-katedralen', 'Gamla stan (Casc Antic)', 'Bellver Slott'],
    longDesc: 'Palma är en av Medelhavsregionens mest levande städer. Gamla stan är ett lapptäcke av arabiska gränder, gotiska kyrkor och modernistiska palats. Restaurangscenen är världsklass – från enkla tapas till Michelinstjärnor. Passeggio längs Passeig des Born är kvällens höjdpunkt.',
    praktiskt: ['Flyg: 15 min från flygplatsen', 'Bästa tid: April–juni, september–oktober', 'Parkering: Använd bussarna – kör inte in i gamla stan', 'Språk: Spanska och katalanska']
  },
  'soller': {
    namn: 'Sóller', region: 'Nordväst',
    bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=1600&q=90',
    beskrivning: 'Bergsby omgiven av apelsinlundar med historisk spårvagn ner till havet',
    tips: 'Ta spårvagnen till Port de Sóller',
    top3: ['Historiska spårvagnen', 'Apelsinlundarna', 'Firó-festivalen i maj'],
    longDesc: 'Sóller ligger gömd i en dal omringad av Tramuntana-bergen. Den historiska järnvägslinje från Palma och spårvagnen ner till hamnen är en upplevelse i sig. På torget finns mysiga caféer och marknader med lokal apelsinsylt och olivolja.',
    praktiskt: ['Tåg: Historiskt tåg från Palma (1 tim)', 'Spårvagn: Från Sóller till Port de Sóller (15 min)', 'Bästa tid: Mars–maj när apelsinerna blommar', 'Tips: Hyr cykel och cykla ner till hamnen']
  },
  'porto-colom': {
    namn: 'Porto Colom', region: 'Öst',
    bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=90',
    beskrivning: 'Pittoresk fiskeby med en av Mallorcas vackraste naturliga hamnar',
    tips: 'Fiskarna säljer direkt från båten på morgonen',
    top3: ['Naturhamnen', 'Färska fisken på morgonen', 'Kvällspromenaden längs vattnet'],
    longDesc: 'Porto Colom är en av Mallorcas mest autentiska fiskbyar med en naturlig hamn som sällan syns på turistbroschyrer. Vita färghus kantar vattnet och små fiskebåtar gungar i den lugna viken. Här lever en äkta mallorcansk livsstil kvar.',
    praktiskt: ['Avstånd från Palma: ca 55 km (50 min)', 'Bästa tid: Maj–juni, september', 'Parkering: Gratis längs hamnkanten på morgonen', 'Mat: Fresca fisk på kajen – fråga lokalt']
  },
  'santanyi': {
    namn: 'Santanyí', region: 'Syd',
    bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1600&q=90',
    beskrivning: 'Charmig marknadsby känd för onsdagsmarknaden och närheten till Cala Llombards',
    tips: 'Onsdagsmarknaden är bättre än lördagen',
    top3: ['Onsdagsmarknaden', 'Cala Llombards (5 min)', 'Gallerierna i gamla stan'],
    longDesc: 'Santanyí är en av de mest välbevarade byarna i södra Mallorca. Husen är byggda av den lokala honungsguld-stenen och gallerierna i gamla stan lockar konstälskare. Onsdagsmarknaden på torget ger en äkta lokal upplevelse.',
    praktiskt: ['Avstånd från Palma: ca 60 km (55 min)', 'Marknad: Onsdagar och lördagar', 'Cala Llombards: 5 min med bil', 'Gallerier: Öppna april–oktober']
  },
  'porto-petro': {
    namn: 'Porto Petro', region: 'Syd',
    bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=1600&q=90',
    beskrivning: 'Exklusiv och lugn marinaby i sydost, populär bland segelbåtar',
    tips: 'Perfekt för kvällspromenad längs hamnen',
    top3: ['Marinan med lyxbåtar', 'Kvällspromenaden', 'Cala Mondragó (10 min)'],
    longDesc: 'Porto Petro är en av Mallorcas mest genuint lugna hamnar. Exklusiva segelbåtar möter enkla fiskebåtar, och restaurangerna längs kajen erbjuder lokala skaldjur med utsikt. Cala Mondragó naturreservat ligger bara någon kilometer bort.',
    praktiskt: ['Avstånd från Palma: ca 65 km (60 min)', 'Cala Mondragó: 10 min med bil', 'Bästa tid: Juni–september', 'Kvällsmat: Hamnen har trevliga restauranger till rimliga priser']
  },
  'alcudia': {
    namn: 'Alcúdia', region: 'Norr',
    bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&q=90',
    beskrivning: 'Historisk kuststad med välbevarade medeltida murar och romarteater',
    tips: 'Besök den romerska teatern och gamla stan',
    top3: ['Medeltida stadsmurarna', 'Romerska teatern Pollentia', 'Playa de Muro (5 min)'],
    longDesc: 'Alcúdia har en av Mallorcas bäst bevarade medeltida stadskärnor. Muren som omger gamla stan är nästan komplett och innanför finns charmiga gränder, kyrkor och små restauranger. Den romerska ruinstaden Pollentia vittnar om ännu äldre historia.',
    praktiskt: ['Avstånd från Palma: ca 55 km (50 min)', 'Marknad: Tisdagar och söndagar', 'Strand: Playa de Muro 5 min', 'Guidade turer: Tillgängliga från torget']
  },
  'valldemossa': {
    namn: 'Valldemossa', region: 'Nordväst',
    bild: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85',
    beskrivning: 'UNESCO-skyddad bergsby känt för Chopin och George Sands vistelse',
    tips: 'Besök kartusianerklostret tidigt på morgonen',
    top3: ['Kartusianerklostret', 'Chopins pianosalong', 'Utsikten från byplatsen'],
    longDesc: 'Valldemossa är känd världen över för Frederic Chopins och George Sands vinteruppehåll 1838–39. Kartusianerklostret där de bodde är öppet för besökare. Byn är vacker med stensatta gränder och blomsterprytta fasader.',
    praktiskt: ['Avstånd från Palma: ca 18 km (25 min)', 'Klostret: Öppet 09:30–18:00 (stängt söndagar)', 'Bästa tid: Tidig morgon – undviker turistbussarna', 'Tips: Prova den lokala coca de patata-kakan']
  },
  'deia': {
    namn: 'Deià', region: 'Nordväst',
    bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=1600&q=90',
    beskrivning: 'Konstnärsby i Tramuntana-bergen med bohemisk atmosfär och havsutsikt',
    tips: 'Robert Graves museum är ett måste',
    top3: ['Robert Graves museum', 'Cala Deià (bad)', 'Utsikten från kyrkan'],
    longDesc: 'Deià är en av Mallorcas mest romantiska byar, inbyggd i bergssluttningen med utsikt mot Medelhavet. Konstnärer och författare har lockats hit i generationer – Robert Graves levde här till sin död. Cala Deià nedanför byn är en liten stenbadstrand av sällsam skönhet.',
    praktiskt: ['Avstånd från Palma: ca 30 km (35 min)', 'Robert Graves museum: Öppet mån–fre', 'Cala Deià: 10 min till fots från byn', 'Parkering: Begränsad – kom tidigt']
  },
  'arta': {
    namn: 'Artà', region: 'Öst',
    bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1600&q=90',
    beskrivning: 'Historisk bergsstad med imponerande borg och vackra gränder',
    tips: 'Besök borgen Santuari de Sant Salvador',
    top3: ["Santuari de Sant Salvador", "Coves d'Artà (nära)", 'Tisdagsmarknaden'],
    longDesc: "Artà domineras av Santuari de Sant Salvador – ett fort och kloster högt uppe på kullen. Promenaden uppför de gamla trapporna ger panoramautsikt över hela östra Mallorca. Coves d'Artà, en av öns vackraste grottor, ligger bara en kort bilresa bort.",
    praktiskt: ['Avstånd från Palma: ca 80 km (1 tim)', 'Marknad: Tisdagar', "Coves d'Artà: 15 min med bil", 'Borgen: Fri entré, öppet alla dagar']
  },
  'andratx': {
    namn: 'Andratx', region: 'Sydväst',
    bild: 'https://images.unsplash.com/photo-1504194104404-433180773017?w=1600&q=90',
    beskrivning: "Lugn stadskärna i sydväst nära Port d'Andratx med fin marina",
    tips: "Port d'Andratx har öns snyggaste marina",
    top3: ["Port d'Andratx marina", 'Camp de Mar-stranden', 'Centre Cultural Andratx'],
    longDesc: "Andratx är en dubbel destination – den lugna stadskärnan uppe i dalen och den exklusiva Port d'Andratx nere vid havet. Marinan i Port d'Andratx är en av Mallorcas vackraste och kantas av lyxrestauranger och omgivna av klippiga kullar.",
    praktiskt: ['Avstånd från Palma: ca 30 km (30 min)', "Port d'Andratx: 7 min med bil", 'Marknad: Onsdagar i stadskärnan', 'Bästa tid: Maj–juni, september']
  },
  'pollenca': {
    namn: 'Pollença', region: 'Norr',
    bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&q=90',
    beskrivning: 'Autentisk by med romersk bro, konstmarknad och 365 trappsteg till Calvari',
    tips: 'Klättra upp till Calvari för fantastisk utsikt',
    top3: ['365 trappsteg till Calvari', 'Söndagsmarknaden', 'Jazz-festivalen i juli'],
    longDesc: 'Pollença är en av Mallorcas mest autentiska städer med en stark lokal identitet. De 365 cypresskantade trappstegen upp till Calvari är ett måste, liksom söndagsmarknaden på torget. Jazz-festivalen i juli lockar världsartister.',
    praktiskt: ['Avstånd från Palma: ca 55 km (50 min)', 'Marknad: Söndagar', 'Calvari: 15 min klättring', 'Jazz-festival: Juli – boka tidigt']
  },
  'sineu': {
    namn: 'Sineu', region: 'Inland',
    bild: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85',
    beskrivning: 'Mallorcas geografiska hjärta med öns äldsta marknad sedan 1306',
    tips: 'Onsdagsmarknaden – kom tidigt för bästa upplevelsen',
    top3: ['Onsdagsmarknaden (sedan 1306)', 'Sa Placa-torget', 'Kyrkan Mare de Déu dels Àngels'],
    longDesc: 'Sineu ligger i exakt centrum av Mallorca och har haft marknad sedan 1306. Onsdagsmarknaden är en av öns bäst bevarade traditioner – levande djur, lokala produkter och hantverk säljs sida vid sida. Kyrkan på torget är ett arkitektoniskt mästerverk.',
    praktiskt: ['Avstånd från Palma: ca 30 km (30 min)', 'Marknad: Onsdagar 08:00–13:00', 'Parkering: Utanför stadskärnan', 'Bästa kombination: Kombinera med Inca för en heldag']
  },
  'felanitx': {
    namn: 'Felanitx', region: 'Öst',
    bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=90',
    beskrivning: 'Traditionell stad känd för keramik, vin och söndagsmarknad',
    tips: 'Köp lokal keramik direkt från hantverkarna',
    top3: ['Lokal keramik & hantverk', 'Söndagsmarknaden', 'Castell de Santueri (nära)'],
    longDesc: 'Felanitx är centrum för Mallorcas keramiktillverkning och vinodling. Lokala hantverkare säljer sin keramik direkt från sina ateljer. Söndagsmarknaden är stor och autentisk, och Castell de Santueri – ett medeltida bergfort – ligger en kort biltur bort.',
    praktiskt: ['Avstånd från Palma: ca 50 km (45 min)', 'Marknad: Söndagar', 'Castell de Santueri: 10 min med bil', 'Keramik: Fråga efter lokala ateljer på turistbyrån']
  },
  'manacor': {
    namn: 'Manacor', region: 'Öst',
    bild: 'https://images.unsplash.com/photo-1499678329028-101435549a02?w=1600&q=85',
    beskrivning: 'Mallorcas näst största stad – känd för pärlor, möbler och Rafael Nadal',
    tips: 'Besök en pärlafabrik och se hur de tillverkas',
    top3: ['Majórica pärlafabrik', 'Rafa Nadal Academy', 'Måndagsmarknaden'],
    longDesc: 'Manacor är mest känd för tre saker: Majóricapallets konstgjorda pärlor, Rafa Nadals hemstad och en livlig måndagsmarknad. Pärlafabriken är fascinerande att besöka och erbjuder gratis rundturer. Tenniscentret Rafa Nadal Academy är imponerande.',
    praktiskt: ['Avstånd från Palma: ca 50 km (45 min)', 'Majórica: Gratis fabriksrundtur dagligen', 'Marknad: Måndagar', 'Rafa Nadal Academy: Öppen för besökare']
  },
  'inca': {
    namn: 'Inca', region: 'Inland',
    bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1600&q=90',
    beskrivning: 'Läderstaden med berömd torsdagsmarknad och källarviner',
    tips: 'November – kom på den stora lädermässan',
    top3: ['Torsdagsmarknaden', 'Läderskor & väskor till rea', 'Cellers (källarrestauranger)'],
    longDesc: 'Inca är Mallorcas tredje största stad och centrum för lädertillverkning. Torsdagsmarknaden är en av öns största och bästa för fynd på skor och väskor. De traditionella källarrestaurangerna, cellers, serverar lokal mat i vinlager under stadens gator.',
    praktiskt: ['Avstånd från Palma: ca 30 km (25 min)', 'Marknad: Torsdagar – öns näst största', 'Cellers: Öppna till lunch och middag', 'Lädermässa: November – Dijous Bo']
  },
  'capdepera': {
    namn: 'Capdepera', region: 'Öst',
    bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=1600&q=90',
    beskrivning: 'Medeltida borg och pittoresk by i nordöst med panoramautsikt över havet',
    tips: 'Besök Castell de Capdepera i solnedgången',
    top3: ['Castell de Capdepera', 'Cala Rajada (nära)', 'Utsikten vid solnedgång'],
    longDesc: 'Capdepera domineras av ett enormt medeltida fort högst upp på kullen. Inifrån murarna har man en fantastisk panoramautsikt över nordöstra Mallorca och havet bortom. Strax nedanför ligger Cala Rajada – ett livligt fiskeläge med fina stränder.',
    praktiskt: ['Avstånd från Palma: ca 80 km (1 tim)', 'Castell: Entré krävs, öppet dagligen', 'Cala Rajada: 5 min med bil', 'Bästa tid: Solnedgången från borgmurarna']
  },
  'port-de-soller': {
    namn: 'Port de Sóller', region: 'Nordväst',
    bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=1600&q=90',
    beskrivning: 'Charmig hamnby med en av Mallorcas vackraste vikar, nådd med historisk spårvagn',
    tips: 'Ta den historiska spårvagnen från Sóller',
    top3: ['Spårvagnsresan från Sóller', 'Solnedgången vid hamnen', 'Snorkling i viken'],
    longDesc: 'Port de Sóller är omgiven av berg på tre sidor och öppen mot Medelhavet. Den cirkelformade viken är en av öns vackraste, och spårvagnsresan från Sóller är ett klassiskt Mallorca-minne. Vattnet är klart och perfekt för snorkling.',
    praktiskt: ['Spårvagn: Från Sóller var 30:e minut', 'Strand: Direkt vid hamnen', 'Bästa tid: Maj–juni, september–oktober', 'Mat: Restaurangerna längs hamnen är välkvalitativa']
  },
  'campos': {
    namn: 'Campos', region: 'Syd',
    bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&q=90',
    beskrivning: 'Lantlig stad nära Es Trenc känd för salt, kapers och lördagsmarknad',
    tips: 'Perfekt stopp på väg till Es Trenc',
    top3: ['Es Trenc-stranden (10 min)', 'Saltpannorna Salines', 'Lördagsmarknaden'],
    longDesc: 'Campos är en lugn lantstad i södra Mallorca med stark jordbrukstradition. De omgivande saltpannorna (Salines de Llevant) är ett naturreservat med flamingos och annan fågelrika. Es Trenc, Mallorcas vackraste sandstrand, ligger bara 10 minuter bort.',
    praktiskt: ['Avstånd från Palma: ca 50 km (45 min)', 'Es Trenc: 10 min med bil (betalparkering sommar)', 'Marknad: Lördagar', 'Saltpannor: Vandringsstig runt Salines']
  },
};

export default function StadPage({ params }: { params: { slug: string } }) {
  const stad = stadsData[params.slug];
  if (!stad) notFound();
  return (
    <div style={{ background: '#FDF8F2', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: '60vh', backgroundImage: `url(${stad.bild})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: 'clamp(20px,5vw,60px) clamp(16px,5vw,80px)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>{stad.region} · Mallorca</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: '400', letterSpacing: '0.04em', margin: 0, lineHeight: 1 }}>{stad.namn}</h1>
          <p style={{ fontSize: '1.1rem', marginTop: '16px', opacity: 0.9 }}>{stad.beskrivning}</p>
        </div>
      </div>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(30px,4vw,60px) clamp(16px,4vw,40px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          <div>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', letterSpacing: '0.05em', marginBottom: '16px', color: '#1F2937' }}>Om {stad.namn}</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#374151', marginBottom: '32px' }}>{stad.longDesc}</p>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', letterSpacing: '0.05em', marginBottom: '16px', color: '#1F2937' }}>⭐ Topp 3 att uppleva</h2>
            {stad.top3.map((sak, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #ede5da' }}>
                <span style={{ fontSize: '1.2rem' }}>{i === 0 ? '⭐' : i === 1 ? '🏛️' : '📍'}</span>
                <span style={{ fontSize: '1rem', color: '#374151', fontWeight: i === 0 ? '600' : '400' }}>{sak}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.05em', marginBottom: '16px', color: '#0E7490' }}>💡 Insider-tips</h3>
              <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: '1.7', margin: 0 }}>{stad.tips}</p>
            </div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.05em', marginBottom: '16px', color: '#0E7490' }}>🗺️ Praktisk info</h3>
              {stad.praktiskt.map((info, i) => (
                <p key={i} style={{ fontSize: '0.88rem', color: '#374151', lineHeight: '1.6', margin: '0 0 8px', paddingBottom: '8px', borderBottom: i < stad.praktiskt.length - 1 ? '1px solid #f0ebe3' : 'none' }}>{info}</p>
              ))}
            </div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stad.namn + ' Mallorca')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: '#F59E0B', color: '#1F2937', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '1rem', marginTop: '16px' }}>
              🗺️ Visa på karta
            </a>
            <a href="/byar" style={{ display: 'block', textAlign: 'center', padding: '12px', background: 'white', color: '#0E7490', border: '2px solid #0E7490', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem', marginTop: '10px' }}>
              ← Alla städer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
