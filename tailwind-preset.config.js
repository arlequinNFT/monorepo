module.exports = {
  theme: {
    extend: {
      colors: {
        cyan: '#22b8cf',
        blue: '#0070f3',
        green: '#37b679',
        red: '#d6747a',
        'red-light': '#dc888d',
        pink: '#e64980',
        purple: '#3a3a62',
        'black-700': '#171717',
        'black-600': '#242424',
        'black-500': '#303030',
        'black-400': '#3f3f3f',
        'black-300': '#525252',
        'black-200': '#6B6B6B',
        primary: '#282446',
      },
      gridTemplateColumns: {
        'auto-xs': ' repeat(auto-fit, minmax(2rem, 1fr))',
        'auto-sm': ' repeat(auto-fit, minmax(4rem, 1fr))',
        'auto-md': ' repeat(auto-fit, minmax(6rem, 1fr))',
        'auto-lg': ' repeat(auto-fit, minmax(8rem, 1fr))',
        'auto-xl': ' repeat(auto-fit, minmax(10rem, 1fr))',
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
