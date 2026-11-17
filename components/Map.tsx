'use client'
import { useEffect, useRef, type CSSProperties } from 'react'
import Link from 'next/link'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'

export type MapMarker = {
  name: string
  lat: number
  lng: number
  /** Länk i popupen och i listan. Utan href visas bara namn och beskrivning. */
  href?: string
  desc?: string
  /** Större, mörkare markör (t.ex. huvudstaden). */
  main?: boolean
  /** Extra rad i popupen, t.ex. en kort karaktäristik. */
  meta?: string
}

type Props = {
  markers: MapMarker[]
  height?: string
  pinVariant?: 'circle' | 'flag'
  ariaLabel?: string
  ctaLabel?: string
  /**
   * Text på knappen som fäller ut samma platser som en lista under kartan.
   * false = ingen lista (sidan har redan en egen textlista).
   */
  listLabel?: string | false
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch] as string)

const circleIconHtml = (name: string, color: string, size: number, isMain: boolean) => `
  <div style="display:flex;flex-direction:column;align-items:center;padding:14px 8px 4px;">
    <svg width="${size}" height="${size}" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="6" fill="${color}" stroke="white" stroke-width="2.5"/>
      ${isMain ? '<circle cx="7" cy="7" r="3" fill="white" opacity="0.7"/>' : ''}
    </svg>
    <span style="font-family:var(--font-body);font-size:10px;font-weight:600;color:var(--color-ink);white-space:nowrap;text-shadow:0 0 3px white,0 0 3px white,0 0 3px white;margin-top:2px">${escapeHtml(name)}</span>
  </div>
`

const flagIconHtml = (name: string, color: string) => `
  <div style="display:flex;flex-direction:column;align-items:center;padding:10px 10px 4px;">
    <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,0.35))">
      <line x1="4" y1="2" x2="4" y2="23" stroke="#383a46" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M4 3 L18 6 L4 10 Z" fill="${color}" stroke="white" stroke-width="1"/>
      <circle cx="4" cy="22" r="2" fill="${color}" stroke="white" stroke-width="1"/>
    </svg>
    <span style="font-family:var(--font-body);font-size:10px;font-weight:600;color:var(--color-ink);white-space:nowrap;text-shadow:0 0 3px white,0 0 3px white,0 0 3px white;margin-top:2px">${escapeHtml(name)}</span>
  </div>
`

const popupHtml = (m: MapMarker, ctaLabel: string) => {
  const name = escapeHtml(m.name)
  const metaLine = m.meta
    ? `<span style="display:block;color:var(--color-accent);font-size:11px;font-weight:600;letter-spacing:0.03em;margin:4px 0 2px">${escapeHtml(m.meta)}</span>`
    : ''
  const descLine = m.desc
    ? `<br><span style="color:var(--color-text-muted);font-size:12px;line-height:1.5">${escapeHtml(m.desc)}</span>`
    : ''
  const cta = m.href
    ? `<br><a href="${escapeHtml(m.href)}" aria-label="${name} – se detaljer" style="display:inline-block;margin-top:10px;background:var(--color-ink);color:var(--color-white);padding:7px 14px;font-size:11px;letter-spacing:0.08em;text-decoration:none;text-transform:uppercase;border-radius:4px;min-height:24px">${escapeHtml(ctaLabel)} →</a>`
    : ''
  return `<b style="font-size:13px;color:#383a46">${name}</b>` + metaLine + descLine + cta
}

/**
 * Gemensam Leaflet-karta för hela sajten.
 *
 * - Leaflet (≈42 kB gz) laddas först när kartan närmar sig vyn (IntersectionObserver + dynamisk import).
 * - Vyn anpassas till markörerna (fitBounds), så att hela ön syns även på mobil.
 * - Samma platser finns som en vanlig lista under kartan – för tangentbord,
 *   skärmläsare, sökmotorer och när kartan inte laddas.
 */
export default function Map({
  markers,
  height = 'clamp(380px, 60vh, 520px)',
  pinVariant = 'circle',
  ariaLabel = 'Interaktiv karta över Mallorca',
  ctaLabel = 'Utforska',
  listLabel,
}: Props) {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el || markers.length === 0) return

    let cancelled = false
    let map: import('leaflet').Map | undefined

    const init = async () => {
      const L = await import('leaflet')
      if (cancelled || !elRef.current) return
      const Lm = (L as unknown as { default?: typeof L } & typeof L).default || L

      // zoomSnap 0.5 ger en tätare passning av ön i fitBounds än hela zoomsteg.
      map = Lm.map(el, { scrollWheelZoom: false, zoomSnap: 0.5 })
      Lm.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map)

      markers.forEach((m) => {
        const color = m.main ? '#383a46' : '#993335'
        const size = m.main ? 22 : 16
        const html = pinVariant === 'flag'
          ? flagIconHtml(m.name, color)
          : circleIconHtml(m.name, color, size, !!m.main)

        const iconBoxWidth = Math.max(44, size + 80)
        const iconBoxHeight = Math.max(44, size + 20)
        const icon = Lm.divIcon({
          className: '',
          html,
          iconSize: [iconBoxWidth, iconBoxHeight],
          iconAnchor: [iconBoxWidth / 2, pinVariant === 'flag' ? 28 : size / 2 + 14],
          popupAnchor: [0, -size],
        })
        Lm.marker([m.lat, m.lng], {
          icon,
          keyboard: true,
          alt: m.href ? `${m.name} – se detaljer` : m.name,
          title: m.name,
        })
          .addTo(map!)
          .bindPopup(popupHtml(m, ctaLabel))
      })

      // Hela ön (alla markörer) i bild – även på smal mobilskärm.
      const bounds = Lm.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number]))
      map.fitBounds(bounds, { padding: [28, 28], maxZoom: 12 })
    }

    if (!('IntersectionObserver' in window)) {
      void init()
      return () => { cancelled = true; map?.remove() }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect()
          void init()
        }
      },
      { rootMargin: '300px 0px' },
    )
    observer.observe(el)

    return () => {
      cancelled = true
      observer.disconnect()
      map?.remove()
    }
  }, [markers, pinVariant, ctaLabel])

  const showList = listLabel !== false

  return (
    <div>
      <div
        ref={elRef}
        role="region"
        aria-label={ariaLabel}
        className={styles.map}
        style={{ '--map-height': height } as CSSProperties}
      />
      {showList && (
        <details className={styles.details}>
          <summary className={styles.summary}>
            {listLabel ?? `Visa alla ${markers.length} platser som lista`}
          </summary>
          <ul className={styles.list}>
            {markers.map((m) => (
              <li key={`${m.name}-${m.lat}-${m.lng}`} className={styles.item}>
                {m.href ? (
                  <Link href={m.href} className={`${styles.name} ${styles.link}`}>
                    {m.name}
                  </Link>
                ) : (
                  <span className={styles.name}>{m.name}</span>
                )}
                {m.desc && <span className={styles.desc}> · {m.desc}</span>}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}
