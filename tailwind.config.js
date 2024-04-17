/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary: "#ED0010", // Primary button, H1, icons
        primaryBg: "#F1F1F1", // Background color
        primaryText: "#333333", // Primary text color
        secondaryText: "#626567", // Secondary text and borders
        accent: "#FFBA08", // Accent color
        cardBg: "#FFFFFF", // Background for cards
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Headings and nav links
        roboto: ["Roboto", "sans-serif"], // Body text and everything else
      },
    },
  },
  plugins: [],
};
