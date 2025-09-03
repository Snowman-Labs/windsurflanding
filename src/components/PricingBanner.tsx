import React, { useState } from 'react'
import PaymentModal from './PaymentModal'

type Props = {
  price: string
  compareAt?: string
  bullets?: string[]
}

const PricingBanner: React.FC<Props> = ({ price, compareAt, bullets = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        style={{
          position: 'relative',
          borderRadius: 20,
          padding: '2rem',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(14,165,233,0.03))',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 60px rgba(14,165,233,0.15)'
        }}
      >
        <div style={{ position: 'absolute', inset: -100, background: 'radial-gradient(800px 300px at 70% 10%, rgba(14,165,233,0.25), transparent)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--text-white)', fontWeight: 900, fontSize: '2rem' }}>Investimento</div>
          <div>
            {compareAt && (
              <div style={{ color: 'var(--text-gray)', textDecoration: 'line-through', marginBottom: 4, fontSize: '1.25rem' }}>{compareAt}</div>
            )}
            <div style={{ fontSize: '3.2rem', fontWeight: 900, color: 'var(--accent-blue)' }}>{price}</div>
          </div>
          {bullets.length > 0 && (
            <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.8, color: 'var(--text-gray)', textAlign: 'left' }}>
              {bullets.map((b, i) => (<li key={i}>{b}</li>))}
            </ul>
          )}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => setIsModalOpen(true)} className="cta-primary-modern" data-event="add_to_cart" data-section="treinamento" style={{ padding: '0.9rem 1.5rem', border: 'none', cursor: 'pointer' }}>Comprar agora</button>
            <a href="#contato" className="cta-secondary-modern" data-event="contact_sales" data-section="treinamento" style={{ padding: '0.9rem 1.5rem' }}>Falar com especialista</a>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        price={price}
        compareAt={compareAt}
      />
    </>
  )
}

export default PricingBanner
