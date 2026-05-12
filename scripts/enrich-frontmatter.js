// One-shot enricher: read each docs/*.md, derive description + keywords from the body,
// and merge them into the frontmatter (preserving title / permalink / etc).

const fs = require('fs')
const path = require('path')

const DOCS_DIR = path.resolve(__dirname, '../docs')

function readFm(src) {
  const m = /^---\s*\n([\s\S]*?)\n---\s*\n?/.exec(src)
  if (!m) return { fm: '', body: src, end: 0 }
  return { fm: m[1], body: src.slice(m[0].length), end: m[0].length }
}

function fmGet(fm, key) {
  const m = new RegExp(`^${key}:\\s*([^\\n]+)`, 'm').exec(fm)
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null
}

function fmHas(fm, key) {
  return new RegExp(`^${key}:`, 'm').test(fm)
}

function fmSet(fm, key, value) {
  if (fmHas(fm, key)) {
    return fm.replace(new RegExp(`^${key}:[^\\n]*`, 'm'), `${key}: ${value}`)
  }
  return (fm ? fm + '\n' : '') + `${key}: ${value}`
}

function pickDescription(body) {
  const lines = body.split('\n')
  // Prefer "> 核心目的：..." blockquote line
  for (const l of lines) {
    const m = /^>\s*[*_]*核心目的[*_]*[:：]\s*(.+?)\s*$/.exec(l)
    if (m) return clean(m[1])
  }
  // Fallback: first "> 适用对象" line
  for (const l of lines) {
    const m = /^>\s*[*_]*(适用对象|使用场景)[*_]*[:：]\s*(.+?)\s*$/.exec(l)
    if (m) return clean(m[2])
  }
  // Fallback: first non-heading, non-quote paragraph
  for (const l of lines) {
    const t = l.trim()
    if (!t) continue
    if (t.startsWith('#')) continue
    if (t.startsWith('>')) continue
    if (t.startsWith('---')) continue
    if (t.startsWith('|')) continue
    if (t.startsWith('-') || t.startsWith('*')) continue
    if (/^\d+\.\s/.test(t)) continue
    return clean(t)
  }
  return ''
}

function clean(s) {
  return s
    .replace(/[*`_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 150)
}

function pickKeywords(title, body) {
  const heads = []
  for (const l of body.split('\n')) {
    const m = /^##\s+(.+?)\s*$/.exec(l)
    if (m) heads.push(m[1].replace(/[*`_]/g, '').replace(/[一二三四五六七八九十]+、/, '').trim())
    if (heads.length >= 4) break
  }
  const base = ['自闭症', 'ASD', '康复训练', '行为干预']
  const fromTitle = title ? [title] : []
  return [...new Set([...fromTitle, ...heads, ...base])].slice(0, 8).join(',')
}

const targets = fs
  .readdirSync(DOCS_DIR)
  .filter((n) => n.endsWith('.md'))
  .map((n) => path.join(DOCS_DIR, n))

let touched = 0
for (const file of targets) {
  const src = fs.readFileSync(file, 'utf8')
  const { fm, body } = readFm(src)
  const title = fmGet(fm, 'title') || ''
  const base = path.basename(file)

  // Skip the home + theme-rendered pages — those have layout-driven content
  const skip = ['index.md'].includes(base)
  if (skip) continue

  let newFm = fm

  if (!fmHas(newFm, 'description')) {
    let desc = pickDescription(body)
    if (!desc && title) desc = `${title}：栗志整理的实战手册与方法论。`
    if (desc) newFm = fmSet(newFm, 'description', JSON.stringify(desc))
  }
  if (!fmHas(newFm, 'keywords')) {
    // ASD topic keywords for asd-*.md, generic for others
    let kw
    if (base.startsWith('asd-')) {
      kw = pickKeywords(title, body)
    } else if (base === 'asd.md') {
      kw = '自闭症,ASD,康复训练,行为干预,ABA,DTT,NET,IEP,新人训练师,督导,栗志'
    } else if (base === 'tools.md') {
      kw = '开发者工具,在线工具,前端工具,JSON 格式化,Base64,URL 编码,时间戳,栗志'
    } else if (base === 'claude.md') {
      kw = 'Claude Code,Claude Code 源码,Agent Loop,MCP,Hook,Memory,Permission,Tool 系统'
    } else if (base === 'expression.md') {
      kw = '表达力,沟通训练,刻意练习,演讲,面试话术,述职,沟通基础,栗志'
    } else {
      kw = '栗志,Li Zhi,博客,全栈,AI'
    }
    newFm = fmSet(newFm, 'keywords', JSON.stringify(kw))
  }

  if (newFm !== fm) {
    const out = `---\n${newFm}\n---\n${body.startsWith('\n') ? body : '\n' + body}`
      .replace(/^---\n\n/, '---\n')
    fs.writeFileSync(file, out)
    touched++
    console.log('[enriched]', base)
  } else {
    console.log('[skip]', base)
  }
}
console.log(`\nDone. Updated ${touched} of ${targets.length} files.`)
