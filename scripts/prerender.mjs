import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distClient = path.join(root, 'dist')
const distServer = path.join(root, 'dist', 'server')

const template = fs.readFileSync(path.join(distClient, 'index.html'), 'utf-8')
const { render } = await import(pathToFileURL(path.join(distServer, 'entry-server.js')).href)

const routes = ['/', '/resources', '/lockpicks', '/prints']

for (const url of routes) {
  const { html: appHtml, helmet } = render(url)

  const headTags = helmet
    ? [helmet.priority, helmet.title, helmet.meta, helmet.link, helmet.script]
        .map(t => t.toString())
        .filter(s => s.trim())
        .join('\n    ')
    : ''

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
