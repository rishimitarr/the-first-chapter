import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartHandshake, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const slides = [
  {
    image: '/hero-slide-1.jpg',
    headline: 'Every child deserves their',
    accent: 'first chapter.',
    credit: 'Ashton Bingham',
  },
  {
    image: '/hero-slide-2.jpg',
    headline: 'Together we build',
    accent: 'brighter futures.',
    credit: 'Vitolda Klein',
  },
  {
    image: '/hero-slide-3.jpg',
    headline: 'Every smile starts with',
    accent: 'opportunity.',
    credit: 'Eye For Ebony',
  },
  {
    image: '/hero-slide-4.jpg',
    headline: 'No child left',
    accent: 'without support.',
    credit: 'Izzy Park',
  },
  {
    image: '/hero-slide-5.jpg',
    headline: "Joy is every child's",
    accent: 'birthright.',
    credit: 'Jose Ibarra',
  },
  {
    image: '/hero-slide-6.jpg',
    headline: 'Empowering communities,',
    accent: 'one child at a time.',
    credit: 'Vitaly Gariev',
  },
]

const MotionLink = motion.create(Link)

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
      animate={{ width: hovered ? 230 : 52 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.96 }}
      style={styles.missionBtn}
    >
      <motion.span
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={styles.missionGlow}
      />
      <motion.span
        animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.4 : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={styles.missionIcon}
      >
        <HeartHandshake size={24} strokeWidth={2} color="#1A3A6B" />
      </motion.span>
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
  const triggered = true
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  )
  const intervalRef = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const startAutoplay = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % slides.length)
    }, 6000)
  }, [])

  useEffect(() => {
    startAutoplay()
    return () => clearInterval(intervalRef.current)
  }, [startAutoplay])

  const go = useCallback((dir) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + slides.length) % slides.length)
    startAutoplay()
  }, [startAutoplay])

  const slide = slides[current]

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 40 },
    animate: triggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.7, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section style={styles.hero}>
      {/* Background crossfade */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={slide.image}
          src={slide.image}
          alt=""
          aria-hidden="true"
          style={styles.bg}
          custom={direction}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      <div style={styles.overlay} />

      {/* Content */}
      <div style={styles.content} className="hero-content">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.h1
            key={current}
            style={styles.headline}
            className="hero-headline-full"
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {slide.headline}{' '}
            <span style={{ whiteSpace: 'nowrap' }}>{slide.accent}</span>
          </motion.h1>
        </AnimatePresence>

        <motion.div style={styles.btns} className="hero-btns" {...fadeUp(500)}>
          <MissionButton href="#join" isMobile={isMobile} />
          <MotionLink
            to="/about"
            className="btn-glass"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Learn More
          </MotionLink>
        </motion.div>
      </div>

      {/* Photo credit */}
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          style={styles.credit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          Photo: {slide.credit} / Unsplash
        </motion.p>
      </AnimatePresence>

      {/* Arrow controls */}
      <button style={{ ...styles.arrow, left: 24 }} onClick={() => go(-1)} aria-label="Previous slide">
        <ChevronLeft size={28} strokeWidth={2.5} color="#fff" />
      </button>
      <button style={{ ...styles.arrow, right: 24 }} onClick={() => go(1)} aria-label="Next slide">
        <ChevronRight size={28} strokeWidth={2.5} color="#fff" />
      </button>

      {/* Dot indicators */}
      <div style={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            style={{
              ...styles.dot,
              background: i === current ? '#fff' : 'rgba(255,255,255,0.4)',
              width: i === current ? 24 : 8,
            }}
            onClick={() => { go(i > current ? 1 : -1); setCurrent(i) }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

const bgVariants = {
  enter: (dir) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir * -60 }),
}

const textVariants = {
  enter: (dir) => ({ opacity: 0, y: dir > 0 ? 30 : -30 }),
  center: { opacity: 1, y: 0 },
  exit: (dir) => ({ opacity: 0, y: dir > 0 ? -30 : 30 }),
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
    background: 'linear-gradient(135deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.30) 55%, rgba(0,0,0,0.42) 100%)',
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
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(3.2rem, 7vw, 6.5rem)',
    lineHeight: 1.06,
    color: '#ffffff',
    margin: 0,
    letterSpacing: '-0.03em',
    textShadow: '0 2px 32px rgba(0,0,0,0.4)',
  },
  btns: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 3,
    background: 'rgba(0,0,0,0.28)',
    border: '1.5px solid rgba(255,255,255,0.28)',
    borderRadius: 4,
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backdropFilter: 'blur(6px)',
    transition: 'background 0.2s, border-color 0.2s',
  },
  credit: {
    position: 'absolute',
    bottom: 14,
    right: 20,
    zIndex: 3,
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.6rem',
    color: 'rgba(255,255,255,0.38)',
    margin: 0,
    letterSpacing: '0.02em',
  },
  dots: {
    position: 'absolute',
    bottom: 32,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 3,
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 100,
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'width 0.3s ease, background 0.3s ease',
  },
  missionBtn: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    width: 52,
    borderRadius: 4,
    overflow: 'hidden',
    background: '#F3F7FC',
    cursor: 'pointer',
    textDecoration: 'none',
    boxShadow: '0 4px 20px rgba(0,0,0,0.24)',
    flexShrink: 0,
  },
  missionGlow: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(26,58,107,0.12) 0%, rgba(0,153,214,0.08) 100%)',
    borderRadius: 4,
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
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    whiteSpace: 'nowrap',
    letterSpacing: '-0.01em',
  },
}
