import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Our Mission', href: '/mission', route: true },
  { label: 'About Us', href: '/about', route: true },
  { label: 'Care Kits', href: '/care-kits', route: true },
  { label: 'Join Our Team', href: '/#join', route: false },
]

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Brand Identity */}
        <div style={styles.brand}>
          <img
            src="/New First Chapter Logo.png"
            alt="The First Chapter"
            style={styles.logo}
          />
        </div>

        {/* Horizontal Navigation */}
        <nav style={styles.nav}>
          {navLinks.map((l) =>
            l.route ? (
              <Link key={l.href} to={l.href} style={styles.navLink}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} style={styles.navLink}>
                {l.label}
              </a>
            )
          )}

          {/* Contact with upward menu */}
          <div
            style={styles.contactWrap}
            onMouseEnter={() => setContactOpen(true)}
            onMouseLeave={() => setContactOpen(false)}
          >
            <button
              type="button"
              style={{
                ...styles.navLink,
                margin: 0,
                lineHeight: 'inherit',
                verticalAlign: 'baseline',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#C45D2A' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#fff' }}
            >
              Contact
              <ChevronDown
                size={14}
                style={{
                  marginLeft: 4,
                  transition: 'transform 0.2s',
                  transform: contactOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            {contactOpen && (
              <>
                <div style={styles.menuBridge} />
                <div
                  style={styles.upwardMenu}
                  onMouseEnter={() => setContactOpen(true)}
                  onMouseLeave={() => setContactOpen(false)}
                >
                <a
                  href="mailto:info@thefirstchapternpo.org"
                  style={styles.menuItem}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#4A6FA5' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#333' }}
                >
                  Email Us!
                </a>
                <a
                  href="mailto:info@thefirstchapternpo.org"
                  style={styles.menuItem}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#4A6FA5' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#333' }}
                >
                  info@thefirstchapternpo.org
                </a>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Social Icons */}
        <div style={styles.social}>
          <a
            href="https://www.instagram.com/thefirstchapternpo/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialIcon}
            aria-label="Instagram"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff'
              e.currentTarget.style.color = '#1A3A6B'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#fff'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4.5"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Copyright */}
        <div style={styles.copyright}>
          <span>© 2026 The First Chapter Corp. All rights reserved. | Registered Nonprofit.</span>
        </div>
      </div>


    </footer>
  )
}

const styles = {
  footer: {
    position: 'relative',
    zIndex: 2,
    background: '#1A3A6B',
    color: '#1A1A1A',
    padding: '64px 0 40px',
  },
  container: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
  },
  logo: {
    height: 180,
    width: 'auto',
    objectFit: 'contain',
    filter: 'brightness(0) invert(1)',
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px 28px',
    marginBottom: 32,
  },
  navLink: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '1.35rem',
    fontWeight: 800,
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s',
    background: 'none',
    border: 'none',
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    lineHeight: 1,
  },
  contactWrap: {
    position: 'relative',
  },
  menuBridge: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    right: 0,
    height: 12,
  },
  upwardMenu: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: 0,
    background: '#FFFFFF',
    borderRadius: 10,
    boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    whiteSpace: 'nowrap',
    zIndex: 10,
  },
  menuItem: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.05rem',
    color: '#333',
    textDecoration: 'none',
    transition: 'color 0.2s',
    lineHeight: 1.5,
  },
  social: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 32,
  },
  socialIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: '50%',
    border: '1.5px solid rgba(255,255,255,0.5)',
    color: '#fff',
    textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s',
  },
  divider: {
    width: '100%',
    height: 1,
    background: 'rgba(255,255,255,0.15)',
    marginBottom: 24,
  },
  copyright: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.92rem',
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    lineHeight: 1.6,
  },
}
