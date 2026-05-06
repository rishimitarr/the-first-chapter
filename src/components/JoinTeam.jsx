import { useState } from 'react'
import { motion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const perks = [
  'Gain meaningful volunteer experience in the non-profit sector',
  'Contribute directly to children\'s education and health in the GTA',
  'Work alongside a passionate, driven, and welcoming team',
  'Build skills in outreach, events, fundraising, and community work',
]

const areaOptions = [
  { value: '', label: 'Choose an area of interest' },
  { value: 'events', label: 'Volunteer at events' },
  { value: 'social', label: 'Social media and marketing' },
  { value: 'fundraising', label: 'Fundraising and outreach' },
  { value: 'education', label: 'Education programs' },
  { value: 'general', label: 'General support' },
]

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
  const [form, setForm] = useState({ name: '', email: '', area: '', bio: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="join"
      ref={ref}
      style={{ background: '#fff8f2', padding: '80px 2rem' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}
        >
          <div style={{ width: '28px', height: '2px', background: '#6a9e62', borderRadius: '2px' }} />
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6a9e62', fontWeight: 600 }}>
            Join Our Team
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#2c3e2d', marginBottom: '2.5rem', lineHeight: 1.2 }}
        >
          Be part of something that matters
        </motion.h2>

        {/* Two column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <p style={{ fontSize: '16px', color: '#5a6b5c', lineHeight: 1.75, marginBottom: '28px' }}>
              We are looking for passionate, driven individuals who want to make a real difference in
              the lives of children across the GTA. Whether you have a few hours a month or want to
              take on a bigger role, there is a place for you at The First Chapter.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {perks.map((perk, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: '#e8f4e5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '1px',
                    }}
                  >
                    <span style={{ color: '#6a9e62', fontSize: '12px', fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ fontSize: '15px', color: '#5a6b5c', lineHeight: 1.5 }}>{perk}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column: Form card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            style={{
              background: 'white',
              borderRadius: '24px',
              border: '1px solid rgba(168, 197, 160, 0.3)',
              padding: '2rem',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#2c3e2d', marginBottom: '20px' }}>
              Express your interest
            </h3>

            {submitted ? (
              <p style={{ fontSize: '15px', color: '#6a9e62', fontWeight: 500, textAlign: 'center', padding: '2rem 0' }}>
                Thank you for your interest! We will be in touch soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: '#5a6b5c', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    style={{
                      ...inputStyle,
                      borderColor: focusedField === 'name' ? '#6a9e62' : 'rgba(0,0,0,0.1)',
                    }}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
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
                <div>
                  <label style={{ fontSize: '13px', color: '#5a6b5c', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                    Area of Interest
                  </label>
                  <select
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    required
                    style={{
                      ...inputStyle,
                      borderColor: focusedField === 'area' ? '#6a9e62' : 'rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                    }}
                    onFocus={() => setFocusedField('area')}
                    onBlur={() => setFocusedField(null)}
                  >
                    {areaOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '13px', color: '#5a6b5c', display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                    Tell us a little about yourself
                  </label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Share a bit about your background, passions, or why you want to join..."
                    style={{
                      ...inputStyle,
                      height: '90px',
                      resize: 'none',
                      borderColor: focusedField === 'bio' ? '#6a9e62' : 'rgba(0,0,0,0.1)',
                    }}
                    onFocus={() => setFocusedField('bio')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: '#6a9e62',
                    color: 'white',
                    border: 'none',
                    borderRadius: '28px',
                    padding: '13px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#5a8e52'
                    e.target.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#6a9e62'
                    e.target.style.color = 'white'
                  }}
                >
                  Submit Interest
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
