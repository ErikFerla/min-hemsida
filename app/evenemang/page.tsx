import EvenemangLista from './EvenemangLista';
import styles from './evenemang.module.css';
import { idagPåMallorca, kommandeEvenemang, passeradeEvenemang, årsintervall } from './data';

// Listan delas upp i kommande/passerade utifrån dagens datum – bygg om sidan en gång per dygn.
export const revalidate = 86400;

export default function EvenemangPage() {
  const idag = idagPåMallorca();
  const kommande = kommandeEvenemang(idag);
  const passerade = passeradeEvenemang(idag);
  const intervall = årsintervall(idag);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.kicker}>Mallorca {intervall}</p>
        <h1 className={styles.title}>Evenemang på Mallorca {intervall}</h1>
        <div className={styles.divider} />
        <p className={styles.lead}>Fiestor, marknader, sport och kultur — se vad som händer på ön under din vistelse.</p>
        <p className={styles.disclaimer}>Datum kan ändras. Kontrollera alltid med arrangören innan du åker. Står det &quot;datum ej fastställt&quot; har nästa års datum inte publicerats ännu.</p>
      </header>

      <EvenemangLista kommande={kommande} passerade={passerade} />
    </div>
  );
}
