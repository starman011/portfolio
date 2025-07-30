// Portfolio filtering component
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.portfolio-tab');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Filter portfolio items when tab is clicked
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter category
            const filter = this.getAttribute('data-filter');

            // Filter portfolio items
            filterPortfolioItems(filter);
        });
    });

    // Filter portfolio items by category
    function filterPortfolioItems(filter) {
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                showItem(item);
            } else {
                hideItem(item);
            }
        });
    }

    // Show portfolio item with animation
    function showItem(item) {
        item.style.display = 'block';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 10);
    }

    // Hide portfolio item with animation
    function hideItem(item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.display = 'none';
        }, 300);
    }

    // Initialize all items to be visible
    portfolioItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.opacity = '1';
    });
});