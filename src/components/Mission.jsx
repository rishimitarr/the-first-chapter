import { motion } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'

const cards = [
  {
    icon: '📚',
    title: "Children's Education",
    desc: 'Providing access to quality learning resources and programs that help every child reach their full academic potential.',
    bg: '#e8f4e5',
  },
  {
    icon: '🌱',
    title: "Children's Health",
    desc: 'Supporting the physical and mental well-being of children through community health initiatives and awareness.',
    bg: '#fdf0e6',
  },
  {
    icon: '🤝',
    title: 'Community Impact',
    desc: 'Building strong, connected communities in the GTA where every family has the support they need to thrive.',
    bg: '#e8f4fa',
  },
  {
    icon: '💡',
    title: 'Raising Awareness',
    desc: 'Amplifying the voices and needs of children and families to inspire action and drive meaningful change.',
    bg: '#f0ecfb',
  },
]

export default function Mission() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section
      id="mission"
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
            Our Mission
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#2c3e2d', marginBottom: '16px', lineHeight: 1.2 }}
        >
          Building brighter futures one child at a time
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          style={{ fontSize: '17px', color: '#5a6b5c', lineHeight: 1.75, maxWidth: '600px' }}
        >
          The First Chapter is a student-led non-profit organization dedicated to creating equitable opportunities
          for children across the Greater Toronto Area. Through grassroots community programs, education initiatives,
          and health advocacy, we believe every child deserves the chance to write their own story — starting with their first chapter.
        </motion.p>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: [0.05, 0.15, 0.25, 0.35][i] }}
              whileHover={{ y: -4 }}
              style={{
                background: 'white',
                borderRadius: '20px',
                border: '1px solid rgba(168, 197, 160, 0.25)',
                padding: '2rem 1.75rem',
                cursor: 'default',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: card.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '16px',
                }}
              >
                {card.icon}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#2c3e2d', marginBottom: '8px' }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#5a6b5c', lineHeight: 1.65 }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
