const partners = [
  { src: '/partner-logos/apc-logo.png', alt: 'APC' },
  { src: '/partner-logos/td-mosaic.png', alt: 'TD Mosaic' },
]

export default function PartnersSection() {
  return (
    <section style={styles.section}>
      <div className="container" style={styles.inner}>
        <span className="section-tag">Our Partners</span>
        <p style={styles.title}>
          Thank you to our growing list of partners!
        </p>

        <div style={styles.grid}>
          {partners.map((p) => (
            <div key={p.alt} style={styles.logoWrap}>
              <img
                src={p.src}
                alt={p.alt}
                style={styles.logo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '80px 0 100px',
    background: '#fff',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.15rem',
    fontWeight: 500,
    color: '#555',
    maxWidth: 680,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 1.6,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px 56px',
    maxWidth: 900,
    width: '100%',
  },
  logoWrap: {
    flex: '1 1 calc(25% - 56px)',
    minWidth: 160,
    maxWidth: 240,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: 'auto',
    maxHeight: 110,
    objectFit: 'contain',
    cursor: 'default',
  },
}
