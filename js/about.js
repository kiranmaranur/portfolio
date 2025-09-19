// ================= About Section JS =================
document.addEventListener('DOMContentLoaded', () => {
  // Particles.js for About
  if (typeof particlesJS !== "undefined" && document.querySelector("#particles-about")) {
    particlesJS.load('particles-about', 'particles-about.json', () => {
      console.log('Particles.js loaded on About');
    });
  }
});
