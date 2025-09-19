// ================= Skills Section JS =================
document.addEventListener('DOMContentLoaded', () => {
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
});
