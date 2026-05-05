'use strict';

/* Nav scroll state */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* Hero Parallax */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + scrolled * 0.0005})`;
  }, { passive: true });
}

/* Scrub Text Reveal (Word by Word) */
const scrubContainer = document.getElementById('scrub-manifesto');
if (scrubContainer) {
  const text = scrubContainer.innerText;
  // Mantener espacios naturales usando inline spans
  scrubContainer.innerHTML = text.split(' ').map(word => `<span class="scrub-word">${word}</span>`).join(' ');
  
  const words = scrubContainer.querySelectorAll('.scrub-word');
  
  const scrubObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        words.forEach((word, i) => {
          setTimeout(() => {
            word.classList.add('active');
          }, i * 40); // Slightly slower for better readability
        });
        scrubObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 }); // Trigger earlier
  
  scrubObserver.observe(scrubContainer);
}

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

/* Scroll reveal con Stagger */
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
      }, 400);
    }
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-enter]').forEach(el => observer.observe(el));

/* Spotlight Effect para Cards */
document.querySelectorAll('.producto-card, .bento-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});

/* Magnetic Buttons */
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.pc-btn, .nav-cta').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
      el.style.transform = `translate(0px, 0px)`;
    });
  });
}