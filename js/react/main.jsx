document.addEventListener('DOMContentLoaded', () => {
  const themeEl = document.getElementById('react-theme-toggle');
  if (themeEl && window.ThemeToggle) {
    ReactDOM.render(React.createElement(window.ThemeToggle), themeEl);
  }
  const counterEl = document.getElementById('visit-counter');
  if (counterEl && window.VisitCounter) {
    ReactDOM.render(React.createElement(window.VisitCounter), counterEl);
  }
});
