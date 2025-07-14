function initReactWidgets() {
  const themeEl = document.getElementById('react-theme-toggle');
  if (themeEl && window.ThemeToggle) {
    ReactDOM.render(React.createElement(window.ThemeToggle), themeEl);
  }

  const counterEl = document.getElementById('visit-counter');
  if (counterEl && window.VisitCounter) {
    ReactDOM.render(React.createElement(window.VisitCounter), counterEl);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReactWidgets);
} else {
  initReactWidgets();
}
