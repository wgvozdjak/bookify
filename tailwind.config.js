/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [],
  theme: {
    fontFamily: {
      sans: ['"Inter"', "sans-serif"],
    },
    extend: {
      fontFamily: {
        josefin: ['"Josefin Sans"', "sans-serif"],
      },
      /* 
      default light color: violet-200
      default medium color: violet-500
      default dark color: violent-800
      */
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
