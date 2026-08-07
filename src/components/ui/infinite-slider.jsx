import { useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import useMeasure from 'react-use-measure'

let instanceCount = 0

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
}) {
  const [ref, { width, height }] = useMeasure()
  const wrapperRef = useRef(null)
  const isInView = useInView(wrapperRef, { once: false, margin: '0px 0px -60px 0px' })
  const [isPaused, setIsPaused] = useState(false)
  const [animName] = useState(() => `inf-slider-${++instanceCount}-scroll`)

  const size = direction === 'horizontal' ? width : height
  const contentSize = size + gap
  const translateAmount = -contentSize / 2

  const keyframes =
    direction === 'horizontal'
      ? `@keyframes ${animName} { from { transform: translateX(0); } to { transform: translateX(${translateAmount}px); } }`
      : `@keyframes ${animName} { from { transform: translateY(0); } to { transform: translateY(${translateAmount}px); } }`

  const shouldAnimate = isInView && width > 0

  return (
    <div
      ref={wrapperRef}
      style={{ overflow: 'hidden', width: '100%' }}
    >
      <style>{keyframes}</style>
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          width: 'max-content',
          gap: `${gap}px`,
          animationName: shouldAnimate ? animName : 'none',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: reverse ? 'reverse' : 'normal',
          animationPlayState: isPaused ? 'paused' : 'running',
          opacity: shouldAnimate ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
        onMouseEnter={() => durationOnHover && setIsPaused(true)}
        onMouseLeave={() => durationOnHover && setIsPaused(false)}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
