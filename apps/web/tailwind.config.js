module.exports = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        clouds: "url('/images/bg_clouds.jpg')",
        bubbles: "url('/images/bg_bubbles.jpg')",
      },
    },
  },
  presets: [require('../../tailwind-preset.config')],
};
