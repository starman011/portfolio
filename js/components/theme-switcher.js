// Dynamic theme switcher with multiple-color holographic gradients
document.addEventListener('DOMContentLoaded', function() {
    console.log('Theme switcher initialized');
    const themeSwitch = document.getElementById('theme-switch');

    // Animation state
    let animationRunning = false;
    let animationFrameId = null;

    // Initialize dynamic background effects
    startBackgroundAnimation();

    // Toggle theme when the switch is clicked
    themeSwitch.addEventListener('change', function() {
        console.log('Theme toggle clicked, checked:', this.checked);

        // Stop current animation
        stopBackgroundAnimation();

        if (this.checked) {
            applyDarkTheme();
            localStorage.setItem('theme', 'dark');
        } else {
            applyLightTheme();
            localStorage.setItem('theme', 'light');
        }

        // Restart animation
        startBackgroundAnimation();
    });

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
    function createHolographicGradient(time, isLight) {
        // Calculate shifting angle
        const angle = (Date.now() / 150) % 360;

        // Create multiple distinct base hues that shift at different rates
        // This creates a true multi-color effect rather than just different shades of one color
        const hue1 = (time * 100) % 360;                    // Full spectrum cycle
        const hue2 = ((time * 120) + 120) % 360;            // Offset by 120 degrees for complementary color
        const hue3 = ((time * 80) + 240) % 360;             // Offset by 240 degrees for triad completion
        const hue4 = ((time * 140) + 180) % 360;            // Offset by 180 degrees for contrast

        let colors = [];

        if (isLight) {
            // Light theme - brighter, more pastel colors
            colors = [
                `hsla(${hue1}, 80%, 90%, 0.9)`,                  // First color - high lightness
                `hsla(${hue2}, 70%, 85%, 0.8)`,                  // Second color - complementary
                `hsla(${hue3}, 65%, 88%, 0.75)`,                 // Third color - triad completion
                `hsla(${hue4}, 75%, 92%, 0.85)`                  // Fourth color - contrast
            ];

            // Update overlay pulse
            const pulseValue = (Math.sin(time * 10) * 0.01) + 0.02;
            document.documentElement.style.setProperty('--overlay-opacity', pulseValue.toFixed(3));
        } else {
            // Dark theme - deeper, richer colors with lower lightness
            colors = [
                `hsla(${hue1}, 70%, 15%, 0.95)`,                 // First color - lower lightness
                `hsla(${hue2}, 65%, 18%, 0.85)`,                 // Second color - complementary
                `hsla(${hue3}, 60%, 12%, 0.8)`,                  // Third color - triad completion
                `hsla(${hue4}, 70%, 10%, 0.9)`                   // Fourth color - contrast
            ];

            // Update overlay pulse
            const pulseValue = (Math.sin(time * 10) * 0.015) + 0.04;
            document.documentElement.style.setProperty('--overlay-opacity', pulseValue.toFixed(3));
        }

        // Create and apply the multi-color gradient
        const gradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
        document.body.style.background = gradient;

        // Also update the holographic effects on UI elements by changing the CSS variables
        // This makes badges, cards, etc. change along with the background
        const colorValues = colors.map(color => color.replace('hsla', 'rgba').replace(/%/g, ''));
        const holoGradient = `linear-gradient(${(angle + 45) % 360}deg, ${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]}, ${colorValues[3]})`;

        document.documentElement.style.setProperty('--holo-gradient-1', holoGradient);
        document.documentElement.style.setProperty('--holo-gradient-2', `linear-gradient(${(angle + 135) % 360}deg, ${colorValues[3]}, ${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]})`);
    }

    // Apply dark theme
    function applyDarkTheme() {
        applyTheme('dark');
        createHolographicGradient(Date.now() / 20000, false);

        // Explicitly set text color to white
        document.documentElement.style.setProperty('--text-color', '#ffffff');

        // Update form inputs separately (needed for some browsers)
        const formInputs = document.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.style.color = '#ffffff';
        });
    }

    // Apply light theme
    function applyLightTheme() {
        applyTheme('light');
        createHolographicGradient(Date.now() / 20000, true);

        // Explicitly set text color to black
        document.documentElement.style.setProperty('--text-color', '#333333');

        // Update form inputs separately (needed for some browsers)
        const formInputs = document.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.style.color = '#333333';
        });
    }
});