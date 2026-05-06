import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
}

export default function Impact() {
  return (
    <section id="impact" style={styles.section}>
      <div className="container">
        {/* Centered header */}
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Our Impact</span>
          <h2 className="section-h2" style={{ marginTop: 10 }}>
            Small steps. <span style={{ fontStyle: 'normal', fontWeight: 700 }}>Lasting change.</span>
          </h2>
          <p style={styles.subtext}>
            Every action we take is a step toward a more equitable future for children in the GTA.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          style={styles.cards}
          className="impact-cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            style={{ ...styles.card, background: 'linear-gradient(135deg, #1A3A6B 0%, #0099D6 100%)', height: '100%' }}
            className="impact-card"
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.18)' }}
          >
            <div style={styles.cardNum}>GTA</div>
            <div style={styles.cardDesc}>
              Serving children &amp; families across the GTA
            </div>
          </motion.div>

          <motion.div
            style={{ ...styles.card, background: 'linear-gradient(135deg, #F7941D 0%, #FBB040 100%)', height: '100%' }}
            className="impact-card"
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.18)' }}
          >
            <div style={styles.cardNum}>
              Every
              <br />
              Child
            </div>
            <div style={styles.cardLabel}>Every child in our community deserves their First Chapter</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '96px 0',
    background: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: 56,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subtext: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '1rem',
    color: '#666',
    maxWidth: 540,
    marginTop: 14,
    lineHeight: 1.6,
    textAlign: 'center',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 28,
    maxWidth: 860,
    margin: '0 auto',
    alignItems: 'stretch',
  },
  card: {
    borderRadius: 24,
    padding: '52px 40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
    cursor: 'default',
  },
  cardNum: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(2.8rem, 5vw, 3.8rem)',
    color: '#fff',
    lineHeight: 1.1,
    textAlign: 'center',
  },
  cardLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 1.4,
    textAlign: 'center',
    maxWidth: 280,
  },
  cardDesc: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 1.4,
    textAlign: 'center',
    maxWidth: 300,
  },
}
