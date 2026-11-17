'use client';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import { IconWave, IconBuilding, IconForkKnife, IconHiker, IconUsers, IconFlag, IconMap, IconBulb, IconPalm } from '@/components/Icons';
import type { ComponentType } from 'react';

/* ------------------------------------------------------------------ *
 * Data: en katalog med dagsförslag. Varje intresse pekar ut sina
 * förslag i prioritetsordning. Samma förslag kan höra till flera
 * intressen (t.ex. Coves del Drach för både kultur och familj) och
 * används då bara en gång i planen.
 * ------------------------------------------------------------------ */

type Område = 'palma' | 'vast' | 'norr' | 'inland' | 'ost' | 'syd';
type Länk = { label: string; href: string };
type Förslag = { text: string; område: Område; länkar: Länk[] };

// Geografisk ordning för en rundresa: Palma → Tramuntana → norr → inlandet → öst → syd
const områdesOrdning: Record<Område, number> = { palma: 0, vast: 1, norr: 2, inland: 3, ost: 4, syd: 5 };

const L = {
  strandar: { label: 'Stränder', href: '/strandar' },
  sevardheter: { label: 'Sevärdheter', href: '/sevardheter' },
  mat: { label: 'Mat & vin', href: '/mat' },
  restauranger: { label: 'Restauranger i Palma', href: '/guide/basta-restauranger-palma' },
  vingardar: { label: 'Vingårdar', href: '/vingardar' },
  golf: { label: 'Golfbanor', href: '/aktiviteter/golf' },
  barn: { label: 'Med barn', href: '/barn' },
  vattenparker: { label: 'Vattenparker', href: '/barn/vattenparker' },
  djurparker: { label: 'Djurparker & akvarier', href: '/barn/djurparker-och-akvarier' },
  inomhus: { label: 'Inomhus & regn', href: '/barn/inomhus-och-regn' },
  palma: { label: 'Palma', href: '/palma-de-mallorca' },
  soller: { label: 'Sóller', href: '/soller' },
  portDeSoller: { label: 'Port de Sóller', href: '/port-de-soller' },
  valldemossa: { label: 'Valldemossa', href: '/valldemossa' },
  deia: { label: 'Deià', href: '/deia' },
  alcudia: { label: 'Alcúdia', href: '/alcudia' },
  pollenca: { label: 'Pollença', href: '/pollenca' },
  arta: { label: 'Artà', href: '/arta' },
  capdepera: { label: 'Capdepera', href: '/capdepera' },
  manacor: { label: 'Manacor', href: '/manacor' },
  santanyi: { label: 'Santanyí', href: '/santanyi' },
  campos: { label: 'Campos', href: '/campos' },
  portoColom: { label: 'Porto Colom', href: '/porto-colom' },
  felanitx: { label: 'Felanitx', href: '/felanitx' },
  sineu: { label: 'Sineu', href: '/sineu' },
  inca: { label: 'Inca', href: '/inca' },
  andratx: { label: 'Andratx', href: '/andratx' },
  vader: { label: 'Väder', href: '/vader' },
  flyg: { label: 'Flyg', href: '/flyg' },
} satisfies Record<string, Länk>;

