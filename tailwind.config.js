module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      customGray: "#161b22",
      customBlack: "#0D1117",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
