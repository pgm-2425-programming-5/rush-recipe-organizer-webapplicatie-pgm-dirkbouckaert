import type { Config } from 'tailwindcss';
import tailwindForms from '@tailwindcss/forms';

const config: Config = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // safelist with dynamic colors
  // source: https://stackoverflow.com/questions/75440072/tailwindcss-styles-not-rendered-when-applied-dynamically-in-nextjs#answer-75461394
  safelist: [
    'bg-red-500/70',
    'bg-yellow-500/70',
    'bg-blue-500/70',
    'bg-pink-500/70',
    'bg-green-500/70',
    'text-white',
  ],
  theme: {
    extend: {
      colors: {},
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [tailwindForms],
};
export default config;
