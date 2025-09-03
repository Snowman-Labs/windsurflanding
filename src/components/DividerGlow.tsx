import React from 'react'

const DividerGlow: React.FC<{ height?: number }> = ({ height = 80 }) => {
  return (
    <div style={{ position: 'relative', height, margin: '2rem 0' }}>
      <div
        style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: height/2 - 2,
          width: '70%', height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.6), transparent)'
        }}
      />
      <div
        style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: height/2 - 30,
          width: 220, height: 60, filter: 'blur(40px)', opacity: 0.6,
          background: 'radial-gradient(circle, rgba(14,165,233,0.35) 0%, rgba(14,165,233,0) 70%)'
        }}
      />
    </div>
  )
}

export default DividerGlow
