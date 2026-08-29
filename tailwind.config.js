/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#D8BE93",
          dark: "#B99B6B",
          deep: "#9C7C4B",
        },
        ink: "#2A211A",
        cream: "#F5EEE0",
        accent: {
          DEFAULT: "#2F5233",
          light: "#4C7A52",
          dark: "#1E3722",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        kraft: "repeating-linear-gradient(135deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 6px)",
      },
    },
  },
  plugins: [],
};
