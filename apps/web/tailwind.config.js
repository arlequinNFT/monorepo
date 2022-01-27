module.exports = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        clouds: "url('/images/bg_clouds.jpg')",
        bubbles: "url('/images/bg_bubbles.jpg')",
        team: "url('/images/bg_team.jpg')",
      },
    },
  },
  presets: [require('../../tailwind-preset.config')],
};
