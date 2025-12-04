import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.').pop()
          let extType = info?.toLowerCase()

          if (!extType) return 'assets/[name]-[hash][extname]'

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images'
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts'
          }

          return `assets/${extType}/[name]-[hash][extname]`
        },
      },
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  publicDir: 'public',
  assetsInclude: ['**/*.otf', '**/*.woff', '**/*.woff2'],
  optimizeDeps: {
    include: ['@/assets/fonts/*.woff2', '@/assets/fonts/*.woff', '@/assets/fonts/*.otf'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/main.css';`,
      },
    },
  },
})
