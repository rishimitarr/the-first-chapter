import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SparklesText from './SparklesText'

const sectionVariant = {
  hidden: { opacity: 0, x: -150, scale: 0.96, transition: { duration: 0.3, ease: 'easeIn' } },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}

export default function HomeAbout() {
  return (
    <section style={styles.section}>
      <div className="container">
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
        >
          <div style={styles.grid} className="home-about-grid">

            <div style={styles.left}>
              <span className="section-tag">Who We Are</span>
              <h2 style={styles.heading}>
                We believe every child deserves their{' '}
                <SparklesText
                  text="first chapter."
                  colors={{ first: '#1A3A6B', second: '#1A3A6B' }}
                  count={12}
                  textStyle={styles.accent}
                />
              </h2>
              <div style={styles.actions}>
                <Link to="/about" style={styles.primaryBtn}>Our Purpose</Link>
                <Link to="/about#founders" style={styles.ghostBtn}>Meet the Founders</Link>
              </div>
            </div>

            <div style={styles.right}>
              <p style={styles.body}>
                Founded in the Greater Toronto Area by students who witnessed inequity
                firsthand, The First Chapter connects selflessness with the children
                who need it most through care kits, education programs, and
                community advocacy.
              </p>
              <p style={styles.body}>
                We believe young people have the power to create change right now.
                Every initiative we run is student-led, community-focused, and driven
                by genuine care for the children around the GTA.
              </p>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 80,
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  heading: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
    lineHeight: 1.08,
    letterSpacing: '-0.025em',
    color: '#1A1A1A',
    margin: 0,
  },
  accent: {
    color: '#1A3A6B',
  },
  actions: {
    display: 'flex',
    gap: 14,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.9rem',
    color: '#fff',
    background: '#1A3A6B',
    padding: '13px 28px',
    borderRadius: 4,
    display: 'inline-block',
    letterSpacing: '0.01em',
    transition: 'background 0.2s, transform 0.2s',
  },
  ghostBtn: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.9rem',
    color: '#1A1A1A',
    display: 'inline-block',
    borderBottom: '1.5px solid #1A1A1A',
    paddingBottom: 2,
    letterSpacing: '0.01em',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  body: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.1rem',
    lineHeight: 1.85,
    color: '#555',
    margin: 0,
  },
}
