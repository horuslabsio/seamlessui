import type { Config } from "tailwindcss";
import tailwindConfig from "./tooling/tailwind.json";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [tailwindConfig],
  plugins: [
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        ".seamlessui-container": {
          width: "100%",
          // "@screen lg": {
          //   maxWidth: "1280px",
          // },
          // "@screen xl": {
          //   maxWidth: "1536px",
          // },
        },
      });
    },
  ],
};
export default config;
