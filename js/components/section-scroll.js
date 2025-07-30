// Snap to the next or previous section on wheel scroll
window.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('.section'));
    if (sections.length === 0) return;

    let isScrolling = false;

    function currentSectionIndex() {
        const buffer = 5; // px from top considered as start of section
        for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();
            if (rect.top <= buffer && rect.bottom > buffer) {
                return i;
            }
        }
        return 0;
    }

    function scrollToSection(index) {
        isScrolling = true;
        sections[index].scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { isScrolling = false; }, 600);
    }

    window.addEventListener('wheel', (e) => {
        if (isScrolling) {
            e.preventDefault();
            return;
        }
        const direction = Math.sign(e.deltaY);
        if (direction === 0) return;
        const index = currentSectionIndex();
        let target = index + (direction > 0 ? 1 : -1);
        target = Math.max(0, Math.min(sections.length - 1, target));
        if (target !== index) {
            e.preventDefault();
            scrollToSection(target);
        }
    }, { passive: false });
});
