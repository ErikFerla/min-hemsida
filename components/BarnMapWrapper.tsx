'use client'
import dynamic from 'next/dynamic'

const BarnMap = dynamic(() => import('@/components/BarnMap'), { ssr: false })

export default function BarnMapWrapper() {
  return <BarnMap />
}
