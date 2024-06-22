import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      light: {
        // ...
        color: {
          black: "#000000",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      theme: {
        extend: {
          light: {
            // ...
            colors: {
              black: "#000000",
            },
          },
        },
      },
    }),
  ],
};
