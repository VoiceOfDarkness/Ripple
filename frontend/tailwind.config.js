/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      cardBlack: "#0D0D0D",
      purple: "#8B7DB4",
      white: "#FFFFFF",
      black: "#000000",
      grey: "#DEDEDE",
      darkgrey: "#6A6A6A",
    },
    extend: {
      spacing: {
        128: "120rem",
      },
    },
  },
  plugins: [],
};
