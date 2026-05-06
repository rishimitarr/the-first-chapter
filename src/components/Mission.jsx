import { useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const mosaicImages = [
  { src: '/mission-children.jpg',                    alt: 'Children learning', tall: true },
  { src: '/cheng-lin-XHVDuroLbrs-unsplash.jpg',      alt: 'Community' },
  { src: '/jason-hu-oumTYrBrkoA-unsplash.jpg',       alt: 'Education' },
  { src: '/vitaly-gariev-axUZuU0nBNI-unsplash.jpg',  alt: 'Children' },
  { src: '/vitaly-gariev-lGGuf8LSxa4-unsplash.jpg',  alt: 'Impact' },
]

function MosaicCell({ img, index, tall }) {
  return (
    <motion.div
      style={{
        ...styles.mosaicCell,
        gridRow: tall ? 'span 2' : 'span 1',
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      whileHover={{ scale: 1.04, zIndex: 2, transition: { type: 'spring', stiffness: 300 } }}
    >
      <img src={img.src} alt={img.alt} style={styles.mosaicImg} />
    </motion.div>
  )
}

const cards = [
  {
    color: '#6B2D8B',
    title: 'Education & Health',
    body: 'We champion access to quality learning resources by building and distributing educational kits, funding aligned charitable organizations, and supplying the tools children need to thrive, while raising funds for mental wellness and physical health so every child grows up safe, supported, and ready to learn.',
  },
  {
    color: '#0099D6',
    title: 'Community Impact',
    body: 'Rooted right here in the GTA, we work alongside local organizations, families, and volunteers to create lasting, meaningful change in the neighbourhoods where children live and grow.',
  },
  {
    color: '#F7941D',
    title: 'Raising Awareness',
    body: "We advocate loudly for children's rights and needs, organizing events and campaigns that bring communities together around what matters most: giving every child a fair and equal chance.",
  },
]

function Card({ card, index }) {
  const controls = useAnimation()
  const hoverCountRef = useRef(0)
  const [hovered, setHovered] = useState(false)

  const handleHoverStart = () => {
    hoverCountRef.current += 1
    // odd hover = tilt left, even hover = tilt right
    const rotate = hoverCountRef.current % 2 === 1 ? -1.8 : 1.8
    setHovered(true)
    controls.start({
      y: -12,
      rotate,
      scale: 1.03,
      boxShadow: `0 20px 44px ${card.color}44`,
      transition: { type: 'spring', stiffness: 280, damping: 18 },
    })
  }

  const handleHoverEnd = () => {
    setHovered(false)
    controls.start({
      y: 0,
      rotate: 0,
      scale: 1,
      boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
      transition: { type: 'spring', stiffness: 280, damping: 18 },
    })
  }

  return (
    <motion.div
      style={styles.block}
      initial={{ opacity: 0, y: 70, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 110, damping: 14, delay: index * 0.18 }}
      animate={controls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      {/* Colored header strip — no letter, just the color + shine */}
      <div style={{ ...styles.strip, background: card.color }}>
        <motion.div
          style={styles.shine}
          animate={hovered ? { x: '130%', opacity: 0.22 } : { x: '-40%', opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </div>

      {/* Body */}
      <div style={styles.body}>
        <h3 style={{ ...styles.cardTitle, color: card.color }}>{card.title}</h3>
        <p style={styles.cardBody}>{card.body}</p>
      </div>
    </motion.div>
  )
}

export default function Mission() {
  return (
    <section id="mission" style={styles.section}>
      <div className="container">
        {/* Header */}
        <div style={styles.header} className="mission-header">
          <div style={styles.headerLeft}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-tag">Our Mission</span>
              <h2 className="section-h2" style={{ marginTop: 8, maxWidth: 500 }}>
                We believe every child, regardless of background, deserves to{' '}
                <span style={{ fontStyle: 'normal', fontWeight: 700 }}>thrive.</span>
              </h2>
            </motion.div>
          </div>
          <motion.div
            style={styles.headerRight}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div style={styles.mosaic} className="mission-mosaic">
              {mosaicImages.map((img, i) => (
                <MosaicCell key={img.src} img={img} index={i} tall={img.tall} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div style={styles.cards} className="mission-cards-grid">
          {cards.map((card, i) => (
            <Card key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: { padding: '96px 0', background: '#fff' },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 48,
    marginBottom: 64,
  },
  headerLeft: { flex: '0 0 auto', maxWidth: 460 },
  headerRight: { flex: 1, minWidth: 0 },
  mosaic: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: 10,
    height: 360,
    borderRadius: 20,
    overflow: 'hidden',
  },
  mosaicCell: {
    overflow: 'hidden',
    borderRadius: 12,
    position: 'relative',
  },
  mosaicImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 28,
  },
  block: {
    background: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    cursor: 'default',
    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
  },
  strip: {
    position: 'relative',
    overflow: 'hidden',
    height: 52,
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '60%',
    height: '100%',
    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
    pointerEvents: 'none',
  },
  body: {
    padding: '24px 28px 28px',
  },
  cardTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    fontSize: '1.1rem',
    marginBottom: 12,
    lineHeight: 1.3,
  },
  cardBody: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.91rem',
    lineHeight: 1.75,
    color: '#555',
    margin: 0,
  },
}
