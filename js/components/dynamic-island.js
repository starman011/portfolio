window.addEventListener('DOMContentLoaded', () => {
  const island = document.getElementById('about-island');
  if (!island) return;
  island.addEventListener('click', () => {
    island.classList.toggle('open');
  });
});
