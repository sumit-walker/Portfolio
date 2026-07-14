/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#090d14",
        "bg-panel": "#0c121b",
        "bg-inset": "#0a0f17",
        border: "#1c2634",
        "border-soft": "#161f2b",
        text: "#dbe4ee",
        "text-dim": "#6b7788",
        "text-faint": "#465162",
        teal: "#5eead4",
        orange: "#f0a860",
        purple: "#a48cf0",
        red: "#f0716b",
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [],
};
