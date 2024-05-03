/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      white: "#fefefe",
      terracota: "#de6c5c",
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      black: "#000000",
      offwhite: "#E0E0E0",
      darkModeBackground: "#1e1e1e",
      inputDark: "#6C6C6C",
      footerDark: "#37332E",
      borderDark: "#4E504E",
    },
    body: {
      margin: "0",
      padding: "0",
    },
  },
  plugins: [],
};