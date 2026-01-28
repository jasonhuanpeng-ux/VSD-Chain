/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 这里未来可以自定义工业风的主题色
      colors: {
        'industry-blue': '#004a99',
      }
    },
  },
  plugins: [],
}