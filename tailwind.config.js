/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blaizn-orange': '#ea580c',
        'blaizn-red': '#dc2626',
      }
    },
  },
  plugins: [],
}