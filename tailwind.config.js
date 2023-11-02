/** @type {import('tailwindcss').Config} */

const preline = require('preline/plugin.js');

module.exports = {

  content: ["./views/**/*.{html, js, handlebars}", "node_modules/preline/dist/*.js"],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin')
  ],
}