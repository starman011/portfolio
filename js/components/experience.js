// Reveal timeline items on scroll
window.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.timeline-item');
    if (!('IntersectionObserver' in window)) {
        items.forEach(item => item.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    items.forEach(item => observer.observe(item));
});
