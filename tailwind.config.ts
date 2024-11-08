import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg-primary)",
        'bg-card': "var(--color-bg-card)",
        'bg-input': "var(--color-bg-input)",
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          20: "rgba(139, 92, 246, 0.2)",
          30: "rgba(139, 92, 246, 0.3)",
          50: "rgba(139, 92, 246, 0.5)",
          10: "rgba(139, 92, 246, 0.1)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        border: {
          primary: "var(--color-border-primary)",
          secondary: "var(--color-border-secondary)",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'accent-sm': '0 1px 2px 0 rgb(139 92 246 / 0.05)',
        'accent': '0 4px 6px -1px rgb(139 92 246 / 0.1), 0 2px 4px -1px rgb(139 92 246 / 0.06)',
        'accent-md': '0 6px 10px -1px rgb(139 92 246 / 0.1), 0 4px 6px -2px rgb(139 92 246 / 0.05)',
        'accent-lg': '0 10px 15px -3px rgb(139 92 246 / 0.1), 0 4px 6px -2px rgb(139 92 246 / 0.05)',
        'accent-xl': '0 20px 25px -5px rgb(139 92 246 / 0.1), 0 10px 10px -5px rgb(139 92 246 / 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;