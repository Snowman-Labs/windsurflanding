import React from 'react'

type Step = { title: string; items: string[]; icon?: React.ReactNode }

type Props = {
  steps: Step[]
}

const Timeline: React.FC<Props> = ({ steps }) => {
  return (
    <div style={{ position: 'relative' }}>
      {/* vertical line */}
      <div
        aria-hidden
        style={{
          position: 'absolute', left: 16, top: 0, bottom: 0, width: 2,
          background: 'linear-gradient(180deg, rgba(14,165,233,0), rgba(14,165,233,.5), rgba(14,165,233,0))'
        }}
      />
      <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {steps.map((s, i) => (
          <li key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: '1rem', marginBottom: '1.5rem', alignItems: 'start' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ width: 32, height: 32, borderRadius: 999, background: 'rgba(14,165,233,0.2)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                {(i + 1).toString().padStart(2, '0')}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 900, color: 'var(--text-white)', marginBottom: 8, fontSize: '1.2rem' }}>{s.title}</div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-gray)', lineHeight: 1.8 }}>
                {s.items.map((it, k) => (
                  <li key={k}>{it}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Timeline
