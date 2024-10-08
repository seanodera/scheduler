import type { Config } from 'tailwindcss'

export default {
  content: [
      './src/**/*.{js,ts,jsx,tsx}',
  ],
  important: true,
  theme: {
    fontFamily: {
      matter: [
        'Matter',
        'sans-serif',
      ],
    },
    extend: {
      colors: {
        primary: '#804EEC',
        light: '#E3E7ED',
        gray: '#697483',
        dark: '#191621'
      }
    },
  },
  plugins: [],
} satisfies Config

