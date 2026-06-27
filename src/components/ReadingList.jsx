import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const NAVY = '#1A3A6B'
const CHARCOAL = '#1A1A1A'

const todayKey = () => new Date().toISOString().slice(0, 10)
const feedCacheKey = () => `tfc-home-reading-real-news-v2-${todayKey()}`
const isGenericNewsImage = (image = '') =>
  image.includes('lh3.googleusercontent.com/J6_coFbog') || image.includes('news.google.com')

const hasCleanArticleImages = (items = []) =>
  items.length > 0 && items.every((story) => story.image && !isGenericNewsImage(story.image))

export default function ReadingList() {
  const [stories, setStories] = useState([])
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const cacheKey = feedCacheKey()
    const cached = localStorage.getItem(cacheKey)

    if (cached) {
      const parsed = JSON.parse(cached)
      if (hasCleanArticleImages(parsed)) {
        const frame = requestAnimationFrame(() => {
          if (cancelled) return
          setStories(parsed)
          setLoading(false)
        })
        return () => {
          cancelled = true
          cancelAnimationFrame(frame)
        }
      }
      localStorage.removeItem(cacheKey)
    }

    fetch('/api/reading-list')
      .then((res) => {
        if (!res.ok) throw new Error('Reading list failed')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const items = Array.isArray(data.stories) ? data.stories : []
        const cleanItems = items.filter((story) => story.image && !isGenericNewsImage(story.image))
        setStories(cleanItems)
        setLoading(false)
        if (cleanItems.length > 0) localStorage.setItem(cacheKey, JSON.stringify(cleanItems))
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (stories.length === 0) return undefined
    const id = setInterval(() => {
      setActive((current) => (current + 1) % stories.length)
    }, 6500)
    return () => clearInterval(id)
  }, [stories.length])

  const story = stories[active]
  const go = (direction) => {
    if (stories.length === 0) return
    setActive((current) => (current + direction + stories.length) % stories.length)
  }

  return (
    <section id="reading" style={styles.section}>
      <div className="container">
        <div style={styles.header}>
          <h2 style={styles.title}>Reading List</h2>
          <p style={styles.intro}>
            A rotating set of articles about children, education, health, and belonging.
            The goal is to keep this page connected to the real issues children are facing now.
          </p>
        </div>

        <div style={styles.carouselShell} className="about-carousel-shell">
          <button style={styles.carouselButton} onClick={() => go(-1)} aria-label="Previous article">
            <ChevronLeft size={22} />
          </button>

          <div style={styles.storyViewport}>
            {loading || !story ? (
              <div style={styles.storyEmpty}>
                {loading ? 'Loading articles...' : 'Articles are unavailable right now.'}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.article
                  key={`${story.title}-${active}`}
                  style={styles.storyCard}
                  className="about-story-card"
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <div style={styles.storyImageWrap} className="about-image-card">
                    <img src={story.image} alt="" aria-hidden="true" style={styles.storyImage} />
                  </div>
                  <div style={styles.storyContent}>
                    <h3 style={styles.storyTitle}>{story.title}</h3>
                    <a href={story.link} target="_blank" rel="noreferrer" style={styles.storyLink}>
                      Read article <ExternalLink size={15} />
                    </a>
                  </div>
                </motion.article>
              </AnimatePresence>
            )}
          </div>

          <button style={styles.carouselButton} onClick={() => go(1)} aria-label="Next article">
            <ChevronRight size={22} />
          </button>
        </div>

        <div style={styles.carouselFooter}>
          <span />
          <div style={styles.dots}>
            {stories.map((item, index) => (
              <button
                key={`${item.title}-${index}`}
                aria-label={`Show article ${index + 1}`}
                onClick={() => setActive(index)}
                style={{ ...styles.dot, background: index === active ? NAVY : 'rgba(26,58,107,0.18)' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: { padding: '82px 0 92px', background: '#F5F3EF' },
  header: { display: 'block', maxWidth: 760, marginBottom: 30 },
  title: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 750,
    fontSize: 'clamp(1.9rem, 3vw, 2.55rem)',
    lineHeight: 1.12,
    letterSpacing: '-0.015em',
    margin: 0,
    color: CHARCOAL,
  },
  intro: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    lineHeight: 1.75,
    color: '#555',
    margin: '14px 0 0',
  },
  carouselShell: {
    display: 'grid',
    gridTemplateColumns: '48px 1fr 48px',
    gap: 18,
    alignItems: 'stretch',
  },
  carouselButton: {
    border: '1px solid rgba(26,58,107,0.18)',
    borderRadius: 4,
    background: '#fff',
    color: NAVY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  storyViewport: { minHeight: 270, overflow: 'hidden' },
  storyCard: {
    minHeight: 270,
    background: '#fff',
    borderRadius: 6,
    padding: 0,
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    border: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: '0.42fr 0.58fr',
  },
  storyEmpty: {
    minHeight: 270,
    background: '#fff',
    borderRadius: 6,
    border: '1px solid rgba(0,0,0,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    color: '#666',
  },
  storyImageWrap: {
    position: 'relative',
    minHeight: 270,
    background: '#E9ECEF',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  storyContent: {
    padding: '34px 36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  storyTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 750,
    fontSize: 'clamp(1.25rem, 2vw, 1.7rem)',
    lineHeight: 1.2,
    margin: '0 0 22px',
  },
  storyLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: '0.88rem',
    color: NAVY,
  },
  carouselFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 18,
    alignItems: 'center',
    marginTop: 18,
  },
  dots: { display: 'flex', gap: 8 },
  dot: {
    width: 9,
    height: 9,
    borderRadius: '50%',
    border: 0,
    cursor: 'pointer',
  },
}
