const { useState, useEffect } = React;

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
    <button
      className="theme-toggle"
      type="button"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        width="1em"
        height="1em"
        fill="currentColor"
        strokeLinecap="round"
        className="theme-toggle__classic"
        viewBox="0 0 32 32"
      >
        <clipPath id="theme-toggle__classic__cutout">
          <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
        </clipPath>
        <g clipPath="url(#theme-toggle__classic__cutout)">
          <circle cx="16" cy="16" r="9.34" />
          <g stroke="currentColor" strokeWidth="1.5">
            <path d="M16 5.5v-4" />
            <path d="M16 30.5v-4" />
            <path d="M1.5 16h4" />
            <path d="M26.5 16h4" />
            <path d="m23.4 8.6 2.8-2.8" />
            <path d="m5.7 26.3 2.9-2.9" />
            <path d="m5.8 5.8 2.8 2.8" />
            <path d="m23.4 23.4 2.9 2.9" />
          </g>
        </g>
      </svg>
    </button>
  );
}

window.ThemeToggle = ThemeToggle;
