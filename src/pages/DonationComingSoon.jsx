import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Heart, Loader2, Minus, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || import.meta.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

const KIT_PRICE = 6
const KIT_ITEMS = [
  '1 notebook',
  '2 folders',
  '1 pencil pouch',
  '4 pens',
  '3 pencils',
  '5 crayons',
  '1 glue stick',
  '1 highlighter',
  '1 ruler',
  '2 erasers',
  '1 sharpener',
]

let stripePromise

function getStripe() {
  if (!STRIPE_PUBLISHABLE_KEY) return null
  if (!stripePromise) stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)
  return stripePromise
}

function EmbeddedCheckout({ quantity }) {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let checkout
    let cancelled = false

    const mountCheckout = async () => {
      setStatus('loading')
      setMessage('')

      try {
        if (!STRIPE_PUBLISHABLE_KEY) {
          throw new Error(
            'Stripe publishable key is missing. Add VITE_STRIPE_PUBLISHABLE_KEY to your environment.',
          )
        }

        const stripe = await getStripe()
        if (!stripe) throw new Error('Stripe.js did not load.')

        const fetchClientSecret = async () => {
          const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity }),
          })
          const data = await response.json()
          if (!response.ok) throw new Error(data.error || 'Unable to start donation.')
          return data.clientSecret
        }

        if (cancelled) return

        if (typeof stripe.createEmbeddedCheckoutPage === 'function') {
          checkout = await stripe.createEmbeddedCheckoutPage({ fetchClientSecret })
        } else {
          checkout = await stripe.initEmbeddedCheckout({
            clientSecret: await fetchClientSecret(),
          })
        }

        checkout.mount('#embedded-checkout')
        setStatus('ready')
      } catch (error) {
        if (!cancelled) {
          setStatus('error')
          setMessage(error.message || 'Unable to start donation.')
        }
      }
    }

    mountCheckout()

    return () => {
      cancelled = true
      checkout?.destroy()
    }
  }, [quantity])

  return (
    <div style={styles.checkoutShell}>
      {status === 'loading' && (
        <div style={styles.checkoutLoading}>
          <Loader2 size={22} style={styles.spinIcon} />
          <span>Preparing secure donation form…</span>
        </div>
      )}
      {status === 'error' && (
        <div style={styles.errorBox}>
          <strong>Donation form could not load.</strong>
          <span>{message}</span>
        </div>
      )}
      <div id="embedded-checkout" style={styles.embeddedCheckout} />
    </div>
  )
}

