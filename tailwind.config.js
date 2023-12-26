/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        shake: "shake 1.5s infinite",
      },
      keyframes: {
        shake: {
          "20%": { transform: "translateX(0)" },
          "25%, 35%": { transform: "translateY(-2px)" },
          "40%": { transform: "translateY(-2px) rotate(17deg)" },
          "50%": { transform: "translateY(-2px) rotate(-17deg)" },
          "60%": { transform: "translateY(-2px) rotate(17deg)" },
          "70%": { transform: "translateY(-2px) rotate(-17deg)" },
          "80%": { transform: "translateY(0) rotate(0)" },
        },
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
};
