/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary: "#ED0010", // Primary button, H1, icons
        primaryBg: "#FFFFFF", // Background color
        primaryText: "#333333", // Primary text color
        secondaryText: "#626567", // Secondary text and borders
        accent: "#FFBA08", // Accent color
        cardBg: "#F1F1F1", // Background for cards
      },
      spacing: {
        section: "2rem",
        heading: "1rem",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Headings and nav links
        roboto: ["Roboto", "sans-serif"], // Body text and everything else
      },
      fontSize: {
        h1: "2.25rem",
        h2: "1.5rem",
      },
      fontWeight: {
        h1: "500",
        h2: "300",
      },
    },
  },
  plugins: [],
};
