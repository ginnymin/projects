/** @type {import('tailwindcss').Config} */
import baseConfig from '../../tailwind.config.mjs';

const config = {
  ...baseConfig,
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
};

export default config;
