/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx}",
      "./components/**/*.{js,jsx}"
    ],
    theme: {
      extend: {
        colors: {
          navy: {
          900: '#0a1128', // Dark navy blue
          800: '#0f1a3a', // Optional: Lighter shade if needed
          700: '#1a274d',
          600: '#243b6d', 
          500: '#2e4a8d', 
          300: '#3b5caa',
          200: '#4a6fcb',
          50: '#e0e7ff', 
          },
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'), //  for beautiful Markdown
    ],
  }


  