// Automatically load project screenshots using an external thumbnail service
// This script reads the data-url attribute on each .project-card
// and sets the image source accordingly.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-card').forEach(card => {
    const url = card.dataset.url;
    const img = card.querySelector('.project-snapshot');
    if (url && img) {
      // Thum.io expects the target URL directly in the path without encoding
      // Append a timestamp to bypass caching and refresh the snapshot on each reload
      const cacheBust = Date.now();
      img.src = `https://image.thum.io/get/${url}?cacheBust=${cacheBust}`;
    }
  });
});
