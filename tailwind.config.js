/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#D4AF37',
          orange: '#F97316',
          green: '#10B981',
          dark: '#0B0F19',
          card: '#151C2C',
          gray1: '#1E293B',
          gray2: '#94A3B8'
        }
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-montserrat)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
