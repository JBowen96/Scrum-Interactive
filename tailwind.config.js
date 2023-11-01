/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html, js, handlebars}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin')
  ],
}