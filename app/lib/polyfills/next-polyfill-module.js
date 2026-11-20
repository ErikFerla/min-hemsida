// Ersätter Next.js inbyggda polyfill-modul (next/dist/build/polyfills/polyfill-module) via
// turbopack.resolveAlias i next.config.ts. Originalet polyfyllar bl.a. Array.prototype.at/flat,
// Object.hasOwn och String.prototype.trimEnd, som alla webbläsare Next stöder (Chrome/Edge/Firefox
// 111+, Safari 16.4+) redan har – Lighthouse/PageSpeed flaggar det som "Äldre JavaScript".
// Kvar är bara URL.canParse, som saknas i Safari 16.4–16.x och som Next själv använder.
if (typeof URL !== 'undefined' && !('canParse' in URL)) {
  URL.canParse = function canParse(url, base) {
    try {
      return !!new URL(url, base);
    } catch {
      return false;
    }
  };
}
