// Inject a universal mobile-responsive CSS patch into each Claude HTML
// before its closing </style>. Idempotent — re-running is a no-op.

const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '../docs/.vuepress/public/claude');
const MARKER = '/* mobile-patch-v1 */';

const PATCH = `
${MARKER}
html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
body { overflow-x: hidden; word-wrap: break-word; overflow-wrap: break-word; }
img, video, svg { max-width: 100%; height: auto; }
a { word-break: break-word; overflow-wrap: anywhere; }
pre { max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
pre code { white-space: pre; word-break: normal; overflow-wrap: normal; }
table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; max-width: 100%; }
.mermaid { overflow-x: auto; -webkit-overflow-scrolling: touch; max-width: 100%; }

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr !important; gap: 0 !important; }
  nav.toc, aside.toc, .layout > nav, .layout > aside { display: none !important; }
  main, .container, .hero { max-width: 100% !important; }
  .hero { padding: 48px 18px 32px !important; }
  .hero h1 { font-size: clamp(26px, 6vw, 36px) !important; line-height: 1.2 !important; }
  .hero-sub, .hero p { font-size: 16px !important; }
  .container, main { padding-left: 18px !important; padding-right: 18px !important; }
  .topnav-inner { padding: 12px 16px !important; gap: 8px; }
  .topnav-inner .brand { font-size: 15px !important; }
  .nav-links { gap: 12px !important; font-size: 13px !important; }
  section { padding: 40px 0 !important; }
  section h2 { font-size: 24px !important; line-height: 1.3 !important; flex-wrap: wrap; }
  h3 { font-size: 19px !important; }
  h4 { font-size: 16.5px !important; }
  .card-grid, .card-grid.col-2, .two-col, .three-col, .phase-grid,
  .arch-grid, .grid-2, .grid-3, .grid-4, .col-2, .col-3 {
    grid-template-columns: 1fr !important;
    gap: 14px !important;
  }
  .card, .col-card, .callout, .arch-box { padding: 18px !important; }
  .toc { padding: 18px 20px !important; }
  .toc ol { columns: 1 !important; }
  .hero-meta { gap: 12px !important; }
  th, td { padding: 8px 10px; font-size: 14px; }
  pre { padding: 14px !important; font-size: 12.5px !important; }
  blockquote { padding: 12px 14px !important; }
}

@media (max-width: 480px) {
  body { font-size: 15px; line-height: 1.7; }
  .hero { padding: 32px 14px 24px !important; }
  .hero h1 { font-size: 23px !important; }
  .container, main { padding-left: 14px !important; padding-right: 14px !important; }
  section { padding: 32px 0 !important; }
  section h2 { font-size: 20px !important; }
  h3 { font-size: 17px !important; }
  .topnav-inner { padding: 10px 14px !important; }
  .nav-links { gap: 10px !important; font-size: 12.5px !important; }
  .card, .col-card, .callout, .arch-box { padding: 14px !important; }
  .toc { padding: 14px 16px !important; }
  th, td { padding: 6px 8px; font-size: 13px; }
  pre { padding: 12px !important; font-size: 12px !important; border-radius: 8px !important; }
}
`;

let touched = 0;
let skipped = 0;

for (const name of fs.readdirSync(dir)) {
  if (!name.endsWith('.html')) continue;
  const full = path.join(dir, name);
  let html = fs.readFileSync(full, 'utf8');

  if (html.includes(MARKER)) {
    skipped++;
    continue;
  }

  // Find the last </style> in the head and insert patch right before it.
  // We assume each file has at least one <style> block.
  const lastStyleEnd = html.lastIndexOf('</style>');
  if (lastStyleEnd === -1) {
    skipped++;
    continue;
  }

  html = html.slice(0, lastStyleEnd) + PATCH + html.slice(lastStyleEnd);
  fs.writeFileSync(full, html);
  touched++;
}

console.log(`patched ${touched} files, skipped ${skipped}`);
