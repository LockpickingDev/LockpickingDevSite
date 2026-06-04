import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const W = 1200
const H = 630

function textOverlay({ opacity = 0, lines }) {
  const textRows = lines.map(({ x = 80, y, size, color, weight, text }) => `
    <text x="${x}" y="${y}" font-family="monospace" font-size="${size}" font-weight="${weight ?? 'normal'}" fill="${color}">${text}</text>
  `).join('')

  return Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="#0a0f0f" opacity="${opacity}"/>
      <rect x="0" y="0" width="6" height="${H}" fill="#00e5ff"/>
      ${textRows}
    </svg>
  `)
}

// Photo-background OG images (Prints, Lockpicks)
const photoImages = [
  {
    src: 'public/3dprinting/3dPrintsHeroImage.JPG',
    out: 'public/brand/og-prints.png',
    opacity: 0.62,
    lines: [
      { y: 220, size: 16, color: '#00e5ff', text: 'lockpicking.dev' },
      { y: 310, size: 64, color: '#ffffff', weight: 'bold', text: '3D Prints' },
      { y: 390, size: 28, color: '#00e5ff', text: 'Lock display stands, pick handles &amp; tools' },
      { y: 440, size: 22, color: '#bbbbbb', text: 'Free STL files - 22 models' },
    ],
  },
  {
    src: 'public/mycustompicks/LockpicksPageOGPhoto.JPG',
    out: 'public/brand/og-lockpicks.png',
    opacity: 0.45,
    lines: [
      { y: 220, size: 16, color: '#00e5ff', text: 'lockpicking.dev' },
      { y: 310, size: 64, color: '#ffffff', weight: 'bold', text: 'Lockpicks' },
      { y: 390, size: 28, color: '#00e5ff', text: '100+ handmade custom picks' },
      { y: 440, size: 22, color: '#bbbbbb', text: '5 years making picks - shipped to collectors worldwide' },
    ],
  },
]

// Circuit trace SVG overlay — mirrors the D25 business card background (seeded RNG, 32px grid)
function circuitTracesSVG(w, h) {
  const grid = 32
  let s = 73
  function rng() { s = ((s * 1664525 + 1013904223) >>> 0); return s / 0xFFFFFFFF }

  const els = []

  // Top-left radial glow (matches d5f .glow-tl)
  els.push(`<defs><radialGradient id="g" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(420)"><stop offset="0%" stop-color="#00e5ff" stop-opacity="0.10"/><stop offset="100%" stop-color="#00e5ff" stop-opacity="0"/></radialGradient></defs>`)
  els.push(`<rect width="${w}" height="${h}" fill="url(#g)"/>`)

  // Horizontal segments
  for (let gy = grid; gy <= h - grid; gy += grid) {
    let x = 0
    while (x < w) {
      const segW = (Math.floor(rng() * 4) + 1) * grid
      if (rng() < 0.62) els.push(`<line x1="${x}" y1="${gy}" x2="${Math.min(x + segW, w)}" y2="${gy}" stroke="#00e5ff" stroke-opacity="0.20" stroke-width="1.5" stroke-linecap="round"/>`)
      x += segW + (rng() < 0.35 ? grid : 0)
    }
  }

  // Vertical segments
  for (let gx = grid; gx <= w - grid; gx += grid) {
    let y = 0
    while (y < h) {
      const segH = (Math.floor(rng() * 3) + 1) * grid
      if (rng() < 0.50) els.push(`<line x1="${gx}" y1="${y}" x2="${gx}" y2="${Math.min(y + segH, h)}" stroke="#00e5ff" stroke-opacity="0.20" stroke-width="1.5" stroke-linecap="round"/>`)
      y += segH + (rng() < 0.3 ? grid : 0)
    }
  }

  // Node dots
  for (let nx = grid; nx < w; nx += grid) {
    for (let ny = grid; ny < h; ny += grid) {
      if (rng() < 0.16) els.push(`<circle cx="${nx}" cy="${ny}" r="3" fill="#00e5ff" fill-opacity="0.40"/>`)
    }
  }

  return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${els.join('')}</svg>`)
}

// Logo + text OG images (Home, Resources)
const logoImages = [
  {
    out: 'public/brand/og-home.png',
    circuit: true,
    lines: [
      { x: 430, y: 210, size: 16, color: '#00e5ff', text: 'lockpicking.dev' },
      { x: 430, y: 300, size: 58, color: '#ffffff', weight: 'bold', text: 'LockpickingDev' },
      { x: 430, y: 375, size: 26, color: '#00e5ff', text: 'Lockpicking Lessons &amp; Events' },
      { x: 430, y: 425, size: 20, color: '#bbbbbb', text: 'Private lessons · Workshops · Conventions' },
      { x: 430, y: 470, size: 20, color: '#bbbbbb', text: 'St. Louis, MO · Groups of 5–500' },
    ],
  },
  {
    out: 'public/brand/og-resources.png',
    circuit: true,
    lines: [
      { x: 430, y: 210, size: 16, color: '#00e5ff', text: 'lockpicking.dev' },
      { x: 430, y: 300, size: 58, color: '#ffffff', weight: 'bold', text: 'Resources' },
      { x: 430, y: 375, size: 26, color: '#00e5ff', text: 'Gear, Creators &amp; Videos' },
      { x: 430, y: 425, size: 20, color: '#bbbbbb', text: 'Curated recommendations from LockpickingDev' },
      { x: 430, y: 470, size: 20, color: '#bbbbbb', text: 'Picks worth buying · Channels worth following' },
    ],
  },
]

// Generate photo-background images
for (const { src, out, opacity, lines } of photoImages) {
  await sharp(path.join(root, src))
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .composite([{ input: textOverlay({ opacity, lines }), blend: 'over' }])
    .png()
    .toFile(path.join(root, out))
  console.log(`  generated: ${out}`)
}

// Generate logo + text images
const logoPath = path.join(root, 'public/brand/Logo-PNG-square.png')
const LOGO_SIZE = 280

const logoResized = await sharp(logoPath)
  .resize(LOGO_SIZE, LOGO_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()

for (const { out, lines, circuit } of logoImages) {
  const bg = circuit ? { r: 6, g: 10, b: 14, alpha: 255 } : { r: 10, g: 15, b: 15, alpha: 255 }
  const composites = [
    ...(circuit ? [{ input: circuitTracesSVG(W, H), blend: 'over' }] : []),
    { input: logoResized, left: 80, top: Math.round((H - LOGO_SIZE) / 2) },
    { input: textOverlay({ opacity: 0, lines }), blend: 'over' },
  ]
  await sharp({ create: { width: W, height: H, channels: 4, background: bg } })
    .composite(composites)
    .png()
    .toFile(path.join(root, out))
  console.log(`  generated: ${out}`)
}

console.log('OG image generation complete.')
