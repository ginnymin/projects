import baseConfig from '../../tailwind.config.mjs';

const config = {
  ...baseConfig,
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        gray: {
          light: 'hsl(0, 0%, 98%)',
          dark: 'hsl(0, 0%, 52%)',
        },
        blue: {
          dark: 'hsl(209, 23%, 22%)',
          ['dark-background']: 'hsl(207, 26%, 17%)',
          ['dark-text']: 'hsl(200, 15%, 8%)',
        },
      },
      screens: {
        xs: '480px',
      },
    },
  },
};

export default config;
