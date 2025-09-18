// ================= Main Container =================
const mainContainer = document.getElementById('main-container');

// ================= Section List =================
const sectionsList = [
  { id: "home", file: "sections/home.html" },
  { id: "about", file: "sections/about.html" },
  { id: "skills", file: "sections/skills.html" },
  { id: "projects", file: "sections/projects.html" },
  { id: "experience", file: "sections/experience.html" },
  { id: "education", file: "sections/education.html" },
  { id: "achievements", file: "sections/achievements.html" },
  { id: "contact", file: "sections/contact.html" },
];

// ================= Navbar & Back-to-Top =================
const navLinks = document.querySelectorAll('.navbar .nav-link');
const backToTop = document.getElementById('backToTop');

// ================= Load Section =================
async function loadSection(sectionId) {
  const section = sectionsList.find(sec => sec.id === sectionId);
  if (!section) return;

  try {
    const res = await fetch(section.file);
    if (!res.ok) throw new Error(`Failed to load ${section.file}`);
    const html = await res.text();

    // Fade-out current content if exists
    const hasContent = mainContainer.innerHTML.trim() !== "";
    if (hasContent) {
      mainContainer.classList.remove("fade-in");
      mainContainer.classList.add("fade-out");
    }

    setTimeout(() => {
      // Inject HTML
      mainContainer.innerHTML = html;

      // Reveal new section
      const sectionElement = mainContainer.querySelector("section");
      if (sectionElement) sectionElement.classList.add("reveal");

      // Fade-in
      mainContainer.classList.remove("fade-out");
      void mainContainer.offsetWidth;
      mainContainer.classList.add("fade-in");

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // ================= Home Section =================
      if (sectionId === 'home') {
        // Typed.js
        if (typeof Typed !== "undefined" && mainContainer.querySelector(".highlight")) {
          new Typed(".highlight", {
            strings: ["KIRAN KUMAR M M", "QA Engineer", "Full Stack Learner"],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true
          });
        }
        // Particles.js
        if (typeof particlesJS !== "undefined" && mainContainer.querySelector("#particles-js")) {
          particlesJS.load('particles-js', 'particles.json', () => {
            console.log('Particles.js loaded on Home');
          });
        }
      }

      // ================= About Section =================
      if (sectionId === 'about') {
        if (typeof particlesJS !== "undefined" && mainContainer.querySelector("#particles-about")) {
          particlesJS.load('particles-about', 'particles-about.json', () => {
            console.log('Particles.js loaded on About');
          });
        }
      }

      // ================= Circular Progress =================
      const circularProgress = document.querySelectorAll('.circular-progress');
      if (circularProgress.length > 0) {
        const circularObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
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
      }

    }, hasContent ? 300 : 0);

  } catch (err) {
    console.error(err);
    mainContainer.innerHTML = `<p style="color:red; text-align:center;">⚠ Failed to load section: ${sectionId}</p>`;
  }
}

// ================= Navbar Click Handling =================
navLinks.forEach(link => {
  link.addEventListener('click', async e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    await loadSection(targetId);
  });
});

// ================= Default: Load Home =================
window.addEventListener('DOMContentLoaded', () => loadSection('home'));

// ================= Back To Top Button =================
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
