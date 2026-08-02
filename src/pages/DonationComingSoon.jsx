import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Loader2, Minus, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import DonationKitCard from '../components/DonationKitCard'

const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || import.meta.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

const KIT_PRICE = 6

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
  const total = quantity * KIT_PRICE
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
                <span style={styles.heroMetaPill}>Shared through local outreach</span>
              </div>
            </motion.div>
          </div>

<<<<<<< Updated upstream
            <div className="donation-grid" style={styles.donationGrid}>
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {
                /* Replace the white summary card with the colorful donation card */
              }
              <DonationKitCard
                kit={{
                  name: 'Educational Kit',
                  background: 'linear-gradient(155deg, #0099D6 0%, #0099D6 100%)',
                  shadow: '0 14px 38px rgba(0,153,214,0.22)',
                  copy: 'Built for everyday classroom learning: writing tools, paper supplies, creative materials, and small essentials a student can use immediately.',
                  items: KIT_ITEMS,
                  href: '/donate',
                  comingSoon: false,
                }}
              />
            </motion.div>

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                        <h2 style={styles.paymentTitle}>Complete your donation</h2>
                      </div>
=======
                      <h2 style={styles.paymentTitle}>Complete your donation</h2>
                      <p style={styles.paymentCopy}>
                        Choose the number of kits you want to fund, then review the total before
                        payment loads.
                      </p>
                    </div>
                    <div style={styles.totalBadge}>
                      <span style={styles.totalBadgeLabel}>Total</span>
                      <strong style={styles.totalBadgeValue}>
                        ${total} CAD
                        {checkoutPending ? <span style={styles.totalPending}> updating</span> : null}
                      </strong>
                    </div>
>>>>>>> Stashed changes
                  </div>

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
  paymentCard: {
    borderRadius: 6,
    background: '#FFFFFF',
    border: '1px solid rgba(26,58,107,0.12)',
    boxShadow: '0 18px 48px rgba(26,58,107,0.12)',
    padding: 'clamp(24px, 4vw, 40px)',
    minHeight: 760,
    maxWidth: 1120,
    margin: '0 auto',
    width: 'calc(100% - 48px)',
  },
  paymentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 22,
    alignItems: 'flex-start',
  },
  paymentCopy: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.98rem',
    lineHeight: 1.7,
    color: '#4B5563',
    margin: '10px 0 0',
    maxWidth: 640,
  },
  paymentTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 850,
    fontSize: 'clamp(1.35rem, 2vw, 1.85rem)',
    lineHeight: 1.1,
    color: '#1A1A1A',
    margin: '6px 0 0',
    letterSpacing: '-0.035em',
  },
  totalBadge: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-end',
    padding: '14px 16px',
    borderRadius: 6,
    background: '#F8FAFC',
    border: '1px solid rgba(26,58,107,0.10)',
    minWidth: 160,
  },
  totalBadgeLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#8A94A6',
  },
  totalBadgeValue: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '1.15rem',
    fontWeight: 850,
    color: '#1A1A1A',
    whiteSpace: 'nowrap',
  },
  checkoutShell: {
    position: 'relative',
    minHeight: 560,
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
