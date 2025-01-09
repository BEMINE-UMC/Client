import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  define: {
    global: 'window' // 브라우저 환경에서 global을 window로 설정
  },
  resolve: {
    alias: {
      global: 'global',
    }
  }
})
