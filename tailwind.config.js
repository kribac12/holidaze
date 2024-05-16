/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F766E',
        primaryBg: '#FFFFFF',
        primaryText: '#333333',
        secondary: '#89CFF0',
        secondaryText: '#626567',
        secondaryDark: '#567D98',
        extraDark: '#CC9500',
        accent: '#FFBA08',
        cardBg: '#FAFAFA',
      },
      safeList: ['font-h1', 'text-h1', 'font-h2', 'text-h2'],
      spacing: {
        section: '2rem',
        heading: '1rem',
        8: '2rem',
        16: '4rem',
        24: '6rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px',
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        h1: '2rem',
        h2: '1.3rem',
      },
      fontWeight: {
        h1: '500',
        h2: '300',
      },
      width: {
        full: '100%', // Full width
        '1/2': '50%', // Half width
        24: '6rem', // Custom width
      },
      height: {
        40: '10rem',
      },
      zIndex: {
        0: 0,
        10: 10,
        20: 20,
        30: 30,
        40: 40,
        50: 50,
        auto: 'auto',
      },
      backgroundImage: {
        'banner-image': "url('/path/to/banner/image.jpg')",
      },
    },
  },
  plugins: [],
}
