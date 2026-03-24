// ============================================================
//  animations.js  —  WellSpring Family Clinic
//  Shared across: index, about, services, bmi, contact,
//                 appointment pages
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Mobile hamburger navigation ──────────────────────

  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav when a link is tapped on mobile
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── 2. Back-to-top button ────────────────────────────────

  const backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    // Show / hide based on scroll position
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── 3. Scroll-triggered fade / slide animations ──────────
  //
  //  Supported classes (add to any element in HTML):
  //    .animate-fade-up    — fade in from below
  //    .animate-fade-left  — fade in from the left
  //    .animate-fade-right — fade in from the right
  //    .hero-animate       — immediate entrance animation for hero text
  //
  //  Optional data attribute:
  //    data-delay="200"    — delay in milliseconds before animation triggers

  const ANIMATION_CLASSES = [
    '.animate-fade-up',
    '.animate-fade-left',
    '.animate-fade-right',
  ];

  const animatedEls = document.querySelectorAll(ANIMATION_CLASSES.join(', '));

  if ('IntersectionObserver' in window && animatedEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const el    = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);

          setTimeout(() => el.classList.add('animated'), delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );

    animatedEls.forEach(el => observer.observe(el));

  } else {
    // Fallback: show all immediately (no IntersectionObserver support)
    animatedEls.forEach(el => el.classList.add('animated'));
  }

  // ── 4. Hero entrance animations (no observer needed) ────

  document.querySelectorAll('.hero-animate').forEach((el, i) => {
    const baseDelay = i * 150;
    setTimeout(() => el.classList.add('animated'), baseDelay);
  });

  // ── 5. Sticky nav shadow on scroll ──────────────────────

  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

});