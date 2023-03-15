/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
  plugins: [],
}
