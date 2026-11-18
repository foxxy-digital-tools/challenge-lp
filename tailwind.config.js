/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FAF9F5",
        surface: "#FFFFFF",
        recessed: "#F3F2EE",
        ink: {
          primary: "#09090B",
          secondary: "#52525B",
          muted: "#71717A",
        },
        hairline: "#E4E4E0",
        signal: {
          DEFAULT: "#EA580C",
          hover: "#C2410C",
          light: "#FFF7ED",
          border: "#FDBA74",
          50: "#FFF7ED",
          100: "#FFEDD5",
        },
        verified: {
          DEFAULT: "#059669",
          light: "#ECFDF5",
          border: "#A7F3D0",
          50: "#ECFDF5",
        },
        amber: {
          DEFAULT: "#D97706",
          light: "#FFFBEB",
          border: "#FCD34D",
          50: "#FFFBEB",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 2px rgba(9,9,11,0.05), 0 8px 24px -4px rgba(9,9,11,0.04), inset 0 1px 0 0 rgba(255,255,255,0.9)',
        'card-hover': '0 2px 4px rgba(9,9,11,0.06), 0 16px 40px -6px rgba(9,9,11,0.08), inset 0 1px 0 0 rgba(255,255,255,0.9)',
        'card-lifted': '0 4px 8px rgba(9,9,11,0.08), 0 24px 48px -8px rgba(9,9,11,0.12), inset 0 1px 0 0 rgba(255,255,255,0.9)',
        'dock': '0 -4px 24px -2px rgba(9,9,11,0.08), 0 -1px 2px rgba(9,9,11,0.04)',
        'sheet': '0 -16px 36px -8px rgba(9,9,11,0.15), 0 -2px 6px rgba(9,9,11,0.05)',
        'modal': '0 24px 48px -12px rgba(9,9,11,0.18), 0 0 0 1px rgba(9,9,11,0.06)',
        'subtle': '0 1px 3px rgba(9,9,11,0.06)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.8), inset 0 -1px 0 0 rgba(9,9,11,0.03)',
        'signal-glow': '0 0 20px rgba(234,88,12,0.15), 0 0 40px rgba(234,88,12,0.08)',
        'signal-glow-lg': '0 0 30px rgba(234,88,12,0.2), 0 0 60px rgba(234,88,12,0.1)',
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter: "-0.025em",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
