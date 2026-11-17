import EvenemangLista from './EvenemangLista';
import { idagPåMallorca, kommandeEvenemang, passeradeEvenemang, årsintervall } from './data';

// Listan delas upp i kommande/passerade utifrån dagens datum – bygg om sidan en gång per dygn.
export const revalidate = 86400;

export default function EvenemangPage() {
  const idag = idagPåMallorca();
  const kommande = kommandeEvenemang(idag);
  const passerade = passeradeEvenemang(idag);
  const intervall = årsintervall(idag);

  return (
    <div style={{ background: '#fefefb', minHeight: '100vh' }}>
      <header className="evenemang-hero" style={{ background: '#eeede4', padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,80px) clamp(36px,5vw,56px)', textAlign: 'center' }}>
        <p style={{ fontSize: 'clamp(0.7rem,1.5vw,0.8rem)', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#993335', fontWeight: 700, margin: '0 0 14px' }}>Mallorca {intervall}</p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem,6vw,3rem)', fontWeight: 500, letterSpacing: '-0.012em', margin: '0 auto 16px', lineHeight: 1.1, color: '#383a46', maxWidth: '18ch' }}>Evenemang på Mallorca {intervall}</h1>
        <div style={{ width: 48, height: 2, background: '#993335', margin: '0 auto 20px', borderRadius: 2 }} />
        <p style={{ fontSize: 'clamp(0.95rem,2.2vw,1.1rem)', color: '#374151', margin: '0 auto', maxWidth: '60ch', lineHeight: 1.6 }}>Fiestor, marknader, sport och kultur — se vad som händer på ön under din vistelse.</p>
        <p style={{ fontSize: '0.85rem', color: '#4B5563', margin: '12px auto 0', maxWidth: '60ch', lineHeight: 1.5 }}>Datum kan ändras. Kontrollera alltid med arrangören innan du åker. Står det &quot;datum ej fastställt&quot; har nästa års datum inte publicerats ännu.</p>
      </header>

      <EvenemangLista kommande={kommande} passerade={passerade} />
    </div>
  );
}
