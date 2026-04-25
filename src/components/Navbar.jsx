import { useState } from 'react'
import { Link } from 'react-scroll'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Mission', to: 'mission' },
    { label: 'About', to: 'about' },
    { label: 'Impact', to: 'impact' },
    { label: 'Join Us', to: 'join' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        background: 'rgba(253, 249, 245, 0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(168, 197, 160, 0.3)',
      }}
    >
      {/* Left: Logo + Wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src="/TheFirstChapterNPO.JPG"
          alt="The First Chapter"
          style={{
            height: '44px',
            width: '44px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2.5px solid rgba(42, 122, 138, 0.5)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{ fontSize: '15px', fontWeight: 500, color: '#2c3e2d' }}>
            thefirstchapter
          </span>
          <span
            style={{
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#8a9e8c',
              marginTop: '2px',
            }}
          >
            Non-Profit Organization
          </span>
        </div>
      </div>

      {/* Centre: Nav Links (hidden on mobile) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
        className="nav-links-desktop"
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            smooth={true}
            duration={600}
            offset={-68}
            style={{
              fontSize: '14px',
              color: '#5a6b5c',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#6a9e62')}
            onMouseLeave={(e) => (e.target.style.color = '#5a6b5c')}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right: CTA Button */}
      <Link
        to="join"
        smooth={true}
        duration={600}
        offset={-68}
        style={{
          background: '#6a9e62',
          color: 'white',
          fontSize: '14px',
          fontWeight: 500,
          padding: '9px 22px',
          borderRadius: '24px',
          cursor: 'pointer',
          border: 'none',
          textDecoration: 'none',
          transition: 'background 0.2s',
          display: 'inline-block',
          whiteSpace: 'nowrap',
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

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  )
}
