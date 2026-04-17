'use client';
import { useState } from 'react';
import { IconWave, IconSparkle, IconFlag, IconBuilding, IconPin, IconUsers, IconBulb, IconMap, IconExternal } from '@/components/Icons';
import type { ComponentType } from 'react';

type Kategori = {
  titel: string;
  Icon: ComponentType<{ size?: number }>;
  aktiviteter: { namn: string; plats: string; ålder: string; tips: string; bild: string; lat: number; lon: number; webb: string }[];
};

const kategorier: Kategori[] = [
  {
    titel: 'Vattenparker',
    Icon: IconWave,
    aktiviteter: [
      { namn: 'Aqualand El Arenal', plats: 'El Arenal', ålder: 'Alla åldrar', tips: 'Kom tidigt för kortare köer', bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80', lat: 39.4934, lon: 2.7356, webb: 'https://www.aqualand.es' },
      { namn: 'Hidropark Alcúdia', plats: 'Alcúdia', ålder: 'Alla åldrar', tips: 'Bra för yngre barn – lugnt och familjärt', bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80', lat: 39.8234, lon: 3.1234, webb: 'https://www.hidropark.com' },
      { namn: 'Western Water Park', plats: 'Magaluf', ålder: 'Alla åldrar', tips: 'Kombinera med Western Park-temat', bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80', lat: 39.5012, lon: 2.5189, webb: 'https://www.westernpark.com' },
      { namn: 'Aqualand Magaluf', plats: 'Magaluf', ålder: 'Alla åldrar', tips: 'Europas längsta rutschbana finns här', bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80', lat: 39.5012, lon: 2.5234, webb: 'https://www.aqualand.es' },
      { namn: 'Marineland Vattenpark', plats: 'Costa de Blanes', ålder: 'Alla åldrar', tips: 'Kombinera med djurshowerna på samma anläggning', bild: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80', lat: 39.5678, lon: 2.5123, webb: 'https://www.marineland.es' },
    ],
  },
  {
    titel: 'Djurparker & Akvarium',
    Icon: IconSparkle,
    aktiviteter: [
      { namn: 'Palma Akvarium', plats: 'Palma', ålder: 'Alla åldrar', tips: 'Hajbassängen är ett måste – boka online för rabatt', bild: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', lat: 39.5234, lon: 2.7234, webb: 'https://www.palmaaquarium.com' },
      { namn: 'Safari Zoo Porto Cristo', plats: 'Porto Cristo', ålder: 'Alla åldrar', tips: 'Kamelridning och giraffutfodring ingår', bild: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', lat: 39.5123, lon: 3.3456, webb: 'https://www.zoomalorca.com' },
      { namn: 'Marineland', plats: 'Costa de Blanes', ålder: 'Alla åldrar', tips: 'Delfinshow kl 12 och 16 – kom i god tid', bild: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', lat: 39.5678, lon: 2.5123, webb: 'https://www.marineland.es' },
      { namn: 'Natura Parc', plats: 'Santa Eugènia', ålder: 'Alla åldrar', tips: 'Ekologisk djurpark med inhemska djur', bild: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', lat: 39.6234, lon: 2.8456, webb: 'https://www.naturaparc.net' },
      { namn: 'Falconeria de Altair', plats: 'Cas Concos', ålder: '3+ år', tips: 'Dagliga uppvisningar med örnar och falkar', bild: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', lat: 39.4123, lon: 3.1456, webb: 'https://www.google.com/search?q=Falconeria+Altair+Mallorca' },
    ],
  },
  {
    titel: 'Grottor & Naturäventyr',
    Icon: IconSparkle,
    aktiviteter: [
      { namn: 'Coves del Drach', plats: 'Porto Cristo', ålder: 'Alla åldrar', tips: 'Boka biljetter online – öns populäraste attraktion', bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80', lat: 39.5234, lon: 3.3312, webb: 'https://www.covesdeldrach.com' },
      { namn: "Coves d'Artà", plats: 'Capdepera', ålder: 'Alla åldrar', tips: 'Färre turister än Drach – lika imponerande', bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80', lat: 39.7012, lon: 3.4523, webb: 'https://www.covesdarta.com' },
      { namn: 'Coves de Campanet', plats: 'Campanet', ålder: 'Alla åldrar', tips: 'Mindre och mysigare – bra för yngre barn', bild: 'https://images.unsplash.com/photo-1502126829-a3a29b2b72f7?w=600&q=80', lat: 39.7812, lon: 2.9234, webb: 'https://www.covesdecampanet.com' },
      { namn: "Glassbottenbåt Cala d'Or", plats: "Cala d'Or", ålder: 'Alla åldrar', tips: 'Se undervattenslivet utan att blöta ner dig', bild: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80', lat: 39.3789, lon: 3.2345, webb: 'https://www.google.com/search?q=glassbottenbat+Cala+dOr' },
    ],
  },
  {
    titel: 'Äventyr & Aktiviteter',
    Icon: IconSparkle,
    aktiviteter: [
      { namn: 'House of Katmandu', plats: 'Magaluf', ålder: '4+ år', tips: '4D-bio, spegellabyrint och minigolf – heldagsaktivitet', bild: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80', lat: 39.5012, lon: 2.5234, webb: 'https://www.katmandu.es' },
      { namn: 'Karting Magaluf', plats: 'Magaluf', ålder: '3+ år', tips: 'Olika banor för olika åldrar – säkert och roligt', bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', lat: 39.5023, lon: 2.5178, webb: 'https://www.google.com/search?q=karting+magaluf' },
      { namn: 'Zipline La Reserva', plats: 'Puigpunyent', ålder: '6+ år', tips: 'Europas längsta ziplines i bergsviljö', bild: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', lat: 39.6123, lon: 2.5234, webb: 'https://www.la-reserva.com' },
      { namn: 'Kajakpaddling Port de Sóller', plats: 'Port de Sóller', ålder: '6+ år', tips: 'Paddla längs nordvästkusten – guidade turer finns', bild: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&q=80', lat: 39.7958, lon: 2.6942, webb: 'https://www.google.com/search?q=kayak+Port+de+Soller' },
      { namn: 'Snorkling Cala Mondragó', plats: 'Cala Mondragó', ålder: '5+ år', tips: 'Hyr utrustning i Porto Petro – massor av fisk', bild: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', lat: 39.3523, lon: 3.1934, webb: 'https://www.google.com/search?q=snorkling+Cala+Mondrago' },
    ],
  },
  {
    titel: 'Minigolf & Lek',
    Icon: IconFlag,
    aktiviteter: [
      { namn: 'Golf Fantasia Palma Nova', plats: 'Palma Nova', ålder: 'Alla åldrar', tips: 'Tre olika 18-hålsbanor i tropisk miljö', bild: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80', lat: 39.5023, lon: 2.5312, webb: 'https://www.golffantasia.com' },
      { namn: 'Crazy Golf Alcúdia', plats: 'Alcúdia', ålder: 'Alla åldrar', tips: 'Rolig kvällsaktivitet efter stranden', bild: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80', lat: 39.8234, lon: 3.1234, webb: 'https://www.google.com/search?q=crazy+golf+Alcudia' },
      { namn: 'Adventure Golf Palmanova', plats: 'Palmanova', ålder: 'Alla åldrar', tips: 'Temabanor med äventyrstema', bild: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80', lat: 39.5056, lon: 2.5289, webb: 'https://www.google.com/search?q=adventure+golf+palmanova' },
    ],
  },
  {
    titel: 'Museer & Lärande',
    Icon: IconBuilding,
    aktiviteter: [
      { namn: 'Palma Akvarium Science Center', plats: 'Palma', ålder: '5+ år', tips: 'Interaktiva experiment – lärorikt och roligt', bild: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80', lat: 39.5234, lon: 2.7234, webb: 'https://www.palmaaquarium.com' },
      { namn: 'Museu de Mallorca', plats: 'Palma', ålder: '6+ år', tips: 'Gratis söndagar – historia från förhistorisk tid', bild: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80', lat: 39.5712, lon: 2.6523, webb: 'https://www.google.com/search?q=Museu+de+Mallorca' },
      { namn: 'Tren de Sóller', plats: 'Palma–Sóller', ålder: 'Alla åldrar', tips: 'Barnen älskar det gamla träntåget – boka i förväg', bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', lat: 39.7667, lon: 2.7167, webb: 'https://www.trendesoller.com' },
      { namn: "Es Baluard Museu d'Art", plats: 'Palma', ålder: '6+ år', tips: 'Barnvänliga konstworkshops på helger', bild: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80', lat: 39.5723, lon: 2.6434, webb: 'https://www.esbaluard.org' },
    ],
  },
];

export default function BarnPage() {
  const [oppna, setOppna] = useState<string[]>([]);

  const toggleKategori = (titel: string) => {
    setOppna(prev =>
      prev.includes(titel) ? prev.filter(t => t !== titel) : [...prev, titel]
    );
  };

  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{
        position: 'relative',
        height: '55vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1600&q=90)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 'clamp(20px, 5vw, 60px) clamp(16px, 5vw, 80px)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', color: 'white' }}>
          <p style={{ fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>
            Roliga upplevelser för hela familjen
          </p>
          <h1 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.2rem, 7vw, 5rem)',
            fontWeight: '400',
            letterSpacing: '0.05em',
            margin: 0,
            lineHeight: 1,
          }}>
            Barnvänligt på Mallorca
          </h1>
          <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', marginTop: '12px', opacity: 0.9 }}>
            Allt för barnfamiljen – vattenparker, djur, grottor och äventyr
          </p>
        </div>
      </div>

      {/* Innehåll */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(24px, 4vw, 60px) clamp(16px, 4vw, 60px)' }}>
        <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#555', lineHeight: '1.8', marginBottom: '40px', maxWidth: '800px' }}>
          Mallorca är ett av Europas bästa resmål för barnfamiljer. Oavsett om ni söker vilda vattenrutschkanor, exotiska djur, spännande grottor eller lugna lekplatser – här finns något för alla åldrar.
        </p>

        {kategorier.map((kategori) => (
          <section key={kategori.titel} style={{ marginBottom: '16px' }}>
            {/* Kategoriknapp – alltid synlig */}
            <button
              onClick={() => toggleKategori(kategori.titel)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: oppna.includes(kategori.titel) ? '#993335' : 'white',
                color: oppna.includes(kategori.titel) ? 'white' : '#383a46',
                border: '2px solid #993335',
                borderRadius: oppna.includes(kategori.titel) ? '12px 12px 0 0' : '12px',
                padding: '16px 24px',
                cursor: 'pointer',
                textAlign: 'left' as const,
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <kategori.Icon size={22} /> {kategori.titel}
                <span style={{ fontSize: '0.85rem', opacity: 0.6, fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>
                  ({kategori.aktiviteter.length} aktiviteter)
                </span>
              </span>
              <span style={{ fontSize: '1.4rem', transition: 'transform 0.3s', transform: oppna.includes(kategori.titel) ? 'rotate(180deg)' : 'none' }}>
                ▼
              </span>
            </button>

            {/* Aktivitetskort – visas när öppnad */}
            {oppna.includes(kategori.titel) && (
              <div style={{
                background: '#f5f5f5',
                borderRadius: '0 0 12px 12px',
                border: '2px solid #111',
                borderTop: 'none',
                padding: 'clamp(16px, 3vw, 24px)',
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
                  gap: '16px',
                }}>
                  {kategori.aktiviteter.map((a) => (
                    <div key={a.namn} style={{
                      background: 'white',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 35px rgba(0,0,0,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)'; }}>
                      <img src={a.bild} alt={a.namn} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                      <div style={{ padding: '14px' }}>
                        <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.15rem', margin: '0 0 4px', color: '#111' }}>{a.namn}</h3>
                        <p style={{ fontSize: '0.8rem', color: '#888', margin: '0 0 2px', display: 'inline-flex', alignItems: 'center', gap: 4 }}><IconPin size={12} /> {a.plats} · <IconUsers size={12} /> {a.ålder}</p>
                        <div style={{ fontSize: '0.8rem', color: '#555', background: '#f5f5f5', padding: '6px 8px', borderRadius: '6px', margin: '8px 0 12px', lineHeight: '1.5' }}>
                          <IconBulb size={12} style={{ verticalAlign: '-2px', marginRight: 4 }} /> {a.tips}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <a href={`https://www.google.com/maps?q=${a.lat},${a.lon}`} target="_blank" rel="noopener noreferrer"
                            style={{ flex: 1, textAlign: 'center', padding: '8px', background: '#993335', color: '#fefefb', fontSize: '0.8rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}>
                            <IconMap size={12} style={{ verticalAlign: '-2px', marginRight: 4 }} /> Karta
                          </a>
                          <a href={a.webb} target="_blank" rel="noopener noreferrer"
                            style={{ flex: 1, textAlign: 'center', padding: '8px', background: 'white', color: '#111', border: '2px solid #111', fontSize: '0.8rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}>
                            <IconExternal size={12} style={{ verticalAlign: '-2px', marginRight: 4 }} /> Webb
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Karta */}
        <section style={{ marginTop: '32px' }}>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', letterSpacing: '0.05em', color: '#111', marginBottom: '16px', paddingBottom: '12px', borderBottom: '3px solid #993335' }}>
            <IconMap size={22} style={{ verticalAlign: '-4px', marginRight: 8 }} /> Karta – Barnaktiviteter på Mallorca
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m0!4v1!6m8!1m7!1sCAoSLEFGMVFpcE5IUGJQWG5wUEdFdlJaX3p6Q0lKd2J3X0JCVjBfN3FMQ1VpNkw!2m2!1d39.5696!2d2.6502!3f0!4f0!5f0.7820865974627469"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: '12px', boxShadow: '0 2px 16px rgba(0,0,0,0.12)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </div>
    </div>
  );
}
