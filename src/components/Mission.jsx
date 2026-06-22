import { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const mosaicImages = [
  { src: '/mission-children.jpg',                    alt: 'Children learning', tall: true, credit: 'Marisa Howenstine' },
  { src: '/cheng-lin-XHVDuroLbrs-unsplash.jpg',      alt: 'Community',         credit: 'Cheng Lin' },
  { src: '/jason-hu-oumTYrBrkoA-unsplash.jpg',       alt: 'Education',         credit: 'Jason Hu' },
  { src: '/vitaly-gariev-axUZuU0nBNI-unsplash.jpg',  alt: 'Children',          credit: 'Vitaly Gariev' },
  { src: '/vitaly-gariev-lGGuf8LSxa4-unsplash.jpg',  alt: 'Impact',            credit: 'Vitaly Gariev' },
]

function MosaicCell({ img, index, tall }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      style={{
        ...styles.mosaicCell,
        gridRow: tall ? 'span 2' : 'span 1',
        transition: 'box-shadow 0.4s ease',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.18)' : '0 0px 0px rgba(0,0,0,0)',
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      whileHover={{ scale: 1.03, zIndex: 2, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
      whileTap={{ scale: 0.99 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.img
        src={img.src}
        alt={img.alt}
        style={styles.mosaicImg}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      <span style={styles.mosaicCredit}>{img.credit}</span>
    </motion.div>
  )
}

const cards = [
  {
    accent: '#1A3A6B',
    title: 'Education & Health',
    body: 'We champion access to quality learning resources by building and distributing educational kits, funding aligned charitable organizations, and supplying the tools children need to thrive, while raising funds for mental wellness and physical health so every child grows up safe, supported, and ready to learn.',
  },
  {
    accent: '#0099D6',
    title: 'Community Impact',
    body: 'Rooted right here in the GTA, we work alongside local organizations, families, and volunteers to create lasting, meaningful change in the neighbourhoods where children live and grow.',
  },
  {
    accent: '#F7941D',
    title: 'Raising Awareness',
    body: "We advocate loudly for children's rights and needs, organizing events and campaigns that bring communities together around what matters most: giving every child a fair and equal chance.",
  },
]

function Card({ card, index }) {
  const controls = useAnimation()
  const [hovered, setHovered] = useState(false)

  const handleHoverStart = () => {
    setHovered(true)
    controls.start({
      y: -6,
      boxShadow: '0 16px 40px rgba(0,0,0,0.13)',
      transition: { duration: 0.22, ease: 'easeOut' },
    })
  }

  const handleHoverEnd = () => {
    setHovered(false)
    controls.start({
      y: 0,
      boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
      transition: { duration: 0.22, ease: 'easeOut' },
    })
  }

  return (
    <motion.div
      style={styles.block}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      animate={controls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      {/* Colored header strip , no letter, just the color + shine */}
      <div style={{ ...styles.strip, background: card.accent }}>
        <motion.div
          style={styles.shine}
          animate={hovered ? { x: '130%', opacity: 0.22 } : { x: '-40%', opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </div>

      {/* Body */}
      <div style={styles.body}>
        <h3 style={styles.cardTitle}>{card.title}</h3>
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-tag">Our Mission</span>
              <h2 className="section-h2" style={{ marginTop: 8, maxWidth: 500 }}>
                We believe every child, regardless of background, deserves to{' '}
                <em>thrive.</em>
              </h2>
            </motion.div>
          </div>
          <motion.div
            style={styles.headerRight}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
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
  section: { padding: '72px 0', background: '#fff' },
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
    gap: 8,
    height: 360,
    borderRadius: 6,
    overflow: 'hidden',
  },
  mosaicCell: {
    overflow: 'hidden',
    borderRadius: 4,
    position: 'relative',
  },
  mosaicCredit: {
    position: 'absolute',
    bottom: 6,
    right: 7,
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.55rem',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: '0.02em',
    pointerEvents: 'none',
    lineHeight: 1,
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
    borderRadius: 6,
    overflow: 'hidden',
    cursor: 'default',
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    border: '1px solid rgba(0,0,0,0.06)',
  },
  strip: {
    position: 'relative',
    overflow: 'hidden',
    height: 8,
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
    padding: '28px 32px 32px',
  },
  cardTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '1.5rem',
    marginBottom: 14,
    lineHeight: 1.2,
  },
  cardBody: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.05rem',
    lineHeight: 1.75,
    color: '#555',
    margin: 0,
  },
}
