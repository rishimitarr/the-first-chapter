import { motion } from 'framer-motion'

const roles = [
  { label: 'Volunteer Coordinator' },
  { label: 'Education Program Lead' },
  { label: 'Community Outreach' },
  { label: 'Marketing & Social Media' },
  { label: 'Event Organizer' },
]

const sectionVariant = {
  hidden: { opacity: 0, y: 120, scale: 0.96, transition: { duration: 0.3, ease: 'easeIn' } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}

export default function Join() {
  return (
    <section id="join" style={styles.section}>
      {/* Background image */}
      <div style={styles.bg} />
      {/* Dark overlay */}
      <div style={styles.overlay} />

      {/* Background photo credit */}
      <p style={styles.bgCredit}>Photo: Artem Kniaz / Unsplash</p>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
        >
          <div style={styles.grid} className="join-grid">
            {/* Left , text */}
            <div style={styles.left}>
              <span style={styles.tag}>Join Our Team</span>
              <h2 style={styles.heading}>
                Be part of something that matters.
              </h2>
              <p style={styles.body}>
                We&apos;re always looking for passionate, driven individuals who want to make
                a real difference in children&apos;s lives across the GTA. No experience
                required. Just heart.
              </p>

              <ul style={styles.roleList}>
                {roles.map((r) => (
                  <li key={r.label} style={styles.roleItem}>
                    <span style={styles.roleDot} />
                    <span style={styles.roleLabel}>{r.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right , form card */}
            <div>
              <div style={styles.formCard} className="join-form-card">
                <h3 style={styles.formTitle}>Express Your Interest</h3>
                <p style={styles.formSub}>Fill out the form and we&apos;ll be in touch soon.</p>

                <form
                  action="https://formspree.io/f/mjgjzyje"
                  method="POST"
                  style={styles.form}
                >
                  <input type="hidden" name="_subject" value="New volunteer interest , The First Chapter" />

                  <div style={styles.field}>
                    <label style={styles.fieldLabel}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      style={styles.fieldInput}
                      placeholder="Jane Smith"
                      required
                    />
                  </div>

                  <div style={styles.field}>
                    <label style={styles.fieldLabel}>Email Address</label>
                    <input
                      type="email"
                      name="_replyto"
                      style={styles.fieldInput}
                      placeholder="jane@example.com"
                      required
                    />
                  </div>

                  <div style={styles.field}>
                    <label style={styles.fieldLabel}>Role of Interest</label>
                    <select name="role" style={styles.fieldInput}>
                      <option value="">Select a role...</option>
                      {roles.map((r) => (
                        <option key={r.label}>{r.label}</option>
                      ))}
                      <option>Other</option>
                    </select>
                  </div>

                  <div style={styles.field}>
                    <label style={styles.fieldLabel}>Why do you want to join?</label>
                    <textarea
                      name="message"
                      style={{ ...styles.fieldInput, ...styles.textarea }}
                      placeholder="Tell us about yourself and why you want to get involved..."
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    style={styles.submitBtn}
                    whileHover={{ y: -2, boxShadow: '0 10px 28px rgba(26,58,107,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Send My Interest
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    position: 'relative',
    padding: '80px 0',
    overflow: 'hidden',
  },
  bg: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url(/hero-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(8, 18, 46, 0.80)',
  },
  bgCredit: {
    position: 'absolute',
    bottom: 10,
    right: 14,
    zIndex: 2,
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.6rem',
    color: 'rgba(255,255,255,0.28)',
    margin: 0,
    letterSpacing: '0.02em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 72,
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  tag: {
    display: 'block',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '1.2rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.6)',
    background: 'none',
    padding: 0,
    marginBottom: 0,
  },
  heading: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
    color: '#fff',
    lineHeight: 1.1,
    margin: 0,
    letterSpacing: '-0.02em',
  },
  body: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.15rem',
    lineHeight: 1.8,
    color: 'rgba(255,255,255,0.72)',
    margin: 0,
  },
  roleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginTop: 8,
  },
  roleItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  roleDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    flexShrink: 0,
    background: 'rgba(255,255,255,0.5)',
  },
  roleLabel: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: '1.05rem',
    color: 'rgba(255,255,255,0.85)',
  },
  formCard: {
    background: '#fff',
    borderRadius: 6,
    padding: '40px 36px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.32)',
  },
  formTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '1.6rem',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  formSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    color: '#888',
    marginBottom: 24,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  fieldLabel: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '0.95rem',
    color: '#1A1A1A',
    letterSpacing: '0.03em',
  },
  fieldInput: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    padding: '12px 14px',
    border: '1.5px solid #dde4ed',
    borderRadius: 4,
    outline: 'none',
    color: '#1A1A1A',
    background: '#fff',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    width: '100%',
  },
  textarea: {
    minHeight: 100,
    resize: 'vertical',
  },
  submitBtn: {
    background: '#1A3A6B',
    color: '#fff',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    padding: '14px 28px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    marginTop: 4,
    letterSpacing: '0.01em',
  },
}
