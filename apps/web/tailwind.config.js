module.exports = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        clouds: "url('/images/bg_clouds.jpg')",
        bubbles: "url('/images/bg_bubbles.jpg')",
      },
      colors: {
        cyan: '#22b8cf',
        blue: '#0070f3',
        green: '#37b679',
        red: '#d6747a',
        pink: '#e64980',
        purple: '#7a81ff',
        primary: '#282446',
      },
    },

    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '3xl': '1920px',
    },
  },
  plugins: [],
};
