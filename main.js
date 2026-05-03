'use strict';

/* Nav scroll state */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* Animación del contador */
const animateValue = (el, start, end, duration) => {
  let startTs = null;
  const step = (ts) => {
    if (!startTs) startTs = ts;
    const progress = Math.min((ts - startTs) / duration, 1);
    el.innerText = Math.floor(progress * (end - start) + start);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

/* Scroll reveal */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');

    const counters = entry.target.querySelectorAll('[data-count]');
    if (counters.length) {
      setTimeout(() => {
        counters.forEach(c => {
          animateValue(c, 0, parseInt(c.dataset.count), 1400);
        });
      }, 250);
    }

    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px 40px 0px',
});

document.querySelectorAll('[data-enter]').forEach(el => observer.observe(el));

/* Nu-Brutalism: Magnetic Buttons (solo en desktop) */
if (window.matchMedia('(hover: hover)').matches) {
  const magneticElements = document.querySelectorAll('.producto-cta, .archivo-cta');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      // Para evitar el loop de rect, obtenemos el centro de manera aproximada
      const rect = el.getBoundingClientRect();
      const h = rect.width / 2;
      const v = rect.height / 2;
      
      // x e y en relación al centro original de la caja
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - v;
      
      // Amortiguamos fuertemente el movimiento para que no se escape
      el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'none';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 400ms cubic-bezier(0.25, 1, 0.5, 1)';
      el.style.transform = `translate(0px, 0px)`;
    });
  });
}