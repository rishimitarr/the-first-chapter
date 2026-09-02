import { useState } from 'react'
import { motion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const inputStyle = {
  width: '100%',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  padding: '11px 14px',
  background: '#fafaf9',
  fontSize: '15px',
  color: '#2c3e2d',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
}

export default function JoinTeam() {
  const [ref, isVisible] = useScrollReveal()
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
    <section
      id="join"
      ref={ref}
      style={{ background: '#fff8f2', padding: '80px 2rem' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}
        >
          <div style={{ width: '28px', height: '2px', background: '#6a9e62', borderRadius: '2px' }} />
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6a9e62', fontWeight: 600 }}>
            Join Us
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#2c3e2d', marginBottom: '1rem', lineHeight: 1.2 }}
        >
          Stay Connected with Us!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ fontSize: '16px', color: '#5a6b5c', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '600px' }}
        >
          Get updates on our mission, upcoming events, and ways you can help children 
          across the Greater Toronto Area access the education they deserve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2 }}
          style={{
            background: 'white',
            borderRadius: '24px',
            border: '1px solid rgba(168, 197, 160, 0.3)',
            padding: '2rem',
            maxWidth: '480px',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>&#10003;</div>
              <p style={{ fontSize: '18px', color: '#6a9e62', fontWeight: 600, marginBottom: '8px' }}>
                You're on the list!
              </p>
              <p style={{ fontSize: '15px', color: '#5a6b5c' }}>
                Check your inbox for a welcome message from us.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: '#5a6b5c', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    placeholder="First name"
                    style={{
                      ...inputStyle,
                      borderColor: focusedField === 'firstName' ? '#6a9e62' : 'rgba(0,0,0,0.1)',
                    }}
                    onFocus={() => setFocusedField('firstName')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: '#5a6b5c', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    style={{
                      ...inputStyle,
                      borderColor: focusedField === 'lastName' ? '#6a9e62' : 'rgba(0,0,0,0.1)',
                    }}
                    onFocus={() => setFocusedField('lastName')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#5a6b5c', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  style={{
                    ...inputStyle,
                    borderColor: focusedField === 'email' ? '#6a9e62' : 'rgba(0,0,0,0.1)',
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
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading ? '#9ab894' : '#6a9e62',
                  color: 'white',
                  border: 'none',
                  borderRadius: '28px',
                  padding: '13px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.background = '#5a8e52'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.background = '#6a9e62'
                  }
                }}
              >
                {loading ? 'Signing up...' : 'Get Updates'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}