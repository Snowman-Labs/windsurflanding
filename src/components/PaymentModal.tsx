import React, { useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  price: string
  compareAt?: string
}

const PaymentModal: React.FC<Props> = ({ isOpen, onClose, price, compareAt }) => {
  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'stripe' | null>(null)
  const [showPixDetails, setShowPixDetails] = useState(false)

  if (!isOpen) return null

  const handlePixSelect = () => {
    setSelectedMethod('pix')
    setShowPixDetails(true)
  }

  const handleStripeSelect = () => {
    setSelectedMethod('stripe')
    window.open('https://buy.stripe.com/test_aFadR1aikebKaDM2FHbV601', '_blank')
    onClose()
  }

  const copyPixKey = () => {
    navigator.clipboard.writeText('contato@windsurf.com.br')
    alert('Chave PIX copiada!')
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: 'var(--bg-dark)', borderRadius: 20, padding: '2rem', maxWidth: 500, width: '100%',
        border: '1px solid rgba(255,255,255,0.1)', position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem', background: 'transparent',
            border: 'none', color: 'var(--text-gray)', fontSize: '1.5rem', cursor: 'pointer'
          }}
        >
          ×
        </button>

        {!showPixDetails ? (
          <>
            <h3 style={{ color: 'var(--text-white)', fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', textAlign: 'center' }}>
              Como deseja pagar?
            </h3>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              {compareAt && (
                <div style={{ color: 'var(--text-gray)', textDecoration: 'line-through', fontSize: '1rem' }}>{compareAt}</div>
              )}
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-blue)' }}>{price}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                onClick={handlePixSelect}
                style={{
                  padding: '1rem 1.5rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(14,165,233,0.1)', color: 'var(--text-white)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', fontWeight: 600
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>💳</span>
                <div style={{ textAlign: 'left' }}>
                  <div>PIX - Pagamento à vista</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>Instantâneo via chave PIX</div>
                </div>
              </button>

              <button
                onClick={handleStripeSelect}
                style={{
                  padding: '1rem 1.5rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)', color: 'var(--text-white)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', fontWeight: 600
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>💳</span>
                <div style={{ textAlign: 'left' }}>
                  <div>Cartão de Crédito</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>Parcelado em até 3x sem juros</div>
                </div>
              </button>

              <a
                href="#contato"
                onClick={onClose}
                style={{
                  padding: '1rem 1.5rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)', color: 'var(--text-white)', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', fontWeight: 600
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🧾</span>
                <div style={{ textAlign: 'left' }}>
                  <div>Boleto Bancário</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>Fale conosco para gerar boleto</div>
                </div>
              </a>
            </div>
          </>
        ) : (
          <>
            <h3 style={{ color: 'var(--text-white)', fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', textAlign: 'center' }}>
              Pagamento via PIX
            </h3>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>{price}</div>
              <div style={{ color: 'var(--text-gray)' }}>Valor único para até 20 desenvolvedores</div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem'
            }}>
              <div style={{ color: 'var(--text-white)', fontWeight: 600, marginBottom: '0.5rem' }}>Chave PIX:</div>
              <div style={{
                background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: 8,
                color: 'var(--accent-blue)', fontFamily: 'monospace', fontSize: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <span>contato@windsurf.com.br</span>
                <button
                  onClick={copyPixKey}
                  style={{
                    background: 'var(--accent-blue)', color: 'white', border: 'none',
                    padding: '0.25rem 0.5rem', borderRadius: 4, cursor: 'pointer', fontSize: '0.8rem'
                  }}
                >
                  Copiar
                </button>
              </div>
            </div>

            <div style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              <p style={{ margin: '0 0 0.5rem' }}>📱 <strong>Como pagar:</strong></p>
              <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
                <li>Abra seu app do banco</li>
                <li>Escolha a opção PIX</li>
                <li>Cole a chave PIX acima</li>
                <li>Confirme o valor de {price}</li>
                <li>Finalize o pagamento</li>
              </ol>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setShowPixDetails(false)}
                style={{
                  flex: 1, padding: '0.75rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)',
                  background: 'transparent', color: 'var(--text-gray)', cursor: 'pointer'
                }}
              >
                Voltar
              </button>
              <button
                onClick={onClose}
                className="cta-primary-modern"
                style={{ flex: 1, padding: '0.75rem' }}
              >
                Fechar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PaymentModal
