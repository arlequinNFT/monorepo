module.exports = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        clouds: "url('/images/bg_clouds.jpg')",
        bubbles: "url('/images/bg_bubbles.jpg')",
        team: "url('/images/bg_team.jpg')",
      },
      keyframes: {
        float: {
          '0%': {
            transform: 'translatey(0px)',
          },
          '50%': {
            transform: 'translatey(-20px)',
          },
          '100%': {
            transform: 'translatey(0px)',
          },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  presets: [require('../../tailwind-preset.config')],
};
