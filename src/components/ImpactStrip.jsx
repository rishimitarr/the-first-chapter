import { motion } from 'framer-motion'

const pillars = [
  {
    num: '01',
    color: '#57A018',
    title: 'Access to Education',
    body: 'Every child deserves learning tools as a right, not a privilege. We make sure they have them.',
    img: '/pillar-education.jpg',
    credit: 'CDC',
  },
  {
    num: '02',
    color: '#0099D6',
    title: "Children's Health",
    body: 'A healthy child is a thriving child. We support mental wellness and physical health so every child can grow up safe and ready to learn.',
    img: '/pillar-health.jpg',
    credit: 'Ben White',
  },
  {
    num: '03',
    color: '#F7941D',
    title: 'Creating Local Change',
    body: 'Meaningful change begins in the community. We work right here in the GTA to make a direct and lasting impact on the children around us.',
    img: '/pillar-community.jpg',
    credit: 'Bill Wegener',
  },
]

const sectionVariant = {
  hidden: { opacity: 0, y: 120, scale: 0.96, transition: { duration: 0.3, ease: 'easeIn' } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}

export default function ImpactStrip() {
  return (
    <section style={styles.section}>
      <div className="container">
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
        >
          <div style={styles.label}>
            <span className="section-tag">What We Stand For</span>
          </div>

          <div style={styles.grid} className="impact-strip-grid">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                style={styles.card}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.13)', transition: { duration: 0.22, ease: 'easeOut' } }}
              >
                <div style={styles.imgWrap}>
                  <img src={p.img} alt={p.title} style={styles.img} />
                  <span style={styles.credit}>Photo: {p.credit} / Unsplash</span>
                </div>

                <div style={styles.text}>
                  <div style={{ ...styles.num, color: p.color }}>{p.num}</div>
                  <div style={styles.divider} />
                  <h3 style={styles.title}>{p.title}</h3>
                  <p style={styles.body}>{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    background: '#fff',
    padding: '72px 0',
  },
  label: {
    marginBottom: 40,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    borderRadius: 6,
    overflow: 'hidden',
    border: '1px solid rgba(0,0,0,0.07)',
  },
  imgWrap: {
    position: 'relative',
    height: 220,
    overflow: 'hidden',
    flexShrink: 0,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  credit: {
    position: 'absolute',
    bottom: 7,
    right: 9,
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.58rem',
    color: 'rgba(255,255,255,0.42)',
    letterSpacing: '0.02em',
    pointerEvents: 'none',
  },
  text: {
    padding: '24px 24px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    flex: 1,
    background: '#fff',
  },
  num: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '2.4rem',
    lineHeight: 1,
    letterSpacing: '-0.04em',
  },
  divider: {
    width: 28,
    height: 1.5,
    background: 'rgba(0,0,0,0.10)',
    marginBottom: 2,
  },
  title: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '1.4rem',
    color: '#1A1A1A',
    margin: 0,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  body: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    lineHeight: 1.75,
    color: '#666',
    margin: 0,
  },
}
