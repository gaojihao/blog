// Inject SEO meta into all static HTML pages under docs/.vuepress/public.
// Idempotent: skips tags that already exist.

const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://lizhi1026.top'
const PUBLIC_DIR = path.resolve(__dirname, '../docs/.vuepress/public')
const SITE_OG_IMAGE = `${SITE_URL}/images/avatar.jpg`

const KEYWORDS_BY_DIR = {
  claude: 'Claude Code,Claude Code 源码,Anthropic,Agent Loop,MCP,Hook,Memory,Permission,Tool 系统,栗志',
  expression: '表达力,沟通训练,刻意练习,演讲技巧,面试话术,述职话术,产品推销,沟通基础,栗志',
}

const FALLBACK_DESC_BY_DIR = {
  claude: 'Claude Code 源码深度解析合集 —— Agent Loop、上下文管理、Hook、MCP、Memory、Permission、Tool 等系统的实现细节。',
  expression: '表达力私人教练完整体系 —— 从本质溯源、知识地图、刻意练习方案到各场景话术与 90 天沟通基础重建手册。',
}

function listHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) listHtml(full, acc)
    else if (name.endsWith('.html')) acc.push(full)
  }
  return acc
}

function getTitle(html) {
  const m = /<title>([\s\S]*?)<\/title>/i.exec(html)
  return m ? m[1].trim() : ''
}

function hasMeta(html, attr) {
  return new RegExp(`<meta\\s[^>]*${attr}`, 'i').test(html)
}

function hasLink(html, rel) {
  return new RegExp(`<link\\s[^>]*rel=["']${rel}["']`, 'i').test(html)
}

function getMetaContent(html, nameOrProp) {
  const re = new RegExp(
    `<meta\\s+[^>]*(?:name|property)=["']${nameOrProp}["'][^>]*content=["']([^"']*)["']`,
    'i'
  )
  const m = re.exec(html)
  return m ? m[1] : ''
}

function inject(html, file) {
  const rel = path.relative(PUBLIC_DIR, file).replace(/\\/g, '/')
  const dir = rel.split('/')[0]
  const url = `${SITE_URL}/${encodeURI(rel)}`
  const canonicalUrl =
    rel.endsWith('/index.html') ? `${SITE_URL}/${encodeURI(rel.slice(0, -'index.html'.length))}` : url

  const title = getTitle(html) || dir
  const existingDesc = getMetaContent(html, 'description')
  const desc = existingDesc || FALLBACK_DESC_BY_DIR[dir] || ''
  const keywords = KEYWORDS_BY_DIR[dir] || '栗志,博客'

  const additions = []
  const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')

  if (!hasMeta(html, 'name=["\']description["\']') && desc)
    additions.push(`<meta name="description" content="${escAttr(desc)}">`)
  if (!hasMeta(html, 'name=["\']keywords["\']'))
    additions.push(`<meta name="keywords" content="${escAttr(keywords)}">`)
  if (!hasMeta(html, 'name=["\']robots["\']'))
    additions.push(`<meta name="robots" content="index,follow">`)
  if (!hasMeta(html, 'name=["\']author["\']'))
    additions.push(`<meta name="author" content="栗志">`)
  if (!hasLink(html, 'canonical'))
    additions.push(`<link rel="canonical" href="${canonicalUrl}">`)

  if (!hasMeta(html, 'property=["\']og:type["\']'))
    additions.push(`<meta property="og:type" content="article">`)
  if (!hasMeta(html, 'property=["\']og:title["\']'))
    additions.push(`<meta property="og:title" content="${escAttr(title)}">`)
  if (!hasMeta(html, 'property=["\']og:description["\']') && desc)
    additions.push(`<meta property="og:description" content="${escAttr(desc)}">`)
  if (!hasMeta(html, 'property=["\']og:url["\']'))
    additions.push(`<meta property="og:url" content="${canonicalUrl}">`)
  if (!hasMeta(html, 'property=["\']og:image["\']'))
    additions.push(`<meta property="og:image" content="${SITE_OG_IMAGE}">`)
  if (!hasMeta(html, 'property=["\']og:site_name["\']'))
    additions.push(`<meta property="og:site_name" content="栗志">`)
  if (!hasMeta(html, 'property=["\']og:locale["\']'))
    additions.push(`<meta property="og:locale" content="zh_CN">`)

  if (!hasMeta(html, 'name=["\']twitter:card["\']'))
    additions.push(`<meta name="twitter:card" content="summary_large_image">`)
  if (!hasMeta(html, 'name=["\']twitter:title["\']'))
    additions.push(`<meta name="twitter:title" content="${escAttr(title)}">`)
  if (!hasMeta(html, 'name=["\']twitter:description["\']') && desc)
    additions.push(`<meta name="twitter:description" content="${escAttr(desc)}">`)
  if (!hasMeta(html, 'name=["\']twitter:image["\']'))
    additions.push(`<meta name="twitter:image" content="${SITE_OG_IMAGE}">`)

  // JSON-LD Article
  if (!/<script[^>]*application\/ld\+json/i.test(html)) {
    const jsonld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: desc,
      author: { '@type': 'Person', name: '栗志', url: SITE_URL + '/' },
      publisher: {
        '@type': 'Organization',
        name: '栗志',
        logo: { '@type': 'ImageObject', url: SITE_OG_IMAGE },
      },
      mainEntityOfPage: canonicalUrl,
      inLanguage: 'zh-CN',
    }
    additions.push(
      `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`
    )
  }

  if (!additions.length) return { html, changed: false }
  const tag = '\n' + additions.join('\n') + '\n'
  // Insert after the <title> tag (or, fallback, after <head>)
  let next
  if (/<\/title>/i.test(html)) {
    next = html.replace(/<\/title>/i, '</title>' + tag)
  } else {
    next = html.replace(/<head[^>]*>/i, (m) => m + tag)
  }
  return { html: next, changed: true, added: additions.length }
}

const files = listHtml(PUBLIC_DIR)
let total = 0
let touched = 0
for (const f of files) {
  // Skip files that aren't real pages (we only have claude/ + expression/ html so this is fine)
  total++
  const src = fs.readFileSync(f, 'utf8')
  const { html, changed, added } = inject(src, f)
  if (changed) {
    fs.writeFileSync(f, html)
    touched++
    console.log(`[+${added}]`, path.relative(PUBLIC_DIR, f))
  } else {
    console.log('[skip]', path.relative(PUBLIC_DIR, f))
  }
}
console.log(`\nProcessed ${total} html files, modified ${touched}.`)
