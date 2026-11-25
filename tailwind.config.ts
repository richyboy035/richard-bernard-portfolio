import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#090a09',
        panel: '#141514',
        lime: '#c8ff45',
        muted: '#969996',
      },
    },
  },
  plugins: [],
};
export default config;
