import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 2048,
    open: true,
    https: false,
    proxy: {
      '/prod-api/': {
        target: 'https://vue.ruoyi.vip',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
  }
})
