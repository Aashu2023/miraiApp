/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Check if your folder is named "mirai" or "(mirai)" and match it below
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};