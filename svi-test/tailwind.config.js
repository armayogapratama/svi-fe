/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          10: "#DCD7F9",
          20: "#4E36E2",
          30: "#C4BCF5",
          40: "#4E36E2",
          50: "#412DBC",
          60: "#271B71",
        },
        secondary: {
          10: "#D6E1F9",
          20: "#BBCCF6",
          30: "#3267E3",
          40: "#2A56BD",
          50: "#193472",
        },
        neutral: {
          10: "#FFFFFF",
          20: "#F5F5F5",
          30: "#EDEDED",
          40: "#E0E0E0",
          50: "#C2C2C2",
          60: "#9E9E9E",
          70: "#757575",
          80: "#616161",
          90: "#404040",
          100: "#0A0A0A",
        },
        error: {
          10: "#F5D8D6",
          20: "#EEBDBA",
          30: "#CB3A31",
          40: "#A93029",
          50: "#661D19",
        },
        warning: {
          10: "#F5E5D5",
          20: "#EED3B9",
          30: "#CD7B2E",
          40: "#AB6726",
          50: "#673E17",
        },
        success: {
          10: "#D9E9E2",
          20: "#C0DBCE",
          30: "#43936C",
          40: "#387B5A",
          50: "#224A36",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
