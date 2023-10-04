const defaultTheme = require("tailwindcss/defaultTheme");
const windmill = require("@windmill/react-ui/config");
//IBM Plex Sans Thai
//sans: ['Inter', ...defaultTheme.fontFamily.sans],
//sans: ['Prompt', 'sans-serif'],

module.exports = windmill({
  purge: ["src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Prompt", "sans-serif"],
      },
      boxShadow: {
        bottom:
          "0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)",
      },
    },
  },
});
