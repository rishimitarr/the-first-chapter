export default function DonationComingSoon() {
  return (
    <main style={styles.page}>
      <p style={styles.message}>Donation feature coming very soon. Be on the lookout.</p>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    padding: '32px 24px',
    background: '#FFFFFF',
    color: '#111827',
    textAlign: 'center',
  },
  message: {
    margin: 0,
    maxWidth: 560,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
    lineHeight: 1.25,
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
}
