// ================= Home Section JS =================

// Typed.js for Home
if (typeof Typed !== "undefined" && document.querySelector(".highlight")) {
  new Typed(".highlight", {
    strings: [
      "KIRAN KUMAR M M",
      "QA Engineer",
      "Automation Tester",
      "Full Stack Developer"
    ],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true
  });
}

// Particles.js for Home
if (typeof particlesJS !== "undefined" && document.querySelector("#particles-js")) {
  particlesJS.load('particles-js', 'particles.json', () => {
    console.log('Particles.js loaded on Home');
  });
}
