import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'; // 별명을 정의하기위해 추가

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // URL 기본(루트) 경로 적용하기위해 추가
  server: {
    host: true, // 다른 PC에서 보여주려면 server 추가
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@page': fileURLToPath(new URL('./src/page1', import.meta.url)),
    }
  }
})
