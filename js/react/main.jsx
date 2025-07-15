function initReactWidgets() {
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
