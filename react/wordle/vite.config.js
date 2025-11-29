import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/words': {
        target: 'https://darkermango.github.io/5-Letter-words/words.txt',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/words/, ''),
      }
    }
  }
})
