// Load a random image for the portfolio project
// Using loremflickr for randomness (not Unsplash)
document.addEventListener('DOMContentLoaded', () => {
    const img = document.getElementById('random-portfolio-img');
    if (img) {
        const randomSeed = Math.floor(Math.random() * 1000);
        img.src = `https://loremflickr.com/640/480?random=${randomSeed}`;
    }
});
