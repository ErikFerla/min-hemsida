'use client'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import styles from './Map.module.css'

export type MapMarker = {
  name: string
  lat: number
  lng: number
  /** Länk i popupen och i listan. Utan href visas bara namn och beskrivning. */
  href?: string
  desc?: string
  /** Större markör vars etikett alltid prioriteras (t.ex. huvudstaden). */
  main?: boolean
  /** Extra rad i popupen, t.ex. en kort karaktäristik. */
  meta?: string
}

/** Nålarnas ämnesfärg. Vinrött är reserverat för handling (länkar, knappar) och används inte här. */
export type MapTone = 'ink' | 'sea' | 'olive' | 'ochre'

type Props = {
  markers: MapMarker[]
  height?: string
  pinVariant?: 'circle' | 'flag'
  tone?: MapTone
  ariaLabel?: string
  ctaLabel?: string
  /**
   * Rubrik på den numrerade listan under kartan (samma nummer som nålarna).
   * false = ingen lista; då blir nålarna små, onumrerade prickar.
   */
  listLabel?: string | false
}

// Tokens med reservvärden tills ämnesfärgerna finns i globals.css (vit text klarar ≥ 4,5:1 på alla).
const TONE: Record<MapTone, string> = {
  ink: 'var(--color-ink)',
  sea: 'var(--color-sea, #22657a)',
  olive: 'var(--color-olive, #55683a)',
  ochre: 'var(--color-ochre, #9a6a12)',
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch] as string)

/** Markörens HTML. Etiketten är dekor (aria-hidden) – namnet finns i markörens aria-label. */
const markerHtml = (m: MapMarker, n: number | null, variant: 'circle' | 'flag') => {
  const label = n === null ? '' : `<span class="${styles.label}" aria-hidden="true">${escapeHtml(m.name)}</span>`
  if (variant === 'flag') {
    return `<span class="${styles.flag}" aria-hidden="true"><span class="${styles.pennant}">${n ?? ''}</span></span>${label}`
  }
  if (n === null) return `<span class="${styles.dot}" aria-hidden="true"></span>`
  return `<span class="${styles.pin}" aria-hidden="true">${n}</span>${label}`
}

const popupHtml = (m: MapMarker, ctaLabel: string) => {
  const name = escapeHtml(m.name)
  const metaLine = m.meta ? `<span class="${styles.popupMeta}">${escapeHtml(m.meta)}</span>` : ''
  const descLine = m.desc ? `<span class="${styles.popupDesc}">${escapeHtml(m.desc)}</span>` : ''
  const cta = m.href
    ? `<a class="${styles.popupLink}" href="${escapeHtml(m.href)}" aria-label="${name} – ${escapeHtml(ctaLabel.toLowerCase())}">${escapeHtml(ctaLabel)} →</a>`
    : ''
  return `<strong class="${styles.popupName}">${name}</strong>${metaLine}${descLine}${cta}`
}

const overlaps = (a: DOMRect, b: DOMRect) =>
  a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top

type Api = { open: (i: number) => void }

/**
 * Gemensam Leaflet-karta för hela sajten.
 *
 * - Leaflet (≈42 kB gz) laddas först när kartan närmar sig vyn (IntersectionObserver + dynamisk import).
 * - Plattorna (OSM) tonas ned med ett CSS-filter mot sandpaletten; attributionen påverkas inte.
 * - Med lista: numrerade nålar med samma nummer som listan under kartan. Klick på numret i listan
 *   öppnar platsen på kartan, och öppen popup markerar raden i listan.
 * - Ortsnamnen visas bara där de får plats (huvudorter först); övriga syns i popup och lista.
 * - Tangentbord: nålarna är knappar (Enter/blanksteg öppnar), Esc stänger popupen och lämnar
 *   fokus på nålen. Listan finns i SSR-HTML:en för skärmläsare, sökmotorer och när kartan inte laddas.
 */
