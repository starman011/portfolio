const { useState, useEffect } = React;
const { Switch } = MaterialUI;

function ThemeToggle() {
  const getPreferredTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (localStorage.getItem('theme')) return;
      setTheme(e.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

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
    const handler = (e) => {
      if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [theme]);

  useEffect(() => {
    if (typeof window.startBackgroundAnimation === 'function') {
      window.startBackgroundAnimation();
    }
  }, [theme]);

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={toggleTheme}
      inputProps={{ 'aria-label': 'Theme toggle' }}
    />
  );
}

window.ThemeToggle = ThemeToggle;
