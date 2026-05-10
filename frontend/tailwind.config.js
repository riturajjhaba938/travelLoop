/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: "class",
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

        "tertiary": "#006c4c",
        "primary-container": "#ff5a5f",
        "on-background": "#261817",
        "on-tertiary-container": "#003423",
        "on-primary-fixed": "#410007",
        "outline-variant": "#e2bebc",
        "surface-variant": "#f7dcdb",
        "surface-container-lowest": "#ffffff",
        "surface-container-highest": "#f7dcdb",
        "surface-container-high": "#fde2e0",
        "error-container": "#ffdad6",
        "surface-bright": "#fff8f7",
        "on-error-container": "#93000a",
        "surface-container-low": "#fff0ef",
        "on-primary": "#ffffff",
        "outline": "#8e706f",
        "on-secondary-container": "#007168",
        "primary-fixed": "#ffdad8",
        "on-surface": "#261817",
        "inverse-surface": "#3d2c2c",
        "inverse-primary": "#ffb3b0",
        "tertiary-fixed-dim": "#59ddaa",
        "on-secondary": "#ffffff",
        "tertiary-fixed": "#78fac4",
        "secondary-container": "#7af7e8",
        "primary-fixed-dim": "#ffb3b0",
        "inverse-on-surface": "#ffedeb",
        "surface-dim": "#efd4d2",
        "on-tertiary-fixed": "#002115",
        "on-primary-container": "#61000e",
        "on-tertiary-fixed-variant": "#005139",
        "on-secondary-fixed": "#00201d",
        "secondary-fixed-dim": "#5bdacc",
        "tertiary-container": "#00a879",
        "surface-container": "#ffe9e7",
        "error": "#ba1a1a",
        "on-secondary-fixed-variant": "#005049",
        "secondary-fixed": "#7af7e8",
        "surface-tint": "#b52330",
        "on-tertiary": "#ffffff",
        "on-primary-fixed-variant": "#92001b",
        "on-surface-variant": "#5a403f",
        "on-error": "#ffffff",
        
        // Custom colors from prompt
        "brand-primary": "#FF5A5F",
        "brand-secondary": "#00A699",
        "brand-text": "#484848",
        "brand-muted": "#767676",
        "brand-surface": "#F7F7F7",
        "brand-border": "#E4E4E4"
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'Playfair Display', 'serif'],
        sans:  ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        "label-sm": ["Be Vietnam Pro", "sans-serif"],
        "body-sm": ["Be Vietnam Pro", "sans-serif"],
        "headline-lg-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "body-md": ["Be Vietnam Pro", "sans-serif"],
        "body-lg": ["Be Vietnam Pro", "sans-serif"],
        "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "label-md": ["Be Vietnam Pro", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
      },
      fontSize: {
        "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "700"}],
        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
        "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "700"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
        "display": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600"}],
        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}]
      },
      spacing: {
        "lg": "40px",
        "xs": "4px",
        "margin-desktop": "48px",
        "margin-mobile": "16px",
        "base": "8px",
        "xl": "64px",
        "gutter": "24px",
        "sm": "12px",
        "container-max": "1280px",
        "md": "24px"
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(255, 90, 95, 0.3)',
        'glow-teal':    '0 0 15px rgba(0, 166, 153, 0.3)',
        'soft': '0px 6px 16px rgba(0, 0, 0, 0.08)',
        'hover': '0px 12px 24px rgba(0, 0, 0, 0.12)',
        'floating': '0px 20px 40px rgba(0, 0, 0, 0.15)'
      },
    },
  },
  plugins: [],
  corePlugins: { preflight: false }, // preserve our own CSS reset
};
