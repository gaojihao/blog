const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

const root = path.resolve(__dirname, '..');
const docsDir = path.join(root, 'docs');
const outDir = path.join(docsDir, 'asd-html');
const publicOutDir = path.join(docsDir, '.vuepress', 'public', 'asd', 'pages');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(publicOutDir, { recursive: true });

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugify(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/[\s/\\]+/g, '-')
    .replace(/[：:，,。！？?；;（）()【】\[\]《》<>"'`~!@#$%^&*+=|{}]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'section';
}

function parseFrontmatter(src) {
  if (!src.startsWith('---\n')) return { data: {}, body: src };
  const end = src.indexOf('\n---', 4);
  if (end === -1) return { data: {}, body: src };
  const raw = src.slice(4, end).trim();
  const body = src.slice(src.indexOf('\n', end + 4) + 1);
  const data = {};
  raw.split(/\r?\n/).forEach(line => {
    const idx = line.indexOf(':');
    if (idx > -1) data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
  });
  return { data, body };
}

function extractToc(body) {
  const headings = [];
  body.split(/\r?\n/).forEach(line => {
    const m = /^(#{1,3})\s+(.+?)\s*$/.exec(line);
    if (m) {
      const level = m[1].length;
      let text = m[2].replace(/<[^>]+>/g, '').replace(/[*_`]/g, '').trim();
      headings.push({ level, text, id: slugify(text) });
    }
  });
  const seen = new Map();
  headings.forEach(h => {
    const count = seen.get(h.id) || 0;
    seen.set(h.id, count + 1);
    if (count) h.id = `${h.id}-${count + 1}`;
  });
  return headings;
}

function addHeadingIds(html, headings) {
  let i = 0;
  return html.replace(/<h([1-3])>(.*?)<\/h\1>/g, (full, level, inner) => {
    const h = headings[i++];
    if (!h) return full;
    return `<h${level} id="${escapeHtml(h.id)}"><a class="anchor" href="#${escapeHtml(h.id)}" aria-hidden="true">#</a>${inner}</h${level}>`;
  });
}

function buildFlowBlocks(body) {
  // Convert fenced text blocks that are primarily arrow flows into visual flow diagrams while preserving text elsewhere.
  return body.replace(/```text\n([\s\S]*?)\n```/g, (full, code) => {
    const lines = code.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const arrowOnly = lines.length >= 3 && lines.some(l => /^↓+$/.test(l)) && lines.filter(l => /^↓+$/.test(l)).length >= Math.floor(lines.length / 3);
    const hasInlineArrow = lines.length >= 1 && lines.some(l => /→|->|=>/.test(l));
    if (!arrowOnly && !hasInlineArrow) return full;
    let items = [];
    if (arrowOnly) {
      items = lines.filter(l => !/^↓+$/.test(l));
    } else {
      items = code.split(/→|->|=>/).map(s => s.trim()).filter(Boolean);
    }
    const html = `<div class="flowchart" role="group" aria-label="流程图">${items.map((item, idx) => `<div class="flow-step"><span class="flow-num">${idx + 1}</span><span>${escapeHtml(item)}</span></div>`).join('<div class="flow-arrow">↓</div>')}</div>`;
    return `\n${html}\n\n<details class="raw-flow"><summary>查看原始流程文本</summary>\n\n\`\`\`text\n${code}\n\`\`\`\n\n</details>`;
  });
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: false,
  breaks: false
});

const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};
md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
  const hrefIndex = tokens[idx].attrIndex('href');
  if (hrefIndex >= 0) {
    const href = tokens[idx].attrs[hrefIndex][1];
    const m = /^\/(asd-[^/]+)\/$/.exec(href);
    if (m) tokens[idx].attrs[hrefIndex][1] = `${m[1]}.html`;
  }
  const aIndex = tokens[idx].attrIndex('target');
  if (aIndex < 0) tokens[idx].attrPush(['target', '_blank']);
  const rIndex = tokens[idx].attrIndex('rel');
  if (rIndex < 0) tokens[idx].attrPush(['rel', 'noopener noreferrer']);
  return defaultRender(tokens, idx, options, env, self);
};

const learningOrder = [
  // L1 新人观察员：先看懂孩子和边界
  'asd-new-trainer-handbook.md',
  'asd-child-development-milestones.md',
  'asd-case-intake-and-observation-forms.md',
  'asd-ethics-safety-and-professional-boundaries.md',
  'asd-trainer-30-90-180-day-growth-plan.md',

  // L2 基础执行训练师：基础教学技术
  'asd-reinforcement-and-token-system.md',
  'asd-prompting-and-prompt-fading.md',
  'asd-dtt-structured-teaching.md',
  'asd-net-natural-environment-teaching.md',
  'asd-data-recording-and-progress-reporting.md',

  // L3 独立训练师：沟通、社交与行为
  'asd-functional-communication-training.md',
  'asd-communication-levels-and-aac.md',
  'asd-social-play-and-joint-attention.md',
  'asd-abc-behavior-record-and-function-analysis.md',
  'asd-emotion-and-challenging-behavior-intervention.md',

  // L4 生活生态层：生活、感觉、学校、家庭
  'asd-life-skills-and-self-care-training.md',
  'asd-sensory-processing-and-regulation.md',
  'asd-school-inclusion-and-support.md',
  'asd-parent-training-and-home-generalization.md',

  // L5 个案管理层：评估、IEP与个案管理
  'asd-case-report-and-iep-writing.md',
  'asd-standardized-assessments-and-goal-translation.md',
  'asd-case-conceptualization-and-integrated-planning.md',
  'asd-case-library-for-new-trainers.md',

  // L6 高级训练师：青春期、共患、危机和转衔
  'asd-vocational-transition-and-adolescent-support.md',
  'asd-comorbidities-red-flags-and-referral.md',
  'asd-complex-behavior-crisis-and-safety-planning.md',
  'asd-advanced-case-supervision-library.md',

  // L7 专家督导：循证、协作、督导、机构与持续学习
  'asd-expert-competency-map-and-gap-analysis.md',
  'asd-expert-documentation-roadmap.md',
  'asd-evidence-based-practices-and-pseudoscience.md',
  'asd-research-literacy-and-continuing-education.md',
  'asd-multidisciplinary-collaboration.md',
  'asd-supervision-coaching-and-quality-control.md',
  'asd-clinic-curriculum-system-and-operations.md',
  'asd-trainer-competency-assessment-and-certification.md',
  'asd-expert-reading-list-and-resource-map.md',

  // 总目录放最后参与转换，但 HTML 首页会单独置顶
  'asd-index.md'
];
const discovered = fs.readdirSync(docsDir).filter(f => /^asd-.*\.md$/.test(f) && f !== 'asd-index.md');
const orderMap = new Map(learningOrder.map((f, i) => [f, i]));
const files = discovered.sort((a, b) => {
  const ai = orderMap.has(a) ? orderMap.get(a) : 10000;
  const bi = orderMap.has(b) ? orderMap.get(b) : 10000;
  return ai - bi || a.localeCompare(b);
});
const pages = [];

const css = `
:root{--bg:#f7f7fb;--paper:#fff;--ink:#1f2937;--muted:#6b7280;--brand:#2563eb;--brand2:#7c3aed;--line:#e5e7eb;--soft:#eff6ff;--warn:#fff7ed;--code:#111827;--codebg:#f3f4f6;--shadow:0 20px 60px rgba(15,23,42,.10)}
*{box-sizing:border-box} html{-webkit-text-size-adjust:100%;text-size-adjust:100%} body{margin:0;background:linear-gradient(135deg,#f8fafc,#eef2ff 45%,#fdf2f8);color:var(--ink);font:16px/1.75 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif;overflow-x:hidden;word-wrap:break-word;overflow-wrap:break-word}.layout{display:grid;grid-template-columns:280px minmax(0,1fr);gap:26px;max-width:1440px;margin:0 auto;padding:28px}.sidebar{position:sticky;top:20px;align-self:start;max-height:calc(100vh - 40px);overflow:auto;background:rgba(255,255,255,.88);backdrop-filter:blur(10px);border:1px solid var(--line);border-radius:20px;padding:18px;box-shadow:var(--shadow)}details.sidebar>summary{list-style:none;display:none;cursor:pointer;font-weight:700;color:var(--brand);padding:8px 12px;border-radius:10px;background:var(--soft);user-select:none}details.sidebar>summary::-webkit-details-marker{display:none}details.sidebar>summary::after{content:"▾";float:right;transition:transform .2s}details.sidebar[open]>summary::after{transform:rotate(180deg)}.sidebar h2{font-size:16px;margin:0 0 10px}.sidebar a{display:block;color:#334155;text-decoration:none;border-radius:10px;padding:7px 9px;margin:2px 0;font-size:13px;line-height:1.35;word-break:break-word}.sidebar a:hover{background:var(--soft);color:var(--brand)}.sidebar .toc-l2{padding-left:18px}.sidebar .toc-l3{padding-left:32px;color:#64748b}.content{min-width:0;background:rgba(255,255,255,.94);border:1px solid var(--line);border-radius:24px;box-shadow:var(--shadow);padding:44px 52px}.topbar{display:flex;justify-content:space-between;gap:16px;align-items:center;margin-bottom:28px;flex-wrap:wrap}.badge{display:inline-flex;gap:8px;align-items:center;background:linear-gradient(90deg,var(--brand),var(--brand2));color:#fff;border-radius:999px;padding:8px 14px;font-size:13px}.navlink{color:var(--brand);text-decoration:none;font-weight:600}h1{font-size:34px;line-height:1.25;margin:0 0 22px;color:#0f172a;word-wrap:break-word}h2{font-size:26px;margin:44px 0 14px;padding-top:14px;border-top:1px solid var(--line);word-wrap:break-word}h3{font-size:21px;margin:30px 0 10px;word-wrap:break-word}h4{font-size:18px;margin:24px 0 8px;word-wrap:break-word}p{margin:12px 0;word-wrap:break-word;overflow-wrap:break-word}a{word-break:break-word;overflow-wrap:anywhere}blockquote{margin:18px 0;padding:14px 18px;border-left:5px solid var(--brand);background:var(--soft);border-radius:12px;color:#1e3a8a}img,video,svg{max-width:100%;height:auto}.table-wrap,table{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}table{border-collapse:collapse;margin:18px 0;border-radius:14px;display:table}th,td{border:1px solid var(--line);padding:10px 12px;vertical-align:top}th{background:#f1f5f9;text-align:left}tr:nth-child(even) td{background:#fafafa}pre{background:#0b1020;color:#e5e7eb;border-radius:16px;padding:18px;overflow:auto;line-height:1.55;-webkit-overflow-scrolling:touch;max-width:100%}code{font-family:"SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace;word-break:break-word}p code,li code,td code{background:var(--codebg);color:#be123c;padding:2px 6px;border-radius:6px}pre code{word-break:normal;overflow-wrap:normal;white-space:pre}ul,ol{padding-left:1.5em}.anchor{opacity:.25;text-decoration:none;margin-right:8px;color:var(--brand)}h1:hover .anchor,h2:hover .anchor,h3:hover .anchor{opacity:1}.flowchart{margin:22px 0;padding:18px;border:1px solid #bfdbfe;background:linear-gradient(180deg,#eff6ff,#fff);border-radius:18px;display:flex;flex-direction:column;align-items:center;gap:8px;overflow-x:auto}.flow-step{width:min(640px,100%);display:flex;align-items:flex-start;gap:12px;background:#fff;border:1px solid #dbeafe;border-radius:14px;padding:12px 14px;box-shadow:0 8px 22px rgba(37,99,235,.08)}.flow-num{flex:0 0 auto;width:26px;height:26px;border-radius:50%;display:inline-grid;place-items:center;background:var(--brand);color:white;font-weight:700;font-size:13px}.flow-arrow{color:var(--brand);font-size:22px;font-weight:800;line-height:1}.raw-flow{margin:8px 0 20px;color:var(--muted)}.raw-flow summary{cursor:pointer}.footer{margin-top:48px;padding-top:20px;border-top:1px solid var(--line);color:var(--muted);font-size:14px}.callout{background:var(--warn);border:1px solid #fed7aa;border-radius:16px;padding:14px 16px;margin:18px 0}.page-list{columns:2;column-gap:28px}.page-list a{display:block;break-inside:avoid;text-decoration:none;color:#1d4ed8;padding:8px 0;border-bottom:1px dashed #dbeafe}.meta{color:var(--muted);font-size:14px}
@media(min-width:961px){details.sidebar>summary{display:none}details.sidebar>:not(summary){display:revert!important}}
@media(max-width:960px){.layout{display:block;padding:16px;gap:0}.sidebar{position:relative;top:0;max-height:none;margin-bottom:14px;border-radius:14px;padding:10px 12px}details.sidebar>summary{display:block}details.sidebar:not([open])>:not(summary){display:none!important}details.sidebar[open]>h2{margin-top:14px}.sidebar a{padding:8px 10px;font-size:14px}.content{padding:22px 16px;border-radius:18px}.page-list{columns:1}h1{font-size:26px;margin:0 0 14px}h2{font-size:21px;margin:32px 0 10px}h3{font-size:18px;margin:22px 0 8px}h4{font-size:16px}.topbar{margin-bottom:18px;gap:10px}.badge{font-size:12px;padding:6px 10px}table{display:block;overflow-x:auto;white-space:normal;font-size:14px}th,td{padding:8px 10px}pre{padding:14px;font-size:13px;border-radius:12px}blockquote{margin:14px 0;padding:12px 14px}.callout{padding:12px 14px}.flowchart{padding:14px}.flow-step{padding:10px 12px;font-size:14px}}
@media(max-width:480px){body{font-size:15px;line-height:1.7}.layout{padding:10px}.content{padding:18px 14px;border-radius:14px}h1{font-size:23px}h2{font-size:19px}h3{font-size:17px}.badge{font-size:11px;padding:5px 9px}table{font-size:13px}th,td{padding:6px 8px}pre{padding:12px;font-size:12.5px}ul,ol{padding-left:1.2em}}
`;

function renderPage(file, orderIndex) {
  const src = fs.readFileSync(path.join(docsDir, file), 'utf8');
  const { data, body: rawBody } = parseFrontmatter(src);
  const title = data.title || file.replace(/\.md$/, '');
  const body = buildFlowBlocks(rawBody);
  const toc = extractToc(body);
  let html = md.render(body);
  html = addHeadingIds(html, toc);
  const outName = file.replace(/\.md$/, '.html');
  pages.push({ file, outName, title, permalink: data.permalink || '', seq: String(orderIndex + 1).padStart(2, '0') });
  const tocHtml = toc.filter(h => h.level <= 3).map(h => `<a class="toc-l${h.level}" href="#${escapeHtml(h.id)}">${escapeHtml(h.text)}</a>`).join('\n');
  const full = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${css}</style>
</head>
<body>
<div class="layout">
<details class="sidebar">
  <summary>目录</summary>
  <h2>目录</h2>
  <a class="navlink" href="index.html">← HTML总索引</a>
  ${tocHtml || '<span class="meta">无目录</span>'}
</details>
<main class="content">
  <div class="topbar"><span class="badge">ASD训练师资料库 · 第 ${String(orderIndex + 1).padStart(2, '0')} 篇</span><a class="navlink" href="${escapeHtml(data.permalink || '/asd/')}">查看站内Markdown页面</a></div>
  ${html}
  <div class="footer">由 ${escapeHtml(file)} 转换生成。保留原文清单、表格、模板和代码块；流程型文本已增强为图例展示，并保留原始文本。</div>
</main>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(outDir, outName), full);
  fs.writeFileSync(path.join(publicOutDir, outName), full);
}

files.forEach((file, i) => renderPage(file, i));

const indexHtml = `<!doctype html>
<html lang="zh-CN">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ASD康复训练师资料库 HTML总索引</title><style>${css}</style></head>
<body><div class="layout"><details class="sidebar"><summary>目录</summary><h2>HTML总索引</h2><p class="meta">共 ${pages.length} 份文档</p><a class="navlink" href="/asd/">站内ASD总目录</a></details><main class="content"><div class="topbar"><span class="badge">ASD康复训练师资料库 · HTML版</span><a class="navlink" href="/asd/">返回站内ASD目录</a></div><h1>ASD康复训练师资料库 HTML总索引</h1><p>以下为由 <code>docs/asd-*.md</code> 转换生成的独立 HTML 页面。每个页面均保留原文细节、表格、模板、代码块；流程型文本已增强为图例展示。</p><div class="page-list">${pages.map((p) => `<a href="${escapeHtml(p.outName)}"><strong>${p.seq}. ${escapeHtml(p.title)}</strong><br><span class="meta">${escapeHtml(p.file)}</span></a>`).join('\n')}</div><div class="footer">生成时间：${new Date().toISOString()}</div></main></div></body></html>`;
fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);
fs.writeFileSync(path.join(publicOutDir, 'index.html'), indexHtml);

console.log(`Converted ${pages.length} markdown files to ${outDir}`);
