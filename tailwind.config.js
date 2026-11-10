/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1320px' },
    },
    extend: {
      colors: {
        ink: {
          950: '#040815',
          900: '#070D1F',
          850: '#0A1229',
          800: '#0E1834',
          700: '#162247',
          600: '#22305E',
          500: '#3A4A7E',
        },
        // Logo navy → electric blue for dark UI
        azure: {
          300: '#A9BEFF',
          400: '#7D9BFF',
          500: '#5B7FFF',
          600: '#4361F0',
          700: '#2F47C9',
        },
        // Logo green
        leaf: {
          300: '#8EF0B4',
          400: '#4FE08A',
          500: '#2FCB6E',
          600: '#22A857',
        },
        cyanx: {
          300: '#8BEFFF',
          400: '#3FE0F5',
          500: '#18C4E0',
        },
        amberx: {
          300: '#FFD889',
          400: '#FFC24D',
          500: '#F5A524',
        },
        coral: {
          400: '#FF7A7A',
          500: '#F25C5C',
        },
      },
      fontFamily: {
        display: ['Unbounded', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(125,155,255,.25), 0 10px 40px -10px rgba(91,127,255,.55)',
        'glow-leaf': '0 0 0 1px rgba(79,224,138,.3), 0 10px 40px -10px rgba(47,203,110,.55)',
        card: '0 1px 0 0 rgba(255,255,255,.06) inset, 0 20px 50px -20px rgba(0,0,0,.6)',
      },
      backgroundImage: {
        'brand-grad': 'linear-gradient(120deg, #5B7FFF 0%, #3FE0F5 50%, #4FE08A 100%)',
        'grid-lines':
          'linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseRing: {
          '0%': { transform: 'scale(.8)', opacity: '.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(.2,.6,.4,1) infinite',
        shimmer: 'shimmer 6s linear infinite',
        'spin-slow': 'spinSlow 30s linear infinite',
      },
    },
  },
  plugins: [],
};