export default function Map({
  markers,
  height = 'clamp(380px, 60vh, 520px)',
  pinVariant = 'circle',
  tone = 'ink',
  ariaLabel = 'Interaktiv karta över Mallorca',
  ctaLabel = 'Utforska',
  listLabel,
}: Props) {
  const elRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<Api | null>(null)
  const pendingRef = useRef<number | null>(null)
  const [active, setActive] = useState<number | null>(null)
  const numbered = listLabel !== false

  useEffect(() => {
    const el = elRef.current
    if (!el || markers.length === 0) return

    let cancelled = false
    let map: import('leaflet').Map | undefined
    const listeners = new AbortController()

    const init = async () => {
      // Leaflets CSS laddas tillsammans med biblioteket (inte som renderingsblockerande CSS i
      // sidans <head>) – kartan ligger alltid långt ned och initieras först efter hydrering.
      const [L] = await Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')])
      if (cancelled || !elRef.current) return
      const Lm = (L as unknown as { default?: typeof L } & typeof L).default || L
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // zoomSnap 0.5 ger en tätare passning av ön i fitBounds än hela zoomsteg.
      const m0 = Lm.map(el, {
        scrollWheelZoom: false,
        zoomSnap: 0.5,
        zoomControl: false,
        zoomAnimation: !reduceMotion,
        fadeAnimation: !reduceMotion,
        markerZoomAnimation: !reduceMotion,
      })
      map = m0
      Lm.control.zoom({ zoomInTitle: 'Zooma in', zoomOutTitle: 'Zooma ut' }).addTo(m0)
      Lm.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        className: styles.tiles,
      }).addTo(m0)

      // Hela ön (alla markörer) i bild – även på smal mobilskärm. Vyn sätts före markörerna,
      // annars skapar Leaflet deras element först när kartan är klar (getElement() vore tomt).
      const bounds = Lm.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number]))
      m0.fitBounds(bounds, { padding: [28, 28], maxZoom: 12, animate: false })

      const size = pinVariant === 'flag' ? [28, 34] : numbered ? [26, 26] : [24, 24]
      const anchor = pinVariant === 'flag' ? [4, 33] : [size[0] / 2, size[1] / 2]

      const placed = markers.map((m, i) => {
        const n = numbered ? i + 1 : null
        const isMain = !!m.main && pinVariant !== 'flag'
        const s = isMain ? [32, 32] : size
        const a = isMain ? [16, 16] : anchor
        const icon = Lm.divIcon({
          className: `${styles.marker}${isMain ? ` ${styles.main}` : ''}`,
          html: markerHtml(m, n, pinVariant),
          iconSize: s as [number, number],
          iconAnchor: a as [number, number],
          popupAnchor: [pinVariant === 'flag' ? 10 : 0, pinVariant === 'flag' ? -30 : -s[1] / 2],
        })
        const marker = Lm.marker([m.lat, m.lng], { icon, keyboard: true, title: m.name, riseOnHover: true })
          .addTo(m0)
          .bindPopup(popupHtml(m, ctaLabel), { closeButton: true, autoPanPadding: [16, 16] })
        const elm = marker.getElement()
        elm?.setAttribute('aria-label', n === null ? m.name : `${n}. ${m.name}`)
        elm?.setAttribute('aria-haspopup', 'dialog')
        elm?.style.setProperty('--pin', TONE[tone])
        marker.on('popupopen', () => {
          setActive(i)
          elm?.setAttribute('aria-expanded', 'true')
        })
        marker.on('popupclose', () => {
          setActive((cur) => (cur === i ? null : cur))
          elm?.setAttribute('aria-expanded', 'false')
        })
        elm?.setAttribute('aria-expanded', 'false')
        return { marker, elm, main: !!m.main, i }
      })

      // Etiketter: huvudorter först, sedan i listordning. En etikett som krockar med en annan
      // etikett eller nål flyttas till vänster sida, och döljs om den inte heller får plats där.
      const prio = [...placed].sort((a, b) => Number(b.main) - Number(a.main) || a.i - b.i)
      const layoutLabels = () => {
        if (!numbered) return
        const box = el.getBoundingClientRect()
        const pins = placed.map((p) => p.elm?.firstElementChild?.getBoundingClientRect())
        const taken: DOMRect[] = []
        const done = new Set<number>()
        for (const p of prio) {
          const label = p.elm?.querySelector<HTMLElement>(`.${styles.label}`)
          if (!label) continue
          label.classList.remove(styles.labelLeft, styles.labelHidden)
          done.add(p.i)
          // En nål som delvis ligger under en viktigare nål får ingen etikett – den skulle se ut
          // att höra till fel nål. Namnet finns i popupen, listan och vid hovring/fokus.
          const own = pins[p.i]
          if (own && pins.some((pr, j) => j !== p.i && done.has(j) && pr && overlaps(own, pr))) {
            label.classList.add(styles.labelHidden)
            continue
          }
          const fits = () => {
            const r = label.getBoundingClientRect()
            const inside = r.left >= box.left + 2 && r.right <= box.right - 2 && r.top >= box.top && r.bottom <= box.bottom
            const free = inside &&
              !taken.some((t) => overlaps(r, t)) &&
              !pins.some((pr, j) => j !== p.i && pr && overlaps(r, pr))
            return free ? r : null
          }
          let r = fits()
          if (!r) {
            label.classList.add(styles.labelLeft)
            r = fits()
          }
          if (r) taken.push(r)
          else label.classList.add(styles.labelHidden)
        }
      }
      m0.on('moveend resize', layoutLabels)

      // Tangentbord: blanksteg öppnar som Enter (role=button), Esc stänger och lämnar fokus på nålen.
      let opener: HTMLElement | null = null
      el.addEventListener('keydown', (e) => {
        const hit = placed.find((p) => p.elm === e.target)
        if (hit && (e.key === ' ' || e.key === 'Enter')) {
          e.preventDefault()
          e.stopPropagation()
          opener = hit.elm ?? null
          hit.marker.openPopup()
          return
        }
        if (e.key === 'Escape') {
          const open = placed.find((p) => p.marker.isPopupOpen())
          if (open) {
            e.preventDefault()
            m0.closePopup()
            ;(opener ?? open.elm)?.focus()
            opener = null
          }
        }
      }, { signal: listeners.signal })
      // Klick med mus/tryck ska inte flytta fokus in i popupen.
      el.addEventListener('pointerdown', () => { opener = null }, { signal: listeners.signal })
      m0.on('popupopen', (e) => {
        const pop = e.popup.getElement()
        const close = pop?.querySelector<HTMLElement>('.leaflet-popup-close-button')
        close?.setAttribute('aria-label', 'Stäng')
        close?.setAttribute('title', 'Stäng')
        pop?.setAttribute('role', 'dialog')
        const name = pop?.querySelector(`.${styles.popupName}`)?.textContent
        if (name) pop?.setAttribute('aria-label', name)
        if (opener) (pop?.querySelector<HTMLElement>(`.${styles.popupLink}`) ?? close)?.focus()
      })

      apiRef.current = {
        open: (i) => {
          const p = placed[i]
          if (!p) return
          opener = p.elm ?? null
          m0.setView(p.marker.getLatLng(), Math.max(m0.getZoom(), 10), { animate: !reduceMotion })
          p.elm?.focus({ preventScroll: true })
          el.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' })
          p.marker.openPopup()
        },
      }

      layoutLabels()

      if (pendingRef.current !== null) {
        const i = pendingRef.current
        pendingRef.current = null
        apiRef.current.open(i)
      }
    }

    if (!('IntersectionObserver' in window)) {
      void init()
      return () => { cancelled = true; listeners.abort(); apiRef.current = null; map?.remove() }
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
      listeners.abort()
      apiRef.current = null
      observer.disconnect()
      map?.remove()
    }
  }, [markers, pinVariant, ctaLabel, numbered, tone])

  const showOnMap = (i: number) => {
    if (apiRef.current) apiRef.current.open(i)
    else {
      // Kartan är inte initierad än: scrolla dit (IntersectionObserver startar den) och öppna sedan.
      pendingRef.current = i
      elRef.current?.scrollIntoView({ block: 'nearest' })
    }
  }

  return (
    <div style={{ '--pin': TONE[tone] } as CSSProperties}>
      <div
        ref={elRef}
        role="region"
        aria-label={ariaLabel}
        className={styles.map}
        style={{ '--map-height': height } as CSSProperties}
      />
      {numbered && (
        <details className={styles.details} open>
          <summary className={styles.summary}>
            {listLabel ?? `Visa alla ${markers.length} platser som lista`}
          </summary>
          <ol className={styles.list}>
            {markers.map((m, i) => (
              <li
                key={`${m.name}-${m.lat}-${m.lng}`}
                className={`${styles.item}${active === i ? ` ${styles.itemActive}` : ''}`}
              >
                <button
                  type="button"
                  className={styles.num}
                  onClick={() => showOnMap(i)}
                  aria-label={`Visa ${m.name} på kartan`}
                >
                  {i + 1}
                </button>
                <span>
                  {m.href ? (
                    <Link href={m.href} className={`${styles.name} ${styles.link}`}>
                      {m.name}
                    </Link>
                  ) : (
                    <span className={styles.name}>{m.name}</span>
                  )}
                  {m.desc && <span className={styles.desc}> · {m.desc}</span>}
                </span>
              </li>
            ))}
          </ol>
        </details>
      )}
    </div>
  )
}
