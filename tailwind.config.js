/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220, 98%, 61%)',
        veryDarkBlue: 'hsl(235, 21%, 11%)',
        veryDarkDesaturatedBlue: 'hsl(235, 24%, 19%)',
        black2: '#0a0b0f'
      }
    },
  },
  plugins: [],
}
