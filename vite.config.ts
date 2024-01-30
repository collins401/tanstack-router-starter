import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    UnoCSS(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[name]',
      inject: 'body-first',
      customDomId: '__svg__icons__dom__'
    })
  ],
  server: {
    port: 2048,
    open: true,
    proxy: {
      '/prod-api/': {
        target: 'https://vue.ruoyi.vip',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
  },
  build: {
    chunkSizeWarningLimit: 1200,
    assetsDir: 'static/img/',
    rollupOptions: {
      output: {
        manualChunks: {
          // 分包
          vendor: ['react', 'react-dom', 'axios', '@tanstack/react-router', 'ahooks', 'dayjs'],
          antd: ['antd']
        },
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
