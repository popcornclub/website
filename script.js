(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  if (!toggle || !root) return;

  const getStoredTheme = () => {
    try {
      return localStorage.getItem('theme');
    } catch (err) {
      return null;
    }
  };

  const storeTheme = (value) => {
    try {
      localStorage.setItem('theme', value);
    } catch (err) {
      // Ignore storage failures (e.g., Safari private mode)
    }
  };

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = getStoredTheme() || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  toggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    storeTheme(nextTheme);
  });
})();
