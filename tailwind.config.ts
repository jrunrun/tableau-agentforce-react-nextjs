import type { Config } from "tailwindcss";
import aspectRatio from '@tailwindcss/aspect-ratio';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f2',
          100: '#fbe6e6',
          200: '#f5d0d0',
          300: '#eea9a9',
          400: '#e47575',
          500: '#C53234',
          600: '#b12d2f',
          700: '#942528',
          800: '#7a1f22',
          900: '#651b1d',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [aspectRatio, typography],
};
export default config; 