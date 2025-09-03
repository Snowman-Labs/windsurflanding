import React from 'react'

type Props = React.PropsWithChildren<{
  title: string
  side?: 'left' | 'right'
  image?: React.ReactNode
  bullets?: string[]
}>

const TwoColFeature: React.FC<Props> = ({ title, side = 'left', image, bullets, children }) => {
  const content = (
    <div>
      <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-white)' }}>{title}</h3>
      {children}
      {bullets && (
        <ul style={{ color: 'var(--text-gray)', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
          {bullets.map((b, i) => (<li key={i}>{b}</li>))}
        </ul>
      )}
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '2rem', alignItems: 'center' }}>
      {side === 'left' ? (
        <>
          <div style={{ padding: '1.5rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>{content}</div>
          <div style={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>{image}</div>
        </>
      ) : (
        <>
          <div style={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>{image}</div>
          <div style={{ padding: '1.5rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>{content}</div>
        </>
      )}
    </div>
  )
}

export default TwoColFeature