const förslag = {
  // Stränder
  'es-trenc': { område: 'syd', text: 'Es Trenc – två kilometer vit sand i ett naturreservat. Kom tidigt och ta med lunch och parasoll.', länkar: [L.strandar, L.campos] },
  'calo-des-moro': { område: 'syd', text: 'Caló des Moro och Cala Llombards – Grytes favoritstrand. Var på plats före klockan nio på sommaren.', länkar: [L.strandar, L.santanyi] },
  'mondrago': { område: 'syd', text: 'Cala Mondragó – sandvikar i en naturpark. Snorkla längs klipporna och gå en bit på kuststigen.', länkar: [L.strandar, L.santanyi] },
  'formentor': { område: 'norr', text: 'Formentorhalvön – utsikten vid Es Colomer och bad på Playa de Formentor.', länkar: [L.strandar, L.pollenca] },
  'muro': { område: 'norr', text: 'Playa de Muro – långgrunt vatten och fin sand i Alcúdiabukten. Kvällspromenad innanför stadsmuren i Alcúdia.', länkar: [L.strandar, L.alcudia] },
  'cala-agulla': { område: 'ost', text: 'Cala Agulla och Cala Mesquida – sanddyner, tallskog och turkost vatten nära Cala Ratjada.', länkar: [L.strandar, L.capdepera] },
  'cala-varques': { område: 'ost', text: 'Cala Varques – en vik utan bebyggelse som du når efter en kort promenad. Ta med vatten och skugga.', länkar: [L.strandar, L.manacor] },
  'port-de-soller': { område: 'vast', text: 'Port de Sóller – bad i den skyddade hamnviken och middag längs strandpromenaden.', länkar: [L.portDeSoller, L.strandar] },
  'sa-calobra': { område: 'vast', text: 'Sa Calobra – båt från Port de Sóller och en promenad in i ravinen Torrent de Pareis, där en liten stenstrand ligger.', länkar: [L.strandar, L.portDeSoller] },
  'cala-sa-nau': { område: 'syd', text: 'Cala Sa Nau – liten sandvik omgiven av tallar på sydöstkusten.', länkar: [L.strandar, L.felanitx] },

  // Kultur
  'palma-gamla-stan': { område: 'palma', text: 'Palma – katedralen La Seu, Palau de l’Almudaina och gränderna i gamla stan.', länkar: [L.palma, L.sevardheter] },
  'bellver-miro': { område: 'palma', text: 'Palma – det runda slottet Bellver med utsikt över bukten och Fundació Miró i Cala Major.', länkar: [L.palma, L.sevardheter] },
  'valldemossa-deia': { område: 'vast', text: 'Valldemossa och Deià – klostret där Chopin bodde en vinter och Robert Graves hus i Deià.', länkar: [L.valldemossa, L.deia] },
  'soller-tag': { område: 'vast', text: 'Sóller – det gamla tåget från Palma genom bergen och spårvagnen ner till Port de Sóller.', länkar: [L.soller, L.portDeSoller] },
  'alcudia': { område: 'norr', text: 'Alcúdia – stadsmuren, gamla stan och de romerska ruinerna i Pollentia.', länkar: [L.alcudia, L.sevardheter] },
  'pollenca': { område: 'norr', text: 'Pollença – 365 trappsteg upp till Calvari och ett glas på torget Plaça Major.', länkar: [L.pollenca] },
  'sineu': { område: 'inland', text: 'Sineu – öns största marknad på onsdagar. Fortsätt sedan till någon av byarna i inlandet.', länkar: [L.sineu] },
  'arta': { område: 'ost', text: 'Artà – borgen Sant Salvador ovanför byn och den förhistoriska byn Ses Païsses.', länkar: [L.arta, L.sevardheter] },
  'coves-drach': { område: 'ost', text: 'Coves del Drach i Porto Cristo – droppstensgrottor med en kort konsert på den underjordiska sjön. Köp biljett i förväg.', länkar: [L.sevardheter, L.manacor] },
  'santanyi': { område: 'syd', text: 'Santanyí – marknad på onsdagar och lördagar, gallerier och hus i gyllene sandsten.', länkar: [L.santanyi] },

  // Mat & vin
  'palma-mat': { område: 'palma', text: 'Palma – frukost eller tapas på Mercat de l’Olivar och en kväll bland restaurangerna i Santa Catalina.', länkar: [L.restauranger, L.mat] },
  'palma-middag': { område: 'palma', text: 'Palma – en riktigt fin middag på någon av stadens bästa restauranger. Boka i god tid.', länkar: [L.restauranger] },
  'binissalem': { område: 'inland', text: 'Binissalem – vinprovning på en eller två bodegor i vinområdet mitt på ön. Boka besöket i förväg.', länkar: [L.vingardar] },
  'pla-i-llevant': { område: 'inland', text: 'Vinområdet Pla i Llevant kring Felanitx och Manacor – provning och lunch på landsbygden.', länkar: [L.vingardar, L.felanitx] },
  'soller-mat': { område: 'vast', text: 'Sóller – apelsiner och glass på torget, olivolja från dalen och middag vid hamnen.', länkar: [L.soller, L.mat] },
  'porto-colom': { område: 'syd', text: 'Porto Colom – fiskehamn med restauranger längs kajen. Fråga efter dagens fisk.', länkar: [L.portoColom, L.mat] },
  'deia-lunch': { område: 'vast', text: 'Deià – lång lunch med utsikt över bergen och havet, sedan en promenad genom byn.', länkar: [L.deia, L.mat] },
  'inca-celler': { område: 'inland', text: 'Inca – lunch i en av de gamla vinkällarna som serverar mallorkinsk husmanskost.', länkar: [L.inca, L.mat] },
  'port-de-pollenca': { område: 'norr', text: 'Port de Pollença – promenad längs tallallén vid vattnet och middag i hamnen.', länkar: [L.pollenca, L.mat] },

  // Natur & äventyr
  'gr221': { område: 'vast', text: 'Vandring på GR221 mellan Deià och Port de Sóller, cirka tre timmar. Ta bussen tillbaka.', länkar: [L.deia, L.portDeSoller] },
  'kajak': { område: 'norr', text: 'Kajak eller paddelbräda längs klipporna vid Cala Sant Vicenç eller i Pollençabukten.', länkar: [L.pollenca, L.strandar] },
  'formentor-cykel': { område: 'norr', text: 'Cykla vägen ut mot Cap de Formentor – en klassisk tur med utsikt hela vägen. Hyr cykel i Port de Pollença.', länkar: [L.pollenca] },
  'albufera': { område: 'norr', text: 'S’Albufera – fågelskådning och cykling i våtmarksparken bakom Playa de Muro.', länkar: [L.alcudia] },
  'talaia-alcudia': { område: 'norr', text: 'Vandring upp till Talaia d’Alcúdia – utsikt över både Pollença- och Alcúdiabukten.', länkar: [L.alcudia] },
  'dragonera': { område: 'vast', text: 'Båt från Sant Elm till naturreservatet Sa Dragonera och en vandring till fyren.', länkar: [L.andratx] },
  'llevant': { område: 'ost', text: 'Vandring i naturparken Península de Llevant norr om Artà, med bad i Cala Torta.', länkar: [L.arta, L.strandar] },
  'randa': { område: 'inland', text: 'Puig de Randa – kör eller vandra upp till klostren på berget med utsikt över halva ön.', länkar: [L.sevardheter] },

  // Familj
  'aquarium': { område: 'palma', text: 'Palma Aquarium – hajar, maneter och lekplats. Fungerar bra även en molnig dag.', länkar: [L.djurparker] },
  'aqualand': { område: 'palma', text: 'Aqualand El Arenal – vattenrutschkanor och barnpooler hela dagen.', länkar: [L.vattenparker] },
  'western': { område: 'palma', text: 'Western Water Park i Magaluf – vattenpark med vilda västern-tema och ett eget område för de minsta.', länkar: [L.vattenparker] },
  'hidropark': { område: 'norr', text: 'Hidropark i Alcúdia – mindre vattenpark med korta köer, bra om ni bor i norr.', länkar: [L.vattenparker, L.alcudia] },
  'safari-zoo': { område: 'ost', text: 'Safari Zoo i Sa Coma – kör egen bil genom parken bland giraffer och zebror.', länkar: [L.djurparker] },
  'natura-parc': { område: 'inland', text: 'Natura Parc i Santa Eugènia – djurpark med stor lekplats, lagom för en halvdag.', länkar: [L.djurparker] },
  'regndag': { område: 'palma', text: 'Regnig eller väldigt varm dag? Välj något inomhus – vi har samlat tips för hela familjen.', länkar: [L.inomhus, L.barn] },

  // Golf
  'golf-son-gual': { område: 'palma', text: 'Golf på Son Gual strax utanför Palma, en av öns mest kända banor. Boka starttid i förväg.', länkar: [L.golf] },
  'golf-alcanada': { område: 'norr', text: 'Golf på Alcanada vid Alcúdia – banan längs vattnet med utsikt mot fyrön.', länkar: [L.golf, L.alcudia] },
  'golf-pula': { område: 'ost', text: 'Golf på Pula Golf Resort vid Son Servera på östkusten.', länkar: [L.golf] },
  'golf-andratx': { område: 'vast', text: 'Golf de Andratx – kuperad bana i sydväst. Avsluta med middag i Port d’Andratx.', länkar: [L.golf, L.andratx] },
  'golf-capdepera': { område: 'ost', text: 'Capdepera Golf – omgiven av berg, nära Cala Ratjada.', länkar: [L.golf, L.capdepera] },
  'golf-son-vida': { område: 'palma', text: 'Son Vida eller Son Muntaner i Palmas utkant – två banor intill varandra.', länkar: [L.golf] },
} satisfies Record<string, Förslag>;

