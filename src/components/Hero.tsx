import React from 'react'

type Props = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  ctas?: React.ReactNode
}

const Hero: React.FC<Props> = ({ title, subtitle, ctas }) => {
  return (
    <div className="hero-dark" style={{ minHeight: '60vh' }}>
      <div className="hero-content">
        <div className="container-modern">
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--text-white)' }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ fontSize: '1.2rem', color: 'var(--text-gray)', maxWidth: 820, margin: '0 auto 2rem', lineHeight: 1.6 }}>
                {subtitle}
              </p>
            )}
            {ctas}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
