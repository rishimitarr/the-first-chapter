// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navRight = document.querySelector('.nav-right');
if (navToggle && navRight) {
  navToggle.addEventListener('click', () => {
    const open = navRight.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (navRight && navRight.classList.contains('is-open')) {
      navRight.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
  });
});

// Scroll reveal via IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Form submit handler
window.handleSubmit = function (e) {
  e.preventDefault();
  const btn = e.target.querySelector('.submit-btn');
  btn.textContent = "Thank you! We'll be in touch soon.";
  btn.style.background = 'var(--sage-dark)';
  btn.disabled = true;
};