type FörslagsId = keyof typeof förslag;

const intressen = [
  { id: 'strand', label: 'Strand', Ikon: IconWave, förslag: ['es-trenc', 'calo-des-moro', 'formentor', 'mondrago', 'cala-agulla', 'muro', 'port-de-soller', 'cala-varques', 'sa-calobra', 'cala-sa-nau'] },
  { id: 'kultur', label: 'Kultur', Ikon: IconBuilding, förslag: ['palma-gamla-stan', 'valldemossa-deia', 'soller-tag', 'alcudia', 'sineu', 'coves-drach', 'arta', 'pollenca', 'bellver-miro', 'santanyi'] },
  { id: 'mat', label: 'Mat & vin', Ikon: IconForkKnife, förslag: ['palma-mat', 'binissalem', 'soller-mat', 'porto-colom', 'santanyi', 'deia-lunch', 'pla-i-llevant', 'port-de-pollenca', 'inca-celler', 'palma-middag'] },
  { id: 'aventyr', label: 'Aventyr', Ikon: IconHiker, förslag: ['gr221', 'kajak', 'sa-calobra', 'formentor-cykel', 'mondrago', 'llevant', 'dragonera', 'talaia-alcudia', 'albufera', 'randa'] },
  { id: 'familj', label: 'Familj', Ikon: IconUsers, förslag: ['aquarium', 'aqualand', 'muro', 'coves-drach', 'safari-zoo', 'hidropark', 'soller-tag', 'natura-parc', 'western', 'regndag'] },
  { id: 'golf', label: 'Golf', Ikon: IconFlag, förslag: ['golf-son-gual', 'golf-alcanada', 'golf-pula', 'golf-andratx', 'golf-capdepera', 'golf-son-vida'] },
] as const satisfies ReadonlyArray<{ id: string; label: string; Ikon: ComponentType<{ size?: number }>; förslag: readonly FörslagsId[] }>;

