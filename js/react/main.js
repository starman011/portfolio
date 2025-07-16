import React from 'https://esm.sh/react@17.0.2';
import ReactDOM from 'https://esm.sh/react-dom@17.0.2';
import VisitCounter from './components/VisitCounter.js';
import ThemeToggle from './components/ThemeToggle.js';

function initReactWidgets() {
  const counterEl = document.getElementById('visit-counter');
  if (counterEl) {
    ReactDOM.render(React.createElement(VisitCounter), counterEl);
  }
  const toggleEl = document.getElementById('theme-toggle-root');
  if (toggleEl) {
    ReactDOM.render(React.createElement(ThemeToggle), toggleEl);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReactWidgets);
} else {
  initReactWidgets();
}

