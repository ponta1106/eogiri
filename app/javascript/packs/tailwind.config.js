module.exports = {
  purge: [
    'app/javascript/**/*.vue',
    'app/views/**/*.html.erb',
  ],
  theme: {
    extend: {
      fontFamily: {
        'kosugimaru': ['"Kosugi Maru"', 'sans-serif'],
        'ReggaeOne': ['"Reggae One"', 'sans-serif']
      },
      colors: {
        dark: {
          lighter : 'rgb(104, 107, 116)',
          default : 'rgb(94, 97, 106)',
        },
        modalbg: 'rgba(94, 97, 106, .5)',
        orange: {
          lighter : 'rgb(252, 190, 160)',
          default : 'rgb(232, 170, 140)',
        },
        blue: {
          lighter : '#95B5E7',
          default : '#7689ad',
        }
      },
    },
  },
}