type IntresseId = (typeof intressen)[number]['id'];

// Om valda intressen inte räcker till alla dagar fylls planen på med klassiker
const reserv: FörslagsId[] = ['palma-gamla-stan', 'valldemossa-deia', 'soller-tag', 'muro', 'alcudia', 'es-trenc', 'santanyi', 'sineu', 'arta', 'pollenca', 'palma-mat', 'binissalem'];

const dagval = ['3', '5', '7', '10', '14'] as const;
type Dagar = (typeof dagval)[number];

type Dag = { text: string; länkar: Länk[]; taggar: string[] };

const ankomst: Dag = { text: 'Ankomst och incheckning. Ta det lugnt första kvällen med en promenad och middag nära boendet.', länkar: [L.vader], taggar: [] };
const hemresa: Dag = { text: 'Hemresa. Hinner du, ta ett sista dopp eller en lång frukost innan flyget.', länkar: [L.flyg], taggar: [] };
const ledig: Dag = { text: 'Ledig dag utan plan – poolen, närmaste stranden eller en lång lunch. Bra att ha i reserv om vädret slår om.', länkar: [L.strandar, L.vader], taggar: ['Vila'] };

/** Bygger en dag-för-dag-plan som blandar alla valda intressen. */
function byggPlan(dagar: Dagar, valda: readonly IntresseId[]): Dag[] {
  const n = Number(dagar);
  const kort = n <= 3; // vid korta resor räknas även ankomst- och hemresedagen som aktivitetsdagar
  const lediga = n >= 14 ? 2 : n >= 10 ? 1 : 0;
  const antal = (kort ? n : n - 2) - lediga;

  // Round robin över intressena i fast ordning, utan dubbletter
  const listor = intressen.filter(i => valda.includes(i.id));
  const valt: { id: FörslagsId; taggar: string[] }[] = [];
  const index = new Map<FörslagsId, number>();
  const lägg = (id: FörslagsId, tagg: string | null) => {
    const finns = index.get(id);
    if (finns !== undefined) {
      if (tagg && !valt[finns].taggar.includes(tagg)) valt[finns].taggar.push(tagg);
      return false;
    }
    index.set(id, valt.length);
    valt.push({ id, taggar: tagg ? [tagg] : [] });
    return true;
  };
  const pekare = listor.map(() => 0);
  let fler = true;
  while (valt.length < antal && fler) {
    fler = false;
    listor.forEach((intresse, li) => {
      while (valt.length < antal && pekare[li] < intresse.förslag.length) {
        const id = intresse.förslag[pekare[li]++];
        fler = true;
        if (lägg(id, intresse.label)) break;
      }
    });
  }
  for (const id of reserv) {
    if (valt.length >= antal) break;
    lägg(id, null);
  }
  // Märk förslag som även passar andra valda intressen
  for (const v of valt) {
    for (const intresse of listor) {
      if ((intresse.förslag as readonly FörslagsId[]).includes(v.id) && !v.taggar.includes(intresse.label)) {
        v.taggar.push(intresse.label);
      }
    }
  }

  // Ordna efter område så att resan blir en rundtur i stället för fram och tillbaka
  const ordnade = valt
    .map((v, i) => ({ ...v, i }))
    .sort((a, b) => områdesOrdning[förslag[a.id].område] - områdesOrdning[förslag[b.id].område] || a.i - b.i)
    .map<Dag>(v => ({ text: förslag[v.id].text, länkar: förslag[v.id].länkar, taggar: v.taggar }));

  // Lägg in vilodagar ungefär var femte dag
  const aktivitetsdagar = ordnade.length;
  for (let k = 1; k <= lediga; k++) {
    const plats = Math.round((k * aktivitetsdagar) / (lediga + 1));
    ordnade.splice(plats + (k - 1), 0, ledig);
  }

  return kort ? ordnade : [ankomst, ...ordnade, hemresa];
}

