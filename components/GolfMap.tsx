'use client'
import InteractiveMap, { type MapMarker } from '@/components/InteractiveMap'
import { golfbanor } from '@/data/golf-courses'

const markers: MapMarker[] = golfbanor.map((b) => ({
  name: b.namn,
  lat: b.lat,
  lng: b.lng,
  href: `/aktiviteter/golf#${b.slug}`,
  desc: b.plats,
  meta: b.oneliner,
}))

export default function GolfMap() {
  return (
    <InteractiveMap
      markers={markers}
      pinVariant="flag"
      height="clamp(380px, 60vh, 560px)"
      ariaLabel="Karta över alla 22 golfbanor på Mallorca"
      ctaLabel="Se banan"
    />
  )
}
