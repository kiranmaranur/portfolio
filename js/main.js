// ================= Main Container =================
const mainContainer = document.getElementById('main-container');

// ================= Sections Configuration =================
const sectionsList = [
  { id: "home", file: "sections/home.html", css: "css/home.css", js: "js/home.js" },
  { id: "about", file: "sections/about.html", css: "css/about.css", js: "js/about.js" },
  { id: "skills", file: "sections/skills.html", css: "css/skills.css", js: "js/skills.js" },
  { id: "projects", file: "sections/projects.html", css: "css/projects.css", js: "js/projects.js" },
  { id: "experience", file: "sections/experience.html", css: "css/experience.css", js: "js/experience.js" },
  { id: "education", file: "sections/education.html", css: "css/education.css", js: "js/education.js" },
  { id: "achievements", file: "sections/achievements.html", css: "css/achievements.css", js: "js/achievements.js" },
  { id: "contact", file: "sections/contact.html", css: "css/contact.css", js: "js/contact.js" },
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

    // Fade-out current content
    const hasContent = mainContainer.innerHTML.trim() !== "";
    if (hasContent) {
      mainContainer.classList.remove("fade-in");
      mainContainer.classList.add("fade-out");
    }

    setTimeout(() => {
      // Inject HTML
      mainContainer.innerHTML = html;

      // ================= Load Section CSS Dynamically =================
      const oldLink = document.getElementById('section-css');
      if (oldLink) oldLink.remove();
      if (section.css) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = section.css;
        link.id = 'section-css';
        document.head.appendChild(link);
      }

      // ================= Load Section JS Dynamically =================
      const oldScript = document.getElementById('section-js');
      if (oldScript) oldScript.remove();
      if (section.js) {
        const script = document.createElement('script');
        script.src = section.js;
        script.id = 'section-js';
        document.body.appendChild(script);
      }

      // Reveal Section & Fade-In
      const sectionElement = mainContainer.querySelector("section");
      sectionElement?.classList.add("reveal");
      mainContainer.classList.remove("fade-out");
      void mainContainer.offsetWidth; // reflow
      mainContainer.classList.add("fade-in");

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // ================= Circular Progress Animation =================
      const circularProgress = document.querySelectorAll('.circular-progress');
      if (circularProgress.length > 0) {
        const circularObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const circle = entry.target.querySelector('circle.progress');
              if (!circle) return;
              const radius = circle.r.baseVal.value;
              const circumference = 2 * Math.PI * radius;
              const percentage = Number(entry.target.dataset.percentage) || 0;

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
    const targetId = link.getAttribute('href')?.substring(1);
    if (!targetId) return;

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    await loadSection(targetId);
  });
});

// ================= Default: Load Home =================
window.addEventListener('DOMContentLoaded', () => loadSection('home'));

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scrollspy effect for navbar
//const sections = document.querySelectorAll("section");
//const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

// Scrollspy effect
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120; // adjust offset
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (current && link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});


// ================= Back To Top Button =================
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
