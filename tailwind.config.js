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
  safelist: [
    // Project tag colors — applied dynamically from JSON
    'bg-cyan-50', 'text-cyan-700', 'border-cyan-200',
    'bg-emerald-50', 'text-emerald-700', 'border-emerald-200',
    'bg-indigo-50', 'text-indigo-700', 'border-indigo-200',
    'bg-amber-50', 'text-amber-700', 'border-amber-200',
    // JCR/CAS tier colors — returned dynamically from functions
    'bg-blue-700', 'bg-blue-500', 'bg-blue-400', 'bg-blue-300', 'bg-blue-200',
    // Status badge colors — returned dynamically from computed
    'bg-green-100', 'text-green-700',
    'bg-amber-100', 'text-amber-700',
    'bg-purple-100', 'text-purple-700',
    'bg-blue-100', 'text-blue-700',
    'bg-gray-100', 'text-gray-600',
  ],
  plugins: [],
}
