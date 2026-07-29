/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          black: '#0D0D0D',
          dark: '#1A1A2E',
          deep: '#16213E',
        },
        flame: {
          50: '#FFF4ED',
          100: '#FFE6D5',
          200: '#FFC4A8',
          300: '#FFA372',
          400: '#FF8243',
          500: '#FF6B35',
          600: '#E55A2B',
          700: '#CC4A22',
          800: '#A33A1A',
          900: '#7A2C13',
        },
        gold: {
          400: '#FBB314',
          500: '#F9C80E',
          600: '#E0B408',
        },
        volt: {
          400: '#3DEDED',
          500: '#08D9D6',
          600: '#06B8B5',
        },
      },
      fontFamily: {
        display: ['Rajdhani', 'Oswald', 'sans-serif'],
        sans: ['Noto Sans SC', 'Rajdhani', 'sans-serif'],
        heavy: ['Noto Sans SC', 'sans-serif'],
      },
      clipPath: {
        'slash-r': 'polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)',
        'slash-l': 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 15%)',
        'slash-both': 'polygon(10% 0, 100% 0, 100% 85%, 90% 100%, 0 100%, 0 15%)',
        'octagon': 'polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'flicker': 'flicker 3s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.3)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
