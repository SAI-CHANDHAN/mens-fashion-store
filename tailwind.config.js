/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#121212',
        canvas: '#f6f3ed',
        pearl: '#ffffff',
        accent: '#c48d2f',
        ink: '#1f1f1f',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0, 0, 0, 0.28)',
        card: '0 20px 40px -22px rgba(0, 0, 0, 0.44)',
      },
      keyframes: {
        rise: {
          '0%': {
            opacity: '0',
            transform: 'translateY(14px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        rise: 'rise 0.55s ease-out both',
      },
    },
  },
  plugins: [],
}