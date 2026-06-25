/* Premium portfolio interactions
   - Smooth scrolling
   - Mobile nav toggle
   - Back-to-top
   - Intersection animations
   - Project modal previews
   - Contact form demo handling
*/

/* Smooth scroll for internal links */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav if open
      closeMobileNav();
    }
  });
});

/* Mobile navigation toggle */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function openMobileNav(){
  navLinks.style.display = 'flex';
  navToggle.setAttribute('aria-expanded','true');
}
function closeMobileNav(){
  navLinks.style.display = '';
  navToggle.setAttribute('aria-expanded','false');
}

navToggle && navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  if (expanded) closeMobileNav();
  else openMobileNav();
});

/* Back to top button */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 420) backToTop.style.display = 'block';
  else backToTop.style.display = 'none';
});
backToTop && backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Intersection Observer for subtle reveal animations */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .hero-card, .intro-panel, .project-card, .skill-card, .cert-card, .timeline-item, .contact-form').forEach(el => {
  revealObserver.observe(el);
});

/* Project modal handling */
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalMedia = document.getElementById('modalMedia');
const modalClose = document.querySelector('.modal-close');

function openModal(data){
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;
  modalMedia.innerHTML = data.media || '<div class="muted">No media available</div>';
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modalMedia.innerHTML = '';
  document.body.style.overflow = '';
}

/* Wire project preview buttons */
document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-open');
    // Provide preview content per project key
    const previews = {
      calc: {
        title: 'Android Calculator App',
        desc: 'A user-friendly Android calculator developed in Java, supporting basic arithmetic operations with a clean and responsive interface.',
        media: `
<div style="display:flex; justify-content:center; align-items:center;">
  <img src="assets/calculator.jpg"
       style="
         max-width:90%;
         max-height:80vh;
         width:auto;
         height:auto;
         object-fit:contain;
         border-radius:10px;
       ">
</div>
`
      },
      passman: {
        title: 'Password Management System',
        desc: 'A secure password management system that stores and organizes credentials efficiently with a focus on usability and data security.',
        media: `
<video controls style="width:100%; border-radius:10px;"><source src="assets/password.mp4" type="video/mp4"></video>`
      },
      portfolio: {
        title: 'Portfolio Website',
        desc: 'A modern personal portfolio website showcasing projects, skills, and contact information with a responsive and professional design.',
        media: `<img src="assets/portfolio.jpg" style="width:100%; border-radius:10px;">`
      }
    };

    const data = previews[key] || { title: 'Project', desc: 'Details coming soon', media: '' };
    openModal(data);
  });
});

/* Modal close interactions */
modalClose && modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
});

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_sz8jild",
      "template_1ldq93m",
      this
    )
    .then(() => {
      alert("Message Sent Successfully!");
      contactForm.reset();
    })
    .catch((error) => {
      alert("Failed to send message.");
      console.log(error);
    });
  });
}

/* Accessibility: ensure focus outline visible for keyboard users */
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') document.documentElement.classList.add('show-focus');
});
document.body.addEventListener('mousedown', () => {
  document.documentElement.classList.remove('show-focus');
});
