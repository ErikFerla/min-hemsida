'use client';
import { Suspense, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ACTIVITIES,
  REGIONS,
  isActivity,
  isRegion,
  rankMonths,
  type ActivityKey,
  type RegionKey,
} from './restid';
import styles from './BastaRestid.module.css';

// Verktyget "Bästa restid" (3.3). Valen ligger i URL:en (?aktivitet=bad&region=norr) så att
// ett resultat går att dela. Sidan är statisk: URL:en läses först i webbläsaren.

type Selection = { activity: ActivityKey | null; region: RegionKey };

export default function BastaRestid() {
  return (
    <Suspense fallback={<Tool activity={null} region="hela" onChange={() => {}} />}>
      <ToolFromUrl />
    </Suspense>
  );
}

function ToolFromUrl() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const a = params.get('aktivitet');
  const r = params.get('region');
  const fromUrl: Selection = { activity: isActivity(a) ? a : null, region: isRegion(r) ? r : 'hela' };
  const urlKey = `${fromUrl.activity}|${fromUrl.region}`;

  // Lokalt val så att knapparna svarar direkt; synkas om adressen ändras utifrån (bakåtknappen).
  const [selection, setSelection] = useState(fromUrl);
  const [prevKey, setPrevKey] = useState(urlKey);
  if (urlKey !== prevKey) {
    setPrevKey(urlKey);
    setSelection(fromUrl);
  }

  const onChange = (next: Selection) => {
    setSelection(next);
    const q = new URLSearchParams();
    if (next.activity) q.set('aktivitet', next.activity);
    if (next.region !== 'hela') q.set('region', next.region);
    const qs = q.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return <Tool {...selection} onChange={onChange} />;
}

function Tool({ activity, region, onChange }: Selection & { onChange: (s: Selection) => void }) {
  const results = activity ? rankMonths(activity, region) : [];
  const activityLabel = ACTIVITIES.find((x) => x.key === activity)?.label;
  const regionLabel = REGIONS.find((x) => x.key === region)?.label;

  return (
    <div className={styles.tool}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Vad vill du göra?</legend>
          <div className={styles.chips}>
            {ACTIVITIES.map((x) => (
              <label key={x.key} className={`${styles.chip} ${activity === x.key ? styles.chipActive : ''}`}>
                <input
                  type="radio"
                  name="aktivitet"
                  value={x.key}
                  checked={activity === x.key}
                  onChange={() => onChange({ activity: x.key, region })}
                  className={styles.radio}
                />
                {x.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className={styles.regionRow}>
          <label htmlFor="restid-region" className={styles.legend}>
            Var på ön?
          </label>
          <select
            id="restid-region"
            name="region"
            value={region}
            onChange={(e) => onChange({ activity, region: isRegion(e.target.value) ? e.target.value : 'hela' })}
            className={styles.select}
          >
            {REGIONS.map((x) => (
              <option key={x.key} value={x.key}>
                {x.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div aria-live="polite" className={styles.results}>
        {!activity ? (
          <p className={styles.empty}>Välj en aktivitet ovan så rangordnar vi årets månader från bäst till sämst.</p>
        ) : (
          <>
            <h3 className={styles.resultTitle}>
              {activityLabel}
              {region !== 'hela' ? ` – ${regionLabel}` : ''}: månaderna i ordning
            </h3>
            <ol className={styles.list}>
              {results.map((res, i) => (
                <li key={res.month.month} className={`${styles.item} ${i < 3 ? styles.itemTop : ''}`}>
                  <div className={styles.itemHead}>
                    <span className={styles.rank}>{i + 1}.</span>
                    <span className={styles.month}>{res.month.name}</span>
                    <span className={styles.verdict}>{res.verdict}</span>
                  </div>
                  <div className={styles.bar} aria-hidden="true">
                    <span className={styles.barFill} style={{ width: `${res.score}%` }} />
                  </div>
                  <p className={styles.reasons}>{capitalize(res.reasons.join(', '))}.</p>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
