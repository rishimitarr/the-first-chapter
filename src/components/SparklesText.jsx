import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// SparklesText — drop-in inline span that renders the given text with
// brand-colored sparkles drifting around it. Inherits parent typography
// by default; pass `textStyle` to color/style the inner text.
export default function SparklesText({
  text,
  colors = { first: '#6B2D8B', second: '#FBB040' },
  count = 10,
  style,
  textStyle,
}) {
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    const generate = () => ({
      id: `${Math.random().toString(36).slice(2)}-${Date.now()}`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      color: Math.random() > 0.5 ? colors.first : colors.second,
      delay: Math.random() * 2,
      scale: Math.random() * 1 + 0.3,
      lifespan: Math.random() * 10 + 5,
    })
    setSparkles(Array.from({ length: count }, generate))
    const id = setInterval(() => {
      setSparkles((cur) =>
        cur.map((s) =>
          s.lifespan <= 0 ? generate() : { ...s, lifespan: s.lifespan - 0.1 }
        )
      )
    }, 100)
    return () => clearInterval(id)
  }, [colors.first, colors.second, count])

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        ...style,
      }}
    >
      {sparkles.map((s) => (
        <Sparkle key={s.id} {...s} />
      ))}
      <strong
        style={{
          position: 'relative',
          zIndex: 1,
          fontWeight: 'inherit',
          fontStyle: 'normal',
          ...textStyle,
        }}
      >
        {text}
      </strong>
    </span>
  )
}

function Sparkle({ id, x, y, color, delay, scale }) {
  return (
    <motion.svg
      key={id}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 20,
        left: x,
        top: y,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, scale, 0],
        rotate: [75, 120, 150],
      }}
      transition={{ duration: 0.8, repeat: Infinity, delay }}
      width="21"
      height="21"
      viewBox="0 0 21 21"
    >
      <path
        d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
        fill={color}
      />
    </motion.svg>
  )
}
