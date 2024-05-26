/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        PlaceHolderGray: "#AAA6B9",
        inputGray: "#3D3D3D",
        cardBlack: "#0D0D0D",
        purple: "#8B7DB4",
        white: "#FFFFFF",
        black: "#000000",
        grey: "#DEDEDE",
        darkgrey: "#6A6A6A",
        backGrey: "#1c1c1c",
        red: "#FF4141",
        purple: "#876DD0",
      },
      spacing: {
        128: "120rem",
        nav: "16vw",
        side: "20%",
      },
    },
  },
  plugins: [],
};
