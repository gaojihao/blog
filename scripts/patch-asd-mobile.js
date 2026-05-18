// One-off patch: rewrite inline <style> and sidebar structure in existing
// generated ASD HTML files to apply mobile-responsive improvements.
// Safe to re-run; idempotent on already-patched files.

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const targets = [
  path.join(root, 'docs', 'asd-html'),
  path.join(root, 'docs', '.vuepress', 'public', 'asd', 'pages'),
];

const NEW_CSS = `
:root{--bg:#f7f7fb;--paper:#fff;--ink:#1f2937;--muted:#6b7280;--brand:#2563eb;--brand2:#7c3aed;--line:#e5e7eb;--soft:#eff6ff;--warn:#fff7ed;--code:#111827;--codebg:#f3f4f6;--shadow:0 20px 60px rgba(15,23,42,.10)}
*{box-sizing:border-box} html{-webkit-text-size-adjust:100%;text-size-adjust:100%} body{margin:0;background:linear-gradient(135deg,#f8fafc,#eef2ff 45%,#fdf2f8);color:var(--ink);font:16px/1.75 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif;overflow-x:hidden;word-wrap:break-word;overflow-wrap:break-word}.layout{display:grid;grid-template-columns:280px minmax(0,1fr);gap:26px;max-width:1440px;margin:0 auto;padding:28px}.sidebar{position:sticky;top:20px;align-self:start;max-height:calc(100vh - 40px);overflow:auto;background:rgba(255,255,255,.88);backdrop-filter:blur(10px);border:1px solid var(--line);border-radius:20px;padding:18px;box-shadow:var(--shadow)}details.sidebar>summary{list-style:none;display:none;cursor:pointer;font-weight:700;color:var(--brand);padding:8px 12px;border-radius:10px;background:var(--soft);user-select:none}details.sidebar>summary::-webkit-details-marker{display:none}details.sidebar>summary::after{content:"\\25BE";float:right;transition:transform .2s}details.sidebar[open]>summary::after{transform:rotate(180deg)}.sidebar h2{font-size:16px;margin:0 0 10px}.sidebar a{display:block;color:#334155;text-decoration:none;border-radius:10px;padding:7px 9px;margin:2px 0;font-size:13px;line-height:1.35;word-break:break-word}.sidebar a:hover{background:var(--soft);color:var(--brand)}.sidebar .toc-l2{padding-left:18px}.sidebar .toc-l3{padding-left:32px;color:#64748b}.content{min-width:0;background:rgba(255,255,255,.94);border:1px solid var(--line);border-radius:24px;box-shadow:var(--shadow);padding:44px 52px}.topbar{display:flex;justify-content:space-between;gap:16px;align-items:center;margin-bottom:28px;flex-wrap:wrap}.badge{display:inline-flex;gap:8px;align-items:center;background:linear-gradient(90deg,var(--brand),var(--brand2));color:#fff;border-radius:999px;padding:8px 14px;font-size:13px}.navlink{color:var(--brand);text-decoration:none;font-weight:600}h1{font-size:34px;line-height:1.25;margin:0 0 22px;color:#0f172a;word-wrap:break-word}h2{font-size:26px;margin:44px 0 14px;padding-top:14px;border-top:1px solid var(--line);word-wrap:break-word}h3{font-size:21px;margin:30px 0 10px;word-wrap:break-word}h4{font-size:18px;margin:24px 0 8px;word-wrap:break-word}p{margin:12px 0;word-wrap:break-word;overflow-wrap:break-word}a{word-break:break-word;overflow-wrap:anywhere}blockquote{margin:18px 0;padding:14px 18px;border-left:5px solid var(--brand);background:var(--soft);border-radius:12px;color:#1e3a8a}img,video,svg{max-width:100%;height:auto}.table-wrap,table{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}table{border-collapse:collapse;margin:18px 0;border-radius:14px;display:table}th,td{border:1px solid var(--line);padding:10px 12px;vertical-align:top}th{background:#f1f5f9;text-align:left}tr:nth-child(even) td{background:#fafafa}pre{background:#0b1020;color:#e5e7eb;border-radius:16px;padding:18px;overflow:auto;line-height:1.55;-webkit-overflow-scrolling:touch;max-width:100%}code{font-family:"SFMono-Regular",Consolas,"Liberation Mono",Menlo,monospace;word-break:break-word}p code,li code,td code{background:var(--codebg);color:#be123c;padding:2px 6px;border-radius:6px}pre code{word-break:normal;overflow-wrap:normal;white-space:pre}ul,ol{padding-left:1.5em}.anchor{opacity:.25;text-decoration:none;margin-right:8px;color:var(--brand)}h1:hover .anchor,h2:hover .anchor,h3:hover .anchor{opacity:1}.flowchart{margin:22px 0;padding:18px;border:1px solid #bfdbfe;background:linear-gradient(180deg,#eff6ff,#fff);border-radius:18px;display:flex;flex-direction:column;align-items:center;gap:8px;overflow-x:auto}.flow-step{width:min(640px,100%);display:flex;align-items:flex-start;gap:12px;background:#fff;border:1px solid #dbeafe;border-radius:14px;padding:12px 14px;box-shadow:0 8px 22px rgba(37,99,235,.08)}.flow-num{flex:0 0 auto;width:26px;height:26px;border-radius:50%;display:inline-grid;place-items:center;background:var(--brand);color:white;font-weight:700;font-size:13px}.flow-arrow{color:var(--brand);font-size:22px;font-weight:800;line-height:1}.raw-flow{margin:8px 0 20px;color:var(--muted)}.raw-flow summary{cursor:pointer}.footer{margin-top:48px;padding-top:20px;border-top:1px solid var(--line);color:var(--muted);font-size:14px}.callout{background:var(--warn);border:1px solid #fed7aa;border-radius:16px;padding:14px 16px;margin:18px 0}.page-list{columns:2;column-gap:28px}.page-list a{display:block;break-inside:avoid;text-decoration:none;color:#1d4ed8;padding:8px 0;border-bottom:1px dashed #dbeafe}.meta{color:var(--muted);font-size:14px}
@media(min-width:961px){details.sidebar>summary{display:none}details.sidebar>:not(summary){display:revert!important}}
@media(max-width:960px){.layout{display:block;padding:16px;gap:0}.sidebar{position:relative;top:0;max-height:none;margin-bottom:14px;border-radius:14px;padding:10px 12px}details.sidebar>summary{display:block}details.sidebar:not([open])>:not(summary){display:none!important}details.sidebar[open]>h2{margin-top:14px}.sidebar a{padding:8px 10px;font-size:14px}.content{padding:22px 16px;border-radius:18px}.page-list{columns:1}h1{font-size:26px;margin:0 0 14px}h2{font-size:21px;margin:32px 0 10px}h3{font-size:18px;margin:22px 0 8px}h4{font-size:16px}.topbar{margin-bottom:18px;gap:10px}.badge{font-size:12px;padding:6px 10px}table{display:block;overflow-x:auto;white-space:normal;font-size:14px}th,td{padding:8px 10px}pre{padding:14px;font-size:13px;border-radius:12px}blockquote{margin:14px 0;padding:12px 14px}.callout{padding:12px 14px}.flowchart{padding:14px}.flow-step{padding:10px 12px;font-size:14px}}
@media(max-width:480px){body{font-size:15px;line-height:1.7}.layout{padding:10px}.content{padding:18px 14px;border-radius:14px}h1{font-size:23px}h2{font-size:19px}h3{font-size:17px}.badge{font-size:11px;padding:5px 9px}table{font-size:13px}th,td{padding:6px 8px}pre{padding:12px;font-size:12.5px}ul,ol{padding-left:1.2em}}
`.trim();

let touched = 0;
let skipped = 0;

for (const dir of targets) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html'));
  for (const name of files) {
    const full = path.join(dir, name);
    let html = fs.readFileSync(full, 'utf8');

    // Replace the first <style>...</style>
    const styleRe = /<style>[\s\S]*?<\/style>/;
    if (!styleRe.test(html)) {
      skipped++;
      continue;
    }
    html = html.replace(styleRe, `<style>${NEW_CSS}</style>`);

    // Replace <aside class="sidebar">...</aside> → <details class="sidebar"><summary>目录</summary>...</details>
    html = html.replace(
      /<aside class="sidebar">([\s\S]*?)<\/aside>/,
      (_m, inner) => `<details class="sidebar"><summary>目录</summary>${inner}</details>`
    );

    fs.writeFileSync(full, html);
    touched++;
  }
}

console.log(`patched ${touched} files, skipped ${skipped}`);
