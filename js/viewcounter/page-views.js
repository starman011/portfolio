// Fetch and update page view count
function updatePageViews() {
  fetch('/api/view', { method: 'POST' })
    .then(() => fetch('/api/count'))
    .then(res => res.json())
    .then(data => {
      const el = document.getElementById('view-count');
      if (el) {
        el.textContent = `Views: ${data.count}`;
      }
    })
    .catch(err => console.error('View count error', err));
}

document.addEventListener('DOMContentLoaded', updatePageViews);
