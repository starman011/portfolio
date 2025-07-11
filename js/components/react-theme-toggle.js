const { useState, useEffect } = React;

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  const apply = (newTheme) => {
    if (newTheme === 'light') {
      if (typeof window.applyLightTheme === 'function') {
        window.applyLightTheme();
      }
    } else {
      if (typeof window.applyDarkTheme === 'function') {
        window.applyDarkTheme();
      }
    }
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    apply(theme);
  }, [theme]);

  const toggleTheme = () => {
    if (typeof window.stopBackgroundAnimation === 'function') {
      window.stopBackgroundAnimation();
    }
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (typeof window.startBackgroundAnimation === 'function') {
      window.startBackgroundAnimation();
    }
  }, [theme]);

  return (
    React.createElement('button', {
      onClick: toggleTheme,
      className: `react-theme-toggle ${theme}`,
      'aria-label': 'Toggle theme'
    }, React.createElement('span', { className: 'icon icon-animate' }))
  );
}

ReactDOM.render(
  React.createElement(ThemeToggle),
  document.getElementById('react-theme-toggle')
);

