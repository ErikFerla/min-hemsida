import Image from 'next/image';
import Link from 'next/link';
import { beaches, BEACHES_HERO } from '@/data/beaches';
import StrandFilter from './StrandFilter';

const LIST_ID = 'strand-lista';

export default function StrandarPage() {
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
          {/* eslint-disable-next-line @next/next/no-img-element -- LCP-bild med egen srcset från Unsplash, förladdas i layout.tsx */}
          <img
            src={BEACHES_HERO.src}
            srcSet={BEACHES_HERO.srcSet}
            sizes={BEACHES_HERO.sizes}
            alt={BEACHES_HERO.alt}
            width={2000}
            height={1333}
            fetchPriority="high"
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
          <p style={{
            position: 'absolute', right: 10, bottom: 8,
            margin: 0, fontSize: '0.68rem', color: 'rgba(255,255,255,0.78)',
            letterSpacing: '0.04em', textShadow: '0 1px 3px rgba(0,0,0,0.6)',
          }}>
            {BEACHES_HERO.credit}
          </p>
        </div>

        {/* Intro – geografisk översikt med interna länkar */}
        <div style={{ background: '#fefefb', padding: 'clamp(32px,5vw,56px) clamp(20px,5vw,80px) clamp(16px,3vw,32px)' }}>
          <div style={{ maxWidth: '68ch', margin: '0 auto' }}>
            <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.1rem)', color: '#374151', lineHeight: 1.75, margin: '0 0 18px' }}>
              Mallorca rymmer mer än 200 stränder och vikar längs sina fyra kuster. På ostkusten ligger öns mest fotograferade <em>calas</em> – små turkosa vikar inbäddade mellan kalkstensklippor och pinjeskog, som Caló des Moro och Cala Mondragó. Nordkusten bjuder på långa sandstränder i de grunda bukterna vid{' '}
              <Link href="/alcudia" style={{ color: '#993335', textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '3px' }}>Alcúdia</Link>
              {' '}och{' '}
              <Link href="/pollenca" style={{ color: '#993335', textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '3px' }}>Pollença</Link>
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
        <StrandFilter
          listId={LIST_ID}
          beaches={beaches.map(({ region, typ, familj, snorkling, nudist }) => ({ region, typ, familj, snorkling, nudist }))}
        />

        <div style={{ background: '#F0EBE3', borderRadius: '12px', padding: '18px 20px', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <p style={{ margin: 0, fontSize: '0.92rem', color: '#374151', lineHeight: 1.5, flex: '1 1 220px' }}>
            <strong>Vill du ha djupare analys?</strong> Läs vår rankade guide med GPS, parkeringstips och insider-tips.
          </p>
          <Link href="/guide/basta-stranderna-mallorca" style={{ background: '#993335', color: 'white', padding: '0 20px', minHeight: '44px', display: 'inline-flex', alignItems: 'center', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '700', whiteSpace: 'nowrap' }}>
            Läs guiden →
          </Link>
        </div>

        <ul id={LIST_ID} style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '20px' }}>
          {beaches.map((s) => (
            <li
              key={s.namn}
              data-region={s.region}
              data-typ={s.typ}
              data-familj={s.familj || undefined}
              data-snorkling={s.snorkling || undefined}
              data-nudist={s.nudist || undefined}
              className="a2-lift"
              style={{ background: 'white', borderRadius: '16px', overflow: 'hidden' }}
            >
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
            </li>
          ))}
        </ul>

        <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid #ede5da' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#993335', fontWeight: '600', marginBottom: '8px' }}>PLANERA VIDARE</p>
          <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '0.05em', marginBottom: '32px', color: '#383a46' }}>Inför stranddagen</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px,100%), 1fr))', gap: '20px' }}>
            {[
              { titel: 'Kolla vinden först', text: 'Blåser det från norr är sydkustens vikar ofta lugnast – och tvärtom. En snabb titt på prognosen kan rädda dagen.', href: '/vader', cta: 'Se väderprognosen' },
              { titel: 'Stranddag med barn', text: 'Grunt vatten, skugga och toaletter i närheten? Filtrera på Familjevänlig ovan – och hitta fler upplevelser för barnen.', href: '/barn', cta: 'Mallorca med barn' },
              { titel: 'När är vattnet varmast?', text: 'Havet är som varmast från juli till september. Läs mer om vilken månad som passar dig bäst.', href: '/guide/basta-tid-resa-mallorca', cta: 'Bästa tiden att resa' },
            ].map(t => (
              <Link key={t.href} href={t.href} style={{ display: 'block', textDecoration: 'none', background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #ede5da', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.05em', color: '#383a46', margin: '0 0 8px', lineHeight: 1.2 }}>{t.titel}</h3>
                <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6, margin: '0 0 14px' }}>{t.text}</p>
                <span style={{ color: '#993335', fontWeight: 700, fontSize: '0.9rem' }}>{t.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
