import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['GeneralSans', 'system-ui', 'sans-serif'],
      body: ['GeneralSans', 'system-ui', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
