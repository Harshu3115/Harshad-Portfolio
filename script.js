// ── Scroll animations ──
const fadeEls = document.querySelectorAll('.fade-up');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => obs.observe(el));

// ── Skill bar animation ──
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelector('.skills-section') && barObs.observe(document.querySelector('.skills-section'));

// ── Active nav on scroll ──
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
  });
});

// ── Typed cursor effect ──
const titles = ['Full Stack Developer', 'Web Developer', 'Frontend Developer', 'Java Developer'];
let ti = 0, ci = 0, deleting = false;
const titleEl = document.querySelector('.hero-title');
function type() {
  const cur = titles[ti];
  if (!deleting) {
    titleEl.innerHTML = cur.slice(0, ci + 1) + '<span class="cursor"></span>';
    ci++;
    if (ci === cur.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    titleEl.innerHTML = cur.slice(0, ci - 1) + '<span class="cursor"></span>';
    ci--;
    if (ci === 0) { deleting = false; ti = (ti + 1) % titles.length; }
  }
  setTimeout(type, deleting ? 55 : 95);
}
type();

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const target = +counter.dataset.target;
  let count = 0;

  const updateCounter = () => {
    const increment = target / 100;

    if (count < target) {
      count += increment;
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});

// Dark / Light Mode Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const icon = themeToggle.querySelector("i");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  icon.classList.remove("fa-sun");
  icon.classList.add("fa-moon");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    localStorage.setItem("theme", "light");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
});

