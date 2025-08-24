/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0a0a0f',
        'space-blue': '#1e3a8a',
        'space-purple': '#5b21b6',
        'space-gold': '#fbbf24',
        'space-green': '#10b981',
        'space-red': '#ef4444',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}