/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: [
    './resources/**/*.{js,jsx,ts,tsx}', // Scan React JSX/TSX files
    './resources/views/**/*.blade.php', // Scan Blade templates (if any)
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 15s linear infinite', // Custom marquee animation
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' }, // Start off-screen right
          '100%': { transform: 'translateX(-100%)' }, // Move off-screen left
        },
      },
    },
  },
  plugins: [],
};