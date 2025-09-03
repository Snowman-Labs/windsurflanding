import React from 'react'

type Props = {
  items: Array<string | React.ReactNode>
  columns?: number
  center?: boolean
}

const CheckGrid: React.FC<Props> = ({ items, columns = 3, center = false }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: center ? 'center' : 'flex-start',
        gap: '1.25rem',
        width: '100%'
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '0.75rem',
            textAlign: center ? 'center' : 'left',
            justifyContent: center ? 'center' : 'flex-start',
            width: center ? 'auto' : '100%',
            maxWidth: center ? 400 : 'none'
          }}
        >
          <span style={{ color: 'var(--accent-blue)', fontSize: '1rem', lineHeight: 1, marginTop: 3, flexShrink: 0 }}>✔</span>
          <div style={{ color: 'var(--text-gray)', lineHeight: 1.6 }}>{item}</div>
        </div>
      ))}
    </div>
  )
}

export default CheckGrid
