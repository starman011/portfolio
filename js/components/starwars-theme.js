// Star Wars project selector handling
// Applies dark or light theme and filters projects accordingly

document.addEventListener('DOMContentLoaded', () => {
    const darkBtn = document.getElementById('dark-side-select');
    const lightBtn = document.getElementById('light-side-select');

    function triggerFilter(category) {
        const btn = document.querySelector(`.portfolio-tab[data-filter="${category}"]`);
        if (btn) btn.click();
    }

    if (darkBtn) {
        darkBtn.addEventListener('click', () => {
            if (window.applyDarkTheme) window.applyDarkTheme();
            triggerFilter('technology');
            const grid = document.getElementById('project-grid');
            grid && grid.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (lightBtn) {
        lightBtn.addEventListener('click', () => {
            if (window.applyLightTheme) window.applyLightTheme();
            triggerFilter('architecture');
            const grid = document.getElementById('project-grid');
            grid && grid.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
