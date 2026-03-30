import styles from '../page.module.css';

export default function SectionInsider() {
  return (
    <section className={styles.insiderSection}>
      <div className={styles.insiderInner}>
        <h2 className={styles.insiderTitle}>Det här vet bara lokalerna</h2>
        <p className={styles.insiderSub}>Tips som inte finns i någon guidebook</p>
        <div className={styles.insiderGrid}>
          <div className={styles.insiderCard}>
            <h3 className={styles.insiderCity}>📍 Porto Colom</h3>
            <ul className={styles.insiderList}>
              <li>🤫 Fiskarna säljer direkt från båten på morgonen vid Es Riveto - fråga bara</li>
              <li>🌅 Bästa solnedgången ses från klipporna vid Calo de Sa Barca Trencada</li>
              <li>🚗 Parkera vid kyrkan och gå - parkeringen vid hamnen är alltid full</li>
              <li>🍕 Restaurangen utan skylt på Carrer Major serverar bäst caldereta på hela ön</li>
            </ul>
          </div>
          <div className={styles.insiderCard}>
            <h3 className={styles.insiderCity}>📍 Palma</h3>
            <ul className={styles.insiderList}>
              <li>🤫 La Seu är gratis att besöka på vardagsmorgnar före kl 10</li>
              <li>🌅 Bästa utsikten över Palma är från Castell de Bellver - inte från katedralen</li>
              <li>🚗 Parkera vid Parc de la Mar och gå in i gamla stan till fots</li>
              <li>🍕 Frukostera på Mercat de l'Olivar - lokalerna äter där, inte på turistkaféen</li>
            </ul>
          </div>
          <div className={styles.insiderCard}>
            <h3 className={styles.insiderCity}>📍 Santanyi</h3>
            <ul className={styles.insiderList}>
              <li>🤫 Marknaden på onsdagar är bättre än lördagen - färre turister, fler lokala</li>
              <li>🌅 Kör till Cala Llombards en timme före solnedgången för magiska bilder</li>
              <li>🚗 Parkera utanför byn och gå in - centrum är bilfritt på marknadsdagar</li>
              <li>🍕 Bageri med ensaimadas från ugnen finns vid torget - öppnar kl 7</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
