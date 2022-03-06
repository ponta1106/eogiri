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
        transparent: 'transparent',
        current: 'currentColor',
        gray: colors.gray,
        red: colors.rose,
        blue: colors.indigo,
        yellow: colors.amber,
        purple: colors.purple,
        orange: colors.orange,
        teal: colors.teal
      }
    },
  },
}
