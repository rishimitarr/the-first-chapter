import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #fdf9f5 0%, #e8f4e5 40%, #fdf0e6 80%, #e8f4fa 100%)',
        padding: '80px 2rem 40px',
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: '#a8c5a0',
          filter: 'blur(80px)',
          opacity: 0.22,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-80px',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: '#f2c9a8',
          filter: 'blur(80px)',
          opacity: 0.22,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          right: '10%',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: '#c5b8e8',
          filter: 'blur(70px)',
          opacity: 0.22,
          pointerEvents: 'none',
        }}
      />

      {/* Hero content */}
      <div
        style={{
          maxWidth: '680px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '12px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#6a9e62',
              border: '1px solid rgba(106, 158, 98, 0.4)',
              borderRadius: '999px',
              padding: '5px 16px',
              background: 'rgba(168, 197, 160, 0.15)',
            }}
          >
            Non-Profit Organization · GTA, Ontario
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 3.6rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#2c3e2d',
            margin: 0,
          }}
        >
          The{' '}
          <span style={{ color: '#6a9e62' }}>First Chapter</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55 }}
          style={{
            fontSize: '21px',
            color: '#5a6b5c',
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          Every Child Deserves Their First Chapter
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.55 }}
          style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link
            to="join"
            smooth={true}
            duration={600}
            offset={-68}
            style={{
              background: '#6a9e62',
              color: 'white',
              fontWeight: 600,
              fontSize: '15px',
              padding: '14px 32px',
              borderRadius: '28px',
              cursor: 'pointer',
              border: 'none',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 0.2s',
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
            Join Our Team
          </Link>
          <Link
            to="mission"
            smooth={true}
            duration={600}
            offset={-68}
            style={{
              background: 'transparent',
              color: '#2c3e2d',
              fontWeight: 600,
              fontSize: '15px',
              padding: '14px 32px',
              borderRadius: '28px',
              cursor: 'pointer',
              border: '1.5px solid rgba(44, 62, 45, 0.25)',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#6a9e62'
              e.target.style.color = '#6a9e62'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(44, 62, 45, 0.25)'
              e.target.style.color = '#2c3e2d'
            }}
          >
            Learn Our Mission
          </Link>
        </motion.div>

        {/* Logo image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.55 }}
        >
          <img
            src="/TheFirstChapterNPO.JPG"
            alt="The First Chapter Logo"
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid rgba(42, 122, 138, 0.35)',
              display: 'block',
            }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: 0.5,
        }}
      >
        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5a6b5c' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ color: '#5a6b5c', fontSize: '18px' }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  )
}
