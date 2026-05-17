/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#dae4f0',
          200: '#b8cce3',
          300: '#8aadd1',
          400: '#5c8bba',
          500: '#3d6fa5',
          600: '#2d5589',
          700: '#1e3a5f',
          800: '#152a47',
          900: '#0d1d32',
          950: '#080f1c',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 4px 16px 0 rgba(0,0,0,0.06)',
        'card-hover': '0 4px 6px -1px rgba(0,0,0,0.08), 0 20px 48px -8px rgba(0,0,0,0.14)',
        glass: '0 8px 32px rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [],
};
