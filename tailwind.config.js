module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      'inter' : ['Inter', 'sans-serif']
    },
    extend: {
      colors: {
        'brand-navy' :  '#34485C',
        'brand-orange' : '#F05F40',
        'light-navy' : '#506A7F',
        'brand-light-gray' : '#cad8e1',
        'brand-smoke' : '#f4f7f9',
        'cadet-blue' : '#7b9eb4',
      },
      height: {
        '43.75' : '43.75rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
