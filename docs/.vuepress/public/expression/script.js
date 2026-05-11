// 共享 JS：阅读进度条 + 目录高亮 + 自检勾选
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (window.scrollY / total) * 100;
  const bar = document.getElementById('progress');
  if (bar) bar.style.width = pct + '%';
});

document.addEventListener('DOMContentLoaded', () => {
  // TOC 高亮
  const sections = document.querySelectorAll('section[id]');
  const tocLinks = document.querySelectorAll('.toc a');
  if (sections.length && tocLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(l => l.classList.remove('active'));
          const link = document.querySelector(`.toc a[href="#${id}"]`);
          if (link) link.classList.add('active');
        }
      });
    }, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  // 自检勾选
  document.querySelectorAll('.check-item').forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('checked');
    });
  });

  // Mermaid
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor: '#f3ecdf',
        primaryTextColor: '#1a1410',
        primaryBorderColor: '#b8552c',
        lineColor: '#3a322c',
        fontFamily: 'Noto Serif SC, serif'
      }
    });
  }
});
