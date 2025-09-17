// Navbar links and sections
const navLinks = document.querySelectorAll('.navbar .nav-link');
const sections = document.querySelectorAll('section');

// Show Home on load
window.addEventListener('DOMContentLoaded', () => {
  sections.forEach(sec => sec.style.display = 'none'); // hide all
  const home = document.getElementById('home');
  home.style.display = 'block'; // show home
});

// Navbar click behavior
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    // Remove active class from all links
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Hide all sections
    sections.forEach(sec => sec.style.display = 'none');

    // Show target section
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
const circularProgress = document.querySelectorAll('.circular-progress');

const circularObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const circle = entry.target.querySelector('circle.progress');
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const percentage = entry.target.dataset.percentage;

      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = circumference;

      setTimeout(() => {
        circle.style.strokeDashoffset = circumference * (1 - percentage / 100);
      }, 200);

      circularObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

circularProgress.forEach(cp => circularObserver.observe(cp));
