'use client'
import dynamic from 'next/dynamic'

const MallorcaMap = dynamic(() => import('@/components/MallorcaMap'), { ssr: false })

export default function MallorcaMapWrapper() {
  return <MallorcaMap />
}
