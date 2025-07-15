// Dynamic navbar effects
window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  if (!header) return;

  // Add or remove scrolled and shrink classes based on scroll position
  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add('navbar-scrolled');
    } else {
      header.classList.remove('navbar-scrolled');
    }

    const isDesktop = window.innerWidth >= 992;
    if (isDesktop && window.scrollY > 150) {
      header.classList.add('navbar-shrink');
    } else {
      header.classList.remove('navbar-shrink');
    }
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader);
  window.addEventListener('resize', updateHeader);

  // Section highlighting for active nav links
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter((el) => el);

  // Highlight nav link immediately on click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                'active',
                link.getAttribute('href').replace('#', '') === entry.target.id
              );
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Light haptic feedback on navigation interaction
  navLinks.forEach((link) => {
    link.addEventListener('pointerdown', () => {
      if ('vibrate' in navigator) {
        navigator.vibrate(20);
      }
    });
  });
});
