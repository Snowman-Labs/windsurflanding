import React, { useState } from 'react'

type QA = { q: string; a: React.ReactNode }

type Props = {
  items: QA[]
}

const Row: React.FC<QA> = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', background: 'transparent', border: 'none', padding: '1.1rem 0',
          textAlign: 'left', color: 'var(--text-white)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.9rem'
        }}
      >
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 28, height: 28, borderRadius: 999,
          background: 'rgba(14,165,233,0.18)', color: 'var(--accent-blue)', fontWeight: 900, fontSize: 14
        }}>{open ? '-' : '+'}</span>
        <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: 0.1 }}>{q}</span>
      </button>
      <div style={{ maxHeight: open ? 700 : 0, overflow: 'hidden', transition: 'max-height .3s ease' }}>
        <div style={{ color: 'var(--text-gray)', padding: '0 0 1.1rem 2.4rem', lineHeight: 1.8, fontSize: '1.0rem' }}>
          {a}
        </div>
      </div>
    </div>
  )
}

const FAQAccordion: React.FC<Props> = ({ items }) => {
  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
      {items.map((qa, i) => (
        <Row key={i} {...qa} />
      ))}
    </div>
  )
}

export default FAQAccordion
