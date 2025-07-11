// hero-overlay.js - Image Background
document.addEventListener('DOMContentLoaded', function() {
    // Array of image sources for the hero background
    const images = [
        'assets/images/bg1.JPG',
        'assets/images/bg2.jpg',
        'assets/images/bg3.jpg'
    ];

    const heroElement = document.getElementById('hero-background');

    // Function to display a random image
    function displayRandomImage() {
        if (!heroElement) return;

        const randomIndex = Math.floor(Math.random() * images.length);
        const selectedImage = images[randomIndex];

        // Set the background image of the hero element
        heroElement.style.backgroundImage = `url('${selectedImage}')`;

        // Add fade-in effect
        heroElement.classList.remove('fade-in');
        void heroElement.offsetWidth; // Trigger reflow
        heroElement.classList.add('fade-in');
    }

    // Display a random image when the page loads
    displayRandomImage();

    // Handle dismiss button
    const enterSiteBtn = document.getElementById('enter-site-btn');
    if (enterSiteBtn) {
        enterSiteBtn.addEventListener('click', function() {
            const heroOverlay = document.querySelector('.hero-overlay');
            if (heroOverlay) {
                heroOverlay.classList.add('dismissed');

                // After animation completes, remove from DOM
                setTimeout(() => {
                    heroOverlay.remove();
                }, 1200);
            }

            // Reveal site content
            const siteContent = document.getElementById('site-content');
            if (siteContent) {
                siteContent.classList.remove('hidden');
            }

            // Lazy load images
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.setAttribute('src', img.getAttribute('data-src'));
            });
        });
    }

    // Add subtle parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const headline = document.querySelector('.hero-headline');
        const accent = document.querySelector('.holographic-accent');

        if (headline) {
            headline.style.transform = `translate(${mouseX * -20}px, ${mouseY * -10}px)`;
        }

        if (accent) {
            accent.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30 - 10}px)`;
        }
    });
});