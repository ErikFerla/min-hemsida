'use client';
import { useState } from 'react';

const resplaner: Record<string, Record<string, string[]>> = {
  '3': {
    'Strand': [
      'Dag 1: Ankomst Palma – checka in, promenera längs Passeig del Born, middag vid hamnen',
      'Dag 2: Es Trenc – Mallorcas vackraste strand. Ta med picknick och snorkling',
      'Dag 3: Cala Mondragó naturpark – kristallklart vatten, sedan flyg hem',
    ],
    'Kultur': [
      'Dag 1: Palma gamla stan – La Seu katedralen, Bellver slott, tapas på kvällen',
      'Dag 2: Valldemossa – Robert Graves museum i Deià, lunch i Sóller',
      'Dag 3: Alcúdia – romerska ruiner, medeltida stadsmur, marknad',
    ],
    'Mat': [
      'Dag 1: Palma – Mercat de lOlivar frukost, Marc Fosh lunch, Pa amb oli middag',
      'Dag 2: Binissalem vingårdstur – Bodega Ribas + José L. Ferrer, vinprovning',
      'Dag 3: Fiskmarknad Porto Colom på morgonen, caldereta de llagosta till lunch',
    ],
    'Aventyr': [
      'Dag 1: Klättring i Cala Barques, kayak i Cala Sant Vicenç',
      'Dag 2: Vandring i Serra de Tramuntana – GR221 etapp med utsikt över havet',
      'Dag 3: Cykla från Sóller till Port de Sóller längs kusten',
    ],
    'Familj': [
      'Dag 1: Palma Aquarium – barnen älskar hajarna, sedan glass vid katedralen',
      'Dag 2: Aqualand El Arenal – vattenrutschkanor hela dagen',
      'Dag 3: Safari Zoo Porto Cristo + Coves del Drach – dramatiska grottor',
    ],
  },
  '5': {
    'Strand': [
      'Dag 1: Ankomst och vila – Playa de Palma för en lugn start',
      'Dag 2: Es Trenc – kom tidigt, ta med picknick, snorkla vid klipporna',
      'Dag 3: Cala Mondragó – naturskyddad vik, kristallklart vatten',
      'Dag 4: Nordkusten – Cala Sant Vicenç och Formentor, dramatisk natur',
      'Dag 5: Cala Llombards – hemlig vik, perfekt för sista baddag',
    ],
    'Kultur': [
      'Dag 1: Palma – La Seu, Palau de lAlmudaina, kvällspromenad i gamla stan',
      'Dag 2: Valldemossa och Deià – Robert Graves, terrasser, lunch med utsikt',
      'Dag 3: Sóller – spårvagn till Port de Sóller, oranger och gammal arkitektur',
      'Dag 4: Alcúdia – romerska teatern, medeltida murar, marknad',
      'Dag 5: Sineu marknad på onsdagar, Manacor – pärlfabriker',
    ],
    'Mat': [
      'Dag 1: Palma – Mercat de lOlivar, tapas-crawl i El Born-kvarteret',
      'Dag 2: Binissalem – vingårdstur och vinprovning, lunch på Can Arabí',
      'Dag 3: Porto Colom – fiskmarknad, caldereta de llagosta, lokalt café',
      'Dag 4: Sóller – citrusmarmelad, olivolja-provning, middag vid hamnen',
      'Dag 5: Palma – avslutningmiddag på Marc Fosh eller Simply Fosh',
    ],
    'Aventyr': [
      'Dag 1: Kayak i Cala Barques och Cala Sant Vicenç',
      'Dag 2: Vandring GR221 – Port de Sóller till Deià, 4 timmar',
      'Dag 3: Mountainbike i Serra de Tramuntana',
      'Dag 4: Klättring i Cala en Gossalba, eftermiddag snorkling',
      'Dag 5: Jeeptur till Cap de Formentor – otillgängliga stränder',
    ],
    'Familj': [
      'Dag 1: Palma Aquarium och promenad längs strandpromenaden',
      'Dag 2: Aqualand El Arenal – vattenrutschkanor och barnpooler',
      'Dag 3: Coves del Drach – dramatiska grottor med konsert på underjordisk sjö',
      'Dag 4: Safari Zoo Porto Cristo – giraffer, lejon och kamelridning',
      'Dag 5: Hidropark Alcúdia – perfekt avslutning för hela familjen',
    ],
  },
  '7': {
    'Strand': [
      'Dag 1: Ankomst Palma, check-in, kvällspromenad',
      'Dag 2: Es Trenc – Mallorcas Karibien, kom tidigt',
      'Dag 3: Cala Mondragó naturpark – snorkla och vandra',
      'Dag 4: Nordkusten – Formentor och Cala Barques',
      'Dag 5: Cala Llombards och Cala des Moro – Grytes favoritstrand',
      'Dag 6: Cala Ratjada – lugn vik på östkusten',
      'Dag 7: Avslappnad morgon vid hotellet, hemresa',
    ],
    'Kultur': [
      'Dag 1: Ankomst och kvällspromenad i Palma gamla stan',
      'Dag 2: Palma – La Seu, Bellver, Fundació Miró',
      'Dag 3: Valldemossa och Deià – kultur och utsikter',
      'Dag 4: Sóller – spårvagn, orangerlundar, hamn',
      'Dag 5: Alcúdia – romerska ruiner och medeltida mur',
      'Dag 6: Sineu och Petra – autentiska inlandbyar',
      'Dag 7: Sista shopping i Palma, hemresa',
    ],
    'Mat': [
      'Dag 1: Palma – Mercat de lOlivar, kvällstapas',
      'Dag 2: Binissalem vingårdsrunda – 3 vingårdar',
      'Dag 3: Porto Colom – fiskmarknad och färsk fisk',
      'Dag 4: Matlagningskurs med lokal kock i Palma',
      'Dag 5: Sóller – olivolja och citrusfarm-besök',
      'Dag 6: Michelinkrog – Marc Fosh eller Adrián Quetglas',
      'Dag 7: Sista frukost på Mercat, hemresa',
    ],
    'Aventyr': [
      'Dag 1: Ankomst, kvällspromenad',
      'Dag 2: Kayak längs nordkusten',
      'Dag 3: Vandring GR221 etapp 1',
      'Dag 4: Mountainbike Tramuntana',
      'Dag 5: Klättring + snorkling',
      'Dag 6: Jeeptur Cap de Formentor',
      'Dag 7: Paddelsurf i Port de Pollença',
    ],
    'Familj': [
      'Dag 1: Ankomst, pool på hotellet',
      'Dag 2: Palma Aquarium',
      'Dag 3: Aqualand El Arenal',
      'Dag 4: Coves del Drach',
      'Dag 5: Safari Zoo Porto Cristo',
      'Dag 6: Hidropark Alcúdia',
      'Dag 7: Stranddag och hemresa',
    ],
  },
  '10': {
    'Strand': ['Dag 1-10: Komplett strandtur runt hela ön – Es Trenc, Cala Mondragó, Formentor, Cala Barques, Cala des Moro, Cala Llombards, Cala Ratjada, Cala Agulla, Cala Mesquida, och avslutning vid Playa de Palma'],
    'Kultur': ['Dag 1-10: Djupdyk i Mallorcas historia – Palma, Valldemossa, Deià, Sóller, Alcúdia, Pollença, Sineu, Felanitx, Santanyí och Manacor'],
    'Mat': ['Dag 1-10: Kulinarisk rundresa – vingårdar, fiskmarknader, matlagningskurser, Michelinkrogar och lokala marknader'],
    'Aventyr': ['Dag 1-10: Äventyrspacket – vandring, kayak, klättring, mountainbike, dykning, jeepturer och paddelsurf'],
    'Familj': ['Dag 1-10: Familjepaket – vattenparker, grottor, djurparker, stränder, båtturer och kulturupplevelser för alla åldrar'],
  },
  '14': {
    'Strand': ['Dag 1-14: Ultimat strandupplevelse – besök ALLA Mallorcas 50 bästa stränder och vikar, från norr till söder'],
    'Kultur': ['Dag 1-14: Komplett kulturresa – varje by, museum, kloster och historisk plats på ön'],
    'Mat': ['Dag 1-14: Gastronomisk expedition – alla Michelinkrogar, alla vingårdar, alla marknader'],
    'Aventyr': ['Dag 1-14: Ultimat äventyr – hela GR221 vandringsledan + alla aktiviteter'],
    'Familj': ['Dag 1-14: Drömfamiljesemester – allt för barn och vuxna, inget stressigt'],
  },
};

