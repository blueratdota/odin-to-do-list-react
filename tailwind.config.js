/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    extend: {
      fontFamily: {
        orbit: ["Pacifico"],
        jersey: ["'Jersey 25'", "Pacifico"]
      },
      colors: {
        text: "#130e01",
        background: "#fffaeb",
        primary: "#ff8400",
        secondary: "#fff5d6",
        accent: "#cf4307"
      }
    }
  },
  plugins: []
};
