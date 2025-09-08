// -----------------------------------
// HopeBridge Foundation – Scripts
// -----------------------------------

// Mobile nav toggle
const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    body.classList.toggle('nav-open');
  });
}

// Close nav on link click (mobile)
document.querySelectorAll('#site-nav a').forEach(a => {
  a.addEventListener('click', () => body.classList.remove('nav-open'));
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Impact counter animation
const counters = document.querySelectorAll('.impact-value');
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1500;
      const start = performance.now();
      const startVal = 0;

      function tick(now) {
        const p = Math.min(1, (now - start) / duration);
        const val = startVal + (target - startVal) * (1 - Math.pow(1 - p, 3)); // easeOutCubic
        el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => io.observe(c));

// Donate buttons – demo handler
document.querySelectorAll('.plan-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const plan = btn.dataset.plan;
    alert(`Thanks for choosing the ${plan.replace('-', ' ')} plan!\n\nConnect your payment gateway to process real donations.`);
  });
});

// Volunteer form validation + fake submit
const form = document.getElementById('volunteer-form');
if (form) {
  const note = form.querySelector('.form-note');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const required = ['name', 'email', 'interest', 'consent'];
    for (const key of required) {
      if (!data[key]) {
        note.textContent = 'Please fill out required fields.';
        note.style.color = '#fca5a5';
        return;
      }
    }
    // Minimal email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      note.textContent = 'Please enter a valid email address.';
      note.style.color = '#fca5a5';
      return;
    }
    note.textContent = 'Thanks! We will reach out soon.';
    note.style.color = '#86efac';

    // Clear after a few seconds
    setTimeout(() => { form.reset(); note.textContent=''; }, 2500);
  });
}

// Smooth scroll focus management
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.setAttribute('tabindex', '-1');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
      setTimeout(() => target.removeAttribute('tabindex'), 1000);
    }
  });
});