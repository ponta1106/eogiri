const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./src/**/*.html", "src/**/*.vue"],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        'kosugimaru': ['"Kosugi Maru"', 'sans-serif'],
      },
      colors: {
        orange: '#ffc195',
        blue: {
          lighter: '#95B5E7',
          default: '#7689ad',
        }
      }
    },
  },
}
