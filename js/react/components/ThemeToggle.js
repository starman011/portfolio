import React, { useState } from 'https://esm.sh/react@17.0.2';
import { Classic } from 'https://esm.sh/@theme-toggles/react@4.1.0?deps=react@17.0.2';

export default function ThemeToggle() {
  const [toggled, setToggled] = useState(document.body.getAttribute('data-theme') === 'dark');

  function handleToggle() {
    const next = !toggled;
    setToggled(next);
    if (typeof window.stopBackgroundAnimation === 'function') {
      window.stopBackgroundAnimation();
    }
    if (next) {
      window.applyDarkTheme && window.applyDarkTheme();
      localStorage.setItem('theme', 'dark');
    } else {
      window.applyLightTheme && window.applyLightTheme();
      localStorage.setItem('theme', 'light');
    }
    if (typeof window.startBackgroundAnimation === 'function') {
      window.startBackgroundAnimation();
    }
  }

  return React.createElement(Classic, { duration: 750, toggled, onToggle: handleToggle });
}

