// Simple theme switcher using black, beige and red palette
// Toggles between light and dark themes and exposes global functions

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle-btn');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (btn) {
            btn.classList.toggle('light', theme === 'light');
            btn.classList.toggle('dark', theme === 'dark');
        }
    }

    function applyDarkTheme() { setTheme('dark'); }
    function applyLightTheme() { setTheme('light'); }

    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);

    if (btn) {
        btn.addEventListener('click', () => {
            const current = document.body.getAttribute('data-theme');
            setTheme(current === 'light' ? 'dark' : 'light');
        });
    }

    window.applyDarkTheme = applyDarkTheme;
    window.applyLightTheme = applyLightTheme;
});
