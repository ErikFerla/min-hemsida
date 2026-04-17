'use client'
import InteractiveMap from '@/components/InteractiveMap'
import { cities } from '@/data/cities'

export default function MallorcaMap() {
  return (
    <InteractiveMap
      markers={cities}
      pinVariant="circle"
      height="clamp(350px, 55vh, 500px)"
      ariaLabel="Karta över städer och byar på Mallorca"
      ctaLabel="Utforska"
    />
  )
}
