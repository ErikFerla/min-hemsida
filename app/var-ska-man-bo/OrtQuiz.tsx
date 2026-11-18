'use client';
import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { fragor, omraden, type FragaId, type Omrade, type SvarNyckel } from './omraden';
import styles from './OrtQuiz.module.css';

/*
 * Ortsquizet på /var-ska-man-bo (3.5). Svaren ligger i URL:en (?vilka=familj&gora=strand …),
 * så en delad länk visar samma resultat. Sidan är ändå statisk: på servern är inget valt,
 * och all text om områdena finns i den serverrenderade sidan under quizet.
 */

type Svar = Partial<Record<FragaId, string>>;

const URL_HÄNDELSE = 'ortsquiz-url';

function prenumerera(callback: () => void) {
  window.addEventListener('popstate', callback);
  window.addEventListener(URL_HÄNDELSE, callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(URL_HÄNDELSE, callback);
  };
}

function läsSvar(search: string): Svar {
  const params = new URLSearchParams(search);
  const svar: Svar = {};
  for (const f of fragor) {
    const v = params.get(f.id);
    if (v && f.val.some((val) => val.id === v)) svar[f.id] = v;
  }
  return svar;
}

function skrivSvar(svar: Svar) {
  const params = new URLSearchParams(window.location.search);
  for (const f of fragor) {
    const v = svar[f.id];
    if (v) params.set(f.id, v);
    else params.delete(f.id);
  }
  const qs = params.toString();
  window.history.replaceState(window.history.state, '', `${window.location.pathname}${qs ? `?${qs}` : ''}#ortsquiz`);
  window.dispatchEvent(new Event(URL_HÄNDELSE));
}

type Resultat = { omrade: Omrade; poang: number; varfor: string[] };

function räknaUt(svar: Svar): Resultat[] {
  const nycklar = fragor
    .filter((f) => svar[f.id])
    .map((f) => `${f.id}:${svar[f.id]}` as SvarNyckel);

  return omraden
    .map((omrade, ordning) => {
      const träffar = nycklar.map((n) => omrade.quiz[n]).filter((t) => t !== undefined);
      const poang = träffar.reduce((sum, t) => sum + t.poang, 0);
      const varfor = träffar
        .filter((t) => t.poang > 0 && t.varfor)
        .sort((a, b) => b.poang - a.poang)
        .map((t) => t.varfor as string)
        .slice(0, 2);
      return { omrade, poang, varfor, ordning };
    })
    .filter((r) => r.poang > 0)
    .sort((a, b) => b.poang - a.poang || a.ordning - b.ordning)
    .slice(0, 3);
}

export default function OrtQuiz() {
  const search = useSyncExternalStore(prenumerera, () => window.location.search, () => '');
  const svar = läsSvar(search);
  const antalSvar = fragor.filter((f) => svar[f.id]).length;
  const klar = antalSvar === fragor.length;
  const resultat = klar ? räknaUt(svar) : [];

  const välj = (fraga: FragaId, val: string) => skrivSvar({ ...svar, [fraga]: val });
  const börjaOm = () => skrivSvar({});

  return (
    <section id="ortsquiz" aria-labelledby="ortsquiz-rubrik" className={styles.quiz}>
      <p className={styles.kicker}>Ortsquiz</p>
      <h2 id="ortsquiz-rubrik" className={styles.title}>Vilken del av Mallorca passar dig?</h2>
      <p className={styles.intro}>
        Svara på fem frågor så föreslår vi två eller tre områden. Svaren sparas i adressen, så du kan dela länken med
        dem du reser med.
      </p>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {fragor.map((f, i) => (
          <fieldset key={f.id} className={styles.fieldset}>
            <legend className={styles.legend}>
              <span className={styles.number}>{i + 1}</span> {f.fraga}
            </legend>
            <div className={styles.options}>
              {f.val.map((v) => {
                const id = `quiz-${f.id}-${v.id}`;
                return (
                  <label key={v.id} htmlFor={id} className={styles.option}>
                    <input
                      id={id}
                      type="radio"
                      name={f.id}
                      value={v.id}
                      checked={svar[f.id] === v.id}
                      onChange={() => välj(f.id, v.id)}
                      className={styles.radio}
                    />
                    <span>{v.text}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </form>

      <div aria-live="polite" className={styles.result}>
        {!klar && (
          <p className={styles.progress}>
            {antalSvar === 0
              ? 'Välj ett svar på varje fråga för att se förslagen.'
              : `${antalSvar} av ${fragor.length} frågor besvarade.`}
          </p>
        )}

        {klar && (
          <>
            <h3 className={styles.resultTitle}>Våra förslag till dig</h3>
            {resultat.length === 0 ? (
              <p className={styles.progress}>
                Vi hittade ingen tydlig matchning. Läs om områdena nedan – eller ändra något svar.
              </p>
            ) : (
              <ol className={styles.resultList}>
                {resultat.map((r) => (
                  <li key={r.omrade.id} className={styles.resultItem}>
                    <p className={styles.resultName}>{r.omrade.namn}</p>
                    <p className={styles.resultRegion}>{r.omrade.region}</p>
                    {r.varfor.length > 0 ? (
                      <ul className={styles.reasons}>
                        {r.varfor.map((v) => <li key={v}>{v}</li>)}
                      </ul>
                    ) : (
                      <p className={styles.reasonText}>{r.omrade.beskrivning}</p>
                    )}
                    <p className={styles.links}>
                      {r.omrade.orter.map((o) => (
                        <Link key={o.href} href={o.href} className={styles.link}>
                          Läs om {o.namn} <span aria-hidden="true">→</span>
                        </Link>
                      ))}
                      <a href={`#omrade-${r.omrade.id}`} className={styles.linkSecondary}>
                        För- och nackdelar
                      </a>
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </>
        )}

        {antalSvar > 0 && (
          <button type="button" onClick={börjaOm} className={styles.reset}>
            Börja om
          </button>
        )}
      </div>
    </section>
  );
}
