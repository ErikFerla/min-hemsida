import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

// Externa bildvärdar som sidorna laddar direkt (råa <img>, og-bilder) eller via next/image.
const IMAGE_HOSTS = ['https://images.unsplash.com', 'https://images.pexels.com', 'https://upload.wikimedia.org'];
// Kartbrickor för Leaflet (OpenStreetMap).
const TILE_HOSTS = ['https://tile.openstreetmap.org', 'https://*.tile.openstreetmap.org'];

// CSP i Report-Only-läge: bryter inget, men webbläsaren rapporterar överträdelser
// i konsolen. Next.js statiska sidor har inline-skript utan nonce, därav 'unsafe-inline'
// (nonce skulle göra alla sidor dynamiska). Väderdata hämtas via egen /api/weather,
// så connect-src räcker med 'self'. Skärp och flytta till enforced CSP när rapporterna är rena.
const cspReportOnly = [
  "default-src 'self'",
  // Vercel Web Analytics laddas från /_vercel/insights och skickar till samma origin ('self').
  // Bara i next dev hämtas felsökningsskriptet från va.vercel-scripts.com.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${[...IMAGE_HOSTS, ...TILE_HOSTS].join(' ')}`,
  "font-src 'self'",
  `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
  "frame-src 'none'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

// Den del av CSP som redan nu tillämpas på riktigt (frame-ancestors ignoreras i Report-Only).
const cspEnforced = ["frame-ancestors 'none'", "base-uri 'self'", "object-src 'none'"].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: cspEnforced },
  { key: 'Content-Security-Policy-Report-Only', value: cspReportOnly },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'serial=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()',
      'display-capture=()',
      'browsing-topics=()',
    ].join(', '),
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    resolveAlias: {
      // Nexts polyfill-modul utan polyfills som målwebbläsarna redan har (se filen). Nyckeln är
      // den relativa importen i next/dist/(esm/)client/app-globals.js – Turbopack matchar
      // aliaset mot importsträngen, inte mot den upplösta sökvägen. Kontrollera efter
      // Next-uppgraderingar att "trimStart" inte finns i .next/static/chunks utom i noModule-filen.
      '../build/polyfills/polyfill-module': './app/lib/polyfills/next-polyfill-module.js',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 768, 1024, 1280, 1600],
    imageSizes: [64, 128, 256, 384, 600],
    // 75 = standard (next/image); 60 = hjältebilderna (HERO_QUALITY i app/lib/image-url.ts).
    qualities: [60, 75],
    // Commons-thumbs saknar Cache-Control, så optimerade bilder fick standard-TTL:n 4 h och
    // omkodades (hämta ~0,5 MB JPEG + AVIF-kodning) när cachen gått ut – långsamt för den som
    // råkar komma då (t.ex. PageSpeed). Bild-URL:erna är i praktiken oföränderliga: 31 dagar.
    // Obs: byts en lokal bild i public/ ut under samma filnamn ligger den gamla kvar i upp till
    // 31 dagar – ge den nya bilden ett nytt filnamn.
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Kanonisk slug är /strandar (svenska). /strander var en tidig variant.
      { source: '/strander', destination: '/strandar', permanent: true },
      { source: '/strander/:path*', destination: '/strandar/:path*', permanent: true },
      // /stad/[slug] är borttagen – stadssidorna ligger på /:slug.
      { source: '/stad', destination: '/byar', permanent: true },
      { source: '/stad/:slug', destination: '/:slug', permanent: true },
      // Kontaktsidan är borttagen (ingen personlig reseplanering).
      { source: '/kontakt', destination: '/', permanent: true },
      { source: '/guide', destination: '/guider', permanent: true },
    ];
  },
};

export default nextConfig;
