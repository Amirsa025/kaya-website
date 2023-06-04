/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '400px',
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1440px',
    },
    extend: {
      fontFamily: {
        'IRANSans': ['IRANSans', 'sans-serif']
      }
    }, animation: {
      "slide-in-top": "slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both"
    },  keyframes: {
      "slide-in-top": {
        "0%": {
          transform: "translateY(-1000px)",
          opacity: "0"
        },
        to: {
          transform: "translateY(0)",
          opacity: "1"
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
})
