/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:    '#FF5A5F', // Coral Red
        secondary:  '#00A699', // Vibrant Teal
        accent:     '#FC642D', // Bright Orange
        background: '#FFFFFF',
        surface:    '#F7F7F7',
        textMain:   '#484848', // Dark charcoal
        textMuted:  '#767676', // Medium Gray
        success:    '#00A699',
        warning:    '#FFB400',
        danger:     '#E51D52',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans:  ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(255, 90, 95, 0.3)',
        'glow-teal':    '0 0 15px rgba(0, 166, 153, 0.3)',
      },
    },
  },
  plugins: [],
  corePlugins: { preflight: false }, // preserve our own CSS reset
};
