import { motion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const stats = [
  { value: 'GTA', label: 'Based in the Greater Toronto Area' },
  { value: '2', label: 'Passionate founders' },
  { value: '2', label: 'Core pillars: Education and Health' },
  { value: '∞', label: 'Children who deserve their First Chapter' },
]

export default function Impact() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section
      id="impact"
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, #e8f4e5, #fdf0e6, #e8f4fa)',
        padding: '80px 2rem',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}
        >
          <div style={{ width: '28px', height: '2px', background: '#6a9e62', borderRadius: '2px' }} />
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6a9e62', fontWeight: 600 }}>
            Our Impact
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#2c3e2d', marginBottom: '16px', lineHeight: 1.2 }}
        >
          Small steps. Enormous ripples.
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          style={{ fontSize: '17px', color: '#5a6b5c', lineHeight: 1.75, maxWidth: '580px', marginBottom: '3rem' }}
        >
          Every action we take, no matter how small, creates ripples that reach further than we imagine.
          The First Chapter is just getting started — and the potential for impact is boundless.
        </motion.p>

        {/* Stat cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: [0.05, 0.15, 0.25, 0.35][i] }}
              style={{
                background: 'rgba(255, 255, 255, 0.72)',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                padding: '1.75rem 1.5rem',
                textAlign: 'center',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ fontSize: '40px', fontWeight: 600, color: '#2c3e2d', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '13px', color: '#5a6b5c', marginTop: '8px', lineHeight: 1.4 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
