module.exports = {
  mode: 'jit',
  purge: ["./src/**/*.html", "src/**/*.vue"],
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
      animation: {
        slideIn: "slideIn 1s ease-in forwards",
      },
      keyframes: {
        slideIn: {
          "0%": {
            opacity: 0,
            transform: "translateY(60px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
    },
  },
}
