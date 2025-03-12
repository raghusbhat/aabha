/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f2fd",
          100: "#ede5fa",
          200: "#d9cbf5",
          300: "#c0a7ed",
          400: "#a683e5",
          500: "#845ec2", // Main primary color (purple)
          600: "#6a4ba9",
          700: "#563c8a",
          800: "#432e6b",
          900: "#2f214c",
          950: "#1a1229",
        },
        secondary: {
          50: "#fff1f5",
          100: "#ffe4eb",
          200: "#ffc9d7",
          300: "#ffa1b9",
          400: "#ff8aa5",
          500: "#ff6f91", // Main secondary color (pink)
          600: "#e6547a",
          700: "#cc3a63",
          800: "#b3214c",
          900: "#991335",
          950: "#7f051e",
        },
        warning: {
          50: "#fefaed",
          100: "#fdf5db",
          200: "#fbe9b7",
          300: "#f8d988",
          400: "#f4c659",
          500: "#E19C2E", // Main warning color (amber)
          600: "#ca8219",
          700: "#a66516",
          800: "#824f17",
          900: "#6a4118",
          950: "#422508",
        },
        danger: {
          50: "#fef2f4",
          100: "#fde6ea",
          200: "#fbd0d9",
          300: "#f7a9b9",
          400: "#f27591",
          500: "#E12E48", // Main danger color (red)
          600: "#d41c37",
          700: "#b0162e",
          800: "#8c1125",
          900: "#730e1f",
          950: "#59091a",
        },
        // Keep the gray palette for UI elements
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
      },
      transitionProperty: {
        all: "all",
      },
      transitionDuration: {
        250: "250ms",
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        sans: ["PT Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
