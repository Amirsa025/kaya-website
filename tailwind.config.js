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
    },
  },
  plugins: [],
}
