'use client'
import { useEffect, useState } from 'react'

export default function MobileSection({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section style={{
      ...style,
      paddingLeft: isMobile ? '16px' : '60px',
      paddingRight: isMobile ? '16px' : '60px',
    }}>
      {children}
    </section>
  )
}
