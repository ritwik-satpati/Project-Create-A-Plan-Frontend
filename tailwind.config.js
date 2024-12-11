/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {},
  },
  safelist: [
    {
      pattern: /bg-(red|blue|green|yellow|purple)/, // Background colors to be safelisted
    },
    {
      pattern: /space-x-(0|1|2|3|4|5|6|7|8)/, // Horizontal spacing utilities to be safelisted
    },
    {
      pattern: /text-(red|blue|green|yellow|purple)/, // For existing text colors
    },
    {
      pattern: /hover:bg-(red|blue|green|yellow|purple)/, // For background hover states
    },
    {
      pattern: /border-(red|blue|green|yellow|purple)/, // For border colors
    },
  ],
  plugins: [],
};
