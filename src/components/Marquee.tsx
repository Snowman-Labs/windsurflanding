import React, { useEffect, useRef } from 'react'

type Props = {
  items: Array<string | React.ReactNode>
  speed?: number // px per second
}

const Marquee: React.FC<Props> = ({ items, speed = 60 }) => {
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const totalWidth = el.scrollWidth / 2
    const duration = totalWidth / speed
    el.style.setProperty('--marquee-duration', `${duration}s`)
  }, [items, speed])

  return (
    <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '2rem',
          whiteSpace: 'nowrap',
          animation: 'marquee var(--marquee-duration) linear infinite',
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} style={{ color: 'var(--text-gray)', fontWeight: 600, letterSpacing: 0.3 }}>
            {item}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

export default Marquee
