/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      flexShrink: {
        2: "2",
      },
    },
  },
  plugins: [
    require("tailwind-scroll-behavior")(),
    require("tailwind-scrollbar-hide"),
  ],
};
