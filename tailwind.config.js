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
        },
        'vda-black': '#030303',
        'vda-dark': '#0A0A0A',
        'vda-gray': '#1A1A1A',
        'vda-light-gray': '#9CA3AF',
        'vda-white': '#FFFFFF',
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-montserrat)', 'sans-serif'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float-slow': 'float-slow 25s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 15s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-25px) rotate(1deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2)',
            filter: 'brightness(1)',
          },
          '50%': { 
            boxShadow: '0 0 50px rgba(255, 255, 255, 0.6), 0 0 100px rgba(255, 255, 255, 0.3)',
            filter: 'brightness(1.2)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)', opacity: '0.2' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)', opacity: '0.25' },
          '66%': { transform: 'translate(-20px, -30px) scale(0.95)', opacity: '0.18' },
        },
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.15' },
          '50%': { transform: 'scale(1.3)', opacity: '0.25' },
        },
      },
      blur: {
        '4xl': '120px',
      },
    },
  },
  plugins: [],
}
