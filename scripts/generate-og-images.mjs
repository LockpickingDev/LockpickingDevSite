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

// Logo + text OG images (Home, Resources)
const logoImages = [
  {
    out: 'public/brand/og-home.png',
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

for (const { out, lines } of logoImages) {
  await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 10, g: 15, b: 15, alpha: 255 } },
  })
    .composite([
      // Logo centered vertically on the left side
      { input: logoResized, left: 80, top: Math.round((H - LOGO_SIZE) / 2) },
      // Border + text overlay
      { input: textOverlay({ opacity: 0, lines }), blend: 'over' },
    ])
    .png()
    .toFile(path.join(root, out))
  console.log(`  generated: ${out}`)
}

console.log('OG image generation complete.')
