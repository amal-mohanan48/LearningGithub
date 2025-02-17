/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "var(--light)",
        dark: "var(--dark)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      animation: {
        shake: "shake 1.2s infinite",
        slideToLeft: "slideToLeft .3s",
        slideInLeft: "slideInLeft .3s",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "10%, 30%, 60%, 80%": { transform: "rotate(-2deg)" },
          "20%, 40%, 70%, 90%": { transform: "rotate(2deg)" },
        },
        slideToLeft: {
          "0%": { transform: "translateX(0%)", opacity:1 },
          "100%": { transform: "translateX(-100%)",opacity:0 },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity:0 },
          "100%": { transform: "translateX(0%)", opacity:1 },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
};

export default config;
