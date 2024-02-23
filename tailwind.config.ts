import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens:{
        'xl': '1440px',
        // => @media (min-width: 1440px) { ... }
      }
    },
    daisyui: {
      themes: ["light", "wireframe"],
    },
    screens: {
      'sm': '600px',
      // => @media (min-width: '600px) { ... }

      'md': '905px',
      // => @media (min-width: 905px) { ... }

      'lg': '1240px',
      // => @media (min-width: 1240px) { ... }
    } 
  },
  plugins: [
    require("daisyui"),
    require("flowbite/plugin"),
    require("@tailwindcss/typography"),
  ],
};
export default config;
