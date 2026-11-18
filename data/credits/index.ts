import type { ImageCredit } from './types';
import { credits as d1 } from './d1';
import { credits as d2 } from './d2';
import { credits as d3 } from './d3';

/** Alla bildkrediter, en post per unik bild (sammanslagna om samma bild används på flera ställen). */
export const allCredits: ImageCredit[] = (() => {
  // Samma Commons-fil kan användas i flera bredder (…/960px-Fil.jpg, …/1920px-Fil.jpg) – slå ihop på källsidan.
  const keyOf = (c: ImageCredit) => (c.sourceUrl.includes('commons.wikimedia.org') ? c.sourceUrl : c.src);
  const bySrc = new Map<string, ImageCredit>();
  for (const c of [...d1, ...d2, ...d3]) {
    const prev = bySrc.get(keyOf(c));
    if (prev) prev.usedOn = [...new Set([...prev.usedOn, ...c.usedOn])].sort();
    else bySrc.set(keyOf(c), { ...c, usedOn: [...c.usedOn] });
  }
  return [...bySrc.values()].sort((a, b) => a.usedOn[0]?.localeCompare(b.usedOn[0] ?? '') ?? 0);
})();
