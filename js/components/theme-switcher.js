// Dynamic theme switcher with multiple-color holographic gradients
document.addEventListener('DOMContentLoaded', function() {
    console.log('Theme switcher initialized');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const iconEl = themeToggleBtn ? themeToggleBtn.querySelector('.icon') : null;

    // Animation state
    let animationRunning = false;
    let animationFrameId = null;

    // Initialize dynamic background effects
    startBackgroundAnimation();

    // Toggle theme when the button is clicked
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            console.log('Theme toggle button clicked');

            // Stop current animation
            stopBackgroundAnimation();

            const isLight = document.body.getAttribute('data-theme') === 'light';

            if (isLight) {
                applyDarkTheme();
                localStorage.setItem('theme', 'dark');
            } else {
                applyLightTheme();
                localStorage.setItem('theme', 'light');
            }

            updateButton();

            if (iconEl) {
                iconEl.classList.add('icon-animate');
                iconEl.addEventListener('animationend', () => {
                    iconEl.classList.remove('icon-animate');
                }, { once: true });
            }

            // Restart animation
            startBackgroundAnimation();
        });
    }

    // Start the background animation
    function startBackgroundAnimation() {
        if (animationRunning) return;

        console.log('Starting background animation');
        animationRunning = true;

        // Start animation loop
        function animate() {
            const currentTheme = document.body.getAttribute('data-theme') || 'light';
            const now = Date.now();

            // Instead of using a single base hue, we'll use multiple distinct hues
            // that shift at different rates for a more interesting effect
            const time = now / 20000; // Slower cycle for more gradual changes

            if (currentTheme === 'dark') {
                createHolographicGradient(time, false);
            } else {
                createHolographicGradient(time, true);
            }

            // Continue animation loop if still running
            if (animationRunning) {
                animationFrameId = requestAnimationFrame(animate);
            }
        }

        // Start the animation loop
        animationFrameId = requestAnimationFrame(animate);
    }

    // Stop the background animation
    function stopBackgroundAnimation() {
        console.log('Stopping background animation');
        animationRunning = false;

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    // Create a rich holographic gradient with multiple distinct colors
    function createHolographicGradient(time, useColor) {
        if (!useColor) {
            // Plain dark background when color mode is off
            document.body.style.background = '#000';
            document.documentElement.style.setProperty('--overlay-opacity', '0');
            document.documentElement.style.setProperty('--holo-gradient-1', 'none');
            document.documentElement.style.setProperty('--holo-gradient-2', 'none');
            return;
        }

        // DARK THEME: Holographic gradient as before
        const angle = (Date.now() / 150) % 360;

        const hue1 = (time * 100) % 360;
        const hue2 = ((time * 120) + 120) % 360;
        const hue3 = ((time * 80) + 240) % 360;
        const hue4 = ((time * 140) + 180) % 360;

        const colors = [
            `hsla(${hue1}, 70%, 15%, 0.95)`,
            `hsla(${hue2}, 65%, 18%, 0.85)`,
            `hsla(${hue3}, 60%, 12%, 0.8)`,
            `hsla(${hue4}, 70%, 10%, 0.9)`
        ];

        const pulseValue = (Math.sin(time * 10) * 0.015) + 0.04;
        document.documentElement.style.setProperty('--overlay-opacity', pulseValue.toFixed(3));

        const gradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
        document.body.style.background = gradient;

        const colorValues = colors.map(color => color.replace('hsla', 'rgba').replace(/%/g, ''));
        const holoGradient = `linear-gradient(${(angle + 45) % 360}deg, ${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]}, ${colorValues[3]})`;
        document.documentElement.style.setProperty('--holo-gradient-1', holoGradient);
        document.documentElement.style.setProperty('--holo-gradient-2', `linear-gradient(${(angle + 135) % 360}deg, ${colorValues[3]}, ${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]})`);
    }

    function applyDarkTheme() {
        applyTheme('dark');
        createHolographicGradient(Date.now() / 20000, false);
    
        // Text color beige for dark theme
        document.documentElement.style.setProperty('--text-color', '#f5f5dc');
        document.body.style.color = '#f5f5dc';
    
        // Also update inputs and textareas text color
        const formInputs = document.querySelectorAll('input, textarea, select, button');
        formInputs.forEach(input => {
            input.style.color = '#f5f5dc';
            input.style.backgroundColor = '#222'; // dark background for inputs
            input.style.borderColor = '#555';
        });
    }
    
    function applyLightTheme() {
        applyTheme('light');
        createHolographicGradient(Date.now() / 20000, true);
    
        // Text color beige for light theme
        document.documentElement.style.setProperty('--text-color', '#f5f5dc');
        document.body.style.color = '#f5f5dc';
    
        // Also update inputs and textareas text color
        const formInputs = document.querySelectorAll('input, textarea, select, button');
        formInputs.forEach(input => {
            input.style.color = '#f5f5dc';
            input.style.backgroundColor = '#222'; // dark background for inputs
            input.style.borderColor = '#555';
        });
    }
    

    // Helper to set data-theme attribute on body
    function applyTheme(themeName) {
        document.body.setAttribute('data-theme', themeName);
    }

    function updateButton() {
        if (!themeToggleBtn) return;
        const current = document.body.getAttribute('data-theme');
        if (current === 'light') {
            themeToggleBtn.classList.remove('dark');
            themeToggleBtn.classList.add('light');
        } else {
            themeToggleBtn.classList.remove('light');
            themeToggleBtn.classList.add('dark');
        }
    }

    // On page load: apply saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        applyLightTheme();
    } else {
        applyDarkTheme();
    }
    updateButton();

    // Expose theme functions globally for React component
    window.applyDarkTheme = applyDarkTheme;
    window.applyLightTheme = applyLightTheme;
    window.startBackgroundAnimation = startBackgroundAnimation;
    window.stopBackgroundAnimation = stopBackgroundAnimation;
});
