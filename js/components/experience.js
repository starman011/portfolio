// Reveal timeline items on scroll
window.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.timeline-item');
    const progress = document.querySelector('.timeline-progress');
    if (!('IntersectionObserver' in window)) {
        items.forEach(item => item.classList.add('visible'));
        if (progress) progress.style.height = '100%';
        return;
    }

    function updateProgress(target) {
        if (!progress) return;
        const rect = target.getBoundingClientRect();
        const top = target.offsetTop + rect.height / 2;
        progress.style.height = top + 'px';
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                updateProgress(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    items.forEach(item => observer.observe(item));
});
