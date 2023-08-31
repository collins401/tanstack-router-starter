/** @type {import('tailwindcss').Config} */

export default {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0284C7',
        danger: '#FF4D4F',
      },
      textColor: {
        // 默认文字颜色rgba(0,0,0,.85); 其他色值可用 text-color/60, text-color/50等,
        color: 'rgb(var(--color-default))'
      }
    },
  },
  plugins: [],
}
