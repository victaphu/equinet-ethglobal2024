import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'gov-blue': '#0033a0', // A strong blue similar to that used by the SEC
        'gov-gray': '#f3f4f6', // A light gray background
        'gov-dark': '#333333', // Dark text for high readability
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'], // SEC uses Arial, which is clean and professional
      },
    },
  },
  plugins: [],
};
export default config;
