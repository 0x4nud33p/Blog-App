/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cabin", "Poppins"],
      },
      keyframes: {
        fade458: {
          from: { opacity: "1" },
          to: { opacity: "0.25" },
        },
      },
      animation: {
        fade458: "fade458 1s linear infinite",
      },
    },
  },
  plugins: [],
};
