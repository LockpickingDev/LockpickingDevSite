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

const PLACEHOLDER = '/imageplaceholder.svg'

const T0 = '/3dprinting/TempPics/Padlock%20Display%20Stand%20-%20Large%20Flat.jpg'
const T1 = '/3dprinting/TempPics/Padlock%20Display%20Stand%20-%20Large%20w%20Concave.jpg'
const T2 = '/3dprinting/TempPics/Padlock%20Display%20Stands%20-%20Medium%20Flat.jpg'
const T3 = '/3dprinting/TempPics/3d-printed-lock-display-stands-v0-f5hbto1giqta1.webp'
const TEMP_PICS = [T0, T1, T2, T3]
function tp(n: number) { return TEMP_PICS[n % 4] }

function stl(folder: string, filename: string) {
  return `/3dprinting/${folder}/${filename.replace(/ /g, '%20')}`
}

function stdMatrix(
  folder: string,
  prefix: string,
  rows: string[] = ['Small', 'Medium', 'Large'],
  baseFile?: { label: string; url: string },
  imgOffset = 0,
): MatrixVariant {
  const files: Record<string, Record<string, string>> = {}
  const variantImages: Record<string, Record<string, string>> = {}
  let i = imgOffset
  for (const row of rows) {
    files[row] = {
      Left:   stl(folder, `${prefix} - ${row} Key - Offset Left.stl`),
      Center: stl(folder, `${prefix} - ${row} Key - Centered.stl`),
      Right:  stl(folder, `${prefix} - ${row} Key - Offset Right.stl`),
    }
    variantImages[row] = { Left: tp(i++), Center: tp(i++), Right: tp(i++) }
  }
  return { kind: 'matrix', rows, cols: ['Left', 'Center', 'Right'], rowLabel: 'KEY SIZE', colLabel: 'KEY POSITION', files, variantImages, baseFile }
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
  // ── Lock Display Stands — Padlock ───────────────────────────────────────
  {
    id: 'padlock-large',
    name: 'Padlock Stand — Large Flat',
    desc: 'Flat-base stand for large padlocks. Three key slot positions. One of the most-printed locksport designs in the community.',
    group: 'Lock Display Stands',
    image: T0,
    variant: stdMatrix('PadlockLarge', 'Large Padlock', undefined, {
      label: 'Base (no key slot)',
      url: stl('PadlockLarge', 'Padlock Large Base.stl'),
    }, 0),
  },
  {
    id: 'padlock-medium',
    name: 'Padlock Stand — Medium Flat',
    desc: 'Flat-base stand scaled for medium padlocks. Same stable footprint, three key slot positions.',
    group: 'Lock Display Stands',
    image: T2,
    variant: stdMatrix('PadlockMedium', 'Medium Padlock', undefined, {
      label: 'Base (no key slot)',
      url: stl('PadlockMedium', 'Medium Padlock Base.stl'),
    }, 2),
  },
  {
    id: 'padlock-concave-large',
    name: 'Padlock Stand — Large Concave',
    desc: 'Concave cradle that holds large padlocks snugly. Cleaner visual presentation than the flat variant.',
    group: 'Lock Display Stands',
    image: T1,
    variant: stdMatrix('PadlockConcaveLarge', 'Concave Large', undefined, {
      label: 'Base (no key slot)',
      url: stl('PadlockConcaveLarge', 'Concave Large Padlock Base.stl'),
    }, 1),
  },
  {
    id: 'padlock-concave-medium',
    name: 'Padlock Stand — Medium Concave',
    desc: 'Concave cradle for medium padlocks. Lower profile, snugger hold.',
    group: 'Lock Display Stands',
    image: T2,
    variant: stdMatrix('PadlockConcaveMedium', 'Concave Medium', undefined, {
      label: 'Base (no key slot)',
      url: stl('PadlockConcaveMedium', 'Concave Medium Padlock Base.stl'),
    }, 3),
  },

  // ── Lock Display Stands — Euro Cylinder ─────────────────────────────────
  {
    id: 'full-euro-cylinder',
    name: 'Full Euro Cylinder Stand',
    desc: 'Stand for full-length euro cylinders (90mm). Pin tumbler profile, 9 key size and position variants.',
    group: 'Lock Display Stands',
    image: T3,
    variant: stdMatrix('FullEuroCylinderPinTumbler', 'Full Euro Cylinder Pin Tumbler', undefined, undefined, 0),
  },
  {
    id: 'half-euro-cylinder',
    name: 'Half Euro Cylinder Stand',
    desc: 'Stand for half euro profile cylinders. Same clean design, scaled for shorter barrels.',
    group: 'Lock Display Stands',
    image: T3,
    variant: stdMatrix('HalfEuroCylinderPinTumbler', 'Half Euro Cylinder Pin Tumbler', undefined, undefined, 1),
  },
  {
    id: '3030-euro-cylinder',
    name: '30/30 Euro Cylinder Stand',
    desc: 'Stand for 30/30 euro cylinders — the most common length. Pin tumbler profile.',
    group: 'Lock Display Stands',
    image: T3,
    variant: stdMatrix('3030EuroCylinderPinTumbler', '30 30 Euro Cylinder Pin Tumbler', undefined, undefined, 2),
  },
  {
    id: 'kik',
    name: 'Key-in-Knob (KiK) Stand',
    desc: 'Display stand sized and profiled for key-in-knob lock cylinders.',
    group: 'Lock Display Stands',
    image: T3,
    variant: stdMatrix('KiK', 'KiK Display', undefined, undefined, 3),
  },
  {
    id: 'euro-dimple',
    name: 'Euro Dimple Cylinder Stand',
    desc: 'Stand for euro-profile dimple locks. Choose by cylinder length and keyhole dimensions for a precise fit.',
    group: 'Lock Display Stands',
    image: T3,
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
        'Half (40mm)':  { '10×3mm': tp(0), '10.5×3.5mm': tp(1), '11×4mm': tp(2) },
        '30/30 (65mm)': { '10×3mm': tp(3), '10.5×3.5mm': tp(0), '11×4mm': tp(1) },
        'Full (90mm)':  { '10×3mm': tp(2), '10.5×3.5mm': tp(3), '11×4mm': tp(0) },
      },
    },
  },

  // ── Lock Display Stands — Oval & Mortise ────────────────────────────────
  {
    id: '6-pin-oval',
    name: '6-Pin Oval Stand',
    desc: 'Display stand for 6-pin oval profile cylinders. Full 3×3 size and position matrix.',
    group: 'Lock Display Stands',
    image: T3,
    variant: stdMatrix('6PinOval', '6 Pin Oval', undefined, undefined, 0),
  },
  {
    id: '7-pin-oval',
    name: '7-Pin Oval Stand',
    desc: 'Stand for 7-pin oval cylinders. Available in medium and large key sizes.',
    group: 'Lock Display Stands',
    image: T3,
    variant: stdMatrix('7PinOval', '7 Pin Oval', ['Medium', 'Large'], undefined, 1),
  },
  {
    id: '178mm-oval',
    name: '17.8mm Oval Stand',
    desc: 'Stand for the 17.8mm oval cylinder format. Medium and large key sizes.',
    group: 'Lock Display Stands',
    image: T3,
    variant: stdMatrix('17_8mmOval', '17.8mm Oval', ['Medium', 'Large'], undefined, 2),
  },
  {
    id: '6-pin-mortise',
    name: '6-Pin Mortise Stand',
    desc: 'Display stand for 6-pin mortise cylinders. Full 3×3 size and position matrix.',
    group: 'Lock Display Stands',
    image: T3,
    variant: stdMatrix('6PinMortise', '6 pin Mortise', undefined, undefined, 3),
  },
  {
    id: '7-pin-mortise',
    name: '7-Pin Mortise Stand',
    desc: 'Stand for 7-pin mortise cylinders. Full range of key sizes and positions.',
    group: 'Lock Display Stands',
    image: T3,
    variant: stdMatrix('7PinMortise', '7 pin Mortise', undefined, undefined, 0),
  },

  // ── Lock Display Stands — Specialty ─────────────────────────────────────
  {
    id: 'miwa-mortise',
    name: 'Miwa Mortise Stand',
    desc: 'Display stand for Miwa mortise cylinders. Offset key slot for proper display angle.',
    group: 'Lock Display Stands',
    image: T3,
    variant: { kind: 'single', url: stl('MiwaMortise', 'Miwa Display Stand - Medium Key - Offset Right.stl') },
  },
  {
    id: 'mogul-cylinder',
    name: 'Mogul Cylinder Stand',
    desc: 'Display stand for the Mogul cylinder profile. Single variant with offset key position.',
    group: 'Lock Display Stands',
    image: T3,
    variant: { kind: 'single', url: stl('MogulCylinder', 'Mogul Cylinder Display Stand - Key Offset Right.stl') },
  },
  {
    id: '5x-euro-display',
    name: '5× Euro Display Base',
    desc: 'Base for displaying five euro cylinders side by side. Great for showcasing a collection.',
    group: 'Lock Display Stands',
    image: T3,
    variant: { kind: 'single', url: stl('5xEuroDisplay', '5x Euro Display Bottom.stl') },
  },

  // ── Lock Display Stands — Key Holders ───────────────────────────────────
  {
    id: 'key-holder',
    name: 'Wall-Mount Key Holder',
    desc: 'Wall-mountable key holder in three sizes. Hook on left, center, or right.',
    group: 'Lock Display Stands',
    image: T3,
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
        Small:  { Left: tp(1), Center: tp(2), Right: tp(3) },
        Medium: { Left: tp(0), Center: tp(1), Right: tp(2) },
        Large:  { Left: tp(3), Center: tp(0), Right: tp(1) },
      },
    },
  },

  // ── Pick Handles ────────────────────────────────────────────────────────
  {
    id: 'pick-handles',
    name: 'Pick Handles w/ Knurl',
    desc: 'Printable handles for wiper blade picks, .025" picks, metal-handle picks, and Southord pocket pen picks.',
    group: 'Pick Handles',
    image: PLACEHOLDER,
    variant: {
      kind: 'list',
      files: [
        { label: '.025" Pick Handle (w/ holes)',   url: stl('PickHandlesWKnurl', '0.025 Pick Handle w Holes.stl'),                   image: tp(0) },
        { label: 'Metal Handle Picks — Standard',  url: stl('PickHandlesWKnurl', 'Handle for Picks with Metal Handles.stl'),         image: tp(1) },
        { label: 'Metal Handle Picks — w/ Holes',  url: stl('PickHandlesWKnurl', 'Handle w Holes for Picks with Metal Handles.stl'), image: tp(2) },
        { label: 'LLT .025" Handle (w/ holes)',    url: stl('PickHandlesWKnurl', 'LLT 0.025 Handle w Holes.stl'),                   image: tp(3) },
        { label: 'Southord Pocket Pen Picks',      url: stl('PickHandlesWKnurl', 'Southord Pocket Pen Picks Handle.stl'),           image: tp(0) },
        { label: 'Wiper Blade — Full Tang',        url: stl('PickHandlesWKnurl', 'Wiper Blade Handle w knurl - Full Tang.stl'),     image: tp(1) },
        { label: 'Wiper Blade — Half Tang',        url: stl('PickHandlesWKnurl', 'Wiper Blade Handle w knurl - Half Tang.stl'),     image: tp(2) },
      ],
    },
  },

  // ── Tools & Accessories ─────────────────────────────────────────────────
  {
    id: 'impressioning-guides',
    name: 'Impressioning Key Line Guides',
    desc: 'Precision line guides for key impressioning. Covers C83, SC1/SC4, and Y1/Y2 key profiles.',
    group: 'Tools & Accessories',
    image: PLACEHOLDER,
    variant: {
      kind: 'list',
      files: [
        { label: 'C83 Key',        url: stl('ImpressioningKeyLineGuides', 'C83 Key Line Guide for Impressioning.stl'),     image: tp(0) },
        { label: 'SC1 / SC4 Keys', url: stl('ImpressioningKeyLineGuides', 'SC1 SC4 Key Line Guide for Impressioning.stl'), image: tp(1) },
        { label: 'Y1 / Y2 Keys',   url: stl('ImpressioningKeyLineGuides', 'Y1 Y2 Key Line Guide for Impressioning.stl'),  image: tp(2) },
      ],
    },
  },
  {
    id: 'zip-tie-cuff',
    name: 'Zip Tie Cuff Adaptors',
    desc: 'Cuff adaptor for 0.35" zip ties and a pull ring with built-in zip tie head.',
    group: 'Tools & Accessories',
    image: PLACEHOLDER,
    variant: {
      kind: 'list',
      files: [
        { label: 'Cuff Adaptor (0.35" zip ties)',      url: stl('ZipTieCuffAdaptor', 'Zip Handcuff Adaptor for 0.35 inch thick Zip Ties.stl'), image: tp(3) },
        { label: 'Pull Ring w/ Built-in Zip Tie Head', url: stl('ZipTieCuffAdaptor', 'Zip Tie Cuff Pull Ring w Built in Zip Tie Head.stl'),    image: tp(0) },
      ],
    },
  },
  {
    id: 'mini-pinning-tray',
    name: 'Mini Pinning Tray',
    desc: 'Compact tray for organizing lock pins during rekeying or pinning sessions.',
    group: 'Tools & Accessories',
    image: PLACEHOLDER,
    variant: { kind: 'single', url: stl('MiniPinningTray', 'Mini Pinning Tray.stl') },
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
  sizes,
}: {
  v: MatrixVariant
  selectedCell: [string, string] | null
  onSelect: (row: string, col: string, img: string | undefined) => void
  sizes: Record<string, number>
}) {
  const maxRowLen = Math.max(...v.rows.map(r => r.length))
  const labelWidth = maxRowLen > 8 ? '6.5rem' : '4.5rem'

  const allUrls = v.rows.flatMap(row => v.cols.map(col => v.files[row][col]))
  const allDownloads = v.baseFile ? [...allUrls, v.baseFile.url] : allUrls

  const selectedUrl   = selectedCell ? v.files[selectedCell[0]][selectedCell[1]] : null
  const selectedLabel = selectedCell ? `${selectedCell[0]} / ${selectedCell[1]}` : null

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
            <div className="version-matrix-row-label">{row}</div>
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
      </div>

      <div className="modal-dl-section">
        {selectedUrl && selectedLabel ? (
          <a
            href={selectedUrl}
            download
            className="modal-dl-selected"
            onClick={e => e.stopPropagation()}
          >
            ↓ Download — {selectedLabel}{sizes[selectedUrl] ? ` (${formatSize(sizes[selectedUrl])})` : ''}
          </a>
        ) : (
          <div className="modal-dl-prompt">Select a version above to download</div>
        )}
        <button
          className="modal-dl-all"
          onClick={e => { e.stopPropagation(); triggerDownloads(allDownloads) }}
        >
          ↓ Download All ({allDownloads.length} files{totalLabel ? ` — ${totalLabel}` : ''})
        </button>
      </div>

      {v.baseFile && (
        <div className="version-modal-base">
          <div className="version-modal-label">ALSO AVAILABLE</div>
          <a
            href={v.baseFile.url}
            download
            className="version-base-btn"
            onClick={e => e.stopPropagation()}
          >
            ↓ {v.baseFile.label}{sizes[v.baseFile.url] ? ` (${formatSize(sizes[v.baseFile.url])})` : ''}
          </a>
        </div>
      )}
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
            ↓ Download — {selectedFile.label}{sizes[selectedFile.url] ? ` (${formatSize(sizes[selectedFile.url])})` : ''}
          </a>
        ) : (
          <div className="modal-dl-prompt">Select a file above to download</div>
        )}
        <button
          className="modal-dl-all"
          onClick={e => { e.stopPropagation(); triggerDownloads(allDownloads) }}
        >
          ↓ Download All ({allDownloads.length} files{totalLabel ? ` — ${totalLabel}` : ''})
        </button>
      </div>
    </>
  )
}

