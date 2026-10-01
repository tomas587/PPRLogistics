/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Keep legacy blue utility names aligned with the PPR red-orange theme
        blue: {
          50: '#F8F9FA',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#E94B2C', // primary
          600: '#C93D24', // hover
          700: '#9F311F',
          800: '#74271D',
          900: '#4A1D19',
        },
        // Named primary palette for semantic use
        primary: {
          DEFAULT: '#E94B2C',
          light: '#E94B2C',
          bright: '#E94B2C',
          dark: '#C93D24',
        },
        // Dark navy tones
        'navy-dark': '#111827',
        'navy-deep': '#1F2937',
      },
    },
  },
  plugins: [],
};
