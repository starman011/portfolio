// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website initialized');

    // ===== Theme Management =====
    // Check if theme is already set in storage
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Set initial theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);



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

// Hide loader once the page has fully loaded
window.addEventListener('load', function() {
    const loader = document.getElementById('loading-screen');
    const content = document.getElementById('site-content');
    if (loader) {
        loader.style.display = 'none';
    }
    if (content) {
        content.style.display = '';
    }
});
