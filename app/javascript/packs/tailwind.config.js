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
        orange: 'rgb(232, 170, 140)',
        dark: 'rgb(94, 97, 106)',
        blue: {
          lighter: '#95B5E7',
          default: '#7689ad',
        }
      },
      backgroundImage: {
        'logo': "url('../stylesheets/images/logo.png')"
       }
    },
  },
}
