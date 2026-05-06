/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          light: '#e8f4e5',
          mid: '#a8c5a0',
          DEFAULT: '#6a9e62',
          dark: '#5a8e52',
        },
        peach: {
          light: '#fdf0e6',
          mid: '#f2c9a8',
          DEFAULT: '#d4895a',
        },
        lavender: {
          light: '#f0ecfb',
          mid: '#c5b8e8',
          DEFAULT: '#7c6bbf',
        },
        sky: {
          light: '#e8f4fa',
          mid: '#a8d4e8',
          DEFAULT: '#4a9bbf',
        },
        cream: '#fdf9f5',
        warmwhite: '#fff8f2',
        textdark: '#2c3e2d',
        textmid: '#5a6b5c',
        textlight: '#8a9e8c',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
