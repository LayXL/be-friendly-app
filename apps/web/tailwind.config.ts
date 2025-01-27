import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        neutral: {
          contrast: "var(--gray-contrast)",
          1: "var(--gray-1)",
          2: "var(--gray-2)",
          3: "var(--gray-3)",
          4: "var(--gray-4)",
          5: "var(--gray-5)",
          6: "var(--gray-6)",
          7: "var(--gray-7)",
          8: "var(--gray-8)",
          9: "var(--gray-9)",
          10: "var(--gray-10)",
          11: "var(--gray-11)",
          12: "var(--gray-12)",
        },
        accent: {
          1: "var(--blue-1)",
          2: "var(--blue-2)",
          3: "var(--blue-3)",
          4: "var(--blue-4)",
          5: "var(--blue-5)",
          6: "var(--blue-6)",
          7: "var(--blue-7)",
          8: "var(--blue-8)",
          9: "var(--blue-9)",
          10: "var(--blue-10)",
          11: "var(--blue-11)",
          12: "var(--blue-12)",
        },
      },
    },
  },
} satisfies Config
