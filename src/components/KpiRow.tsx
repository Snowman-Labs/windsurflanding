import React from 'react'

type KPI = { label: string; value: string }

type Props = {
  items: KPI[]
}

const KpiRow: React.FC<Props> = ({ items }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem', margin: '1.5rem 0' }}>
      {items.map((k, i) => (
        <div
          key={i}
          style={{
            textAlign: 'center', padding: '1.1rem 1.25rem', borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)'
          }}
        >
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-blue)' }}>{k.value}</div>
          <div style={{ color: 'var(--text-gray)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.6 }}>{k.label}</div>
        </div>
      ))}
    </div>
  )
}

export default KpiRow
