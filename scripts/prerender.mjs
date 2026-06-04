import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distClient = path.join(root, 'dist')
const distServer = path.join(root, 'dist', 'server')

const template = fs.readFileSync(path.join(distClient, 'index.html'), 'utf-8')
const { render } = await import(pathToFileURL(path.join(distServer, 'entry-server.js')).href)

// React 19 + react-helmet-async v3: head tags render inline instead of populating
// helmetContext. Extract leading <title>, <meta>, <link>, <script> from the rendered
// HTML so we can hoist them into <head> and strip them from the body.
function extractHeadTags(html) {
  let rest = html
  const tags = []
  let m
  for (;;) {
    if ((m = rest.match(/^<(title|script)(\s[^>]*)?>[\s\S]*?<\/\1>/i))) {
      tags.push(m[0])
      rest = rest.slice(m[0].length)
    } else if ((m = rest.match(/^<(meta|link)(\s[^>]*)?\/?>/i))) {
      tags.push(m[0])
      rest = rest.slice(m[0].length)
    } else {
      break
    }
  }
  return { headTags: tags.join('\n    '), appHtml: rest }
}

const routes = ['/', '/resources', '/lockpicks', '/prints']

for (const url of routes) {
  const { html: rawHtml, helmet } = render(url)

  let headTags = ''
  let appHtml = rawHtml

  if (helmet) {
    // React 18 / classic react-helmet-async path
    headTags = [helmet.priority, helmet.title, helmet.meta, helmet.link, helmet.script]
      .map(t => t.toString())
      .filter(s => s.trim())
      .join('\n    ')
  } else {
    // React 19 path: head tags are at the start of the rendered HTML
    const extracted = extractHeadTags(rawHtml)
    headTags = extracted.headTags
    appHtml = extracted.appHtml
  }

  const pageHtml = template
    .replace('<!--app-head-->', headTags)
    .replace('<!--app-html-->', appHtml)

  const outPath =
    url === '/'
      ? path.join(distClient, 'index.html')
      : path.join(distClient, url.slice(1), 'index.html')

  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, pageHtml)
  console.log(`  pre-rendered: ${url}`)
}

console.log('Pre-rendering complete.')
