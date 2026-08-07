import { useState } from 'react'
import { motion } from 'framer-motion'

const sectionVariant = {
  hidden: { opacity: 0, y: 120, scale: 0.96, transition: { duration: 0.3, ease: 'easeIn' } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}

const inputStyle = {
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
  boxSizing: 'border-box',
}

export default function Join() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focusedField, setFocusedField] = useState(null)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="join" style={styles.section}>
      <div style={styles.bg} />
      <div style={styles.overlay} />

      <p style={styles.bgCredit}>Photo: Artem Kniaz / Unsplash</p>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-250px 0px -80px 0px' }}
        >
          <div style={styles.grid} className="join-grid">
            <div style={styles.left}>
              <span style={styles.tag}>Join Us</span>
              <h2 style={styles.heading}>
                Stay in the loop
              </h2>
              <p style={styles.body}>
                Get updates on our mission, upcoming events, and ways you can help children 
                across the Greater Toronto Area access the education they deserve.
              </p>
            </div>

            <div>
              <div style={styles.formCard} className="join-form-card">
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px', color: '#6a9e62' }}>&#10003;</div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>
                      You're on the list!
                    </h3>
                    <p style={{ fontSize: '1rem', color: '#888' }}>
                      Check your inbox for a welcome message from us.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 style={styles.formTitle}>Get Updates</h3>
                    <p style={styles.formSub}>Join our newsletter to stay connected.</p>

                    <form onSubmit={handleSubmit} style={styles.form}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div style={styles.field}>
                          <label style={styles.fieldLabel}>First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            placeholder="First name"
                            style={{
                              ...inputStyle,
                              borderColor: focusedField === 'firstName' ? '#1A3A6B' : '#dde4ed',
                            }}
                            onFocus={() => setFocusedField('firstName')}
                            onBlur={() => setFocusedField(null)}
                          />
                        </div>
                        <div style={styles.field}>
                          <label style={styles.fieldLabel}>Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Last name"
                            style={{
                              ...inputStyle,
                              borderColor: focusedField === 'lastName' ? '#1A3A6B' : '#dde4ed',
                            }}
                            onFocus={() => setFocusedField('lastName')}
                            onBlur={() => setFocusedField(null)}
                          />
                        </div>
                      </div>

                      <div style={styles.field}>
                        <label style={styles.fieldLabel}>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          style={{
                            ...inputStyle,
                            borderColor: focusedField === 'email' ? '#1A3A6B' : '#dde4ed',
                          }}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>

                      {error && (
                        <p style={{ fontSize: '14px', color: '#e74c3c', margin: 0 }}>
                          {error}
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={loading}
                        style={{
                          ...styles.submitBtn,
                          background: loading ? '#4a6a9b' : '#1A3A6B',
                          cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                        whileHover={!loading ? { y: -2, boxShadow: '0 10px 28px rgba(26,58,107,0.35)' } : {}}
                        whileTap={!loading ? { scale: 0.97 } : {}}
                      >
                        {loading ? 'Signing up...' : 'Get Updates'}
                      </motion.button>
                    </form>
                  </>
                )}
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