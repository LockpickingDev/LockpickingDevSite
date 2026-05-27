import { useState, useCallback, useEffect, useMemo, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// ── Types ──────────────────────────────────────────────────────────────────

type MatrixVariant = {
  kind: 'matrix'
  rows: string[]
  cols: string[]
  rowLabel: string
  colLabel: string
  rowDisplayLabels?: Record<string, string>
  files: Record<string, Record<string, string>>
  variantImages?: Record<string, Record<string, string>>
  baseFile?: { label: string; url: string }
}

type ListVariant = {
  kind: 'list'
  files: { label: string; url: string; image?: string }[]
}

type SingleVariant = {
  kind: 'single'
  url: string
}

type ModelVariant = MatrixVariant | ListVariant | SingleVariant

interface PrintModel {
  id: string
  name: string
  desc: string
  group: string
  image: string
  variant: ModelVariant
}

// ── Helpers ────────────────────────────────────────────────────────────────

function stl(folder: string, filename: string) {
  return `/3dprinting/${folder}/${filename.replace(/ /g, '%20')}`
}

function img(folder: string, filename: string) {
  return `/3dprinting/${folder}/${filename.replace(/ /g, '%20').replace(/\.stl$/, '.png')}`
}

function cardImage(model: PrintModel): string {
  if (model.image) return model.image
  const v = model.variant
  if (v.kind === 'matrix') return v.variantImages?.[v.rows[0]]?.[v.cols[0]] ?? ''
  if (v.kind === 'list')   return v.files[0]?.image ?? ''
  return v.url.replace(/\.stl$/, '.png')
}

function stdMatrix(
  folder: string,
  prefix: string,
  rows: string[] = ['Small', 'Medium', 'Large'],
  baseFile?: { label: string; url: string },
): MatrixVariant {
  const files: Record<string, Record<string, string>> = {}
  const variantImages: Record<string, Record<string, string>> = {}
  for (const row of rows) {
    files[row] = {
      Left:   stl(folder, `${prefix} - ${row} Key - Offset Left.stl`),
      Center: stl(folder, `${prefix} - ${row} Key - Centered.stl`),
      Right:  stl(folder, `${prefix} - ${row} Key - Offset Right.stl`),
    }
    variantImages[row] = {
      Left:   img(folder, `${prefix} - ${row} Key - Offset Left.stl`),
      Center: img(folder, `${prefix} - ${row} Key - Centered.stl`),
      Right:  img(folder, `${prefix} - ${row} Key - Offset Right.stl`),
    }
  }
  const rowDisplayLabels: Record<string, string> = {
    Small:  'Small (52mm)',
    Medium: 'Medium (60mm)',
    Large:  'Large (69mm)',
  }
  return { kind: 'matrix', rows, cols: ['Left', 'Center', 'Right'], rowLabel: 'KEY LENGTH', colLabel: 'KEY POSITION', files, variantImages, baseFile, rowDisplayLabels }
}

function useSizes(urls: string[]): Record<string, number> {
  const [sizes, setSizes] = useState<Record<string, number>>({})
  useEffect(() => {
    const controller = new AbortController()
    let mounted = true
    Promise.all(
      urls.map(async (url): Promise<[string, number]> => {
        try {
          const res = await fetch(url, { method: 'HEAD', signal: controller.signal })
          const len = res.headers.get('content-length')
          return [url, len ? parseInt(len, 10) : 0]
        } catch {
          return [url, 0]
        }
      })
    ).then(entries => { if (mounted) setSizes(Object.fromEntries(entries)) })
    return () => { mounted = false; controller.abort() }
  }, [urls])
  return sizes
}

function formatSize(bytes: number): string {
  if (!bytes) return ''
  const kb = bytes / 1024
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`
}

function triggerDownloads(urls: string[]) {
  urls.forEach((url, i) => {
    setTimeout(() => {
      const a = document.createElement('a')
      a.href = url
      a.download = ''
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }, i * 200)
  })
}

// ── Model data ─────────────────────────────────────────────────────────────

const MODELS: PrintModel[] = [
  // ── Lock Display Stands - Padlock ───────────────────────────────────────
  {
    id: 'padlock-medium',
    name: 'Padlock Stand - Medium Flat',
    desc: 'Padlock display stands for medium sized padlocks with a flat style body.',
    group: 'Lock Display Stands',
    image: '/3dprinting/PadlockMedium/PadlockMedium.jpg',
    variant: stdMatrix('PadlockMedium', 'Medium Padlock', undefined, {
      label: 'Base (no key slot)',
      url: stl('PadlockMedium', 'Medium Padlock Base.stl'),
    }),
  },
  {
    id: 'padlock-large',
    name: 'Padlock Stand - Large Flat',
    desc: 'Padlock display stands for large sized padlocks with a flat style body.',
    group: 'Lock Display Stands',
    image: '/3dprinting/PadlockLarge/PadlockLarge.png',
    variant: stdMatrix('PadlockLarge', 'Large Padlock', undefined, {
      label: 'Base (no key slot)',
      url: stl('PadlockLarge', 'Padlock Large Base.stl'),
    }),
  },
  {
    id: 'padlock-concave-medium',
    name: 'Padlock Stand - Medium Concave',
    desc: 'Padlock display stands for medium sized padlocks with a curved body.',
    group: 'Lock Display Stands',
    image: '/3dprinting/PadlockConcaveMedium/PadlockConcaveMedium.jpg',
    variant: stdMatrix('PadlockConcaveMedium', 'Concave Medium', undefined, {
      label: 'Base (no key slot)',
      url: stl('PadlockConcaveMedium', 'Concave Medium Padlock Base.stl'),
    }),
  },
  {
    id: 'padlock-concave-large',
    name: 'Padlock Stand - Large Concave',
    desc: 'Padlock display stands for large sized padlocks with a curved body.',
    group: 'Lock Display Stands',
    image: '/3dprinting/PadlockConcaveLarge/PadlockConcaveLarge.jpg',
    variant: stdMatrix('PadlockConcaveLarge', 'Concave Large', undefined, {
      label: 'Base (no key slot)',
      url: stl('PadlockConcaveLarge', 'Concave Large Padlock Base.stl'),
    }),
  },
  // ── Lock Display Stands - Euro Cylinder ─────────────────────────────────
  {
    id: 'full-euro-cylinder',
    name: 'Full Euro Cylinder Pin Tumbler Stand',
    desc: 'Display stand for full-length euro cylinders (90mm). Pin tumbler profile.',
    group: 'Lock Display Stands',
    image: '/3dprinting/FullEuroCylinderPinTumbler/FullEuroCylinderPinTumbler.jpg',
    variant: stdMatrix('FullEuroCylinderPinTumbler', 'Full Euro Cylinder Pin Tumbler'),
  },
  {
    id: '3030-euro-cylinder',
    name: '30/30 Euro Cylinder Pin Tumbler Stand',
    desc: 'Display stand for 30/30 length euro cylinders (65mm). Pin tumbler profile.',
    group: 'Lock Display Stands',
    image: '',
    variant: stdMatrix('3030EuroCylinderPinTumbler', '30 30 Euro Cylinder Pin Tumbler'),
  },
  {
    id: 'half-euro-cylinder',
    name: 'Half Euro Cylinder Pin Tumbler Stand',
    desc: 'Display stand for half-length euro cylinders (40mm). Pin tumbler profile.',
    group: 'Lock Display Stands',
    image: '',
    variant: stdMatrix('HalfEuroCylinderPinTumbler', 'Half Euro Cylinder Pin Tumbler'),
  },
  {
    id: 'euro-dimple',
    name: 'Euro Dimple Cylinder Stand',
    desc: 'Display stand for euro-profile dimple locks. Choose by cylinder length and keyhole dimensions for a precise fit.',
    group: 'Lock Display Stands',
    image: '/3dprinting/EuroCylinderDimple/EuroCylinderDimple.jpg',
    variant: {
      kind: 'matrix',
      rows: ['Half (40mm)', '30/30 (65mm)', 'Full (90mm)'],
      cols: ['10×3mm', '10.5×3.5mm', '11×4mm'],
      rowLabel: 'CYLINDER',
      colLabel: 'KEYHOLE',
      files: {
        'Half (40mm)': {
          '10×3mm':     stl('EuroCylinderDimple', 'Half Euro Euro Dimple Lock Display Stand - 40mm Long - 10x3mm Keyhole.stl'),
          '10.5×3.5mm': stl('EuroCylinderDimple', 'Half Euro Euro Dimple Lock Display Stand - 40mm - 10.5x3.5mm.stl'),
          '11×4mm':     stl('EuroCylinderDimple', 'Half Euro Euro Dimple Lock Display Stand - 40mm - 11x4mm.stl'),
        },
        '30/30 (65mm)': {
          '10×3mm':     stl('EuroCylinderDimple', '30 30 Euro Dimple Lock Display Stand - 65mm Long - 10x3mm Keyhole.stl'),
          '10.5×3.5mm': stl('EuroCylinderDimple', '30 30 Euro Dimple Lock Display Stand - 65mm Long - 10.5x3.5mm Keyhole.stl'),
          '11×4mm':     stl('EuroCylinderDimple', '30 30 Euro Dimple Lock Display Stand - 65mm Long - 11x4mm Keyhole.stl'),
        },
        'Full (90mm)': {
          '10×3mm':     stl('EuroCylinderDimple', 'Full Euro Dimple Lock Display Stand - 90mm - 10x3mm Keyhole.stl'),
          '10.5×3.5mm': stl('EuroCylinderDimple', 'Full Euro Dimple Lock Display Stand - 90mm - 10.5x3.5mm.stl'),
          '11×4mm':     stl('EuroCylinderDimple', 'Full Euro Dimple Lock Display Stand - 90mm - 11x4mm.stl'),
        },
      },
      variantImages: {
        'Half (40mm)': {
          '10×3mm':     img('EuroCylinderDimple', 'Half Euro Euro Dimple Lock Display Stand - 40mm Long - 10x3mm Keyhole.stl'),
          '10.5×3.5mm': img('EuroCylinderDimple', 'Half Euro Euro Dimple Lock Display Stand - 40mm - 10.5x3.5mm.stl'),
          '11×4mm':     img('EuroCylinderDimple', 'Half Euro Euro Dimple Lock Display Stand - 40mm - 11x4mm.stl'),
        },
        '30/30 (65mm)': {
          '10×3mm':     img('EuroCylinderDimple', '30 30 Euro Dimple Lock Display Stand - 65mm Long - 10x3mm Keyhole.stl'),
          '10.5×3.5mm': img('EuroCylinderDimple', '30 30 Euro Dimple Lock Display Stand - 65mm Long - 10.5x3.5mm Keyhole.stl'),
          '11×4mm':     img('EuroCylinderDimple', '30 30 Euro Dimple Lock Display Stand - 65mm Long - 11x4mm Keyhole.stl'),
        },
        'Full (90mm)': {
          '10×3mm':     img('EuroCylinderDimple', 'Full Euro Dimple Lock Display Stand - 90mm - 10x3mm Keyhole.stl'),
          '10.5×3.5mm': img('EuroCylinderDimple', 'Full Euro Dimple Lock Display Stand - 90mm - 10.5x3.5mm.stl'),
          '11×4mm':     img('EuroCylinderDimple', 'Full Euro Dimple Lock Display Stand - 90mm - 11x4mm.stl'),
        },
      },
    },
  },

  // ── Lock Display Stands - Oval & Mortise ────────────────────────────────
  {
    id: '6-pin-oval',
    name: '6-Pin Oval Stand',
    desc: 'Display stand for 6-pin oval profile cylinders.',
    group: 'Lock Display Stands',
    image: '/3dprinting/6PinOval/6PinOval.jpg',
    variant: stdMatrix('6PinOval', '6 Pin Oval'),
  },
  {
    id: '7-pin-oval',
    name: '7-Pin Oval Stand',
    desc: 'Display stand for 7-pin oval cylinders.',
    group: 'Lock Display Stands',
    image: '',
    variant: stdMatrix('7PinOval', '7 Pin Oval', ['Medium', 'Large']),
  },
  {
    id: '178mm-oval',
    name: '17.8mm Oval Stand',
    desc: 'Display stand for the 17.8mm oval cylinder format.',
    group: 'Lock Display Stands',
    image: '/3dprinting/17_8mmOval/17_8mmOval.jpg',
    variant: stdMatrix('17_8mmOval', '17.8mm Oval', ['Medium', 'Large']),
  },
  {
    id: '6-pin-mortise',
    name: '6-Pin Mortise Stand',
    desc: 'Display stand for 6-pin mortise cylinders.',
    group: 'Lock Display Stands',
    image: '/3dprinting/6PinMortise/6PinMortise.jpg',
    variant: stdMatrix('6PinMortise', '6 pin Mortise'),
  },
  {
    id: '7-pin-mortise',
    name: '7-Pin Mortise Stand',
    desc: 'Display stand for 7-pin mortise cylinders.',
    group: 'Lock Display Stands',
    image: '',
    variant: stdMatrix('7PinMortise', '7 pin Mortise'),
  },

  // ── Lock Display Stands - Specialty ─────────────────────────────────────
  {
    id: 'miwa-mortise',
    name: 'Miwa Mortise Stand',
    desc: 'Display stand for Miwa mortise cylinders. Single variant with offset key position.',
    group: 'Lock Display Stands',
    image: '/3dprinting/MiwaMortise/MiwaMortise.JPG',
    variant: { kind: 'single', url: stl('MiwaMortise', 'Miwa Display Stand - Medium Key - Offset Right.stl') },
  },
  {
    id: 'mogul-cylinder',
    name: 'Mogul Cylinder Stand',
    desc: 'Display stand for the Mogul cylinder profile. Single variant with offset key position.',
    group: 'Lock Display Stands',
    image: '/3dprinting/MogulCylinder/MogulCylinder.jpg',
    variant: { kind: 'single', url: stl('MogulCylinder', 'Mogul Cylinder Display Stand - Key Offset Right.stl') },
  },
  {
    id: 'kik',
    name: 'Key-in-Knob (KiK) Stand',
    desc: 'Display stand sized for key-in-knob (KiK) lock cylinders.',
    group: 'Lock Display Stands',
    image: '/3dprinting/KiK/KiK Cylinder Lock Display Stand.jpg',
    variant: stdMatrix('KiK', 'KiK Display'),
  },
  {
    id: '5x-euro-display',
    name: '5× Euro Display Base',
    desc: 'Base for displaying five euro cylinders side by side. Great for showcasing a collection.',
    group: 'Lock Display Stands',
    image: '',
    variant: { kind: 'single', url: stl('5xEuroDisplay', '5x Euro Display Bottom.stl') },
  },

  // ── Lock Display Stands - Key Holders ───────────────────────────────────
  {
    id: 'key-holder',
    name: 'Key Holder',
    desc: 'Key holder in three sizes. Hook on left, center, or right.',
    group: 'Lock Display Stands',
    image: '',
    variant: {
      kind: 'matrix',
      rows: ['Small', 'Medium', 'Large'],
      cols: ['Left', 'Center', 'Right'],
      rowLabel: 'SIZE',
      colLabel: 'HOOK SIDE',
      files: {
        Small:  { Left: stl('KeyHolder', 'Key Holder - Small Left.stl'),  Center: stl('KeyHolder', 'Key Holder - Small.stl'),  Right: stl('KeyHolder', 'Key Holder - Small Right.stl')  },
        Medium: { Left: stl('KeyHolder', 'Key Holder - Medium Left.stl'), Center: stl('KeyHolder', 'Key Holder - Medium.stl'), Right: stl('KeyHolder', 'Key Holder - Medium Right.stl') },
        Large:  { Left: stl('KeyHolder', 'Key Holder - Large Left.stl'),  Center: stl('KeyHolder', 'Key Holder - Large.stl'),  Right: stl('KeyHolder', 'Key Holder - Large Right.stl')  },
      },
      variantImages: {
        Small:  { Left: img('KeyHolder', 'Key Holder - Small Left.stl'),  Center: img('KeyHolder', 'Key Holder - Small.stl'),  Right: img('KeyHolder', 'Key Holder - Small Right.stl')  },
        Medium: { Left: img('KeyHolder', 'Key Holder - Medium Left.stl'), Center: img('KeyHolder', 'Key Holder - Medium.stl'), Right: img('KeyHolder', 'Key Holder - Medium Right.stl') },
        Large:  { Left: img('KeyHolder', 'Key Holder - Large Left.stl'),  Center: img('KeyHolder', 'Key Holder - Large.stl'),  Right: img('KeyHolder', 'Key Holder - Large Right.stl')  },
      },
    },
  },

  // ── Pick Handles ────────────────────────────────────────────────────────
  {
    id: 'pick-handles',
    name: 'Pick Handles w/ Knurl',
    desc: 'Handles for the common metal-handled picks, 0.025" picks without handles, wiper blade picks, Law Lock Tools, and Southord pocket pen picks.',
    group: 'Pick Handles',
    image: '/3dprinting/PickHandlesWKnurl/PickHandlesWKnurl.png',
    variant: {
      kind: 'list',
      files: [
        { label: 'Handle for Picks with Metal Handles',  url: stl('PickHandlesWKnurl', 'Handle for Picks with Metal Handles.stl'),         image: img('PickHandlesWKnurl', 'Handle for Picks with Metal Handles.stl') },
        { label: 'Handle for Picks with Metal Handles (w/ Holes)',  url: stl('PickHandlesWKnurl', 'Handle w Holes for Picks with Metal Handles.stl'), image: img('PickHandlesWKnurl', 'Handle w Holes for Picks with Metal Handles.stl') },
        { label: 'Handle for .025" Picks w/o Handles (w/ holes)',   url: stl('PickHandlesWKnurl', '0.025 Pick Handle w Holes.stl'),                   image: img('PickHandlesWKnurl', '0.025 Pick Handle w Holes.stl') },
        { label: 'Law Lock Tools .025" Handle (w/ holes)',    url: stl('PickHandlesWKnurl', 'LLT 0.025 Handle w Holes.stl'),                   image: img('PickHandlesWKnurl', 'LLT 0.025 Handle w Holes.stl') },
        { label: 'Southord Pocket Pen Pick Handle',      url: stl('PickHandlesWKnurl', 'Southord Pocket Pen Picks Handle.stl'),           image: img('PickHandlesWKnurl', 'Southord Pocket Pen Picks Handle.stl') },
        { label: 'Handle for Wiper Blade - Full Tang',        url: stl('PickHandlesWKnurl', 'Wiper Blade Handle w knurl - Full Tang.stl'),     image: img('PickHandlesWKnurl', 'Wiper Blade Handle w knurl - Full Tang.stl') },
        { label: 'Handle for Wiper Blade - Half Tang',        url: stl('PickHandlesWKnurl', 'Wiper Blade Handle w knurl - Half Tang.stl'),     image: img('PickHandlesWKnurl', 'Wiper Blade Handle w knurl - Half Tang.stl') },
      ],
    },
  },

  // ── Tools & Accessories ─────────────────────────────────────────────────
  {
    id: 'impressioning-guides',
    name: 'Impressioning Key Line Guides',
    desc: 'Precision line guides for key impressioning. Covers C83, SC1/SC4, and Y1/Y2 key profiles.',
    group: 'Tools & Accessories',
    image: '/3dprinting/ImpressioningKeyLineGuides/ImpressioningKeyLineGuides.png',
    variant: {
      kind: 'list',
      files: [
        { label: 'C83 Key Guide',        url: stl('ImpressioningKeyLineGuides', 'C83 Key Line Guide for Impressioning.stl'),     image: img('ImpressioningKeyLineGuides', 'C83 Key Line Guide for Impressioning.stl') },
        { label: 'SC1 / SC4 Key Guide', url: stl('ImpressioningKeyLineGuides', 'SC1 SC4 Key Line Guide for Impressioning.stl'), image: img('ImpressioningKeyLineGuides', 'SC1 SC4 Key Line Guide for Impressioning.stl') },
        { label: 'Y1 / Y2 Key Guide',   url: stl('ImpressioningKeyLineGuides', 'Y1 Y2 Key Line Guide for Impressioning.stl'),  image: img('ImpressioningKeyLineGuides', 'Y1 Y2 Key Line Guide for Impressioning.stl') },
      ],
    },
  },
  {
    id: 'mini-pinning-tray',
    name: 'Mini Pinning Tray',
    desc: 'Compact tray for organizing lock pins during rekeying or pinning sessions.',
    group: 'Tools & Accessories',
    image: '',
    variant: { kind: 'single', url: stl('MiniPinningTray', 'Mini Pinning Tray.stl') },
  },
  {
    id: 'zip-tie-cuff',
    name: 'Zip Tie (Riot) Cuff Adaptors',
    desc: 'Cuff adaptor for 0.35" zip ties and a pull ring with built-in zip tie head.',
    group: 'Tools & Accessories',
    image: '/3dprinting/ZipTieCuffAdaptor/ZipTieCuffAdaptor.jpg',
    variant: {
      kind: 'list',
      files: [
        { label: 'Cuff Adaptor (0.35" zip ties)',      url: stl('ZipTieCuffAdaptor', 'Zip Handcuff Adaptor for 0.35 inch thick Zip Ties.stl'), image: img('ZipTieCuffAdaptor', 'Zip Handcuff Adaptor for 0.35 inch thick Zip Ties.stl') },
        { label: 'Pull Ring w/ Built-in Zip Tie Head', url: stl('ZipTieCuffAdaptor', 'Zip Tie Cuff Pull Ring w Built in Zip Tie Head.stl'),    image: img('ZipTieCuffAdaptor', 'Zip Tie Cuff Pull Ring w Built in Zip Tie Head.stl') },
      ],
    },
  },
]

const GROUPS = [
  'Lock Display Stands',
  'Pick Handles',
  'Tools & Accessories',
]

// ── Modal helpers ──────────────────────────────────────────────────────────

function useModalClose(onClose: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])
}

// ── Matrix modal content ───────────────────────────────────────────────────

function MatrixContent({
  v,
  selectedCell,
  onSelect,
  selectedBase,
  onSelectBase,
  sizes,
}: {
  v: MatrixVariant
  selectedCell: [string, string] | null
  onSelect: (row: string, col: string, img: string | undefined) => void
  selectedBase: boolean
  onSelectBase: (img: string) => void
  sizes: Record<string, number>
}) {
  const maxRowLen = Math.max(...v.rows.map(r => r.length))
  const labelWidth = maxRowLen > 8 ? '6.5rem' : '4.5rem'

  const allUrls = v.rows.flatMap(row => v.cols.map(col => v.files[row][col]))
  const allDownloads = v.baseFile ? [...allUrls, v.baseFile.url] : allUrls

  const selectedUrl   = selectedBase && v.baseFile
    ? v.baseFile.url
    : selectedCell ? v.files[selectedCell[0]][selectedCell[1]] : null
  const selectedLabel = selectedBase && v.baseFile
    ? v.baseFile.label
    : selectedCell ? `${selectedCell[0]} / ${selectedCell[1]}` : null

  const totalBytes  = allDownloads.reduce((sum, url) => sum + (sizes[url] ?? 0), 0)
  const totalSizeOk = allDownloads.every(url => (sizes[url] ?? 0) > 0)
  const totalLabel  = totalSizeOk ? formatSize(totalBytes) : ''

  return (
    <>
      <div
        className="version-matrix"
        style={{ gridTemplateColumns: `${labelWidth} repeat(${v.cols.length}, 1fr)` }}
      >
        <div />
        <div className="version-matrix-axis-header" style={{ gridColumn: `span ${v.cols.length}` }}>
          ← {v.colLabel} →
        </div>
        <div className="version-matrix-axis-side">{v.rowLabel}</div>
        {v.cols.map(col => (
          <div key={col} className="version-matrix-col-header">{col.toUpperCase()}</div>
        ))}
        {v.rows.map(row => (
          <Fragment key={row}>
            <div className="version-matrix-row-label">{v.rowDisplayLabels?.[row] ?? row}</div>
            {v.cols.map(col => {
              const isActive = selectedCell?.[0] === row && selectedCell?.[1] === col
              const url = v.files[row][col]
              const size = formatSize(sizes[url] ?? 0)
              return (
                <button
                  key={`${row}-${col}`}
                  className={`version-sel-btn${isActive ? ' version-sel-btn--active' : ''}`}
                  onClick={e => { e.stopPropagation(); onSelect(row, col, v.variantImages?.[row]?.[col]) }}
                >
                  <span className="version-sel-icon">{isActive ? '✓' : '○'}</span>
                  {size && <span className="version-sel-size">{size}</span>}
                </button>
              )
            })}
          </Fragment>
        ))}
        {v.baseFile && (() => {
          const baseImg = v.baseFile.url.replace(/\.stl$/, '.png')
          const size = formatSize(sizes[v.baseFile.url] ?? 0)
          return (
            <Fragment key="__base__">
              <div className="version-matrix-row-label version-matrix-row-label--base">Base</div>
              <button
                className={`version-sel-btn version-sel-btn--base${selectedBase ? ' version-sel-btn--active' : ''}`}
                style={{ gridColumn: `span ${v.cols.length}` }}
                onClick={e => { e.stopPropagation(); onSelectBase(baseImg) }}
              >
                <span className="version-sel-icon">{selectedBase ? '✓' : '○'}</span>
                <span className="version-sel-base-label">{v.baseFile.label}</span>
                {size && <span className="version-sel-size">{size}</span>}
              </button>
            </Fragment>
          )
        })()}
      </div>

      <div className="modal-dl-section">
        {selectedUrl && selectedLabel ? (
          <a
            href={selectedUrl}
            download
            className="modal-dl-selected"
            onClick={e => e.stopPropagation()}
          >
            ↓ Download - {selectedLabel}{sizes[selectedUrl] ? ` (${formatSize(sizes[selectedUrl])})` : ''}
          </a>
        ) : (
          <div className="modal-dl-prompt">Select a version above to download</div>
        )}
        <button
          className="modal-dl-all"
          onClick={e => { e.stopPropagation(); triggerDownloads(allDownloads) }}
        >
          ↓ Download All ({allDownloads.length} files{totalLabel ? ` - ${totalLabel}` : ''})
        </button>
      </div>
    </>
  )
}

// ── List modal content ─────────────────────────────────────────────────────

function ListContent({
  v,
  selectedIdx,
  onSelect,
  sizes,
}: {
  v: ListVariant
  selectedIdx: number | null
  onSelect: (idx: number, img: string | undefined) => void
  sizes: Record<string, number>
}) {
  const allDownloads = v.files.map(f => f.url)
  const selectedFile = selectedIdx !== null ? v.files[selectedIdx] : null

  const totalBytes  = allDownloads.reduce((sum, url) => sum + (sizes[url] ?? 0), 0)
  const totalSizeOk = allDownloads.every(url => (sizes[url] ?? 0) > 0)
  const totalLabel  = totalSizeOk ? formatSize(totalBytes) : ''

  return (
    <>
      <div className="list-modal-files">
        {v.files.map((f, idx) => {
          const size = formatSize(sizes[f.url] ?? 0)
          return (
            <button
              key={f.url}
              className={`list-sel-btn${selectedIdx === idx ? ' list-sel-btn--active' : ''}`}
              onClick={e => { e.stopPropagation(); onSelect(idx, f.image) }}
            >
              <span className="list-sel-label">{f.label}</span>
              {size && <span className="list-sel-size">{size}</span>}
              <span className="list-sel-icon">{selectedIdx === idx ? '✓' : '○'}</span>
            </button>
          )
        })}
      </div>

      <div className="modal-dl-section">
        {selectedFile ? (
          <a
            href={selectedFile.url}
            download
            className="modal-dl-selected"
            onClick={e => e.stopPropagation()}
          >
            ↓ Download - {selectedFile.label}{sizes[selectedFile.url] ? ` (${formatSize(sizes[selectedFile.url])})` : ''}
          </a>
        ) : (
          <div className="modal-dl-prompt">Select a file above to download</div>
        )}
        <button
          className="modal-dl-all"
          onClick={e => { e.stopPropagation(); triggerDownloads(allDownloads) }}
        >
          ↓ Download All ({allDownloads.length} files{totalLabel ? ` - ${totalLabel}` : ''})
        </button>
      </div>
    </>
  )
}

// ── Single modal content ───────────────────────────────────────────────────

function SingleContent({ v, sizes }: { v: SingleVariant; sizes: Record<string, number> }) {
  const size = formatSize(sizes[v.url] ?? 0)
  return (
    <div className="modal-dl-section">
      <a href={v.url} download className="modal-dl-selected" onClick={e => e.stopPropagation()}>
        ↓ Download STL{size ? ` (${size})` : ''}
      </a>
    </div>
  )
}

// ── Modal ──────────────────────────────────────────────────────────────────

function ModelModal({ model, onClose }: { model: PrintModel; onClose: () => void }) {
  useModalClose(onClose)
  const v = model.variant
  const [displayImg, setDisplayImg]     = useState(cardImage(model))
  const [selectedCell, setSelectedCell] = useState<[string, string] | null>(null)
  const [selectedBase, setSelectedBase] = useState(false)
  const [selectedIdx, setSelectedIdx]   = useState<number | null>(null)

  const allUrls = useMemo(() => {
    if (v.kind === 'matrix') {
      const urls = v.rows.flatMap(row => v.cols.map(col => v.files[row][col]))
      if (v.baseFile) urls.push(v.baseFile.url)
      return urls
    }
    if (v.kind === 'list') return v.files.map(f => f.url)
    return [v.url]
  }, [model]) // eslint-disable-line react-hooks/exhaustive-deps

  const sizes = useSizes(allUrls)

  function handleMatrixSelect(row: string, col: string, img: string | undefined) {
    setSelectedCell([row, col])
    setSelectedBase(false)
    setDisplayImg(img ?? model.image)
  }

  function handleBaseSelect(img: string) {
    setSelectedBase(true)
    setSelectedCell(null)
    setDisplayImg(img)
  }

  function handleListSelect(idx: number, img: string | undefined) {
    setSelectedIdx(idx)
    setDisplayImg(img ?? model.image)
  }

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
      <div className="version-modal" onClick={e => e.stopPropagation()}>
        <div className="version-modal-header">{model.name}</div>
        <img src={displayImg} alt={model.name} className="version-modal-img" />
        {v.kind === 'matrix' && (
          <MatrixContent v={v} selectedCell={selectedCell} onSelect={handleMatrixSelect} selectedBase={selectedBase} onSelectBase={handleBaseSelect} sizes={sizes} />
        )}
        {v.kind === 'list' && (
          <ListContent v={v} selectedIdx={selectedIdx} onSelect={handleListSelect} sizes={sizes} />
        )}
        {v.kind === 'single' && (
          <SingleContent v={v} sizes={sizes} />
        )}
      </div>
    </div>
  )
}

// ── Card ───────────────────────────────────────────────────────────────────

function variantBadge(v: ModelVariant): string {
  if (v.kind === 'single') return 'SINGLE FILE'
  if (v.kind === 'list')   return `${v.files.length} FILES`
  return `${v.rows.length * v.cols.length} VERSIONS`
}

function PrintCard({ model, onOpen }: { model: PrintModel; onOpen?: () => void }) {
  const v = model.variant
  const badge = variantBadge(v)
  const hasBase = v.kind === 'matrix' && !!v.baseFile

  const imageBlock = (
    <div className="print-card-visual">
      <img src={cardImage(model)} alt={model.name} className="print-card-img" />
      <div className="print-card-badges">
        <span className="print-card-badge">{badge}</span>
        {hasBase && <span className="print-card-badge print-card-badge--dim">+ BASE</span>}
      </div>
    </div>
  )

  return (
    <button className="print-card" onClick={onOpen} aria-label={model.name}>
      {imageBlock}
      <div className="print-card-body">
        <div className="print-card-name">{model.name}</div>
        <div className="print-card-desc">{model.desc}</div>
        <div className="print-card-cta">
          {v.kind === 'list' ? 'Browse files →' : v.kind === 'single' ? 'Download STL →' : 'Choose version →'}
        </div>
      </div>
    </button>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function Prints() {
  const [activeModel, setActiveModel] = useState<PrintModel | null>(null)
  const openModal  = useCallback((m: PrintModel) => setActiveModel(m), [])
  const closeModal = useCallback(() => setActiveModel(null), [])

  const grouped = GROUPS
    .map(group => ({ group, models: MODELS.filter(m => m.group === group) }))
    .filter(g => g.models.length > 0)

  return (
    <>
      <Helmet>
        <title>Free 3D Printable Locksport Models - Lock Display Stands &amp; More | LockpickingDev</title>
        <meta name="description" content="Download free STL files for 3D printed lock display stands, pick handles, and locksport tools. 22 models with multiple size and positioning variants - community staples used at meetups worldwide." />
        <link rel="canonical" href="https://lockpicking.dev/prints" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lockpicking.dev/prints" />
        <meta property="og:title" content="Free 3D Printable Locksport Models | LockpickingDev" />
        <meta property="og:description" content="Download free STL files for 3D printed lock display stands, pick handles, and locksport tools. 22 models with multiple size and positioning variants." />
        <meta property="og:image" content="https://lockpicking.dev/og-prints.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="LockpickingDev 3D printable locksport models" />
        <meta property="og:site_name" content="LockpickingDev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://lockpicking.dev/prints" />
        <meta name="twitter:title" content="Free 3D Printable Locksport Models | LockpickingDev" />
        <meta name="twitter:description" content="Download free STL files for 3D printed lock display stands, pick handles, and locksport tools. 22 models with multiple variants." />
        <meta name="twitter:image" content="https://lockpicking.dev/og-prints.svg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": "https://lockpicking.dev/prints",
          "url": "https://lockpicking.dev/prints",
          "name": "Free 3D Printable Locksport Models - LockpickingDev",
          "description": "Free STL files for 3D printed lock display stands, pick handles, and locksport tools. 22 models with multiple size and positioning variants.",
          "publisher": { "@id": "https://lockpicking.dev/#business" },
          "author": { "@id": "https://lockpicking.dev/#person" },
          "isPartOf": { "@id": "https://lockpicking.dev/#website" },
          "mainEntity": {
            "@type": "ItemList",
            "name": "3D Printable Locksport Models",
            "numberOfItems": 22,
            "itemListElement": [
              { "@type": "ListItem", "position": 1,  "name": "Padlock Stand - Large Flat",         "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 2,  "name": "Padlock Stand - Medium Flat",        "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 3,  "name": "Padlock Stand - Large Concave",      "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 4,  "name": "Padlock Stand - Medium Concave",     "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 5,  "name": "Full Euro Cylinder Stand",           "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 6,  "name": "Half Euro Cylinder Stand",           "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 7,  "name": "30/30 Euro Cylinder Stand",          "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 8,  "name": "Key-in-Knob (KiK) Stand",            "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 9,  "name": "Euro Dimple Cylinder Stand",         "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 10, "name": "6-Pin Oval Stand",                   "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 11, "name": "7-Pin Oval Stand",                   "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 12, "name": "17.8mm Oval Stand",                  "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 13, "name": "6-Pin Mortise Stand",                "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 14, "name": "7-Pin Mortise Stand",                "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 15, "name": "Miwa Mortise Stand",                 "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 16, "name": "Mogul Cylinder Stand",               "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 17, "name": "5x Euro Display Base",               "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 18, "name": "Wall-Mount Key Holder",              "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 19, "name": "Pick Handles w/ Knurl",              "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 20, "name": "Impressioning Key Line Guides",      "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 21, "name": "Zip Tie Cuff Adaptors",              "url": "https://lockpicking.dev/prints" },
              { "@type": "ListItem", "position": 22, "name": "Mini Pinning Tray",                  "url": "https://lockpicking.dev/prints" }
            ]
          }
        })}</script>
      </Helmet>

      {activeModel && (
        <ModelModal model={activeModel} onClose={closeModal} />
      )}

      {/* HERO */}
      <section className="lab-hero">
        <div className="lab-hero-content">
          <div className="lab-breadcrumb">
            <Link to="/" className="lab-back">← Back to Home</Link>
          </div>
          <h1 className="lab-title">
            3D <span className="cyan">Prints</span>
            <span className="hero-cursor" />
          </h1>
          <p className="lab-subtitle">
            Lock display stands, tools, and hardware - all free to print.
          </p>
          <p className="lab-desc">
            Original 3D printable designs built for the locksport community.
            Download the STL, print it, use it. No cost, no catch.
          </p>
        </div>
      </section>

      {/* COMMUNITY CALLOUT */}
      <section className="picks-section" style={{ background: 'var(--bg)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="covert-banner">
            <div className="covert-banner-text">
              <strong>Community Staples</strong>
              <p>
                These lock display stands have been printed and used by hundreds of people across the
                locksport community. If you've been to a meetup and seen a lock on a stand, there's a
                good chance it came from these files.
              </p>
            </div>
            <div className="prints-platform-btns">
              <a href="https://www.thingiverse.com/LockpickingDev/designs" target="_blank" rel="noreferrer" className="covert-link-btn">
                Thingiverse →
              </a>
              <a href="https://www.printables.com/@LockpickingDev" target="_blank" rel="noreferrer" className="covert-link-btn">
                Printables →
              </a>
              <a href="https://makerworld.com/en/@LockpickingDev" target="_blank" rel="noreferrer" className="covert-link-btn">
                MakerWorld →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section className="picks-section picks-section-alt" id="models">
        <div className="container">
          <div className="section-label">free downloads</div>
          <h2 className="section-title">All Models</h2>
          <div className="section-divider" />
          <p className="lab-section-desc">
            Click any model to browse versions and download the STL.
          </p>
          <div className="prints-grid">
            {grouped.map(({ group, models }) => (
              <Fragment key={group}>
                <div className="prints-group-label">{group}</div>
                {models.map(model => (
                  <PrintCard
                    key={model.id}
                    model={model}
                    onOpen={() => openModal(model)}
                  />
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
