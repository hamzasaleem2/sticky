/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        main: '#FFDC58',
        mainAccent: '#ffc800',
        overlay: 'rgba(0,0,0,0.8)',
  
        // light mode
        bg: '#FEF2E8',
        text: '#1f1f1f',
        border: '#000',
  
        // dark mode
        darkBg: '#1f1f1f',
        darkText: '#eeefe9',
        darkBorder: '#000',
        secondaryBlack: '#1b1b1b',

        text: {
          DEFAULT: '#1f1f1f',
          dark: '#eeefe9',
        },
      },
      borderRadius: {
        base: '20px'
      },
      boxShadow: {
        light: '3px 3px 0px 0px #000',
        dark: '3px 3px 0px 0px #000',
        white: '3px 3px 0px 0px #fff',
      },
      translate: {
        boxShadowX: '3px',
        boxShadowY: '3px',
        reverseBoxShadowX: '-3px',
        reverseBoxShadowY: '-3px',
      },
      fontWeight: {
        base: '500',
        heading: '800',
      },
      minHeight: {
        screen: '100vh',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

