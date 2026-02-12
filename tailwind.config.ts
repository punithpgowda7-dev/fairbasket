import type { Config } from "tailwindcss";

const config: Config = {
  // This is the 'Master Switch' that allows your button to work
  darkMode: 'class', 
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Adding these just in case you have other common folders
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;