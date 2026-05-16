import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Our Mission', href: '#mission', route: false },
  { label: 'About Us', href: '#about', route: false },
  { label: 'Care Kits', href: '/care-kits', route: true },
  { label: 'Join Our Team', href: '#join', route: false },
]

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.top} className="footer-top-grid">
          {/* Brand */}
          <div style={{ ...styles.col, alignItems: 'flex-start', textAlign: 'left' }} className="footer-col">
            <img
              src="/New First Chapter Logo.png"
              alt="The First Chapter"
              style={styles.logo}
            />
            <div style={styles.tagline} className="footer-tagline">Every child deserves their first chapter.</div>
          </div>

          {/* Navigate */}
          <div style={styles.col} className="footer-col">
            <div style={styles.colLabel}>Navigate</div>
            {navLinks.map((l) =>
              l.route ? (
                <Link key={l.href} to={l.href} style={styles.footerLink}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} style={styles.footerLink}>
                  {l.label}
                </a>
              )
            )}
          </div>

          {/* Contact */}
          <div style={styles.col} className="footer-col">
            <div style={styles.colLabel}>Contact</div>
            <a href="mailto:thefirstchapternpo@gmail.com" style={styles.footerLink}>
              thefirstchapternpo@gmail.com
            </a>
            <div style={styles.footerLink}>Greater Toronto Area, Ontario</div>
          </div>

          {/* Connect */}
          <div style={styles.col} className="footer-col">
            <div style={styles.colLabel}>Connect With Us</div>
            <a
              href="https://www.instagram.com/thefirstchapternpo/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.igBtn}
              aria-label="Instagram"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4.5"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>

        <div style={styles.bottom}>
          <span>© 2026 The First Chapter Corp. All rights reserved.</span>
          <span>Registered Non-Profit · Ontario, Canada</span>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: '#1A3A6B',
    color: '#fff',
    padding: '64px 0 32px',
  },
  top: {
    display: 'grid',
    gridTemplateColumns: '1.8fr 1fr 1.4fr 1fr',
    gap: 64,
    paddingBottom: 48,
    borderBottom: '1px solid rgba(255,255,255,0.12)',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignSelf: 'flex-start',
  },
  logo: {
    height: 60,
    width: 'auto',
    objectFit: 'contain',
    filter: 'brightness(0) invert(1)',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  tagline: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.5,
    whiteSpace: 'nowrap',
    textAlign: 'left',
  },
  colLabel: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: '0.78rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  footerLink: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.88rem',
    color: 'rgba(255,255,255,0.70)',
    transition: 'color 0.2s',
    cursor: 'pointer',
    lineHeight: 1.6,
  },
  igBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: '1.5px solid rgba(255,255,255,0.30)',
    color: '#fff',
    transition: 'border-color 0.2s, background 0.2s',
    cursor: 'pointer',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 28,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.78rem',
    color: 'rgba(255,255,255,0.40)',
    flexWrap: 'wrap',
    gap: 8,
  },
}