/* ------------------------- URL-tillstånd ------------------------- */

type Val = { dagar: Dagar | ''; intressen: IntresseId[] };

function läsVal(search: string): Val {
  const params = new URLSearchParams(search);
  const d = params.get('dagar') ?? '';
  const valda = (params.get('intressen') ?? '').split(',');
  return {
    dagar: (dagval as readonly string[]).includes(d) ? (d as Dagar) : '',
    intressen: intressen.map(i => i.id).filter(id => valda.includes(id)),
  };
}

const URL_HÄNDELSE = 'resplan-url';

function prenumerera(callback: () => void) {
  window.addEventListener('popstate', callback);
  window.addEventListener(URL_HÄNDELSE, callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(URL_HÄNDELSE, callback);
  };
}

function skrivVal(val: Val) {
  const params = new URLSearchParams(window.location.search);
  params.set('dagar', val.dagar);
  params.set('intressen', val.intressen.join(','));
  window.history.replaceState(window.history.state, '', `${window.location.pathname}?${params.toString()}#resplanerare`);
  window.dispatchEvent(new Event(URL_HÄNDELSE));
}

const sammaVal = (a: Val, b: Val) => a.dagar === b.dagar && a.intressen.join() === b.intressen.join();

/* --------------------------- Komponent --------------------------- */

