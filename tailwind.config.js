/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Light Theme
      screens: {
        light: { raw: "(prefers-color-scheme: light)" },
      },
      colors: {
        lightBackground: "white",
        lightText: "black",
      },
      // Dark Theme
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" },
      },
      colors: {
        darkBackground: "black",
        darkText: "white",
      },
    },
  },
  plugins: [],
};
