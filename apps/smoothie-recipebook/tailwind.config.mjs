import baseConfig from '../../tailwind.config.mjs';

const config = {
  ...baseConfig,
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
    },
  },
};

export default config;
