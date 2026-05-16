import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const RISHI_BIO =
  "Inequality wasn't an abstraction for me growing up. I've witnessed people weighing whether a notebook was worth the money, and I know that what stands between children and their dreams isn't a shortage of love. It's access. That awareness has never faded. My role at The First Chapter involves laying the groundwork for all operations ranging from finance, treasury, fundraising, technical, outreach, and ensuring that our organization operates with integrity. Trust isn't a label we hang on ourselves; it's earned through transparency with each passing day. A childhood without prejudice is possible for all children. It's my responsibility to ensure that the organization making this happen lasts for generations."

const VEER_BIO =
  "Every child should have an equal opportunity in life. This principle is the reason I started The First Chapter. Way too many children within our own community do not have access to what most people take for granted: a healthy childhood, an adequate education, and the basic human feeling of being cared for. My goal is simple: to create an organization that connects selflessness with the children who most desperately need it the most. I believe that to bring change in our society it does not always have to begin through the government. Sometimes it starts right here in the community, where a single act of kindness can improve the life of a child."

function TypewriterText({ text, isActive, onDone }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const words = text.split(' ')
  const timerRef = useRef(null)

  useEffect(() => {
    if (!isActive) return
    setVisibleCount(0)
    let i = 0

    const tick = () => {
      i += 1
      setVisibleCount(i)
      if (i < words.length) {
        timerRef.current = setTimeout(tick, 72)
      } else {
        onDone && onDone()
      }
    }

    timerRef.current = setTimeout(tick, 200)

    return () => clearTimeout(timerRef.current)
  }, [isActive]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span>
      {words.slice(0, visibleCount).join(' ')}
      {visibleCount > 0 && visibleCount < words.length && (
        <span style={styles.cursor}>|</span>
      )}
    </span>
  )
}

function FounderBubble({ initials, name, role, accentColor, isActive, onDone, delay = 0, bio }) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!isActive) return
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [isActive, delay])

  return (
    <motion.div
      style={styles.bubble}
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={isActive ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: delay / 1000 }}
    >
      {/* Avatar row */}
      <div style={styles.avatarRow}>
        <div style={{ ...styles.avatar, background: accentColor }}>
          {initials}
        </div>
        <div>
          <div style={styles.founderName}>{name}</div>
          <div style={styles.founderRole}>{role}</div>
        </div>
        <div style={{ ...styles.statusDot, background: started ? '#FBB040' : '#ccc' }} />
      </div>

      {/* Message bubble */}
      <div style={styles.messageBubble}>
        <TypewriterText text={bio} isActive={started} onDone={onDone} />
      </div>
    </motion.div>
  )
}

export default function About() {
  const triggerRef = useRef(null)
  const inView = useInView(triggerRef, { once: true, margin: '-80px' })

  const [bubble1Done, setBubble1Done] = useState(false)
  const [bubble2Active, setBubble2Active] = useState(false)

  useEffect(() => {
    if (bubble1Done) {
      const t = setTimeout(() => setBubble2Active(true), 500)
      return () => clearTimeout(t)
    }
  }, [bubble1Done])

  return (
    <section id="about" style={styles.section}>
      <div className="container">
        <div style={styles.grid} className="about-grid">
          {/* Left static */}
          <motion.div
            style={styles.left}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag" style={{ width: 'fit-content' }}>About Us</span>
            <h2 className="section-h2" style={{ marginTop: 8 }}>
              Passionate students.{' '}
              <em>Real change.</em>
            </h2>
<p style={styles.bodyText}>
              The First Chapter was founded by two students from the Greater Toronto Area
              who saw inequity in their communities and decided to act. What started as a
              conversation became a registered non-profit dedicated to children&apos;s futures.
            </p>
            <p style={styles.bodyText}>
              We believe that young people have the power to create change right now. Every
              initiative we run is student-led, community-focused, and driven by genuine
              care for the children around the GTA.
            </p>
          </motion.div>

          {/* Right — chat bubbles */}
          <div style={styles.right} className="about-chat-window" ref={triggerRef}>
            <div style={styles.chatHeader}>
              <span style={{ ...styles.chatDot, background: '#FF5F57' }} />
              <span style={{ ...styles.chatDot, background: '#FEBC2E' }} />
              <span style={{ ...styles.chatDot, background: '#28C840' }} />
              <span style={styles.chatTitle}>The First Chapter — Founders</span>
            </div>

            <div style={styles.chatBody}>
              <FounderBubble
                initials="RM"
                name="Rishi Mitra"
                role="Co-Founder"
                accentColor="#F7941D"
                isActive={inView}
                delay={300}
                onDone={() => setBubble1Done(true)}
                bio={RISHI_BIO}
              />

              <FounderBubble
                initials="VM"
                name="Veer Malik"
                role="Co-Founder"
                accentColor="#0099D6"
                isActive={bubble2Active}
                delay={0}
                bio={VEER_BIO}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '96px 0',
    background: '#FDFAF6',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 72,
    alignItems: 'start',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  bodyText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: '#555',
  },
  right: {
    background: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
    minHeight: 480,
    display: 'flex',
    flexDirection: 'column',
  },
  chatHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 20px',
    background: '#f5f5f7',
    borderBottom: '1px solid rgba(0,0,0,0.07)',
  },
  chatDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: '#ddd',
    display: 'inline-block',
  },
  chatTitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.8rem',
    color: '#888',
    marginLeft: 8,
    letterSpacing: '0.04em',
  },
  chatBody: {
    flex: 1,
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 28,
    overflowY: 'auto',
    maxHeight: 520,
  },
  bubble: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  avatarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.9rem',
    color: '#fff',
    flexShrink: 0,
  },
  founderName: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.9rem',
    color: '#1A3A6B',
  },
  founderRole: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.75rem',
    color: '#888',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    marginLeft: 'auto',
    transition: 'background 0.5s',
  },
  messageBubble: {
    background: '#f0f7ff',
    borderRadius: '4px 16px 16px 16px',
    padding: '14px 18px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.88rem',
    lineHeight: 1.7,
    color: '#333',
    minHeight: 80,
    boxShadow: '0 2px 8px rgba(0,153,214,0.08)',
  },
  cursor: {
    display: 'inline-block',
    fontWeight: 100,
    color: '#6B2D8B',
    animation: 'blink 1s step-end infinite',
    marginLeft: 1,
  },
}
