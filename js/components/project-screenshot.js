// Automatically load project screenshots using an external thumbnail service
// This script reads the data-url attribute on each .project-card
// and sets the image source accordingly.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-card').forEach(card => {
    const url = card.dataset.url;
    const img = card.querySelector('.project-snapshot');
    if (url && img) {
      img.src = `https://image.thum.io/get/${encodeURIComponent(url)}`;
    }
  });
});
