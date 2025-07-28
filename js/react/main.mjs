import React, { useState, useEffect } from 'https://esm.sh/react@17.0.2';
import ReactDOM from 'https://esm.sh/react-dom@17.0.2';
import { motion } from 'https://esm.sh/framer-motion@7.6.16?deps=react@17.0.2,react-dom@17.0.2';
import { DarkModeSwitch } from 'https://esm.sh/react-toggle-dark-mode@1.1.1?deps=react@17.0.2,react-dom@17.0.2';

function VisitCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        await fetch('/api/view', { method: 'POST' });
        const res = await fetch('/api/count');
        if (!res.ok) throw new Error('Backend response was not ok');
        const data = await res.json();
        setCount(data.count);
        localStorage.setItem('visitCount', data.count);
      } catch (err) {
        console.error('Backend view count error, falling back to CountAPI', err);
        try {
          const namespace = 'starmanodyssey.com';
          const key = 'portfolio';
          const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
          if (!res.ok) throw new Error('CountAPI response was not ok');
          const data = await res.json();
          setCount(data.value);
          localStorage.setItem('visitCount', data.value);
        } catch (err2) {
          console.error('CountAPI error', err2);
          const stored = localStorage.getItem('visitCount');
          if (stored !== null) {
            const parsed = parseInt(stored, 10) || 0;
            const newCount = parsed + 1;
            localStorage.setItem('visitCount', newCount);
            setCount(newCount);
          } else {
            setCount(0);
          }
        }
      }
    }

    fetchCount();
  }, []);

  const renderDigits = () => {
    if (count === null) {
      return 'Loading...';
    }
    return String(count).split('').map((d, i) => (
      React.createElement('span', { key: i, className: 'visit-counter-digit' }, d)
    ));
  };

  return React.createElement('div', { className: 'visit-counter-wrapper' },
    React.createElement('div', { className: 'visit-counter-label' }, 'Visitors'),
    React.createElement('div', { className: 'visit-counter-digits' }, renderDigits())
  );
}

function ThemeToggle() {
  const [isDarkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      return stored === 'dark';
    }
    return true; // default to dark theme
  });

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    if (checked) {
      window.applyDarkTheme && window.applyDarkTheme();
    } else {
      window.applyLightTheme && window.applyLightTheme();
    }
  };

  const iconColor = isDarkMode ? '#f5f5dc' : '#000';

  return React.createElement(DarkModeSwitch, {
    checked: isDarkMode,
    onChange: toggleDarkMode,
    size: 24,
    moonColor: iconColor,
    sunColor: iconColor
  });
}

function StarWarsSelector() {
  const [selected, setSelected] = useState(null);

  const triggerFilter = (category) => {
    const btn = document.querySelector(`.portfolio-tab[data-filter="${category}"]`);
    if (btn) btn.click();
  };

  const handleSelect = (side) => {
    setSelected(side);
    if (side === 'technology') {
      window.applyDarkTheme && window.applyDarkTheme();
      triggerFilter('technology');
    } else {
      window.applyLightTheme && window.applyLightTheme();
      triggerFilter('architecture');
    }
    const grid = document.getElementById('project-grid');
    grid && grid.scrollIntoView({ behavior: 'smooth' });
  };

  return React.createElement('div', { className: 'starwars-selector' },
    React.createElement(motion.div, {
      className: `side dark-side ${selected === 'technology' ? 'selected' : ''}`,
      onClick: () => handleSelect('technology'),
      whileHover: { scale: 1.05 },
      animate: selected === 'technology' ? { scale: 1.1 } : { scale: 1 }
    }, [
      React.createElement('div', { className: 'starwars-main' }, 'Technology'),
      React.createElement('div', { className: 'starwars-sub' }, 'Dark Side'),
      React.createElement('div', { className: 'lightsaber' })
    ]),
    React.createElement(motion.div, {
      className: `side light-side ${selected === 'architecture' ? 'selected' : ''}`,
      onClick: () => handleSelect('architecture'),
      whileHover: { scale: 1.05 },
      animate: selected === 'architecture' ? { scale: 1.1 } : { scale: 1 }
    }, [
      React.createElement('div', { className: 'starwars-main' }, 'Architecture'),
      React.createElement('div', { className: 'starwars-sub' }, 'Light Side'),
      React.createElement('div', { className: 'lightsaber' })
    ])
  );
}

function initReactWidgets() {
  const counterEl = document.getElementById('visit-counter');
  if (counterEl) {
    ReactDOM.render(React.createElement(VisitCounter), counterEl);
  }
  const toggleEl = document.getElementById('dark-mode-toggle');
  if (toggleEl) {
    ReactDOM.render(React.createElement(ThemeToggle), toggleEl);
  }
  const starwarsEl = document.getElementById('starwars-selector');
  if (starwarsEl) {
    ReactDOM.render(React.createElement(StarWarsSelector), starwarsEl);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReactWidgets);
} else {
  initReactWidgets();
}
