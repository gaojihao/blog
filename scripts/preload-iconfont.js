// After vuepress build, find the hashed iconfont.woff2 in dist/assets and inject
// <link rel="preload" as="font"> into every dist/**/*.html <head>.
// This lets the browser kick off the font download immediately on HTML parse,
// instead of waiting for CSS to be fetched + parsed (which costs an extra RTT).

const fs = require('fs')
const path = require('path')

const DIST = path.resolve(__dirname, '../docs/.vuepress/dist')
const ASSETS = path.join(DIST, 'assets')

if (!fs.existsSync(ASSETS)) {
  console.error('[preload-iconfont] dist/assets not found, did vuepress build run?')
  process.exit(0)
}

const fontFile = fs.readdirSync(ASSETS).find((f) => /^iconfont\.[a-f0-9]+\.woff2$/.test(f))
if (!fontFile) {
  console.warn('[preload-iconfont] no iconfont.*.woff2 found in dist/assets, skipping')
  process.exit(0)
}

const fontUrl = `/assets/${fontFile}`
const tag = `<link rel="preload" href="${fontUrl}" as="font" type="font/woff2" crossorigin>`

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) walk(full)
    else if (name.endsWith('.html')) injectInto(full)
  }
}

let touched = 0
let total = 0
function injectInto(file) {
  total++
  const src = fs.readFileSync(file, 'utf8')
  if (src.includes(fontUrl) && /rel=["']preload["']/.test(src)) return
  if (!/<head[^>]*>/i.test(src)) return
  const next = src.replace(/<head[^>]*>/i, (m) => m + tag)
  fs.writeFileSync(file, next)
  touched++
}

walk(DIST)
console.log(`[preload-iconfont] injected ${tag} into ${touched}/${total} html files`)
