import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  // ,
  // server: {
  //   proxy: {
  //     '/api': {
  //       // 后端服务实际地址
  //       target: 'https://game.xy-hay-loved.xyz/',
  //       changeOrigin: true
  //       // rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})
