import { readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { deflateSync, inflateSync } from 'node:zlib'

const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
const ITEMS_DIR = 'public/kit-items'
const FILES = [
  'pencils.png',
  'crayons.png',
  'glue-stick.png',
  'ruler.png',
  'sharpener.png',
]

const crcTable = new Uint32Array(256)
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  crcTable[n] = c >>> 0
}

const crc32 = (buf) => {
  let c = 0xffffffff
  for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

const chunk = (type, data = Buffer.alloc(0)) => {
  const name = Buffer.from(type)
  const out = Buffer.alloc(12 + data.length)
  out.writeUInt32BE(data.length, 0)
  name.copy(out, 4)
  data.copy(out, 8)
  out.writeUInt32BE(crc32(Buffer.concat([name, data])), 8 + data.length)
  return out
}

const paeth = (a, b, c) => {
  const p = a + b - c
  const pa = Math.abs(p - a)
  const pb = Math.abs(p - b)
  const pc = Math.abs(p - c)
  if (pa <= pb && pa <= pc) return a
  if (pb <= pc) return b
  return c
}

const readPng = (path) => {
  const png = readFileSync(path)
  if (!png.subarray(0, 8).equals(PNG_SIG)) throw new Error(`${path} is not a PNG`)

  let width = 0
  let height = 0
  let bitDepth = 0
  let colorType = 0
  const idat = []

  for (let off = 8; off < png.length;) {
    const len = png.readUInt32BE(off)
    const type = png.subarray(off + 4, off + 8).toString('ascii')
    const data = png.subarray(off + 8, off + 8 + len)
    if (type === 'IHDR') {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      bitDepth = data[8]
      colorType = data[9]
      if (data[12] !== 0) throw new Error(`${path} is interlaced; unsupported`)
    } else if (type === 'IDAT') {
      idat.push(data)
    }
    off += 12 + len
  }

  if (bitDepth !== 8 || ![2, 6].includes(colorType)) {
    throw new Error(`${path} must be 8-bit RGB or RGBA`)
  }

  const srcChannels = colorType === 6 ? 4 : 3
  const stride = width * srcChannels
  const inflated = inflateSync(Buffer.concat(idat))
  const rgba = Buffer.alloc(width * height * 4)
  let src = 0
  let prev = Buffer.alloc(stride)

  for (let y = 0; y < height; y++) {
    const filter = inflated[src++]
    const row = Buffer.from(inflated.subarray(src, src + stride))
    src += stride

    for (let x = 0; x < stride; x++) {
      const left = x >= srcChannels ? row[x - srcChannels] : 0
      const up = prev[x]
      const upLeft = x >= srcChannels ? prev[x - srcChannels] : 0
      if (filter === 1) row[x] = (row[x] + left) & 255
      else if (filter === 2) row[x] = (row[x] + up) & 255
      else if (filter === 3) row[x] = (row[x] + Math.floor((left + up) / 2)) & 255
      else if (filter === 4) row[x] = (row[x] + paeth(left, up, upLeft)) & 255
      else if (filter !== 0) throw new Error(`${path} has unknown PNG filter ${filter}`)
    }

    for (let x = 0; x < width; x++) {
      const srcIdx = x * srcChannels
      const dstIdx = (y * width + x) * 4
      rgba[dstIdx] = row[srcIdx]
      rgba[dstIdx + 1] = row[srcIdx + 1]
      rgba[dstIdx + 2] = row[srcIdx + 2]
      rgba[dstIdx + 3] = srcChannels === 4 ? row[srcIdx + 3] : 255
    }
    prev = row
  }

  return { width, height, rgba }
}

const writePng = (path, { width, height, rgba }) => {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6

  const raw = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y++) {
    const dst = y * (width * 4 + 1)
    raw[dst] = 0
    rgba.copy(raw, dst + 1, y * width * 4, (y + 1) * width * 4)
  }

  writeFileSync(path, Buffer.concat([
    PNG_SIG,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND'),
  ]))
}

const isBorderBg = (rgba, idx) => {
  const r = rgba[idx]
  const g = rgba[idx + 1]
  const b = rgba[idx + 2]
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  return max >= 232 && max - min <= 34
}

const softenBackground = (image) => {
  const { width, height, rgba } = image
  const size = width * height
  const bg = new Uint8Array(size)
  const queue = []

  const push = (x, y) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return
    const p = y * width + x
    if (bg[p]) return
    if (!isBorderBg(rgba, p * 4)) return
    bg[p] = 1
    queue.push(p)
  }

  for (let x = 0; x < width; x++) {
    push(x, 0)
    push(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    push(0, y)
    push(width - 1, y)
  }

  for (let i = 0; i < queue.length; i++) {
    const p = queue[i]
    const x = p % width
    const y = Math.floor(p / width)
    push(x + 1, y)
    push(x - 1, y)
    push(x, y + 1)
    push(x, y - 1)
  }

  const feather = new Uint8Array(size)
  const radius = 2
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x
      if (!bg[p]) continue
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx
          const ny = y + dy
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue
          feather[ny * width + nx] = Math.max(feather[ny * width + nx], radius + 1 - Math.max(Math.abs(dx), Math.abs(dy)))
        }
      }
    }
  }

  for (let p = 0; p < size; p++) {
    const idx = p * 4
    if (bg[p]) {
      rgba[idx + 3] = 0
    } else if (feather[p]) {
      const edge = feather[p] / (radius + 1)
      rgba[idx] = Math.round(rgba[idx] * (1 - edge * 0.18) + 255 * edge * 0.18)
      rgba[idx + 1] = Math.round(rgba[idx + 1] * (1 - edge * 0.18) + 255 * edge * 0.18)
      rgba[idx + 2] = Math.round(rgba[idx + 2] * (1 - edge * 0.18) + 255 * edge * 0.18)
      rgba[idx + 3] = Math.round(rgba[idx + 3] * (1 - edge * 0.18))
    }
  }

  return image
}

for (const file of FILES) {
  const path = join(ITEMS_DIR, file)
  const image = softenBackground(readPng(path))
  writePng(path, image)
  console.log(`cleaned ${basename(path)}`)
}
