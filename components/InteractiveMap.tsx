'use client'
import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

export type MapMarker = {
  name: string
  lat: number
  lng: number
  href: string
  desc?: string
  main?: boolean
  meta?: string
}

type Props = {
  markers: MapMarker[]
  center?: [number, number]
  zoom?: number
  height?: string
  pinVariant?: 'circle' | 'flag'
  ariaLabel?: string
  ctaLabel?: string
}

const circleIconHtml = (name: string, color: string, size: number, isMain: boolean) => `
  <div style="display:flex;flex-direction:column;align-items:center;padding:14px 8px 4px;">
    <svg width="${size}" height="${size}" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="6" fill="${color}" stroke="white" stroke-width="2.5"/>
      ${isMain ? '<circle cx="7" cy="7" r="3" fill="white" opacity="0.7"/>' : ''}
    </svg>
    <span style="font-family:Inter,sans-serif;font-size:10px;font-weight:600;color:#383a46;white-space:nowrap;text-shadow:0 0 3px white,0 0 3px white,0 0 3px white;margin-top:2px">${name}</span>
  </div>
`

const flagIconHtml = (name: string, color: string) => `
  <div style="display:flex;flex-direction:column;align-items:center;padding:10px 10px 4px;">
    <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,0.35))">
      <line x1="4" y1="2" x2="4" y2="23" stroke="#383a46" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M4 3 L18 6 L4 10 Z" fill="${color}" stroke="white" stroke-width="1"/>
      <circle cx="4" cy="22" r="2" fill="${color}" stroke="white" stroke-width="1"/>
    </svg>
    <span style="font-family:Inter,sans-serif;font-size:10px;font-weight:600;color:#383a46;white-space:nowrap;text-shadow:0 0 3px white,0 0 3px white,0 0 3px white;margin-top:2px">${name}</span>
  </div>
`

const popupHtml = (m: MapMarker, ctaLabel: string) => {
  const metaLine = m.meta
    ? `<span style="display:block;color:#993335;font-size:11px;font-weight:600;letter-spacing:0.03em;margin:4px 0 2px">${m.meta}</span>`
    : ''
  const descLine = m.desc
    ? `<span style="color:#6b7280;font-size:12px;line-height:1.5">${m.desc}</span>`
    : ''
  return (
    `<b style="font-size:13px;color:#383a46">${m.name}</b>` +
    metaLine +
    (descLine ? `<br>${descLine}` : '') +
    `<br><a href="${m.href}" aria-label="${m.name} – se detaljer" style="display:inline-block;margin-top:10px;background:#383a46;color:white;padding:7px 14px;font-size:11px;letter-spacing:0.08em;text-decoration:none;text-transform:uppercase;border-radius:4px;min-height:24px">${ctaLabel} →</a>`
  )
}

export default function InteractiveMap({
  markers,
  center = [39.62, 2.96],
  zoom = 10,
  height = 'clamp(380px, 60vh, 520px)',
  pinVariant = 'circle',
  ariaLabel = 'Interaktiv karta över Mallorca',
  ctaLabel = 'Utforska',
}: Props) {
  const idRef = useRef<string>(`imap-${Math.random().toString(36).slice(2, 10)}`)

  useEffect(() => {
    let cancelled = false
    import('leaflet').then((L) => {
      if (cancelled) return
      const Lm = (L as unknown as { default?: typeof L } & typeof L).default || L
      const el = document.getElementById(idRef.current) as (HTMLElement & { _leaflet_id?: number }) | null
      if (!el || el._leaflet_id) return

      const map = Lm.map(idRef.current, { center, zoom, scrollWheelZoom: false })
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
          alt: `${m.name} – se detaljer`,
          title: m.name,
        })
          .addTo(map)
          .bindPopup(popupHtml(m, ctaLabel))
      })
    })
    return () => { cancelled = true }
  }, [markers, center, zoom, pinVariant, ctaLabel])

  return (
    <div
      id={idRef.current}
      role="region"
      aria-label={ariaLabel}
      style={{
        width: '100%',
        height,
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    />
  )
}