export default function DonationComingSoon() {
  const [quantity, setQuantity] = useState(1)
  const [checkoutQuantity, setCheckoutQuantity] = useState(1)
  const params = new URLSearchParams(window.location.search)
  const completedSession = params.has('session_id')
  const total = useMemo(() => quantity * KIT_PRICE, [quantity])
  const checkoutPending = quantity !== checkoutQuantity

  useEffect(() => {
    const timer = window.setTimeout(() => setCheckoutQuantity(quantity), 450)
    return () => window.clearTimeout(timer)
  }, [quantity])

  const increment = () => setQuantity((value) => Math.min(100, value + 1))
  const decrement = () => setQuantity((value) => Math.max(1, value - 1))

  return (
    <div style={styles.page}>
      <Nav />

      <main style={styles.main}>
        <section style={styles.donationSection}>
          <div style={styles.heroShell}>
            <motion.div
              style={styles.heroIntro}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/care-kits#donate" className="donation-back-link" style={styles.backLink}>
                <ArrowLeft size={16} strokeWidth={2.5} />
                Back to Care Kits
              </Link>
              <h1 style={styles.title}>Donate an Educational Kit.</h1>
              <p style={styles.lead}>
                Choose how many kits to fund, then complete your donation securely on this page.
                Each kit is packed by volunteers and delivered through local care partners in the
                Greater Toronto Area.
              </p>
              <div style={styles.heroMetaRow}>
                <span style={styles.heroMetaPill}>$6 CAD per kit</span>
                <span style={styles.heroMetaPill}>Packed by volunteers</span>
                <span style={styles.heroMetaPill}>Delivered through partners</span>
              </div>
            </motion.div>
          </div>

          <div className="donation-grid" style={styles.donationGrid}>
            <motion.aside
              className="donation-summary-card"
              style={styles.summaryCard}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={styles.cardTop}>
                <div>
                  <span style={styles.cardLabel}>Current kit</span>
                  <h2 style={styles.kitTitle}>Educational Kit</h2>
                </div>
              </div>

              <div style={styles.priceRow}>
                <span style={styles.price}>${KIT_PRICE}</span>
                <span style={styles.priceMeta}>CAD / kit</span>
              </div>

              <p style={styles.cardCopy}>
                Built for everyday classroom learning: writing tools, paper supplies, creative
                materials, and small essentials a student can use immediately.
              </p>

              <div style={styles.quantityBlock}>
                <span style={styles.quantityLabel}>Number of kits</span>
                <div style={styles.quantityControls}>
                  <button
                    type="button"
                    onClick={decrement}
                    className="donation-qty-button"
                    style={styles.qtyButton}
                    aria-label="Decrease kits"
                  >
                    <Minus size={16} />
                  </button>
                  <span style={styles.qtyValue}>{quantity}</span>
                  <button
                    type="button"
                    onClick={increment}
                    className="donation-qty-button"
                    style={styles.qtyButton}
                    aria-label="Increase kits"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div style={styles.totalRow}>
                <span>Total donation</span>
                <strong>
                  ${total} CAD
                  {checkoutPending && !completedSession ? (
                    <span style={styles.totalPending}> · updating payment</span>
                  ) : null}
                </strong>
              </div>

              <ul style={styles.itemGrid}>
                {KIT_ITEMS.map((item) => (
                  <li key={item} style={styles.item}>
                    <Check size={15} strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.aside>

            <motion.div
              style={styles.paymentCard}
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            >
              {completedSession ? (
                <div style={styles.successBox}>
                  <Heart size={30} fill="#57A018" color="#57A018" />
                  <h2 style={styles.successTitle}>Thank you for donating.</h2>
                  <p style={styles.successText}>
                    Your Educational Kit donation has been received. A child’s next chapter starts
                    with the supplies you helped provide.
                  </p>
                </div>
              ) : (
                <>
                  <div style={styles.paymentHeader}>
                    <div>
                      <span style={styles.cardLabel}>Secure payment</span>
                      <h2 style={styles.paymentTitle}>Complete your donation</h2>
                    </div>
                  </div>
                  <EmbeddedCheckout quantity={checkoutQuantity} />
                </>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    background: '#FFFFFF',
    color: '#1A1A1A',
  },
  main: {
    paddingTop: 'clamp(96px, 12vw, 126px)',
    position: 'relative',
    zIndex: 1,
  },
  heroShell: {
    maxWidth: 1120,
    margin: '0 auto 44px',
    padding: '0 24px',
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 760px)',
    gap: 0,
    alignItems: 'stretch',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.88rem',
    color: '#1A3A6B',
    textDecoration: 'none',
    border: '1px solid rgba(26,58,107,0.16)',
    background: '#FFFFFF',
    borderRadius: 4,
    padding: '10px 14px',
    boxShadow: '0 8px 24px rgba(26,58,107,0.08)',
  },
  heroIntro: {
    position: 'relative',
    zIndex: 2,
    padding: '12px 0',
  },
  eyebrow: {
    display: 'block',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: '0.72rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: '#0099D6',
    marginBottom: 16,
  },
  title: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 850,
    fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
    lineHeight: 1.02,
    letterSpacing: '-0.045em',
    maxWidth: 720,
    margin: 0,
    color: '#1A1A1A',
  },
  lead: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 'clamp(1rem, 1.35vw, 1.12rem)',
    lineHeight: 1.75,
    color: '#4B5563',
    maxWidth: 640,
    margin: '18px 0 0',
  },
  heroMetaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 24,
  },
  heroMetaPill: {
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: 40,
    padding: '0 14px',
    borderRadius: 4,
    border: '1px solid rgba(26,58,107,0.14)',
    background: '#FFFFFF',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#1A1A1A',
    boxShadow: '0 8px 20px rgba(26,58,107,0.06)',
  },
  donationSection: {
    padding: '0 0 clamp(82px, 10vw, 132px)',
  },
  donationGrid: {
    maxWidth: 1120,
    margin: '0 auto',
    padding: '0 24px',
    display: 'grid',
    gridTemplateColumns: 'minmax(300px, 0.86fr) minmax(360px, 1.14fr)',
    gap: 28,
    alignItems: 'start',
  },
  summaryCard: {
    borderRadius: 6,
    background: '#FFFFFF',
    border: '1px solid rgba(26,58,107,0.12)',
    boxShadow: '0 18px 48px rgba(26,58,107,0.12)',
    padding: 'clamp(24px, 3vw, 34px)',
    position: 'sticky',
    top: 184,
  },
  cardTop: {
    display: 'flex',
    gap: 16,
    alignItems: 'flex-start',
  },
  cardLabel: {
    display: 'block',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: '0.68rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#8A94A6',
  },
  kitTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '1.45rem',
    lineHeight: 1.1,
    margin: '5px 0 0',
    color: '#1A1A1A',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 9,
    marginTop: 30,
    paddingBottom: 22,
    borderBottom: '1px solid rgba(26,58,107,0.10)',
  },
  price: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 900,
    fontSize: '3.4rem',
    lineHeight: 1,
    color: '#1A3A6B',
    letterSpacing: '-0.06em',
  },
  priceMeta: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '0.82rem',
    textTransform: 'uppercase',
    color: '#64748B',
  },
  cardCopy: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.98rem',
    lineHeight: 1.72,
    color: '#4B5563',
    margin: '22px 0',
  },
  quantityBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: '16px 0',
    borderTop: '1px solid rgba(26,58,107,0.10)',
    borderBottom: '1px solid rgba(26,58,107,0.10)',
  },
  quantityLabel: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    color: '#1A1A1A',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(26,58,107,0.16)',
    borderRadius: 6,
    overflow: 'hidden',
    background: '#F8FAFC',
  },
  qtyButton: {
    width: 38,
    height: 38,
    border: 'none',
    background: 'transparent',
    color: '#1A3A6B',
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
    transition: 'background 0.2s ease',
  },
  qtyValue: {
    minWidth: 42,
    textAlign: 'center',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 850,
    color: '#1A1A1A',
  },
  totalRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: '18px 0 8px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: '#1A1A1A',
  },
  totalPending: {
    fontWeight: 650,
    fontSize: '0.78rem',
    color: '#64748B',
    letterSpacing: 0,
  },
  itemGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 10,
    marginTop: 22,
    padding: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.92rem',
    color: '#4B5563',
  },
  paymentCard: {
    borderRadius: 6,
    background: '#FFFFFF',
    border: '1px solid rgba(26,58,107,0.12)',
    boxShadow: '0 18px 48px rgba(26,58,107,0.12)',
    padding: 'clamp(20px, 3vw, 30px)',
    minHeight: 640,
  },
  paymentHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 22,
  },
  paymentTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 850,
    fontSize: 'clamp(1.35rem, 2vw, 1.85rem)',
    lineHeight: 1.1,
    color: '#1A3A6B',
    margin: '6px 0 0',
    letterSpacing: '-0.035em',
    whiteSpace: 'nowrap',
  },
  checkoutShell: {
    position: 'relative',
    minHeight: 520,
  },
  checkoutLoading: {
    minHeight: 260,
    display: 'grid',
    placeItems: 'center',
    gap: 10,
    color: '#64748B',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 750,
  },
  spinIcon: {
    animation: 'stripeSpin 0.85s linear infinite',
  },
  errorBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    padding: 18,
    borderRadius: 8,
    background: 'rgba(238,48,147,0.08)',
    color: '#9F1239',
    fontFamily: "'Inter', sans-serif",
    lineHeight: 1.5,
  },
  embeddedCheckout: {
    width: '100%',
  },
  successBox: {
    minHeight: 520,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: 16,
    padding: 24,
  },
  successTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 850,
    fontSize: 'clamp(1.8rem, 3vw, 2.7rem)',
    lineHeight: 1.05,
    color: '#1A3A6B',
    margin: 0,
    letterSpacing: '-0.04em',
  },
  successText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    lineHeight: 1.7,
    color: '#4B5563',
    maxWidth: 520,
    margin: 0,
  },
}
