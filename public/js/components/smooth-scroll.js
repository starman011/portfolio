// Smooth scrolling component
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links with hash
    const navLinks = document.querySelectorAll('a[href^="#"]');

    // Add smooth scrolling to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Get target element ID
            const targetId = this.getAttribute('href');

            // Handle special case for # links
            if (targetId === '#') return;

            // Get target element
            const targetElement = document.querySelector(targetId);

            // Scroll to target element if it exists
            if (targetElement) {
                scrollToTarget(targetElement);
            }
        });
    });

    // Smooth scroll to target element
    function scrollToTarget(element) {
        // Get element position
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 70;

        // Scroll to element
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
});