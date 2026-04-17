
'use strict';

/* ── 1. NAV scroll state ──────────────────────────
   Passive listener. Only classList.toggle — no style writes.
   ─────────────────────────────────────────────── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── 2. Scroll reveal — single IntersectionObserver
   Watches every [data-enter] element.
   Adds 'is-visible'. CSS handles opacity + transform.
   Unobserves immediately — no ongoing work.
   ─────────────────────────────────────────────── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

document.querySelectorAll('[data-enter]').forEach((el) => observer.observe(el));
