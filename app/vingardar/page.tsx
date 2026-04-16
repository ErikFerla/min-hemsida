import Image from 'next/image';
import { IconPin, IconClock, IconExternal, IconMap, IconGlass, IconLeaf, IconUsers, PriceTag } from '@/components/Icons';

type Vingard = {
  namn: string;
  plats: string;
  prisnivå: 1 | 2 | 3 | 4;
  typ: string;
  passarFör: string;
  upplevelse: string;
  bokning: string;
  öppet: string;
  info: string;
  signaturvin: string;
  eko?: boolean;
  web?: string;
  bild: string;
  maps: string;
};

const vingårdar: Vingard[] = [
  { namn: 'Bodega Binigrau', plats: 'Binissalem', prisnivå: 2, typ: 'Medelstor, familjeägd', passarFör: 'Nybörjare, vänner', upplevelse: 'Provning + guidad tur i källaren', bokning: 'Drop-in möjligt, bokning rekommenderas', öppet: 'Mån–Lör 10–18', info: 'Känd för sina Prensal Blanc-viner och moderna inställning till traditionell vinmakning.', signaturvin: 'Binigrau Blanc (Prensal Blanc)', web: 'https://www.binigrau.es', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80', maps: 'https://maps.google.com/?q=Bodega+Binigrau+Binissalem+Mallorca' },
  { namn: 'José L. Ferrer', plats: 'Binissalem', prisnivå: 2, typ: 'Klassisk, storskalig', passarFör: 'Förstagångsbesökare', upplevelse: 'Museum + provning + kort rundtur', bokning: 'Drop-in välkomnas', öppet: 'Mån–Lör 9–19, Sön 10–14', info: 'Mallorcas äldsta och mest välkända vingård. Lätt att besöka — perfekt introduktion till öns viner.', signaturvin: 'Veritas Blanc', web: 'https://www.vinosferrer.com', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80', maps: 'https://maps.google.com/?q=Jose+Luis+Ferrer+Binissalem+Mallorca' },
  { namn: 'Bodega Ribas', plats: 'Consell', prisnivå: 3, typ: 'Historisk familjegård', passarFör: 'Entusiaster, par', upplevelse: 'Privat provning i anrika källare', bokning: 'Förbokning krävs', öppet: 'Mån–Fre 9–17', info: 'Familjedriven vingård sedan 1711 — Mallorcas äldsta. Fokus på inhemska druvor och eleganta viner.', signaturvin: 'Ribas de Cabrera', web: 'https://www.bodegasribas.com', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=800&q=80', maps: 'https://maps.google.com/?q=Bodega+Ribas+Consell+Mallorca' },
  { namn: 'Ànima Negra', plats: 'Felanitx', prisnivå: 3, typ: 'Boutique, kultstatus', passarFör: 'Vinkännare', upplevelse: 'Exklusiv provning med vinmakaren', bokning: 'Endast med bokning', öppet: 'Enligt överenskommelse', info: 'Producerar öns mest hyllade rödviner med fokus på den inhemska Callet-druvan. Svårbokad men värd det.', signaturvin: 'ÀN/2', web: 'https://www.animanegra.com', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80', maps: 'https://maps.google.com/?q=Anima+Negra+Felanitx+Mallorca' },
  { namn: 'Can Majoral', plats: 'Algaida', prisnivå: 2, typ: 'Ekologisk, liten', passarFör: 'Naturvin-intresserade', upplevelse: 'Rundvandring i vingården + provning', bokning: 'Förbokning', öppet: 'Mån–Fre 10–17', info: 'Pionjärer inom ekologisk vinodling på Mallorca. Unik terroar i öns inre högland.', signaturvin: 'Entel', eko: true, web: 'https://www.canmajoral.com', bild: 'https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=800&q=80', maps: 'https://maps.google.com/?q=Can+Majoral+Algaida+Mallorca' },
  { namn: 'Vinya Taujana', plats: 'Santa Eugènia', prisnivå: 2, typ: 'Boutique-vingård', passarFör: 'Små sällskap', upplevelse: 'Personlig provning', bokning: 'Bokning krävs', öppet: 'Med bokning', info: 'Liten producent med personlig prägel. Ett lugnt alternativ för den som vill undvika turistströmmar.', signaturvin: 'Taujana Rosat', web: 'https://www.vinyataujana.com', bild: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?w=800&q=80', maps: 'https://maps.google.com/?q=Vinya+Taujana+Santa+Eugenia+Mallorca' },
  { namn: 'Miquel Gelabert', plats: 'Manacor', prisnivå: 3, typ: 'Hantverksvingård', passarFör: 'Seriösa vinnördar', upplevelse: 'Djup provning, ofta med vinmakaren', bokning: 'Förbokning krävs', öppet: 'Mån–Lör 10–18', info: 'Prisbelönt hantverksvingård på öns östra sida. Eleganta viner med lagringspotential.', signaturvin: 'Torrent Negre', web: 'https://www.miquelgelabert.com', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80', maps: 'https://maps.google.com/?q=Miquel+Gelabert+Manacor+Mallorca' },
  { namn: 'Son Bordils', plats: 'Inca', prisnivå: 2, typ: 'Stort gods, ekologiskt', passarFör: 'Familjer, grupper', upplevelse: 'Rundtur genom gods, vingård och källare', bokning: 'Förbokning rekommenderas', öppet: 'Mån–Fre 9–17', info: 'Vackert historiskt gods med ekologisk produktion och välplanerade besök för större sällskap.', signaturvin: 'Son Bordils Blanc', eko: true, web: 'https://www.sonbordils.es', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80', maps: 'https://maps.google.com/?q=Son+Bordils+Inca+Mallorca' },
  { namn: 'Bodegas Macià Batle', plats: 'Santa Maria', prisnivå: 2, typ: 'Storskalig producent', passarFör: 'Förstagångsbesökare', upplevelse: 'Visitor center, film, provning', bokning: 'Drop-in', öppet: 'Mån–Lör 9–19, Sön 10–14', info: 'En av öns största producenter med välorganiserade besök. Bra första stopp på en vinresa.', signaturvin: 'Anni Blanc de Blancs', web: 'https://www.maciabatle.com', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=800&q=80', maps: 'https://maps.google.com/?q=Bodegas+Macia+Batle+Santa+Maria+Mallorca' },
  { namn: 'Can Vidalet', plats: 'Llubí', prisnivå: 3, typ: 'Ekologisk, internationellt prisad', passarFör: 'Vinentusiaster', upplevelse: 'Guidad tur + tre-glasprovning', bokning: 'Endast med bokning', öppet: 'Enligt överenskommelse', info: 'Liten ekologisk producent som fått internationellt erkännande. Avskild och stillsam miljö.', signaturvin: 'Petit Fangar', eko: true, web: 'https://www.canvidalet.com', bild: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80', maps: 'https://maps.google.com/?q=Can+Vidalet+Llubi+Mallorca' },
  { namn: 'Son Prim', plats: 'Sencelles', prisnivå: 2, typ: 'Medelstor, modern', passarFör: 'Vinälskare', upplevelse: 'Provning av flera årgångar', bokning: 'Rekommenderas', öppet: 'Mån–Fre 10–17', info: 'Fokus på inhemska druvor i modern stil. Välbalanserade röd- och vitviner.', signaturvin: 'Son Prim Merlot', web: 'https://www.sonprim.com', bild: 'https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=800&q=80', maps: 'https://maps.google.com/?q=Son+Prim+Sencelles+Mallorca' },
  { namn: 'Celler Tianna Negre', plats: 'Binissalem', prisnivå: 2, typ: 'Modern, innovativ', passarFör: 'Designintresserade', upplevelse: 'Arkitektonisk bodega + provning', bokning: 'Bokning rekommenderas', öppet: 'Mån–Lör 10–18', info: 'Arkitektritad bodega med ren, modern estetik. Innovativa viner från etablerad familj.', signaturvin: 'Ses Nines Blanc', web: 'https://www.tiannanegre.com', bild: 'https://images.unsplash.com/photo-1543418219-44e30b057fea?w=800&q=80', maps: 'https://maps.google.com/?q=Celler+Tianna+Negre+Binissalem+Mallorca' },
  { namn: 'Son Sureda Rica', plats: 'Manacor', prisnivå: 3, typ: 'Exklusiv boutique', passarFör: 'Par, privata sällskap', upplevelse: 'Intim provning i liten grupp', bokning: 'Endast med bokning', öppet: 'Enligt överenskommelse', info: 'Liten och exklusiv producent. Välj denna för en personlig upplevelse utan andra besökare.', signaturvin: 'Son Sureda Blanc', web: 'https://www.sonsurecirica.com', bild: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80', maps: 'https://maps.google.com/?q=Son+Sureda+Rica+Manacor+Mallorca' },
  { namn: 'Bodega Can Coleto', plats: 'Llucmajor', prisnivå: 2, typ: 'Familjegods', passarFör: 'Par, fotografer', upplevelse: 'Provning med utsikt över landskapet', bokning: 'Rekommenderas', öppet: 'Mån–Lör 10–17', info: 'Familjegods med fantastisk utsikt — bland öns mest fotogeniska besök.', signaturvin: 'Can Coleto Negre', web: 'https://www.cancoleto.com', bild: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80', maps: 'https://maps.google.com/?q=Bodega+Can+Coleto+Llucmajor+Mallorca' },
  { namn: 'Vins Nadal', plats: 'Binissalem', prisnivå: 1, typ: 'Traditionell familjevingård', passarFör: 'Budgetmedvetna', upplevelse: 'Enkel provning, varm atmosfär', bokning: 'Drop-in välkomnas', öppet: 'Mån–Lör 9–18', info: 'Traditionell familjevingård sedan 1944. Enkel, ärlig och prisvärd.', signaturvin: 'Nadal Rosat', web: 'https://www.vinsnadal.com', bild: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=800&q=80', maps: 'https://maps.google.com/?q=Vins+Nadal+Binissalem+Mallorca' },
];

export const metadata = {
  title: 'Vingårdar på Mallorca – Guide till öns 15 bästa bodegas',
  description: 'Upptäck Mallorcas vingårdar. Från familjedrivna bodegas till ekologiska producenter — med tips om bokning, provning och vem varje vingård passar för.',
};

const META_LABEL: React.CSSProperties = { fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: 600, margin: 0, lineHeight: 1.2 };
const META_VALUE: React.CSSProperties = { fontSize: '0.85rem', color: '#383a46', margin: '1px 0 0', lineHeight: 1.3 };

export default function VingardarPage() {
  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <div style={{
        position: 'relative', minHeight: '52vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&q=90)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'flex-end',
        padding: 'clamp(24px,6vw,60px) clamp(20px,5vw,80px)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.72))' }} />
        <div style={{ position: 'relative', color: 'white', maxWidth: '640px' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: '14px', opacity: 0.85 }}>Mallorcas vinkultur</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.4rem,8vw,4.8rem)', fontWeight: 400, letterSpacing: '0.02em', margin: 0, lineHeight: 0.95 }}>Vingårdar på Mallorca</h1>
          <p style={{ fontSize: 'clamp(0.95rem,3.2vw,1.1rem)', marginTop: '16px', opacity: 0.92, lineHeight: 1.5 }}>15 handplockade bodegas – från anrika familjegods till ekologiska nykomlingar. Med tips om bokning, provning och vem varje plats passar för.</p>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(32px,6vw,64px) clamp(16px,5vw,40px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, color: '#993335' }}>
          <IconGlass size={18} />
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.5rem,5vw,2rem)', letterSpacing: '0.05em', margin: 0, color: '#383a46' }}>15 vingårdar att besöka</h2>
        </div>
        <p style={{ color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.65, marginTop: 0, marginBottom: 36, maxWidth: '60ch' }}>
          Mallorca har över 70 registrerade vingårdar, främst i Binissalem- och Pla i Llevant-regionerna. De flesta erbjuder provning — men boka alltid i förväg för de mindre.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {vingårdar.map((v, i) => (
            <article key={v.namn} style={{ background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid #ede5da', boxShadow: '0 4px 14px rgba(31,41,55,0.04)' }}>
              <div style={{ position: 'relative', width: '100%', height: 160 }}>
                <Image src={v.bild} alt={v.namn} fill sizes="(max-width:860px) 100vw, 860px" style={{ objectFit: 'cover' }} loading={i < 2 ? 'eager' : 'lazy'} />
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(255,255,255,0.94)', color: '#383a46', padding: '3px 9px', borderRadius: 999, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em' }}>#{i + 1}</div>
                {v.eko && (
                  <div style={{ position: 'absolute', top: 10, right: 10, display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(15,118,110,0.94)', color: 'white', padding: '3px 9px', borderRadius: 999, fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    <IconLeaf size={10} stroke={2} /> Eko
                  </div>
                )}
              </div>

              <div style={{ padding: '14px 16px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 4 }}>
                  <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.04em', margin: 0, color: '#383a46', lineHeight: 1.1 }}>{v.namn}</h3>
                  <PriceTag tier={v.prisnivå} />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 12px', color: '#6B7280', fontSize: '0.8rem', marginBottom: 8 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><IconPin size={11} /> {v.plats}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><IconClock size={11} /> {v.öppet}</span>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.45, margin: '0 0 10px' }}>{v.info}</p>

                <div style={{ background: '#F9F6F1', borderRadius: 10, padding: '10px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 14px', marginBottom: 10 }}>
                  <div>
                    <p style={META_LABEL}>Typ</p>
                    <p style={META_VALUE}>{v.typ}</p>
                  </div>
                  <div>
                    <p style={META_LABEL}>Passar för</p>
                    <p style={META_VALUE}>{v.passarFör}</p>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <p style={META_LABEL}>Upplevelse</p>
                    <p style={META_VALUE}>{v.upplevelse}</p>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <p style={META_LABEL}>Bokning</p>
                    <p style={META_VALUE}>{v.bokning}</p>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <p style={META_LABEL}>Signaturvin</p>
                    <p style={{ ...META_VALUE, fontStyle: 'italic', color: '#993335' }}>{v.signaturvin}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a href={v.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#383a46', color: 'white', borderRadius: 8, fontSize: '0.82rem', textDecoration: 'none', fontWeight: 600, minHeight: 36 }}>
                    <IconMap size={14} stroke={1.8} /> Visa på karta
                  </a>
                  {v.web && (
                    <a href={v.web} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 16px', background: 'white', color: '#383a46', border: '1px solid #d9cfc1', borderRadius: 10, fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600, minHeight: 40 }}>
                      Hemsida <IconExternal size={13} stroke={1.8} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 48, padding: '28px 24px', background: '#383a46', borderRadius: 18, color: 'white', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#993335', marginBottom: 10 }}>
            <IconUsers size={16} stroke={1.8} />
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>Bra att veta</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.65, opacity: 0.9 }}>De flesta vingårdar ligger 20–40 min bilväg från Palma. Räkna med 1,5–2 timmar per besök. Boka alltid i förväg för boutique-gårdar — särskilt lördagar.</p>
        </div>
      </div>
    </div>
  );
}
