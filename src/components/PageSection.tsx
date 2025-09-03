import React from 'react'

type Props = React.PropsWithChildren<{
  id?: string
  title?: string
  subtitle?: string
  dark?: boolean
  maxWidth?: number
  center?: boolean
  paddingY?: string
}>

const PageSection: React.FC<Props> = ({ id, title, subtitle, dark, maxWidth = 1100, center = false, paddingY = '4rem', children }) => {
  return (
    <section id={id} className={`section-modern ${dark ? 'section-dark' : ''}`} style={{ padding: paddingY }}>
      <div className="container-modern">
        <div style={{ maxWidth, margin: '0 auto', textAlign: center ? 'center' : 'left' }}>
          {title && (
            <h2 style={{ fontSize:'clamp(2rem, 5vw, 3rem)', fontWeight:900, marginBottom:'1rem', color:'var(--text-white)' }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p style={{ color:'var(--text-gray)', fontSize:'1.1rem', marginBottom:'2rem', lineHeight:1.6 }}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}

export default PageSection
