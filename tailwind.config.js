/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    fontFamily: {
      sans: ['"DM Sans"', "sans-serif"],
    },
    extend: {
      fontFamily: {
        josefin: ['"Josefin Sans"', "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
