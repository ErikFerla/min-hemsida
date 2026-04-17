'use client'
import dynamic from 'next/dynamic'

const GolfMap = dynamic(() => import('@/components/GolfMap'), { ssr: false })

export default function GolfMapWrapper() {
  return <GolfMap />
}
