/**
 * This file is stored as an env variable and then loaded into a script tag.
 * See: next.config and layout.tsx
 */

(function () {
  const isSystemDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  if (isSystemDarkMode) {
    document.documentElement.setAttribute('data-mode', 'dark');
  }
})();
