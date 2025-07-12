// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website initialized');

    // ===== Theme Management =====
    // Check if theme is already set in storage
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Set initial theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);

    // Set theme toggle button state if element exists
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        const icon = document.getElementById('theme-icon');
        if (window.feather) { feather.replace(); }
        if (currentTheme === 'light') {
            icon.setAttribute('data-feather', 'sun');
        } else {
            icon.setAttribute('data-feather', 'moon');
        }
        if (window.feather) { feather.replace(); }

        // Add event listener to theme toggle
        themeToggleBtn.addEventListener('click', function() {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
            icon.classList.add('icon-animate');
            icon.setAttribute('data-feather', newTheme === 'light' ? 'sun' : 'moon');
            if (window.feather) { feather.replace(); }
            icon.addEventListener('animationend', function() {
                icon.classList.remove('icon-animate');
            }, { once: true });
        });
    }

    // Initialize dark mode toggle utility
    darkModeToggle.init();

    // ===== Random Background Image =====
    // Array of image sources for the hero background
    const images = [
        'assets/images/bg1.JPG',
        'assets/images/bg2.jpg',
        'assets/images/bg3.jpg'
    ];

    const heroElement = document.getElementById('hero-background');

    // Only proceed if hero element exists
    if (heroElement) {
        // Function to display a random image
        function displayRandomImage() {
            const randomIndex = Math.floor(Math.random() * images.length);
            const selectedImage = images[randomIndex];

            // Set the background image of the hero element
            heroElement.style.backgroundImage = `url('${selectedImage}')`;

            // Fade-in effect
            heroElement.classList.remove('fade-in');
            void heroElement.offsetWidth; // Trigger reflow
            heroElement.classList.add('fade-in');
        }

        // Display a random image when the page loads
        displayRandomImage();

        // Change image on enter site button click if it exists
        const enterSiteBtn = document.getElementById('enter-site-btn');
        if (enterSiteBtn) {
            enterSiteBtn.addEventListener('click', displayRandomImage);
        }
    }
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

// Global function to apply theme
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);

    if (theme === 'dark') {
        document.body.classList.remove('light-theme-active');
        document.body.classList.add('dark-theme-active');
    } else {
        document.body.classList.remove('dark-theme-active');
        document.body.classList.add('light-theme-active');
    }
}

// Dark Mode Toggle Utility
const darkModeToggle = {
    // Initialize dark mode toggle
    init: function() {
        // Check for saved preference or system preference
        const savedPreference = localStorage.getItem('dark-mode');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Apply initial mode
        if (savedPreference === 'enabled' || (savedPreference === null && systemPrefersDark)) {
            this.enableDarkMode();
        } else {
            this.disableDarkMode();
        }

        // Add event listeners
        this.addEventListeners();
    },

    // Toggle between dark and light modes
    toggle: function() {
        if (document.body.classList.contains('dark-mode')) {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
    },

    // Enable dark mode
    enableDarkMode: function() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');
        this.updateToggleButtonUI();

        // Also update the theme system
        localStorage.setItem('theme', 'dark');
        applyTheme('dark');

        // Update theme toggle icon if it exists
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    },

    // Disable dark mode
    disableDarkMode: function() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', 'disabled');
        this.updateToggleButtonUI();

        // Also update the theme system
        localStorage.setItem('theme', 'light');
        applyTheme('light');

        // Update theme toggle icon if it exists
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    },

    // Add event listeners
    addEventListeners: function() {
        // Listen for system dark mode changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (localStorage.getItem('dark-mode') === null) {
                e.matches ? this.enableDarkMode() : this.disableDarkMode();
            }
        });

        // Add click event to toggle button if it exists
        const toggleButton = document.getElementById('dark-mode-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => this.toggle());
        }
    },

    // Update toggle button UI
    updateToggleButtonUI: function() {
        const toggleButton = document.getElementById('dark-mode-toggle');
        if (toggleButton) {
            const isDarkMode = document.body.classList.contains('dark-mode');
            toggleButton.setAttribute('aria-pressed', isDarkMode);
            toggleButton.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
        }
    }
};