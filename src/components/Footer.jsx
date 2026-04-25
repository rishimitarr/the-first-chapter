import { Link } from 'react-scroll'

const navLinks = [
  { label: 'Mission', to: 'mission' },
  { label: 'About', to: 'about' },
  { label: 'Impact', to: 'impact' },
  { label: 'Join Us', to: 'join' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#2c3e2d', padding: '3rem 2rem 2rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        {/* Logo + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
          <img
            src="/TheFirstChapterNPO.JPG"
            alt="The First Chapter"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <span style={{ fontSize: '18px', fontWeight: 600, color: 'white' }}>
            thefirstchapter
          </span>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '2rem', lineHeight: 1.5 }}>
          Every Child Deserves Their First Chapter
        </p>

        {/* Nav links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={600}
              offset={-68}
              style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.55)',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#a8c5a0')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.55)')}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:thefirstchapternpo@gmail.com"
            style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.55)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#a8c5a0')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.55)')}
          >
            Contact
          </a>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '1.5rem' }} />

        {/* Copyright */}
        <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.3)' }}>
          © 2025 The First Chapter Non-Profit Organization · Greater Toronto Area, Ontario, Canada
        </p>
      </div>
    </footer>
  )
}