export default function SectionPlanner() {
  // Valen i URL:en är sanningen: en delad länk visar samma plan. Sidan är fortfarande statisk –
  // på servern (och vid första renderingen) är inget valt.
  const search = useSyncExternalStore(prenumerera, () => window.location.search, () => '');
  const frånUrl = läsVal(search);
  const [utkast, setUtkast] = useState<Val | null>(null);
  const [fel, setFel] = useState<{ dagar?: string; intressen?: string }>({});
  const [kopierad, setKopierad] = useState('');
  const planRubrik = useRef<HTMLHeadingElement>(null);
  const fokuseraPlan = useRef(false);

  const val = utkast ?? frånUrl;
  const planKlar = frånUrl.dagar !== '' && frånUrl.intressen.length > 0;
  const visaPlan = planKlar && (utkast === null || sammaVal(utkast, frånUrl));
  const plan = visaPlan && frånUrl.dagar ? byggPlan(frånUrl.dagar, frånUrl.intressen) : [];

  useEffect(() => {
    if (visaPlan && fokuseraPlan.current) {
      fokuseraPlan.current = false;
      planRubrik.current?.focus();
    }
  }, [visaPlan, search]);

  const väljDagar = (d: Dagar) => {
    setUtkast({ ...val, dagar: d });
    setFel(f => ({ ...f, dagar: undefined }));
  };

  const toggleIntresse = (id: IntresseId) => {
    const nya = val.intressen.includes(id) ? val.intressen.filter(x => x !== id) : [...val.intressen, id];
    setUtkast({ ...val, intressen: intressen.map(i => i.id).filter(x => nya.includes(x)) });
    setFel(f => ({ ...f, intressen: undefined }));
  };

  const skapaPlan = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nyaFel = {
      dagar: val.dagar ? undefined : 'Välj hur många dagar du reser.',
      intressen: val.intressen.length ? undefined : 'Välj minst ett intresse.',
    };
    setFel(nyaFel);
    if (nyaFel.dagar || nyaFel.intressen) {
      const förstaFel = document.getElementById(nyaFel.dagar ? 'planner-dagar' : 'planner-intressen');
      förstaFel?.querySelector<HTMLButtonElement>('button')?.focus();
      return;
    }
    fokuseraPlan.current = true;
    setKopierad('');
    skrivVal(val);
    setUtkast(null);
  };

  const kopieraLänk = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setKopierad('Länken är kopierad.');
    } catch {
      setKopierad('Det gick inte att kopiera. Kopiera adressen i webbläsarens adressfält i stället.');
    }
  };

  const knappStyle = (aktiv: boolean) => ({
    padding: '10px 20px',
    borderRadius: '8px',
    border: '2px solid #111',
    background: aktiv ? '#111' : 'transparent',
    color: aktiv ? 'white' : '#111',
    fontWeight: '600' as const,
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    minHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  });

  const fieldsetStil = { border: 0, padding: 0, margin: 0, minWidth: 0 };
  const legendStil = { fontWeight: 600, fontSize: '1rem', marginBottom: '12px', padding: 0 };
  const felStil = { color: '#b42318', fontSize: '0.9rem', fontWeight: 600, margin: '10px 0 0' };
  const dagarText = frånUrl.dagar;
  const valdaNamn = intressen.filter(i => frånUrl.intressen.includes(i.id)).map(i => i.label);

  return (
    <section id="resplanerare" className="section-light" aria-labelledby="resplanerare-rubrik">
      <div className="planner-grid-outer">

        {/* Vänster: Hela planner-innehållet */}
        <div>
        <p className="section-label">RESPLANERARE</p>
        <h2 id="resplanerare-rubrik" className="section-title">Skräddarsy din resa</h2>
        <div className="section-divider"></div>
        <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '40px' }}>
          Berätta vad du gillar – få ett förslag på resplan för Mallorca
        </p>

        <form onSubmit={skapaPlan} noValidate aria-labelledby="resplanerare-rubrik">
          <fieldset id="planner-dagar" style={{ ...fieldsetStil, marginBottom: '32px' }} aria-describedby="planner-dagar-fel">
            <legend style={legendStil}>Hur länge reser du?</legend>
            <div className="planner-dag-grid" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {dagval.map(d => (
                <button key={d} type="button" aria-pressed={val.dagar === d} onClick={() => väljDagar(d)} style={knappStyle(val.dagar === d)}>
                  {d} dagar
                </button>
              ))}
            </div>
            <p id="planner-dagar-fel" aria-live="polite" style={fel.dagar ? felStil : { margin: 0 }}>{fel.dagar}</p>
          </fieldset>

          <fieldset id="planner-intressen" style={{ ...fieldsetStil, marginBottom: '40px' }} aria-describedby="planner-intressen-fel">
            <legend style={legendStil}>Vad intresserar dig? (välj flera)</legend>
            <div className="planner-intresse-grid" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {intressen.map(({ id, label, Ikon }) => (
                <button key={id} type="button" aria-pressed={val.intressen.includes(id)} onClick={() => toggleIntresse(id)} style={knappStyle(val.intressen.includes(id))}>
                  <Ikon size={18} /> {label}
                </button>
              ))}
            </div>
            <p id="planner-intressen-fel" aria-live="polite" style={fel.intressen ? felStil : { margin: 0 }}>{fel.intressen}</p>
          </fieldset>

          <button
            type="submit"
            className="planner-cta-btn"
            style={{
              padding: '14px 40px',
              background: '#993335',
              color: '#fefefb',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'all 0.2s',
              minHeight: '52px',
            }}
          >
            Skapa min resplan →
          </button>
        </form>

        {visaPlan && plan.length > 0 && (
          <div style={{ marginTop: '48px', background: 'white', borderRadius: '16px', padding: 'clamp(20px, 4vw, 40px)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <h3 ref={planRubrik} tabIndex={-1} style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>Förslag: {dagarText} dagar på Mallorca <IconMap size={20} /></span>
            </h3>
            <p style={{ margin: '0 0 24px', color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {valdaNamn.join(' + ')}. Dagarna är ordnade efter område, så att du slipper åka fram och tillbaka över ön.
              {Number(dagarText) >= 10 && ' Med så här många dagar lönar det sig att byta boende en gång, till exempel från Palma eller västkusten till norra eller östra Mallorca.'}
            </p>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {plan.map((dag, i) => (
                <li key={i} style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'flex-start' }}>
                  <div aria-hidden="true" style={{ minWidth: '36px', height: '36px', background: '#993335', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                    {i + 1}
                  </div>
                  <div style={{ paddingTop: '6px' }}>
                    <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6', color: '#222' }}>
                      <span className="sr-only">Dag {i + 1}: </span>{dag.text}
                    </p>
                    {(dag.taggar.length > 0 || dag.länkar.length > 0) && (
                      <p style={{ margin: '6px 0 0', fontSize: '0.85rem', lineHeight: 1.6, color: '#4B5563', display: 'flex', flexWrap: 'wrap', gap: '4px 12px', alignItems: 'center' }}>
                        {dag.taggar.length > 0 && (
                          <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                            {dag.taggar.join(' · ')}
                          </span>
                        )}
                        {dag.länkar.map(l => (
                          <Link key={l.href} href={l.href} style={{ color: '#993335', fontWeight: 600 }}>
                            {l.label}
                          </Link>
                        ))}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <button type="button" onClick={kopieraLänk} style={{ ...knappStyle(false), minHeight: '44px', padding: '8px 16px', fontSize: '0.9rem' }}>
                Kopiera länk till planen
              </button>
              <p aria-live="polite" style={{ margin: 0, fontSize: '0.85rem', color: '#4B5563' }}>
                {kopierad || 'Valen sparas i adressen, så du kan dela planen eller spara den som bokmärke.'}
              </p>
            </div>
            <div style={{ marginTop: '24px', padding: '20px', background: '#f5f5f5', borderRadius: '10px' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#4B5563' }}>
                <IconBulb size={16} style={{ verticalAlign: '-3px', marginRight: 4 }} /> <strong>Tips:</strong> Vill du läsa på mer inför resan? I <Link href="/guider" style={{ color: '#993335', fontWeight: 600 }}>våra guider</Link> hittar du stränder, mat, golf och Mallorca med barn. Se också vad som händer på ön under din vecka i <Link href="/evenemang" style={{ color: '#993335', fontWeight: 600 }}>evenemangskalendern</Link>.
              </p>
            </div>
          </div>
        )}
        </div>

        {/* Höger: Stämningsbild */}
        <div style={{ position: 'sticky', top: '100px' }} className="planner-image-col">
          <img
            src="https://images.unsplash.com/photo-1566993850067-bb8df9c9807e?w=1200&q=80&auto=format"
            srcSet="https://images.unsplash.com/photo-1566993850067-bb8df9c9807e?w=640&q=80&auto=format 640w, https://images.unsplash.com/photo-1566993850067-bb8df9c9807e?w=960&q=80&auto=format 960w, https://images.unsplash.com/photo-1566993850067-bb8df9c9807e?w=1280&q=80&auto=format 1280w, https://images.unsplash.com/photo-1566993850067-bb8df9c9807e?w=1600&q=80&auto=format 1600w"
            sizes="(max-width: 768px) 100vw, 45vw"
            alt="Utsikt över Palmas hamn och katedral – planera din resa till Mallorca"
            width={1600}
            height={1067}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', objectFit: 'cover', borderRadius: '4px', display: 'block', marginBottom: '16px' }}
            className="planner-side-image"
          />
          <div style={{ background: 'white', borderRadius: '4px', padding: '20px 24px', border: '1px solid #ede5da' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '0.08em', color: '#383a46', margin: '0 0 8px', display: 'inline-flex', alignItems: 'center', gap: 8 }}><IconPalm size={18} /> TIPS FRÅN EN LOKAL</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.65', margin: 0 }}>
              ”Mallorca är fantastiskt hela året – men maj och september är de bästa månaderna. Färre turister, perfekt temperatur och allt är öppet.”
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '10px 0 0', fontWeight: 600 }}>— Erik, MyMallorca</p>
          </div>
        </div>

      </div>
    </section>
  );
}
