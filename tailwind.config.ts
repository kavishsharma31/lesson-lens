import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chalk: "#fffaf0",
        ink: "#16303d",
        peacock: "#087e8b",
        mango: "#ffc53d",
        poppy: "#f05a5b",
        leaf: "#51a35f",
        grape: "#6d5bd0",
      },
      boxShadow: {
        sticker: "0 10px 0 rgba(22, 48, 61, 0.12)",
        soft: "0 22px 60px rgba(22, 48, 61, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
