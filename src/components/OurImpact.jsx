import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const DURATION = 2800

function AnimatedNumber({ target, prefix = '', suffix = '', inView }) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    if (!inView) {
      cancelAnimationFrame(rafRef.current)
      setValue(0)
      startRef.current = null
      return
    }

    startRef.current = null

    function tick(ts) {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, target])

  return (
    <span style={styles.number}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  )
}

const sectionVariant = {
  hidden: { opacity: 0, y: 120, scale: 0.96, transition: { duration: 0.3, ease: 'easeIn' } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}

export default function OurImpact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-200px' })

  return (
    <section ref={ref} style={styles.section}>
      <div className="container">
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
          style={styles.inner}
        >
          <span className="section-tag">Our Impact</span>
          <h2 className="section-h2">Making a Real <em>Difference</em></h2>

          <div style={styles.countersRow}>
            <div style={styles.counterItem}>
              <span style={styles.counterLabel}>Total Raised</span>
              <AnimatedNumber target={947} prefix="$" inView={inView} />
            </div>

            <div style={styles.counterDivider} />

            <div style={styles.counterItem}>
              <span style={styles.counterLabel}>Kits Donated</span>
              <AnimatedNumber target={70} suffix="+" inView={inView} />
            </div>

            <div style={styles.counterDivider} />

            <div style={styles.counterItem}>
              <span style={styles.counterLabel}>Families Helped</span>
              <AnimatedNumber target={300} suffix="+" inView={inView} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '88px 0',
    background: '#fff',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 48,
  },
  countersRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
    width: '100%',
  },
  counterItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  counterLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.35)',
  },
  counterDivider: {
    width: 1,
    height: 80,
    background: 'rgba(0,0,0,0.08)',
    flexShrink: 0,
  },
  number: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    lineHeight: 1,
    letterSpacing: '-0.03em',
    color: '#1A1A1A',
    fontVariantNumeric: 'tabular-nums',
  },

}
