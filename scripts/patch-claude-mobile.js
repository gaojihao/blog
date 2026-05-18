// Inject a universal mobile-responsive CSS patch into each Claude HTML
// before its closing </style>. Idempotent — re-running is a no-op.

const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '../docs/.vuepress/public/claude');
const MARKER = '/* mobile-patch-v5 */';

const PATCH = `
${MARKER}
html, body { overflow-x: hidden; max-width: 100vw; word-wrap: break-word; overflow-wrap: break-word; }
html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
img, video, svg { max-width: 100% !important; height: auto !important; }
.mermaid svg { max-width: 100% !important; height: auto !important; }
a { word-break: break-word; overflow-wrap: anywhere; }
pre { max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
pre code { white-space: pre; word-break: normal; overflow-wrap: normal; }
table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; max-width: 100%; }
.mermaid { overflow-x: auto; -webkit-overflow-scrolling: touch; max-width: 100%; }
/* Custom "pre-like" containers used in some Claude pages (.tree in memory-system,
   .codeblock / .code-block / .shell-block in others) — same scroll treatment. */
.tree, .codeblock, .code-block, .shell-block, .terminal {
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch;
  max-width: 100% !important;
}

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
  /* CRITICAL: grid items default to min-width: auto (= their min-content).
     A long unbreakable token (file path, identifier) or any block descendant
     can force the 1fr track to expand past the parent and push the page wider
     than the viewport. Setting min-width: 0 lets the track honor 1fr. The
     .layout > * variant catches the top-level grid (sidebar + main) where
     <main> would otherwise blow up the grid. */
  .layout > *,
  .card-grid > *, .card-grid.col-2 > *, .two-col > *, .three-col > *,
  .phase-grid > *, .arch-grid > *, .grid-2 > *, .grid-3 > *, .grid-4 > *,
  .col-2 > *, .col-3 > * {
    grid-column: auto !important;
    grid-row: auto !important;
    min-width: 0 !important;
    max-width: 100% !important;
  }
  /* Flex rows used for side-by-side blocks: stack on mobile so wide
     min-content (long English tokens / code) can't push the page wider
     than the viewport. */
  .flow-row, .recovery-chain, .hero-meta {
    flex-wrap: wrap !important;
  }
  .flow-row > *, .flow-block {
    flex: 1 1 100% !important;
    min-width: 0 !important;
  }
  .card, .col-card, .callout, .arch-box { padding: 18px !important; min-width: 0 !important; }
  .card *, .col-card *, .callout *, .arch-box * { min-width: 0 !important; max-width: 100% !important; }
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

  // Strip any prior patch block (v1 or v2) before re-injecting current version.
  // Match from any "/* mobile-patch-vN */" up to the last "}" before "</style>".
  html = html.replace(
    /\n?\/\* mobile-patch-v\d+ \*\/[\s\S]*?(?=<\/style>)/,
    ''
  );

  if (html.includes(MARKER)) {
    skipped++;
    continue;
  }

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
