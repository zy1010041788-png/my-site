/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Caveat', 'cursive'],
        body: ['Quicksand', 'sans-serif'],
      },
      colors: {
        primary: '#18181B',
        secondary: '#3F3F46',
        accent: '#2563EB',
      },
    },
  },
  plugins: [],
}
