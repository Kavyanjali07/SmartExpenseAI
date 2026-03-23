import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7d5aff',
        'secondary': '#00d4ff',
        'accent': '#ff006e',
        'dark-bg': '#0a0e27',
      },
      backgroundColor: {
        'glass': 'rgba(27, 31, 59, 0.7)',
      },
      backdropBlur: {
        'md': '20px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(157, 123, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)',
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(0, 212, 255, 0.2)',
        'glow-purple': '0 0 20px rgba(157, 123, 255, 0.4), 0 0 40px rgba(157, 123, 255, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
