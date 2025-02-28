/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},    
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      mono: ["Share Tech Mono", "monospace"],
      roboto: ["Roboto", "sans-serif"],
      karla: ["Karla", "sans-serif"],
      overpass: ["Overpass", "sans-serif"]
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
