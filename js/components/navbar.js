// Dynamic navbar effects
window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  if (!header) return;

  // Add or remove scrolled class based on scroll position
  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add('navbar-scrolled');
    } else {
      header.classList.remove('navbar-scrolled');
    }
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader);

  // Section highlighting for active nav links
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter((el) => el);

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
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
