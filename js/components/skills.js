// Reveal skill cards on scroll
window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.skill-card');
    if (!('IntersectionObserver' in window)) {
        cards.forEach(card => card.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    cards.forEach(card => observer.observe(card));
});
