/**
 * Bildkrediter och licenser. Varje bild som används på sajten ska ha en post här.
 *
 * Tillåtna licenser (gratis att använda kommersiellt, utan tillstånd):
 *  - 'unsplash'  – Unsplash License (inte Unsplash+). Kreditering frivillig men visas ändå.
 *  - 'pexels'    – Pexels License. Kreditering frivillig men visas ändå.
 *  - 'cc0' / 'pd' – Creative Commons Zero / allmän egendom.
 *  - 'cc-by' / 'cc-by-sa' – kräver kreditering (fotograf, licens, länk) – visas på /bildkrediter.
 * Inte tillåtet: NC (icke-kommersiell), ND (inga bearbetningar), "fair use", okänd licens.
 */
export type ImageLicense = 'unsplash' | 'pexels' | 'cc0' | 'pd' | 'cc-by' | 'cc-by-sa' | 'egen';

export type ImageCredit = {
  /** Bildens URL som den används på sajten, utan query-parametrar (eller lokal sökväg /bilder/...). */
  src: string;
  /** Vad bilden visar – kontrollerat genom att titta på bilden. */
  motiv: string;
  /** Fotograf/upphovsperson. */
  fotograf: string;
  /** Länk som upphovspersonen kräver i krediteringen (valfritt). */
  fotografUrl?: string;
  /** Roll som visas före namnet, t.ex. 'målning' för fotografier av konstverk. Standard: 'foto'. */
  roll?: string;
  license: ImageLicense;
  /** Licensversion för CC, t.ex. '4.0'. */
  licenseVersion?: string;
  /** Sida där licensen framgår (Unsplash-/Commons-sidan). */
  sourceUrl: string;
  /** Sidor på sajten där bilden används. */
  usedOn: string[];
  /** Datum då licens och motiv kontrollerades (ÅÅÅÅ-MM-DD). */
  checked: string;
};

export const LICENSE_LABEL: Record<ImageLicense, { label: string; href?: string }> = {
  unsplash: { label: 'Unsplash License', href: 'https://unsplash.com/license' },
  pexels: { label: 'Pexels License', href: 'https://www.pexels.com/license/' },
  cc0: { label: 'CC0 1.0', href: 'https://creativecommons.org/publicdomain/zero/1.0/' },
  pd: { label: 'Allmän egendom' },
  'cc-by': { label: 'CC BY', href: 'https://creativecommons.org/licenses/by/4.0/' },
  'cc-by-sa': { label: 'CC BY-SA', href: 'https://creativecommons.org/licenses/by-sa/4.0/' },
  egen: { label: 'Eget foto' },
};

/** Länk till rätt licensversion, t.ex. CC BY-SA 3.0 de → creativecommons.org/licenses/by-sa/3.0/de/. */
export function licenseHref(license: ImageLicense, version?: string): string | undefined {
  if ((license === 'cc-by' || license === 'cc-by-sa') && version) {
    const [num, port] = version.trim().split(/\s+/);
    return `https://creativecommons.org/licenses/${license.slice(3)}/${num}/${port ? `${port}/` : ''}`;
  }
  return LICENSE_LABEL[license].href;
}
