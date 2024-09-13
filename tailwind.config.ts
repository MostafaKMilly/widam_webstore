import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0055BB",
        skyBlue: "#10B0EB",
        gray: "#707070",
        darkCyan: "rgb(51, 89, 103)",
        lightBlue: "rgb(216, 238, 254)",
        skyLightBlue: "rgb(177, 222, 254)",
        midGray: "rgb(136, 136, 136)",
        navyBlue: "rgb(0, 59, 130)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
};
export default config;
