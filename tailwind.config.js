module.exports = {
  theme: {
    extend: {
      colors: {
        black: {
          100: 'rgba(0,0,0,0.1)',
          200: 'rgba(0,0,0,0.2)',
          300: 'rgba(0,0,0,0.3)',
          500: '#000000'
        },
        white: {
          100: 'rgba(255,255,255,0.1)',
          200: 'rgba(255,255,255,0.2)',
          300: 'rgba(255,255,255,0.3)',
          500: '#FFFFFF'
        },
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: []
}
