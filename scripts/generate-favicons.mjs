import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const src = path.join(root, 'public/brand/Logo-PNG-square.png')
const out = (name) => path.join(root, 'public/brand', name)

const DARK_BG = { r: 8, g: 12, b: 16, alpha: 255 }

// PNG favicon sizes
const pngSizes = [
  { name: 'favicon-16x16.png',        size: 16,  bg: null     },
  { name: 'favicon-32x32.png',        size: 32,  bg: null     },
  { name: 'apple-touch-icon.png',     size: 180, bg: DARK_BG  },
  { name: 'android-chrome-192x192.png', size: 192, bg: DARK_BG },
  { name: 'android-chrome-512x512.png', size: 512, bg: DARK_BG },
]

for (const { name, size, bg } of pngSizes) {
  await sharp(src)
    .resize(size, size, { fit: 'contain', background: bg ?? { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(out(name))
  console.log(`  generated: ${name}`)
}

// Generate favicon.ico embedding 16x16 and 32x32 PNG images
// Uses the PNG-in-ICO format supported by all modern browsers + Windows Vista+
async function buildIco(sizes) {
  const images = await Promise.all(
    sizes.map(async (size) => {
      const buf = await sharp(src)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer()
      return buf
    })
  )

  const ICO_HEADER = 6
  const DIR_ENTRY = 16
  const headerSize = ICO_HEADER + DIR_ENTRY * images.length

  const header = Buffer.alloc(ICO_HEADER)
  header.writeUInt16LE(0, 0)       // reserved
  header.writeUInt16LE(1, 2)       // type: 1 = ICO
  header.writeUInt16LE(images.length, 4)

  const dirs = []
  let offset = headerSize
  for (let i = 0; i < images.length; i++) {
    const size = sizes[i]
    const dir = Buffer.alloc(DIR_ENTRY)
    dir.writeUInt8(size === 256 ? 0 : size, 0)  // width
    dir.writeUInt8(size === 256 ? 0 : size, 1)  // height
    dir.writeUInt8(0, 2)                         // color count
    dir.writeUInt8(0, 3)                         // reserved
    dir.writeUInt16LE(1, 4)                      // planes
    dir.writeUInt16LE(32, 6)                     // bit count
    dir.writeUInt32LE(images[i].length, 8)       // size of image data
    dir.writeUInt32LE(offset, 12)                // offset
    dirs.push(dir)
    offset += images[i].length
  }

  fs.writeFileSync(out('favicon.ico'), Buffer.concat([header, ...dirs, ...images]))
  console.log('  generated: favicon.ico')
}

await buildIco([16, 32, 48])
console.log('Favicon generation complete.')
