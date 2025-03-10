import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#588534",
        secondary: "#593497",
        ternary: "#00be58",
        background: "#F6F6F6",
        product: "#EAEAEA",
      },
    },
  },
  plugins: [],
} satisfies Config;