// ── Modal ──────────────────────────────────────────────────────────────────

function ModelModal({ model, onClose }: { model: PrintModel; onClose: () => void }) {
  useModalClose(onClose)
  const v = model.variant
  const [displayImg, setDisplayImg]     = useState(model.image)
  const [selectedCell, setSelectedCell] = useState<[string, string] | null>(null)
  const [selectedIdx, setSelectedIdx]   = useState<number | null>(null)

  const allUrls = useMemo(() => {
    if (v.kind === 'matrix') {
      const urls = v.rows.flatMap(row => v.cols.map(col => v.files[row][col]))
      if (v.baseFile) urls.push(v.baseFile.url)
      return urls
    }
    if (v.kind === 'list') return v.files.map(f => f.url)
    return []
  }, [model]) // eslint-disable-line react-hooks/exhaustive-deps

  const sizes = useSizes(allUrls)

  function handleMatrixSelect(row: string, col: string, img: string | undefined) {
    setSelectedCell([row, col])
    setDisplayImg(img ?? model.image)
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
          <MatrixContent v={v} selectedCell={selectedCell} onSelect={handleMatrixSelect} sizes={sizes} />
        )}
        {v.kind === 'list' && (
          <ListContent v={v} selectedIdx={selectedIdx} onSelect={handleListSelect} sizes={sizes} />
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
      <img src={model.image} alt={model.name} className="print-card-img" />
      <div className="print-card-badges">
        <span className="print-card-badge">{badge}</span>
        {hasBase && <span className="print-card-badge print-card-badge--dim">+ BASE</span>}
        {v.kind === 'single' && <span className="print-card-dl-glyph">↓</span>}
      </div>
    </div>
  )

  if (v.kind === 'single') {
    return (
      <a className="print-card" href={v.url} download aria-label={`Download ${model.name}`}>
        {imageBlock}
        <div className="print-card-body">
          <div className="print-card-name">{model.name}</div>
          <div className="print-card-desc">{model.desc}</div>
          <div className="print-card-cta">↓ Download STL</div>
        </div>
      </a>
    )
  }

  return (
    <button className="print-card" onClick={onOpen} aria-label={model.name}>
      {imageBlock}
      <div className="print-card-body">
        <div className="print-card-name">{model.name}</div>
        <div className="print-card-desc">{model.desc}</div>
        <div className="print-card-cta">
          {v.kind === 'list' ? 'Browse files →' : 'Choose version →'}
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
        <title>3D Prints — Lock Display Stands &amp; More | LockpickingDev</title>
        <meta name="description" content="Free STL files for 3D printable lock display stands and locksport tools by LockpickingDev. Community staples used at meetups and in collections worldwide." />
        <link rel="canonical" href="https://lockpicking.dev/prints" />
      </Helmet>

      {activeModel && activeModel.variant.kind !== 'single' && (
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
            Lock display stands, tools, and hardware — all free to print.
          </p>
          <p className="lab-desc">
            Original 3D printable designs built for the locksport community.
            Download the STL, print it, use it. No cost, no catch.
          </p>
        </div>
      </section>

      {/* COMMUNITY CALLOUT */}
      <section className="picks-section" style={{ background: 'var(--bg)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div className="covert-banner">
            <div className="covert-banner-text">
              <strong>Community Staples</strong>
              <p>
                These lock display stands have been printed and used by hundreds of people across the
                locksport community. If you've been to a meetup and seen a lock on a stand, there's a
                good chance it came from these files.
              </p>
            </div>
            <a
              href="https://www.thingiverse.com/LockpickingDev/designs"
              target="_blank"
              rel="noreferrer"
              className="covert-link-btn"
            >
              View All on Thingiverse →
            </a>
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
            Single-file models download directly.
          </p>
          <div className="prints-grid">
            {grouped.map(({ group, models }) => (
              <Fragment key={group}>
                <div className="prints-group-label">{group}</div>
                {models.map(model => (
                  <PrintCard
                    key={model.id}
                    model={model}
                    onOpen={model.variant.kind !== 'single' ? () => openModal(model) : undefined}
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
