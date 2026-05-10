// Convert kit-frames JPGs to transparent WebP.
// 1) Paint white over "Veo" watermark in bottom-right.
// 2) Threshold-based mask: near-white pixels -> transparent, soft alpha falloff
//    near the threshold band so the cutout edges stay clean.

import sharp from 'sharp'
import { readdirSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const SRC = 'public/kit-frames'
const OUT = 'public/kit-frames-webp'
const HARD = 232   // >= this in all channels = full transparent
const SOFT = 195   // SOFT..HARD = ramp alpha
const SAT  = 26    // max channel spread to count as "near gray-white"
const ALPHA_FLOOR = 38 // anything dimmer than this snaps to fully transparent

// Watermark erase rect (bottom-right). Source is 1920x1080.
const WM_W = 280
const WM_H = 110
const WM_RIGHT_INSET = 0
const WM_BOTTOM_INSET = 0

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })

const files = readdirSync(SRC).filter(f => f.endsWith('.jpg')).sort()
console.log(`Processing ${files.length} frames...`)

let done = 0
const start = Date.now()

for (const f of files) {
  const inPath = join(SRC, f)
  const outName = f.replace(/\.jpg$/, '.webp')
  const outPath = join(OUT, outName)

  const meta = await sharp(inPath).metadata()
  const W = meta.width
  const H = meta.height

  const wmLeft = Math.max(0, W - WM_W - WM_RIGHT_INSET)
  const wmTop  = Math.max(0, H - WM_H - WM_BOTTOM_INSET)

  // Materialize as RGBA buffer.
  const composed = await sharp(inPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { data, info } = composed
  const { width, height, channels } = info

  // 1) Pixel-wise alpha threshold for white -> transparent, with a hard
  //    alpha floor so faint near-white residue doesn't ghost a rectangle
  //    under the kit when drop-shadow renders.
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const spread = max - min
    let a = data[i + 3]
    if (max >= HARD && spread <= SAT) {
      a = 0
    } else if (max >= SOFT && spread <= SAT) {
      const t = (max - SOFT) / (HARD - SOFT)
      a = Math.round((1 - t) * 255)
    }
    if (a < ALPHA_FLOOR) a = 0
    data[i + 3] = a
  }

  // 2) Feathered erase in the Veo watermark region. Hard-zero alpha
  //    inside the inner rect; ramp alpha down to 0 across a feather band
  //    so any surrounding non-stripped surface pixels dissolve smoothly
  //    into the erase area instead of revealing a rectangular cutout.
  const FEATHER = 70
  const innerL = wmLeft
  const innerT = wmTop
  const innerR = Math.min(width, wmLeft + WM_W)
  const innerB = Math.min(height, wmTop + WM_H)
  const outerL = Math.max(0, innerL - FEATHER)
  const outerT = Math.max(0, innerT - FEATHER)
  const outerR = Math.min(width, innerR + FEATHER)
  const outerB = Math.min(height, innerB + FEATHER)
  for (let y = outerT; y < outerB; y++) {
    const row = y * width * channels
    for (let x = outerL; x < outerR; x++) {
      const dx = x < innerL ? innerL - x : x >= innerR ? x - innerR + 1 : 0
      const dy = y < innerT ? innerT - y : y >= innerB ? y - innerB + 1 : 0
      const d = Math.max(dx, dy)
      const idx = row + x * channels + 3
      if (d === 0) {
        data[idx] = 0
      } else if (d < FEATHER) {
        const f = d / FEATHER
        // Smoothstep so the falloff is curved, not linear.
        const s = f * f * (3 - 2 * f)
        data[idx] = Math.round(data[idx] * s)
      }
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .webp({ quality: 92, alphaQuality: 98, effort: 6 })
    .toFile(outPath)

  done++
  if (done % 20 === 0 || done === files.length) {
    const sec = ((Date.now() - start) / 1000).toFixed(1)
    console.log(`  ${done}/${files.length}  (${sec}s)`)
  }
}

console.log('Done.')
