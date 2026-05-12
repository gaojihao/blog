// Generate sitemap.xml + robots.txt covering all md routes and public html files.
// Run: node scripts/generate-sitemap.js  (also wired to docs:build via package.json if desired)

const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://lizhi1026.top'
const DOCS_DIR = path.resolve(__dirname, '../docs')
const PUBLIC_DIR = path.resolve(DOCS_DIR, '.vuepress/public')

const urls = new Set()

function walkMd(dir, rel = '') {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const relPath = path.posix.join(rel, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      if (name === '.vuepress' || name === 'node_modules' || name.startsWith('.')) continue
      walkMd(full, relPath)
      continue
    }
    if (!name.endsWith('.md')) continue
    const src = fs.readFileSync(full, 'utf8')
    let route
    const fm = /^---\s*\n([\s\S]*?)\n---/.exec(src)
    if (fm) {
      const m = /\bpermalink:\s*([^\n]+)/.exec(fm[1])
      if (m) route = m[1].trim().replace(/^["']|["']$/g, '')
    }
    if (!route) {
      const isHome = fm && /\bhome:\s*true\b/.test(fm[1])
      if (isHome && relPath === 'index.md') route = '/'
      else if (name === 'index.md') route = '/' + rel.replace(/\\/g, '/') + (rel ? '/' : '')
      else route = '/' + relPath.replace(/\\/g, '/').replace(/\.md$/, '.html')
    }
    urls.add(route)
  }
}

function walkPublicHtml(dir, rel = '') {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const relPath = path.posix.join(rel, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      walkPublicHtml(full, relPath)
      continue
    }
    if (!name.endsWith('.html')) continue
    urls.add('/' + relPath.replace(/\\/g, '/'))
  }
}

walkMd(DOCS_DIR)
if (fs.existsSync(PUBLIC_DIR)) walkPublicHtml(PUBLIC_DIR)

// Drop public /<dir>/index.html when a markdown route already owns /<dir>/
for (const u of [...urls]) {
  if (u.endsWith('/index.html')) {
    const dirRoute = u.slice(0, -'index.html'.length)
    if (urls.has(dirRoute)) urls.delete(u)
  }
}

const sorted = [...urls].sort()
const lastmod = new Date().toISOString().slice(0, 10)

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sorted
    .map((u) => {
      const loc = SITE_URL + encodeURI(u)
      const priority = u === '/' ? '1.0' : u.split('/').length <= 2 ? '0.8' : '0.6'
      const changefreq = u === '/' ? 'weekly' : 'monthly'
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    })
    .join('\n') +
  `\n</urlset>\n`

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml)

const robots =
  `User-agent: *\n` +
  `Allow: /\n\n` +
  `Sitemap: ${SITE_URL}/sitemap.xml\n`
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots)

console.log(`[sitemap] wrote ${sorted.length} URLs`)
sorted.forEach((u) => console.log('  ' + u))
