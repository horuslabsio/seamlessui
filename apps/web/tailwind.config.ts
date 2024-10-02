import type { Config } from "tailwindcss";
import baseConfig from "@seamlessui/tailwind-config/base";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{ts,tsx}",
    ...baseConfig.content,
  ],
  presets: [baseConfig],
};

export default config;
