import Link from 'next/link';
import HeroImage from '@/components/HeroImage';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import LastChecked from '@/app/components/LastChecked';
import { CHECKED, SOURCES } from '@/data/transport';
import h from '../guide/headings.module.css';
import t from '../hyrbil-och-transport/page.module.css';
import OrtQuiz from './OrtQuiz';
import { omraden, resenarer } from './omraden';
import styles from './page.module.css';

export default function VarSkaManBo() {
  return (
    <div className={t.page}>
      <HeroImage
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Portocolom-view-to-lighthouse.jpg/1920px-Portocolom-view-to-lighthouse.jpg"
        alt="Naturhamnen i Porto Colom på östkusten med fyren i bakgrunden – ett av Mallorcas lugnare områden att bo i"
        kicker="Planera resan"
        title="Var ska man bo på Mallorca?"
        subtitle="Öns områden för barnfamiljer, par, aktiva, stadsälskare och dig som vill stanna länge"
        height="55vh"
      />

      <div className={t.container}>
        <div className={styles.crumbs}>
          <Breadcrumbs items={[{ name: 'Hem', url: '/' }, { name: 'Var ska man bo', url: '/var-ska-man-bo' }]} />
        </div>

        <p className={t.lead}>
          Mallorca är större än många tror, och var du bor avgör hur semestern blir. Norra kusten har långa,
          barnvänliga sandstränder. Serra de Tramuntana i nordväst bjuder på bergsbyar och vandring. Sydöstra kusten
          har de små turkosa vikarna, inlandet har marknadsbyarna och Palma har stadslivet. Här är områdena, vem de
          passar och vad du ska tänka på.
        </p>

        <OrtQuiz />

        {/* Snabbguide */}
        <section aria-labelledby="snabbguide" className={t.section}>
          <h2 id="snabbguide" className={`${h.h2} ${t.sectionTitle}`}>Snabbguide: vem passar var?</h2>
          <dl className={styles.quick}>
            {resenarer.map((r) => (
              <div key={r.id} className={styles.quickRow}>
                <dt className={styles.quickWho}>{r.rubrik}</dt>
                <dd className={styles.quickWhere}>
                  {omraden
                    .filter((o) => o.passarFor.includes(r.id))
                    .map((o, i) => (
                      <span key={o.id}>
                        {i > 0 && ', '}
                        <a href={`#omrade-${o.id}`} className={t.inlineLink}>{o.namn}</a>
                      </span>
                    ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Områdena */}
        <section aria-labelledby="omradena" className={t.section}>
          <h2 id="omradena" className={`${h.h2} ${t.sectionTitle}`}>Områdena – för- och nackdelar</h2>
          <div className={styles.areas}>
            {omraden.map((o) => (
              <article key={o.id} id={`omrade-${o.id}`} className={styles.area} aria-labelledby={`omrade-${o.id}-rubrik`}>
                <p className={styles.region}>{o.region}</p>
                <h3 id={`omrade-${o.id}-rubrik`} className={`${h.h3} ${styles.areaTitle}`}>{o.namn}</h3>
                <p className={styles.areaText}>{o.beskrivning}</p>
                <p className={styles.fits}>
                  <span className={styles.fitsLabel}>Passar för:</span>{' '}
                  {o.passarFor.map((id) => resenarer.find((r) => r.id === id)?.rubrik.toLowerCase()).join(', ')}
                </p>
                <div className={styles.proscons}>
                  <div>
                    <p className={styles.listTitle}>Fördelar</p>
                    <ul className={styles.pros}>
                      {o.fordelar.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className={styles.listTitle}>Nackdelar</p>
                    <ul className={styles.cons}>
                      {o.nackdelar.map((n) => <li key={n}>{n}</li>)}
                    </ul>
                  </div>
                </div>
                <p className={styles.areaLinks}>
                  {o.orter.map((ort) => (
                    <Link key={ort.href} href={ort.href} className={styles.areaLink}>
                      Läs om {ort.namn} <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Att tänka på */}
        <section aria-labelledby="tank-pa" className={t.section}>
          <h2 id="tank-pa" className={`${h.h2} ${t.sectionTitle}`}>Att tänka på när du väljer</h2>
          <ul className={t.list}>
            <li>
              <strong>Bil eller inte?</strong> Utan bil bor du bäst i Palma, längs Alcúdiabukten eller i Sóller, där
              bussar, tåg och flygbussar går. Sydöstra kusten, Tramuntanabyarna och inlandets fincas kräver i praktiken
              bil. Läs mer om <Link href="/hyrbil-och-transport" className={t.inlineLink}>hyrbil och transport</Link>.
            </li>
            <li>
              <strong>Avståndet från flygplatsen.</strong> Palma ligger en kvart bort med bil, men till norra och
              östra kusten tar det ungefär en timme eller mer. Se transfertider på vår{' '}
              <Link href="/flyg" className={t.inlineLink}>flygsida</Link>.
            </li>
            <li>
              <strong>Säsongen.</strong> Många hotell och restauranger i de rena badorterna håller stängt på vintern.
              Reser du mellan november och mars, eller vill du stanna länge, välj en ort som lever året runt – Palma,
              Sóller, Pollença eller en stad i inlandet. Se också{' '}
              <Link href="/guide/basta-tid-resa-mallorca" className={t.inlineLink}>bästa tiden att resa</Link>.
            </li>
            <li>
              <strong>Med barn?</strong> Den grunda sandstranden vid Alcúdiabukten är svår att slå för de minsta. Mer
              tips finns i{' '}
              <Link href="/guide/mallorca-med-barn" className={t.inlineLink}>guiden för familjer</Link> och på{' '}
              <Link href="/barn" className={t.inlineLink}>barnsidan</Link>.
            </li>
            <li>
              <strong>Sommarställe eller längre vistelse?</strong> Besök området både på sommaren och på vintern innan
              du bestämmer dig, och kolla hur långt det är till närmaste mataffär, vårdcentral och busshållplats. Alla
              orter finns på sidan{' '}
              <Link href="/byar" className={t.inlineLink}>städer och byar</Link>.
            </li>
          </ul>
        </section>

        <LastChecked
          date={CHECKED}
          note="Beskrivningarna är våra egna bedömningar. Flygbussar, tåg och vägregler är kontrollerade mot källorna nedan."
          sources={[SOURCES.tibSommar, SOURCES.tibVinter, SOURCES.tibT3, SOURCES.sollerTag, SOURCES.formentor]}
        />
      </div>
    </div>
  );
}
