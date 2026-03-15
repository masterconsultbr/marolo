/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cor primária do clube
        marolo: {
          50: '#e0f7ff',
          100: '#b3ecff',
          200: '#80e1ff',
          300: '#4dd9ff',
          400: '#1aceff',
          500: '#0cb7f2', // Cor principal do clube ⭐
          600: '#0994cc',
          700: '#0671a5',
          800: '#044e7e',
          900: '#022b57',
        },
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      borderRadius: {
        '3xl': '24px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(12, 183, 242, 0.3)',
        'glow-lg': '0 0 32px rgba(12, 183, 242, 0.4)',
        'glow-xl': '0 0 48px rgba(12, 183, 242, 0.5)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(12, 183, 242, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(12, 183, 242, 0.4)',
          },
        },
      },
    },
  },
  plugins: [],
}