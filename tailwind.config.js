/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a1a',
          light: '#4a4a4a'
        },
        secondary: {
          DEFAULT: '#6b7280',
          light: '#9ca3af'
        },
        positive: '#10b981',
        warning: '#f59e0b',
        negative: '#ef4444',
        background: '#fafafa'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      }
    },
  },
  plugins: [],
}
