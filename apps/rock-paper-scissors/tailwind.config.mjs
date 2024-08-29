import baseConfig from '../../tailwind.config.mjs';

const config = {
  ...baseConfig,
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: 'hsl(229, 25%, 31%)',
          score: 'hsl(229, 64%, 46%)',
          outline: 'hsl(217, 16%, 45%)',
        },
      },
      screens: {
        xs: '480px',
      },
    },
  },
};

export default config;
