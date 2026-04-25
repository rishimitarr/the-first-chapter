import { motion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const founders = [
  {
    initials: 'VM',
    name: 'Veer Malik',
    avatarBg: '#e8f4e5',
    avatarColor: '#6a9e62',
    bio: 'A passionate community builder and student leader in the GTA, Vishy co-founded The First Chapter to turn awareness into action. Driven by a deep belief that young people have the power to create real change, he leads outreach and strategic vision — connecting with organizations, building partnerships, and rallying the community around a shared purpose.',
    dir: -32,
  },
  {
    initials: 'RM',
    name: 'Rishi Mitra',
    avatarBg: '#f0ecfb',
    avatarColor: '#7c6bbf',
    bio: 'Rishi brings creativity, dedication, and a deep passion for social good to everything he does. Committed to building programs and partnerships that create measurable impact for children across the GTA, he oversees operations and community partnerships — ensuring every initiative The First Chapter undertakes is purposeful, sustainable, and community-driven.',
    dir: 32,
  },
]

export default function About() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section
      id="about"
      ref={ref}
      style={{ background: '#fdf9f5', padding: '80px 2rem' }}
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
            About Us
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#2c3e2d', marginBottom: '16px', lineHeight: 1.2 }}
        >
          Passionate students. Real change.
        </motion.h2>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          style={{ fontSize: '17px', color: '#5a6b5c', lineHeight: 1.8, maxWidth: '680px', marginBottom: '3rem' }}
        >
          The First Chapter was founded by two students from the Greater Toronto Area who refused to wait
          for someone else to make a difference. Passionate about their community and driven by a belief
          that change starts at the grassroots level, Vishy and Rishi built this organization from the
          ground up — proof that age is no barrier to impact.
        </motion.p>

        {/* Founder cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, x: founder.dir }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background: 'white',
                borderRadius: '24px',
                border: '1px solid rgba(197, 184, 232, 0.3)',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'default',
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: founder.avatarBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: founder.avatarColor,
                  margin: '0 auto 16px',
                }}
              >
                {founder.initials}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#2c3e2d', marginBottom: '4px' }}>
                {founder.name}
              </h3>
              <span style={{ fontSize: '13px', color: '#8a9e8c', display: 'block', marginBottom: '14px' }}>
                Co-Founder
              </span>
              <p style={{ fontSize: '14px', color: '#5a6b5c', lineHeight: 1.65 }}>
                {founder.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
