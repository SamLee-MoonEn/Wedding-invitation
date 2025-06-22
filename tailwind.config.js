/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Noto Serif KR', 'serif'],
        'display': ['Playfair Display', 'serif'],
      },
      colors: {
        'wedding-gold': '#c6a27e',
        'wedding-ivory': '#fff7f0',
        'wedding-rose': '#eec6d6',
      },
      backgroundImage: {
        'wedding-gradient': 'linear-gradient(135deg, #fff7f0 0%, #eec6d6 100%)',
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: [
      {
        wedding: {
          "primary": "#c6a27e",
          "secondary": "#fff7f0", 
          "accent": "#eec6d6",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#f3f4f6",
          "info": "#93c5fd",
          "success": "#86efac",
          "warning": "#fde047",
          "error": "#fca5a5",
        },
      },
    ],
  },
} 