export default function DonationComingSoon() {
  return (
    <main style={styles.page}>
      <p style={styles.message}>Donation feature coming soon. Be on the lookout.</p>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    gap: 18,
    padding: '32px 24px',
    textAlign: 'center',
    background: '#fff',
    color: '#1A1A1A',
  },
  message: {
    margin: 0,
    maxWidth: 520,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
    lineHeight: 1.25,
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
}
