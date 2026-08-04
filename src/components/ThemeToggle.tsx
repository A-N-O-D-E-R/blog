import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark');
    setTheme(next);
  };

  return (
    <button onClick={toggle} aria-label="Toggle theme" className="text-2xl">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
