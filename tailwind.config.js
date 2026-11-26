/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0d1f3c",
          light: "#162a4f",
          dark: "#07122a",
        },
        brand: {
          orange: "#f26522",
          "orange-dark": "#d4541a",
        },
        ink: "#1f2328",
        muted: "#6b6560",
        paper: "#faf8f5",
        line: "#e7e2da",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        display: ["Schibsted Grotesk", "IBM Plex Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
