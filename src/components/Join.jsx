import { motion } from 'framer-motion'

const roles = [
  { label: 'Volunteer Coordinator', color: '#F7941D' },
  { label: 'Education Program Lead', color: '#0099D6' },
  { label: 'Community Outreach', color: '#39B54A' },
  { label: 'Marketing & Social Media', color: '#6B2D8B' },
  { label: 'Event Organizer', color: '#EE3093' },
]

const roleContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const roleVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18 },
  },
}

export default function Join() {
  return (
    <section id="join" style={styles.section}>
      <div className="container">
        <div style={styles.grid} className="join-grid">
          {/* Left */}
          <div style={styles.left}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.55 }}
            >
              <span className="section-tag">Join Our Team</span>
              <h2 className="section-h2" style={{ marginTop: 10, maxWidth: 400 }}>
                Be part of something that <span style={{ fontStyle: 'normal', fontWeight: 700 }}>matters.</span>
              </h2>
              <p style={styles.bodyText}>
                We&apos;re always looking for passionate, driven individuals who want to make
                a real difference in children&apos;s lives across the GTA. No experience
                required — just heart.
              </p>
            </motion.div>

            <motion.ul
              style={styles.roleList}
              variants={roleContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {roles.map((r) => (
                <motion.li key={r.label} style={styles.roleItem} variants={roleVariant}>
                  <span style={{ ...styles.roleDot, background: r.color }} />
                  <span style={styles.roleLabel}>{r.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.15 }}
          >
            <div style={styles.formCard} className="join-form-card">
              <h3 style={styles.formTitle}>Express Your Interest</h3>
              <p style={styles.formSub}>Fill out the form and we&apos;ll be in touch soon.</p>

              <form
                action="https://formspree.io/f/mjgjzyje"
                method="POST"
                style={styles.form}
              >
                <input type="hidden" name="_subject" value="New volunteer interest — The First Chapter" />

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
                  whileHover={{ y: -2, boxShadow: '0 10px 28px rgba(107,45,139,0.45)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send My Interest →
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '96px 0',
    background: '#fff',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 64,
    alignItems: 'start',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  bodyText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: '#555',
    marginTop: 16,
  },
  roleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  roleItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  roleDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    flexShrink: 0,
  },
  roleLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: '0.95rem',
    color: '#1A1A1A',
  },
  formCard: {
    background: '#fff',
    borderRadius: 20,
    padding: '36px 32px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.09)',
  },
  formTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '1.3rem',
    color: '#1A3A6B',
    marginBottom: 6,
  },
  formSub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.88rem',
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
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: '0.83rem',
    color: '#1A3A6B',
    letterSpacing: '0.03em',
  },
  fieldInput: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.92rem',
    padding: '12px 16px',
    border: '1.5px solid #e0e7ef',
    borderRadius: 10,
    outline: 'none',
    color: '#1A1A1A',
    background: '#FDFAF6',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    width: '100%',
  },
  textarea: {
    minHeight: 110,
    resize: 'vertical',
  },
  submitBtn: {
    background: '#6B2D8B',
    color: '#fff',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    padding: '14px 28px',
    border: 'none',
    borderRadius: 100,
    cursor: 'pointer',
    marginTop: 4,
  },
}
