import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "light-linear-gradient":
          "linear-gradient(168.54deg, #FF9034%20-46.81%,%20#FFFFFF%2031.09%,%20#FFFFFF%2077.47%)",
        "dark-linear-gradient":
          "linear-gradient(169.58deg, #E1852D%20-79.18%,%20#212121%2019.19%,%20#1A1A1A%2056.31%)",
      },
      colors: {
        "base-light": "#ffffff",
        "base-dark": "#1A1A1A",
        "blue-700": "#141925",
        "red-600": "#CC3333",
        "grey-300": "#DADADA",
        "grey-500": "#7A7A7A",
        "grey-600": "#3A3A3A",
        "grey-700": "#494949",
        "grey-800": "#343434",
      },
    },
  },
  plugins: [],
};
export default config;
