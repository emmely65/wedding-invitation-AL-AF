/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#f5f0f0',
        cream: '#efe8dc',
        bone: '#e8e0d4',
        gold: '#dcac61',
        goldDark: '#a6782f',
        goldLight: '#ffd798',
        lavender: '#d9d2e9',
        ink: '#2c2c2c',
        inkLight: '#5a5a5a',
        mutedInk: '#6B6A66',
        maroon: '#5c1010',
        softPink: '#f9eeee',
      },
      fontFamily: {
        script: ['Tangerine', 'Great Vibes', 'cursive'],
        pinyon: ['Pinyon Script', 'cursive'],
        calligraphy: ['Great Vibes', 'cursive'],
        serifDisplay: ['Cormorant Infant', 'Playfair Display', 'serif'],
        elsie: ['Elsie', 'serif'],
        sansBody: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(44, 44, 44, 0.08)',
        card: '0 12px 35px rgba(44, 44, 44, 0.06)',
        gold: '0 12px 30px rgba(220, 172, 97, 0.25)',
        glow: '0 0 40px rgba(220, 172, 97, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at top, rgba(220,172,97,.12), transparent 50%)',
        'gradient-section': 'linear-gradient(180deg, #f5f0f0 0%, #efe8dc 100%)',
        'gradient-gold': 'linear-gradient(135deg, #dcac61 0%, #ffd798 50%, #dcac61 100%)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: 0, transform: 'scale(0.6)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        fadeLeft: {
          '0%': { opacity: 0, transform: 'translateX(30px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        fadeRight: {
          '0%': { opacity: 0, transform: 'translateX(-30px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        softPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.86 },
          '50%': { transform: 'scale(1.02)', opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.1) translate(-2%, -2%)' },
        },
        fly: {
          '0%': { transform: 'translateY(100vh) translateX(-10vw) scale(0.8) rotate(0deg)', opacity: 0 },
          '10%': { opacity: 0.8 },
          '90%': { opacity: 0.8 },
          '100%': { transform: 'translateY(-20vh) translateX(50vw) scale(1.2) rotate(20deg)', opacity: 0 },
        },
        flyReverse: {
          '0%': { transform: 'translateY(-20vh) translateX(110vw) scale(1) rotate(-10deg)', opacity: 0 },
          '10%': { opacity: 0.8 },
          '90%': { opacity: 0.8 },
          '100%': { transform: 'translateY(100vh) translateX(-10vw) scale(0.6) rotate(10deg)', opacity: 0 },
        },
      },
      animation: {
        fadeUp: 'fadeUp .7s ease both',
        fadeInDown: 'fadeInDown .7s ease both',
        zoomIn: 'zoomIn .6s ease both',
        fadeLeft: 'fadeLeft .7s ease both',
        fadeRight: 'fadeRight .7s ease both',
        softPulse: 'softPulse 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        floatSlow: 'floatSlow 3s ease-in-out infinite',
        sway: 'sway 4s ease-in-out infinite',
        kenburns: 'kenburns 20s ease-out alternate infinite',
        fly: 'fly 12s linear infinite',
        flyReverse: 'flyReverse 15s linear infinite',
      },
    },
  },
  plugins: [],
};