const intressenIkon: Record<string, string> = {
  'Strand': '🏖️',
  'Kultur': '🏛️',
  'Mat': '🍽️',
  'Aventyr': '🧗',
  'Familj': '👨‍👩‍👧',
};

export default function SectionPlanner() {
  const [dagar, setDagar] = useState('');
  const [intressen, setIntressen] = useState<string[]>([]);
  const [resplan, setResplan] = useState<string[]>([]);
  const [visar, setVisar] = useState(false);

  const dagval = ['3', '5', '7', '10', '14'];
  const intresseVal = ['Strand', 'Kultur', 'Mat', 'Aventyr', 'Familj'];

  const toggleIntresse = (i: string) => {
    setIntressen(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
    setVisar(false);
  };

  const genereraResplan = () => {
    if (!dagar || intressen.length === 0) return;
    const huvud = intressen[0];
    const plan = resplaner[dagar]?.[huvud] || [];
    setResplan(plan);
    setVisar(true);
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

  return (
    <section className="section-light">
      <div className="planner-grid-outer">

        {/* Vänster: Hela planner-innehållet */}
        <div>
        <p className="section-label">PLANERA DIN RESA</p>
        <h2 className="section-title">Skräddarsy din resa</h2>
        <div className="section-divider"></div>
        <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '40px' }}>
          Berätta vad du gillar – få en personlig resplan för Mallorca
        </p>

        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '12px' }}>Hur länge reser du?</p>
          <div className="planner-dag-grid" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {dagval.map(d => (
              <button key={d} onClick={() => { setDagar(d); setVisar(false); }} style={knappStyle(dagar === d)}>
                {d} dagar
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '12px' }}>Vad intresserar dig? (välj flera)</p>
          <div className="planner-intresse-grid" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {intresseVal.map(i => (
              <button key={i} onClick={() => toggleIntresse(i)} style={knappStyle(intressen.includes(i))}>
                {intressenIkon[i]} {i}
              </button>
            ))}
          </div>
        </div>

        <button
          className="planner-cta-btn"
          onClick={genereraResplan}
          disabled={!dagar || intressen.length === 0}
          style={{
            padding: '14px 40px',
            background: dagar && intressen.length > 0 ? '#F59E0B' : '#d4c8bb',
            color: dagar && intressen.length > 0 ? '#1F2937' : '#888',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '700',
            cursor: dagar && intressen.length > 0 ? 'pointer' : 'not-allowed',
            letterSpacing: '-0.01em',
            transition: 'all 0.2s',
            minHeight: '52px',
          }}
        >
          Skapa min resplan →
        </button>

        {visar && resplan.length > 0 && (
          <div style={{ marginTop: '48px', background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '24px' }}>
              Din personliga {dagar}-dagarsplan 🗺️
            </h3>
            {resplan.map((dag, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '36px', height: '36px', background: '#0E7490', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                  {i + 1}
                </div>
                <div style={{ paddingTop: '6px' }}>
                  <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6', color: '#222' }}>{dag}</p>
                </div>
              </div>
            ))}
            <div style={{ marginTop: '32px', padding: '20px', background: '#f5f5f5', borderRadius: '10px' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                💡 <strong>Tips:</strong> Vill du ha ännu mer personliga rekommendationer? Klicka på "Planera din resa" i menyn så hjälper vi dig vidare!
              </p>
            </div>
          </div>
        )}
        </div>

        {/* Höger: Stämningsbild */}
        <div style={{ position: 'sticky', top: '100px' }} className="planner-image-col">
          <img
            src="https://images.unsplash.com/photo-1566993850067-bb8df9c9807e?w=900&q=85"
            alt="Mallorca – planera din resa"
            loading="lazy"
            style={{ width: '100%', objectFit: 'cover', borderRadius: '4px', display: 'block', marginBottom: '16px' }}
            className="planner-side-image"
          />
          <div style={{ background: 'white', borderRadius: '4px', padding: '20px 24px', border: '1px solid #ede5da' }}>
            <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.08em', color: '#1F2937', margin: '0 0 8px' }}>🌴 TIPS FRÅN EN LOKAL</p>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: '1.65', margin: 0 }}>
              "Mallorca är fantastiskt hela året – men maj och september är de bästa månaderna. Färre turister, perfekt temperatur och allt är öppet."
            </p>
            <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: '10px 0 0', fontWeight: 600 }}>— Erik, MyMallorca</p>
          </div>
        </div>

      </div>
    </section>
  );
}
