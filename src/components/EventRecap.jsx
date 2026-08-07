import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { InfiniteSlider } from './ui/infinite-slider'

const sectionVariant = {
  hidden: { opacity: 0, y: 120, scale: 0.96, transition: { duration: 0.3, ease: 'easeIn' } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}

function buildSizes(image) {
  const src = image.src
  const variants = Array.isArray(image.variants) ? image.variants : []
  const srcSet = variants.length
    ? variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ')
    : `${src} 1x, ${src} 2x`
  return {
    src,
    srcSet,
    width: image.width,
    height: image.height,
    sizes: image.sizes,
  }
}

function MetaChip({ label, value }) {
  return (
    <div style={styles.metaChip}>
      <span style={styles.metaLabel}>{label}</span>
      <span style={styles.metaValue}>{value}</span>
    </div>
  )
}

export default function EventRecap({ event, variant = 'full' }) {
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    if (activeIndex === null) return undefined

    const onKeyDown = (eventObject) => {
      if (eventObject.key === 'Escape') setActiveIndex(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex])

  const featured = buildSizes(event.hero)

  if (variant === 'teaser') {
    return (
      <section style={styles.teaserSection} aria-labelledby="latest-event-teaser">
        <div className="container">
          <motion.div
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
          >
            <div style={styles.teaserHeader}>
              <span className="section-tag">Latest Event</span>
              <h2 id="latest-event-teaser" style={styles.teaserTitle}>
                {event.title}
              </h2>
              <p style={styles.teaserDescription}>
                {event.intro}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={styles.sliderFullWidth}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <InfiniteSlider durationOnHover={75} gap={24}>
            {event.photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                style={styles.sliderImageBtn}
                onClick={() => setActiveIndex(index)}
                aria-label={`View photo: ${photo.alt}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  style={styles.sliderImage}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </InfiniteSlider>
        </motion.div>

        <AnimatePresence>
          {activeIndex !== null ? (
            <motion.div
              style={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIndex(null)}
              role="presentation"
            >
              <motion.div
                style={styles.modalPanel}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                <button
                  type="button"
                  style={styles.modalClose}
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close image viewer"
                >
                  Close
                </button>
                <img
                  src={event.photos[activeIndex].src}
                  alt={event.photos[activeIndex].alt}
                  style={styles.modalImage}
                />
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>
    )
  }

  return (
    <section style={styles.pageSection} aria-labelledby="event-recap-title">
      <div className="container">
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-tag">Event Gallery</span>
          <h1 id="event-recap-title" style={styles.title}>
            {event.title}
          </h1>
          <div style={styles.metaRow} className="event-recap-meta-grid">
            <MetaChip label="Date" value={event.date} />
            <MetaChip label="Location" value={event.location} />
          </div>
        </motion.div>

        <motion.div
          style={styles.heroWrap}
          className="about-image-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={featured.src}
            srcSet={featured.srcSet}
            sizes={featured.sizes}
            width={featured.width}
            height={featured.height}
            alt={event.hero.alt}
            style={styles.heroImage}
            loading="eager"
            decoding="async"
          />
        </motion.div>

        <motion.div
          style={styles.summaryWrap}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={styles.summaryText}>
            {event.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={styles.gallerySection}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={styles.galleryHeader}>
            <h2 style={styles.galleryTitle}>More Photos</h2>
            <p style={styles.gallerySubtext}>
              A closer look at the day, with the additional event images from the festival.
            </p>
          </div>

          <div style={styles.carousel} className="event-recap-carousel">
            {event.photos.map((image, index) => {
              const sources = buildSizes(image)
              return (
                <button
                  key={image.src}
                  type="button"
                  style={styles.carouselItem}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Open image ${index + 1}: ${image.alt}`}
                >
                  <img
                    src={sources.src}
                    srcSet={sources.srcSet}
                    sizes={sources.sizes}
                    width={sources.width}
                    height={sources.height}
                    alt={image.alt}
                    style={styles.carouselImage}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeIndex !== null ? (
          <motion.div
            style={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
            role="presentation"
          >
            <motion.div
              style={styles.modalPanel}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(eventObject) => eventObject.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                style={styles.modalClose}
                onClick={() => setActiveIndex(null)}
                aria-label="Close image viewer"
              >
                Close
              </button>
              <img
                src={event.photos[activeIndex].src}
                alt={event.photos[activeIndex].alt}
                style={styles.modalImage}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

const styles = {
  teaserSection: {
    padding: '88px 0 0',
    background: '#fff',
  },
  teaserHeader: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    marginBottom: 40,
  },
  teaserTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.025em',
    color: '#1A1A1A',
    margin: 0,
  },
  teaserDescription: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
    lineHeight: 1.75,
    color: '#4B5563',
    margin: 0,
    maxWidth: 600,
  },
  sliderFullWidth: {
    marginTop: 40,
    overflow: 'hidden',
  },
  sliderImageBtn: {
    border: 'none',
    padding: 0,
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: 6,
    overflow: 'hidden',
    flexShrink: 0,
  },
  sliderImage: {
    height: 320,
    width: 400,
    objectFit: 'cover',
    display: 'block',
    borderRadius: 6,
    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
    transition: 'transform 0.35s ease, filter 0.35s ease',
  },
  pageSection: {
    padding: '80px 0 88px',
    background: '#fff',
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 18,
    marginBottom: 32,
  },
  title: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(2.8rem, 5.6vw, 4.4rem)',
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    color: '#1A1A1A',
    margin: 0,
    maxWidth: 920,
  },
  metaRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 16,
    width: '100%',
    maxWidth: 920,
  },
  metaChip: {
    border: '1px solid rgba(26,58,107,0.14)',
    borderRadius: 6,
    padding: '18px 20px',
    background: '#fff',
    textAlign: 'left',
  },
  metaLabel: {
    display: 'block',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#8A8A8A',
    marginBottom: 8,
  },
  metaValue: {
    display: 'block',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '1rem',
    fontWeight: 700,
    color: '#1A1A1A',
    lineHeight: 1.45,
  },
  heroWrap: {
    borderRadius: 6,
    overflow: 'hidden',
    boxShadow: '0 18px 44px rgba(0,0,0,0.10)',
    maxWidth: 720,
    margin: '0 auto',
  },
  heroImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  summaryWrap: {
    maxWidth: 760,
    margin: '36px auto 0',
  },
  summaryText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.04rem',
    lineHeight: 1.85,
    color: '#555',
  },
  gallerySection: {
    marginTop: 56,
  },
  galleryHeader: {
    marginBottom: 24,
    maxWidth: 720,
  },
  galleryTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '2rem',
    color: '#1A1A1A',
    margin: 0,
  },
  gallerySubtext: {
    margin: '10px 0 0',
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    lineHeight: 1.7,
    color: '#666',
  },
  carousel: {
    display: 'flex',
    gap: 16,
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    paddingBottom: 8,
  },
  carouselItem: {
    border: 'none',
    padding: 0,
    background: 'transparent',
    textAlign: 'left',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: 6,
    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
    flex: '0 0 min(560px, 84vw)',
    scrollSnapAlign: 'start',
  },
  carouselImage: {
    width: '100%',
    height: 360,
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.35s ease, filter 0.35s ease',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(10, 16, 28, 0.78)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    zIndex: 200,
  },
  modalPanel: {
    width: 'min(1100px, 100%)',
    background: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    border: 'none',
    background: '#1A3A6B',
    color: '#fff',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.82rem',
    padding: '10px 14px',
    borderRadius: 4,
    cursor: 'pointer',
  },
  modalImage: {
    width: '100%',
    maxHeight: '82vh',
    objectFit: 'contain',
    display: 'block',
    background: '#111',
  },
}