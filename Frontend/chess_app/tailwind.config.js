module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'chess-darker': '#0B0B0D',
        'chess-dark': '#1A1A1F',
        'chess-gray': '#2A2A30',
        'chess-light': '#F2F2F2',
        'chess-text': '#D9D9D9',
        'chess-border': '#BFC3C9',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(242, 242, 242, 0.1)' },
          '50%': { 'box-shadow': '0 0 40px rgba(242, 242, 242, 0.2)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
