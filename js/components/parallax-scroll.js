// Simple parallax scroll effect
// Elements with data-parallax-speed attribute move slower than the page scroll

document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('[data-parallax-speed]');
    if (!elements.length) return;

    let lastKnownScrollY = window.scrollY;
    let ticking = false;

    function update() {
        elements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0;
            const offset = lastKnownScrollY * speed;
            el.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
        ticking = false;
    }

    function onScroll() {
        lastKnownScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
    update();
});
