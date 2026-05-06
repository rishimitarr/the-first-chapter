import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HeartHandshake } from 'lucide-react'

function MissionButton({ href, isMobile }) {
  const [hovered, setHovered] = useState(false)

  if (isMobile) {
    return (
      <a href={href} style={{ ...styles.missionBtn, width: 'auto', padding: '0 28px', textDecoration: 'none' }}>
        <span style={{ ...styles.missionText, position: 'relative' }}>Support Our Mission</span>
      </a>
    )
  }

  return (
    <motion.a
      href={href}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ width: hovered ? 234 : 60 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.96 }}
      style={styles.missionBtn}
    >
      {/* Glow layer */}
      <motion.span
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={styles.missionGlow}
      />

      {/* Icon — visible when collapsed */}
      <motion.span
        animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.4 : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={styles.missionIcon}
      >
        <HeartHandshake size={24} strokeWidth={2} color="#6B2D8B" />
      </motion.span>

      {/* Text — visible when expanded */}
      <motion.span
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.75 }}
        transition={{ duration: 0.22, delay: hovered ? 0.14 : 0, ease: 'easeOut' }}
        style={styles.missionText}
      >
        Support Our Mission
      </motion.span>
    </motion.a>
  )
}

export default function Hero() {
  const [triggered, setTriggered] = useState(false)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  )

  useEffect(() => {
    setTriggered(true)
    const check = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 40 },
    animate: triggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.7, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section style={styles.hero}>
      <img src="/hero-bg.jpg" alt="" aria-hidden="true" style={styles.bg} />
      <div style={styles.overlay} />

      {/* Content — vertically centered, left-aligned */}
      <div style={styles.content} className="hero-content">
        <motion.h1 style={styles.headline} className="hero-headline-full" {...fadeUp(200)}>
          Every child deserves their{' '}
          <span style={styles.em}>
            <span style={{ whiteSpace: 'nowrap' }}>first chapter.</span>
          </span>
        </motion.h1>

        <motion.div style={styles.btns} className="hero-btns" {...fadeUp(500)}>
          <MissionButton href="#join" isMobile={isMobile} />
          <motion.a
            href="#mission"
            className="btn-glass"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

const styles = {
  hero: {
    position: 'relative',
    width: '100%',
    height: '100dvh',
    minHeight: 600,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 30%',
    display: 'block',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.38) 100%)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    padding: '0 60px',
    display: 'flex',
    flexDirection: 'column',
    gap: 36,
    maxWidth: 820,
  },
  headline: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
    lineHeight: 1.08,
    color: '#ffffff',
    margin: 0,
    letterSpacing: '-0.02em',
    textShadow: '0 2px 32px rgba(0,0,0,0.4)',
  },
  em: {
    color: '#FBB040',
    fontStyle: 'normal',
  },
  btns: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  missionBtn: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 100,
    overflow: 'hidden',
    background: '#ffffff',
    cursor: 'pointer',
    textDecoration: 'none',
    boxShadow: '0 4px 24px rgba(0,0,0,0.28)',
    flexShrink: 0,
  },
  missionGlow: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(107,45,139,0.12) 0%, rgba(0,153,214,0.08) 100%)',
    borderRadius: 100,
  },
  missionIcon: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  missionText: {
    position: 'absolute',
    color: '#1A3A6B',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    whiteSpace: 'nowrap',
    letterSpacing: '-0.01em',
  },
}
