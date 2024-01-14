/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue, js}', './public/index.html', './src/**/**/*.{vue, js}',],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': 'Montserrat, sans-serif'
      },
      backgroundColor: {
        'bg': '#f8ece4',
        'brown': '#48413c',
        'dark': '#48413c',
        'yellow': '#dbd5c7',
      },
      placeholderColor: {
        'dark': '#48413c',
      },
      textColor: {
        'dark': '#48413c',
      },
      borderColor: {
        'dark': '#48413c',
      },
      borderWidth: {
        '12': '12px',
        '14': '14px',
        '16': '16px'
      },
      height: {
        '128': '32rem',
        '192': '48rem',
      },
      width: {
        '140': '35rem',
      },
      fontSize: {
        'min-sm': '0.75rem'
      },
    },
  },
  plugins: [],
}

