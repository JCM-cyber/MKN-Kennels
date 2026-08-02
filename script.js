// ===== BREED AVAILABILITY =====
const ENQUIRY_BREED_MAP = {
  'german-shepherd': 'breed-gs',
  'husky': 'breed-husky',
  'golden-retriever': 'breed-gr',
  'labrador': 'breed-lab',
  'beagle': 'breed-beagle'
};

function renderBreedAvailability() {
  const availability = window.BREED_AVAILABILITY || {};

  document.querySelectorAll('.breed-card[id]').forEach(card => {
    const breedId = card.id;
    const data = availability[breedId];
    if (!data) return;

    card.querySelector('.breed-availability')?.remove();

    const badge = document.createElement('span');
    badge.className = `breed-availability breed-availability--${data.status}`;
    badge.setAttribute('role', 'status');
    badge.innerHTML = `<span class="breed-availability-dot" aria-hidden="true"></span>${data.label}`;

    const imgWrap = card.querySelector('.breed-img-wrap');
    imgWrap?.appendChild(badge);

    card.classList.toggle('breed-card--unavailable', data.status === 'unavailable');

    const btn = card.querySelector('.breed-btn');
    if (btn && data.status === 'unavailable') {
      btn.textContent = 'CURRENTLY UNAVAILABLE';
    }
  });

  const interestSelect = document.getElementById('interest');
  if (!interestSelect) return;

  interestSelect.querySelectorAll('option').forEach(option => {
    const breedId = ENQUIRY_BREED_MAP[option.value];
    if (!breedId) return;

    const data = availability[breedId];
    if (!data) return;

    const baseLabel = option.textContent.replace(/\s*\(.*\)$/, '');
    option.textContent = `${baseLabel} (${data.label})`;
    option.disabled = data.status === 'unavailable';
  });
}

renderBreedAvailability();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== ENQUIRY FORM =====
const form = document.getElementById('enquiryForm');
const successMsg = document.getElementById('formSuccess');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'SENDING…';
  btn.disabled = true;
  setTimeout(() => {
    successMsg.classList.add('show');
    form.reset();
    btn.textContent = 'SEND ENQUIRY ↗';
    btn.disabled = false;
    setTimeout(() => successMsg.classList.remove('show'), 6000);
  }, 1200);
});

// ===== INTERSECTION OBSERVER — fade-in on scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.breed-card, .service-card, .pillar, .contact-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});
