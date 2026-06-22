import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const programs = [
  {
    img: '/card-care-kits.jpg',
    title: 'Care Kits',
    body: 'We assemble and distribute care kits packed with school supplies, hygiene essentials, and educational tools. Everything a child needs, directly into their hands.',
    href: '/care-kits',
    accentColor: '#57A018',
    credit: 'CDC / Unsplash',
  },
  {
    img: '/card-community.jpg',
    title: 'Community Action',
    body: 'We organize events and campaigns that bring GTA communities together, advocating loudly for children\'s rights and creating meaningful local change.',
    href: '/mission',
    accentColor: '#0099D6',
    credit: 'Bill Wegener / Unsplash',
  },
  {
    img: '/card-donations.jpg',
    title: 'Charitable Giving',
    body: 'We fundraise and donate to aligned charitable organizations making a real difference in children\'s lives, connecting generosity directly where it matters most.',
    href: '/mission',
    accentColor: '#F7941D',
    credit: 'Annie Spratt / Unsplash',
  },
]

const sectionVariant = {
  hidden: { opacity: 0, x: 150, scale: 0.96, transition: { duration: 0.3, ease: 'easeIn' } },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProgramCards() {
  return (
    <section style={styles.section}>
      <div className="container">
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
        >
          <div style={styles.header}>
            <span className="section-tag">What We Do</span>
            <h2 className="section-h2" style={{ marginTop: 8 }}>
              Programs built to create{' '}
              <span style={{ whiteSpace: 'nowrap' }}>real change.</span>
            </h2>
          </div>

          <div style={styles.grid} className="program-cards-grid">
            {programs.map((p) => (
              <motion.div
                key={p.title}
                style={styles.card}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.13)', transition: { duration: 0.22, ease: 'easeOut' } }}
              >
                <div style={styles.imgWrap}>
                  <img src={p.img} alt={p.title} style={styles.img} />
                  <span style={styles.credit}>Photo: {p.credit}</span>
                </div>
                <div style={styles.body}>
                  <h3 style={styles.title}>{p.title}</h3>
                  <p style={styles.text}>{p.body}</p>
                  <Link to={p.href} style={{ ...styles.link, color: p.accentColor }}>
                    Learn more
                  </Link>
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
    padding: '72px 0',
    background: '#fff',
  },
  header: {
    marginBottom: 48,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
  },
  card: {
    borderRadius: 6,
    overflow: 'hidden',
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(0,0,0,0.06)',
  },
  imgWrap: {
    height: 260,
    overflow: 'hidden',
    position: 'relative',
  },
  credit: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.6rem',
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: '0.02em',
    pointerEvents: 'none',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.5s ease',
  },
  body: {
    padding: '24px 26px 28px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  title: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '1.5rem',
    color: '#1A1A1A',
    margin: 0,
    lineHeight: 1.2,
  },
  text: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    lineHeight: 1.78,
    color: '#555',
    flex: 1,
    margin: 0,
  },
  link: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '0.9rem',
    marginTop: 8,
    display: 'inline-block',
    letterSpacing: '0.01em',
  },
}
