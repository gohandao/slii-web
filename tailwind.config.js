/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  // content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  purge: {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundOpacity: ["active"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
